<script setup>
import { Button, Result, Drawer, Input, Textarea, Upload } from 'ant-design-vue';
import { ref } from 'vue';

const uploadDrawerVisible = ref(false)
</script>
<template>
    <Button type="primary" style="margin-top: 5px;" @click="uploadDrawerVisible = !uploadDrawerVisible">发布新动态</Button>
    <Result title="你还没有发布过动态" sub-title="点击左上方发布按钮发布你的第一个动态吧！"/>
    <Drawer title="发布新动态" placement="top" :visible="uploadDrawerVisible" @close="uploadDrawerVisible = !uploadDrawerVisible" height="600px" :rows="6">
        <template #extra>
            <Button type="primary">发布</Button>
            <Button>取消</Button>
        </template>
        <h2>发布新动态</h2>
        完成后点击右上角发布即可
        <Textarea :bordered="false" placeholder="说些什么吧" style="margin-top: 5px;"></Textarea>
        <Upload list-type="picture-card">
            上传最多4个图片
        </Upload>
    </Drawer>
</template>