<template>
    <div class="base-input" :style="`transform: translateX(${inputState.animation.translateX}); height: ${height}${units}; width: ${width}${units}`">
        <input 
            :type="inputType"
            :id="id"
            class="input-field"
            :class="{ 'input-field-outlined' : outlined,
                      'input-field-outlined-rounded' : rounded,
                      'input-field-outlined-valid' : inputState.valid && outlined,
                      'input-field-outlined-on-validation' : inputState.onValidation && outlined }"
            @focus="inputState.activateInput"
            @blur="inputState.disactivateInput"
            @input="inputState.getInputData($event.target.value)"
            @keyup.esc="inputState.dropInputData"
            v-model="inputState.inputData"
            :style="`height: ${height}${units}; width: ${width}${units}`"
            >
        <label :for="id" class="input-label" :class="{ 'label-active': inputState.isInputOnFocus, 'label-valid': inputState.valid, 'label-on-validation': inputState.onValidation }">{{ label }}</label>
        <BaseCloseIcon class="input-close-icon" :class="{ 'input-close-icon-active' : inputState.isInputOnFocus, }" @action="inputState.dropInputData" />
        <span class="animated-bb-ca" :class="{ 'animated-bb-ca-active' : inputState.isInputOnFocus && !outlined, 'animated-bb-ca-active-valid': inputState.valid && !outlined, 'animated-bb-ca-active-on-validation': inputState.onValidation && !outlined }"></span>
        <div class="comment" v-if="inputState.comment.length > 0">
            <svg class="comment__icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17C10.0508 17.0014 11.0915 16.795 12.0622 16.3929C13.033 15.9908 13.9148 15.4008 14.6568 14.6568C15.4008 13.9148 15.9908 13.033 16.3929 12.0622C16.795 11.0915 17.0014 10.0508 17 9C17.0013 7.94923 16.795 6.90855 16.3929 5.93777C15.9908 4.96699 15.4008 4.08525 14.6568 3.3432C13.9148 2.59922 13.033 2.00921 12.0622 1.60708C11.0915 1.20496 10.0508 0.998645 9 1.00001C7.94923 0.998667 6.90855 1.20499 5.93777 1.60711C4.96699 2.00923 4.08525 2.59923 3.3432 3.3432C2.59923 4.08525 2.00923 4.96699 1.60711 5.93777C1.20499 6.90855 0.998667 7.94923 1.00001 9C0.998645 10.0508 1.20496 11.0915 1.60708 12.0622C2.00921 13.033 2.59922 13.9148 3.3432 14.6568C4.08525 15.4008 4.96699 15.9908 5.93777 16.3929C6.90855 16.795 7.94923 17.0013 9 17Z" fill="white" stroke="#9B0808" stroke-width="2" stroke-linejoin="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 14C9.26522 14 9.51957 13.8946 9.70711 13.7071C9.89464 13.5196 10 13.2652 10 13C10 12.7348 9.89464 12.4804 9.70711 12.2929C9.51957 12.1054 9.26522 12 9 12C8.73478 12 8.48043 12.1054 8.29289 12.2929C8.10536 12.4804 8 12.7348 8 13C8 13.2652 8.10536 13.5196 8.29289 13.7071C8.48043 13.8946 8.73478 14 9 14Z" fill="#9B0808"/>
                <path d="M9 4V10V4Z" fill="white"/>
                <path d="M9 4V10" stroke="#9B0808" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ inputState.comment }}
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";
    export default {
        props: {
            label: {
                type: String,
                default: "Текст"
            },
            id: {
                type: String,
                default: "input"
            },
            inputType: {
                type: String,
                default: 'text'
            },
            validation: {
                type: String,
                default: "name"
            },
            outlined: {
                type: Boolean,
                default: false
            },
            rounded: {
                type: Boolean,
                default: false
            },
            required: {
                type: Boolean,
                default: false
            },
            height: {
                type: String,
            },
            width: {
                type: String,
            },
            units: {
                type: String,
                default: "px"
            }
        },
        setup(props, { emit }){
            const inputState = reactive({
                isInputOnFocus: false,
                inputData: "",
                comment: "",
                valid: false,
                onValidation: false,
                animation: {
                    translateX: "0",
                    movingX: () => {
                        inputState.animation.translateX = "10%";
                        setTimeout(() => {
                        inputState.animation.translateX = "-10%";
                        }, 50)
                        setTimeout(() => {
                        inputState.animation.translateX = "10%";
                        }, 100)
                        setTimeout(() => {
                        inputState.animation.translateX = "-10%";
                        }, 150)
                        setTimeout(() => {
                        inputState.animation.translateX = "0";
                        }, 200)
                    }
                },
                activateInput: () => inputState.isInputOnFocus = true,
                disactivateInput: () => {
                    if(props.required){
                        if(inputState.inputData.length > 0 && !inputState.valid){
                            inputState.comment = 'Это обязательное поле!';
                            inputState.animation.movingX();
                            setTimeout(() => {
                                inputState.comment = "";
                            }, 2000)
                        } else if(inputState.inputData.length > 0 && inputState.valid) {
                            return
                        } else {
                            inputState.isInputOnFocus = false;
                            inputState.comment = 'Это обязательное поле!';
                            inputState.onValidation = true;
                            inputState.animation.movingX();
                            setTimeout(() => {
                                inputState.comment = "";
                                inputState.onValidation = false;
                            }, 2000)
                        }
                    } else {
                        if(inputState.inputData.length > 0){
                            return;
                        } else {
                            inputState.isInputOnFocus = false;
                        }
                    }
                },
                getInputData: (data) => {
                    if(props.validation === "phone"){
                        inputState.onValidation = true;
                        inputState.comment = "Номер телефона должен быть не менее 10 символов";
                        const regExp = new RegExp("[^0-9]", "gi");
                        data = data.replace(regExp, "");
                        let firstNumber = "+7 ";
                        inputState.inputData = firstNumber + data.substring(1);
                        if(data.length > 1){
                            inputState.inputData = firstNumber + "(" + data.substring(1)
                        }
                        if(data.length > 4){
                            inputState.inputData = firstNumber + "(" + data.substring(1, 4) + ") " + data.substring(4)                  
                        }
                        if(data.length > 7){
                            inputState.inputData = firstNumber + "(" + data.substring(1, 4) + ") " + data.substring(4, 7) + " - " + data.substring(7)        
                        }
                        if(data.length > 9){
                            inputState.inputData = firstNumber + "(" + data.substring(1, 4) + ") " + data.substring(4, 7) + " - " + data.substring(7, 9) + " - " + data.substring(9, 11)   
                        }
                        if(data.length > 10){
                            inputState.onValidation = false;
                            inputState.valid = true;
                            inputState.comment = "";
                            const regExpression = new RegExp("[\\(\\)\\s\\-]", 'gi');
                            const dataToSend = inputState.inputData.replace(regExpression, "");
                            emit('sendData', dataToSend)
                        }
                    }
                    if(props.validation === "name"){
                        const regExp = new RegExp("[0-9A-Za-z]", "gi");
                        if(data.match(regExp)){
                            inputState.comment = "Имя должно содержать только киррилические символы";
                            
                            setTimeout(() => {
                                inputState.comment = ""
                            }, 2000)
                        }
                        data = data.replace(regExp, "");
                        inputState.inputData = data;
                    }
                    if(props.validation === "password"){
                        inputState.onValidation = true;
                        // inputState.comment = "Пароль должен содержать не менее 5 и не более 12 символов";
                        const regExp = new RegExp("[А-Яа-я]", "gi");
                        if(data.match(regExp)){
                            inputState.comment = "Пароль должен содержать только латинские символы или цифры";
                            data = data.replace(regExp, "");
                            inputState.inputData = data;
                            console.log(data)
                            setTimeout(() => {
                                inputState.comment = ""
                            }, 2000)
                        } else if(data.length < 5){
                            inputState.comment = "Пароль должен содержать не менее 5 символов";   
                        } else if(data.length > 12){
                            inputState.comment = "Пароль должен содержать не более 12 символов";
                        }
                        if(data.length > 5 && data.length < 12){
                            inputState.onValidation = false;
                            inputState.valid = true;
                            inputState.comment = "";
                            const dataToSend = data;
                            emit('sendData', dataToSend)
                        }
                    }
                    if(props.validation === "login"){
                        const regExp = new RegExp("[А-Яа-я]", "gi");
                        if(data.match(regExp)){
                            inputState.comment = "Логин должен содержать латинские символы и (или) цифры";
                            setTimeout(() => {
                                inputState.comment = ""
                            }, 2000)
                        }
                        data = data.replace(regExp, "");
                        inputState.inputData = data;
                    }

                },
                dropInputData: () => {
                    inputState.inputData = "";
                    inputState.valid = false;
                    inputState.onValidation = false;
                    inputState.disactivateInput();
                    emit('sendData', "")
                }


            });

            const escapeFunc = () => {
                console.log(1)
            }
   
    
            return {                
                inputState,
                escapeFunc
            }
        }
    }
