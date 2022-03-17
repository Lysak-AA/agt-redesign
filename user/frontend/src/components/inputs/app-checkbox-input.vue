<template>
<label class="container" >
    <span>{{ options.label }}</span>
    <input type="checkbox" 
        :name="options.name"
        :id="options.id"
        @keydown.space="sendData($event)"
        tabindex="0"
        @input="sendData($event)"
        :checked="options.is_active"
        :disabled="disabled">
    <span class="focus"></span>   
    <span class="checkmark"></span>
</label>
</template>

<script>
    export default {
        props: {
            options: {
                label: {
                    type: String,
                    default: ""
                },
                name: {
                    type: String
                },
                id: {
                    type: String,
                },
                filter_id: {
                    type: String
                }       
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            sendData(event){
                this.$emit('checked', { checked: event.target.checked, id: event.target.id,  name: event.target.name })
            }
        }
        
    }
</script>

<style lang="scss" scoped>
    .container{
        font-size: 14px;
        font-weight: 400;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        user-select: none;
        padding-left: 30px;
        margin: 1rem 1rem 1rem 0;
        .focus{
            position: absolute;
            left: 0;
            bottom: -15px;
            width: 100%;
            height: 1px;
            background-color: $accent;
            opacity: 0;
        }
    }
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:focus + .focus {
             opacity: 1;
        }
}
    .checkmark {
        position: absolute;
        top: -3px;
        left: 0;
        height: 24px;
        width: 24px;
        border: 1px solid $title;
        border-radius: 5px;
        background-color: $white;
}


    .container input:checked ~ .checkmark {
        background-color: $primary;
}

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
        width: 12px;
        height: 12px;
        border-radius: 3px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: $accent;
}


    .container input:checked ~ .checkmark:after {
        display: block;
}


</style>