<script setup>
import { Input, InputPassword, Button, Checkbox, message } from 'ant-design-vue';
import axios from 'axios';
import QueryString from 'qs';
import { ref } from 'vue';

const username = ref("")
const password = ref("")
const email = ref("")
const isCheckedELUAAgreement = ref(false)

function getRegisterResult(){
    if (isCheckedELUAAgreement.value == true){
        // check ull input
        if (username.value == "" || password.value == "" || email.value == ""){
            message.error("用户名，邮箱，密码为必填字段")
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
            message.success("注册成功")
            console.log(info)
        }).catch(err => {
            message.error("注册失败：用户名不合法或已经被占用")
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
            <h1>注册Memesa</h1>
            欢迎来到Memesa，一个自由的手书分享网站！通过填写以下信息即可完成注册。
            <Input style="width: 90%; margin: 5px;" placeholder="用户名" v-model:value="username">
                <template #prefix>
                    <img src="@/assets/user.svg">
                </template>
            </Input>
            <Input style="width: 90%; margin: 5px;" placeholder="邮箱" v-model:value="email">
                <template #prefix>
                    <img src="@/assets/email.svg">
                </template>
            </Input>
            <InputPassword style="width: 90%; margin: 5px;" placeholder="密码" v-model:value="password">
                <template #prefix>
                    <img src="@/assets/lock.svg">
                </template>
            </InputPassword>
            <Checkbox v-model:checked="isCheckedELUAAgreement">我已同意《用户使用协议与条款》</Checkbox><br>
            <Button type="primary" style="margin: 5px;" @click="getRegisterResult()">注册</Button>
            已有账号？
            <RouterLink to="/login">
                <Button type="link" style="margin: 5px;">登录</Button>
            </RouterLink>
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