</script>

<style lang="scss" scoped>
    .base-input{
        position: relative;
        transition: 0.05s ease;
        width: min(90%, 400px);
        margin-bottom: 2rem;
        .validated-data{
            position: absolute;
            top: 0;
            left: 0;
        }
        .comment{
            position: absolute;
            bottom: -1.7rem;
            left: 0;
            font-size: 0.75em;
            color: $white;
            display: flex;
            align-items: center;
            &__icon{
                margin-right: 10px;
            }
        }
        .input-field{
            transform-origin: center;
            transition: border 1s ease;
            border-radius: 5px;
            position: relative;
            text-align: center;
            border: 2px solid $accent;
            cursor: pointer;
            width: 100%;
            height: 80px;
            font-size: 24px;
            font-weight: 700;
            color: $title;
            &:hover{
                border-bottom: 1px solid $primary;
            }
            &:focus{
                outline: none;
                
            }
        }
        .input-field-outlined{
            border: 2px solid $accent;
            transition: 0.3s ease;
            &:hover{
                box-shadow: 0px 0px 10px 1px $primary-50;
            }
            &:focus{
                box-shadow: 0px 0px 10px 1px $primary-50;
            }
        }
        .input-field-outlined-valid{
            border: 2px solid $success;
            box-shadow: inset -2px -2px 10px #1AB420, inset 2px 2px 10px #1AB420;
        }
        .input-field-outlined-on-validation{
            border: 2px solid $error;
            box-shadow: inset -2px -2px 10px #9B0808, inset 2px 2px 10px #9B0808;
             &:hover{
                border-bottom: 2px solid $error;
                 box-shadow: inset -2px -2px 10px #9B0808, inset 2px 2px 10px #9B0808;
            }
        }
        .input-field-outlined-rounded{
            border-radius: 0.4em;
        }
        .animated-bb-ca{
            position: absolute;
            left: 0;
            bottom: 0;
            height: 2px;
            width: 100%;
            background-color: $primary;
            transform: scaleX(0);
            transform-origin: center;
            transition: 0.3s ease;
            z-index: 200;
        }
        .animated-bb-ca-active{
            transform: scaleX(1);
        }
        .animated-bb-ca-active-valid{
            background-color: $success;
        }
        .animated-bb-ca-active-on-validation{
            background-color: $error;
        }

        .input-label{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300px;
            text-align: center;
            transform: translate(-50%, -50%);
            transition: 0.3s ease;
            cursor: pointer;
            color: $text-light;
            font-size: 24px;
            font-weight: 400;
        }
        .label-active{
            top: -1.5rem;
            left: 0;
            transform: translate(0, 0);
            font-size: 18px;
            color: $white;
            font-weight: 700;
            text-align: left;
        }
        .label-valid{
            color: $white;
        }
        .label-on-validation{
            color: $white;
        }
        .input-close-icon{
            opacity: 0;
            transition: 0.3s ease;
            position: absolute;
            top: 50%;
            right: 1em;
            transform: translateY(-50%);
            cursor: pointer;
            color: $primary;
            z-index: 200;
        }
        .input-close-icon-active{           
            opacity: 0.5;            
            &:hover{
                opacity: 1;
            }
            
        }
        .input-close-icon-active-valid{
            color: $success;
        }
        .input-close-icon-active-on-validation{
            color: $error;
        }
        .block-number-arrows{
            width: 2em;
            height: 100%;
            background-color: $white;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 100;
        }
    }
</style>