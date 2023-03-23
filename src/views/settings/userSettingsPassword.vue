<script setup>
import { Divider, message, Button } from 'ant-design-vue';
import axios from 'axios';
import { ref } from 'vue'

const email = ref("未绑定邮箱")
const password = ref("当前无密码")

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
        url: "/user/getUserInfo",
    }).then(data => {
        console.log(data)
        email.value = data.data.Data.email
        password.value = data.data.Data.password
    }).catch(err => {
        console.log(err)
        message.error("啊哦！我们在获取你的账号信息时出现了一些问题QAQ")
    })
}
gatherUserInfo()
</script>
<template>
    <h2>修改我的邮箱或密码</h2>
    您可以在这里修改您的绑定邮箱或者您的账号密码。但是您需要先验证您的初始邮箱或密码。
    <Divider></Divider>
    <h3><b>修改绑定邮箱</b></h3>
    若您当前的邮箱地址已经不再使用，您可以在这里切换您的邮箱地址。<br>
    <b>当前邮箱地址：</b> {{ email }}<br>
    <Button type="primary">切换邮箱地址</Button>
    <Divider></Divider>
    <h3><b>修改密码</b></h3>
    您可以在此处修改密码
    <br>
    <Button type="primary">修改密码</Button>
</template>