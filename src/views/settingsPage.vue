<script setup>
import { Layout, LayoutSider, LayoutContent, Menu, SubMenu, MenuItem, MenuItemGroup } from 'ant-design-vue';
import { ref } from 'vue'

const selectedKeys = ref(['user'])
</script>
<template>
    <h1>设置</h1>
    <Layout>
        <LayoutSider style="width: 200px; overflow: auto; height: 700px; background-color: #fdfdfd;">
            <Menu mode="inline" style="height: 100%;" theme="light" v-model:open-keys="selectedKeys">
                <SubMenu key="user">
                    <template #title>用户</template>
                    <MenuItemGroup>
                        <RouterLink class="normal" to="/settings/user/basicInfo">
                            <MenuItem key="user/basicInformation">用户，简介与头像</MenuItem>
                        </RouterLink>
                        <RouterLink class="normal" to="/settings/user/sensitiveInformation">
                            <MenuItem key="user/sensitiveInformation">邮箱与密码</MenuItem>
                        </RouterLink>
                        <RouterLink class="normal" to="/settings/user/agreement">
                            <MenuItem key="user/agreement">用户协议与服务条款</MenuItem>
                        </RouterLink>
                        <RouterLink class="normal" to="/settings/user/logout">
                            <MenuItem key="user/logout">账号管理</MenuItem>
                        </RouterLink>
                    </MenuItemGroup>
                </SubMenu>
                <SubMenu key="general">
                    <template #title>通用</template>
                    <MenuItemGroup>
                        <RouterLink class="normal" to="/settings/general/language">
                            <MenuItem key="general/language">语言 Language</MenuItem>
                        </RouterLink>
                    </MenuItemGroup>
                </SubMenu>
            
            </Menu>
        </LayoutSider>
        <LayoutContent style="height: 700px; padding: 30px;">
            <div class="settings-content-box">
                <RouterView>

                </RouterView>
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
.normal{
    color: black;
}
</style>