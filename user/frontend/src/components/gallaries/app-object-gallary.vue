<template>
    <div class="gallary">
        <div class="gallary-main-picture" v-if="images.length > 0">
            <img :src="images[currentIndex]" alt="">
            <app-gallary-arrow-icon 
                class="gallary-left-arrow"
                @action="prevImage"
            />
            <app-gallary-arrow-icon 
                class="gallary-right-arrow"
                @action="nextImage"
            />
        </div>
        <div class="gallary__alternative-image" v-else>
            <app-no-photo-icon />
        </div>
        <div class="gallary-subgallary">
            <img 
                v-for="image, index in images"
                :key="index"
                :src="image"
                alt="hotel"
                @click="changeImage(index)"
            >
        </div>
    </div>
</template>

<script>
import appGallaryArrowIcon from '@/components/icons/app-gallary-arrow-icon.vue';
import AppNoPhotoIcon from '@/components/icons/app-no-photo-icon.vue';
    export default {
  components: { appGallaryArrowIcon, AppNoPhotoIcon },
        props: {
            images: {
                type: Object,
                default: {}
            }
        },
        data: () => {
            return {
                currentIndex: 0
            }
        },
        methods: {
            changeImage(index){
                this.currentIndex = index;
            },
            prevImage(){
                this.currentIndex === 0 ? this.currentIndex = 0 : this.currentIndex--;
            },
            nextImage(){
                this.currentIndex > this.images.length ? this.currentIndex = this.images.length : this.currentIndex++;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .gallary{
        padding: 2rem 0;
        width: min(100%, 1440px);
        margin-inline: auto;
        display: flex;
        justify-content: space-between;
        &-main-picture{
            overflow: hidden;
            width: 70%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            max-height: 600px;
            overflow: hidden;
            border-radius: 10px;
            img{
                border-radius: 10px;
                max-width: 100%;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            }
        }
        &-subgallary{
            width: 30%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            height: 600px;
            overflow: scroll;
            img{
                width: 150px;
                height: 100px;
                border-radius: 5px;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                margin-left: 2rem;
                margin-bottom: 2rem;
            }
        }
        &-left-arrow, &-right-arrow{
            width: 36px;
            height: 36px;
            position: absolute;
            z-index: 100;
        }
        &-left-arrow{
            top: 50%;
            left: 5%;
            transform: translateY(-50%);
        }
        &-right-arrow{
            top: 50%;
            right: 5%;
            transform: translateY(-50%) rotate(180deg);
        }
    }

    @media (max-width: 1440px){
         .gallary{
            padding: 2rem 1rem;
        }
    }

    @media (max-width: 1280px){
        .gallary{
            padding: 2rem 0;
            justify-content: center;
            flex-wrap: wrap;
            &-main-picture{
                width: 95%;
            }
            &-subgallary{
                width: 95%;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: center;
                height: 180px;
                overflow-x: scroll;
            }
        }
    }
</style>