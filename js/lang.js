var get_lang = function(lang) {
    var lang_arr_en = {
        t: 'en',
        'categorys': [
            [3, 'Films'],
            [0, 'Serials'],
            [7, 'Anime'],
            [8, 'Doc. and humor'],
            [1, 'Music'],
            [2, 'Games'],
            [5, 'Books'],
            [4, 'Cartoons'],
            [6, 'Software'],
            [9, 'Sport'],
            [10, 'XXX'],
            [-1, 'Other']
        ],
        cat_all: 'All',
        'btn_form': 'Search',
        'btn_main': 'Main',
        'btn_history': 'Search history',
        'btn_up': 'Up!',
        'tracker_list': 'Trackers',
        'btn_tracker_list': 'Setup',
        'filter': 'Filter',
        'btn_filter': 'Clean',
        'table': {
            time: 'Old',
            quality: ['Q', 'Quality'],
            title: 'Title',
            size: 'Size',
            seeds: ['S', 'Seeders'],
            leechs: ['P', 'Peers']
        },
        btn_login: 'Login',
        size_list: ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'],
        times: {
            yest: 'Yesterday',
            today: 'Today',
            week1: 'week',
            week2: 'week',
            week3: 'weeks',
            week4: 'week',
            day1: 'day',
            day2: 'day',
            day3: 'days',
            day4: 'day',
            hour1: 'hour',
            hour2: 'hour',
            hour3: 'hours',
            hour4: 'hour',
            min: 'min.',
            sec: 'sec',
            old: 'ago'
        },
        exp_favorites: 'Favorites',
        exp_games_best: 'Games: Best',
        exp_games_new: 'Games: New',
        exp_games_all: 'Games: All',
        exp_in_cinima: 'Now in the movie',
        exp_films: 'Movies',
        exp_serials: 'TV Series',
        exp_setup_view: 'Setup view',
        exp_in_fav: 'Add to favorites',
        exp_rm_fav: 'Remove from favorites',
        exp_edit_fav: 'Edit poster',
        exp_move_fav: 'Move poster',
        exp_edit_fav_label: 'Enter new name',
        exp_more: 'More',
        exp_default: 'Default',
        his_title: 'Search history',
        his_h1: 'History',
        his_no_his: 'The search history yet',
        his_rm_btn: 'Remove',
        stp_title: 'Search setup',
        stp_setup: 'Setup',
        stp_save_btn: 'Save',
        stp_legend_1: 'Trackers',
        stp_legend_7: 'Options',
        stp_legend_16: 'Filters the list',
        stp_th_2: 'Torrent tracker',
        stp_th_3: 'Description',
        stp_th_4: 'On',
        stp_th_5: 'Off',
        stp_th_6: 'Default',
        stp_span_8: 'Show icons torrent trackers to issue',
        stp_span_9: 'Hide sharing without seeders (distributed)',
        stp_span_10: 'Hide column leechers (downloaders)',
        stp_span_11: 'Hide column seeders (distributed)',
        stp_span_12: 'Automatically move to the category when your choice movie/series etc in the main page',
        stp_span_13: 'Do not show teasers/trailers in search results',
        stp_span_14: 'Add a quick search in the address bar (write "tms" then press Tab)',
        stp_span_15: 'Add search in the context menu',
        stp_span_17: 'Seeking complete coincidence phrases (more than 1 phrases may be separated by commas.)',
        stp_span_18: 'Seeking coincidence with one from entered words',
        stp_span_19: 'Seeking coincidence all entered words',
        stp_legend_20: 'Language',
        stp_opt_21: 'Russian',
        stp_opt_22: 'English',
        stp_opt_23: 'Show search popup, when you click on extension icon',
        ctx_title: 'Search torrent',
        label_profile: 'Profile',
        label_def_profile: 'Default',
        spn_26: 'Title',
        btn_25: 'Remove',
        btn_27: 'Add',
        exp_q_fav: 'Get quality',
        flag: {
            cirilic: 'Unsupport cyrillic',
            auth: 'Requires authorization',
            rus: 'Russian language tracker'
        },
        stp_span_24: 'Enable AutoComplete from Google',
        stp_legend_25: 'Other',
        stp_span_34: 'Receive posters, on the home page via a proxy bt google (images-pos-opensocial) (experiment)',
        stp_span_27: 'Disable Google-Analytics',
        str28: 'Export settings',
        str29: 'Backup',
        str30: 'Restore',
        str31: 'Update',
        str32: 'Restore',
        str33: 'Restore error!',
        exp_source: 'Source',
        exp_s_a_f: 'movies',
        exp_s_a_g: 'games',
        str_subsategoryfilter: 'Consider subcategories',
        str_autosetcat: 'Define the category of the torrent, if it is not present',
        ad: 'Ad\'s',
        use_english_postername: 'Show names movie\\series in English on the front page',
        allow_get_description: 'Get a description of the search query from Google. (each request will be matched with google!)',
        allow_favorites_sync: 'Allow sync favorites list in the cloud',
        clear_cloud_btn: 'Clear settings in the cloud',
        settings: {
            1: "The list of torrents",
            2: "Options",
            3: "Restoring settings",
            4: "Language",
            5: "Lists of torrents",
            6: "Remove",
            7: "Add",
            8: "Torrent trackers",
            9: "Torrent tracker",
            10: "Description",
            11: "On",
            12: "Off",
            13: "Default",
            14: "Advanced settings",
            15: "Show icons torrent trackers to issue",
            16: "Hide sharing without seeders (distributed)",
            17: "Hide column leechers (downloaders)",
            18: "Hide column seeders (distributed)",
            19: "Automatically move to the category when your choice movie/series etc in the main page",
            20: "Enable autoсomplete from Google",
            21: "Do not show teasers\\trailers in search results",
            22: "Add a quick search in the address bar (write \"tms\" then press Tab)",
            23: "Add search in the context menu",
            24: "Show search popup, when you click on extension icon",
            25: "Define the category of the torrent, if it is not present",
            26: "Show names movie\\series in English on the front page",
            27: "Get a description of the search query from Google. (each request will be matched with google!)",
            28: "Allow sync favorites list in the cloud",
            29: "Filters the list",
            30: "Seeking complete coincidence phrases (more than 1 phrases may be separated by commas.)",
            31: "Seeking coincidence with one from entered words",
            32: "Seeking coincidence all entered words",
            33: "Consider subcategories",
            34: "Other",
            35: "Receive posters, on the home page via a proxy bt google (images-pos-opensocial) (experiment)",
            36: "Disable Google-Analytics",
            37: "Backup and restore settings",
            38: "Backup",
            39: "Restore",
            40: "",
            41: "Update",
            42: "",
            43: "Restore",
            44: "Clear settings in the cloud",
            45: "Save all!",
            46: "If possible please",
            47: " make a donation through",
            48: "or",
            49: "Yndex.Money",
            50: "Name",
            51: "There's nothing yet",
            52: "Edit",
            53: "Delete",
            54: "This code has already been added.",
            55: "Loading error!",
            56: "Error",
            57: "Tools",
            58: "Management of user torrent trackers",
            59: "Add the torrent code",
            60: "Create",
            61: "Tracker code",
            62: "Add",
            63: "Edit",
            64: "Close",
            65: "Custom codes torrent trackers posted",
            66: "on this site"
        },
        magic: {
            1: 'Loading error!',
            2: "Search",
            3: "Selectors",
            4: "Convert",
            5: "Authorization",
            6: "Description",
            7: "Get \\ Read code",
            8: "Search results",
            9: "The URL of the search results page",
            10: "Open",
            11: "The search request (query parameters in a use the variable %search%)",
            12: "Convert Cyrillic in cp1251",
            13: "POST request",
            14: "Base url",
            15: "Defining the login page",
            16: "The URL of the login page",
            17: "Open",
            18: "Login form",
            19: "Choose",
            20: "Selectors",
            21: "Row in a table",
            22: "Name of category",
            23: "Link to the category",
            24: "Add the base url",
            25: "The name of the torrent",
            26: "Link to to the torrent-page",
            27: "Add the main url",
            28: "Torrent size",
            29: "Torrent download link",
            30: "Add the base url",
            31: "Number of seeders",
            32: "Number of peers",
            33: "Torrent date",
            34: "Skip the first n rows",
            35: "Skip the last n rows",
            36: "Convert",
            37: "Torrent date",
            38: "Apply regexp",
            39: "replace to",
            40: "Replace the name of the month by the number of",
            41: "Convert time in Unix timestamp format from",
            42: "The original string",
            43: "Converted",
            44: "Result",
            45: "Torrent size",
            46: "Convert",
            47: "The original string",
            48: "Converted",
            49: "Description of the torrent tracker",
            50: "base64 icon (16x16px)",
            51: "Torrent name",
            52: "Torrent description",
            53: "Cyrillic support",
            54: "Login required",
            55: "Russian language tracker",
            56: "Get \\ Read code",
            57: "Get the code",
            58: "Read the code",
            59: "Seeds",
            60: "Peers",
            61: "Table"
        }
    };
    var lang_arr_ru = {
        t: 'ru',
        'categorys': [
            [3, 'Фильмы'],
            [0, 'Сериалы'],
            [7, 'Анимэ'],
            [8, 'Док. и юмор'],
            [1, 'Музыка'],
            [2, 'Игры'],
            [5, 'Книги'],
            [4, 'Мультфильмы'],
            [6, 'ПО'],
            [9, 'Спорт'],
            [10, 'XXX'],
            [-1, 'Прочее']
        ],
        cat_all: 'Всё',
        'btn_form': 'Найти',
        'btn_main': 'Главная',
        'btn_history': 'История поиска',
        'btn_up': 'Вверх!',
        'tracker_list': 'Трекеры',
        'btn_tracker_list': 'Настройки',
        'filter': 'Фильтр',
        'btn_filter': 'Очистить',
        'table': {
            time: 'Добавлено',
            quality: ['К', 'Качество'],
            title: 'Название',
            size: 'Размер',
            seeds: ['С', 'Раздают'],
            leechs: ['Л', 'Скачивают']
        },
        btn_login: 'Войти',
        size_list: ['б', 'Кб', 'Мб', 'Гб', 'Тб', 'Пб', 'Eb', 'Zb', 'Yb'],
        times: {
            yest: 'Вчера',
            today: 'Сегодня',
            week1: 'недель',
            week2: 'неделя',
            week3: 'недели',
            week4: 'недель',
            day1: 'дней',
            day2: 'день',
            day3: 'дня',
            day4: 'дней',
            hour1: 'часов',
            hour2: 'час',
            hour3: 'часа',
            hour4: 'часов',
            min: 'мин.',
            sec: 'сек',
            old: 'назад'
        },
        exp_favorites: 'Избранное',
        exp_games_best: 'Игры: Лучшие',
        exp_games_new: 'Игры: Новые',
        exp_games_all: 'Игры: Все',
        exp_in_cinima: 'Сейчас в кино',
        exp_films: 'Фильмы',
        exp_serials: 'Сериалы',
        exp_setup_view: 'Настроить вид',
        exp_in_fav: 'В избранное',
        exp_rm_fav: 'Удалить из избранного',
        exp_edit_fav: 'Редактировать постер',
        exp_move_fav: 'Переместить',
        exp_edit_fav_label: 'Введите новое имя',
        exp_more: 'Подробнее',
        exp_default: 'По умолчанию',
        his_title: 'История поиска',
        his_h1: 'История',
        his_no_his: 'Истории поиска пока нет',
        his_rm_btn: 'Удалить',
        stp_title: 'Настройки поиска',
        stp_setup: 'Настройки',
        stp_save_btn: 'Сохранить',
        stp_legend_1: 'Трекеры',
        stp_legend_7: 'Опции',
        stp_legend_16: 'Фильтрация списка',
        stp_th_2: 'Торрент трекер',
        stp_th_3: 'Описание',
        stp_th_4: 'Вкл',
        stp_th_5: 'Выкл',
        stp_th_6: 'Станд.',
        stp_span_8: 'Показывать иконки торрент-трекеров в выдаче',
        stp_span_9: 'Скрывать раздачи без сидеров (раздающих)',
        stp_span_10: 'Скрыть столбец личеров (скачивающих)',
        stp_span_11: 'Скрыть столбец сидов (раздающих)',
        stp_span_12: 'Автоматически переходить в соотв. категорию при выборе фильма/сериала итп на главной',
        stp_span_13: 'Не показывать тизеры\\трейлеры в результатах поиска',
        stp_span_14: 'Добавить быстрый поиск в строку адреса (пишем tms потом жмем Tab)',
        stp_span_15: 'Добавить поиск в контекстное меню',
        stp_span_17: 'Ищет полное совпадение фразы (более 1 фразы можно разделить запятой)',
        stp_span_18: 'Ищет совпадение с одним из введенных слов',
        stp_span_19: 'Ищет совпадение всех введенных слов',
        stp_legend_20: 'Язык / Language',
        stp_opt_21: 'Русский',
        stp_opt_22: 'English',
        stp_opt_23: 'Показывать поиск при нажатии на иконку расширения',
        ctx_title: 'Найти торрент',
        label_profile: 'Профиль',
        label_def_profile: 'Стандартный',
        spn_26: 'Название',
        btn_25: 'Удалить',
        btn_27: 'Добавить',
        exp_q_fav: 'Узнать качество',
        flag: {
            cirilic: 'Не поддерживает кириллицу',
            auth: 'Требуется авторизация',
            rus: 'Русскоязычный трекер'
        },
        stp_span_24: 'Включить автозаполнение от Google',
        stp_legend_25: 'Прочее',
        stp_span_34: 'Получать постеры, на главной странице, через прокси гугла (images-pos-opensocial) (эксперимент)',
        stp_span_27: 'Отключить Google-Analytics',
        str28: 'Экспорт настроек',
        str29: 'Бэкап',
        str30: 'Восстановление',
        str31: 'Обновить',
        str32: 'Восстановить',
        str33: 'Ошибка восстановления настроек!',
        exp_source: 'Источники',
        exp_s_a_f: 'фильмы',
        exp_s_a_g: 'игры',
        str_subsategoryfilter: 'Учитывать подкатегории',
        str_autosetcat: 'Определить категорию раздачи, если её нету',
        ad: 'Реклама',
        use_english_postername: 'Отображать имена фильмов\\сериалов на английском на главной странице',
        allow_get_description: 'Получать описание поискового запроса из Google. (каждый запрос будет искаться в google!)',
        allow_favorites_sync: 'Разрешить синхронизацию списка избранного в облако',
        clear_cloud_btn: 'Очистить настройки в облаке',
        settings: {
            1: "Список торрентов",
            2: "Опции",
            3: "Восст. наcтроек",
            4: "Язык",
            5: "Списки торрентов",
            6: "Удалить",
            7: "Добавить",
            8: "Торрент трекеры",
            9: "Торрент трекер",
            10: "Описание",
            11: "Вкл",
            12: "Выкл",
            13: "Станд",
            14: "Дополнительные настройки",
            15: "Показывать иконки торрент-трекеров в выдаче",
            16: "Скрывать раздачи без сидеров (раздающих)",
            17: "Скрыть столбец личеров (скачивающих)",
            18: "Скрыть столбец сидов (раздающих)",
            19: "Автоматически переходить в соотв. категорию при выборе фильма\сериала итп на главной",
            20: "Включить автозаполнение от Google",
            21: "Не показывать тизеры\\трейлеры в результатах поиска",
            22: "Добавить быстрый поиск в строку адреса (пишем tms потом жмем Tab)",
            23: "Добавить поиск в контекстное меню",
            24: "Показывать поиск при нажатии на иконку расширения",
            25: "Автоматически определить категорию раздачи",
            26: "Отображать имена фильмов\\сериалов на английском на главной странице",
            27: "Получать описание поискового запроса из Google. (каждый запрос будет искаться в google!)",
            28: "Разрешить синхронизацию списка избранного",
            29: "Фильтрация списка",
            30: "Ищет полное совпадение фразы (более 1 фразы можно разделить запятой)",
            31: "Ищет совпадение с одним из введенных слов",
            32: "Ищет совпадение всех введенных слов",
            33: "Учитывать подкатегории",
            34: "Прочие",
            35: "Получать постеры на главной странице через прокси гугла (images-pos-opensocial)",
            36: "Отключить Google-Analytics",
            37: "Разервное копирование и восстановление настроек",
            38: "Бэкап",
            39: "Восстановление",
            40: "",
            41: "Обновить",
            42: "",
            43: "Восстановить",
            44: "Очистить настройки в облаке",
            45: "Сохранить все!",
            46: "Если возможно, пожалуйста",
            47: ", сделайте пожертвование через",
            48: "или",
            49: "Яндекс.Деньги",
            50: "Название",
            51: "Тут пока ничего нету",
            52: "Изменить",
            53: "Удалить",
            54: "Этот код уже добавлен.",
            55: "Ошибка загрузки!",
            56: "Ошибка",
            57: "Инструменты",
            58: "Управление пользовательскими торрент-трекерами",
            59: "Добавить код торрента",
            60: "Создать",
            61: "Код трекера",
            62: "Добавить",
            63: "Изменить",
            64: "Закрыть",
            65: "Пользовательские коды торрент трекеров выложены",
            66: "на этом сайте"
        },
        magic: {
            1: 'Ошибка загрузки!',
            2: "Поиск",
            3: "Селекторы",
            4: "Конвертация",
            5: "Авторизация",
            6: "Описание",
            7: "Получить \\ Прочитать код",
            8: "Результаты поиска",
            9: "URL страницы с результатами поиска",
            10: "Открыть",
            11: "Запрос поиска (в параметрах запроса используйте переменную %search%)",
            12: "Конвертировать кириллицу в cp1251",
            13: "POST запрос",
            14: "Основной url",
            15: "Определение страницы авторизации",
            16: "URL страницы входа",
            17: "Открыть",
            18: "Форма входа",
            19: "Выбрать",
            20: "Селекторы",
            21: "Строка в таблице",
            22: "Название категории",
            23: "Ссылка на категорию",
            24: "Добавить основной url",
            25: "Название раздачи",
            26: "Ссылка на раздачу",
            27: "Добавить основной url",
            28: "Размер раздачи",
            29: "Ссылка на скачку раздачи",
            30: "Добавить основной url",
            31: "Количество сидов",
            32: "Количество пиров",
            33: "Дата добавления раздачи",
            34: "Пропустить первые n строк",
            35: "Пропустить последнии n строк",
            36: "Конвертирование",
            37: "Дата добавления раздачи",
            38: "Применить regexp",
            39: "заменить на",
            40: "Заменить название месяца на число",
            41: "Конвертировать время в Unix timestamp из формата",
            42: "Исходная строка",
            43: "Конвертированная",
            44: "Итог",
            45: "Размер торрента",
            46: "Преобразовать",
            47: "Исходная строка",
            48: "Конвертированная",
            49: "Описание торрент-трекера",
            50: "base64 иконка (16x16px)",
            51: "Название торрента",
            52: "Описание торрента",
            53: "Поддержка кириллицы",
            54: "Требуется авторизация",
            55: "Русскоязычный трекер",
            56: "Получить \\ Прочитать код",
            57: "Получить код",
            58: "Прочитать код",
            59: "Сиды",
            60: "Пиры",
            61: "Таблица"
        }
    };
    if (!lang) {
        lang = (GetSettings('lang') !== undefined) ? GetSettings('lang') : 'ru';
    }
    if (lang == 'ru') {
        return lang_arr_ru;
    } else {
        return lang_arr_en;
    }
};
var _lang = get_lang();
window.onload = function() {
    if ("options" in window == false) {
        get_lang = null;
    }
}