<script setup>
import LoginRequireBox from '@/components/LoginRequireBox.vue'
import { computed, ref, onMounted } from 'vue';
import { Avatar, Button, message, Modal, Input, Textarea } from 'ant-design-vue';
import axios from 'axios';
import QueryString from 'qs';
import inlineContentBox from '@/components/inlineContentBox.vue';

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
const newUsername = ref("")
const newDescription = ref("")
const basicInfoModifyWindowStatus = ref(false)
const avatarAddress = ref("")

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
        url: "/api/user/getUserInfo",
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
        url: "/api/user/modifyBasicUserInfo",
        data: QueryString.stringify(requestData)
    }).then(data => {
        if (data.data.Code == 200){
            // get and reapply the new token from the respond
            localStorage.removeItem("MEMESA_TOKEN")
            localStorage.setItem("MEMESA_TOKEN", data.data.Data)
            message.success("用户基本信息更改成功！")
            hideModifyInfoDialog()
        }
        else{
            message.error("名字貌似被用了，要不咱换一个？")
        }
        
    }).catch(err => {
        console.log(err)
        message.error("名字貌似被用了，要不咱换一个？")
    })
}


function showModifyInfoDialog(){
    basicInfoModifyWindowStatus.value = true
}

function hideModifyInfoDialog(){
    basicInfoModifyWindowStatus.value = false
}

function getAvatarAddress(){
    avatarAddress.value = localStorage.getItem("MEMESA_AVATAR")
}
onMounted(()=>console.log("App mounted"))
gatherUserInfo()
getAvatarAddress()
</script>
<template>
    <h1 class="page-title">我</h1>
    <LoginRequireBox v-show="!isLoggedIn"/>
    <div v-if="isLoggedIn">
        <div class="static-content-block">
            <div id="inline-display">
                <Avatar :size="60" :src="avatarAddress">
                    <img :src="avatarAddress" v-if="avatarAddress != ''">
                    <div v-if="avatarAddress == ''">
                        登录
                    </div>
                </Avatar>
                <span class="inline-title">
                    <h1 style="width: fit-content;" class="user-title">{{ username }}</h1>
                    <div style="width: fit-content;">{{ description }}</div>
                </span>
                <Button type="primary" @click="showModifyInfoDialog">修改我的个人资料</Button>
                <Modal title="修改您的基本个人信息" v-model:visible="basicInfoModifyWindowStatus" @cancel="hideModifyInfoDialog()">
                    您可以在这里修改您的个人昵称与简介。如果您需要修改邮箱或者密码，请移步至设置。<br>
                    若您不想更改某个信息，留空即可。<br>
                    <b>新的用户名</b>
                    <Input placeholder="新的用户名" class="inline-button" v-model:value="newUsername">
                        <template #prefix>
                            <img src="@/assets/user.svg">
                        </template>
                    </Input>
                    <b>新的简介（200字以内）</b>
                    <Textarea placeholder="新的简介（200字以内）" class="inline-button" v-model:value="newDescription">
                    </Textarea>
                    <Button type="primary">前往修改我的邮箱或者密码</Button>
                    <template #footer>
                        <Button type="primary" @click="modifyUserInfo">修改</Button>
                    </template>
                </Modal>
            </div>
            <div>
                <b>关注数：</b> | 
                <b>粉丝数：</b> |
                <b>稿件数：</b> |
            </div>
            
        </div>
        <div class="static-content-block">
            <h2>我的稿件</h2>
            你近期的作品会在这里展示，更多历史作品请前往稿件中心<br>
            <RouterLink to="/workManager">
                <Button type="primary">前往稿件中心</Button>
            </RouterLink>
        </div>
        <div class="static-content-block">
            <h2>我的动态</h2>
            最近的动态将会展示在这里，更多历史动态请前往动态页面<br>
            <RouterLink to="/moment">
                <Button type="primary">前往动态</Button>
            </RouterLink>
        </div>
        <div class="static-content-block">
            <h2>更多功能</h2>
            <RouterLink to="/settings">
                <inlineContentBox content="设置" icon="settings"/>
            </RouterLink>
            <RouterLink to="/settings/user/basicInfo">
                <inlineContentBox content="账号选项" icon="user"/>
            </RouterLink>
            <RouterLink to="/faq">
                <inlineContentBox content="答疑中心" icon="contact"/>
            </RouterLink>
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
.user-title{
    margin-bottom: 0px;
}
</style>