<script setup>
import { Button } from 'ant-design-vue';
</script>
<template>
    <div class="static-content-block">
        <slot name="title">

        </slot>
        <slot name="content">

        </slot>
        <br>
        <RouterLink to="/faq">
            <Button type="primary" style="margin-top: 5px;">打开答疑中心查看详情</Button>
        </RouterLink>
    </div>
</template>