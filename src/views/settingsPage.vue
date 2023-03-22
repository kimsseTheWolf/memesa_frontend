<script setup>
import { Layout, LayoutSider, LayoutContent, Menu, SubMenu, MenuItem, MenuItemGroup } from 'ant-design-vue';
</script>
<template>
    <h1>设置</h1>
    <Layout>
        <LayoutSider style="width: 200px; overflow: auto; height: 700px; background-color: #fdfdfd;">
            <Menu mode="inline" style="height: 100%;" theme="light">
                <SubMenu key="user">
                    <template #title>用户</template>
                    <MenuItemGroup>
                        <MenuItem key="user/basicInformation">基本用户信息</MenuItem>
                        <MenuItem key="user/sensitiveInformation">基本敏感信息</MenuItem>
                        <MenuItem key="user/agreement">用户协议与服务条款</MenuItem>
                        <MenuItem key="user/logout">登出</MenuItem>
                        <MenuItem key="user/clearLocal">删除本地用户信息</MenuItem>
                        <MenuItem key="user/test">测试页面</MenuItem>
                    </MenuItemGroup>
                </SubMenu>
            
            </Menu>
        </LayoutSider>
        <LayoutContent style="height: 700px; padding: 30px;">
            <div class="settings-content-box">
                
            </div>
        </LayoutContent>
    </Layout>
</template>
<style>
.settings-content-box{
    display: block;
    width: 100%;
    height: 100% !important;
    background-color: white;
    overflow: auto;
    padding: 30px;
}
</style>