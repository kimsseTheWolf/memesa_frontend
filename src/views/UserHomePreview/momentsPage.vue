<script setup>
import { Empty } from 'ant-design-vue';
import momentsGeneralVue from '../moments/momentsGeneral.vue';
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';

const route = useRoute()
const targetUserId = computed(()=>{
    return route.params.id
})
</script>
<template>
    <momentsGeneralVue :targetMode="targetUserId" :enablePrivate="true"/>
</template>