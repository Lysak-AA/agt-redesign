<template>
    <button
        :class="{ 'set-options-btn': true, 'set-options-btn--active': isSetOptionsBtnActive }"
        @click.prevent="$emit('action')">
        Применить
    </button>
</template>

<script>
    export default {
        props: {
            isSetOptionsBtnActive: {
                type: Boolean,
                default: false
            },
            top: {
                type: Number,
            },
            left: {
                type: Number,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .set-options-btn{
        padding: 1rem;
        border: none;
        border-radius: 5px;
        background-color: $primary;
        position: absolute;
        top: 50%;
        right: -40%;
        color: $white;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        display: none;
        opacity: 0;
        z-index: -100;
        &::before{
            content: '';
            position: absolute;
            top: 50%;
            left: -20px;
            transform: translate(0, -50%);
            border-top: 10px solid transparent;
            border-left: 10px solid transparent;
            border-right: 10px solid $primary;
            border-bottom: 10px solid transparent;

        }
        &--active{
            display: block;
            opacity: 1;
            z-index: 300;
            transition: 0.3s ease;
        }
    }
</style>