<script setup>
import LoginRequireBox from '@/components/LoginRequireBox.vue';
import { computed } from 'vue';

const isLoggedIn = computed(()=>{
    if (localStorage.getItem("MEMESA_TOKEN") == null){
        return true
    }
    else{
        return false
    }
})
</script>
<template>
    <h1 class="page-title">稿件管理</h1>
    <LoginRequireBox v-show="isLoggedIn"/>
</template>