<script setup>

import { Button, Input, Textarea, message, Divider, Upload, Avatar } from 'ant-design-vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import QueryString from 'qs';
import avatarHandler from '@/js/avatar'
import { file } from '@babel/types';
import user from '@/js/user';
const newUsername = ref("")
const newDescription = ref("")
const username = ref("")
const description = ref("")
const fileList = ref([])
const uploadingAvatar = ref(false)
const avatarAddress = ref("")
const avatarProcessing = ref(false)

async function gatherUserInfo(){
    let userData = await user.getUserInfo(localStorage.getItem("MEMESA_TOKEN"))
    username.value = userData.username
    description.value = userData.description
}

async function modifyUserInfo(){
    let userToken = localStorage.getItem("MEMESA_TOKEN")
    // check input
    if (newUsername.value == ""){
        newUsername.value = username.value
    }
    if (newDescription.value == ""){
        newDescription.value = description.value
    }
    if (newDescription.value.length > 200){
        message.warning("简介太长啦！")
        return
    }
    let result = await user.modifyBasicUserInformation(newUsername.value, newDescription.value)
    if (!result){
        message.error("修改失败")
        return
    }
    message.success("修改成功")
    return
}

function beforeUpload(file) {
    let isCorrectFileType = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png'
    let isCorrectSize = file.size / 1024 / 1024 <= 2
    // check how many files user has already uploaded first
    if (fileList.value.length >= 1){
        message.error("最多只能上传一个文件！")
        return Upload.LIST_IGNORE
    }
    else if (!isCorrectFileType){
        message.error("不兼容的文件格式。只兼容jpg / jpeg / png文件")
        return isCorrectFileType || Upload.LIST_IGNORE
    }
    else if (!isCorrectSize){
        message.error("文件过大。一个文件最大只能2MB")
        return isCorrectSize || Upload.LIST_IGNORE
    }
    else{
        // if passed then process the list and wait for further information
        fileList.value.push(file)
        return false
    }
    
}

async function uploadAvatar(){
    avatarProcessing.value = true
    let result = await avatarHandler.uploadAvatar(fileList.value[0])
    if (!result){
        message.error("上传失败")
    }
    else {
        message.success("上传成功")
    }
    avatarProcessing.value = false
}

function getPicture(e){
    fileList.value.push(e.target.files[0])
}

async function getAvatarAddress(){
    if (localStorage.getItem("MEMESA_AVATAR") != undefined){
        avatarAddress.value = localStorage.getItem("MEMESA_AVATAR")
        return
    }
    else{
        let result = await avatarHandler.getUserAvatarAddress(true)
        if (!result){
            return
        }
        avatarAddress.value = localStorage.getItem("MEMESA_AVATAR")
        return
    }
}

onMounted(()=>gatherUserInfo)
gatherUserInfo()
getAvatarAddress()

</script>
<template>
    <h2>用户与简介</h2>
    您可以在这里修改您的个人昵称与简介。如果您需要修改邮箱或者密码，请移步至密码与邮箱设置。<br>
    若您不想更改某个信息，留空即可。<br>
    <b>当前用户名：</b>{{ username }}<br>
    <b>当前简介：</b> {{ description }}<br>
    <b>新的用户名</b>
    <Input placeholder="新的用户名" class="inline-button" v-model:value="newUsername">
        <template #prefix>
            <img src="@/assets/user.svg">
        </template>
    </Input>
    <b>新的简介（200字以内）</b>
    <Textarea placeholder="新的简介（200字以内）" class="inline-button" v-model:value="newDescription">
    </Textarea>
    <Button type="primary" class="inline-button" @click="modifyUserInfo">修改</Button>

    <Divider></Divider>
    <h2>头像设置</h2>
    <Avatar :src="avatarAddress" :size="72"></Avatar><br>
    您可以在这里上传您的头像，头像文件大小不要超过2MB<br>
    <input type="file" accept="image/*" @change="getPicture($event)">
    <Upload v-model:file-list="fileList" :before-upload="beforeUpload" list-type="picture">
        <!-- <Button type="primary" :disabled="fileList.length >= 1">选择图片</Button> -->
    </Upload>
    <Button type="primary" :disabled="fileList.length === 0" :loading="avatarProcessing" style="margin: 5px;" @click="uploadAvatar">上传并作为我的新头像</Button>
    
    
</template>
<style>
.inline-button{
    margin: 5px;
}
</style>