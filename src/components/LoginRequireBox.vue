<script setup>
import { Button } from 'ant-design-vue';

</script>
<template>
    <div class="static-warning-block">
        <div class="static-warning-block-title">{{ $t('LoginRequireBox.title') }}</div>
        <div class="static-warning-block-content">
            {{$t('LoginRequireBox.description')}}
        </div>
        <RouterLink to="/login">
            <Button type="primary">{{$t('LoginRequireBox.login')}}</Button>
        </RouterLink>
        {{$t('LoginRequireBox.middleword')}}
        <RouterLink to="/register">
            <Button>{{$t('LoginRequireBox.register')}}</Button>
        </RouterLink>
    </div>
</template>