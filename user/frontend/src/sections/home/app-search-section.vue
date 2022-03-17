<template>
    <section class="search">
        <h2 class="search__title">Сервис поиска проживания</h2>
        <h3 class="search__subtitle">забронируй отдых своей мечты</h3>
        <app-main-search-form />
    </section>
</template>

<script>
import AppMainSearchForm from "@/components/forms/app-main-search-form.vue";
    export default {
        components: {
            AppMainSearchForm
        }
    }
</script>

<style lang="scss" scoped>
    .search{
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        &__title{
            text-transform: uppercase;
            font-size: 64px;
            font-weight: 700;
            text-align: center;
            color: $title;
        }
        &__subtitle{
            text-transform: lowercase;
            font-size: 36px;
            font-weight: 400;
            text-align: center;
            color: $title;
        }
    }

    @media screen and (max-width: 768px) {
        .search{
            &__title{
                font-size: 36px;
            }
            &__subtitle{
                font-size: 18px;
                margin: 20px 0 0;
            }
        }
    }
</style>