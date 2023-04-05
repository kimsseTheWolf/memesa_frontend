<script setup>
import { Select, SelectOption, Divider, Button } from 'ant-design-vue';
</script>
<template>
    <h2>语言与地区 | Language And Region</h2>
    在这里选择您的语言偏好和显示语言。<br>
    You could choose your region preferences and display language here. <br>
    <Divider/>
    <h2>设置显示语言 Set up display language</h2>
    当前语言 (Current Language)：
    <Select style="width:200px;">
        <SelectOption value="en-us">English</SelectOption>
        <SelectOption value="zh-cn">简体中文</SelectOption>
        <SelectOption value="zh-tw">繁體中文</SelectOption>
        <SelectOption value="jp-jp">日本語</SelectOption>
    </Select>
    <br>
    <Button type="primary">应用</Button>
</template>