<script setup>
import LoginInputBlock from '@/components/LoginInputBlock.vue';

// import { outlinedUser } from '@ant-design/icons-vue'
// let alreadyRefreshed = false

// function refreshPage(){
//     if (!alreadyRefreshed){
//         location.refreshPage()
//         alreadyRefreshed = true
//     }
// }

// refreshPage()
</script>
<template>

    <LoginInputBlock/>
    
</template>
<style>
.body{
    background-color: rgb(255, 228, 177);
}
.title{
    color: orange;
    font-weight: 600;
}
.login-dialog-box{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: fit-content;
    width: auto;
}
#login-input{
    width: 100%;
}

</style>