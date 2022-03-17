<template>
    <router-link :to="`/${link}`" class="main-menu-card">
        <span class="main-menu-card__icon">
            <BaseWorldIcon v-if="icon === 'tours'" />
            <BaseHotelsIcon v-if="icon === 'hotels'" />
            <BaseSanatoriesIcon v-if="icon === 'sanatories'" />
            <BaseExcursionsIcon v-if="icon === 'excursions'" />
            <BaseSkyIcon v-if="icon === 'sky'" />
            <BaseAviaIcon v-if="icon === 'avia'" />
            <BaseServiceIcon v-if="icon === 'service'" />
            <BaseDollarIcon v-if="icon === 'dollar'" />
        </span>
        <h5 class="main-menu-card__title">
            {{ title }}
        </h5>
    </router-link>
</template>

<script>
export default {
    props: {
        link: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        icon: {
            type: String,
            default: "tours"
        }
    }
}
</script>

<style lang="scss" scoped>
    .main-menu-card{
        width: 270px;
        height: 230px;
        margin: 20px;
        padding: 20px;
        border-radius: 10px;
        background-color: $white;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        transition: 0.5s ease;
        cursor: pointer;
        text-decoration: none;
        &__title{
            font-size: 24px;
            font-weight: 700;
            text-transform: uppercase;
            color: $title;
            transform: scale(1.03);
            text-align: center;
        }
        &:hover{
            transform: scale(1.03);
            -webkit-box-shadow: 6px 10px 22px 0px $primary-shadow;
            -moz-box-shadow: 6px 10px 22px 0px $primary-shadow;
            box-shadow: 6px 10px 22px 0px $primary-shadow;
        }
    }
</style>