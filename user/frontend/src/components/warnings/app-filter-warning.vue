<template>
    <div class="filter-warning">
        <p class="filter-warning__content">{{ text }}</p>
        <!-- <button class="filter-warning__action">{{ btn }}</button> -->
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                default: ""
            },
            // btn: {
            //     type: String,
            //     default: "Понятно"
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .filter-warning{
        position: fixed;
        top: 50%;
        left: 50%;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        background-color: $primary;
        color: $white;
        font-size: 1.5rem;
        z-index: 1000;
        transform: translate(-50%, -50%);
        border-radius: 1rem;
        &__content{
            text-align: center;
        }
    }
</style>