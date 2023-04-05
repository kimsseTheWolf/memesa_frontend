<script setup>
import user from '@/js/user';
import avatar from '@/js/avatar';
import subscriptions from '@/js/subscriptions';
import { Avatar, Button, message, Tooltip } from 'ant-design-vue';
import { ref, computed, created } from 'vue'
import { useRoute } from 'vue-router';
// import router from 'vue-router'

const targetUsername = ref("")
const targetDescription = ref("")
const targetID = ref("")
const targetAvatarAddr = ref("")
const isSubscripted = ref(false)
const route = useRoute()
const followingNumber = ref(0)
const inputID = computed(()=>{
    return route.params.id
})


async function getTargetUserInfo(){
    // directly get the user info from the local source
    let userData = await user.getUserBasicInfo(inputID.value)
    targetUsername.value = userData.username
    targetDescription.value = userData.description
    // get user following list
    let followingList = await subscriptions.getUserFollowingList(inputID.value)
    followingNumber.value = followingList.length
    console.log("Follower list gathered and changed")
}

async function userInfoTrigger(){
    let sth = await user.getUserBasicInfo(inputID.value)
    setTimeout(() => {
        getTargetUserInfo()
    }, 200);
}

async function getTargetUserAvatar(){
    if (localStorage.getItem("TEMP_USERAVATAR") != undefined){
        targetAvatarAddr.value = localStorage.getItem("TEMP_USERAVATAR")
        return
    }
    else{
        let result = await avatar.getUserAvatarAddress(false, inputID.value)
        if (!result){
            return
        }
        avatar.value = localStorage.getItem("TEMP_USERAVATAR")
        targetAvatarAddr
    }
}

async function getUserSupscriptionInfo(){
    let resultInfo = await subscriptions.getSubscriptionRelation(inputID.value)
    console.log("data from the vue file")
    console.log(resultInfo)
    if (resultInfo.status == false){
        // message.warning("暂时无法获取你们的关注信息")
        isSubscripted.value = false
        return
    }
    // check whether is following
    if (resultInfo.data.isFollowing != 1){
        isSubscripted.value = false
        return
    }
    isSubscripted.value = true
    return
}

async function subscribeUser(){
    let result = await subscriptions.addSubscription(inputID.value)
    getUserSupscriptionInfo()
}

async function cancleSubscribeUser(){
    let result = await subscriptions.removeSubscription(inputID.value)
    getUserSupscriptionInfo()
}

console.log(inputID.value)
userInfoTrigger()
getTargetUserAvatar()
setTimeout(() => {
    getUserSupscriptionInfo()
}, 500);

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
                <div style="width: fit-content; color: gray; font-size: small;">
                    <img src="@/assets/uid.svg">
                    {{ targetID }}
                </div>
            </span>
            <Button type="primary" @click="subscribeUser" v-if="!isSubscripted">关注</Button>
            <Tooltip>
                <Button v-if="isSubscripted" @click="cancleSubscribeUser">已关注</Button>
                <template #title>
                    点击取消关注
                </template>
            </Tooltip>
            
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