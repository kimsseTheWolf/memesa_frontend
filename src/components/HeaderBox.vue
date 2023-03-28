<script setup>
    // import { InputSearch } from 'ant-design-vue';
    import { Input } from 'ant-design-vue';
    import { Button } from 'ant-design-vue';
    import { Avatar } from 'ant-design-vue';
    import { Popover } from 'ant-design-vue';
    import { Tooltip } from 'ant-design-vue';
    import { ref } from 'vue';
    import axios from 'axios';
    import { message } from 'ant-design-vue';
    import AvatarHandler from '@/js/avatar'

    const username = ref("")
    const description = ref("")
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
            description.value = data.data.Data.description
        }).catch(err => {
            console.log(err)
            message.error("啊哦！我们在获取你的账号信息时出现了一些问题QAQ")
        })
    }

    function getAvatarAddress(){
    console.log(AvatarHandler.getAvatarAddress() == "")
    if (AvatarHandler.getAvatarAddress() != undefined && AvatarHandler.getAvatarAddress() != ""){
        avatarAddress.value = AvatarHandler.getAvatarAddress()
    }
    else{
        AvatarHandler.getUserAvatarAddress(true)
        avatarAddress.value = AvatarHandler.getAvatarAddress()
    }
}

    setTimeout(gatherUserInfo, 500)
    getAvatarAddress()
    

</script>
<template>
    <div class="header-box-bg">
        <div class="logo-display">
            <RouterLink to="/">
                <img src="../assets/logo.svg">
            </RouterLink>
        </div>
        <Button ghost>
            <img src="../assets/search.svg">
        </Button>
        <Input width="600px" id="search-input-box" placeholder="搜索手书，音乐，或者视频"/>
        <div class="right-align-box">
            <Tooltip>
                <template #title>
                    历史记录
                </template>
                <img src="@/assets/history.svg" id="clickable" style="margin-right: 5px;">
            </Tooltip>
            <Tooltip>
                <template #title>
                    动态
                </template>
                <RouterLink to="/moment" class="right-icons">
                    <img src="@/assets/moment.svg" id="clickable" style="width: 32px;">
                </RouterLink>
            </Tooltip>
            <Tooltip>
                <template #title>
                    稿件管理
                </template>
                <RouterLink to="/workManager" class="right-icons">
                    <img id="clickable" src="../assets/ico_uploadManage.svg">
                </RouterLink>
            </Tooltip>
            <Popover title="个人中心" style="width: 200px;">
                <RouterLink to="/personHomepage" class="normal-link">
                    <Avatar size="large" id="clickable" :src="avatarAddress"></Avatar>
                </RouterLink>
                <template #content>
                    点击进入个人中心！<br>
                    <div style="text-align: center; margin-top: 10px;">
                        <div v-if="username == ''">
                            登录即可享受全部功能哦！<br>
                            <RouterLink to="/login">
                                <Button type="primary">登录</Button>
                            </RouterLink>
                            <RouterLink to="/register">
                                <Button>注册</Button>
                            </RouterLink>
                        </div>
                        <div v-else>
                            <Avatar size="large" :src="avatarAddress"></Avatar><br>
                            <b>{{ username }}</b>
                            <div style="color:gray;">
                                {{ description }}
                            </div>
                            <RouterLink to="/personHomepage" style="color: white;">
                                <Button type="primary">前往个人主页</Button>
                            </RouterLink>
                            <br>
                            <RouterLink to="/settings/user/logout" style="color: white; margin-top: 10px;">
                                <Button type="link" danger>退出登录</Button>
                            </RouterLink>
                        </div>
                    </div>
                </template>
            </Popover>
        </div>
    </div>
</template>
<style>
.header-box-bg{
    background-color: #FF9900;
    margin: 0px;
    margin-bottom: 5px;
    padding: 5px;
    width: 100%;
    height: fit-content;
    color: white;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}
.logo-display{
    display: inline;
    margin: 5px;
    margin-top: 3px;
    width: fit-content;
    height: fit-content;
    position: absolute;
    left: 5px;
    top: 3px;
}
.search-box-limitator{
    width: 500px;
}
#search-input-box{
    width:500px;
    margin: 7px;
    background-color: rgba(255,255,255, 0.85);
}
.right-align-box{
    display: inline;
    margin: 5px;
    margin-top: 3px;
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 5px;
    right: 5px;
}
.right-icons{
    margin-right: 5px;
}
#clickable{
    cursor: pointer;
}
.normal-link{
    color: white;
}
.normal-link:hover{
    color: white;
}
</style>