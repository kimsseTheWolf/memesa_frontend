<script setup>
import LoginRequireBox from '@/components/LoginRequireBox.vue'
import { computed, ref } from 'vue';
import { Avatar, Button, message, Modal } from 'ant-design-vue';
import axios from 'axios';

const isLoggedIn = computed(()=>{
    if (localStorage.getItem("MEMESA_TOKEN") == null){
        return false
    }
    else{
        return true
    }
})

const username = ref("未登录")
const email = ref("未知邮箱")
const userid = ref("未知UID")
const description = ref("这个人很懒，什么也没写……")
const password = ref("no_password")
const logoutUserWarningDlgStatus = ref(false)


function gatherUserInfo(){
    // send request to get user information from the db
    let userToken = localStorage.getItem("MEMESA_TOKEN")
    console.log(userToken)
    axios({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": userToken
        },
        method: "post",
        url: "/user/getUserInfo",
    }).then(data => {
        console.log(data)
        username.value = data.data.Data.username
        password.value = data.data.Data.password
        email.value = data.data.Data.email
        userid.value = data.data.Data.id
        description.value = data.data.Data.description
    }).catch(err => {
        console.log(err)
        message.error("啊哦！我们在获取你的账号信息时出现了一些问题QAQ")
    })
}

function deleteLocalUser(){
    localStorage.clear()
    hideLogoutUserWarning()
}

function showLogoutUserWarning(){
    logoutUserWarningDlgStatus.value = true
}

function hideLogoutUserWarning(){
    logoutUserWarningDlgStatus.value = false
}
window.onload = gatherUserInfo
</script>
<template>
    <h1 class="page-title">我</h1>
    <LoginRequireBox v-show="!isLoggedIn"/>
    <div v-if="isLoggedIn">
        <div class="static-content-block">
            <div id="inline-display">
                <Avatar :size="60">用户</Avatar>
                <span class="inline-title">
                    <h1 style="width: fit-content;">{{ username }}</h1>
                    <div style="width: fit-content;">{{ description }}</div>
                </span>
                <Button type="primary">修改我的个人资料</Button>
            </div>
            <div>
                <b>关注数：</b> | 
                <b>粉丝数：</b> |
                <b>稿件数：</b> |
            </div>
            
        </div>
        <div class="static-content-block">
            <h2>这个账号不是我！</h2>
            如果您因为某些原因想要切换账号或者退出登录，你可以使用以下选项：<br>
            <Button type="primary" danger class="inline-button" @click="showLogoutUserWarning()">退出登录</Button>
            <Button type="default" class="inline-button">切换账号</Button>
            <Modal v-model:visible="logoutUserWarningDlgStatus" title="您确定要登出吗？" @ok="deleteLocalUser" @cancel="hideLogoutUserWarning">
                <p>您确定要继续在此设备上退出登录吗？这不会删除您的账号数据。</p>
            </Modal>
        </div>
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
#inline-display{
    display: flex;
    align-items: center;
}
.inline-title{
    padding-left: 10px;
    padding-bottom: 10px;
    width: 90%;
}
.inline-button{
    margin: 5px;
}
</style>