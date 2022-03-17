<template>
        <ul class="filter-options-list">
            <template
                v-for="option in filterOptionsList"
                :key="option.id"
            >
            <li class="filter-options-list__item" v-if="option.is_active">
                <span class="filter-options-list__item-content">{{ option.name + option.value }}</span>
                <span class="filter-options-list__item-close-icon">
                    <app-close-icon 
                        :dark="false"
                        @click="$emit('action', option.id)"/>
                </span>
            </li>
            </template>
            <li 
                class="filter-options-list__item-clear"
                v-if="isAnyOptionActive"
                @click="$emit('clearFilter')"
            >Очистить фильтр</li>
        </ul>
</template>

<script>
import AppCloseIcon from "@/components/icons/app-close-icon.vue";
import { mapGetters } from "vuex";
    export default {
        props: {
            filterOptionsList: {
                type: Object,
                default: []
            },
            isAnyOptionActive: {
                type: Boolean,
                default: false
            }
        },
        components: {
            AppCloseIcon
        }
    }
</script>

<style lang="scss" scoped>
    .filter-options-list{
        width: 100%;
        padding: 2rem 0;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        list-style: none;
        &__item{
            padding: 1rem;
            margin: 0 1rem 1rem 0;
            display: flex;
            align-items: center;
            border-top-left-radius: 2rem;
            border-top-right-radius: 2rem;
            border-bottom-right-radius: 2rem;
            border-bottom-left-radius: 2rem;
            color: $white;
            background-color: $primary;
            &-content{
                margin-right: 10px;
            }
            &-close-icon{
                transform: translateY(2px);
            }
            &-clear{
                background-color: transparent;
                border: 1px solid $primary;
                padding: 1rem;
                margin: 0 1rem 1rem 0;
                border-radius: 2rem;
                font-weight: 700;
                color: $primary;
                cursor: pointer;
            }
        }
    }
</style>