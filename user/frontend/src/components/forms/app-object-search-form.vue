<template>
    <div class="object-search-form">
        <h5 class="object-search-form__title">Цены и бронирование</h5>
        <div class="object-search-form__calendar object-search-form__input" @click="a">
            <app-calendar-icon />
            <Datepicker v-model="incomeDate">
                <template #trigger>
                    <span class="object-search-form__calendar-label">Дата заезда:</span>
                    <span>{{ incomeDate ? formateIncomeDate : "" }}</span>
                </template>
            </Datepicker>
        </div>
        <div class="object-search-form__calendar object-search-form__input" @click="a">
            <app-calendar-icon />
            <Datepicker v-model="outcomeDate">
                <template #trigger>
                    <span class="object-search-form__calendar-label">Дата выезда:</span>
                    <span>{{ outcomeDate ? formateOutcomeDate : "" }}</span>
                </template>
            </Datepicker>
        </div>
        <div class="object-search-form__tourists object-search-form__input"
            @click="openTouristsMenu"
        >
            <app-tourists-icon />
            <span class="object-search-form__tourists-label">Туристы: </span>
            <span>{{ tourists.adults > 0 || tourists.children > 0 ? " " + `В: ${tourists.adults} / Д: ${tourists.children}` : "" }}</span>
            <app-triangle-icon :class="{'object-search-form__input-triangle': true, 'object-search-form__input-triangle--active': tourists.isOpened }" @click.stop="toggleTouristsMenu" />
            <div 
                :class="{'object-search-form__tourists-menu': true, 'object-search-form__tourists-menu--active': tourists.isOpened }"
                
            >
                <div class="object-search-form__tourists-menu-adults">
                    <span class="object-search-form__tourists-menu-adults-label">Взрослые</span>
                    <button class="object-search-form__tourists-menu-adults-btn" @click.stop="minusAdult">-</button>
                    <span class="object-search-form__tourists-menu-adults-counter">{{ tourists.adults }}</span>
                    <button class="object-search-form__tourists-menu-adults-btn" @click.stop="plusAdult">+</button>
                </div>
                <div class="object-search-form__tourists-menu-children">
                    <span class="object-search-form__tourists-menu-children-label">Дети</span>
                    <button class="object-search-form__tourists-menu-children-btn" @click.stop="minusChild">-</button>
                    <span class="object-search-form__tourists-menu-children-counter">{{ tourists.children.length }}</span>
                    <button class="object-search-form__tourists-menu-children-btn" @click.stop="plusChild">+</button>
                </div>
                <div 
                    class="object-search-form__tourists-menu-children-age" 
                    v-for="child, index in tourists.children"
                    :key="index"
                    @click.stop
                >
                    <span class="object-search-form__tourists-menu-children-age-label">Возраст</span>
                    <input type="number" min="0" max="17" class="object-search-form__tourists-menu-children-age-input" @input="setChildAge(index, $event.target.value)">
                </div>
                <button class="object-search-form__tourists-menu-save-btn" @click.stop="closeTouristsMenu">сохранить</button>
            </div>
        </div>
        <div class="object-search-form__tax object-search-form__input" @click="toggleTaxMenu(null)">
            <app-tax-icon />
            <span class="object-search-form__tax-label">Тариф / Питание: {{ tax.value ? tax.value : "" }}</span>
            <app-triangle-icon class="object-search-form__input-triangle" />
            <div :class="{ 'object-search-form__tax-menu': true, 'object-search-form__tax-menu--active': tax.isOpened }">
                <span 
                    class="object-search-form__tax-menu-item"
                    v-for="tax, index in tax.taxes"
                    :key="index"
                    @click.stop="toggleTaxMenu(tax)"
                >{{ tax.value }}</span>
            </div>
        </div>
        <button
            :class="{'object-search-form__search-btn': !isSearchBtnDisabled, 'object-search-form__search-btn--disabled': isSearchBtnDisabled }"
            :disabled="isSearchBtnDisabled"
            @click="$emit('search', {
                date_begin: incomeDate,
                date_end: outcomeDate,
                adult: tourists.adults,
                children: tourists.children,
                meal_code: tax.code
            })"
            >
        <span v-if="!search">Поиск</span>
        <app-search-loader v-else :isLoaderActive="search" :size="24" />
        </button>
    </div>
</template>

