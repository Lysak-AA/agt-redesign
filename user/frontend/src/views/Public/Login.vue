<template>
    <div class="login-page">
        <app-header />
        <app-desctop-navigation-panel />
        <app-mobile-navigation-panel />
        <section class="login-page-section">
            <h2 class="section-title">ВХОД В ЛИЧНЫЙ КАБИНЕТ</h2>
            <app-login-form />
        </section>
        <app-footer />
    </div>
</template>

<script>
//SECTIONS
import AppHeader from "@/sections/common/app-header.vue";
import AppFooter from "@/sections/common/app-footer.vue";
//NAVIGATION
import AppDesctopNavigationPanel from "@/navigation/app-desctop-navigation-panel.vue";
import AppMobileNavigationPanel from "@/navigation/app-mobile-navigation-panel.vue";
//COMPONENTS
import AppLoginForm from "@/components/forms/app-login-form.vue";
    export default {
        components: {
            AppHeader,
            AppDesctopNavigationPanel,
            AppMobileNavigationPanel,
            AppFooter,
            AppLoginForm
        },
    }
</script>

<style lang="scss" scoped>
    .login-page{
       &-section{
            padding: 6.25rem 0;
            display: flex;
            flex-direction: column;
            align-items: center;
       }
    }
</style>