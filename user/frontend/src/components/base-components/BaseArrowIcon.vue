<template>
    <svg class="arrow" @click="$emit('action')" v-if="way === 'left'" width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.3999 3.60001L5.3999 12.6L14.3999 21.6L12.5999 25.2L-9.52196e-05 12.6L12.5999 1.12867e-05L14.3999 3.60001Z" fill="#3E444F"/>
    </svg>
    <svg class="arrow" @click="$emit('action')" v-else width="15" height="26" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 21.6L9 12.6L0 3.6L1.8 0L14.4 12.6L1.8 25.2L0 21.6Z" fill="#3E444F"/>
    </svg>
</template>

<script>
    export default {
        props: {
            way: {
                type: String,
                default: "left"
            }
        }
    }
</script>

<style lang="scss" scoped>
    .arrow{
        cursor: pointer;
    }
</style>