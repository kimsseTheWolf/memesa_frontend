<script setup>
import { Input, InputPassword, Button, Checkbox, message, Modal } from 'ant-design-vue';
import axios from 'axios';
import QueryString from 'qs';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import generalSettingsLanguage from '@/views/settings/General/generalSettingsLanguage.vue';

const t = useI18n()
const username = ref("")
const password = ref("")
const email = ref("")
const displayLangMenu = ref(false)
const isCheckedELUAAgreement = ref(false)

function triggerLangMenu(){
    displayLangMenu.value = !displayLangMenu.value
}

function getRegisterResult(){
    if (isCheckedELUAAgreement.value == true){
        // check ull input
        if (username.value == "" || password.value == "" || email.value == ""){
            message.error(t.t('RegisterPage.hidden.bullInputError'))
            return
        }
        let data = {
            "username": username.value,
            "password": password.value,
            "email": email.value
        }
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            url: "/api/user/register",
            data: QueryString.stringify(data)
        }).then(info => {
            message.success(t.t('RegisterPage.success'))
            console.log(info)
        }).catch(err => {
            message.error(t.t('RegisterPage.failed'))
            console.log(err)
        })
    }
    else{
        message.info("您需要先同意用户使用条款与协议！")
    }
}


</script>
<template>
    <div class="mainDIv">
        <div class="leftDiv"></div>
        <div class="rightDiv">
            <!-- 注册Memesa -->
            <h1>{{$t('RegisterPage.title')}}</h1>
            <!-- 欢迎来到Memesa…… -->
            {{$t('RegisterPage.description')}}
            <!-- 用户名 -->
            <Input style="width: 90%; margin: 5px;" :placeholder="$t('RegisterPage.input.username')" v-model:value="username">
                <template #prefix>
                    <img src="@/assets/user.svg">
                </template>
            </Input>
            <!-- 邮箱 -->
            <Input style="width: 90%; margin: 5px;" :placeholder="$t('RegisterPage.input.email')" v-model:value="email">
                <template #prefix>
                    <img src="@/assets/email.svg">
                </template>
            </Input>
            <!-- 密码 -->
            <InputPassword style="width: 90%; margin: 5px;" :placeholder="$t('RegisterPage.input.password')" v-model:value="password">
                <template #prefix>
                    <img src="@/assets/lock.svg">
                </template>
            </InputPassword>
            <!-- 同意用户协议 -->
            <Checkbox v-model:checked="isCheckedELUAAgreement">{{$t('RegisterPage.agreement')}}</Checkbox><br>
            <!-- 注册 -->
            <Button type="primary" style="margin: 5px;" @click="getRegisterResult()">{{$t('RegisterPage.register')}}</Button>
            {{$t('RegisterPage.isAccountExisted')}}
            <RouterLink to="/login">
                <!-- 登录 -->
                <Button type="link" style="margin: 5px;">{{$t('RegisterPage.login')}}</Button>
            </RouterLink>
            <Button style="float: right;" @click="triggerLangMenu">
                <template #icon>
                    <img src="@/assets/language.svg" width="20">
                </template>
            </Button>
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