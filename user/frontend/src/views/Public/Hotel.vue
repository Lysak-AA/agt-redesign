<template>
    <div class="hotel-page">
        <app-header />
        <app-desctop-navigation-panel />
        <app-mobile-navigation-panel />
        <app-page-loader v-if="!hotel" />
        <app-object-title-block :object="hotel" v-if="hotel" />
        <app-object-gallary :images="hotel.images" v-if="hotel" />
        <app-object-page-layout>
            <template v-slot:main>
                <div class="hotel-location">
                    <p class="hotel-location__description" v-if="hotel && hotel.desc['Расположение']">
                        {{ hotel.desc["Расположение"]}}
                    </p>
                    <p class="hotel-location__beach" v-if="hotel && hotel.desc['Пляж']">{{ hotel.desc['Пляж'] }}</p>
                    <p class="hotel-location__transfer" v-if="hotel && hotel.desc['Проезд']">{{ hotel.desc['Проезд'] }}</p>
                </div>
                <app-object-search-form :search="tours.isSearching" @search="searchTours($event)" />
                
                <app-tour-search-results-list :tours="tours.array" @buy="buyTour($event)" />

                <div class="warning" v-if="tours.isEmpty">По заданным критериям поиска ничего не найдено. Попробуйте изменить параметры</div>
                <div class="hotel-description-options-list" v-if="hotel">
                    <div class="hotel-description-options-list__item"
                        v-for="desc, index in hotel.desc"
                        :key="index"
                    >
                        <div class="hotel-description-options-list__item-label">{{ index }}</div>
                        <div class="hotel-description-options-list__item-content">{{ desc }}</div>
                    </div>
                </div>
            </template>
            <template v-slot:aside>
                <div class="aside-wrapper">
                    <div class="map">
                        <!-- <div class="map-image">
                            <img src="/img/map.png" alt="">
                        </div> -->
                        <!-- <button class="map__open-btn">Показать на карте</button> -->
                    </div>
                    <div class="same-hotels" v-if="sameHotels && sameHotels.length > 0">
                        <h5 class="same-hotels__title">Похожие отели</h5>
                        <div class="same-hotels-list">
                            <app-hotel-card-mini 
                                v-for="hotel, index in sameHotels.slice(0, 5)" 
                                :key="index"
                                :hotel="hotel"
                            />
                        </div>
                    </div>
                    <div class="same-hotels">
                        <h5 class="same-hotels__title">Вы ранее просматривали</h5>
                        <div class="same-hotels-list">
                            <app-hotel-card-mini 
                                v-for="hotel, index in userObjectsHistory.slice(0, 5)" 
                                :key="index"
                                :hotel="hotel"
                            />
                        </div>
                    </div>
                </div>
            </template>
        </app-object-page-layout>
        <app-footer />
    </div>
</template>

<script>
//LAYOUT
import AppObjectPageLayout from '@/layouts/app-object-page-layout.vue';

// SECTIONS
import AppHeader from "@/sections/common/app-header.vue";
import AppFooter from "@/sections/common/app-footer.vue";
import AppObjectTitleBlock from '@/sections/common/app-object-title-block.vue';

//NAVIGATION
import AppDesctopNavigationPanel from "@/navigation/app-desctop-navigation-panel.vue";
import AppMobileNavigationPanel from "@/navigation/app-mobile-navigation-panel.vue";

//COMPONENTS
import AppPageLoader from '@/components/loaders/app-page-loader.vue';
import AppObjectGallary from '@/components/gallaries/app-object-gallary.vue';
import AppObjectSearchForm from '@/components/forms/app-object-search-form.vue';
import AppTourSearchResultsList from '@/components/lists/app-tour-search-results-list.vue';
import AppHotelCardMini from '@/components/cards/app-hotel-card-mini.vue';


