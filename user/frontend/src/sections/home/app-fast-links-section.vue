<template>
    <section class="fast-links">
        <router-link to="/early-booking" class="fast-link">
            <BaseFastLinkWatchIcon class="fast-link__icon" />
            <span class="fast-link__content">Раннее бронирование 2022</span>
        </router-link>
        <router-link to="/active-tours" class="fast-link">
            <BaseFastLinkSkyIcon class="fast-link__icon" />
            <span class="fast-link__content">Горнолыжные курорты</span>
        </router-link>
        <router-link to="/summer-2022" class="fast-link">
            <BaseFastLinkSunIcon class="fast-link__icon" />
            <span class="fast-link__content">Лето 2022</span>
        </router-link>
        <router-link to="/mountings-and-sea" class="fast-link">
            <BaseFastLinkSeaIcon class="fast-link__icon" />
            <span class="fast-link__content">Горе и море</span>
        </router-link>
        <router-link to="/child-rest" class="fast-link">
            <BaseFastLinkFamilyIcon class="fast-link__icon" />
            <span class="fast-link__content">Детский отдых</span>
        </router-link>
        <router-link to="/covid-reabilitation" class="fast-link">
            <BaseFastLinkLungIcon class="fast-link__icon" />
            <span class="fast-link__content">Ковид реабилитация</span>
        </router-link>
        <router-link to="/credit-tours" class="fast-link">
            <BaseFastLinkDollarIcon class="fast-link__icon" />
            <span class="fast-link__content">Туры в рассрочку</span>
        </router-link>
        <router-link to="/actions-and-discounts" class="fast-link">
            <BaseFastLinkActionIcon class="fast-link__icon" />
            <span class="fast-link__content">Акции и скидки</span>
        </router-link>
    </section>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .fast-links{
        width: 100%;
        padding: 40px 0;
        background-color: $primary;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
    }
    .fast-link{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: $white;
        max-width: 200px;
        height: 200px;
        margin: 0 15px 15px;
        transition: 0.4s ease;
        &__icon{
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
            transition: 0.4s ease;
        }
        &__content{
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            flex-grow: 1;
        }
        &:hover .fast-link__icon{
            fill: $accent;
            stroke: $accent;
            transform: translateY(-10px)
        }
    }

    @media screen and (max-width: 920px) {
        .fast-link{
            width: 25%;
            max-width: 200px;
            margin: 0 0 15px 0;
            }
        }
    @media screen and (max-width: 768px) {
        .fast-link{
            width: 30%;
            }
        }
    @media screen and (max-width: 550px) {
        .fast-link{
            width: 50%;
            }
        }
    @media screen and (max-width: 414px) {
        .fast-link{
            width: 90%;
            }
        }
</style>