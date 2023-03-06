<script setup>
    // import { InputSearch } from 'ant-design-vue';
    import { Input } from 'ant-design-vue';
    import { Button } from 'ant-design-vue';
    import { Avatar } from 'ant-design-vue';
</script>
<template>
    <div class="header-box-bg">
        <div class="logo-display">
            <RouterLink to="/">
                <img src="../assets/logo.svg">
            </RouterLink>
        </div>
        <Button ghost>
            <img src="../assets/search.svg">
        </Button>
        <Input width="600px" id="search-input-box" placeholder="搜索meme，音乐，或者视频"/>
        <div class="right-align-box">
            <RouterLink to="/workManager" class="right-icons">
                <img id="clickable" src="../assets/ico_uploadManage.svg">
            </RouterLink>
            <RouterLink to="/personHomepage">
                <Avatar size="large" id="clickable">登录</Avatar>
            </RouterLink>
        </div>
    </div>
</template>
<style>
.header-box-bg{
    background-color: #FF9900;
    margin: 0px;
    margin-bottom: 5px;
    padding: 5px;
    width: 100%;
    height: fit-content;
    color: white;
    text-align: center;
    position: fixed;
    top: 0;
}
.logo-display{
    display: inline;
    margin: 5px;
    margin-top: 3px;
    width: fit-content;
    height: fit-content;
    position: absolute;
    left: 5px;
    top: 3px;
}
.search-box-limitator{
    width: 500px;
}
#search-input-box{
    width:500px;
    margin: 7px;
    background-color: rgba(255,255,255, 0.85);
}
.right-align-box{
    display: inline;
    margin: 5px;
    margin-top: 3px;
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 5px;
    right: 5px;
}
.right-icons{
    margin-right: 5px;
}
#clickable{
    cursor: pointer;
}
</style>