//API
import hotelsAPI from "@/api/hotels.js";
import toursAPI from "@/api/tours.js";

    export default {
        name: "Hotel",
        components: {
            AppObjectPageLayout,
            AppHeader,
            AppDesctopNavigationPanel,
            AppMobileNavigationPanel,
            AppObjectTitleBlock,
            AppFooter,
            AppPageLoader,
            AppObjectGallary,
            AppObjectSearchForm,
            AppTourSearchResultsList,
            AppHotelCardMini,
            
        },
        data: () => {
            return {
                hotel: null,
                sameHotels: [],
                userObjectsHistory: [],
                tours: {
                    isSearching: false,
                    array: [],
                    isEmpty: false
                }
            }
        },
        methods: {
            async getHotel(){
                this.hotel = await hotelsAPI.getHotel({ hotel_id: +this.$router.currentRoute._value.params.id })
                            .then(response => response.data)
                            .catch(err => console.log(err));
            },
            async getSameHotels(){
                if(this.hotel.desc["Звёздность"]){
                    this.sameHotels = await hotelsAPI.getSameHotels({ option: 'stars', hotel_stars: +this.hotel.desc["Звёздность"]})
                                    .then(response => response.data)
                                    .catch(err => console.log(err))
                } else {
                    this.sameHotels = await hotelsAPI.getSameHotels({ option: 'city', city: this.hotel.geo.city_id })
                                    .then(response => response.data)
                                    .catch(err => console.log(err))
                }
            },
            async getUserObjectsHistory(){
                this.userObjectsHistory = await hotelsAPI.getUserHistoryObjects()
                                        .then(res => res.data)
                                        .catch(err => console.log(err));

            },
            async searchTours(data){
                this.tours.isSearching = true;
                this.tours.array = await toursAPI.getToursForHotel({
                    hotel_id: this.hotel.id,
                    date_begin: data.date_begin,
                    date_end: data.date_end,
                    adult: data.adult,
                    children: data.children,
                    meal_code: data.meal_code
                })
                .then(res => res.data)
                .catch(err => console.log(err));

                this.tours.isSearching = false;
                if(this.tours.array < 1){
                    this.tours.isEmpty = true;
                } else {
                    this.tours.isEmpty = false;
                }
                console.log(this.tours.array)
            },
            buyTour(data){
                console.log(data)
            }
        },
        mounted(){
            this.getHotel().then(res => {
                this.getSameHotels();
                this.getUserObjectsHistory();
            });
            
        }
    }
</script>

<style lang="scss" scoped>
    .hotel-page{
        width: 100%;
        margin-inline: auto;
    }
    .hotel-location{
        margin-bottom: 2rem;
        display: flex;
        flex-wrap: wrap;
        p{
            margin: 1rem;
            display: block;
        }
        &__description{
            width: 100%;
        }
        &__beach, &__transfer{
            width: 45%;
        }
    }
    .hotel-description-options-list{
        &__item{
            display: flex;
            div{
                padding: 1rem;
            }
            &-label{
                font-size: 1.125rem;
                font-weight: 700;
                width: 30%;
            }
            &-content{
                width: 70%;
                overflow: hidden;
            }
        }
    }

    .aside-wrapper{
        width: 80%;
        margin-inline: auto;
        padding-bottom: 2rem;
        border-radius: 10px;
        background-color: $cards;
    }

    .map{
        width: 100%;
        text-align: center;
        padding: 1rem;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        &-image{
            width: fit-content;
            margin-bottom: 1rem;
        }
        &__open-btn{
            width: 90%;
            padding: 1rem;
            border: none;
            border-radius: 5px;
            background-color: $primary;
            color: $white;
            font-size: 1.125rem;
            cursor: pointer;
        }
    }
    .same-hotels{
        &__title{
            width: 90%;
            margin: 2rem auto;
            border-radius: 5px;
            background-color: $primary;
            color: $white;
            font-size: 24px;
            font-weight: 700;
            padding: 1rem;
            text-align: center;
        }
    }
    .warning{
        padding: 2rem;
        text-align: center;
        background-color: $error;
        margin: 2rem 0;
        color: $white;
    }
    @media (max-width: 768px) {
        .hotel-location{
            &__beach, &__transfer{
                width: 95%;
            }
        }
    }
</style>