<script setup>
import { Button, Modal, Divider, Alert, message, Input, InputPassword } from 'ant-design-vue';
import { ref } from 'vue'
import router from '@/router'
import VerifyPassword from '../../components/VerifyPassword.vue';
import axios from 'axios';
import QueryString from 'qs';

const logoutUserWarningDlgStatus = ref(false)
const deleteSuccessDlgStatus = ref(false)
const passwordVerifierStatus = ref(false)
const username = ref("")
const description = ref("")
const verifyInputPassword = ref("")

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

function showLogoutUserWarning(){
    logoutUserWarningDlgStatus.value = true
}

function deleteLocalUser(){
    localStorage.clear()
    logoutUserWarningDlgStatus.value = false
    showDeleteSuccessDlgStatus()
    message.success("登出成功！")
}

function hideLogoutUserWarning(){
    logoutUserWarningDlgStatus.value = false
}

function showPasswdVerifier(){
    passwordVerifierStatus.value = true
}


function hidePasswdVerifier(){
    passwordVerifierStatus.value = false
}
function showDeleteSuccessDlgStatus(){
    Modal.confirm({
        title: "您已成功登出",
        content: "您现在可以登录新的Memesa帐号了。在此之前大多数功能将不可用。是否现在去登录？",
        okText: "登录",
        cancelText: "注册",
        onOk(){
            router.push("/login")
        },
        onCancel(){
            router.push("/register")
        }
    })
}

gatherUserInfo()

// TODO: Password verification service code first.
function verifyUserPassword() {
    let requestData = {
        "password": verifyInputPassword.value
    }
    // send request
    axios({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": localStorage.getItem("MEMESA_TOKEN")
        },
        method: "post",
        url: "/api/user/checkPassword",
        data: QueryString.stringify(requestData)
    }).then(data => {
        if (data.data.Message == "true"){
            removeUserWarningDialog()
            return true
        }
        else{
            message.error("密码错误")
            return false
        }
    }).catch(err => {
        console.log(err)
        message.error("我们在验证你的账户时出现了一些问题")
        return false
    })
}

function removeUserWarningDialog(){
    // final confirmation from the user
    Modal.confirm({
        title: "您确定您要继续注销账号吗？",
        content: "注销账号意味着您的账号将会被删除，这个操作是无法撤销的，您确定要继续吗？",
        okText: "确定",
        cancelText: "取消",
        onCancel(){
            router.push("/settings")
        },
        onOk(){
            let result = deleteServerUser()
            if (!result){
                message.error("删除失败")
                return
            }
            else{
                showDeleteSuccessDlgStatus()
                return
            }
        }
    })

}

function deleteServerUser(){
    // send a request to the server that to delete the user from the database
    axios({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": localStorage.getItem("MEMESA_TOKEN")
        },
        method: "post",
        url: "/api/user/deleteUser"
    }).then(data => {
        if (data.data.Code == 200){
            localStorage.clear()
            message.success("用户注销成功")
            return true
        }
        else{
            message.error("用户注销失败")
            return false
        }
    }).catch(err => {
        console.log(err)
        message.error("用户注销失败")
        return false
    })
}

function refreshPage(){
    location.reload()
}

</script>
<template>
    <VerifyPassword username="unknown" :showDialog="false"/>
    <h2>退出登录</h2>
    若您需要切换账号或者退出登录，您可以直接点击退出登录。这不会删除您的账号个人数据。<br>
    <Button type="primary" class="inline-button" @click="showLogoutUserWarning()">退出登录</Button>
    <Modal v-model:visible="logoutUserWarningDlgStatus" title="您确定要登出吗？" @ok="deleteLocalUser" @cancel="hideLogoutUserWarning">
        <p>您确定要继续在此设备上退出登录吗？这不会删除您的账号数据。</p>
        <template #footer>
            <Button type="primary" @click="deleteLocalUser">确定</Button>
            <Button type="default" @click="hideLogoutUserWarning">取消</Button>
        </template>
    </Modal>
    <Modal v-model:visible="deleteSuccessDlgStatus" title="登出成功" :closable="false">
        您已登出成功，是否立即重新登录？
        <template #footer>
            <RouterLink to="/login">
                <Button type="primary" @click="refreshPage">登录</Button>
            </RouterLink>
            <RouterLink to="/register">
                <Button type="default" @click="refreshPage">注册</Button>
            </RouterLink>
            
        </template>
    </Modal>
    <Divider/>
    <h2>注销账号</h2>
    <Alert message="您需要谨慎操作此部分的内容。平台对您的不谨慎操作不负任何责任" type="error"></Alert>
    账号注销后您的账号将不再可用且无法撤销。您可以选择是否保存您的作品和动态。<br>
    <Button type="danger" @click="showPasswdVerifier()">注销账号</Button>
    <Modal title="密码验证" :visible="passwordVerifierStatus" @cancel="hidePasswdVerifier">
        为了您的账号安全，您需要输入账号密码以验证输入。
        <Input placeholder="用户名" :value="username" readonly class="with-margin">
            <template #prefix>
                <img src="@/assets/user.svg">
            </template>
        </Input>
        <InputPassword placeholder="密码" class="with-margin" v-model:value="verifyInputPassword"/>
        <template #footer>
            <Button type="primary" @click="verifyUserPassword">验证</Button>
            <Button @click="hidePasswdVerifier">取消</Button>
        </template>
    </Modal>
</template>
<style>
.with-margin{
    margin: 5px;
}
</style>
