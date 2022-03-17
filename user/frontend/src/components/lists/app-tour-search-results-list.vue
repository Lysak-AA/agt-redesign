<template>
    <div class="search-results">
        <p class="search-results__amount" v-if="tours.length > 0">Найдено вариантов: {{ tours.length }}</p>
        <div class="search-results__list">
            <div class="tour-card" v-for="tour, index in showTours(toursToShow)" :key="index">
                <div class="tour-card-dates">
                    <div class="tour-card-dates-check-in">
                        <span class="tour-card__check-in-date">{{ tour.date_begin }}</span>
                        <span class="tour-card__check-in-week-day">Суббота</span>
                    </div>
                    <div class="tour-card-dates-amount">
                        <span class="tour-card-amount-number">{{ tour.nights }}</span>
                        <span class="tour-card-amount-label">Ночей</span>
                    </div>
                    <div class="tour-card-dates-check-out">
                        <span class="tour-card__check-out-date">{{ tour.date_end }}</span>
                        <span class="tour-card__check-out-week-day">Понедельник</span>
                    </div>
                </div>
                <div class="tour-card-tariff">
                    <span class="tour-card__tax-label">Тариф:</span>
                    <span class="tour-card__tax-content">{{ tour.tariff_name }}</span>
                    <span class="tour-card__room-label">Номер:</span>
                    <span class="tour-card__room-content">{{ tour.room_name }}</span>
                    <span class="tour-card__menu-label">Питание:</span>
                    <span class="tour-card__menu-content">{{ tour.meal_name }}</span>
                    <span class="tour-card__price">{{ tour.price }} руб</span>
                </div>
                <div class="tour-card__penalty" v-for="cancellation in tour.cancellation_info" :key="cancellation">
                    <span class="tour-card__penalty-label">Отмена не позднее: </span>
                    <span class="tour-card__penalty-days">{{ cancellation.days }} дней до заезда. </span>
                    <span class="tour-card__penalty-price">При отмене позже штраф {{ cancellation.penalty }} руб.</span>
                </div>
                <div class="tour-card__penalty" v-if="tour.cancellation_info === null">Без штрафа за отмену покупки</div>
                <button class="tour-card__buy-btn">
                    <app-ruble-icon class="tour-card__buy-btn-icon"/>
                    <span class="tour-card__but-btn-value" @click="$emit('buy', tour)">Купить</span>
                </button>
            </div>
        </div>
        <div class="list-toggle" v-if="tours.length > 3 && toursToShow < 4" @click="showAllTours">Показать все результаты</div>
        <div class="list-toggle" v-else @click="hideTours">Свернуть</div>
    </div>
</template>

<script>
import AppPenIcon from '../icons/app-pen-icon.vue'
import AppRubleIcon from '../icons/app-ruble-icon.vue'
    export default {
        props: {
            tours: {
                type: Object,
                default: []
            }
        },
        data(){
            return {
                toursToShow: 3,
            }
        },
        methods: {
            showTours(number){
                let tours = [];
                for(let i = 0; i < number; i++){
                    tours.push(this.tours[i]);
                }
                return tours;
            },
            showAllTours(){
                this.toursToShow = this.tours.length;
            },
            hideTours(){
                this.toursToShow = 3;
            }
        },
        components: {
            AppRubleIcon,
            AppPenIcon
        },
    }
</script>

<style lang="scss" scoped>
    .search-results{
        &__amount{
            width: 100%;
            text-align: center;
            font-weight: 700;
            padding: 1rem;
        }
        &__list{
            transition: 0.3s ease;
            height: fit-content;
        }
    }
    .tour-card{
        padding: 1rem;
        height: fit-content;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        border-bottom: 2px solid $primary;
        &-dates{
            width: 50%;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            &-check-in{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            &-amount{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            &-check-out{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
        &-tariff{
            width: 50%;
            display: flex;
            flex-wrap: wrap;
        }
        &__check-in-date{
            justify-self: center;
            font-size: 1.125rem;
            font-weight: 700;
        }
        &__check-in-week-day{
            justify-self: center;
            font-size: 0.8rem;
            color: #A5A7AC;
        }
        &__nights-amount-number{
            justify-self: center;
            font-size: 1.125rem;
            font-weight: 700;
            color: $primary;
            position: relative;
            width: 70%;
            text-align: center;
            &::after{
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 2px;
                background-color: $primary;

            }
        }
        &__nights-amount-label{
            justify-self: center;
            font-size: 0.8rem;
            color: #A5A7AC;
        }
        &__check-out-date{
            justify-self: center;
            font-size: 1.125rem;
            font-weight: 700;
        }
        &__check-out-week-day{
            justify-self: center;
            font-size: 0.8rem;
            color: #A5A7AC;
        }
        &__tax-label{
            justify-self: start;
            font-size: 1.125rem;
            font-weight: 700;
            color: #A5A7AC;
            width: 30%;
        }
        &__tax-content{
            justify-self: start;
            font-weight: 700;
            text-decoration: underline;
            font-size: 1.125rem;
            width: 70%;
        }
        &__room-label {
            font-size: 1.125rem;
            font-weight: 700;
            color: #A5A7AC;
            width: 30%;
        }
        &__room-content{
            font-weight: 700;
            text-decoration: underline;
            font-size: 1.125rem;
            width: 70%;
        }
        &__menu-label {
            font-size: 1.125rem;
            font-weight: 700;
            color: #A5A7AC;
            width: 30%;
        }
        &__menu-content{
            font-weight: 700;
            text-decoration: underline;
            font-size: 1.125rem;
            width: 70%;
        }
        &__price{
            font-size: 1.125rem;
            font-weight: 700;
            color: #9B0808;
            margin: 1rem 0;
        }
        &__buy-order{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            text-decoration: underline;
            font-size: 1.125rem;
            font-weight: 700;
            svg{
                margin-right: 10px;
            }
        }
        &__penalty{
            width: 100%;
            font-size: 0.8rem;
            font-weight: 700;
            padding: 0.3rem 0;
        }
        &__buy-btn{
            margin-left: auto;
            padding: 0.5rem 1rem;
            background-color: $accent;
            border-radius: 5px;
            border: none;
            color: $white;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.125rem;
            font-weight: 700;
            cursor: pointer;
            svg{
                margin-right: 10px;
            }
        }
    }
    .show-results, .hide-results{
        padding: 1rem;
        width: 100%;
        text-align: right;
        color: $primary;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        svg{
            margin-left: 10px;
            transform: translateY(1px);
        }
    }
    .hide-results{
        svg{
            transform: translateY(1px) rotate(180deg);
        }
    }

    .list-toggle{
        padding: 0.5rem;
        margin-left: auto;
        font-size: 1.125rem;
        font-weight: 700;
        color: $primary;
        cursor: pointer;
        width: 100%;
        text-align: right;
    }

    @media (max-width: 1280px) {
       .tour-card{
       
            &-dates{
                width: 100%;
                padding: 1rem;
            }
            &-tariff{
                width: 100%;
            }
       
        }
    }
    @media (max-width: 1024px) {
        .tour-card{
       
            &-dates{
                width: 50%;
                padding: 1rem;
            }
            &-tariff{
                width: 50%;
            }
       
        }
    }
    @media (max-width: 820px) {
        .tour-card{
       
            &-dates{
                width: 100%;
                padding: 1rem;
            }
            &-tariff{
                width: 100%;
            }
       
        }
    }
</style>