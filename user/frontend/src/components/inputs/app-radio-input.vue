<template>
    <label class="container">
        <span class="container-value">{{ options.label }}</span>
        <input type="radio" :name="options.name" :id="options.id" @input="$emit('action', $event.target.id)" :disabled="options.disabled" :checked="options.checked">    
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
                    type: String,
                    default: ""
                },
                id: {
                    type: String,
                    default: ""
                },
                disabled: {
                    type: Boolean,
                    default: false
                },
                checked: {
                    type: Boolean,
                    default: false
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
.container{
    font-size: 1em;
    font-weight: 700;
    display: block;
    position: relative;
    cursor: pointer;
    user-select: none;
    padding-left: 30px;
    width: 100%;
    margin: 0 0 2em;
    &-value{
        position: relative;
        top: 4px;
    }
}
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: 24px;
    border-radius: 5px;
    border: 1px solid $title;
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