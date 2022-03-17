<template>
    <div class="hotels-page">
        <app-header />
        <app-desctop-navigation-panel />
        <app-mobile-navigation-panel />
        <div :class="{'hotel-filter-mobile': true, 'hotel-filter-mobile--active': mobileFilter.is_active}">
            <app-sanatory-filter-mobile 
                :hotelNames="sanatoryNames"
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
                <app-sanatory-filter 
                    :sanatoryNames="sanatoryNames"
                    :cities="citiesNames"
                    @filter="setFilter($event)"
                />
            </aside>
            <main class="hotels-page-main">
                <h2 class="section-title">Санатории</h2>
                <h3 class="section-subtitle">лечение и отдых</h3>
                <app-filter-options-list 
                    :filterOptionsList="getAllOptions"
                    :isAnyOptionActive="isAnyOptionActive"
                    @action="deleteSanatoryFilterOption($event)"
                    @clearFilter="dropFilter"
                />
                <app-subfilter 
                    @getSortingPrincipe="sortingHotels($event)"
                    @cleanFilter="getSanatories"
                />
                <app-loader :size="50" :isLoaderActive="sanatoriesLoading" />
                <app-pagination
                    v-if="!sanatoriesLoading"
                    :amountOnPage="10"
                    :amountOfObjects="sanatories.length"
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
                     v-for="sanatory, index in pagination.objectsToShowOnCurrentPage"
                     :key="index"
                     :hotel="sanatory"
                />
                <app-pagination
                    v-if="!sanatoriesLoading"
                    :amountOnPage="10"
                    :amountOfObjects="sanatories.length"
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
import AppSanatoryFilter from "@/components/filters/app-sanatory-filter.vue";
import AppSanatoryFilterMobile from "@/components/filters/app-sanatory-filter-mobile.vue";
import AppSubfilter from "@/components/filters/app-subfilter.vue";
import AppLoader from "@/components/loaders/app-loader.vue";
import AppPagination from "@/components/pagination/app-pagination.vue";
import AppFilterOptionsList from "@/components/lists/app-filter-options-list.vue";
import AppFilterWarning from "@/components/warnings/app-filter-warning.vue";
import AppMobileFilterToggle from '../../components/buttons/app-mobile-filter-toggle.vue';

//DATA
import hotelsFilterOptions from "@/data/filters/hotels/hotels-filter-options.js";

