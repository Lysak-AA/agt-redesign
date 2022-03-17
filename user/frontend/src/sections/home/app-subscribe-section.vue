<template>
    <div class="subscribe">
        <h3 class="section-title subscribe-title">Подпишитесь на акции и спецпредложения</h3>
        <div class="subscribe-block">
            <input type="text" class="subscribe-block__email-field" placeholder="Введите ваш e-mail">
            <input type="submit" class="subscribe-block__submit">
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .subscribe{
        width: min(100%, 1728px);
        margin-inline: auto;
        padding: 3.125rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        &-title{
            width: min(100%, 1024px)
        }
        &-block{
            padding: 3.125rem 0;
            width: min(100%, 720px);
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            &__email-field{
                width: min(90%, 400px);
                height: 80px;
                border-radius: 10px;
                border: 1px solid $title;
                background-color: transparent;
                padding-left: 3rem;
                margin: 1rem;
            }
            &__submit{
                width: 200px;
                height: 80px;
                border: none;
                border-radius: 10px;
                background-color: $accent;
                color: white;
                text-transform: uppercase;
                font-size: 1.125rem;
                margin: 1rem;
            }
        }
    }
</style>