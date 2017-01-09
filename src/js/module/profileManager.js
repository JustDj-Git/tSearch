/**
 * Created by Anton on 04.01.2017.
 */
"use strict";
define([
    './utils',
    './dom'
], function (utils, dom) {
    var ProfileManager = function (profiles, profileController, trackers) {
        var self = this;
        var layer = null;

        var getHeader = function (title) {
            return dom.el('div', {
                class: 'manager__header',
                append: [
                    dom.el('div', {
                        class: 'header__title',
                        text: title
                    }),
                    dom.el('a', {
                        href: '#close',
                        class: 'header__close',
                        text: chrome.i18n.getMessage('close'),
                        on: ['click', function (e) {
                            e.preventDefault();
                            close();
                        }]
                    })
                ]
            });
        };

        var getFooter = function (childNodes) {
            return dom.el('div', {
                class: 'manager__footer',
                append: childNodes
            });
        };

        var getLayer = function () {
            var content;
            var node = dom.el('div', {
                class: 'manager__layer',
                append: [
                    content = dom.el('div', {
                        class: 'manager'
                    })
                ]
            });
            return {
                node: node,
                content: content
            }
        };

        var getProfiles = function (profiles) {
            var getProfileItem = function (profile) {
                return dom.el('div', {
                    class: 'item',
                    data: {
                        id: profile.id
                    },
                    append: [
                        dom.el('div', {
                            class: 'item__move'
                        }),
                        dom.el('div', {
                            class: 'item__name',
                            text: profile.name
                        }),
                        dom.el('a', {
                            class: 'item__action',
                            href: '#edit',
                            data: {
                                action: 'edit'
                            },
                            text: chrome.i18n.getMessage('edit')
                        }),
                        dom.el('a', {
                            class: 'item__action',
                            href: '#remove',
                            data: {
                                action: 'remove'
                            },
                            text: chrome.i18n.getMessage('remove')
                        })
                    ]
                });
            };

            var profilesNode = null;
            var node = dom.el(document.createDocumentFragment(), {
                append: [
                    getHeader(chrome.i18n.getMessage('manageProfiles')),
                    dom.el('div', {
                        class: ['manager__sub_header', 'manager__sub_header-profiles'],
                        append: [
                            dom.el('a', {
                                class: ['manager__new_profile'],
                                href: '#new_profile',
                                text: chrome.i18n.getMessage('newProfile'),
                                on: ['click', function (e) {
                                    e.preventDefault();
                                    var profile = self.getDefaultProfile(profileController);
                                    layer.content.textContent = '';
                                    layer.content.appendChild(getProfile(profile, trackers));
                                }]
                            })
                        ]
                    }),
                    profilesNode = dom.el('div', {
                        class: 'manager__profiles',
                        append: (function () {
                            var list = [];
                            profiles.forEach(function (/**profile*/profile) {
                                list.push(getProfileItem(profile))
                            });
                            return list;
                        })(),
                        on: ['click', function (e) {
                            var target = e.target;
                            var profileId, profile;
                            if (target.dataset.action === 'edit') {
                                e.preventDefault();
                                profileId = target.parentNode.dataset.id;
                                profile = profileController.getProfileById(profileId);
                                layer.content.textContent = '';
                                layer.content.appendChild(getProfile(profile, trackers));
                            } else
                            if (target.dataset.action === 'remove') {
                                e.preventDefault();
                                var profileNode = target.parentNode;
                                profileNode.parentNode.removeChild(profileNode);
                            }
                        }]
                    }),
                    getFooter([
                        dom.el('a', {
                            href: '#save',
                            class: ['button', 'manager__footer__btn'],
                            text: chrome.i18n.getMessage('save'),
                            on: ['click', function (e) {
                                e.preventDefault();

                                var profileIdMap = {};
                                profiles.forEach(function (profile) {
                                    profileIdMap[profile.id] = profile;
                                });

                                var existsProfileIds = [];
                                [].slice.call(profilesNode.childNodes).forEach(function (profileNode) {
                                    var id = profileNode.dataset.id;
                                    existsProfileIds.push(profileIdMap[id]);
                                });

                                profiles.splice(0);
                                profiles.push.apply(profiles, existsProfileIds);

                                profileController.refreshProfileIdMap();

                                chrome.storage.local.set({
                                    profiles: profiles
                                }, function () {
                                    close();
                                    self.onSave();
                                });
                            }]
                        })
                    ])
                ]
            });

            require(['./lib/jquery-3.1.1.min'], function () {
                require(['./lib/jquery-ui.min'], function () {
                    var $profilesNode = $(profilesNode);
                    $profilesNode.sortable({
                        axis: 'y',
                        handle: '.item__move',
                        scroll: false
                    });
                });
            });

            return node;
        };

        var getProfile = function (/**profile*/profile, trackers) {
            var getTrackerItem = function (tracker, checked, exists) {
                var checkboxNode;
                return dom.el('div', {
                    class: 'item',
                    data: {
                        id: tracker.id
                    },
                    append: [
                        checkboxNode = dom.el('input', {
                            class: 'item__checkbox',
                            type: 'checkbox',
                            checked: checked
                        }),
                        dom.el('img', {
                            class: ['item__icon'],
                            src: tracker.meta.icon || tracker.meta.icon64,
                            on: ['error', function () {
                                this.src = './img/blank.svg'
                            }]
                        }),
                        dom.el('div', {
                            class: 'item__name',
                            text: tracker.meta.name || tracker.id
                        }),
                        !exists || !tracker.meta.updateURL ? '' : dom.el('a', {
                                class: 'item__action',
                                href: '#update',
                                data: {
                                    action: 'update'
                                },
                                text: chrome.i18n.getMessage('update')
                            }),
                        dom.el('a', {
                            class: 'item__action',
                            href: '#edit',
                            data: {
                                action: 'edit'
                            },
                            text: chrome.i18n.getMessage('edit')
                        }),
                        dom.el('a', {
                            class: 'item__action',
                            href: '#remove',
                            data: {
                                action: 'remove'
                            },
                            text: chrome.i18n.getMessage('remove')
                        })
                    ],
                    on: ['click', function (e) {
                        var child = dom.closestNode(this, e.target);
                        if (e.target === this || child && child.classList.contains('item__name')) {
                            checkboxNode.checked = !checkboxNode.checked;
                        }
                    }]
                })
            };

            var profileName = null;
            var trackersNode = null;
            var removedTrackerIds = [];

            var getTrackerList = function () {
                var fragment = document.createDocumentFragment();
                var idList = [];
                profile.trackers.forEach(function (/**profileTracker*/profileTracker) {
                    var tracker = trackers[profileTracker.id];
                    var exists = !!tracker;
                    if (!tracker) {
                        tracker = {
                            id: profileTracker.id,
                            meta: {}
                        }
                    }
                    idList.push(tracker.id);
                    fragment.appendChild(getTrackerItem(tracker, true, exists));
                });
                Object.keys(trackers).forEach(function (/**tracker*/trackerId) {
                    var tracker = trackers[trackerId];
                    if (idList.indexOf(tracker.id) === -1) {
                        fragment.appendChild(getTrackerItem(tracker, false, true))
                    }
                });
                return fragment;
            };

            onTrackersUpdate = function () {
                trackersNode.textContent = '';
                trackersNode.appendChild(getTrackerList());
            };

            return dom.el(document.createDocumentFragment(), {
                append: [
                    getHeader(chrome.i18n.getMessage('manageProfile')),
                    dom.el('div', {
                        class: 'manager__sub_header',
                        append: [
                            dom.el('div', {
                                class: ['profile__input'],
                                append: [
                                    profileName = dom.el('input', {
                                        class: ['input__input'],
                                        type: 'text',
                                        value: profile.name
                                    })
                                ]
                            })
                        ]
                    }),
                    trackersNode = dom.el('div', {
                        class: 'manager__trackers',
                        append: getTrackerList(),
                        on: ['click', function (e) {
                            var target = e.target;
                            var trackerId;
                            if (target.dataset.action === 'edit') {
                                e.preventDefault();
                                trackerId = target.parentNode.dataset.id;
                                chrome.tabs.create({
                                    url: 'editor.html#' + utils.param({
                                        id: trackerId
                                    })
                                });
                            } else
                            if (target.dataset.action === 'remove') {
                                e.preventDefault();
                                var trackerNode = target.parentNode;
                                trackerId = trackerNode.dataset.id;
                                trackerNode.parentNode.removeChild(trackerNode);
                                removedTrackerIds.push(trackerId);
                            }
                        }]
                    }),
                    getFooter([
                        dom.el('a', {
                            href: '#save',
                            class: ['button', 'manager__footer__btn'],
                            text: chrome.i18n.getMessage('save'),
                            on: ['click', function (e) {
                                e.preventDefault();
                                var profileTrackers = [];
                                [].slice.call(trackersNode.childNodes).forEach(function (trackerNode) {
                                    var id = trackerNode.dataset.id;
                                    var checkbox = trackerNode.querySelector('.item__checkbox');
                                    var checked = checkbox.checked;
                                    if (checked) {
                                        profileTrackers.push({
                                            id: id
                                        })
                                    }
                                });

                                profile.name = profileName.value;
                                profile.trackers = profileTrackers;

                                if (profiles.indexOf(profile) === -1) {
                                    profiles.push(profile);
                                    profileController.refreshProfileIdMap();
                                }

                                removedTrackerIds.forEach(function (id) {
                                    delete trackers[id];
                                });

                                chrome.storage.local.set({
                                    profiles: profiles,
                                    trackers: trackers
                                }, function () {
                                    close();
                                    self.onSave();
                                });
                            }]
                        }),
                        dom.el('a', {
                            href: '#add',
                            class: ['button', 'manager__footer__btn'],
                            text: chrome.i18n.getMessage('add'),
                            on: ['click', function (e) {
                                e.preventDefault();
                                chrome.tabs.create({
                                    url: 'editor.html'
                                });
                            }]
                        }),
                        dom.el('a', {
                            href: '#addTrackerCode',
                            class: ['button', 'manager__footer__btn'],
                            text: chrome.i18n.getMessage('addTrackerCode'),
                            on: ['click', function (e) {
                                e.preventDefault();
                                chrome.tabs.create({
                                    url: 'editor.html#code=true'
                                });
                            }]
                        }),
                        dom.el('a', {
                            href: '#createCode',
                            class: ['button', 'manager__footer__btn'],
                            text: chrome.i18n.getMessage('createCode'),
                            on: ['click', function (e) {
                                e.preventDefault();
                                chrome.tabs.create({
                                    url: 'magic.html'
                                });
                            }]
                        })
                    ])
                ]
            });
        };

        var onTrackersUpdate = null;

        var createLayer = function () {
            var layer = getLayer();
            layer.content.appendChild(getProfiles(profiles));
            return layer;
        };


        var onStorageChange = function(changes, areaName) {
            var key;
            if (areaName === 'local') {
                var change = changes.trackers;
                if (change) {
                    for (key in trackers) {
                        delete trackers[key];
                    }
                    for (key in change.newValue) {
                        trackers[key] = change.newValue[key];
                    }
                    onTrackersUpdate && onTrackersUpdate();
                }
            }
        };


        var close = function () {
            onTrackersUpdate = null;
            document.removeEventListener('click', closeEvent, true);
            layer.node.parentNode.removeChild(layer.node);
            chrome.storage.onChanged.removeListener(onStorageChange);
        };

        this.onSave = function () {

        };

        var closeEvent = function (e) {
            if (!layer.node.contains(e.target)) {
                close();
            }
        };

        this.show = function () {
            layer = createLayer();
            document.body.appendChild(layer.node);
            document.addEventListener('click', closeEvent, true);
            chrome.storage.onChanged.addListener(onStorageChange);
        };
    };
    ProfileManager.prototype.getDefaultProfile = function (profileController) {
        return {
            name: chrome.i18n.getMessage('defaultProfileName'),
            id: profileController.getProfileId(),
            trackers: []
        }
    };
    return ProfileManager;
});