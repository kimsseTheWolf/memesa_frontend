<script setup>
import { Input } from 'ant-design-vue';
</script>
<template class="body">
    <div class="login-dialog-box">
        <h1 class="title">欢迎！</h1>
        欢迎来到这个自由的手书分享网站。输入你的用户名以及密码以继续。<br>
        <Input id="login-input"/>
    </div>
</template>
<style>
.body{
    background-color: rgb(255, 228, 177);
}
.title{
    color: orange;
    font-weight: 600;
}
.login-dialog-box{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: white;
    border-color: orange;
    border-style: solid;
    border-width: 1px;
    height: fit-content;
    width: 500px;
    border-radius: 7.5px;
    padding: 10px;
    margin: 10%, 50%, 50%;
    text-align: center;
}
#login-input{
    width: 90%
}

</style>