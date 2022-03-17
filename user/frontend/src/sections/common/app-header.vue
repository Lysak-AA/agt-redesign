<template>
    <header class="header">
        <BaseLogo />
        <div class="header-contacts">
            <a href="tel:+7" class="contacts-item">
                <BasePhoneIcon class="contacts-item__icon" />
                <span class="contacts-item__content">8 800 000 00 00</span>
            </a>
            <a href="mailto:info@agt8.ru" class="contacts-item">
                <BaseEmailIcon class="contacts-item__icon" />
                <span class="contacts-item__content">info@agt8.ru</span>
            </a>
            <router-link to="/login" class="contacts-item">
                <BaseLoginIcon class="contacts-item__icon" />
                <span class="contacts-item__content">личный кабинет</span>
            </router-link>
        </div>
    </header>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        max-width: 1728px;
        padding: 65px 150px 30px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // flex-wrap: wrap;
        &-contacts{
            display: flex;
        }
    }
    .contacts-item{
        display: flex;
        align-items: center;
        margin-left: 50px;
        text-decoration: none;
        &__icon{
            transform: translateY(3px);
        }
        &__content{
            margin-left: 20px;
            font-size: 24px;
            font-weight: 700;
            color: $title;
        }
    }
    
    @media screen and (max-width: 1550px) {
        .header{
            padding: 65px 50px 30px;
            &-contacts{
                display: flex;
            }
        }
    }
    @media screen and (max-width: 1440px) {
        .contacts-item{
            margin-left: 25px;
            &__content{
                margin-left: 10px;
                font-size: 18px;
                
            }
        }
    }
    @media screen and (max-width: 1100px) {
        .header{
            padding: 30px 50px 30px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &-contacts{
                margin-top: 30px;
                width: 100%;
                justify-content: space-around;
                align-items: center;
            }
        }
        .contacts-item{
            margin: 0;
        }
    }
    @media screen and (max-width: 768px) {
        .header{
            padding: 30px 0px 30px;
            &-contacts{
                display: none;
            }
        }
    }
</style>