<template>
    <div class="subfilter">
        <div class="subfilter-price">
            <svg class="subfilter-price__icon" width="30" height="30" viewBox="0 0 30 30" @click="isSubfilterPriceMenuActive = !isSubfilterPriceMenuActive">
                <path d="M10.1257 13.9011V28.1256C10.1258 28.3174 10.1748 28.5061 10.2683 28.6736C10.3617 28.8411 10.4965 28.982 10.6597 29.0828C10.823 29.1835 11.0093 29.2409 11.2009 29.2494C11.3926 29.2579 11.5832 29.2172 11.7547 29.1313L18.5047 25.7563C18.6914 25.6628 18.8483 25.5192 18.958 25.3416C19.0677 25.1639 19.1257 24.9593 19.1257 24.7506V13.9011L28.9965 1.83883C29.0902 1.72448 29.1604 1.5928 29.2032 1.45131C29.2459 1.30983 29.2604 1.1613 29.2458 1.01421C29.2312 0.867123 29.1877 0.724355 29.1179 0.59406C29.0481 0.463766 28.9533 0.348495 28.839 0.25483C28.7246 0.161165 28.593 0.0909395 28.4515 0.0481634C28.31 0.00538722 28.1615 -0.00910195 28.0144 0.00552326C27.8673 0.0201485 27.7245 0.0636017 27.5942 0.133402C27.4639 0.203202 27.3487 0.297982 27.255 0.41233L17.13 12.7873C16.9654 12.9885 16.8755 13.2406 16.8757 13.5006V24.0553L12.3757 26.3053V13.5006C12.376 13.2406 12.2861 12.9885 12.1215 12.7873L3.4995 2.25058H21.3757C21.6741 2.25058 21.9603 2.13205 22.1712 1.92107C22.3822 1.7101 22.5007 1.42395 22.5007 1.12558C22.5007 0.827211 22.3822 0.541063 22.1712 0.330085C21.9603 0.119107 21.6741 0.000580494 21.3757 0.000580494H1.12575C0.91263 0.000438314 0.703852 0.0608364 0.523725 0.174743C0.343597 0.288649 0.19953 0.451377 0.108296 0.643982C0.0170614 0.836588 -0.0175865 1.05115 0.00838585 1.26268C0.0343582 1.47421 0.119882 1.67401 0.255001 1.83883L10.1257 13.9011Z" fill="#417FB8"/>
            </svg>
            <span class="subfilter-price__content" v-if="sortingBy">
                <span class="hotels-page-main-subfilter-price__content-title">{{ sortingBy === 'price' ? 'По цене ' : 'По звездности ' }}:</span>
                <span class="hotels-page-main-subfilter-price__content-value">{{ lessFirst ? ' Сначала ниже' : ' Сначала выше' }}</span>
                <app-close-icon class="subfilter-price__close-icon" @click="cleanFilter"/>
            </span>
            <form :class="{'subfilter-price-menu': true, 'subfilter-price-menu--active': isSubfilterPriceMenuActive }">
                <app-radio-input 
                    :options="minPriceCheckboxOptions"
                    @action="setPriceSorting($event)"
                />
                <app-radio-input 
                    :options="maxPriceCheckboxOptions"
                    @action="setStarsSorting($event)"
                />
                <button class="subfilter-price-menu__btn" @click.prevent="setSortingPrincipe">Применить</button>
                <span class="subfilter-price-menu__sorting" @click="toggleSortPrincipe">{{ lessFirst ? 'Сначала ниже' : 'Сначала выше' }}</span>
            </form>
        </div>
    </div>
</template>

<script>
import AppRadioInput from "@/components/inputs/app-radio-input.vue";
import AppCloseIcon from "@/components/icons/app-close-icon.vue";

    export default {
        components: {
            AppRadioInput,
            AppCloseIcon
        },
        data: () => {
            return {
                minPriceCheckboxOptions: {
                    id: "price",
                    label: "По цене",
                    name: "a",
                },
                maxPriceCheckboxOptions: {
                    id: "stars",
                    label: "По звездности",
                    name: "a",
                },
                sortingBy: null,
                lessFirst: true,
                isSubfilterPriceMenuActive: false
            }
        },
        methods: {
            setPriceSorting(id){
                this.sortingBy = id;
            },
            setStarsSorting(id){
                this.sortingBy = id;
            },
            toggleSortPrincipe(){
                this.lessFirst = !this.lessFirst;
            },
            setSortingPrincipe(){
                this.isSubfilterPriceMenuActive = false;
                this.$emit('getSortingPrincipe', {
                    sortingBy: this.sortingBy,
                    lessFirst: this.lessFirst
                })
            },
            cleanFilter(){
                this.sortingBy = null;
                this.$emit('cleanFilter');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .subfilter{
        padding: 30px 0;
        display: flex;
        justify-content: space-between;
        &-price{
            display: flex;
            align-items: center;
            position: relative;
            &__icon{
                margin-right: 15px;
                cursor: pointer;
            }
            &__content-title{
                font-size: 18px;
                text-decoration: underline;
                color: $title;
                cursor: pointer;
                margin-right: 5px;
            }
            &__content-value{
                font-size: 18px;
                font-weight: 700;
                color: $title;
                cursor: pointer;
                margin-left: 10px;
                display: inline-block;
            }
            &__close-icon{
                margin-left: 10px;
                transform: translateY(3px);
            }
            &-menu{
                width: 300px;
                position: absolute;
                left: 0;
                bottom: -530%;
                border: 1px solid $title;
                border-radius: 10px;
                padding: 10px;
                display: none;
                opacity: 0;
                transition: 0.4s ease;
                background-color: $secondary;
                &__btn{
                    align-self: center;
                    border: none;
                    border-radius: 5px;
                    padding: 0.5rem 1rem;
                    background-color: $primary;
                    color: $white;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                }
                &__sorting{
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    cursor: pointer;
                }
            }
            &-menu--active{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                opacity: 1;
                z-index: 300;
            }
        }    
    }
</style>