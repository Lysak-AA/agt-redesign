<template>
    <button class="login-btn">
        <svg class="login-btn__icon" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9549 13.5H0C0.75188 5.9205 7.16391 0 14.9624 0C23.2677 0 30 6.7155 30 15C30 23.2845 23.2677 30 14.9624 30C7.16541 30 0.753383 24.0795 0 16.5H11.9549V21L19.4737 15L11.9549 9V13.5Z" fill="white"/>
        </svg>
        <span class="login-btn__value">Вход</span>
    </button>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .login-btn{
        padding: 1rem 2rem;
        border-radius: 5px;
        background-color: $accent;
        color: $white;
        display: flex;
        align-items: center;
        font-size: 24px;
        font-weight: 700;
        border: none;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        cursor: pointer;
        &__icon{
            margin-right: 15px;            
        }
    }
</style>