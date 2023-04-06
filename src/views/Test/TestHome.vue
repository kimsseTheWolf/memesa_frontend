<script setup>
import { ref } from 'vue';
import { Button } from 'ant-design-vue'
import user from '@/js/user';
const userID = ref("31")
const userData = ref({})

async function getUserData(){
    userData.value = await user.getUserBasicInfo(32)
}
</script>
<template>
    <h1>实验性功能测试</h1>
    直达未开放的页面<br>
    <div class="static-content-block">
        <input type="text" v-model="userID" placeholder="Enter a user ID to continue">
        <RouterLink :to="'/user/'+userID">
            <Button type="primary">
                用户空间
            </Button>
        </RouterLink>
    </div>
    <div class="static-content-block">
        前往全部用户列表（仅限管理员），主要目的用来测试用户关注系统
        <RouterLink to="/user/full">
            <Button type="primary">
                打开用户列表
            </Button>
        </RouterLink>
    </div>
    <div class="static-content-block">
        <h2>用户信息获取</h2>
        <Button type="primary" @click="getUserData">
            获取
        </Button>
        {{ userData }}
    </div>
    <div class="static-content-block">
        <h2>多语言测试</h2>
    </div>
</template>