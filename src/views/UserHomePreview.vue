<script setup>
import user from '@/js/user';
import { Avatar, Modal, Input, Button } from 'ant-design-vue';
</script>
<template>
    
    <div class="static-content-block">
        <div id="inline-display">
            <Avatar :size="60">
                头像
            </Avatar>
            <span class="inline-title">
                <h1 style="width: fit-content;" class="user-title"><b>用户名</b></h1>
                <div style="width: fit-content;">简介</div>
            </span>
            <Button type="primary" @click="showModifyInfoDialog">关注</Button>
        </div>
    </div>
    <h2><b>TA的作品</b></h2>
    <div class="static-content-block">
        暂时还没有上传作品哦
    </div>
</template>
<style>
.static-content-block{
    border-radius: 5px;
    margin: 10px;
    padding: 15px;
    width: auto;
    height: fit-content;
    background-color: #f9f9f9;
}
</style>