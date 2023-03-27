<script setup>
import user from '@/js/user';
</script>
<template>
    <h1 class="page-title">用户的主页</h1>
    {{ user.getUserBasicInfo(31) }}
</template>