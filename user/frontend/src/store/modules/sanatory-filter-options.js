const state = () => ({
    minprice: {
        is_active: false,
        name: "Цена от: ",
        value: null,
        id: "minprice",
        filter_id: 'common',
        label: "Цена от"
    },
    maxprice: {
        is_active: false,
        name: "Цена до: ",
        value: null,
        id: "maxprice",
        filter_id: 'common',
        label: "Цена до"
    },
    menu: {
        is_active: false,
        name: "Питание: ",
        value: null,
        id: "menu",
        filter_id: 'common',
        label: "Питание"
    },
    stars: {
        is_active: false,
        name: "Уровень отеля: ",
        value: null,
        id: "stars",
        filter_id: 'common',
        label: "Уровень отеля"
    },
    sanatory: {
        is_active: false,
        name: "Название санатория: ",
        value: null,
        id: "sanatory",
        filter_id: 'common',
        label: "Название санатория"
    },
    city: {
        is_active: false,
        name: "Город: ",
        value: null,
        id: "city",
        filter_id: 'common',
        label: "Город"
    },
    wifi: {
        is_active: false,
        name: "Wi-Fi: ",
        value: "да",
        id: "wi-fi",
        filter_id: 'service',
        label: "Wi-Fi"
    },
    swiming_pool: {
        is_active: false,
        name: "Бассейн",
        value: "да",
        id: "pool",
        filter_id: 'service',
        label: "Бассейн"
    },
    children_room: {
        is_active: false,
        name: "Детская комната: ",
        value: "да",
        id: "children-room",
        filter_id: 'service',
        label: "Детская комната"
    },
    conference_hall: {
        is_active: false,
        name: "Конференц-зал: ",
        value: "да",
        id: "conference",
        filter_id: 'service',
        label: "Конференц-зал"
    },
    spa: {
        is_active: false,
        name: "Красота и SPA: ",
        value: "да",
        id: "spa",
        filter_id: 'service',
        label: "SPA и отдых"
    },
    closed_pool: {
        is_active: false,
        name: "Крытый бассейн: ",
        value: "да",
        id: "closed-pool",
        filter_id: 'service',
        label: "Закрытый бассейн"
    },
    opened_pool: {
        is_active: false,
        name: "Октрытый бассейн: ",
        value: "да",
        id: "opened-pool",
        filter_id: 'service',
        label: "Открытый бассейн"
    },
    parking: {
        is_active: false,
        name: "Парковка: ",
        value: "да",
        id: "parking",
        filter_id: 'service',
        label: "Парковка"
    },
    invalid: {
        is_active: false,
        name: "Прием людей с ограниченными возможностями: ",
        value: "да",
        id: "inalid",
        filter_id: 'service',
        label: "Прием людей с ограниченными возможностями"
    },
    sport: {
        is_active: false,
        name: "Тренажерный зал: ",
        value: "да",
        id: "sport",
        filter_id: "service",
        label: "Тренажерный зал"
    },
    family: {
        is_active: false,
        name: "Семейный отдых: ",
        value: "да",
        id: "family",
        filter_id: "service",
        label: "Семейный отдых"
    },
    functional_diagnostic: {
        is_active: false,
        id: "functional_diagnostic",
        name: "Функциональная диагностика: ",
        value: "да",
        filter_id: "healing-base",
        label: "Функциональная диагностика",
        tag: "функциональн"
    },
    ultrasonic_diagnostic: {
        is_active: false,
        id: "ultrasonic_diagnostic",
        name: "Ультразвуковая диагностика: ",
        value: "да",
        filter_id: "healing-base",
        label: "Ультразвуковая диагностика",
        tag: "ультразвук"
    },
    electrocardiography: {
        is_active: false,
        id: "electrocardiography",
        name: "Электрокардиография: ",
        value: "да",
        filter_id: "healing-base",
        label: "Электрокардиография",
        tag: "электрокардиограф"
    },
    cardiorhythmography: {
        is_active: false,
        id: "cardiorhythmography",
        name: "Кардиоритмография: ",
        value: "да",
        filter_id: "healing-base",
        label: "Кардиоритмография",
        tag: "кардиограф"
    },
    rheovasography: {
        is_active: false,
        id: "rheovasography",
        name: "Реовазография: ",
        value: "да",
        filter_id: "healing-base",
        label: "Реовазография",
        tag: "реовазограф"
    },
    phonocardiography: {
        is_active: false,
        id: "phonocardiography",
        name: "Фонокардиография: ",
        value: "да",
        filter_id: "healing-base",
        label: "Фонокардиография",
        tag: "фонокардиограф"
    },
    seismocardiography: {
        is_active: false,
        id: "seismocardiography",
        name: "Сейсмокардиография: ",
        value: "да",
        filter_id: "healing-base",
        label: "Сейсмокардиография",
        tag: "сейсмокардиограф"
    },
    echocardiography: {
        is_active: false,
        id: "echocardiography",
        name: "Эхокардиография: ",
        value: "да",
        filter_id: "healing-base",
        label: "Эхокардиография",
        tag: "эхокардиограф"
    },
    ultrasound_digestive_organs: {
        is_active: false,
        id: "ultrasound_digestive_organs",
        name: "УЗИ органов пищеварения: ",
        value: "да",
        filter_id: "healing-base",
        label: "УЗИ органов пищеварения",
        tag: "пищеварен"
    },
    ultrasound_thyroid_gland: {
        is_active: false,
        id: "ultrasound_thyroid_gland",
        name: "УЗИ щитовидной железы: ",
        value: "да",
        filter_id: "healing-base",
        label: "УЗИ щитовидной железы",
        tag: "щитовидн"
    },
    ultrasound_breast: {
        is_active: false,
        id: "ultrasound_breast",
        name: "УЗИ молочной железы: ",
        value: "да",
        filter_id: "healing-base",
        label: "УЗИ молочной железы",
        tag: "молочн"
    },
    ultrasound_genitourinary_system: {
        is_active: false,
        id: "ultrasound_genitourinary_system",
        name: "УЗИ мочеполовой системы: ",
        value: "да",
        filter_id: "healing-base",
        label: "УЗИ мочеполовой системы",
        tag: "мочеполов"
    },
    ultrasound_skin: {
        is_active: false,
        id: "ultrasound_skin",
        name: "УЗИ кожи: ",
        value: "да",
        filter_id: "healing-base",
        label: "УЗИ кожи",
        tag: "кож"
    },
    ultrasound_bones: {
        is_active: false,
        id: "ultrasound_bones",
        name: "УЗИ костной системы: ",
        value: "да",
        filter_id: "healing-base",
        label: "УЗИ костной системы",
        tag: "костн"
    },
    computer_express_diagnostic: {
        is_active: false,
        id: "computer_express_diagnostic",
        name: "Компьютерная экспресс-оценка общего состояния организма: ",
        value: "да",
        filter_id: "healing-base",
        label: "Компьютерная экспресс-оценка общего состояния организма",
        tag: "экспресс"
    },
    cancer_diagnostic: {
        is_active: false,
        id: "cancer_diagnostic",
        name: "Ранняя диагностика онкозаболеваний: ",
        value: "да",
        filter_id: "healing-base",
        label: "Ранняя диагностика онкозаболеваний",
        tag: "онко"
    },
    urinal_diagnostic: {
        is_active: false,
        id: "urinal_diagnostic",
        name: "Диагностика урологических заболеваний: ",
        value: "да",
        filter_id: "healing-base",
        label: "Диагностика урологических заболеваний",
        tag: "уролог"
    },
    blood: {
        is_active: false,
        id: "blood",
        name: "Исследования крови: ",
        value: "да",
        filter_id: "healing-base",
        label: "Исследования крови",
        tag: "кров"
    },
    urina: {
        is_active: false,
        id: "urina",
        name: "Исследования мочи: ",
        value: "да",
        filter_id: "healing-base",
        label: "Исследования мочи",
        tag: "моч"
    },
    hormones: {
        is_active: false,
        id: "hormones",
        name: "Исследования уровня гормонов: ",
        value: "да",
        filter_id: "healing-base",
        label: "Исследования уровня гормонов",
        tag: "гормон"
    },
    psy: {
        is_active: false,
        id: "psy",
        name: "Психологическое тестирование: ",
        value: "да",
        filter_id: "healing-base",
        label: "Психологическое тестирование",
        tag: "психолог"
    },
    audiometric: {
        is_active: false,
        id: "audiometric",
        name: "Аудиометрия: ",
        value: "да",
        filter_id: "healing-base",
        label: "Аудиометрия",
        tag: "аудио"
    },
    magnit_theropy: {
        is_active: false,
        id: "magnit_theropy",
        name: "Магнитотерапия: ",
        value: "да",
        filter_id: "healing-base",
        label: "Магнитотерапия",
        tag: "магнит"
    },
    laser: {
        is_active: false,
        id: "laser",
        name: "Лазеротерапия: ",
        value: "да",
        filter_id: "healing-base",
        label: "Лазеротерапия",
        tag: "лазер"
    },
    speleocams: {
        is_active: false,
        id: "speleocams",
        name: "Спелеокамеры: ",
        value: "да",
        filter_id: "healing-base",
        label: "Спелеокамеры",
        tag: "спелео"
    },
    inhalations: {
        is_active: false,
        id: "inhalations",
        name: "Ингалации: ",
        value: "да",
        filter_id: "healing-base",
        label: "Ингаляции",
        tag: "ингаляц"
    },
    phytotherapy: {
        is_active: false,
        id: "phytotherapy",
        name: "Фитотерапии: ",
        value: "да",
        filter_id: "healing-base",
        label: "Фитотерапии",
        tag: "фито"
    },
    massage: {
        is_active: false,
        id: "massage",
        name: "Массаж: ",
        value: "да",
        filter_id: "healing-base",
        label: "Массаж",
        tag: "массаж"
    },
    mud: {
        is_active: false,
        id: "mud",
        name: "Грязелечение: ",
        value: "да",
        filter_id: "healing-base",
        label: "Грязелечение",
        tag: "гряз"
    },
    ozokeritotherapy: {
        is_active: false,
        id: "ozokeritotherapy",
        name: "Озокеритолечение: ",
        value: "да",
        filter_id: "healing-base",
        label: "Озокеритолечение",
        tag: "озокерит"
    },
    thalassotherapy: {
        is_active: false,
        id: "thalassotherapy",
        name: "Талассотерапия: ",
        value: "да",
        filter_id: "healing-base",
        label: "Талассотерапия",
        tag: "талассо"
    },
    physical_therapy: {
        is_active: false,
        id: "physical_therapy",
        name: "Физиотерапия: ",
        value: "да",
        filter_id: "healing-base",
        label: "Физиотерпия",
        tag: "физио"
    },
    ozone_therapy: {
        is_active: false,
        id: "ozone_therapy",
        name: "Озонотерпия: ",
        value: "да",
        filter_id: "healing-base",
        label: "Озонотерпия",
        tag: "озон"
    },
    magnetic_capsule: {
        is_active: false,
        id: "magnetic_capsule",
        name: "Магнитная капсула: ",
        value: "да",
        filter_id: "healing-base",
        label: "Магнитная капсула",
        tag: "магнит"
    },
    bones_muscles: {
        is_active: false,
        id: "bones_muscles",
        name: "Заболевания костно-мышечной системы и соединительной ткани: ",
        value: "да",
        filter_id: "healing-profile",
        label: "Заболевания костно-мышечной системы и соединительной ткани",
        tag: "костн"
    },
    nervous_system: {
        is_active: false,
        id: "nervous_system",
        name: "Заболевания нервной системы: ",
        value: "да",
        filter_id: "healing-profile",
        label: "Заболевания нервной системы",
        tag: "нервн"
    },
    blood_circulation: {
        is_active: false,
        id: "blood_circulation",
        name: "Болезни системы кровообращения: ",
        value: "да",
        filter_id: "healing-profile",
        label: "Болезни системы кровообращения",
        tag: "кровообр"
    },
    skin_diseases: {
        is_active: false,
        id: "skin_diseases",
        name: "Заболевания кожи и подкожной клетчатки: ",
        value: "да",
        filter_id: "healing-profile",
        label: "Заболевания кожи и подкожной клетчатки",
        tag: "подкожн"
    },
    male_sexual: {
        is_active: false,
        id: "male_sexual",
        name: "Заболевания мужской половой системы: ",
        value: "да",
        filter_id: "healing-profile",
        label: "Заболевания мужской половой системы",
        tag: "мужск"
    },
    female_sexual: {
        is_active: false,
        id: "female_sexual",
        name: "Заболевания женской половой системы: ",
        value: "да",
        filter_id: "healing-profile",
        label: "Заболевания женской половой системы",
        tag: "женск"
    },
    cardiovascular_system: {
        is_active: false,
        id: "cardiovascular_system",
        name: "Заболевания сердечно-сосудистой системы: ",
        value: "да",
        filter_id: "healing-profile",
        label: "Заболевания сердечно-сосудистой системы",
        tag: "сердечн"
    },
    musculoskeletal_system: {
        is_active: false,
        id: "musculoskeletal_system",
        name: "Заболевания опорно-двигательного аппарата: ",
        value: "да",
        filter_id: "healing-profile",
        label: "Заболевания опорно-двигательного аппарата",
        tag: "опорно-двигательн"
    },
    gastrointestinal_tract: {
        is_active: false,
        id: "gastrointestinal_tract",
        name: "Заболевания желудочно-кишечного тракта: ",
        value: "да",
        filter_id: "healing-profile",
        label: "Заболевания желудочно-кишечного тракта",
        tag: "желудочно-кишечн"
    },
    vision: {
        is_active: false,
        id: "vision",
        name: "Заболевания органов зрения: ",
        value: "да",
        filter_id: "healing-profile",
        label: "Заболевания органов зрения",
        tag: "зрени"
    },
    breath: {
        is_active: false,
        id: "vision",
        name: "Заболевания органов дыхания: ",
        value: "да",
        filter_id: "healing-profile",
        label: "Заболевания органов дыхания",
        tag: "дыхани"
    }

});

