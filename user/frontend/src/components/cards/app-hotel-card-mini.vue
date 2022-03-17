<template>
    <div class="hotel-card-mini" v-if="hotel" @click="$emit('action')">
        <div class="hotel-card-mini__image">
            <img :src="hotel.images[0]" alt="">
        </div>
        <div class="hotel-card-mini__title">{{ hotel.name }}</div>
        <app-hotel-rating :stars="hotel.desc.Звёздность" />
    </div>
</template>

<script>
import AppHotelRating from "@/components/ratings/app-hotel-rating.vue";
    export default {
        props: {
            hotel: {
                type: Object,
                default: null
            }
        },
        components: {
            AppHotelRating
        }
    }
</script>

<style lang="scss" scoped>
    .hotel-card-mini{
        width: 90%;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        margin: 0 auto 1rem;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        &__image{
            width: 100%;
            border-radius: 5px;
            overflow: hidden;
            img{
                max-width: 100%;
            }
        }
        &__title{
            text-align: center;
            padding: 1rem;
            font-size: 18px;
            font-weight: 700;
        }
    }
</style>