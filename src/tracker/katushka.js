torrent_lib.katushka = function () {
    var name = 'Катушка';
    var filename = 'katushka';
    var icon = 'data:image/x-icon;base64,R0lGODlhEAAQAMQAAO7u7oWFhbKysqurq4GBgfr6+pqamn19fZeXl46Ojr29vZOTk5+fn4KCgoeHh6Ghob+/v5iYmIqKivDw8OPj45GRkcXFxXV1dYmJib6+vnx8fIuLi4+Pj5WVlYaGhv///yH5BAAAAAAALAAAAAAQABAAAAWa4Cd+gMJ0HaMAY5s1modhntZk7TdcW+VxHE9lcxmMMheByOLxWESCC25C2LRQrQ1hAtFUWhFEq6KBMALO5UHz/DADjIUk2IkcLBQPohPgYBZydBEaFB8OCQYYG39naW4eAUofFBtwXV8jBgQFIzsZVFaZDZwiDxosSJIWDh4DnBYXCp08PkCHHEU5LzEYEg4HBLI5JCYoKiwjIQA7';
    var url = 'http://katushka.net/torrent/';
    var root_url = 'http://katushka.net';
    var about = 'Катушка, торрент трекер, торрент, torrent, кино, фильмы, музыка, софт, программы, сериалы, mp3, видео, скачать, бесплатно';
    /*
     * a = требует авторизации
     * l = русскоязычный или нет
     * rs= поддержка русского языка
     */
    var flags = {
        a: 0,
        l: 1,
        rs: 1,
        proxy: 1
    };
    var xhr = undefined;
    var web = function () {
        var calculateCategory = function (f) {
            f = f[f.length - 2];
            var groups_arr = [
                /* Сериалы */['serials'],
                /* Музыка */['music', 'clips'],
                /* Игры */['games'],
                /* Фильмы */['feature', 'films'],
                /* Мультфтльмы */['animated'],
                /* Книги */['books', 'audio', 'text'],
                /* ПО */['soft'],
                /* Анимэ */[],
                /* Док. и юмор */['documentary'],
                /* Спорт */['sport'],
                /* XXX */['xxx']
            ];
            for (var i = 0, len = groups_arr.length; i < len; i++) {
                if (groups_arr[i].indexOf(f) !== -1) {
                    return i;
                }
            }
            return -1;
        };
        var calculateTime = function (t) {
            var dd = $.trim(t).replace('Января', '1').replace('Февраля', '2').replace('Марта', '3')
                .replace('Апреля', '4').replace('Мая', '5').replace('Июня', '6')
                .replace('Июля', '7').replace('Августа', '8').replace('Сентября', '9')
                .replace('Октября', '10').replace('Ноября', '11').replace('Декабря', '12').replace(':', ' ').replace(',', '').split(' ');
            return Math.round((new Date(parseInt(dd[2]), parseInt(dd[1]) - 1, parseInt(dd[0]), parseInt(dd[3]), parseInt(dd[4]))).getTime() / 1000);
        };
        var readCode = function (c) {
            c = engine.contentFilter(c);
            var t = engine.load_in_sandbox(c);
            t = t.find('div.panel.torrents_list > div.content.after_clear').children('div.torr_block');
            var list = 0;
            var l = t.length;
            if (l === 0) {
                t = $(c).find('div.panel.torrents_list > div.content.after_clear > table.data_table.torr_table > tbody').children('tr');
                list = 1;
                l = t.length;
            }
            var i;
            var arr = new Array(l);
            if (list === 1) {
                for (i = 1; i < l; i++) {
                    var td = t.eq(i).children('td');
                    var tags = td.eq(1).children('div.tags').text();
                    arr[i - 1] = {
                        category: {
                            title: td.eq(0).children('a').attr('title') + ((tags.length > 0) ? ', ' + tags : ''),
                            url: root_url + td.eq(0).children('a').attr('href'),
                            id: calculateCategory(td.eq(0).children('a').attr('href').split('/'))
                        },
                        title: td.eq(1).children('div.torr_name').children('a').eq(1).text(),
                        url: root_url + td.eq(1).children('div.torr_name').children('a').eq(1).attr('href'),
                        size: 0,
                        seeds: parseInt(td.eq(2).text()),
                        leechs: 0,
                        time: calculateTime(td.eq(1).children('div.date').text())
                    }
                }
            } else {
                for (i = 0; i < l; i++) {
                    var td = t.eq(i);
                    var tags = td.children('div.descr').children('div.tags').text();
                    arr[i] = {
                        category: {
                            title: td.children('a').attr('title') + ((tags.length > 0) ? ', ' + tags : ''),
                            url: root_url + td.children('a').attr('href'),
                            id: calculateCategory(td.children('a').attr('href').split('/'))
                        },
                        title: td.children('div.descr').children('div.torr_name').children('a').eq(1).text(),
                        url: root_url + td.children('div.descr').children('div.torr_name').children('a').eq(1).attr('href'),
                        size: 0,
                        seeds: parseInt(td.children('div.descr').children('span').eq(0).text()),
                        leechs: 0,
                        time: calculateTime(td.children('div.descr').children('div.date').text())
                    }
                }
            }
            return arr;
        };
        var loadPage = function (text, cb) {
            if (xhr !== undefined)
                xhr.abort();
            xhr = engine.ajax({
                tracker: filename,
                type: 'GET',
                url: url + '?tags=&search=' + text + '&type_search=groups&incldead=0&sorting=0&type_sort=desc',
                cache: false,
                success: function (data) {
                    cb(1, readCode(data));
                },
                error: function () {
                    cb(2, 2);
                }
            });
        };
        return {
            getPage: loadPage
        }
    }();
    return {
        find: web.getPage,
        stop: function(){
            if (xhr !== undefined) {
                xhr.abort();
            }
            //view.loadingStatus(1, filename);
        },
        name: name,
        icon: icon,
        about: about,
        url: root_url,
        filename: filename,
        flags: flags,
        tests: [0, 0, 0, 0, 0, 1, 0, 0, 0]
    }
}();