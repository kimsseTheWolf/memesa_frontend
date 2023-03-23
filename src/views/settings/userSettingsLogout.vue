<script setup>
import { Button, Modal, Divider, Alert, message } from 'ant-design-vue';
import { ref } from 'vue'
import router from '@/router'

const logoutUserWarningDlgStatus = ref(false)
const deleteSuccessDlgStatus = ref(false)

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
// function hideDeleteSuccessDlg(){
//     deleteSuccessDlgStatus.value = false
// }
</script>
<template>
    <h2>退出登录</h2>
    若您需要切换账号或者退出登录，您可以直接点击退出登录。这不会删除您的账号个人数据。<br>
    <Button type="primary" danger class="inline-button" @click="showLogoutUserWarning()">退出登录</Button>
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
                <Button type="primary">登录</Button>
            </RouterLink>
            <RouterLink to="/register">
                <Button type="default">注册</Button>
            </RouterLink>
            
        </template>
    </Modal>
    <Divider/>
    <h2>注销账号</h2>
    <Alert message="您需要谨慎操作此部分的内容。平台对您的不谨慎操作不负任何责任" type="error"></Alert>
    账号注销后您的账号将不再可用且无法撤销。您可以选择是否保存您的作品和动态。
</template>
