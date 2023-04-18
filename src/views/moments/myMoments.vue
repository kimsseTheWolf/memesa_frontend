<script setup>
import { Button, Result, Drawer, Input, Textarea, Upload, Switch, Tooltip, message } from 'ant-design-vue';
import { ref, computed } from 'vue';
import moments from '@/js/moments'
import MomentsBox from '@/components/MomentsBox.vue';

const uploadDrawerVisible = ref(false)
const submitPublicPost = ref(true)
const fileList = ref([])
const momentsList = ref([])
const content = ref("")
const momentIsUploading = ref(false)
const showNoMoments = computed(()=>{
    if (momentsList.value == null){
        return true
    }
    else if (momentsList.value.length == 0){
        return true
    }
    else{
        return false
    }
})

function triggerUploadDrawer(){
    uploadDrawerVisible.value = !uploadDrawerVisible.value
    console.log("Triggered to open d")
    console.log(uploadDrawerVisible.value)
}

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

async function processResultList(list){
    // if (list.length < 4 && list.length != 0){
    //     for (let i = 0; i < 4 ; i++){
    //         list.push("0")
    //     }
    //     return list
    // }
    // else{
    //     let targetResult = await processResultList(list)
    //     return targetResult
    // }
    setTimeout(() => {

    })
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
getUserMomentsInfo()
</script>
<template>
    <RouterLink to="/moment/send">
        <Button type="primary" style="margin-top: 5px;" @click="triggerUploadDrawer()">{{$t('MyMoments.sendNewMoments')}}</Button>
    </RouterLink>
    <Result :title="$t('MyMoments.emptyResult.title')" :sub-title="$t('MyMoments.emptyResult.subTitle')" v-if="showNoMoments"/>
    <div class="main_moments_box">
        <div v-for="i in momentsList" :key="i">
            <MomentsBox :username="i.userid" :image_url="[i.img1, i.img2, i.img3, i.img4]" :isLiked="false" :uuid="i.uid" :id="i.userid" @on-delete="getUserMomentsInfo()">
                <template #content>
                    {{i.content}}
                </template>
            </MomentsBox>
        </div>
    </div>
    
</template>
<style>
.main_moments_box{
    overflow-y: auto;
    height: 600px;
}
</style>