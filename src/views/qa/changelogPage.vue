<script setup>
import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue';
</script>
<template>
    <Breadcrumb>
        <BreadcrumbItem>
            <RouterLink to="/faq">答疑中心</RouterLink>
        </BreadcrumbItem>
        <BreadcrumbItem>更新日志</BreadcrumbItem>
    </Breadcrumb>
    <h1 class="page-title">
        更新日志
    </h1>
    <div class="static-content-block">
        <h2>2023年4月14日内测版更新</h2>
        版本号：MEMESA-Alpha1-20230414-temp
        <h3><b>更新</b></h3>
        <ul>
            <li>添加了全新的动态功能，现在用户可以发布，查看，删除自己以及他人的动态。前往动态界面即可发布动态</li>
            <li>更新了用户主页的游客视角。从原来的列表式改为现在的标签页形式。用户首页设计不变</li>
            <li>添加了对于网站多国语言的支持（可能发布时所有界面的翻译并没有完成），若要调整请前往设置->通用->语言设置查看。</li>
        </ul>
        更多信息请等待通知和公告，感谢大家的鼓励与支持！
    </div>
</template>