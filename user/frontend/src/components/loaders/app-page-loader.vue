<template>
    <div class="page-loader">
        <app-loader :isLoaderActive="true" :size="48" />
    </div>
</template>

<script>
import AppLoader from "@/components/loaders/app-loader.vue";

    export default {
       name: "AppPageLoader",
       components: {
           AppLoader
       } 
    }
</script>

<style lang="scss" scoped>
.page-loader{
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff80;
    z-index: 1500;
}
</style>