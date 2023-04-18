<script setup>
import { Button } from 'ant-design-vue';
</script>
<template>
    <h1>答疑中心</h1>
    遇到什么问题了吗，我们来解决！
    <div class="static-content-block">
        <h2>至开发者与测试人员</h2>
        再次感谢大家积极报名并参加测试！如果你在本次测试中遇到了任何问题，请进行反馈或联系我们的开发人员。如果你是内部测试人员，你可以通过在我们的项目仓库中发布Issule来反馈。<br>
        <Button type="link">
            <a href="https://github.com/kimsseTheWolf/memesa_frontend/issues">报告前端问题</a>
        </Button>
        <br>
        <Button type="link">
            <a href="https://github.com/kimsseTheWolf/memesa_backend/issues">报告后端问题</a>
        </Button>
    </div>
    <div class="static-content-block">
        <h2>更新日志</h2>
        查看更新记录<br>
        <RouterLink to="/faq/changelog">
            <Button type="primary">打开更新日志</Button>
        </RouterLink>
    </div>

</template>