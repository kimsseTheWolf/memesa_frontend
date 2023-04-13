<script setup>
import imgButton from './imgButton.vue';
import basicInput from './basicInput.vue';
import {ref} from 'vue'

function getSearchContent(){
    alert("The content is: " + targetContent.value)
}

const targetContent = ref("")
</script>
<template>
    <div class="search-bar-bg">
        <imgButton cover-img="./src/components/icons/search.svg" width="10px" padding="5" @button-clicked="getSearchContent()"/>
        <basicInput width="300px" v-model="targetContent"/>
    </div>
</template>
<style>
.search-bar-bg{
    background-color: rgba(255,255,255,0.85);
    border-radius: 5px;
    width: fit-content;
    height: fit-content;
    padding: 5px;
}
</style>