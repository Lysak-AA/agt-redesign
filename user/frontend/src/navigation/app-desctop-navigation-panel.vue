<template>
    <div class="desctop-navigation">
        <div class="desctop-navigation__decoration"></div>
        <div class="desctop-navigation__wrapper">
            <ul class="desctop-navigation__list">
                <li class="desctop-navigation__listItem">
                    <router-link class="desctop-navigation__listItemLink" to="/tourists">Туристам</router-link>
                </li>
                <li class="desctop-navigation__listItem">
                    <router-link class="desctop-navigation__listItemLink" to="/agencies">Агентствам</router-link>
                </li>
                <li class="desctop-navigation__listItem">
                    <router-link class="desctop-navigation__listItemLink" to="/add-object">Добавить объект</router-link>
                </li>
                <li class="desctop-navigation__listItem">
                    <router-link class="desctop-navigation__listItemLink" to="/safe-buy">Безопасная покупка</router-link>
                </li>
                <li class="desctop-navigation__listItem">
                    <router-link class="desctop-navigation__listItemLink" to="/registration">Зарегистрироватся</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
    .desctop-navigation__listItemLink {
      position: relative;
      font-size: 1.2rem;
      text-decoration: none;
      color: white;
    }
.desctop-navigation__listItemLink::before {  
  transform: scaleX(0);
  transform-origin: bottom right;
}

.desctop-navigation__listItemLink:hover::before {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.desctop-navigation__listItemLink::before {
  content: " ";
  display: block;
  position: absolute;
  right: 0; bottom: -2px; left: 0;
  height: 2px;
  background-color: white;
  z-index: -1;
  transition: transform .3s ease;
}

    .desctop-navigation{
        width: 100%;
        height: 70px;
        position: relative;
        &__decoration{
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 100%;
            background-color: $primary;
        }
        &__wrapper{
            position: relative;
            width: 100%;
            height: 100%;
            max-width: 1428px;
            margin: 0 auto;
            background-color: $primary;
            border-top-left-radius: 35px;
            border-bottom-left-radius: 35px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            z-index: 10;
        }
        &__list{
            display: flex;
            list-style: none;
        }
        &__listItem{
            margin-left: 30px;
        }
    }


    @media screen and (max-width: 1440px) {
        .desctop-navigation{
            &__wrapper{
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                transition: 0.5s ease;
                display: flex;
                justify-content: center;
            }
        }
    }
    @media screen and (max-width: 1100px) {
        .desctop-navigation{
            &__wrapper{
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                transition: 0.5s ease;
                display: flex;
                justify-content: center;
            }
            &__list{
                width: 100%;
                justify-content: space-around;
                flex-wrap: wrap;
            }
            &__listItem{
                margin-left: 0;
            }
            &__listItemLink{
                font-size: 18px;
                text-align: center;
            }
        }
    }
    @media screen and (max-width: 768px) {
        .desctop-navigation{
            height: 120px;
            &__list{
                width: 100%;
                justify-content: space-around;
                flex-wrap: wrap;
            }
            &__listItem{
                margin: 20px 0;
            }
            &__listItemLink{
                font-size: 18px;
                text-align: center;
                font-weight: 400;
            }
        }
    }
    @media screen and (max-width: 375px) {
        .desctop-navigation{
           display: none;
        }
    }
</style>