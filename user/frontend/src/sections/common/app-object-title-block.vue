<template>
    <div class="title-block">
        <div class="title-block-wrapper">
            <div class="left-side">
                <div class="breadcramps" v-if="object"><span class="breadcramps__country">Россия</span> / <span class="breadcramps__region">Краснодарский край </span> / <span class="breadcramps__city" @click="$emit('goToCity')">{{ getCityNameById(object.geo.city_id[0])[0].name }}</span> / <span class="breadcramps__object">{{ object.name }}</span></div>
                <h3 class="hotel-title" v-if="object">{{ object.name }}</h3>
                <app-hotel-rating 
                    :stars="object.desc['Звёздность']"
                    v-if="object"
                />
            </div>
            <div class="right-side">
                <button class="search-btn">
                    <span class="search-btn__value">Поиск</span>
                    <app-search-icon class="search-btn__icon"/>
                </button>
                <!-- <button class="share-btn">
                    <app-share-icon />
                </button> -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppHotelRating from "@/components/ratings/app-hotel-rating.vue";
import AppSearchIcon from '@/components/icons/app-search-icon.vue';
import AppShareIcon from '@/components/icons/app-share-icon.vue';
    export default {
        props: {
            object: {
                type: Object
            }
        },
        components: {
            AppHotelRating,
            AppSearchIcon,
            AppShareIcon
        },
        computed: {
            ...mapGetters('cities', ['getCityNameById'])
        },
    }
</script>

<style lang="scss" scoped>
    .title-block{
        width: 100%;
        height: 280px;
        background-color: $cards;
        margin-top: -70px;
        padding: 100px 0 30px;
        border-top-left-radius: 125px;
        border-bottom-left-radius: 125px;
        &-wrapper{
            width: min(100%, 1440px);
            margin: 0 auto;
            padding-left: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .left-side{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }
    .right-side{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 150px;
    }
    .search-btn{
        width: min-content;
        display: flex;
        background-color: $primary;
        color: $white;
        font-size: 1.5rem;
        font-weight: 700;
        border: none;
        padding: 1rem 2rem;
        border-radius: 5px;
        cursor: pointer;
        &__value{
            margin-right: 10px;
        }
        &__icon{
            transform: translateY(3px);
        }
    }
    .share-btn{
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    .breadcramps{
        font-size: 1.125rem;
        color: $green-dark;
        margin-bottom: 2rem;
        width: 100%;
        &__country{
            cursor: pointer;
            transition: 0.2s ease;
            &:hover{
                color: $accent;
                text-decoration: underline;
            }
        }
        &__region{
            cursor: pointer;
            transition: 0.2s ease;
            &:hover{
                color: $accent;
                text-decoration: underline;
            }
        }
        &__city{
            cursor: pointer;
            transition: 0.2s ease;
            &:hover{
                color: $accent;
                text-decoration: underline;
            }
        }
    }
    .hotel-title{
        font-size: 2.25rem;
        margin-right: 2rem;
    }

    @media screen and (max-width: 1440px) {
         .title-block{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            height: min-content;
            &-wrapper{
                padding-right: 2rem;
            }
        }
        .left-side{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        
    }
    @media screen and (max-width: 768px) {
         .title-block{
            &-wrapper{
                flex-wrap: wrap;
            }
        }
        .left-side{
            width: 100%;
        }
         .right-side{
            flex-direction: row;
        }
        .search-btn{
            margin-right: 2rem;
        }
    }
    @media screen and (max-width: 375px) {
         .title-block{
             margin-top: 0;
             padding: 1rem;
        }
    }
</style>