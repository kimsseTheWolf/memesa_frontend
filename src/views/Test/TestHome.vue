<script setup>
import { ref } from 'vue';
const userID = ref("31")
</script>
<template>
    <h1>实验性功能测试</h1>
    直达未开放的页面<br>
    <input type="text" v-model="userID" placeholder="Enter a user ID to continue">
    <RouterLink :to="'/user/'+userID">
        用户空间
    </RouterLink><br>
</template>