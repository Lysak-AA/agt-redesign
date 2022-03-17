<template>
    <div class="icon">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" @mouseover="showDescription" @mouseleave="hideDescription">
            <path d="M3.05769 2.44444C3.05769 1.1 3.975 0 5.09615 0C6.21731 0 7.13462 1.1 7.13462 2.44444C7.13462 3.78889 6.21731 4.88889 5.09615 4.88889C3.975 4.88889 3.05769 3.78889 3.05769 2.44444ZM12.2308 22C11.66 22 11.1912 21.4622 11.1606 20.7778L10.7019 9.77778L7.13462 8.55556H1.01923C0.458654 8.55556 0 8.00556 0 7.33333C0 6.66111 0.458654 6.11111 1.01923 6.11111H6.11539L12.4958 0.647778C12.9238 0.281111 13.515 0.366667 13.8615 0.843333C14.2488 1.39333 14.1673 2.21222 13.6781 2.62778L10.335 5.5H13.25L20.4763 0.501111C20.6954 0.338921 20.9582 0.284398 21.2099 0.348914C21.4616 0.41343 21.6829 0.592004 21.8275 0.847387C21.9721 1.10277 22.0289 1.41524 21.9861 1.71963C21.9432 2.02402 21.804 2.29681 21.5975 2.48111L13.7596 9.77778L13.301 20.7778C13.2704 21.4622 12.8015 22 12.2308 22Z" fill="#417FB8"/>
        </svg>
        <span :class="{'icon-description': true, 'icon-description--active': isDescriptionActive }">{{ 'Спорт-комплекс' }}</span>
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