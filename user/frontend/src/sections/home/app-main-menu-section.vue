<template>
    <section class="main-menu">
        <app-main-menu-section-card 
            v-for="(item, index) in items"
            :key="index"
            :link="item.link"
            :title="item.title"
            :icon="item.icon"
        />
    </section>
</template>

<script>
//COMPONENTS
import AppMainMenuSectionCard from "@/components/cards/app-main-menu-section-card.vue";
// DATA
import MainMenuCars from "@/data/navigation/main-menu-cards.js";
export default {
    components: {
        AppMainMenuSectionCard
    },
    setup () {
        const items = MainMenuCars;

        return {
            items
        }
    }
}
</script>

<style lang="scss" scoped>
    .main-menu{
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 100px 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

    }
</style>