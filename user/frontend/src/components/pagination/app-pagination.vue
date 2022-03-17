<template>
    <div class="pagination">
        <div class="pagination__left-arrow">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" @click="$emit('jumpOnFivePagesBack')">
                <g clip-path="url(#clip0_181_343)">
                <path d="M21 9.4L12 18.4L21 27.4L19.2 31L6.6 18.4L19.2 5.8L21 9.4Z" fill="#417FB8"/>
                <path d="M14 9.4L5 18.4L14 27.4L12.2 31L-0.399998 18.4L12.2 5.8L14 9.4Z" fill="#417FB8"/>
                </g>
                <defs>
                <clipPath id="clip0_181_343">
                <rect width="36" height="36" fill="white" transform="translate(36 36) rotate(-180)"/>
                </clipPath>
                </defs>
            </svg>
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" @click="$emit('jumpOnOnePageBack')">
                <path d="M25.2 9.00007L16.2 18.0001L25.2 27.0001L23.4 30.6001L10.8 18.0001L23.4 5.40007L25.2 9.00007Z" fill="#417FB8"/>
            </svg>
        </div>
        <div class="pagination-list">
            <div v-if="activePage > 5" :class="{'pagination-list__item': true, 'pagination-list__item--active': activePage === 1}" @click="$emit('goToFirstPage')">{{ 1 }}</div>
            <div class="pagination-list__item" v-if="activePage > 5">...</div>
            <div
                v-for="page, index in pages.slice(pagesStartFrom, pagesEndOn)"
                :key="index"
                @click="$emit('changePage', page.id)"
                :class="{'pagination-list__item': true, 'pagination-list__item--active': page.id === activePage ? true : false}">{{ page.id }}</div>
            <div class="pagination-list__item" v-if="activePage < pages.length - 4">...</div>
            <div v-if="activePage < pages.length - 4" :class="{'pagination-list__item': true, 'pagination-list__item--active': pages.length === activePage}" @click="$emit('goToLastPage')">{{ pages.length }}</div>
        </div>
        <div class="pagination__right-arrow">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" @click="$emit('jumpOnOnePageForward')">
                <path d="M10.7998 27.0001L19.7998 18.0001L10.7998 9.00007L12.5998 5.40007L25.1998 18.0001L12.5998 30.6001L10.7998 27.0001Z" fill="#417FB8"/>
            </svg>
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" @click="$emit('jumpOnFivePagesForward')">
                <g clip-path="url(#clip0_103_240)">
                <path d="M15 26.6001L24 17.6001L15 8.60008L16.8 5.00008L29.4 17.6001L16.8 30.2001L15 26.6001Z" fill="#417FB8"/>
                <path d="M22 26.6001L31 17.6001L22 8.60008L23.8 5.00008L36.4 17.6001L23.8 30.2001L22 26.6001Z" fill="#417FB8"/>
                </g>
                <defs>
                <clipPath id="clip0_103_240">
                <rect width="36" height="36" fill="white"/>
                </clipPath>
                </defs>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            amountOnPage: {
                type: Number,
                default: 10
            },
            amountOfObjects: {
                type: Number,
            },
            pages: {
                type: Object
            },
            pagesStartFrom: {
                type: Number,
                default: 0
            },
            pagesEndOn: {
                type: Number,
                default: 5
            },
            activePage: {
                type: Number,
                default: 1
            }
        },
    }
</script>

<style lang="scss" scoped>
    .pagination{
        width: 70%;
        margin-inline: auto;
        height: max-content;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
        &__left-arrow, &__right-arrow{
            svg{
                width: 36px;
                height: 36px;
            }
        }
        &-list{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
            &__item{
                width: 36px;
                height: 36px;
                margin: 10px;
                border: 1px solid $primary;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: $primary;
                font-size: 18px;
                font-weight: 400;
                cursor: pointer;
                &--active{
                    color: $white;
                    background-color: $primary;
                }
            }
        }
    }

    @media screen and (max-width: 780px) {
        .pagination{
            width: 100%;
            padding: 1rem 2rem;
             &__left-arrow, &__right-arrow{
                svg{
                    width: 24px;
                    height: 24px;
                }
            }
            &-list{
                &__item{
                    width: 24px;
                    height: 24px;
                    margin: 10px;
                    border: 1px solid $primary;
                    font-size: 16px;
                    &--active{
                        color: $white;
                        background-color: $primary;
                    }
                }
            }
        }
    }

     @media screen and (max-width: 560px) {
        .pagination{
            flex-wrap: wrap;
            justify-content: center;
             &__left-arrow, &__right-arrow{
                 order: 2;
                 width: 50%;
                 display: flex;
                 justify-content: center;
                 padding: 1rem;
            }
            &-list{
                &__item{
                    width: 18px;
                    height: 18px;
                    margin: 5px;
                    font-size: 12px;
                    &--active{
                        color: $white;
                        background-color: $primary;
                    }
                }
            }
        }
    }
</style>