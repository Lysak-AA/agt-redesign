import api from "./index.js";

export default {
    async getToursForHotel(credentials){
        return api.post('hotel-tours', credentials);
    },
    async getToursForRoute(credentials){
        return api.post('route-tours', credentials);
    }
}