<script>
import appCalendarIcon from '../icons/app-calendar-icon.vue'
import AppMenuIconWhite from '../icons/app-menu-icon-white.vue'
import AppRoomIcon from '../icons/app-room-icon.vue'
import AppTaxIcon from '../icons/app-tax-icon.vue'
import AppTouristsIcon from '../icons/app-tourists-icon.vue'
import AppTriangleIcon from '../icons/app-triangle-icon.vue'
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';
import AppSearchLoader from '../loaders/app-search-loader.vue'
    export default {
        props: {
            search: {
                type: Boolean,
                default: false
            }
        },
        components: { 
            appCalendarIcon,
            AppTouristsIcon,
            AppTriangleIcon,
            AppMenuIconWhite,
            AppRoomIcon,
            AppTaxIcon,
            Datepicker,
            AppSearchLoader
        },
       data: () => {
           return {
               incomeDate: null,
               outcomeDate: null,
               tourists: {
                   adults: 0,
                   children: [],
                   isOpened: false
               },
               tax: {
                   value: null,
                   code: null,
                   isOpened: false,
                   taxes: [
                       {
                           code: "RO",
                           value: "Без питания"
                       },
                       {
                           code: "BB",
                           value: "Завтрак"
                       },
                       {
                           code: "HB",
                           value: "2-х разовое"
                       },
                       {
                           code: "FB",
                           value: "3-х разовое"
                       },
                       {
                           code: "AI",
                           value: "Всё включено"
                       }
                   ]
               }
           }
       },
       methods: {
           minusAdult(){
               this.tourists.adults < 1 ? this.tourists.adults = 0 : this.tourists.adults--;
           },
           plusAdult(){
               this.tourists.adults > 2 ? this.tourists.adults = 3 : this.tourists.adults++;
           },
           minusChild(){
               if(this.tourists.children.length < 1){
                   return;
               } else {
                   this.tourists.children.pop();
               }
           },
           plusChild(){
               if(this.tourists.children.length > 2){
                   return;
               } else {
                   this.tourists.children.push(0);
               }
           },
           setChildAge(index, age){
              this.tourists.children[index] = +age;
           },
           openTouristsMenu(){
               this.tourists.isOpened = true;
           },
           closeTouristsMenu(){
               this.tourists.isOpened = false;
           },
           toggleTouristsMenu(){
               this.tourists.isOpened = !this.tourists.isOpened;
           },
           toggleTaxMenu(data){
               this.tax.isOpened = !this.tax.isOpened;
               if(data){
                    this.tax.value = data.value;
                    this.tax.code = data.code;
               }
           }
       },
       computed: {
           formateIncomeDate(){
               if(this.incomeDate){
                   let mounth = this.incomeDate.toString().slice(4, 7);
                   let day = this.incomeDate.toString().slice(8, 10);
                   let year = this.incomeDate.toString().slice(11, 15);
                   if(mounth === "Jan"){
                       mounth = "01"
                   } else if (mounth === "Feb"){
                       mounth = "02"
                   } else if (mounth === "Mar"){
                       mounth = "03"
                   } else if (mounth === "Apr"){
                       mounth = "04"
                   } else if (mounth === "May"){
                       mounth = "05"
                   } else if (mounth === "Jun"){
                       mounth = "06"
                   } else if (mounth === "Jul"){
                       mounth = "07"
                   } else if (mounth === "Aug"){
                       mounth = "08"
                   } else if (mounth === "Sep"){
                       mounth = "09"
                   } else if (mounth === "Oct"){
                       mounth = "10"
                   } else if (mounth === "Nov"){
                       mounth = "11"
                   } else if (mounth === "Dec"){
                       mounth = "12"
                   }

                   let date = `${year}-${mounth}-${day}`;
                   this.incomeDate = `${year}-${mounth}-${day}`;

                   return date;
               }
           },
           formateOutcomeDate(){
                if(this.outcomeDate){
                   let mounth = this.outcomeDate.toString().slice(4, 7);
                   let day = this.outcomeDate.toString().slice(8, 10);
                   let year = this.outcomeDate.toString().slice(11, 15);
                   if(mounth === "Jan"){
                       mounth = "01"
                   } else if (mounth === "Feb"){
                       mounth = "02"
                   } else if (mounth === "Mar"){
                       mounth = "03"
                   } else if (mounth === "Apr"){
                       mounth = "04"
                   } else if (mounth === "May"){
                       mounth = "05"
                   } else if (mounth === "Jun"){
                       mounth = "06"
                   } else if (mounth === "Jul"){
                       mounth = "07"
                   } else if (mounth === "Aug"){
                       mounth = "08"
                   } else if (mounth === "Sep"){
                       mounth = "09"
                   } else if (mounth === "Oct"){
                       mounth = "10"
                   } else if (mounth === "Nov"){
                       mounth = "11"
                   } else if (mounth === "Dec"){
                       mounth = "12"
                   }

                   let date = `${year}-${mounth}-${day}`;
                   this.outcomeDate = `${year}-${mounth}-${day}`;
                   return date;
               }
           },
           isSearchBtnDisabled(){
               if(this.incomeDate && this.outcomeDate && this.tourists.adults > 0){
                   return false;
               } else {
                   return true;
               }
           }
       }
    }
</script>

