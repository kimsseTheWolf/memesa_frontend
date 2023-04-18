<script setup>
import { Textarea, Upload, Tooltip, Switch, Button, message } from 'ant-design-vue';
import { ref } from 'vue';
import moments from '@/js/moments';
const uploadDrawerVisible = ref(false)
const submitPublicPost = ref(true)
const fileList = ref([])
const momentsList = ref([])
const content = ref("")
const momentIsUploading = ref(false)

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

function getPicture(e){
    fileList.value.push(e.target.files[0])
}

async function listProcess(list){
    for (let i = 0; i < 4 ; i++){
        list.push("0")
    }
    return list
}

async function uploadMoments(){
    momentIsUploading.value = true
    message.info("请等待所有图片上传完成")
    let imageURLList = []
    for (let i = 0; i < fileList.value.length; i++){
        let result = await moments.uploadMomentImg(fileList.value[i])
        if (result.status != true){
            message.error("上传失败")
            return
        }
        imageURLList.push(result.data)
    }
    console.log("Uploaded URL List", imageURLList)
    // process the list
    let processedList = await listProcess(imageURLList)
    console.log("Processed URL List", processedList)
    // submit the list
    let result = await moments.uploadMomentToDatabase(content.value, processedList, 1)
    if (!result.status){
        message.error("发布失败")
    }
    else{
        message.success("发布成功")
    }
    momentIsUploading.value = false
    getUserMomentsInfo()
    return
}

async function getUserMomentsInfo(){
    let userMoments = await moments.getUserMoments("self")
    console.log(userMoments)
    if (userMoments.data.data.Data == null){
        console.log("Redistributed")
        momentsList.value = []
        console.log(momentsList.value.length)
    }
    momentsList.value = userMoments.data.data.Data
}
</script>
<template>
    <h2 style="margin-top: 15px;">
        发布新动态
    </h2>
    <Textarea :bordered="true" placeholder="说些什么吧" style="margin-top: 5px;" v-model:value="content"></Textarea>
    <input type="file" accept="image/*" @change="getPicture($event)" style="margin-top: 5px;">
    <Upload list-type="picture-card" :max-count="4" v-model:file-list="fileList" :before-upload="beforeUpload">
    </Upload>
    <Tooltip>
        <template #title>
            公开的动态可以被社区内所有的人看到。若不希望请关闭此选项！
        </template>
        这个动态是公开的
    </Tooltip>
    <Switch v-model:checked="submitPublicPost"/><br>
    <Button type="primary" @click="uploadMoments()" :loading="momentIsUploading">发布</Button>
    <Button @click="uploadDrawerVisible = false">取消</Button>
</template>