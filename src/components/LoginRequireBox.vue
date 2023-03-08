<script setup>
import { Button } from 'ant-design-vue';
</script>
<template>
    <div class="static-warning-block">
        <div class="static-warning-block-title">你还没有登录哦</div>
        <div class="static-warning-block-content">
            登录Memesa即可解锁网站的全部功能！
        </div>
        <RouterLink to="/login">
            <Button type="primary">立即登录</Button>
        </RouterLink>
        或
        <RouterLink to="/register">
            <Button>注册一个账号</Button>
        </RouterLink>
    </div>
</template>