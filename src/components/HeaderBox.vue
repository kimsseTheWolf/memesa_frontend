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
    import user from '@/js/user';

    const username = ref("")
    const description = ref("")
    const avatarAddress = ref("")

    async function gatherUserInfo(){
        let userData = user.getUserInfo(localStorage.getItem("MEMESA_TOKEN"))
        username.value = userData.username
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
        <Input width="600px" id="search-input-box" :placeholder="$t('HeaderBox.searchBar')"/>
        <div class="right-align-box">
            <Tooltip>
                <template #title>
                    {{ $t('HeaderBox.history') }}
                </template>
                <RouterLink to="/history">
                    <img src="@/assets/history.svg" id="clickable" style="margin-right: 5px;">
                </RouterLink>
            </Tooltip>
            <Tooltip>
                <template #title>
                    {{ $t('HeaderBox.moments') }}
                </template>
                <RouterLink to="/moment" class="right-icons">
                    <img src="@/assets/moment.svg" id="clickable" style="width: 32px;">
                </RouterLink>
            </Tooltip>
            <Tooltip>
                <template #title>
                    {{ $t('HeaderBox.workManager') }}
                </template>
                <RouterLink to="/workManager" class="right-icons">
                    <img id="clickable" src="../assets/ico_uploadManage.svg">
                </RouterLink>
            </Tooltip>
            <Popover :title="$t('HeaderBox.userAvatar.title')" style="width: 200px;">
                <RouterLink to="/personHomepage" class="normal-link">
                    <Avatar size="large" id="clickable" :src="avatarAddress"></Avatar>
                </RouterLink>
                <template #content>
                    {{ $t('HeaderBox.userAvatar.tips') }}<br>
                    <div style="text-align: center; margin-top: 10px;">
                        <div v-if="username == ''">
                            {{ $t('HeaderBox.userAvatar.loginTips') }}<br>
                            <RouterLink to="/login">
                                <Button type="primary">{{ $t('HeaderBox.userAvatar.login') }}</Button>
                            </RouterLink>
                            <RouterLink to="/register">
                                <Button>{{ $t('HeaderBox.userAvatar.register') }}</Button>
                            </RouterLink>
                        </div>
                        <div v-else>
                            <Avatar size="large" :src="avatarAddress"></Avatar><br>
                            <b>{{ username }}</b>
                            <div style="color:gray;">
                                {{ description }}
                            </div>
                            <RouterLink to="/personHomepage" style="color: white;">
                                <Button type="primary">{{ $t('HeaderBox.userAvatar.gotoUserHomepage') }}</Button>
                            </RouterLink>
                            <br>
                            <RouterLink to="/settings/user/logout" style="color: white; margin-top: 10px;">
                                <Button type="link" danger>{{ $t('HeaderBox.userAvatar.exit') }}</Button>
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