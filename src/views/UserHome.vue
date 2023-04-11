<script setup>
import LoginRequireBox from '@/components/LoginRequireBox.vue'
import { computed, ref, onMounted } from 'vue';
import { Avatar, Button, message, Modal, Input, Textarea } from 'ant-design-vue';
import inlineContentBox from '@/components/InlineContentBox.vue';
import AvatarHandler from '@/js/avatar'
import user from '@/js/user';
import { useI18n } from 'vue-i18n';

const isLoggedIn = computed(()=>{
    if (localStorage.getItem("MEMESA_TOKEN") == null){
        return false
    }
    else{
        return true
    }
})
const t = useI18n()

const username = ref(t.t('UserHomepage.hidden.username'))
const email = ref(t.t('UserHomepage.hidden.email'))
const userid = ref(t.t('UserHomepage.hidden.userid'))
const description = ref(t.t('UserHomepage.hidden.description'))
const password = ref("no_password")
const avatarAddress = ref("")

async function gatherUserInfo(){
    let userData = await user.getUserInfo(localStorage.getItem("MEMESA_TOKEN"))
    if (userData == null){
        message.error(t.t('UserHomepage.messages.cannotGatherInfo'))
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
    <!-- 我 -->
    <h1 class="page-title">{{$t('UserHomepage.title')}}</h1>
    <LoginRequireBox v-show="!isLoggedIn"/>
    <div v-if="isLoggedIn">
        <div class="static-content-block">
            <div id="inline-display">
                <Avatar :size="60" :src="avatarAddress">
                    <img :src="avatarAddress" v-if="avatarAddress != ''">
                    <div v-if="avatarAddress == ''">
                        <!-- 登录占位符 -->
                        {{$t('UserHomepage.mainBox.avatarOccupation')}}
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
                    <!-- 修改我的个人资料 -->
                    <Button type="primary">{{$t('UserHomepage.mainBox.modifyUserInfoBtn')}}</Button>
                </RouterLink>
                
            </div>
            <div>
                <div style="display: inline-block; margin-right: 7px;">
                    <!-- 关注 -->
                    <img src="@/assets/subscribe.svg"><b>{{$t('UserHomepage.mainBox.followingNum')}} </b> {{ followingNumber }}
                </div>
                <div style="display: inline-block; margin-right: 7px;">
                    <!-- 粉丝 -->
                    <img src="@/assets/fens.svg"><b>{{$t('UserHomepage.mainBox.followerNum')}} </b> {{ followingNumber }}
                </div>
                <div style="display: inline-block; margin-right: 7px;">
                    <!-- 稿件 -->
                    <img src="@/assets/video.svg"><b>{{$t('UserHomepage.mainBox.videoNum')}} </b> {{ followingNumber }}
                </div>
            </div>
            
        </div>
        <div class="static-content-block">
            <!-- 历史 -->
            <h2>{{$t('UserHomepage.history.title')}}</h2>
            {{$t('UserHomepage.history.description')}}<br>
            <div>
                <!-- 空占位 -->
                {{$t('UserHomepage.history.emptyOccupation')}}
            </div>
            <RouterLink to="/history">
                <Button type="primary" style="margin: 5px;">{{$t('UserHomepage.history.moreHistoryBtn')}}</Button>
            </RouterLink>
        </div>
        <div class="static-content-block">
            <!-- 收藏 -->
            <h2>{{$t('UserHomepage.favorite.title')}}</h2>
            {{$t('UserHomepage.favorite.description')}}
            <div>
                <!-- 空占位 -->
                {{$t('UserHomepage.favorite.title')}}
            </div>
            <Button type="primary" style="margin: 5px;">{{$t('UserHomepage.favorite.checkAllBtn')}}</Button>
            <Button style="margin: 5px;">{{$t('UserHomepage.favorite.createNewBtn')}}</Button>
        </div>
        <div class="static-content-block">
            <!-- 动态 -->
            <h2>{{$t('UserHomepage.moments.title')}}</h2>
            {{$t('UserHomepage.moments.description')}}<br>
            <div>
                <!-- 空占位 -->
            </div>
            <RouterLink to="/moment/myMoments">
                <Button type="primary" style="margin: 5px;">{{$t('UserHomepage.moments.gotoMomentsBtn')}}</Button>
            </RouterLink>
        </div>
        <div class="static-content-block">
            <h2>{{$t('UserHomepage.moreFeatures.title')}}</h2>
            <RouterLink to="/workManager">
                <!-- 创作者中心 -->
                <inlineContentBox :content="$t('UserHomepage.moreFeatures.workManager')" icon="workManager"/>
            </RouterLink>
            <RouterLink to="/settings">
                <!-- 设置 -->
                <inlineContentBox :content="$t('UserHomepage.moreFeatures.settings')" icon="settings"/>
            </RouterLink>
            <RouterLink to="/settings/user/basicInfo">
                <!-- 账号选项 -->
                <inlineContentBox :content="$t('UserHomepage.moreFeatures.account')" icon="user"/>
            </RouterLink>
            <RouterLink to="/faq">
                <!-- 答疑中心 -->
                <inlineContentBox :content="$t('UserHomepage.moreFeatures.qa')" icon="contact"/>
            </RouterLink>
            <RouterLink to="/beta">
                <!-- 测试 -->
                <inlineContentBox :content="$t('UserHomepage.moreFeatures.beta')" icon="contact"/>
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