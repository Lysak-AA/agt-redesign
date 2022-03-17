<template>
    <div class="mobile-navigation-panel">
        <router-link to="/" class="navigation-item">
            <BaseHomeIcon class="navigation-item__icon" />
            <span class="navigation-item__content">Главная</span>
        </router-link>
        <a href="tel:" class="navigation-item">
            <BasePhoneIconMobile class="navigation-item__icon" />
            <span class="navigation-item__content">Звонок</span>
        </a>
        <a href="mailto:info@agt8.ru" class="navigation-item">
            <BaseEmailIconMobile class="navigation-item__icon" />
            <span class="navigation-item__content">E-mail</span>
        </a>
        <router-link to="/search" class="navigation-item">
            <BaseSearchIcon class="navigation-item__icon" />
            <span class="navigation-item__content">Поиск</span>
        </router-link>
        <router-link to="/login" class="navigation-item">
            <BaseLoginIconMobile class="navigation-item__icon" />
            <span class="navigation-item__content">Кабинет</span>
        </router-link>
        <button class="navigation-item-btn navigation-item">
            <BaseMenuIcon class="navigation-item-btn__icon navigation-item__icon" />
            <span class="navigation-item-btn__content navigation-item__content">Меню</span>
        </button>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

    .mobile-navigation-panel{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 30px 0;
        background-color: $primary;
        border-top: 2px solid $white;
        z-index: 100;
        display: none;
    }
    @media screen and (max-width: 768px) {
        .mobile-navigation-panel{
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .navigation-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: $white;
            font-size: 24px;
            font-weight: 700;
            text-decoration: none;
            &-btn{
                background-color: transparent;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: none;
                color: $white;
            font-size: 24px;
            font-weight: 700;
            cursor: pointer;
                 &__icon{
                width: 36px;
                height: 36px;
            }
            &__content{
                margin: 10px 0 0;
            }
            }
            &__icon{
                width: 36px;
                height: 36px;
            }
            &__content{
                margin: 10px 0 0;
            }
        }
    }
    @media screen and (max-width: 600px) {
        .mobile-navigation-panel{
            padding: 15px 0;
        }
        .navigation-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: $white;
            font-size: 24px;
            font-weight: 700;
            text-decoration: none;
            &__icon{
                width: 18px;
                height: 18px;
            }
            &__content{
                display: none;
            }
        }
    }
</style>