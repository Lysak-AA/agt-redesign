<template>
    <div class="filter">
        <h4 class="filter-title">Настроить фильтр</h4>
        <BaseDoubleRange 
            :doubleRangeWidth="300"
            :min="500"
            :max="20000"
            @setMinPrice="getMinPrice($event)"
            @setMaxPrice="getMaxPrice($event)"
            @action="sendData"
            rightBtnId="right-btn-mobile"    
            leftBtnId="left-btn-mobile"    
        />
        <div class="filter-food">
            <h5>Питание</h5>
            <select
                class="filter-food__input"
                @change="getMenuOptions($event.target.value)"
                v-model="menuOptionValue"
            >
                <option 
                    :value="item"
                    v-for="item, index in menuOptions" 
                    :key="index">{{item}}
                </option>
            </select>
        </div>
        <div class="filter-level">
            <h5 class="filter-level__title">Уровень отеля</h5>
            <app-level-input @action="getStars($event)" />
        </div>
        <div class="filter-hotel-name">
            <app-auto-complete-input
                :options="hotelInputOptions"
                @action="getHotelName($event)"
                @clear="clearHotel"
            />
        </div>
        <div class="filter-city-name">
            <app-auto-complete-input
                :options="cityInputOptions"
                @action="getCityName($event)"
                @clear="clearCity"
            />
        </div>
        <div class="filter-resort-name">
            <app-auto-complete-input
                :options="resortInputOptions"
                @action="getResortName($event)"
                @clear="clearResort"
            />
        </div>
        <div class="filter-hotel-services">
            <h5 class="filter-hotel-services__title">Услуги в отеле</h5>
            <div class="filter-hotel-services-list">
                <app-checkbox-input 
                v-for="service, index in getServices"
                :key="index"
                :options="service"
                @checked="getHotelServiceAndConception($event, 'service')" />
            </div>
        </div>
        <div class="filter-hotel-conceptions">
            <h5 class="filter-hotel-conceptions__title">Концепция отеля</h5>
            <div class="filter-hotel-conceptions-list">
                <app-checkbox-input 
                v-for="conception, index in getConceptions"
                :key="index"
                :options="conception"
                @checked="getHotelServiceAndConception($event, 'conception')"
                />
            </div>
        </div>
        <app-wide-filter-btn @action="sendData" />
    </div>
</template>

<script>

//COMPONENTS
// import AppDoubleRangeInput from "@/components/inputs/app-double-range-input.vue";
import AppLevelInput from "@/components/inputs/app-level-input.vue";
import AppAutoCompleteInput from "@/components/inputs/app-auto-complete-input.vue";
import AppCheckboxInput from "@/components/inputs/app-checkbox-input.vue";
import AppWideFilterBtn from "@/components/buttons/app-wide-filter-btn.vue";

//DATA
import citiesList from "@/data/geo/cities.js";