<style lang="scss" scoped>
    .object-search-form{
        width: 100%;
        min-height: 350px;
        background-color: $primary;
        border-radius: 10px;
        padding: 40px;
        color: $white;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        &__title{
            font-size: 1.5rem;
            font-weight: 700;
            width: 100%;
            margin-bottom: 2rem;
        }
        &__input{
            height: 60px;
            border: 1px solid $white;
            border-radius: 5px;
            margin-bottom: 1.5rem;
            cursor: pointer;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 20px;
            position: relative;
            svg{
                margin-right: 1rem;
            }
            span{
                font: {
                    size: 1rem;
                    weight: 700;
                }
            }
            &-triangle{
                position: absolute;
                top: 50%;
                right: 1rem;
                transform: translateY(-50%);
                transition: 0.3s ease;
                &--active{
                    transform: translateY(-50%) rotate(180deg);
                }
            }
        }
        &__calendar{
            width: 48%;
            &-label{
                margin-right: 2rem;
            }
            
        }
        &__tourists{
            width: 48%;
            position: relative;
            &-label{
                margin-right: 2rem;
            }
            &-menu{
                position: absolute;
                flex-direction: column;
                width: 100%;
                padding: 1rem;
                color: $primary;
                background-color: $white;
                top: 105%;
                left: 0;
                z-index: 1000;
                border-radius: 5px;
                display: none;
                opacity: 0;
                transition: 0.3s ease;
                &--active{
                    display: flex;
                    opacity: 1;
                }
                &-adults{
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    &-label{
                        margin-right: 1rem;
                        flex-grow: 1;
                    }
                    &-counter{
                        width: 1rem;
                    }
                    &-btn{
                        margin: 0 0.5rem;
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 100%;
                        border: 1px solid $primary;
                        background-color: transparent;
                        color: $primary;
                        cursor: pointer;
                        transition: 0.3s ease;
                        &:hover{
                            color: $white;
                            background-color: $primary;
                        }
                    }
                }
                &-children{
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    &-label{
                        margin-right: 1rem;
                        flex-grow: 1;
                    }
                    &-counter{
                        width: 1rem;
                    }
                    &-btn{
                        margin: 0 0.5rem;
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 100%;
                        border: 1px solid $primary;
                        background-color: transparent;
                        color: $primary;
                        cursor: pointer;
                        transition: 0.3s ease;
                        &:hover{
                            color: $white;
                            background-color: $primary;
                        }
                    }
                    &-age{
                        padding: 1rem 2rem;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        &-label{
                            flex-grow: 1;
                        }
                        &-input{
                            width: 3rem;
                            height: 1.5rem;
                            padding: 0.2rem;
                        }
                    }
                }
                &-save-btn{
                    padding: 0.5rem;
                    border-radius: 5px;
                    background-color: transparent;
                    border: 1px solid $primary;
                    color: $primary;
                    cursor: pointer;
                    transition: 0.3s ease;
                    &:hover{
                        color: $white;
                        background-color: $primary;
                    }
                }
            }
        }
        &__tax{
            width: 48%;
            position: relative;
            &-label{
                margin-right: 2rem;
            }
            &-menu{
                position: absolute;
                top: 105%;
                left: 0;
                width: 100%;
                display: none;
                flex-direction: column;
                padding: 1rem;
                background-color: $white;
                color: $primary;
                &--active{
                    display: flex;
                }
                &-item{
                    padding: 0.5rem;
                    transition: 0.2s ease;
                    &:hover{
                        background-color: $primary;
                        color: $white;
                    }
                }
            }
        }
        &__search-btn{
            width: 100%;
            height: 60px;
            border-radius: 5px;
            background-color: $accent;
            color: $white;
            border: none;
            outline: none;
            display: flex;
            justify-content: center;
            align-items: center;
            font: {
                size: 1.5rem;
                weight: 700;
            }
            cursor: pointer;
            &--disabled{
                width: 100%;
                height: 60px;
                border-radius: 5px;
                background-color: $primary;
                color: #21212130;
                border: none;
                outline: 1px solid #21212130;
                font: {
                    size: 1.5rem;
                    weight: 700;
                }
                cursor: pointer;
            }
        }
    }

    @media (max-width: 768px) {
        .object-search-form{
            justify-content: center;
            align-items: center;
            &__title{
                text-align: center;
            }
            &__input{
                width: 80%!important;
            }
            &__search-btn{
                width: 80%;
            }
        }
    }
    @media (max-width: 560px) {
        .object-search-form{
            &__input{
                width: 90%!important;
            }
            &__search-btn{
                width: 90%;
            }
        }
    }
    @media (max-width: 375px) {
        .object-search-form{
            &__input{
                width: 100%!important;
            }
            &__search-btn{
                width: 100%;
            }
        }
    }
</style>