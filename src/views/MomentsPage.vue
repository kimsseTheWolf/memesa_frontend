<script setup>
import { Menu, MenuItem } from 'ant-design-vue';
</script>
<template>
    <h1 class="page-title">动态</h1>
    <Menu mode="horizontal">
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
        <RouterLink to="/moment/myMoments">
            我的动态
        </RouterLink>
    </MenuItem>
        
    </Menu>
    <RouterView>
        
    </RouterView>
</template>