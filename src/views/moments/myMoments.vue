<script setup>
import { Button, Result, Drawer, Input, Textarea, Upload, Switch, Tooltip, message } from 'ant-design-vue';
import { ref } from 'vue';

const uploadDrawerVisible = ref(false)
const submitPublicPost = ref(true)
const fileList = ref([])

function beforeUpload(file){
    // check whether the file could fulfill the upload requirement
    if (file.type != 'image/*'){
        fileList.value.splice(fileList.value.indexOf(file), 1)
        message.error("目前只能上传图片哦QAQ")
    }
    if (!(file.size / 1024 / 1024 <= 2)){
        fileList.value.splice(fileList.value.indexOf(file), 1)
        message.error("文件太大啦！")
    }
}

function uploadMoments(){
    
}

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
        <Upload list-type="picture-card" :max-count="4" v-model:file-list="fileList" :before-upload="beforeUpload">
            <img src="@/assets/plus-circle.svg" style="display: inline-block;">
            <!-- <div style="margin-top: 8px; display: inline-block;">上传最多4个图片</div> -->
        </Upload>
        <Tooltip>
            <template #title>
                公开的动态可以被社区内所有的人看到。若不希望请关闭此选项！
            </template>
            这个动态是公开的
        </Tooltip>
        <Switch v-model:checked="submitPublicPost"/>
    </Drawer>
</template>