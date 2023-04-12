<script setup>
import { defineProps, computed, ref } from 'vue';
import { Avatar, Image, ImagePreviewGroup, Button } from 'ant-design-vue';
import avatar from '@/js/avatar';
import user from '@/js/user';

const props = defineProps(['username', 'image_url', 'isLiked', 'uuid', 'id'])
const isLiked = ref(props.isLiked)
const uuid = ref(props.uuid)
const avatarAddr = ref("")
const username = ref("")
const image_size = computed(()=> {
    if (props.image_url.length <= 1){
        return 200
    }
    else {
        return 100
    }
})

function toggleLikeStatus(){
    isLiked.value = !isLiked.value
}

async function getTargetUserAvatar(){
    let result = await avatar.getAnyAvatarAddress(props.id)
    if (result.status != true){
        console.log("Unsuccessful to get user avatar")
        return
    }
    avatarAddr.value = result.address
    console.log("Avatar Address:", avatarAddr.value)
    return
}

async function getUserInfo(){
    let result = await user.getUserBasicInfo(props.id)
    if (result == null){
        return
    }
    username.value = result.username
}


getTargetUserAvatar()
getUserInfo()
</script>
<template>
    <div class="main_box">
        <div class="header_box">
            <Avatar :size="40" :src="avatarAddr">
                <!-- <img :src="avatarAddr"> -->
            </Avatar>
            <div class="username">
                {{ username }}
            </div>
        </div>
        <div class="moments_content">
            <slot name="content" class="content"></slot><br>
            <ImagePreviewGroup>
                <div v-for="i in props.image_url" :key="i" class="iterate_box">
                    <Image v-bind:src="i" :width="image_size" fallback="../assets/img_err" class="image" v-if="i != '0'"></Image>
                </div>
            </ImagePreviewGroup>
        </div>
        <div class="footer">
            <Button type="text" @click="toggleLikeStatus">
                <img src="@/assets/like.svg" height="20" v-if="isLiked == false">
                <img src="@/assets/liked.svg" height="20" v-else>
            </Button>
            <Button type="text" @click="$emit('onclick')">
                <img src="@/assets/comments.svg" height="20">
            </Button>
            <Button type="text" style="float: right;">
                查看详细信息
            </Button>
        </div>
    </div>
</template>
<style>
.main_box{
    margin-left: 400px;
    margin-right: 400px;
    margin-bottom: 30px;
    padding: 15px;
    border-radius: 5px;
    transition: background-color 0.5s;
}
.main_box:hover{
    background-color: #ff99000c;
}
.header_box{
    cursor: pointer;
}
.username{
    font-weight: 600;
    display: inline-block;
    margin-left: 7px;
    font-size: larger;
}
.image{
    display: inline-block;
    /* margin: 5px; */
}
.iterate_box{
    width: fit-content;
    height: fit-content;
    display: inline-block;
    margin-right: 5px;
}
.content{
    display: block;
    margin-bottom: 5px;
}
.footer{
    margin-top: 5px;

}
</style>