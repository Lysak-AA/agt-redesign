<template>
    <div class="hotel-card" v-if="hotel">
        <app-favorites-icon class="add-to-favorites-icon" :isIconActive="false" />
        <div class="hotel-card-type">{{ hotel.type ? hotel.type : 'Гостиница' }}</div>
        <app-hotel-card-gallary :images="hotel.images" />
        <div class="hotel-card-content-block">
                <h3 class="hotel-card-content-block__hotel-name">{{ hotel.name }}</h3>
                <p class="hotel-card-content-block__hotel-adress">{{ hotel.address }}</p>
                <div class="hotel-card-content-block__price-and-rating">
                    <app-hotel-rating :stars="hotel.desc.Звёздность"/>
                    <span 
                        class="hotel-card-content-block__hotel-price"
                        v-if="!loadingPrice"
                        >{{ hotel.minprice ? 'от ' + hotel.minprice + ' руб' : 'Уточняйте цену на конкретные даты' }}</span>
                    <app-loader :isLoaderActive="loadingPrice" />
                </div>
                <p class="hotel-card-content-block__hotel-description">{{ hotel.desc.Расположение ? hotel.desc.Расположение.substring(0, 250) : "" }} <span v-if="hotel.desc.Расположение" @click="showDescription">...больше</span></p>
                <p :class="{'hotel-card-content-block__hotel-description-full': true, 'hotel-card-content-block__hotel-description-full--active': isDescriptionActive }">{{ hotel.desc.Расположение ? hotel.desc.Расположение : "" }}
                    <app-close-icon class="hotel-card-content-block__hotel-description-full-close-icon" @action="hideDescription"/>
                </p>
                <div class="hotel-card-content-block__hotel-options">
                    <app-wifi-icon v-if="hotel.desc['Wi-Fi'] || hotel.desc['Бесплатный Wi-Fi']" class="hotel-card-content-block__hotel-options-icon"/>
                    <app-parking-icon v-if="hotel.desc['Парковка']" class="hotel-card-content-block__hotel-options-icon" />
                    <app-conditioner-icon v-if="hotel.desc['Кондиционер в номере']" class="hotel-card-content-block__hotel-options-icon" />
                    <app-pool-icon v-if="hotel.desc['Открытый бассейн']" class="hotel-card-content-block__hotel-options-icon" />
                    <app-spa-icon v-if="hotel.desc['СПА-комплекс']" class="hotel-card-content-block__hotel-options-icon" />
                    <app-sport-icon v-if="hotel.desc['Тренажерный зал'] === 'да'" class="hotel-card-content-block__hotel-options-icon" />
                    <app-menu-icon v-if="hotel.desc['Питание']" class="hotel-card-content-block__hotel-options-icon" :menu="hotel.desc['Питание']" />
                    <app-conference-icon v-if="hotel.desc['Конгресс возможности']" class="hotel-card-content-block__hotel-options-icon" :conference="hotel.desc['Конгресс возможности']" />
                </div>
                <div class="hotel-card-content-block__footer">
                    <router-link :to="`/hotels/${hotel.id}`">
                        <div class="hotel-card-content-block__more-block">
                            <span class="more-title">ВЫБРАТЬ ТУР</span>
                            <app-arrow-right-icon />
                        </div>
                    </router-link>
                </div>
                <div class="hotel-card__tours" v-if="hotel.tours">
                    <app-tour-search-results-list :tours="hotel.tours"/>
                </div>
        </div>
    </div>
</template>

