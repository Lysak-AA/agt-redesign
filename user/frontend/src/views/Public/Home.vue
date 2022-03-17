<template>
  <div class="home">
    <app-header />
    <app-desctop-navigation-panel />
    <app-mobile-navigation-panel />
    <app-main-menu-section />
    <app-search-section />
    <app-slider-section />
    <app-fast-links-section />
    <app-best-offers-section />
    <app-popular-ways-section />
    <app-top-offers-section />
    <app-advantages-section />
    <app-subscribe-section />
    <app-footer />
  </div>
</template>

<script>
//SECTIONS
import AppHeader from "@/sections/common/app-header.vue";
import AppDesctopNavigationPanel from "@/navigation/app-desctop-navigation-panel.vue";
import AppMobileNavigationPanel from "@/navigation/app-mobile-navigation-panel.vue";
import AppMainMenuSection from "@/sections/home/app-main-menu-section.vue";
import AppSearchSection from "@/sections/home/app-search-section.vue";
import AppSliderSection from "@/sections/home/app-slider-section.vue";
import AppFastLinksSection from "@/sections/home/app-fast-links-section.vue";
import AppBestOffersSection from "@/sections/home/app-best-offers-section.vue";
import AppPopularWaysSection from "@/sections/home/app-popular-ways-section.vue";
import AppTopOffersSection from "@/sections/home/app-top-offers-section.vue";
import AppAdvantagesSection from "@/sections/home/app-advantages-section.vue";
import AppSubscribeSection from "@/sections/home/app-subscribe-section.vue";
import AppFooter from "@/sections/common/app-footer.vue";

export default {
  name: "Home",
  components: {
    AppHeader,
    AppDesctopNavigationPanel,
    AppMobileNavigationPanel,
    AppMainMenuSection,
    AppSearchSection,
    AppSliderSection,
    AppFastLinksSection,
    AppBestOffersSection,
    AppPopularWaysSection,
    AppTopOffersSection,
    AppAdvantagesSection,
    AppSubscribeSection,
    AppFooter
  },
};
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    border-top: 5px solid $primary;
  }
</style>
