<script setup>
import { Input, InputPassword, Button } from 'ant-design-vue'
import { defineProps } from 'vue'

const props = defineProps(['username', 'showDialog'])

</script>
<template>
    <div class="mainBG" v-if="showDialog">
        <div class="mainDIv">
            <div class="leftDiv"></div>
            <div class="rightDiv">
                <h1>登录Memesa</h1>
                如果想要进一步操作，我们需要先验证您的身份
                <Input style="width: 90%; margin: 5px;" placeholder="用户名" :value="props.username" readonly>
                    <template #prefix>
                        <img src="@/assets/user.svg">
                    </template>
                </Input>
                <InputPassword style="width: 90%; margin: 5px;" placeholder="密码" v-model:value="password">
                    <template #prefix>
                        <img src="@/assets/lock.svg">
                    </template>
                </InputPassword>
                <Button type="primary" style="margin: 5px;" @click="getLoginResult">验证</Button>
                <RouterLink to="/register">
                    <Button type="link" style="margin: 5px;">这不是我的账户</Button>
                </RouterLink>
                
            </div>
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
.mainBG{
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}
#loginInput{
    width: 90%; 
    margin: 5px;
}
</style>