<script>
// COMPONENTS
import AppFavoritesIcon from "@/components/icons/app-favorites-icon.vue";
import AppHotelCardGallary from "@/components/gallaries/app-hotel-card-gallary.vue";
import AppCloseIcon from "@/components/icons/app-close-icon.vue";
import AppArrowRightIcon from "@/components/icons/app-arrow-right-icon.vue";
import AppWifiIcon from "@/components/icons/app-wifi-icon.vue";
import AppParkingIcon from "@/components/icons/app-parking-icon.vue";
import AppConditionerIcon from "@/components/icons/app-conditioner-icon.vue";
import AppPoolIcon from "@/components/icons/app-pool-icon.vue";
import AppSportIcon from "@/components/icons/app-sport-icon.vue";
import AppMenuIcon from "@/components/icons/app-menu-icon.vue";
import AppSpaIcon from "@/components/icons/app-spa-icon.vue";
import AppConferenceIcon from "@/components/icons/app-conference-icon.vue";
import AppHotelRating from "@/components/ratings/app-hotel-rating.vue";
import AppLoader from "@/components/loaders/app-loader.vue";
import AppTourSearchResultsList from '../lists/app-tour-search-results-list.vue';

    export default {
        components: {
            AppFavoritesIcon,
            AppArrowRightIcon,
            AppHotelCardGallary,
            AppCloseIcon,
            AppWifiIcon,
            AppParkingIcon,
            AppConditionerIcon,
            AppPoolIcon,
            AppSportIcon,
            AppMenuIcon,
            AppSpaIcon,
            AppConferenceIcon,
            AppHotelRating,
            AppLoader,
            AppTourSearchResultsList
        },
        props: {
            hotel: {
                type: Object,
            },
            loadingPrice: {
                type: Boolean,
            }
        },
        data: () => {
            return {
                imageIndex: 0,
                isDescriptionActive: false
            }
        },
        methods: {
            showDescription(){
                this.isDescriptionActive = true;
            },
            hideDescription(){
                if(this.isDescriptionActive){
                    this.isDescriptionActive = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hotel-card{
        width: min(90%, 850px);
        padding: 20px;
        margin-bottom: 30px;
        border-radius: 10px;
        background-color: $cards;
        filter: drop-shadow(6px 8px 6px rgba(0, 0, 0, 0.25));
        position: relative;
        display: flex;
        flex-wrap: wrap;
        transition: 0.3s ease;
        &__tours{
            width: 100%;
        }
        &-type{
            position: absolute;
            top: 30px;
            left: 30px;
            background-color: $primary;
            padding: 0.5rem;
            border-radius: 5px;
            font-size: 0.8rem;
            font-weight: 700;
            color: $white;
        }
        &-content-block{
            width: 60%;
            padding: 0 0 0 20px;
            &__hotel-name{
                width: 90%;
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 5px;
            }
            &__hotel-adress{
                font-size: 12px;
            }
            &__price-and-rating{
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
            }
            &__hotel-price{
                font-size: 24px;
                font-weight: 700;
                color: $title;
                text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            }
            &__hotel-description{
                font-size: 14px;
                color: black;
                padding-bottom: 1rem;
                span{
                    font-weight: 700;
                    cursor: pointer;
                }
                &-full{
                    width: 80%;
                    padding: 2rem;
                    background-color: $cards;
                    position: absolute;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-40%);
                    border-radius: 10px;
                    border: 1px solid $title;
                    transition: 0.3s ease;
                    z-index: -10;
                    opacity: 0;
                    &-close-icon{
                        position: absolute;
                        top: 10px;
                        right: 10px;
                    }
                    &--active{
                        transform: translateX(-50%);
                        opacity: 1;
                        z-index: 1000;
                    }
                }
                
            }
            &__hotel-options{
                margin: 10px;
                display: flex;
                &-icon{
                    margin-right: 10px;
                }
            }
            &__footer{
                display: flex;
                justify-content: flex-end;
                align-items: center;
                a{
                    text-decoration: none;
                }
            }
            &__hotel-phone{
                display: flex;
                align-items: center;
                color: $title;
                text-decoration: none;
                font-size: 18px;
                font-weight: 700;
                cursor: pointer;
                svg{
                    margin-right: 10px;
                }
            }
            &__more-block{
                display: flex;
                align-items: center;
                color: $title;
                font-size: 18px;
                font-weight: 700;
                cursor: pointer;
                svg{
                    margin-left: 10px;
                }
            }
        }
    }
    .add-to-favorites-icon{
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        width: 17px;
        height: 24px;
        stroke: $primary;
        stroke-width: 2;
    }


    @media screen and (max-width: 1280px) {
        .hotel-card{
            &-content-block{
                width: 100%;
                padding: 20px 0;
           
            }
        }
        .add-to-favorites-icon{
            left: 20px;
            top: calc(100% - 40px);
        }
    }
</style>