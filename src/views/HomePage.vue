<script setup>
import betaInfo from '@/components/betaInfo.vue';
import { Button } from 'ant-design-vue';
</script>
<template>
    <h1 class="page-title">
        首页
    </h1>
    <betaInfo>
        <template #title>
            <h2>欢迎来到Memesa早期预览！（使用前必读）</h2>
        </template>
        <template #content>
            如果你看到这个页面，那么说明你已经进入Memesa正在开发的一个版本。你将有资格体验目前正在开发或测试的最新功能。在早期预览版本中，所有的用户数据和其他数据会和主要服务器隔离且不互通，并且在此次测试期之后会移除所有数据。你的反馈和建议对我们至关重要！<br>
            最后非常感谢您使用本次测试版本，下面的向导会告诉你本次版本的功能。<br>
            <RouterLink to="/faq/changelog">
                <Button type="link">查看更新记录</Button>
            </RouterLink>
        </template>
    </betaInfo>
</template>