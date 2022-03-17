<template>
    <div class="double-range" :style="`width: ${doubleRangeWidth}${doubleRangeWidthUnits}`">
        <div class="left-side-block" @click="leftSideSlider.setCurrentPosition($event)">
            <div class="left-side-line">
                <div class="left-side-line-fill" :style="`width: ${leftSideSlider.leftBtnPosition}%`"></div>
            </div>
            <div class="left-side-btn"
                 :style="`left: ${leftSideSlider.leftBtnPosition}%`"
                 @mousedown.prevent="leftSideSlider.getInitialPosition($event)"
                 @mouseup="leftSideSlider.removeEvent"
                 @mouseout="leftSideSlider.removeEvent"
            >
                <div class="left-side-label">{{ leftSideSlider.getMinValue }}</div>
            </div>
        </div>
        <div class="right-side-block" @click="rightSideSlider.setCurrentPosition($event)">
            <div class="right-side-line">
                <div class="right-side-line-fill" :style="`transform: scaleX(${(100 - rightSideSlider.rightBtnPosition) * 0.01})`"></div>
            </div>
            <div class="right-side-btn"
                :style="`left: ${rightSideSlider.rightBtnPosition}%`"
                @mousedown.prevent="rightSideSlider.getInitialPosition($event)"
                @mouseup="rightSideSlider.removeEvent"
                @mouseout="rightSideSlider.removeEvent"
            >
                <div class="right-side-label">{{ rightSideSlider.getMaxValue }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed } from "vue";
export default {
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
        }

    },
    setup (props) {
        const leftSideSlider = reactive({
            initialPosition: 0,
            leftBtnPosition: 0,
            getInitialPosition: (e) => {
                leftSideSlider.initialPosition = e.target.offsetParent.offsetLeft;
                const leftSliderBlock = document.querySelector('.left-side-block');
                leftSliderBlock.addEventListener('mousemove', leftSideSlider.setCurrentPosition)
            },
            setCurrentPosition: (e) => {
                const doubleRange = document.querySelector('.double-range');
                const doubleRangeWidth = doubleRange.offsetWidth;
                leftSideSlider.leftBtnPosition = ((e.clientX - leftSideSlider.initialPosition) * 100) / (doubleRangeWidth / 2);
                if(leftSideSlider.leftBtnPosition < 0){
                    leftSideSlider.leftBtnPosition = 0
                } else if(leftSideSlider.leftBtnPosition > 100){
                    leftSideSlider.leftBtnPosition = 100
                }
            },
            removeEvent: () => {
                const leftSliderBlock = document.querySelector('.left-side-block');
                leftSliderBlock.removeEventListener('mousemove', leftSideSlider.setCurrentPosition);
            },
            getMinValue: computed(() => {
                let minValue = props.min;
                let min = props.min;
                let max = props.max;
                let percent = leftSideSlider.leftBtnPosition / 100;

                minValue = ((max - min) * percent) + min

                return Math.round(minValue);

            })
        })
        const rightSideSlider = reactive({
            initialPosition: 0,
            rightBtnPosition: 100,
            getInitialPosition: (e) => {
                rightSideSlider.initialPosition = e.target.offsetParent.offsetLeft;
                const rightSliderBlock = document.querySelector('.right-side-block');
                rightSliderBlock.addEventListener('mousemove', rightSideSlider.setCurrentPosition)
            },
            setCurrentPosition: (e) => {
                const doubleRange = document.querySelector('.double-range');
                const doubleRangeWidth = doubleRange.offsetWidth;
                rightSideSlider.rightBtnPosition = ((e.clientX - e.target.offsetParent.offsetLeft) * 100) / (doubleRangeWidth / 2);
                if(rightSideSlider.rightBtnPosition < 0){
                    rightSideSlider.rightBtnPosition = 0
                } else if(rightSideSlider.rightBtnPosition > 100){
                    rightSideSlider.rightBtnPosition = 100
                }
            },
            removeEvent: () => {
                const rightSliderBlock = document.querySelector('.right-side-block');
                rightSliderBlock.removeEventListener('mousemove', rightSideSlider.setCurrentPosition);
            },
            getMaxValue: computed(() => {
                let maxValue = props.max;
                let min = props.min;
                let max = props.max;
                let percent = rightSideSlider.rightBtnPosition / 100;

                maxValue = ((max - min) * percent) + min;

                if(maxValue < leftSideSlider.getMinValue){
                    maxValue = leftSideSlider.getMinValue;
                }

                return Math.round(maxValue);

            })
        })

        return {
            leftSideSlider,
            rightSideSlider
        }
    }
}
</script>

<style lang="scss" scoped>
    .double-range{
        height: 40px;
        display: flex;
        .left-side-block{
            width: 50%;
            height: 100%;
            position: relative;
            .left-side-line{
                width: 100%;
                height: 4px;
                background-color: red;
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
                width: 20px;
                height: 20px;
                border-radius: 100%;
                background-color: red;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%) translateX(-10px);
                z-index: 2;
                cursor: pointer;
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
                background-color: red;
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
                width: 20px;
                height: 20px;
                border-radius: 100%;
                background-color: red;
                position: absolute;
                left: 100%;
                top: 50%;
                transform: translateY(-50%) translateX(-10px);
                z-index: 2;
                cursor: pointer;
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