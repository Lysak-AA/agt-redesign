<template>
    <div class="icon">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" @mouseover="showDescription" @mouseleave="hideDescription">
            <path d="M1 8.1431C7 -1.38103 15 -1.38103 21 8.1431" stroke="#417FB8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 13.8573C8.6 8.14308 13.4 8.14308 17 13.8573" stroke="#417FB8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 21C11.5523 21 12 20.3604 12 19.5715C12 18.7825 11.5523 18.1429 11 18.1429C10.4477 18.1429 10 18.7825 10 19.5715C10 20.3604 10.4477 21 11 21Z" stroke="#417FB8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span :class="{'icon-description': true, 'icon-description--active': isDescriptionActive }">{{ 'Wi-Fi' }}</span>
    </div>
</template>

<script>
     export default {
        props: {
            isIconActive: {
                type: Boolean,
                default: false
            }
        },
        data: () => {
            return {
                isDescriptionActive: false
            }
        },
        methods: {
            showDescription(){
                this.isDescriptionActive = true;
            },
            hideDescription(){
                this.isDescriptionActive = false;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .icon{
        position: relative;
    }
    .icon-description{
        width: max-content;
        position: absolute;
        top: -200%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 5px;
        z-index: -1;
        padding: 0.5rem;
        text-align: center;
        background-color: $primary;
        color: $white;
        font-size: 0.7rem;
        font-weight: 700;
        opacity: 0;
        transition: 0.3s ease;
    }
    .icon-description--active{
        opacity: 1;
        z-index: 100;
    }
</style>