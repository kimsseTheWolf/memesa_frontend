<script setup>
import { Button, Result, Drawer, Input, Textarea, Upload, Switch, Tooltip, message } from 'ant-design-vue';
import { ref, computed, defineProps } from 'vue';
import moments from '@/js/moments'
import MomentsBox from '@/components/MomentsBox.vue';

// If not sepcific any user then enter self, or other mode. Otherwise enter user's id
const props = defineProps(['targetMode', 'enablePrivate'])
const momentsList = ref([])
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

async function getUserMomentsInfo(){
    let userMoments = await moments.getUserMoments(props.targetMode)
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
    <div class="container" style="display:flex;justify-content: center;align-items: center;flex-direction: column;">
    <Result title="这里什么都没有哦" sub-title="可能这个人还没有上传过动态……" v-if="showNoMoments"/>
    <div class="static-warning-box">这里不会展示未公开的动态</div>
    <div class="main_moments_box" style="margin-top: 5px;">
        <div v-for="i in momentsList" :key="i">
            <MomentsBox :username="i.userid" :image_url="[i.img1, i.img2, i.img3, i.img4]" :isLiked="false" :uuid="i.uid" :id="i.userid" v-if="(enablePrivate == true && i.private == 1) || enablePrivate == false">
                <template #content>
                    {{i.content}}
                </template>
            </MomentsBox>
        </div>
    </div>
</div>
    
</template>
<style>
.main_moments_box{
    overflow-y: auto;
    height: 600px;
}
</style>