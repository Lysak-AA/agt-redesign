<template>
     <div class="filter-price">
        <app-set-options-btn :isSetOptionsBtnActive="isSetOptionsBtnActive" @action="$emit('action')"/>
        <h5 class="filter-price__title">Цена за ночь на человека, руб.</h5>
        <div class="filter-price-minmax-inputs">
            <input type="text" class="filter-price-minmax-inputs__min-field" v-model="price.minPrice" @change="$emit('action', price)">
            <BaseArrowIcon way="left" />
            <span class="filter-price-minmax-inputs__minmax-label">min / max</span>
            <BaseArrowIcon way="right" />                
            <input type="text" class="filter-price-minmax-inputs__max-field" v-model="price.maxPrice" @change="$emit('action', price)">
        </div>
    </div>
    <div class="double-range" :style="`width: ${doubleRangeWidth}${doubleRangeWidthUnits}`">
        <div class="left-side-block"
            :id="leftBtnId"
            @click="leftSideSlider.setCurrentPosition($event)"
            @touch="leftSideSlider.setCurrentPosition($event)">
            <div class="left-side-line">
                <div 
                    class="left-side-line-fill" 
                    :style="`width: ${leftSideSlider.leftBtnPosition}%`"></div>
            </div>
            <div class="left-side-btn"
                 :style="`left: ${leftSideSlider.leftBtnPosition}%`"
                 @mousedown.prevent="leftSideSlider.getInitialPosition($event)"
                 @touchstart.prevent="leftSideSlider.getInitialPosition($event)"
                 @mouseup="leftSideSlider.removeEvent"
                 @touchend="leftSideSlider.removeEvent"
            >
                <div class="left-side-label">{{ price.minPrice }}</div>
            </div>
        </div>
        <div class="right-side-block" 
            :id="rightBtnId" 
            @click="rightSideSlider.setCurrentPosition($event)"
            @touch="rightSideSlider.setCurrentPosition($event)"
            >
            <div class="right-side-line">
                <div class="right-side-line-fill" :style="`transform: scaleX(${(100 - rightSideSlider.rightBtnPosition) * 0.01})`"></div>
            </div>
            <div class="right-side-btn"
                :style="`left: ${rightSideSlider.rightBtnPosition}%`"
                @mousedown.prevent="rightSideSlider.getInitialPosition($event)"
                @touchstart.prevent="rightSideSlider.getInitialPosition($event)"
                @mouseup="rightSideSlider.removeEvent"
                @touchend="rightSideSlider.removeEvent"
            >
                <div class="right-side-label">{{ price.maxPrice }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";
import AppSetOptionsBtn from "@/components/buttons/app-set-options-btn.vue";
import { mapState } from "vuex";
export default {
    components: {
        AppSetOptionsBtn
    },
    props: {
        doubleRangeWidth: {
            type: Number,
            default: 200 
        },
        doubleRangeWidthUnits: {
            type: String,
            default: 'px'
        },
        min: {
            type: Number,
            default: 100
        },
        max: {
            type: Number,
            default: 1000
        },
        isSetOptionsBtnActive: {
            type: Boolean,
            default: false
        },
        rightBtnId: {
            type: String,
            default: "right"
        },
        leftBtnId: {
            type: String,
            default: "left"
        }
    },
    emits: ['setMinPrice', 'setMaxPrice', 'action'],
    computed: mapState({
        isMinPriceActive: state => state.hotelFilterOptions.minprice.is_active,
        isMaxPriceActive: state => state.hotelFilterOptions.maxprice.is_active
    }),
    watch: {
        isMinPriceActive(oldPrice, newPrice){
            this.isMinPriceActive ? false : this.leftSideSlider.dropMinPrice();
        },
        isMaxPriceActive(oldPrice, newPrice){
            this.isMaxPriceActive ? false : this.rightSideSlider.dropMaxPrice();            
        },
    },
    setup (props, { emit }) {
        const price = reactive({
            minPrice: 500,
            maxPrice: 20000
        });
        const leftSideSlider = reactive({
            initialPosition: 0,
            leftBtnPosition: 0,
            dropMinPrice: () => {
                price.minPrice = props.min;
                leftSideSlider.leftBtnPosition = 0;
            },
            getInitialPosition: (e) => {
                leftSideSlider.initialPosition = e.target.offsetParent.offsetLeft;
                const leftSliderBlock = document.querySelector(`#${props.leftBtnId}`);
                leftSliderBlock.addEventListener('mousemove', leftSideSlider.setCurrentPosition);
                leftSliderBlock.addEventListener('touchmove', leftSideSlider.setCurrentPositionMobile);
            },
            setCurrentPosition: (e) => {
                leftSideSlider.leftBtnPosition = ((e.clientX - leftSideSlider.initialPosition) * 100) / (props.doubleRangeWidth / 2);
                if(leftSideSlider.leftBtnPosition < 0){
                    leftSideSlider.leftBtnPosition = 0
                } else if(leftSideSlider.leftBtnPosition > 100){
                    leftSideSlider.leftBtnPosition = 100
                }
                leftSideSlider.getMinValue();
            },
            setCurrentPositionMobile: (e) => {
                leftSideSlider.leftBtnPosition = ((e.changedTouches[0].clientX - leftSideSlider.initialPosition) * 100) / (props.doubleRangeWidth / 2);
                if(leftSideSlider.leftBtnPosition < 0){
                    leftSideSlider.leftBtnPosition = 0
                } else if(leftSideSlider.leftBtnPosition > 100){
                    leftSideSlider.leftBtnPosition = 100
                }
                leftSideSlider.getMinValue();
            },
            removeEvent: () => {
                const leftSliderBlock = document.querySelector('#left');
                leftSliderBlock.removeEventListener('mousemove', leftSideSlider.setCurrentPosition);
                leftSliderBlock.removeEventListener('touchmove', leftSideSlider.setCurrentPositionMobile);
                emit('setMinPrice', price.minPrice);
            },
            getMinValue: () => {
                let minValue = props.min;
                let min = props.min;
                let max = props.max;
                let percent = leftSideSlider.leftBtnPosition / 100;

                minValue = ((max - min) * percent) + min

                price.minPrice = Math.round(minValue);

            }
        })
        const rightSideSlider = reactive({
            initialPosition: 0,
            rightBtnPosition: 100,
            dropMaxPrice: () => {
                price.maxPrice = props.max;
                rightSideSlider.rightBtnPosition = 100;
            },
            getInitialPosition: (e) => {
                rightSideSlider.initialPosition = e.target.offsetParent.offsetLeft;
                const rightSliderBlock = document.querySelector(`#${props.rightBtnId}`);
                rightSliderBlock.addEventListener('mousemove', rightSideSlider.setCurrentPosition);
                rightSliderBlock.addEventListener('touchmove', rightSideSlider.setCurrentPositionMobile);
            },
            setCurrentPosition: (e) => {
                rightSideSlider.rightBtnPosition = ((e.clientX - e.target.offsetParent.offsetLeft) * 100) / (props.doubleRangeWidth / 2);
                if(rightSideSlider.rightBtnPosition < 0){
                    rightSideSlider.rightBtnPosition = 0
                } else if(rightSideSlider.rightBtnPosition > 100){
                    rightSideSlider.rightBtnPosition = 100
                }
                rightSideSlider.getMaxValue();
            },
            setCurrentPositionMobile: (e) => {
                console.log(e)
                rightSideSlider.rightBtnPosition = ((e.changedTouches[0].clientX - e.target.offsetParent.offsetLeft) * 100) / (props.doubleRangeWidth / 2);
                if(rightSideSlider.rightBtnPosition < 0){
                    rightSideSlider.rightBtnPosition = 0
                } else if(rightSideSlider.rightBtnPosition > 100){
                    rightSideSlider.rightBtnPosition = 100
                }
                rightSideSlider.getMaxValue();
            },
            removeEvent: () => {
                const rightSliderBlock = document.querySelector('#right');
                rightSliderBlock.removeEventListener('mousemove', rightSideSlider.setCurrentPosition);
                rightSliderBlock.removeEventListener('touchmove', rightSideSlider.setCurrentPositionMobile);
                emit('setMaxPrice', price.maxPrice);
            },
            getMaxValue: () => {
                let maxValue = props.max;
                let min = props.min;
                let max = props.max;
                let percent = rightSideSlider.rightBtnPosition / 100;

                maxValue = ((max - min) * percent) + min;

                if(maxValue < leftSideSlider.getMinValue){
                    maxValue = leftSideSlider.getMinValue;
                }

                price.maxPrice = Math.round(maxValue);

            }
        })

        return {
            leftSideSlider,
            rightSideSlider,
            price
        }
    },
}
</script>

<style lang="scss" scoped>
    .filter-price{
        width: 100%;
        padding-bottom: 1rem;
        position: relative;
        &__title{
            font-size: 18px;
            font-weight: bold;
            color: $title;
        }
        &-minmax-inputs{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 0;
            &__min-field, &__max-field{
                width: 90px;
                height: 50px;
                margin: 0 5px;
                border: 1px solid $title;
                border-radius: 5px;
                font-size: 18px;
                font-weight: 700;
                color: $title;
                text-align: center;
            }
            &__minmax-label{
                text-align: center;
            }
        }
        &-minmax-slider{
            
            &__decoration{
                width: 100%;
                height: 4px;
                border-radius: 2px;
                border: 1px solid $primary;
                background-color: transparent;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
    .double-range{
        height: 20px;
        display: flex;
        margin-inline: auto;
        .left-side-block{
            width: 50%;
            height: 100%;
            position: relative;
            .left-side-line{
                width: 100%;
                height: 4px;
                background-color: $primary;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                .left-side-line-fill{
                    width: 0;
                    height: 100%;
                    background-color: grey;
                }
            }
            .left-side-btn{
                width: 30px;
                height: 30px;
                border-radius: 100%;
                background-color: $primary;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%) translateX(-10px);
                z-index: 2;
                cursor: pointer;
                position: relative;
                &::before{
                    content: "";
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: $accent;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .left-side-label{
                    position: absolute;
                    top: -23px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }
        .right-side-block{
            width: 50%;
            height: 100%;
            position: relative;
            .right-side-line{
                width: 100%;
                height: 4px;
                background-color: $primary;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                .right-side-line-fill{
                    width: 100%;
                    height: 100%;
                    transform-origin: right;
                    background-color: grey;
                }
            }
            .right-side-btn{
                width: 30px;
                height: 30px;
                border-radius: 100%;
                background-color: $primary;
                position: absolute;
                left: 100%;
                top: 50%;
                transform: translateY(-50%) translateX(-10px);
                z-index: 2;
                cursor: pointer;
                position: relative;
                &::before{
                    content: "";
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: $accent;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .right-side-label{
                    position: absolute;
                    top: -23px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }
    }
</style>