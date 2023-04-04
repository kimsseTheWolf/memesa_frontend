<script setup>
import LoginRequireBox from '@/components/LoginRequireBox.vue'
import { computed, ref, onMounted } from 'vue';
import { Avatar, Button, message, Modal, Input, Textarea } from 'ant-design-vue';
import inlineContentBox from '@/components/InlineContentBox.vue';
import AvatarHandler from '@/js/avatar'
import user from '@/js/user';

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
const avatarAddress = ref("")

async function gatherUserInfo(){
    let userData = await user.getUserInfo(localStorage.getItem("MEMESA_TOKEN"))
    if (userData == null){
        message.error("哦不！我们暂时无法获取你的个人信息")
        return
    }
    // setup the user data
    username.value = userData.username
    password.value = userData.password
    email.value = userData.email
    userid.value = userData.id
    description.value = userData.description
}

async function getAvatarAddress(){
        if (localStorage.getItem("MEMESA_AVATAR") != undefined){
            avatarAddress.value = localStorage.getItem("MEMESA_AVATAR")
            return
        }
        else{
            let result = await AvatarHandler.getUserAvatarAddress(true)
            if (!result){
                return
            }
            avatarAddress.value = localStorage.getItem("MEMESA_AVATAR")
            return
        }
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
                    <div style="width: fit-content; color: gray; font-size: small;">
                        <img src="@/assets/uid.svg">
                        {{ userid }}
                    </div>
                </span>
                <RouterLink to="/settings">
                    <Button type="primary">修改我的个人资料</Button>
                </RouterLink>
                
            </div>
            <div>
                <div style="display: inline-block; margin-right: 7px;">
                    <img src="@/assets/subscribe.svg"><b>关注数 </b> {{ followingNumber }}
                </div>
                <div style="display: inline-block; margin-right: 7px;">
                    <img src="@/assets/fens.svg"><b>粉丝数 </b> {{ followingNumber }}
                </div>
                <div style="display: inline-block; margin-right: 7px;">
                    <img src="@/assets/video.svg"><b>稿件数 </b> {{ followingNumber }}
                </div>
            </div>
            
        </div>
        <div class="static-content-block">
            <h2>播放历史</h2>
            播放过的视频将会出现在这里<br>
            <div>
                这里空空如也~
            </div>
            <RouterLink to="/history">
                <Button type="primary" style="margin: 5px;">查看更多历史</Button>
            </RouterLink>
        </div>
        <div class="static-content-block">
            <h2>收藏</h2>
            喜欢的视频或者音频可以放在收藏夹里哦
            <div>
                这里空空如也，要不咱先创建一个收藏夹？
            </div>
            <Button type="primary" style="margin: 5px;">查看所有收藏</Button>
            <Button style="margin: 5px;">创建新的收藏夹</Button>
        </div>
        <div class="static-content-block">
            <h2>我的动态</h2>
            最近的动态将会展示在这里，更多历史动态请前往动态页面<br>
            <RouterLink to="/moment">
                <Button type="primary" style="margin: 5px;">前往动态</Button>
            </RouterLink>
        </div>
        <div class="static-content-block">
            <h2>更多功能</h2>
            <RouterLink to="/workManager">
                <inlineContentBox content="创作者中心" icon="workManager"/>
            </RouterLink>
            <RouterLink to="/settings">
                <inlineContentBox content="设置" icon="settings"/>
            </RouterLink>
            <RouterLink to="/settings/user/basicInfo">
                <inlineContentBox content="账号选项" icon="user"/>
            </RouterLink>
            <RouterLink to="/faq">
                <inlineContentBox content="答疑中心" icon="contact"/>
            </RouterLink>
            <RouterLink to="/beta">
                <inlineContentBox content="测试" icon="contact"/>
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