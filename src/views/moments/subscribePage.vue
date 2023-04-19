<script setup>
import { Result } from 'ant-design-vue';
import { ref } from 'vue';
import MomentsBox from '@/components/MomentsBox.vue';
import moments from '@/js/moments';
import subscriptions from '@/js/subscriptions';

const momentsList = ref([])
const startId = ref(0)

async function getSubscriptionMoments(){
    // get user subscription list first
    let userSubscriptionList = await subscriptions.getUserFollowingList(localStorage.getItem("MEMESA_ID"))
    console.log(userSubscriptionList)
    // append into the id list
    let userID = []
    for (let i = 0; i < userSubscriptionList.length; i++){
        userID.push(userSubscriptionList[i].targetUserId)
    }
    console.log(userID)
    // send the request and prepare for rendering
    let result = await moments.getUserSubscriptionMoments(userID, startId.value, 10)
    console.log("Gathered data: ")
    console.log(result)
    if (result.status == true){
        // get values and reallocate the start number
        for (let i = 0; i < result.data.resultList.length; i++){
            momentsList.value.push(result.data.resultList[i])
        }
        startId.value = result.data.endNum
    }
}

getSubscriptionMoments()
</script>
<template>
    <Result title="你好像还没有关注任何人呢……" sub-title="你关注的人的动态将会显示在这里。当然，你得要先关注人才会有……" v-if="momentsList.length == 0"></Result>
    <div v-for="i in momentsList" :key="i">
        <MomentsBox :username="i.userid" :image_url="[i.img1, i.img2, i.img3, i.img4]" :isLiked="false" :uuid="i.uid" :id="i.userid">
            <template #content>
                {{i.content}}
            </template>
        </MomentsBox>
    </div>
</template>