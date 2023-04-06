<script setup>
import { Select, SelectOption, Divider, Button } from 'ant-design-vue';
import { ref } from 'vue';

const selectedLanguageCode = ref("zh_cn")

function changeLanguage(){
    localStorage.setItem("MEMESA_LANGUAGE", selectedLanguageCode.value)
}

function initializeSelection(){
    selectedLanguageCode.value = localStorage.getItem("MEMESA_LANGUAGE")
}

initializeSelection()
</script>
<template>
    <h2>语言与地区 | Language And Region</h2>
    在这里选择您的语言偏好和显示语言。<br>
    You could choose your region preferences and display language here. <br>
    <Divider/>
    <h2>设置显示语言 Set up display language</h2>
    当前语言 (Current Language)：
    <Select style="width:200px;" v-model:value="selectedLanguageCode" @change="changeLanguage">
        <SelectOption value="en_us">English</SelectOption>
        <SelectOption value="zh_cn">简体中文</SelectOption>
        <SelectOption value="zh_tw">繁體中文</SelectOption>
        <SelectOption value="jp_jp">日本語</SelectOption>
    </Select>
    <br>
    {{ $t('test.greetings') }}
    <Button type="primary">应用</Button>
</template>