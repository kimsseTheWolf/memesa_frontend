<script setup>
import { Input, InputPassword, Button } from 'ant-design-vue'
</script>
<template>
    <div class="mainDIv">
        <div class="leftDiv"></div>
        <div class="rightDiv">
            <h1>登录Memesa</h1>
            在这里登录，或注册一个账号
            <Input style="width: 90%; margin: 5px;" placeholder="用户名">
                <template #prefix>
                    <img src="@/assets/user.svg">
                </template>
            </Input>
            <InputPassword style="width: 90%; margin: 5px;" placeholder="密码">
                <template #prefix>
                    <img src="@/assets/lock.svg">
                </template>
            </InputPassword>
            <Button type="primary" style="margin: 5px;">登录</Button>
            <Button type="link" style="margin: 5px;">注册</Button>
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