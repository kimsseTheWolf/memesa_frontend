<script setup>
import { Input, InputPassword, Button, message, Checkbox, Modal } from 'ant-design-vue'
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import QueryString from 'qs';
import avatar from '@/js/avatar';
import language from '@/js/language';
import generalSettingsLanguage from '@/views/settings/General/generalSettingsLanguage.vue';

const username = ref("")
const password = ref("")
const keepAlive = ref(false)
const displaySuccessDialogStatus = ref(false)
const displayLangMenu = ref(false)
const t = useI18n()

function triggerLangMenu(){
    displayLangMenu.value = !displayLangMenu.value
}

function refreshPage(){
    location.reload()
}

function getLoginResult(){
    // check input validation
    if (username.value == "" || password.value == ""){
        message.warn("请输入用户名和密码")
        return
    }
    // generate metadata
    let data = {
        "username": username.value,
        "password": password.value,
        "keepAlive": keepAlive.value,
    }
    // request
    axios({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "post",
        url: "/api/user/login",
        data: QueryString.stringify(data)
    }).then((info) => {
        console.log(info)
        const token = info.data.Data.token
        localStorage.setItem("MEMESA_TOKEN", token)
        localStorage.setItem("MEMESA_ID", info.data.Data.id)
        // send a request to get the user avatar
        let avatarAddress = avatar.getUserAvatarAddress(username.value)
        localStorage.setItem("MEMESA_AVATAR", avatarAddress)
        message.success(t.t("Login.message.success"))
        showSuccessDialog()
    }).catch((err) => {
        message.error(t.t("Login.message.failed"))
        console.log(err)
        return
    })

}

function showSuccessDialog(){
    displaySuccessDialogStatus.value = true
}

</script>
<template>
    <div class="mainDIv">
        <div class="leftDiv"></div>
        <div class="rightDiv">
            <h1>{{$t('Login.title')}}</h1>
            {{$t('Login.description')}}
            <Input style="width: 90%; margin: 5px;" :placeholder="$t('Login.usernamePlaceHolder')" v-model:value="username">
                <template #prefix>
                    <img src="@/assets/user.svg">
                </template>
            </Input>
            <InputPassword style="width: 90%; margin: 5px;" :placeholder="$t('Login.passwordPlaceHolder')" v-model:value="password">
                <template #prefix>
                    <img src="@/assets/lock.svg">
                </template>
            </InputPassword>
            <Checkbox>{{$t('Login.rememberMeCheckBx')}}</Checkbox><br>
            <Button type="primary" style="margin: 5px;" @click="getLoginResult">{{$t('Login.loginBtn')}}</Button>
            <RouterLink to="/register">
                <Button type="link" style="margin: 5px;">{{$t('Login.registerBtn')}}</Button>
            </RouterLink>
            <Button style="float: right;" @click="triggerLangMenu">
                <template #icon>
                    <img src="@/assets/language.svg" width="20">
                </template>
            </Button>
            <Modal :title="$t('Login.successModal.title')" v-model:visible="displaySuccessDialogStatus">
                <p>{{$t('Login.successModal.description')}}</p>
                <template #footer>
                    <RouterLink to="/personHomepage">
                        <Button type="primary">{{$t('Login.successModal.continueBtn')}}</Button>
                    </RouterLink>
                </template>
            </Modal>
            <Modal title="Language Preferences" v-bind:visible="displayLangMenu" v-on:ok="refreshPage" v-on:cancel="triggerLangMenu">
                <generalSettingsLanguage/>
            </Modal>
        </div>
    </div>
</template>
<style>
.leftDiv{
    width: 300px;
    height: 500px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: #ff9900;
}
.rightDiv{
    width: 500px;
    height: 500px;
    padding: 15px;
    padding-top: 100px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #f6f6f6;
}
.mainDIv{
    display: flex;
    margin: auto;
    padding-top: 100px;
    width: fit-content;
    height: fit-content;
    align-items: center;
    vertical-align: center;
}
#loginInput{
    width: 90%; 
    margin: 5px;
}
</style>