<script setup>

import { Button, Input, Textarea, message, Divider, Upload } from 'ant-design-vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import QueryString from 'qs';
import avatarHandler from '@/js/avatar'
const newUsername = ref("")
const newDescription = ref("")
const username = ref("")
const description = ref("")
const fileList = ref([])
const uploadingAvatar = ref(false)

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
        description.value = data.data.Data.description
    }).catch(err => {
        console.log(err)
        message.error("啊哦！我们在获取你的账号信息时出现了一些问题QAQ")
    })
}

function modifyUserInfo(){
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
    // generate requesyt body
    let requestData = {
        "username": newUsername.value,
        "description": newDescription.value,
    }
    console.log(requestData)
    // send request
    axios({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": userToken
        },
        method: "post",
        url: "/user/modifyBasicUserInfo",
        data: QueryString.stringify(requestData)
    }).then(data => {
        if (data.data.Code == 200){
            // get and reapply the new token from the respond
            localStorage.removeItem("MEMESA_TOKEN")
            localStorage.setItem("MEMESA_TOKEN", data.data.Data)
            message.success("用户基本信息更改成功！")

        }
        else{
            message.error("名字貌似被用了，要不咱换一个？")
        }
        
    }).catch(err => {
        console.log(err)
        message.error("名字貌似被用了，要不咱换一个？")
    })
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

function uploadAvatar(){
    // store the file to the external server first
    let avatarServerToken = avatarHandler.generateAccessToken()
    // upload
    let targetData = {
        "smfile": fileList.value[0],
        "format": "json"
    }
    axios({
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": avatarServerToken
        },
        data: QueryString.stringify(targetData),
        method: "post",
        url: avatarHandler.apiBaseAddress + "/upload"
    }).then(data => {
        if (data.data.success != "true"){
            message.error("头像上传失败")
            return
        }
        // gather the url of the image
        let userAvatarAddress = data.data.data.url
        // save the url in local and our own server
        localStorage.setItem("MEMESA_AVATAR", userAvatarAddress)
    })
}

onMounted(()=>gatherUserInfo)
gatherUserInfo()

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
    您可以在这里上传您的头像，头像文件大小不要超过5MB<br>
    <Upload v-model:file-list="fileList" :before-upload="beforeUpload" list-type="picture">
        <Button type="primary" :disabled="fileList.length >= 1">选择图片</Button>
    </Upload>
    <Button type="primary" :disabled="fileList.length === 0" :loading="uploadingAvatar" style="margin: 5px;">上传并作为我的新头像</Button>
    
</template>
<style>
.inline-button{
    margin: 5px;
}
</style>