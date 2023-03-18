<script setup>
import { Input, InputPassword, Button, message, Checkbox, Modal } from 'ant-design-vue'
import { ref } from 'vue';
import axios from 'axios';
import QueryString from 'qs';

const username = ref("")
const password = ref("")
const keepAlive = ref(false)
const displaySuccessDialogStatus = ref(false)


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
        url: "/user/login",
        data: QueryString.stringify(data)
    }).then((info) => {
        const token = info.data.Data
        localStorage.setItem("MEMESA_TOKEN", token)
        message.success("登录成功")
        showSuccessDialog()
    }).catch((err) => {
        message.error("用户名或密码错误")
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
            <h1>登录Memesa</h1>
            在这里登录，或注册一个账号
            <Input style="width: 90%; margin: 5px;" placeholder="用户名" v-model:value="username">
                <template #prefix>
                    <img src="@/assets/user.svg">
                </template>
            </Input>
            <InputPassword style="width: 90%; margin: 5px;" placeholder="密码" v-model:value="password">
                <template #prefix>
                    <img src="@/assets/lock.svg">
                </template>
            </InputPassword>
            <Checkbox>记住我</Checkbox><br>
            <Button type="primary" style="margin: 5px;" @click="getLoginResult">登录</Button>
            <RouterLink to="/register">
                <Button type="link" style="margin: 5px;">注册</Button>
            </RouterLink>
            <Modal title="登录成功！" v-model:visible="displaySuccessDialogStatus">
                <p>您现在可以访问所有的Memesa功能了。</p>
                <template #footer>
                    <RouterLink to="/personHomepage">
                        <Button type="primary">前往个人主页</Button>
                    </RouterLink>
                </template>
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