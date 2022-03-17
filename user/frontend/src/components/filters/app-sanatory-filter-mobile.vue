<template>
    <div class="filter">
        <h4 class="filter-title">Настроить фильтр</h4>
        <BaseDoubleRange 
            :doubleRangeWidth="300"
            :min="500"
            :max="20000"
            @setMinPrice="getMinPrice($event)"
            @setMaxPrice="getMaxPrice($event)"
            :isSetOptionsBtnActive="setOptionsBtns[0].is_active"
            @action="sendData"      
            rightBtnId="sright-btn-mobile"    
            leftBtnId="sleft-btn-mobile" 
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
            <app-set-options-btn :isSetOptionsBtnActive="setOptionsBtns[1].is_active" @action="sendData" />
        </div>
        <div class="filter-level">
            <h5 class="filter-level__title">Уровень санатория</h5>
            <app-level-input @action="getStars($event)" />
            <app-set-options-btn :isSetOptionsBtnActive="setOptionsBtns[2].is_active" @action="sendData" />
        </div>
        <div class="filter-hotel-name">
            <app-auto-complete-input
                :options="sanatoryInputOptions"
                @action="getHotelName($event)"
                @clear="clearHotel"
            />
            <app-set-options-btn :isSetOptionsBtnActive="setOptionsBtns[3].is_active" @action="sendData" />
        </div>
        <div class="filter-city-name">
            <app-auto-complete-input
                :options="cityInputOptions"
                @action="getCityName($event)"
                @clear="clearCity"
            />
            <app-set-options-btn :isSetOptionsBtnActive="setOptionsBtns[4].is_active" @action="sendData" />
        </div>
        <div class="filter-hotel-services">
            <h5 class="filter-hotel-services__title">Услуги в санатории</h5>
            <div class="filter-hotel-services-list">
                <app-checkbox-input 
                v-for="service, index in getServices"
                :key="index"
                :options="service"
                @checked="getSanatoryHealingBaseAndProfile($event, 'service')" />
            </div>
            <app-set-options-btn :isSetOptionsBtnActive="setOptionsBtns[5].is_active" @action="sendData" />
        </div>
        <div class="filter-hotel-conceptions">
            <h5 class="filter-hotel-conceptions__title">Лечебная база</h5>
            <div class="filter-hotel-conceptions-list">
                <app-checkbox-input 
                v-for="base, index in getHealingBase"
                :key="index"
                :options="base"
                @checked="getSanatoryHealingBaseAndProfile($event, 'base')"
                />
            </div>
            <app-set-options-btn :isSetOptionsBtnActive="setOptionsBtns[6].is_active" @action="sendData" />
        </div>
        <div class="filter-hotel-conceptions">
            <h5 class="filter-hotel-conceptions__title">Профиль лечения</h5>
            <div class="filter-hotel-conceptions-list">
                <app-checkbox-input 
                v-for="profile, index in getHealingProfile"
                :key="index"
                :options="profile"
                @checked="getSanatoryHealingBaseAndProfile($event, 'profile')"
                />
            </div>
            <app-set-options-btn :isSetOptionsBtnActive="setOptionsBtns[7].is_active" @action="sendData" />
        </div>
        <app-wide-filter-btn @action="sendData" />
    </div>
</template>

<script>

//COMPONENTS
import AppLevelInput from "@/components/inputs/app-level-input.vue";
import AppAutoCompleteInput from "@/components/inputs/app-auto-complete-input.vue";
import AppCheckboxInput from "@/components/inputs/app-checkbox-input.vue";
import AppWideFilterBtn from "@/components/buttons/app-wide-filter-btn.vue";
import AppSetOptionsBtn from "@/components/buttons/app-set-options-btn.vue";

//DATA
import citiesList from "@/data/geo/cities.js";

import { mapGetters, mapActions, mapState } from "vuex";

    export default {
        components: {
            AppLevelInput,
            AppWideFilterBtn,
            AppAutoCompleteInput,
            AppCheckboxInput,
            AppSetOptionsBtn,
        },
        computed: {
            ...mapGetters('sanatoryFilterOptions', [
                'getHealingBase',
                'getHealingProfile',
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
            sanatoryNames: {
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
                    'завтрак',
                    'завтрак «шведский стол»',
                    'континентальный завтрак',
                    '2-х разовое',
                    '3-х разовое',
                    '3-х разовое питание «шведский стол»',
                    '4-х разовое'
                ],
                sanatoryInputOptions: {
                    label: "Название санатория",
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
                setOptionsBtns: [
                    {
                        id: 'price-btn',
                        is_active: false
                    },
                    {
                        id: 'menu-btn',
                        is_active: false
                    },
                    {
                        id: 'stars-btn',
                        is_active: false
                    },
                    {
                        id: 'hotel-btn',
                        is_active: false
                    },
                    {
                        id: 'city-btn',
                        is_active: false
                    },
                    {
                        id: 'services-btn',
                        is_active: false
                    },
                    {
                        id: 'base-btn',
                        is_active: false
                    },
                    {
                        id: 'profile-btn',
                        is_active: false
                    },
                ]
            }
        },
        methods: {
            ...mapActions('sanatoryFilterOptions', [
                'setOptionValue',
                'setOptionActive',
                'setOptionDisactive'
            ]),
            getMinPrice(data){
                this.setOptionValue({ id: 'minprice', value: data });
                this.activateSetOptionsBtn('price-btn');
            },
            getMaxPrice(data){
                this.setOptionValue({ id: 'maxprice', value: data });
                this.activateSetOptionsBtn('price-btn');
            },
            getMenuOptions(data){
                this.setOptionValue({ id: 'menu', value: data });
                this.activateSetOptionsBtn('menu-btn');
            },
            getStars(data){
                this.setOptionValue({ id: 'stars', value: data });
                this.activateSetOptionsBtn('stars-btn');
            },
            getHotelName(data){
                this.setOptionValue({ id: 'sanatory', value: data });
                this.activateSetOptionsBtn('hotel-btn');
            },
            clearHotel(){
                this.setOptionValue({ id: 'sanatory', value: null, disable: true });
            },
            getCityName(data){
                this.setOptionValue({ id: 'city', value: data });
                this.activateSetOptionsBtn('city-btn');
            },
            clearCity(){
                this.setOptionValue({ id: 'city', value: null, disable: true });
            },
            getSanatoryHealingBaseAndProfile(data, option){
                data.checked ?
                    this.setOptionActive(data.id) :
                    this.setOptionDisactive(data.id);
                if(option === 'service'){
                    this.activateSetOptionsBtn('services-btn');
                }
                if(option === 'base'){
                    this.activateSetOptionsBtn('base-btn');
                } 
                if(option === 'profile'){
                    this.activateSetOptionsBtn('profile-btn');
                }
            },
            activateSetOptionsBtn(id){
                this.setOptionsBtns.forEach(btn => {
                    if(btn.id === id){
                        btn.is_active = true;
                        setTimeout(() => {
                            btn.is_active = false;
                        }, 10000)
                    } else {
                        btn.is_active = false;
                    }
                })
            },
            sendData(){
                this.$emit('filter');
            }
        },
        mounted(){
            this.sanatoryInputOptions.autocompleteData = this.sanatoryNames;
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