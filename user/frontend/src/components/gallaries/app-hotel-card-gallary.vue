<template>
    <div class="gallary">
        <div class="gallary__main-image"
            v-if="images.length > 0"
            :style="`background-image: url(${images[imageIndex]});`">
        </div>
        <div class="gallary__alternative-image" v-else>
            <app-no-photo-icon />
        </div>
        <div class="gallary__images-list" v-if="images.length > 0">
            <div class="gallary__images-list-item"
                v-for="image, index in images.slice(0, 4)"
                :key="index"
                :style="`background-image: url(${image});`"
                @click="changeImage(index)">
            </div>
        </div>
    </div>
</template>

<script>
import AppNoPhotoIcon from "@/components/icons/app-no-photo-icon.vue";
    export default {
        components: {
            AppNoPhotoIcon
        },
        props: {
            images: {
                type: Object,
            }
        },
        data: () => {
            return {
                imageIndex: 0
            }
        },
        methods: {
            changeImage(index){
                this.imageIndex = index;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .gallary{
        width: 40%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        transition: 0.3s ease;
        &__alternative-image{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
        &__main-image{
            width: 100%;
            height: 220px;
            overflow: hidden;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            cursor: pointer;
        }
        &__images-list{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 10px;
            &-item{
                width: 60px;
                height: 40px;
                overflow: hidden;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                cursor: pointer;
            }
        }
    }

    @media screen and (max-width: 1280px) {
        .gallary{
            width: 100%;
            height: 220px;
            &__main-image{
                width: 80%;
            }
            &__images-list{
                width: 20%;
                flex-direction: column;
                height: 220px;
                padding: 0;
                &-item{
                    width: 60px;
                    height: 40px;
                    overflow: hidden;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                    cursor: pointer;
                }
            }
        }
    }

    @media screen and (max-width: 414px) {
        .gallary{
            width: 100%;
            height: max-content;
            &__main-image{
                width: 100%;
            }
            &__images-list{
                width: 100%;
                flex-direction: row;
                height: max-content;
                padding: 1rem 0;
            }
        }
    }
</style>