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
        hotel: {
            is_active: false,
            name: "Название отеля: ",
            value: null,
            id: "hotel",
            filter_id: 'common',
            label: "Название отеля"
        },
        city: {
            is_active: false,
            name: "Город: ",
            value: null,
            id: "city",
            filter_id: 'common',
            label: "Город"
        },
        resort: {
            is_active: false,
            name: "Курорт: ",
            value: null,
            id: "resort",
            filter_id: 'common',
            label: "Курорт"
        },
        wifi: {
            is_active: false,
            name: "Wi-Fi: ",
            value: "да",
            id: "wi-fi",
            filter_id: 'service',
            label: "Wi-Fi"
        },
        aquapark: {
            is_active: false,
            name: "Аквапарк: ",
            value: "да",
            id: "aquapark",
            filter_id: 'service',
            label: "Аквапарк"
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
        kitchen: {
            is_active: false,
            name: "Кухня: ",
            value: "да",
            id: "kitchen",
            filter_id: 'service',
            label: "Кухня"
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
        animals: {
            is_active: false,
            name: "Размещение с животными: ",
            value: "да",
            id: "animals",
            filter_id: 'service',
            label: "Размещение с животными"
        },
        sea: {
            is_active: false,
            name: "Отдых на море: ",
            value: "да",
            id: "sea",
            filter_id: 'conception',
            label: "Отдых на море"
        },
        rest_with_children: {
            is_active: false,
            name: "Отдых с детьми: ",
            value: "да",
            id: "children",
            filter_id: 'conception',
            label: "Отдых с детьми"
        },
        work: {
            is_active: false,
            name: "Командировка: ",
            value: "да",
            id: "work",
            filter_id: 'conception',
            label: "Командировка"
        },
        city_walks: {
            is_active: false,
            name: "Городские прогулки : ",
            value: "да",
            id: "citi-walks",
            filter_id: 'conception',
            label: "Городские прогулки"
        },
        conferences: {
            is_active: false,
            name: "Конференции : ",
            value: "да",
            id: "conferences",
            filter_id: 'conception',
            label: "Конференции"
        },
        mountings: {
            is_active: false,
            name: "Отдых в горах : ",
            value: "да",
            id: "mountings",
            filter_id: 'conception',
            label: "Отдых в горах"
        },
        water: {
            is_active: false,
            name: "Отдых у водоёма : ",
            value: "да",
            id: "water",
            filter_id: 'conception',
            label: "Отдых у водоёма"
        },
        children_rest: {
            is_active: false,
            name: "Детский отдых : ",
            value: "да",
            id: "children-rest",
            filter_id: 'conception',
            label: "Детский отдых"
        },
        country_rest: {
            is_active: false,
            name: "Загородный отдых : ",
            value: "да",
            id: "country-rest",
            filter_id: 'conception',
            label: "Загородный отдых"
        }
    });

    const getters = {
        getAllOptions(state){
            return state;
        },
        getConceptions(state){
            let conceptions = [];
            for(let key in state){
                if(state[key].filter_id === 'conception'){
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
        getActiveOptions(state){
            let activeOptions = {};
            for(let key in state){
                state[key].is_active ? activeOptions[key] = state[key] : false;
            }
            return activeOptions;
        }
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