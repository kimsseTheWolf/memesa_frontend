<script setup>
import { Button, Result, Drawer, Input, Textarea, Upload, Switch, Tooltip, message } from 'ant-design-vue';
import { ref } from 'vue';
import moments from '@/js/moments'
import MomentsBox from '@/components/MomentsBox.vue';

const uploadDrawerVisible = ref(false)
const submitPublicPost = ref(true)
const fileList = ref([])
const momentsList = ref([])
const content = ref("")


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

async function uploadMoments(){
    let result = await moments.uploadMoment(fileList.value)
    console.log("Executed after the result was received", result.data)
    if (!result.status){
        message.error("上传失败（图片上传错误）")
        return
    }
    else {
        // convert
        console.log("[IMPORTANT] Processed the sending value")
        await setTimeout(() => {
            for (let i = 0; i < 4 ; i++){
                result.data.push("0")
            }
        }, 5000)
    }
    console.log("Processed List", result.data)
    let isPublic = 0
    if (submitPublicPost.value){
        isPublic = 1
    }
    else {
        isPublic = 0
    }
    let uploadResult = await moments.uploadMomentToDatabase(content.value, result.data, isPublic)
    if (!uploadResult){
        message.error("上传失败")
        return
    }
    message.success("上传成功")
    getUserMomentsInfo()
}

function getUserMomentsInfo(){
    let userMoments = moments.getUserMoments("self")
    console.log(userMoments.data.data.Data)
    momentsList.value = userMoments.data.data.Data
}

setTimeout(() => {
    getUserMomentsInfo()
}, 500);

</script>
<template>
    <Button type="primary" style="margin-top: 5px;" @click="uploadDrawerVisible = !uploadDrawerVisible">发布新动态</Button>
    <Result title="你还没有发布过动态" sub-title="点击左上方发布按钮发布你的第一个动态吧！" v-if="momentsList.length == 0"/>
    <Drawer title="发布新动态" placement="top" :visible="uploadDrawerVisible" @close="uploadDrawerVisible = !uploadDrawerVisible" height="600px" :rows="6">
        <template #extra>
            <Button type="primary" @click="uploadMoments()">发布</Button>
            <Button @click="uploadDrawerVisible = false">取消</Button>
        </template>
        <h2>发布新动态</h2>
        完成后点击右上角发布即可
        <Textarea :bordered="false" placeholder="说些什么吧" style="margin-top: 5px;" v-model:value="content"></Textarea>
        <input type="file" accept="image/*" @change="getPicture($event)">
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
    <div class="main_moments_box">
        <div v-for="i in momentsList" :key="i">
            <MomentsBox :username="i.userid" :image_url="[i.img1, i.img2, i.img3, i.img4]" :isLiked="false" :uuid="i.uid" :id="i.userid">
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