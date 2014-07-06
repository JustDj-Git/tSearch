if (typeof window === 'undefined') {
    self = require("sdk/self");
    var tabs = require("sdk/tabs");
    window = require("sdk/window/utils").getMostRecentBrowserWindow();
    window.isModule = true;
    mono = require('./mono.js');
}
var init = function (env, lang) {
    if (env) {
        mono = mono.init(env);
        window.get_lang = lang.get_lang;
    }
    mono.pageId = 'bg';
    bg.boot();
};
var bg = function() {
    /**
     * @namespace chrome
     * @namespace chrome.omnibox
     * @namespace chrome.omnibox.onInputEntered
     * @namespace chrome.omnibox.onInputEntered.addListener
     * @namespace chrome.tabs
     * @namespace chrome.contextMenus
     * @namespace chrome.removeAll
     * @namespace chrome.browserAction
     * @namespace chrome.browserAction.onClicked
     * @namespace chrome.browserAction.setPopup
     */
    var _lang, btn_init, var_cache = {};
    var add_in_omnibox = function(enable) {
        if (enable === undefined) {
            enable = 1;
        }
        if (enable !== 1) {
            return;
        }
        if (mono.isChrome) {
            chrome.omnibox.onInputEntered.addListener(function (text) {
                chrome.tabs.create({
                    url: "index.html" + ( (text.length > 0) ? '#?search=' + text : ''),
                    selected: true
                });
            });
        }
    };
    var update_context_menu = function(enable) {
        if (enable === undefined) {
            enable = 1;
        }
        if (mono.isChrome) {
            chrome.contextMenus.removeAll(function () {
                if (enable !== 1) {
                    return;
                }
                chrome.contextMenus.create({
                    type: "normal",
                    id: "item",
                    title: _lang.ctx_title,
                    contexts: ["selection"],
                    onclick: function (info) {
                        var text = info.selectionText;
                        chrome.tabs.create({
                            url: 'index.html' + ( (text.length > 0) ? '#?search=' + text : ''),
                            selected: true
                        });
                    }
                });
            });
        }
        if (mono.isFF) {
            var contentScript = (function() {
                var onContext = function() {
                    self.on("click", function() {
                        var text = window.getSelection().toString();
                        self.postMessage(text);
                    });
                };
                var minifi = function(str) {
                    var list = str.split('\n');
                    var newList = [];
                    list.forEach(function(line) {
                        newList.push(line.trim());
                    });
                    return newList.join('');
                };
                var onClickString = onContext.toString();
                var n_pos =  onClickString.indexOf('\n')+1;
                onClickString = onClickString.substr(n_pos, onClickString.length - 1 - n_pos).trim();
                return minifi(onClickString);
            })();
            var cm = require("sdk/context-menu");
            if (var_cache.topLevel) {
                var_cache.topLevel.parentMenu.removeItem(var_cache.topLevel);
            }
            if (enable !== 1) {
                var_cache.topLevel = undefined;
                return;
            }
            var_cache.topLevel = cm.Item({
                label: _lang.ctx_title,
                context: cm.SelectionContext(),
                image: self.data.url('./icons/icon-16.png'),
                contentScript: contentScript,
                onMessage: function (text) {
                    tabs.open( self.data.url('index.html')+'#?search='+text );
                }
            });
        }
    };
    var init_btn_action = function(enable) {
        chrome.browserAction.onClicked.addListener(function() {
            if (!enable) {
                chrome.tabs.create({
                    url: 'index.html'
                });
            }
        });
    };
    var update_btn_action = function(enable) {
        if (enable === undefined) {
            enable = 1;
        }
        if (!btn_init) {
            init_btn_action(enable);
            btn_init = true;
        }
        chrome.browserAction.setPopup({
            popup: (enable)?'popup.html':''
        });
    };
    return {
        boot: function() {
            mono.storage.get('lang', function(storage) {
                _lang = window.get_lang( storage.lang || window.navigator.language.substr(0, 2) );
                mono.onMessage(function(message) {
                    if (message === 'bg_update') {
                        bg.update();
                    }
                });
                bg.update();
            });
        },
        update: function() {
            mono.storage.get(['add_in_omnibox', 'context_menu', 'search_popup'], function(storage) {
                add_in_omnibox(storage.add_in_omnibox);
                update_context_menu(storage.context_menu);
                if (mono.isChrome && !mono.isChromeApp) {
                    update_btn_action(storage.search_popup);
                }
            });
        }
    };
}();
if (window.isModule) {
    exports.init = init;
} else {
    init();
}