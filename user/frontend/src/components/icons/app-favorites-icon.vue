<template>
    <div class="icon">
        <svg viewBox="0 0 17 24" :class="{active: isIconActive, inactive: !isIconActive }" @mouseover="showDescription" @mouseleave="hideDescription" @click="$emit('action')">
            <path d="M13.4265 0.467623L13.4321 1.00094L13.5209 1.00001C13.9985 1.00124 14.4258 1.15658 14.7158 1.38996C14.9993 1.61813 15.1078 1.87897 15.112 2.09646V21.9574L8.67023 16.9514L8.05666 16.4746L7.44306 16.9513L1 21.9576V3.089H1.00123V2.09549C1.00541 1.87819 1.11388 1.61749 1.39736 1.38946C1.68729 1.15624 2.11448 1.00107 2.59185 1.00001L2.67564 1.00094L2.67564 1.001H2.68677H13.4215H13.4265V0.467623Z" />
        </svg>
        <span :class="{'icon-description': true, 'icon-description--active': isDescriptionActive }">{{ isIconActive ? 'Удалить из избранного' : 'В избранное' }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            isIconActive: {
                type: Boolean,
                default: false
            }
        },
        data: () => {
            return {
                isDescriptionActive: false
            }
        },
        methods: {
            showDescription(){
                this.isDescriptionActive = true;
            },
            hideDescription(){
                this.isDescriptionActive = false;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .active{
        fill: $primary;
    }
    .inactive{
        fill: none;
    }
    .icon-description{
        width: max-content;
        position: absolute;
        top: -150%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 5px;
        z-index: 100;
        padding: 0.5rem 1rem;
        text-align: center;
        background-color: $primary;
        color: $white;
        font-size: 0.7rem;
        font-weight: 700;
        opacity: 0;
        transition: 0.3s ease;
    }
    .icon-description--active{
        opacity: 1;
    }
</style>