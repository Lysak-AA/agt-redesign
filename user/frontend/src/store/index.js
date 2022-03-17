import { createStore } from "vuex";
import hotelFilterOptions from "./modules/hotel-filter-options";
import sanatoryFilterOptions from "./modules/sanatory-filter-options";
import cities from "./modules/cities";

export default createStore({
  modules: {
    hotelFilterOptions,
    sanatoryFilterOptions,
    cities
  },
  state: {
    isMobileHotelFilterOpened: false
  },
  mutations: {
    toggleMobileHotelFilter(state){
      state.isMobileHotelFilterOpened = !state.isMobileHotelFilterOpened;
    },
  },
  actions: {
    toggleMobileHotelFilter({commit}){
      commit('toggleMobileHotelFilter');
    },
  },
});
