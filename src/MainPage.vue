<script setup>
// import { Button } from 'ant-design-vue';
import HeaderBox from './components/HeaderBox.vue';
</script>
<template>
    <HeaderBox/>
    <div class="router-content-style">
        <RouterView></RouterView>
    </div>
</template>
<style>
body{
    margin: 5px;
}
</style>