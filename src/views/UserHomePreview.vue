<script setup>
import user from '@/js/user';
import avatar from '@/js/avatar';
import { Avatar, Button } from 'ant-design-vue';
import { ref, computed, created } from 'vue'
import { useRoute } from 'vue-router';
// import router from 'vue-router'

const targetUsername = ref("")
const targetDescription = ref("")
const targetID = ref("")
const targetAvatarAddr = ref("")
const route = useRoute()
const inputID = computed(()=>{
    return route.params.id
})


function getTargetUserInfo(){
    // directly get the user info from the local source
    let UserInfoStr = localStorage.getItem("TEMP_USERINFO")
    let UserInfo = JSON.parse(UserInfoStr)
    console.log(UserInfo)
    targetUsername.value = UserInfo.username
    targetDescription.value = UserInfo.description
    targetID.value = UserInfo.id
    localStorage.removeItem("TEMP_USERINFO")
}

function userInfoTrigger(){
    user.getUserBasicInfo(inputID.value)
    setTimeout(() => {
        getTargetUserInfo()
    }, 200);
}

function getTargetUserAvatar(){
    avatar.getUserAvatarAddress(false)
    setTimeout(() => {
        targetAvatarAddr.value = localStorage.getItem("TEMP_USERAVATAR")
        console.log(targetAvatarAddr.value)
        localStorage.removeItem("TEMP_USERAVATAR")
    }, 200)
}

console.log(inputID.value)
userInfoTrigger()
getTargetUserAvatar()
</script>
<template>
    <div class="static-content-block">
        <div id="inline-display">
            <Avatar :size="60" :src="targetAvatarAddr">
                头像
            </Avatar>
            <span class="inline-title">
                <h1 style="width: fit-content;" class="user-title"><b>{{targetUsername}}</b></h1>
                <div style="width: fit-content;">{{targetDescription}}</div>
            </span>
            <Button type="primary" @click="showModifyInfoDialog">关注</Button>
        </div>
        <div>
            <b>关注数：</b> | 
            <b>粉丝数：</b> | 
            <b>稿件数：</b> | 
        </div>
    </div>
    <h2><b>TA的作品</b></h2>
    <div class="static-content-block">
        暂时还没有上传作品哦
    </div>
    <h2><b>TA的动态</b></h2>
    <div class="static-content-block">
        暂无动态
    </div>
    <h2><b>TA的素材</b></h2>
    <div class="static-content-block">
        TA还没有上传过素材
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