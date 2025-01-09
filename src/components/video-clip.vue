<script setup>
import {ref, watch} from "vue";
import {videoTool} from "../utils/tool";

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  data: {
    type: [Blob, String],
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  config: {
    type: Object,
    required: true
  }
})
defineEmits(["close", "sendCb"])
let tool = new videoTool()

watch(() => props.data, (val) => {
  if (val) {
    tool = new videoTool()
    tool.init(props.width, props.height, val)
  } else {
    tool = new videoTool()
  }
})
</script>

<template>
  <div :class="'video-clip popup'+(props.open ? ' popup-active' : '')">
    <div class="container" id="video-container">
      <div class="header" id="video-header">
        <div class="left">
          <img src="../assets/back-o.png" alt="back-o"
               @click="$emit('close')"/>
        </div>
      </div>
      <div class="body" id="video-body">
        <video autoplay muted playsinline id="video-player">
          <source :src="props.src" type="video/webm"/>
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="footer" id="video-footer">
        <div class="grid video-grid-tab">
          <button type="button" class="btn btn-primary" @click="$emit('sendCb',{type:'video', data:tool.result()})">
            {{ props.config.btn }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>