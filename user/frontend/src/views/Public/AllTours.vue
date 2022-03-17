<template>
    <div class="hotels-page">
        <app-header />
        <app-desctop-navigation-panel />
        <app-mobile-navigation-panel />
        <div :class="{'hotel-filter-mobile': true, 'hotel-filter-mobile--active': mobileFilter.is_active}">
            <app-hotel-filter-mobile 
                :hotelNames="hotelNames"
                :cities="citiesNames"
                @filter="setFilter($event)"
            />
        </div>
        <app-mobile-filter-toggle 
            @open="openMobileFilter"
            @close="closeMobileFilter"
            @save="setFilter"
            :open="!mobileFilter.is_active"
            :close="mobileFilter.is_active"
            :save="isAnyOptionActive"
        />
        <section class="hotels-page-content">
            <aside class="hotels-page-filter">
                <app-hotel-filter 
                    :hotelNames="hotelNames"
                    :cities="citiesNames"
                    @filter="setFilter($event)"
                />
            </aside>
            <main class="hotels-page-main">
                <h2 class="section-title">Поиск туров</h2>
                <app-tour-search-form @search="searchTours($event)" :search="searching" />
                <app-filter-options-list 
                    :filterOptionsList="getAllOptions"
                    :isAnyOptionActive="isAnyOptionActive"
                    @action="deleteHotelFilterOption($event)"
                    @clearFilter="dropFilter"
                />
                <app-subfilter 
                    @getSortingPrincipe="sortingHotels($event)"
                    @cleanFilter="getHotels"
                    v-if="hotels.length > 0"
                />
                <app-loader :size="50" :isLoaderActive="hotelsLoading" />
                <app-pagination
                    v-if="hotels.length > 0"
                    :amountOnPage="10"
                    :amountOfObjects="hotels.length"
                    :pages="pagination.pages"
                    :activePage="pagination.activePage"
                    :pagesStartFrom="pagination.pagesStartFrom"
                    :pagesEndOn="pagination.pagesEndOn"
                    @changePage="changePage($event)"
                    @jumpOnFivePagesBack="jumpOnFivePagesBack"
                    @jumpOnFivePagesForward="jumpOnFivePagesForward"
                    @jumpOnOnePageForward="jumpOnOnePageForward"
                    @jumpOnOnePageBack="jumpOnOnePageBack"
                    @goToFirstPage="goToFirstPage"
                    @goToLastPage="goToLastPage"
                />
                <app-filter-warning :text="warning.text" v-if="warning.is_active" />
                <app-hotel-card-secondary
                     v-for="hotel, index in pagination.objectsToShowOnCurrentPage"
                     :key="index"
                     :hotel="hotel"
                />
                <app-pagination
                    v-if="hotels.length > 0"
                    :amountOnPage="10"
                    :amountOfObjects="hotels.length"
                    :pages="pagination.pages"
                    :activePage="pagination.activePage"
                    :pagesStartFrom="pagination.pagesStartFrom"
                    :pagesEndOn="pagination.pagesEndOn"
                    @changePage="changePage($event)"
                    @jumpOnFivePagesBack="jumpOnFivePagesBack"
                    @jumpOnFivePagesForward="jumpOnFivePagesForward"
                    @jumpOnOnePageForward="jumpOnOnePageForward"
                    @jumpOnOnePageBack="jumpOnOnePageBack"
                    @goToFirstPage="goToFirstPage"
                    @goToLastPage="goToLastPage"
                />
            </main>
        </section>
        <app-footer />
    </div>
</template>

<script>
// SECTIONS
import AppHeader from "@/sections/common/app-header.vue";
import AppFooter from "@/sections/common/app-footer.vue";

//NAVIGATION
import AppDesctopNavigationPanel from "@/navigation/app-desctop-navigation-panel.vue";
import AppMobileNavigationPanel from "@/navigation/app-mobile-navigation-panel.vue";

//COMPONENTS
import AppHotelCardSecondary from "@/components/cards/app-hotel-card-secondary.vue";
import AppHotelFilter from "@/components/filters/app-hotel-filter.vue";
import AppHotelFilterMobile from "@/components/filters/app-hotel-filter-mobile.vue";
import AppSubfilter from "@/components/filters/app-subfilter.vue";
import AppLoader from "@/components/loaders/app-loader.vue";
import AppPagination from "@/components/pagination/app-pagination.vue";
import AppFilterOptionsList from "@/components/lists/app-filter-options-list.vue";
import AppFilterWarning from "@/components/warnings/app-filter-warning.vue";
import AppMobileFilterToggle from '@/components/buttons/app-mobile-filter-toggle.vue';
import AppTourSearchForm from '@/components/forms/app-tour-search-form.vue';

