<template>
    <div class="icon">
        <svg width="33" height="20" viewBox="0 0 33 20" fill="none" xmlns="http://www.w3.org/2000/svg" @mouseover="showDescription" @mouseleave="hideDescription">
            <path d="M8 11C10.2091 11 12 9.433 12 7.5C12 5.567 10.2091 4 8 4C5.79086 4 4 5.567 4 7.5C4 9.433 5.79086 11 8 11Z" fill="#417FB8"/>
            <path d="M0.407471 17.5556C0.407471 17.5556 2.48154 12.8889 7.81488 12.8889C13.1482 12.8889 15.2223 17.5556 15.2223 17.5556V20H0.407471V17.5556Z" fill="#3E444F"/>
            <path d="M33.0001 17.5556C33.0001 17.5556 30.926 12.8889 25.5927 12.8889C20.2594 12.8889 18.1853 17.5556 18.1853 17.5556V20H33.0001V17.5556Z" fill="#3E444F"/>
            <path d="M16.5 9C18.9853 9 21 6.98528 21 4.5C21 2.01472 18.9853 0 16.5 0C14.0147 0 12 2.01472 12 4.5C12 6.98528 14.0147 9 16.5 9Z" fill="#FF9A0D"/>
            <path d="M26 17.2632C26 17.2632 23.525 12 17 12C10.475 12 8 17.2632 8 17.2632V20H26V17.2632Z" fill="#417FB8"/>
            <path d="M25.5 11C27.433 11 29 9.433 29 7.5C29 5.567 27.433 4 25.5 4C23.567 4 22 5.567 22 7.5C22 9.433 23.567 11 25.5 11Z" fill="#417FB8"/>
            <path d="M8 11C10.2091 11 12 9.433 12 7.5C12 5.567 10.2091 4 8 4C5.79086 4 4 5.567 4 7.5C4 9.433 5.79086 11 8 11Z" fill="#417FB8"/>
            <path d="M25.5 11C27.433 11 29 9.433 29 7.5C29 5.567 27.433 4 25.5 4C23.567 4 22 5.567 22 7.5C22 9.433 23.567 11 25.5 11Z" fill="#417FB8"/>
        </svg>
        <span :class="{'icon-description': true, 'icon-description--active': isDescriptionActive }">{{ conference }}</span>
    </div>
</template>

<script>
     export default {
        props: {
            conference: {
                type: String            }
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
        max-width: 250px;
        position: absolute;
        top: -200%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 5px;
        z-index: -10;
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

    @media screen and (max-width: 414px) {
        .icon-description{
            left: 0%;
            transform: translateX(-70%);
        }
    }
</style>