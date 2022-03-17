<template>
    <div class="icon">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" @mouseover="showDescription" @mouseleave="hideDescription">
            <path d="M0 0H2.44444V22H0V0ZM19.5556 0H3.66667V22H19.5556C20.9037 22 22 21.0133 22 19.8V2.2C22 0.9867 20.9037 0 19.5556 0ZM18.3333 11H7.33333V8.8H18.3333V11ZM18.3333 6.6H7.33333V4.4H18.3333V6.6Z" fill="#417FB8"/>
        </svg>
        <span :class="{'icon-description': true, 'icon-description--active': isDescriptionActive }">{{ menu }}</span>
    </div>
</template>

<script>
     export default {
        props: {
            menu: {
                type: String
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
        max-width: 200px;
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