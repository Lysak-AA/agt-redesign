<template>
    <form class="registration-form">
        <app-base-input 
            inputType="text"
            validation="phone"
            label="Номер телефона"
            outlined
            id="phone"
            required
        />
        <app-base-input 
            inputType="text"
            validation="email"
            label="Электронная почта"
            outlined
            id="email"
            required
        />
        <app-base-input 
            inputType="text"
            validation="name"
            label="Ваше имя"
            outlined
            id="name"
            required
        />
        <app-base-input 
            inputType="text"
            validation="password"
            label="Пароль"
            outlined
            id="password"
            required
        />
        <app-base-input 
            inputType="text"
            validation="password"
            label="Повторите пароль"
            outlined
            id="repeatePassword"
            required
        />
        <app-registration-btn />
    </form>
</template>

<script>
import AppBaseInput from "@/components/inputs/app-base-input.vue";
import AppRegistrationBtn from "@/components/buttons/app-registration-btn.vue";
    export default {
        components: {
            AppBaseInput,
            AppRegistrationBtn
        }
    }
</script>

<style lang="scss" scoped>
    .registration-form{
        background-color: $primary;
        padding: 4rem 0;
        width: min(100%, 768px);
        border-radius: 1.25rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-phone-input{
            position: relative;
            width: min(90%, 400px);
            &-field{
                width: 100%;
                height: 80px;
                border-radius: 1.25rem;
                text-align: center;
                font-size: 1.5rem;
                font-weight: 400;
                color: $text-light;
                border: none;
                transition: 0.4s ease;
                &:focus{
                    outline: 2px solid $accent;
                }
            }
        }
    }
</style>