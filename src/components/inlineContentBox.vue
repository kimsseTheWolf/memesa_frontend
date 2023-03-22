<style>
.inline-content-box{
    margin: 5px;
    padding: 5px;
    width: 100px;
    height: fit-content;
    margin-top: 0px;
    padding: 5px;
    border-radius: 5px;
    background-color: rgba(0,0,0,0);
    color: black;
    cursor: pointer;
    text-align: center;
    display: inline-block;
}
.inline-content-box:hover{
    background-color: rgba(0, 0, 0, 0.219);
}
</style>
<template>
    <div class="inline-content-box">
        <img v-if="icon == 'contact'" src="@/assets/email.svg" :width="22">
        <img v-if="icon == 'settings'" src="@/assets/settings.png" :width="22">
        <img v-if="icon == 'user'" src="@/assets/user.svg" :width="22">
        <br>
        {{ content }}
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
defineProps(['content', 'icon'])
</script>