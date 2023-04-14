<script setup>
import { Menu, MenuItem } from 'ant-design-vue';
import LoginRequireBox from '@/components/LoginRequireBox.vue';

function isLoggedIn(){
    if (localStorage.getItem("MEMESA_TOKEN") != undefined || localStorage.getItem("MEMESA_TOKEN") != null){
        return true
    }
    return false
}
</script>
<template>
    <h1 class="page-title">动态</h1>
    <LoginRequireBox v-if="!isLoggedIn()"/>
    <Menu mode="horizontal" v-else>
        <MenuItem key="discover">
            <template #icon>
                <img src="@/assets/compass.svg">
            </template>
            <RouterLink to="/moment/discover">
                发现
            </RouterLink>
        </MenuItem>
        <MenuItem key="subscribe">
            <template #icon>
                <img src="@/assets/subscribe-add.svg">
            </template>
            <RouterLink to="/moment/subscribe">
                关注
            </RouterLink>
        </MenuItem>
        <MenuItem>
            <template #icon>
                <img src="@/assets/postcard.svg" width="25px">
            </template>
            <RouterLink to="/moment/myMoments">
                我的动态
            </RouterLink>
        </MenuItem>
        
    </Menu>
    <RouterView>
        
    </RouterView>
</template>