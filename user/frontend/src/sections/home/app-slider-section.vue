<template>
    <section class="slider">
        <BaseSliderArrowIcon  class="slider__arrowLeft"/>
        <BaseSliderArrowIcon  class="slider__arrowRight"/>
        <h2 class="slider__title">Актуальные предложения</h2>
        <div class="slider-item" style="background-image: url(./img/slide.png)">
            <!-- <img src="" alt="" class="slider-item__image"> -->
            <div class="slider-item__titleBlock">
                <div class="slider-item__title">Ранне бронирование 2022</div>
                <router-link to="/early-booking" class="slider-item__link">подробнее</router-link>
                <div class="slider-item__actionLabel">акция</div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .slider{
        width: 100%;
        max-width: 1728px;
        margin: 0 auto;
        padding: 100px 0 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        &__arrowLeft, &__arrowRight{
            width: 100px;
            height: 100px;
            position: absolute;
            top: 60%;
            z-index: 15;
            cursor: pointer;
        }
        &__arrowLeft{
            left: 5%;
        }
        &__arrowRight{
            right: 5%;
            transform: rotate(180deg);
        }
        &__title{
            font-size: 64px;
            font-weight: 700;
            text-transform: uppercase;
            color: $title;
            text-align: center;
            margin-bottom: 50px;
        }
        &-item{
            width: 100%;
            height: 900px;
            position: relative;
            z-index: 10;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            &__titleBlock{
                width: 45%;
                min-width: 300px;
                max-width: 900px;
                height: 350px;
                padding: 70px 35px 30px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                background-color: $primary-opacity50;
                position: absolute;
                top: 20%;
                left: 20%;
                z-index: 10;
                border-radius: 10px;
            }
            &__title{
                font-size: 64px;
                font-weight: 700;
                color: $white;
                text-align: center;
                flex-grow: 1;
            }
            &__link{
                max-width: 400px;
                min-width: 300px;
                width: 40%;
                height: 60px;
                border-radius: 5px;
                background-color: $accent;
                color: $white;
                font-size: 24px;
                font-weight: 700;
                text-decoration: none;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            &__actionLabel{
                position: absolute;
                top: -5%;
                left: -5%;
                padding: 0.5em 1em;
                border-radius: 5px;
                background-color: $primary;
                color: $white;
                font-size: 24px;
                font-weight: 700;
            }
        }
    }

    @media screen and (max-width: 1024px) {
        .slider{
            &__arrowLeft, &__arrowRight{
                width: 50px;
                height: 50px;
            }
            &-item{
                height: 600px;            
                &__titleBlock{
                    width: 60%;
                }
                &__title{
                    font-size: 48px;
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        .slider{
            &__title{
                font-size: 48px;
            }
            &-item{
                &__titleBlock{
                    width: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 0;
                }
                &__title{
                    font-size: 36px;
                }
                &__actionLabel{
                    position: absolute;
                    top: -5%;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }
    }
    @media screen and (max-width: 414px) {
        .slider{
            &__title{
                font-size: 36px;
            }
            &-item{
                &__titleBlock{
                    width: 100%;
                    height: 100%;
                    top: 0;
                    transform: translateY(0);
                    left: 0;
                }
                &__actionLabel{
                    position: absolute;
                    top: -5%;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }
    }
</style>