const getters = {
    getAllOptions(state){
        return state;
    },
    getHealingBase(state){
        let conceptions = [];
        for(let key in state){
            if(state[key].filter_id === 'healing-base'){
                conceptions.push(state[key]);
            }
        }
        return conceptions;
    },
    getHealingProfile(state){
        let conceptions = [];
        for(let key in state){
            if(state[key].filter_id === 'healing-profile'){
                conceptions.push(state[key]);
            }
        }
        return conceptions;
    },
    getServices(state){
        let services = [];
        for(let key in state){
            if(state[key].filter_id === 'service'){
                services.push(state[key]);
            }
        }
        return services;
    },
    isAnyOptionActive(state){
        let active = [];
        for(let key in state){
            state[key].is_active ? active.push(true) : active.push(false);
        }
        return active.some(el => el);
    },
    isAnyOptionActiveFromHealingBase(state){
        let active = [];
        for(let key in state){
            if(state[key].filter_id === 'healing-base'){
                state[key].is_active ? active.push(true) : active.push(false);
            }
        }
        return active.some(el => el);
    },
    isAnyOptionActiveFromHealingProfile(state){
        let active = [];
        for(let key in state){
            if(state[key].filter_id === 'healing-profile'){
                state[key].is_active ? active.push(true) : active.push(false);
            }
        }
        return active.some(el => el);
    },
    getActiveOptions(state){
        let activeOptions = {};
        for(let key in state){
            state[key].is_active ? activeOptions[key] = state[key] : false;
        }
        return activeOptions;
    },
    getActiveOptionsFromHealingBase(state){
        let activeOptions = {};
        for(let key in state){
            state[key].is_active && state[key].filter_id === "healing-base" ?
                activeOptions[key] = state[key] : false;
        }
        return activeOptions;
    },
    getActiveOptionsFromHealingProfile(state){
        let activeOptions = {};
        for(let key in state){
            state[key].is_active && state[key].filter_id === "healing-profile" ?
                activeOptions[key] = state[key] : false;
        }
        return activeOptions;
    },
};

const mutations = {
    setOptionActive(state, id){
        for(let key in state){
            if(state[key].id === id){
                state[key].is_active = true;
            }
        }
    },
    setOptionDisactive(state, id){
        for(let key in state){
            if(state[key].id === id){
                state[key].is_active = false;
            }
        }
    },
    setOptionValue(state, data){
        if(data.disable){
            for(let key in state){
                if(state[key].id === data.id){
                    state[key].value = data.value;
                    state[key].is_active = false;
                }
            }
        } else {
            for(let key in state){
                if(state[key].id === data.id){
                    state[key].value = data.value;
                    state[key].is_active = true;
                }
            }
        }
    },
    clearFilter(state){
        for(let key in state){
            state[key].is_active = false;
        }
    }
}

const actions = {
    setOptionActive({ commit }, id){
        commit('setOptionActive', id)
    },
    setOptionDisactive({ commit }, id){
        commit('setOptionDisactive', id)
    },
    setOptionValue({ commit }, data){
        commit('setOptionValue', data)
    },
    clearFilter({ commit }){
        commit('clearFilter');
    }
}

export default {
state,
getters,
mutations,
actions,
namespaced: true
};