/**
 * Created by Anton on 23.05.2015.
 */
engine.trackerLib.filebase = {
    id: 'filebase',
    title: 'FileBase',
    icon: 'data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAQAUAAAAAAAAAAAAAAAEAAAABAABZW1sAWllbAFtcWgBbWlwAXlxbAFtbWwBdWlwAXVtbAFpcXAD///4A3+HhAP7+/gD///8A4+DiAP3//gDi4OAA/f//AODf4QAAMP4AAy7/AAAr4ADe4d8A///8ANzg4QD//v8A3uDgAFlbXAAAMP8AAC7/AAEp4AD7//8A4uDfAFhbWQABMP4AAiveAAAy/gADL/4A//79AOHf3wD6//4A4eHhAAAx/QAAMf8A4OHfAPz+/wDe4OEA4+HhAFpaWgAAKOIAAjD/APz//QAEL/8AASrdAAIv/wDf398AXFxcAAEp3wAAL/8A3t/jAOLf4QAALN4AAjH/AAAq3wAALv4A4ODgAFlcWgAAKuEA//3/AAEx/wDd398AXVleAFhdXAD9/v8AAirgAAAp4ABdW1oA3d7iAFxbXQBYWloAXF1bAFxYXQBbXFgAV1tcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAgMEBQUFAwAGBwgABgIJCQoLDA0MDg8JCQ8MEAUHERITFBAQFQkWFxgMGQwHGhgUGxwdCRgRGB4fGAwPIAcQISIjJBEMDBUlDCYnGAgHKBIpHSoYKxAsLQwJLhgvAhgwMRIdMjM0NQw2DAstNxoJKjgcKhU5GzgSDDoMFgAFOxIqHTkMPD0bPhIMFQwDAwkUPyMdDAwZCRBADAwPQQUWG0IpMR05OSI9OUBDDgIGDRIqPikjHRshPjlERRhGR0hJHCpCPyo+IT1CEjFAAgUJOUkSGxQSMUoSOUIqDktBDwlIDRYJOwwWTBAlQAwaTUEFRwYFAwUFTk9QUVIHBQAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8=',
    desc: 'Filebase.ws - скачать фильмы, игры, музыку, программы, бесплатно!',
    flags: {
        auth: 1,
        language: 'ru',
        cyrillic: 1,
        allowProxy: 1
    },
    categoryList: [
        /*Serials*/['serials'],
        /*Music  */['videoclips', 'eng-music', 'rus-music'],
        /*Games  */['games'],
        /*Films  */['dvd5', 'tv', 'action', 'comedy', 'thriller', 'classic', 'history', 'mystic', 'sci-fi', 'horror', 'drama', 'adventure', 'detective', 'concert', 'epic', 'dvd9', 'fantasy', 'hdtv', 'war', 'family', 'tales', 'catastroph'],
        /*Cartoon*/['cartoons'],
        /*Books  */['books'],
        /*Soft   */['software'],
        /*Anime  */['anime'],
        /*Documen*/['documental'],
        /*Sport  */['sport'],
        /*XXX    */[],
        /*Humor  */[]
    ],
    search: {
        searchUrl: 'http://www.filebase.ws/torrents/search/',
        baseUrl: 'http://www.filebase.ws',
        requestType: 'GET',
        requestData: 'search=%search%&c=0&t=liveonly',
        onGetRequest: function(value) {
            "use strict";
            return encodeURIComponent(value);
        },
        listItemSelector: '#torrents_list>tbody>tr',
        listItemSplice: [1, 0],
        torrentSelector: {
            categoryTitle: {selector: 'td:eq(0)>a>img', attr: 'alt'},
            categoryUrl: {selector: 'td:eq(0)>a', attr: 'href'},
            categoryId: {selector: 'td:eq(0)>a', attr: 'href'},
            title: 'td:eq(1)>a',
            url: {selector: 'td:eq(1)>a', attr: 'href'},
            size: 'td:eq(4)',
            seed: 'td:eq(6)',
            peer: 'td:eq(7)',
            date: 'td:eq(3)'
        },
        onGetValue: {
            categoryId: function(url) {
                "use strict";
                return exKit.funcList.idInCategoryListStr.call(this, url, /\/([^\/]+)\/$/);
            },
            size: function(value) {
                "use strict";
                return exKit.funcList.sizeFormat(value)
            },
            date: function(value) {
                "use strict";
                return exKit.funcList.dateFormat(1, value)
            }
        }
    }
};