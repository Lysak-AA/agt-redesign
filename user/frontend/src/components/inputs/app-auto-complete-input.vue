<template>
    <div class="app-basic-input">
        <label :for="options.id" class="input-label" :class="{ 'active': active }" @click.prevent="activate">{{ options.label }}</label>
        <input :type="options.inputType" :ref="options.id" class="basic-input" :id="options.id" @focus="activate" @blur="disactivate" @input="sendData($event.target.value)" v-model="inputData">
        <div class="autocomplete" :class="{ 'opened' : isAutocompleteOpened }" v-if="options.autocomplete">
            <ul>
                <li v-if="inputData.length < 1">Введите название...</li>
                <li v-if="inputData.length > 0">Выберите из списка...</li>
                <li v-for="item, index in filtredData" :key="index"  @mouseover="chooseItem(item)" @click="chooseItemByClick(item)">{{ item }}</li>
            </ul>
        </div>
        <app-close-icon class="input-clear" @click="clear" />
    </div>
</template>

<script>
import AppCloseIcon from "@/components/icons/app-close-icon.vue";
import { mapState } from "vuex";
    export default {
        components: {
            AppCloseIcon
        },
        computed: mapState({
            isHotelActive: state => state.hotelFilterOptions.hotel.is_active,
            isCityActive: state => state.hotelFilterOptions.city.is_active,
            isResortActive: state => state.hotelFilterOptions.resort.is_active
        }),
        watch: {
            isHotelActive(){
                if(this.options.id === 'hotel'){
                    this.isHotelActive ? 
                        false : 
                        this.clear();
                } else return;
            },
            isCityActive(){
                if(this.options.id === 'city'){
                    this.isCityActive ? false : this.clear();
                } else return;
            },
            isResortActive() {
                if(this.options.id === 'resort'){
                    this.isResortActive ? false : this.clear();
                } else return;
            }
        },
        props: {
            options: {
                label: {
                    type: String,
                    default: ""
                },
                id: {
                    type: String,
                    default: ""
                },
                inpuTtype: {
                    type: String,
                    default: 'text'
                },
                autocomplete: {
                    type: Boolean,
                    default: false
                },
                autocompleteData: {
                    type: Object,
                    default: []
                },
                prefiltredData: {
                    type: Object,
                    default: []
                },
                clearInput: {
                    type: String
                },
            }
        },
        data(){
            return{
                active: false,
                inputData: "",
                isAutocompleteOpened: false,
                filtredData: this.options.prefiltredData
            }
        },
        methods: {
            activate(){
                if(this.inputData.length > 0){
                    return;
                } else {
                    this.active = true;
                    this.$refs[this.options.id].focus();
                    this.isAutocompleteOpened = !this.isAutocompleteOpened;
                }
            },
            disactivate(){
                if(this.inputData.length > 0){
                    return;
                } else {
                    this.active = false;
                    this.isAutocompleteOpened = false;
                }
            },
            clear(){
                this.active = false;
                this.inputData = '';
                this.isAutocompleteOpened = false;
                this.filtredData = this.options.prefiltredData;
                this.sendData("");
                this.$emit('clear')
            },
            sendData(data){
                this.$emit('action', this.inputData);
                this.filtredData = this.options.autocompleteData.filter(item => {
                    let regexp = new RegExp(`^${data}`, "gi");
                    if(item.match(regexp)){
                        return item;
                    }
                })
                if(this.inputData === ""){
                    this.filtredData = this.options.prefiltredData;
                }
            },
            chooseItem(item){
                this.inputData = item;
                
            },
            chooseItemByClick(item){
                this.inputData = item;
                this.isAutocompleteOpened = false;
                this.sendData(item);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app-basic-input{
        width: 100%;
        height: 50px;
        position: relative;
        margin: 1rem 0;
        .basic-input{
            width: 100%;
            height: 100%;
            border: 1px solid $title;
            border-radius: 5px;
            padding-left: 2rem;
            color: $title;
            font-size: 1.5rem;
            font-weight: 700;
            z-index: 1;
            &:focus{
                border: 2px solid $error;
                outline: none;
            }
        }
        .input-label{
            color: #00000040;
            font-size: 18px;
            font-weight: 700;
            position: absolute;
            top: 50%;
            left: 2rem;
            background-color: $white;
            transform: translateY(-50%);
            transition: 0.3s ease;
            padding: 0.1em 0.5em;
            border-radius: 0.2em;
        }
        .input-clear{            
            position: absolute;
            top: 50%;
            right: 1em;
            transform: translateY(-50%);
            cursor: pointer;
        }
        .active{
            top: 0;
            font-size: 0.8em;
            color: $error;
            text-transform: lowercase;
            z-index: 1;
        }
        .autocomplete{
            position: absolute;
            top: 100%;
            left: 0;
            height: auto;
            max-height: 200px;
            width: 100%;
            overflow: hidden;
            background-color: $white;
            border-radius: 0.4em;
            transition: 0.3s ease;
            z-index: 1000;
            display: none;
            ul{
                list-style: none;
                li{
                    padding: 0.3em 1em;
                    cursor: pointer;
                    transition: 0.3s ease;
                    &:hover{
                        background-color: $primary;
                    }
                }
            }
        }
        .opened{
            display: block;
            
        }
    }
</style>