//DATA
import hotelsFilterOptions from "@/data/filters/hotels/hotels-filter-options.js";

//API
import hotelsAPI from "@/api/hotels.js";
import toursAPI from "@/api/tours.js";

//LOGIC
import paginationApi from "@/logic/pagination.js";

import { mapGetters, mapActions } from "vuex";

    export default {
        components: {
            AppHeader,
            AppDesctopNavigationPanel,
            AppMobileNavigationPanel,
            AppFooter,
            AppHotelCardSecondary,
            AppHotelFilter,
            AppHotelFilterMobile,
            AppSubfilter,
            AppLoader,
            AppPagination,
            AppFilterOptionsList,
            AppFilterWarning,
            AppMobileFilterToggle,
            AppTourSearchForm
        },
        data: () => {
            return {
                searching: false,
                hotels: [],
                hotelsMenuOptions: [],
                hotelNames: [],
                citiesNames: [],
                filtredHotels: [],
                mobileFilter: {
                    is_active: false,
                },
                warning: {
                    text: "",
                    is_active: false
                },
                pagination: {
                    amountOnPage: 10,
                    objectsToShowOnCurrentPage: [],
                    pages: [],
                    pagesStartFrom: 0,
                    pagesEndOn: 5,
                    activePage: 1
                },
                loadingPrice: false,
                hotelsLoading: false,
                filterOptions: hotelsFilterOptions
            }
        },
        computed: {
            isMobileHotelFilterOpened(){
                return this.$store.state.isMobileHotelFilterOpened;
            },
            ...mapGetters('hotelFilterOptions', [
                'getAllOptions',
                'getActiveOptions',
                'isAnyOptionActive'
            ]),
            ...mapGetters('cities', ['getAllCities', 'getResorts'])
        },
        methods: {
            async searchTours(req){
                this.searching = true;
                let tours = await toursAPI.getToursForRoute(req)
                            .then(response => response)
                            .catch(err => console.log(err));
                this.searching = false;
                this.hotels = tours.data;
                this.paginate();
                this.getHotelsNames();
            },
            ...mapActions('hotelFilterOptions', [
                'setOptionDisactive',
                'clearFilter'
            ]),
            paginate(){
                this.pagination.pages = paginationApi.getAmountOfPages(this.hotels, this.pagination.amountOnPage);
                this.pagination.objectsToShowOnCurrentPage = paginationApi.getObjectsToShowOnCurrentPage(this.hotels, 1, this.pagination.amountOnPage);
            },
            async changePage(id){
                paginationApi.changePage(this.pagination, this.hotels, id);
            },
            async jumpOnOnePageForward(){
                 paginationApi.jumpOnePage(this.pagination, 'forward', this.hotels);

            },
            async jumpOnFivePagesForward(){
                paginationApi.jump(this.pagination, 'forward', 5, this.hotels);
            },
            async jumpOnOnePageBack(){
                paginationApi.jumpOnePage(this.pagination, 'back', this.hotels);

            },
            async jumpOnFivePagesBack(){
                paginationApi.jump(this.pagination, 'back', 5, this.hotels);
            },
            async goToLastPage(){
                this.pagination.activePage = this.pagination.pages.length;
                this.pagination.pagesStartFrom = this.pagination.pages.length - 5;
                this.pagination.pagesEndOn = this.pagination.pages.length;

                let newobjectsToShowOnCurrentPage = [];
                let start = (this.pagination.activePage - 1) * this.pagination.amountOnPage;
                for(start; start <= (this.pagination.amountOnPage * this.pagination.activePage) - 1; start++){
                    newobjectsToShowOnCurrentPage.push(this.hotels[start])
                }
                this.pagination.objectsToShowOnCurrentPage = newobjectsToShowOnCurrentPage;
            },
            async goToFirstPage(){
                this.pagination.activePage = 1;
                this.pagination.pagesStartFrom = 0;
                this.pagination.pagesEndOn = 5;
                let newobjectsToShowOnCurrentPage = [];
                let start = (this.pagination.activePage - 1) * this.pagination.amountOnPage;
                for(start; start <= (this.pagination.amountOnPage * this.pagination.activePage) - 1; start++){
                    newobjectsToShowOnCurrentPage.push(this.hotels[start])
                }
                this.pagination.objectsToShowOnCurrentPage = newobjectsToShowOnCurrentPage;
            },
            toggleMobileHotelFilter(){
                this.$store.dispatch('toggleMobileHotelFilter');
            },
            async getHotels(){
                this.hotels = [];
                this.pagination.objectsToShowOnCurrentPage = [];
                this.hotelsLoading = true;
                const hotels = await hotelsAPI.getHotels().then(response => response).catch(err => console.log(err));
                this.hotels = hotels.data;
                this.paginate();
                this.hotelsLoading = false;
                this.getHotelsNames();
            },
            getHotelsNames(){
                this.hotels.forEach(hotel => {
                    this.hotelNames.push(hotel.name);
                })
            },
            sortingHotels(data){
                if(data.sortingBy === 'price'){
                    if(data.lessFirst){
                        this.hotels = this.hotels.filter(hotel => hotel.minprice > 0);                        
                        this.hotels.sort((a, b) => {
                            return a.minprice - b.minprice;
                        });
                        this.pagination.pages = paginationApi.getAmountOfPages(this.hotels, this.pagination.amountOnPage);
                        this.pagination.objectsToShowOnCurrentPage = paginationApi.getObjectsToShowOnCurrentPage(this.hotels, 1, this.pagination.amountOnPage);
                    } else {
                        this.hotels = this.hotels.filter(hotel => hotel.minprice > 0);                        
                        this.hotels.sort((a, b) => {
                            return b.minprice - a.minprice;
                        });
                        this.pagination.pages = paginationApi.getAmountOfPages(this.hotels, this.pagination.amountOnPage);
                        this.pagination.objectsToShowOnCurrentPage = paginationApi.getObjectsToShowOnCurrentPage(this.hotels, 1, this.pagination.amountOnPage);
                    }
                }
                if(data.sortingBy === "stars"){
                    if(data.lessFirst){
                        this.hotels = this.hotels.filter(hotel => hotel.desc.Звёздность);
                        this.hotels.sort((a, b) => {
                            return +a.desc.Звёздность - +b.desc.Звёздность;
                        });
                        this.pagination.pages = paginationApi.getAmountOfPages(this.hotels, this.pagination.amountOnPage);
                        this.pagination.objectsToShowOnCurrentPage = paginationApi.getObjectsToShowOnCurrentPage(this.hotels, 1, this.pagination.amountOnPage);                    
                    } else {
                        this.hotels = this.hotels.filter(hotel => hotel.desc.Звёздность);
                        this.hotels.sort((a, b) => {
                            return +b.desc.Звёздность - +a.desc.Звёздность;
                        });
                        this.pagination.pages = paginationApi.getAmountOfPages(this.hotels, this.pagination.amountOnPage);
                        this.pagination.objectsToShowOnCurrentPage = paginationApi.getObjectsToShowOnCurrentPage(this.hotels, 1, this.pagination.amountOnPage);  
                    }
                }

            },
            openMobileFilter(){
                this.mobileFilter.is_active = true;
            },
            closeMobileFilter(){
                this.mobileFilter.is_active = false;
            },
            async setFilter(){
                this.closeMobileFilter();
                await this.getHotels();
                let activeOptions = this.getActiveOptions;
                let filtredHotels = [];
                if(activeOptions.hotel){
                    filtredHotels = this.hotels.filter(hotel => {
                        let regexp = new RegExp(`^${activeOptions.hotel.value}`, "gi");
                        if(hotel.name.match(regexp)){
                            return hotel;
                        }
                    });
                    this.hotels = filtredHotels;
                    this.paginate();
                } else {
                    if(activeOptions.minprice){
                        filtredHotels = this.hotels.filter(hotel => hotel.minprice > activeOptions.minprice.value);
                        this.hotels = filtredHotels;
                        this.paginate();
                    }
                    if(activeOptions.maxprice){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.minprice){
                                if(hotel.minprice < activeOptions.maxprice.value){
                                    return hotel;
                                }
                            }
                        });
                        this.hotels = filtredHotels;
                        this.paginate();
                    }
                    if(activeOptions.menu){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Система питания"]){
                                let regexp = new RegExp(`^${activeOptions.menu.value}`, "gi");
                                if(hotel.desc["Система питания"].match(regexp)){
                                    return hotel;
                                }
                            }
                        });
                        this.hotels = filtredHotels;
                        this.paginate();
                    }
                    if(activeOptions.stars){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Звёздность"]){
                                if(+hotel.desc["Звёздность"] === activeOptions.stars.value){
                                    return hotel;
                                }
                            }
                        });
                        this.hotels = filtredHotels;
                        this.paginate();
                    }
                    if(activeOptions.city){
                        let cities = this.getAllCities;
                        let city = cities.filter(city => city.name === activeOptions.city.value);
                        filtredHotels = this.hotels.filter(hotel => {
                            if(+hotel.geo.city_id === +city[0].id){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        this.paginate();
                    }
                    if(activeOptions.resort){
                        let resorts = this.getResorts;
                        let resort = resorts.filter(resort => resort.resort_name === activeOptions.resort.value);
                        filtredHotels = this.hotels.filter(hotel => {
                            if(+hotel.geo.resort_id === +resort[0].resort_id){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        this.paginate();
                    }
                    if(activeOptions.wifi){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Бесплатный Wi-Fi"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.aquapark){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Расположение"]){
                                let regexp = new RegExp(`аквапарк`, "gi");
                                let placing = hotel.desc["Расположение"];
                                if(placing.match(regexp)){
                                    return hotel;
                                }
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.swiming_pool){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Открытый бассейн"] || hotel.desc["Крытый бассейн"]){
                                return hotel;
                            }
                        })
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.children_room){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Детская комната"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.conference_hall){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Конференц-зал"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.spa){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["К услугам отдыхающих"]){
                                let regexp = new RegExp(`spa`, "gi");
                                let spa = hotel.desc["К услугам отдыхающих"];
                                if(spa.match(regexp)){
                                    return hotel;
                                }
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.closed_pool){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Крытый бассейн"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.kitchen){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Кухня в номере"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.opened_pool){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Открытый бассейн"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.parking){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Парковка"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.invalid){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Инвалиды"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.animals){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Проживание с животными"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.sea){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Пляж"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.rest_with_children){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Дети"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.work){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Наличие 1-но местного размещения"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.city_walks){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.geo.city_id === 15822290 || hotel.geo.city_id === 4055 || hotel.geo.city_id === 4101 || hotel.geo.city_id === 4094 || hotel.geo.city_id === 4086 || hotel.geo.city_id === 4079){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.conferences){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Конференц-зал"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.mountings){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Расположение"]){
                                let regexp = new RegExp(`горный`, "gi");
                                let mountings = hotel.desc["Расположение"];
                                if(mountings.match(regexp)){
                                    return hotel;
                                }
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.water){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Водоем"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.children_rest){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.desc["Детям"]){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.country_rest){
                        filtredHotels = this.hotels.filter(hotel => {
                            if(hotel.geo.city_id != 15822290 && hotel.geo.city_id != 4055 && hotel.geo.city_id != 4101 && hotel.geo.city_id != 4094 && hotel.geo.city_id != 4086 && hotel.geo.city_id != 4079){
                                return hotel;
                            }
                        });
                        this.hotels = filtredHotels;
                        if(this.hotels.length < 1){
                            this.activateWarning();
                        } else {
                            this.paginate();
                        }
                    }
                }
            },
            activateWarning(){
                this.warning.text = "К сожалению, по выбранным вами параметрам ничего не найдено. Попробуйте изменить параметры поиска";
                this.warning.is_active = true;
                setTimeout(() => {
                    this.warning.is_active = false;
                }, 3000)
            },
            async deleteHotelFilterOption(item){
                this.setOptionDisactive(item);
                let isFilterActive = this.isAnyOptionActive;
                if(!isFilterActive){
                    this.dropFilter();
                } else {
                    this.setFilter();
                }

            },
            dropFilter(){
                this.clearFilter();
                this.getHotels();
            }
        },
        // mounted(){
        //     this.getHotels();

        // }
    }
