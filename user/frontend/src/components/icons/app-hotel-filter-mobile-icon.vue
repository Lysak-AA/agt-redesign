<template>
    <div :class="{ 'filter-mobile-icon': true, 'filter-mobile-icon--opened': isFilterOpened }" @click="$emit('action')">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 11.1053C38.2548 11.1053 49 8.84312 49 6.05263C49 3.26214 38.2548 1 25 1C11.7452 1 1 3.26214 1 6.05263C1 8.84312 11.7452 11.1053 25 11.1053Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 6.05273C1 11.6864 11.3227 22.9134 16.616 28.2969C18.5578 30.2469 19.6478 32.8213 19.6667 35.502V49.0001L30.3333 43.9475V35.502C30.3333 32.8216 31.456 30.2599 33.384 28.2969C38.68 22.9134 49 11.6889 49 6.05273" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
</template>

<script>
    export default {
        props: {
            isFilterOpened: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .filter-mobile-icon{
        width: 100px;
        height: 100px;
        border-radius: 100%;
        position: fixed;
        top: 50%;
        left: -2%;
        transform: translateY(-50%);
        background-color: $primary;
        display: none;
        z-index: 200;
        transition: 0.3s ease;
        &--opened{
            left: 92%;
        }
    }

    @media screen and (max-width: 1024px) {
        .filter-mobile-icon{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    @media screen and (max-width: 920px) {
          .filter-mobile-icon{
            &--opened{
                left: 90%;
            }
        }
    }
    @media screen and (max-width: 720px) {
          .filter-mobile-icon{
            &--opened{
                left: 85%;
            }
        }
    }
</style>