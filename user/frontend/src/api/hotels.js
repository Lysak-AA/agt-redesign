import api from "./index.js";

export default {
    async getHotels(){
        return api.post('hotels');
    },
    async getHotel(credentials){
        return api.post('hotel', credentials);
    },
    async getSameHotels(credentials){
        return api.post('same-hotels', credentials);
    },
    async getUserHistoryObjects(){
        return api.post('get-user-history-objects');
    }
}