</script>

<style lang="scss" scoped>
    .hotels-page{
        &-content{
            width: min(100%, 1440px);
            margin-inline: auto;
            padding: 100px 0;
            display: flex;
            justify-content: center;
        }
         &-filter{
            width: 30%;
            padding: 0 30px;
        }
        &-main{
            width: 70%;
            padding: 0 0 0 75px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
    .hotel-filter-mobile{
        width: 80%;
        height: 100%;
        position: fixed;
        padding: 5%;
        overflow: scroll;
        background-color: $secondary;
        top: 0;
        left: 0;
        transition: 0.3s ease;
        z-index: 1200;
        display: none;
        transform: translateX(-100%);
        &--active{
            transform: translateX(0);
        }
    }
    @media screen and (max-width: 1280px) {
        .hotels-page{
            &-filter{
                width: 35%;
            }
            &-main{
                width: 65%;
            }
        }
    }
    @media screen and (max-width: 1024px) {
        .hotels-page{
            &-filter{
                display: none;
            }
            &-content{
                padding: 40px 0;
            }
            &-main{
                width: 100%;
                padding: 0;
                align-items: center;
            }
        }
        .hotel-filter-mobile{
            display: flex;
        }
    }
    @media screen and (max-width: 500px) {
        .hotel-filter-mobile{
            width: 100%;
        }
    }
</style>