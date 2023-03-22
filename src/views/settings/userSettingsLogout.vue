<script setup>
import { Button, Modal, Divider, Alert } from 'ant-design-vue';
</script>
<template>
    <h2>退出登录</h2>
    如果您因为某些原因想要切换账号或者退出登录，你可以使用以下选项：<br>
    <Button type="primary" danger class="inline-button" @click="showLogoutUserWarning()">退出登录</Button>
    <Button type="default" class="inline-button">切换账号</Button>
    <Modal v-model:visible="logoutUserWarningDlgStatus" title="您确定要登出吗？" @ok="deleteLocalUser" @cancel="hideLogoutUserWarning">
        <p>您确定要继续在此设备上退出登录吗？这不会删除您的账号数据。</p>
    </Modal>
    <Divider/>
    <h2>注销账号</h2>
    <Alert message="您需要谨慎操作此部分的内容。平台对您的不谨慎操作不负任何责任" type="error"></Alert>
    账号注销后您的账号将不再可用且无法撤销。您可以选择是否保存您的作品和动态。
</template>
