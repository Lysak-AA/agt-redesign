<template>
    <div :class="{ 'loader': true, 'loader--active': isLoaderActive }" :style="`width: ${size}px; height: ${size}px`">

    </div>
</template>

<script>
    export default {
        props: {
            isLoaderActive: {
                type: Boolean,
                default: false
            },
            size: {
                type: Number,
                default: 24
            }
        }
    }
</script>

<style lang="scss" scoped>
    .loader{
        border-radius: 50%;
        border: 2px solid $primary;
        border-top: 2px solid $white;
        border-right: 2px solid $white;
        background-color: transparent;
        display: none;
        animation: rotate 1.5s cubic-bezier(.17,.67,.83,.67) infinite;
        align-self: center;
        &--active{
            display: block;
        }
    }
    @keyframes rotate {
        0%{
            transform: rotate(0deg);
        }
        50%{
            transform: rotate(180deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }

    </style>