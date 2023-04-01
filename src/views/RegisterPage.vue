<script setup>
import RegisterInputBlock from '@/components/RegisterInputBlock.vue';

</script>
<template>

    <RegisterInputBlock/>
    
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