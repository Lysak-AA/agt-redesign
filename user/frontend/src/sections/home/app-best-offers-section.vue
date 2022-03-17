<template>
    <section class="best-offers">
        <h2 class="best-offers__title">Лучшие предложения</h2>
        <ul class="best-offers-navigation">
            <li class="best-offers-navigation__item">
                <router-link to="#" class="best-offers-navigation__item-link best-offers-navigation__item-link--active">
                    Отели
                </router-link>
            </li>
            <li class="best-offers-navigation__item">
                <router-link to="#" class="best-offers-navigation__item-link">
                    Санатории
                </router-link>
            </li>
            <li class="best-offers-navigation__item">
                <router-link to="#" class="best-offers-navigation__item-link">
                    Раннее бронирование 2022
                </router-link>
            </li>
            <li class="best-offers-navigation__item">
                <router-link to="#" class="best-offers-navigation__item-link">
                    Активный отдых
                </router-link>
            </li>
        </ul>
        <div class="best-offers__list">
            <app-hotel-card v-for="card in 8" :key="card" />
        </div>
    </section>
</template>

<script>
import AppHotelCard from "@/components/cards/app-hotel-card.vue"
    export default {
        components: {
            AppHotelCard
        }
    }
</script>

<style lang="scss" scoped>
    .best-offers{
        width: min(100%, 1728px);
        margin: 0 auto;
        padding: 50px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        &__title{
            font-size: 4rem;
            font-weight: 700;
            text-transform: uppercase;
            color: $title;
            text-align: center;
            margin-bottom: 50px;
        }
        &-navigation{
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            list-style: none;
            width: min(100%, 1440px);
            &__item{
                &-link{
                    color: $title;
                    font-size: 36px;
                    font-weight: 700;
                    text-decoration: none;
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    text-align: center;
                    &--active{
                        color: $primary;
                        border-bottom: 3px solid $primary;
                    }
                }
            }
        }
        &__list{
            width: min(100%, 1728px);
            margin-inline: auto;
            padding: 50px 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
        }
    }
    @media screen and (max-width: 768px) {
        .best-offers{
            &__title{
                font-size: 3rem;
            }
        }
    }
    @media screen and (max-width: 414px) {
        .best-offers{
            &__title{
                font-size: 2rem;
            }
        }
    }
</style>