//API
import sanatoriesAPI from "@/api/sanatories.js";

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
            AppSanatoryFilter,
            AppSanatoryFilterMobile,
            AppSubfilter,
            AppLoader,
            AppPagination,
            AppFilterOptionsList,
            AppFilterWarning,
            AppMobileFilterToggle
        },
        data: () => {
            return {
                sanatories: [],
                hotelsMenuOptions: [],
                sanatoryNames: [],
                citiesNames: [],
                filtredSanatories: [],
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
                sanatoriesLoading: false,
                filterOptions: hotelsFilterOptions
            }
        },
        computed: {
            isMobileHotelFilterOpened(){
                return this.$store.state.isMobileHotelFilterOpened;
            },
            ...mapGetters('sanatoryFilterOptions', [
                'getAllOptions',
                'getActiveOptions',
                'isAnyOptionActive',
                'isAnyOptionActiveFromHealingBase',
                'isAnyOptionActiveFromHealingProfile',
                'getActiveOptionsFromHealingBase',
                'getActiveOptionsFromHealingProfile',
            ]),
            ...mapGetters('cities', ['getAllCities', 'getResorts'])
        },
        methods: {
            ...mapActions('sanatoryFilterOptions', [
                'setOptionDisactive',
                'clearFilter'
            ]),
            paginate(){
                this.pagination.pages = paginationApi.getAmountOfPages(this.sanatories, this.pagination.amountOnPage);
                this.pagination.objectsToShowOnCurrentPage = paginationApi.getObjectsToShowOnCurrentPage(this.sanatories, 1, this.pagination.amountOnPage);
            },
            async changePage(id){
                paginationApi.changePage(this.pagination, this.sanatories, id);
            },
            async jumpOnOnePageForward(){
                 paginationApi.jumpOnePage(this.pagination, 'forward', this.sanatories);

            },
            async jumpOnFivePagesForward(){
                paginationApi.jump(this.pagination, 'forward', 5, this.sanatories);
            },
            async jumpOnOnePageBack(){
                paginationApi.jumpOnePage(this.pagination, 'back', this.sanatories);

            },
            async jumpOnFivePagesBack(){
                paginationApi.jump(this.pagination, 'back', 5, this.sanatories);
            },
            async goToLastPage(){
                this.pagination.activePage = this.pagination.pages.length;
                this.pagination.pagesStartFrom = this.pagination.pages.length - 5;
                this.pagination.pagesEndOn = this.pagination.pages.length;

                let newobjectsToShowOnCurrentPage = [];
                let start = (this.pagination.activePage - 1) * this.pagination.amountOnPage;
                for(start; start <= (this.pagination.amountOnPage * this.pagination.activePage) - 1; start++){
                    newobjectsToShowOnCurrentPage.push(this.sanatories[start])
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
                    newobjectsToShowOnCurrentPage.push(this.sanatories[start])
                }
                this.pagination.objectsToShowOnCurrentPage = newobjectsToShowOnCurrentPage;
            },
            toggleMobileHotelFilter(){
                this.$store.dispatch('toggleMobileHotelFilter');
            },
            async getSanatories(){
                this.sanatories = [];
                this.pagination.objectsToShowOnCurrentPage = [];
                this.sanatoriesLoading = true;
                const sanatories = await sanatoriesAPI.getSanatories().then(response => response).catch(err => console.log(err));
                this.sanatories = sanatories.data;
                this.paginate();
                this.sanatoriesLoading = false;
                this.getSanatoriesNames();
            },
            getSanatoriesNames(){
                this.sanatories.forEach(sanatory => {
                    this.sanatoryNames.push(sanatory.name);
                })
            },
            sortingHotels(data){
                if(data.sortingBy === 'price'){
                    if(data.lessFirst){
                        this.sanatories = this.sanatories.filter(sanatory => sanatory.minprice > 0);                        
                        this.sanatories.sort((a, b) => {
                            return a.minprice - b.minprice;
                        });
                        this.pagination.pages = paginationApi.getAmountOfPages(this.sanatories, this.pagination.amountOnPage);
                        this.pagination.objectsToShowOnCurrentPage = paginationApi.getObjectsToShowOnCurrentPage(this.sanatories, 1, this.pagination.amountOnPage);
                    } else {
                        this.sanatories = this.sanatories.filter(sanatory => sanatory.minprice > 0);                        
                        this.sanatories.sort((a, b) => {
                            return b.minprice - a.minprice;
                        });
                        this.pagination.pages = paginationApi.getAmountOfPages(this.sanatories, this.pagination.amountOnPage);
                        this.pagination.objectsToShowOnCurrentPage = paginationApi.getObjectsToShowOnCurrentPage(this.sanatories, 1, this.pagination.amountOnPage);
                    }
                }
                if(data.sortingBy === "stars"){
                    if(data.lessFirst){
                        this.sanatories = this.sanatories.filter(sanatory => sanatory.desc.Звёздность);
                        this.sanatories.sort((a, b) => {
                            return +a.desc.Звёздность - +b.desc.Звёздность;
                        });
                        this.pagination.pages = paginationApi.getAmountOfPages(this.sanatories, this.pagination.amountOnPage);
                        this.pagination.objectsToShowOnCurrentPage = paginationApi.getObjectsToShowOnCurrentPage(this.sanatories, 1, this.pagination.amountOnPage);                    
                    } else {
                        this.sanatories = this.sanatories.filter(sanatory => sanatory.desc.Звёздность);
                        this.sanatories.sort((a, b) => {
                            return +b.desc.Звёздность - +a.desc.Звёздность;
                        });
                        this.pagination.pages = paginationApi.getAmountOfPages(this.sanatories, this.pagination.amountOnPage);
                        this.pagination.objectsToShowOnCurrentPage = paginationApi.getObjectsToShowOnCurrentPage(this.sanatories, 1, this.pagination.amountOnPage);  
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
                await this.getSanatories();
                let activeOptions = this.getActiveOptions;
                let filtredSanatories = [];
                if(activeOptions.sanatory){
                    filtredSanatories = this.sanatories.filter(sanatory => {
                        let regexp = new RegExp(`^${activeOptions.sanatory.value}`, "gi");
                        if(sanatory.name.match(regexp)){
                            return sanatory;
                        }
                    });
                    this.sanatories = filtredSanatories;
                    this.paginate();
                } else {
                    if(activeOptions.minprice){
                        filtredSanatories = this.sanatories.filter(sanatory => sanatory.minprice > activeOptions.minprice.value);
                        this.sanatories = filtredSanatories;
                        this.paginate();
                    }
                    if(activeOptions.maxprice){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.minprice){
                                if(sanatory.minprice < activeOptions.maxprice.value){
                                    return sanatory;
                                }
                            }
                        });
                        this.sanatories = filtredSanatories;
                        this.paginate();
                    }
                    if(activeOptions.menu){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["В стоимость входит"]){
                                let regexp = new RegExp(`${activeOptions.menu.value}`, "gi");
                                if(sanatory.desc["В стоимость входит"].match(regexp)){
                                    return sanatory;
                                }
                            }
                        });
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.stars){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["Звёздность"]){
                                if(+sanatory.desc["Звёздность"] === activeOptions.stars.value){
                                    return sanatory;
                                }
                            }
                        });
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.city){
                        let cities = this.getAllCities;
                        let city = cities.filter(city => city.name === activeOptions.city.value);
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(+sanatory.geo.city_id === +city[0].id){
                                return sanatory;
                            }
                        });
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.wifi){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["Бесплатный Wi-Fi"]){
                                return sanatory;
                            }
                        });
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.swiming_pool){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["Открытый бассейн"] || sanatory.desc["Крытый бассейн"]){
                                return sanatory;
                            }
                        })
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.children_room){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["Детская комната"]){
                                return sanatory;
                            }
                        });
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.conference_hall){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["Конференц-зал"]){
                                return sanatory;
                            }
                        });
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.spa){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["К услугам отдыхающих"]){
                                let regexp = new RegExp(`spa`, "gi");
                                let spa = sanatory.desc["К услугам отдыхающих"];
                                if(spa.match(regexp)){
                                    return sanatory;
                                }
                            }
                        });
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.closed_pool){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["Крытый бассейн"]){
                                return sanatory;
                            }
                        });
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.opened_pool){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["Открытый бассейн"]){
                                return sanatory;
                            }
                        });
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.parking){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["Парковка"]){
                                return sanatory;
                            }
                        });
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.invalid){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["Номера для гостей с ограниченными возможностями"]){
                                return sanatory;
                            }
                        });
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.sport){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["Тренажерный зал"]){
                                return sanatory;
                            }
                        });
                        this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(activeOptions.family){
                        filtredSanatories = this.sanatories.filter(sanatory => {
                            if(sanatory.desc["Семейный отдых"]){
                                return sanatory;
                            }
                        });
                       this.sanatories = filtredSanatories;
                        if(this.sanatories.length < 1){
                            this.activateWarning();
                            this.getSanatories();
                        } else {
                            this.paginate();
                        }
                    }
                    if(this.isAnyOptionActiveFromHealingBase){
                        let optionsFromHealingBase = this.getActiveOptionsFromHealingBase;
                        for(let key in optionsFromHealingBase){
                            filtredSanatories = this.sanatories.filter(sanatory => {
                                if(sanatory.desc["Лечебная база"]){
                                    let regexp = new RegExp(`${optionsFromHealingBase[key].tag}`, "gi");
                                    if(sanatory.desc["Лечебная база"].match(regexp)){
                                        return sanatory;
                                    }
                                }
                            });
                            this.sanatories = filtredSanatories;
                            if(this.sanatories.length < 1){
                                this.activateWarning();
                                this.getSanatories();
                            } else {
                                this.paginate();
                            }
                        }
                    }
                    if(this.isAnyOptionActiveFromHealingProfile){
                        let optionsFromHealingProfile = this.getActiveOptionsFromHealingProfile;
                        for(let key in optionsFromHealingProfile){
                            filtredSanatories = this.sanatories.filter(sanatory => {
                                if(sanatory.desc["Профиль лечения"]){
                                    let regexp = new RegExp(`${optionsFromHealingProfile[key].tag}`, "gi");
                                    if(sanatory.desc["Профиль лечения"].match(regexp)){
                                        return sanatory;
                                    }
                                }
                            });
                            this.sanatories = filtredSanatories;
                            if(this.sanatories.length < 1){
                                this.activateWarning();
                                this.getSanatories();
                            } else {
                                this.paginate();
                            }
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
            async deleteSanatoryFilterOption(item){
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
                this.getSanatories();
            }
        },
        mounted(){
            this.getSanatories();

        }
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