import { mapGetters, mapActions, mapState } from "vuex";

    export default {
        components: {
            AppLevelInput,
            AppWideFilterBtn,
            AppAutoCompleteInput,
            AppCheckboxInput,
        },
        computed: {
            ...mapGetters('hotelFilterOptions', [
                'getConceptions',
                'getServices'
            ]),
            ...mapState({
                isMenuOptionActive: state => state.hotelFilterOptions.menu.is_active,
                menuOptionValue: state => state.hotelFilterOptions.menu.value,
                isHotelOptionActive: state => state.hotelFilterOptions.hotel.is_active
            })
        },
        watch: {
            isMenuOptionActive(oldMenu, newMenu){
                this.isMenuOptionActive ? false : this.setOptionValue({ id: 'menu', value: null, disable: true });
            },
            isHotelOptionActive(){
                this.isHotelOptionActive ? false : this.clearHotel();
            }
        },
        props: {
            hotelNames: {
                type: Object
            },
            cities: {
                type: Object
            },
            risorts: {
                type: Object
            },
        },
        data: () => {
            return {
                menuOptions: [
                    'без питания',
                    'всё включено',
                    'завтрак',
                    'континентальный завтрак',
                    '2-х разовое',
                    '3-х разовое',
                    'шведский стол'
                ],
                hotelInputOptions: {
                    label: "Название отеля",
                    id: 'hotel',
                    autocomplete: true,
                    autocompleteData: [],
                    prefiltredData: [],
                    clearInput: 'clear',
                },
                cityInputOptions: {
                    label: "Страна, город",
                    id: 'city',
                    autocomplete: true,
                    autocompleteData: [],
                    prefiltredData: [
                        'Анапа',
                        'Сочи',
                        'Краснодар',
                        'Адлер',
                    ]
                },
                resortInputOptions: {
                    label: "Направления и курорты",
                    id: 'resort',
                    autocomplete: true,
                    autocompleteData: [
                        'Туапсе',
                        'Сочи',
                        'Темрюк',
                        'Анапа',
                        'Ейск',
                        'Геленжик'
                    ],
                    prefiltredData: [
                        'Туапсе',
                        'Сочи',
                        'Темрюк',
                        'Анапа',
                        'Ейск',
                        'Геленжик'
                    ]
                },
            }
        },
        methods: {
            ...mapActions('hotelFilterOptions', [
                'setOptionValue',
                'setOptionActive',
                'setOptionDisactive'
            ]),
            getMinPrice(data){
                this.setOptionValue({ id: 'minprice', value: data });
            },
            getMaxPrice(data){
                this.setOptionValue({ id: 'maxprice', value: data });
            },
            getMenuOptions(data){
                this.setOptionValue({ id: 'menu', value: data });
            },
            getStars(data){
                this.setOptionValue({ id: 'stars', value: data });
            },
            getHotelName(data){
                this.setOptionValue({ id: 'hotel', value: data });
            },
            clearHotel(){
                this.setOptionValue({ id: 'hotel', value: null, disable: true });
            },
            getCityName(data){
                this.setOptionValue({ id: 'city', value: data });
            },
            clearCity(){
                this.setOptionValue({ id: 'city', value: null, disable: true });
            },
            getResortName(data){
                this.setOptionValue({ id: 'resort', value: data });
            },
            clearResort(){
                this.setOptionValue({ id: 'resort', value: null, disable: true });
            },
            getHotelServiceAndConception(data, option){
                data.checked ?
                    this.setOptionActive(data.id) :
                    this.setOptionDisactive(data.id);
            },
            sendData(){
                this.$emit('filter');
            }
        },
        mounted(){
            this.hotelInputOptions.autocompleteData = this.hotelNames;
            citiesList.forEach(city =>{
                this.cityInputOptions.autocompleteData.push(city.name);
            });
        }
    }
</script>

<style lang="scss" scoped>
    .filter{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-title{
            font-size: 1.5rem;
            font-weight: 700;
            color: $title;
            margin-bottom: 50px;
        }
        &-food{
            padding: 2rem 0;
            width: 100%;
            position: relative;
            &__input{
                width: 100%;
                height: 50px;
                padding-left: 30px;
                font-size: 18px;
                font-weight: 700;
                color: #00000040;
                border: 1px solid $title;
                border-radius: 5px;
            }
        }
        &-level{
            width: 100%;
            padding: 2rem 0;
            position: relative;
            &__title{
                font-size: 18px;
                font-weight: bold;
                color: $title;
            }
        }
        &-hotel-name, &-city-name, &-resort-name{
            width: 100%;
            margin-bottom: 2rem;
            position: relative;
        }
        &-hotel-services{
            width: 100%;
            margin-bottom: 2rem;
            position: relative;
            &__title{
                font-size: 18px;
                font-weight: bold;
                color: $title;
            }
            &-list{
                width: 100%;
                padding: 2rem 0 0;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
            }
        }
        &-hotel-conceptions{
            width: 100%;
            margin-bottom: 2rem;
            position: relative;
            &__title{
                font-size: 18px;
                font-weight: bold;
                color: $title;
            }
            &-list{
                width: 100%;
                padding: 2rem 0 0;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
            }


        }
    }
</style>