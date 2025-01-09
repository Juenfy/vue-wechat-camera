<script setup>
import {WechatCamera} from "vue-wechat-camera"
import "vue-wechat-camera/dist/vue-wechat-camera.css"
import {onMounted, ref} from "vue"

const openCamera = ref(false)

const cameraCb = (e) => {
  console.log("cameraCb", e)
}
onMounted(() => {
})
</script>

<template>
  <button type="button" @click="openCamera = true">打开相机</button>
  <wechat-camera :open="openCamera" @close="openCamera = false" @cameraCb="cameraCb" :picture="{btn:'确定'}"></wechat-camera>
</template>

<style scoped>
</style>
