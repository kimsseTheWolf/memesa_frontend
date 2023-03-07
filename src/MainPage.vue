<script setup>
// import { Button } from 'ant-design-vue';
import HeaderBox from './components/HeaderBox.vue';
</script>
<template>
    <HeaderBox/>
    <div class="router-content-style">
        <RouterView v-slot="{Component}">
            <Transition name="fade">
                <Component :is="Component"/>
            </Transition>
        </RouterView>
    </div>
</template>
<style>
body{
    margin: 5px;
}
</style>