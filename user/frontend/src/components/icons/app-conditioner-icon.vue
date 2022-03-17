<template>
    <div class="icon">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" @mouseover="showDescription" @mouseleave="hideDescription">
            <path d="M4.38778 0.606256C7.24778 -1.05281 10.3522 0.972901 11.0489 4.12605C11.5744 4.12605 12.0878 4.23604 12.5522 4.4377C13.1878 3.88773 13.75 3.13611 13.53 2.29282C13.0167 0.322106 15.9622 -1.2728 18.7611 1.44954C20.9733 3.59441 18.2722 5.92261 14.0556 6.44508C14.0556 6.83922 13.9211 7.23337 13.64 7.58168C14.3733 8.04915 15.3756 8.47079 16.5 8.3058C19.1033 7.92083 21.2422 10.1207 17.6122 12.2289C14.7522 13.888 11.6478 11.8623 10.9511 8.70911C10.4256 8.70911 9.91222 8.58995 9.46 8.3883C8.82444 8.93827 8.25 9.69905 8.47 10.5423C8.98333 12.5039 6.03778 14.108 3.23889 11.3856C1.01444 9.23158 3.72778 6.90339 7.94444 6.39008C7.94444 5.99594 8.10333 5.61096 8.37222 5.26265C7.63889 4.79518 6.63667 4.36437 5.5 4.52936C2.89667 4.91434 0.757778 2.71447 4.38778 0.606256V0.606256ZM2.44444 14.6671H4.88889C5.5372 14.6671 6.15895 14.8602 6.61737 15.204C7.07579 15.5478 7.33333 16.0141 7.33333 16.5003V22H4.88889V20.1668H2.44444V22H0V16.5003C0 16.0141 0.257539 15.5478 0.715961 15.204C1.17438 14.8602 1.79614 14.6671 2.44444 14.6671V14.6671ZM2.44444 16.5003V18.3335H4.88889V16.5003H2.44444ZM12.1367 14.6671H14.6667L11.0856 22H8.55556L12.1367 14.6671ZM18.3333 14.6671H22V16.5003H18.3333V20.1668H22V22H18.3333C17.685 22 17.0633 21.8069 16.6049 21.4631C16.1464 21.1193 15.8889 20.653 15.8889 20.1668V16.5003C15.8889 16.0141 16.1464 15.5478 16.6049 15.204C17.0633 14.8602 17.685 14.6671 18.3333 14.6671V14.6671Z" fill="#417FB8"/>
        </svg>
        <span :class="{'icon-description': true, 'icon-description--active': isDescriptionActive }">{{ 'Кондиционер в номере' }}</span>
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
        z-index: 100;
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
    }
</style>