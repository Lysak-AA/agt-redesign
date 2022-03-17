<template>
    <form class="main-search-form">
        <div class="main-search-form__input">Направление</div>
        <div class="main-search-form__input">Дата заезда / Выезда</div>
        <div class="main-search-form__input">Количество человек</div>
        <button class="main-search-form__submit">найти</button>
    </form>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .main-search-form{
        width: 100%;
        max-width: 1300px;
        margin: 0 auto;
        padding: 50px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        &__input, &__submit{
            width: 40%;
            max-width: 600px;
            min-width: 300px;
            height: 90px;
            margin: 0 50px 25px;
            border: 1px solid $title;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: $title;
            font-size: 24px;
            font-weight: 700;
            text-transform: uppercase;
            cursor: pointer;
        }
        &__submit{
            background-color: $accent;
            border: none!important;
        }
    }

    @media screen and (max-width: 768px) {
        .main-search-form{
            &__input, &__submit{
                width: 80%;
            }
        }
    }
    @media screen and (max-width: 475px) {
        .main-search-form{
            &__input, &__submit{
                font-size: 18px;
            }
        }
    }
</style>