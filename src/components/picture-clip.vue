<script setup>
import {watch} from "vue"
import {picTool} from "../utils/tool";

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  data: {
    type: String,
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
  config:{
    type: Object,
    required: true
  }
})
defineEmits(["close", "sendCb"])
let tool = new picTool()

watch(() => props.data, (val) => {
  if (val) {
    tool = new picTool()
    tool.init(props.width, props.height, val)
  } else {
    tool.clear()
    tool = new picTool()
  }
})
</script>

<template>
  <div :class="'picture-clip popup'+(props.open ? ' popup-active' : '')">
    <div class="container" id="picture-container">
      <div class="header" id="picture-header">
        <div class="left">
          <span class="span-text" @click="$emit('close')">取消</span>
        </div>
        <div class="right">
          <img src="../assets/back.png" alt="back" id="history-back" @click="tool.goHistory(-1)">
          <img src="../assets/back.png" alt="back-reserve" style="transform: scaleX(-1)" @click="tool.goHistory(1)"
               id="history-forward">
        </div>
      </div>
      <div class="body" id="picture-body">
        <canvas class="canvas" id="picture-canvas"></canvas>
      </div>
      <div class="footer" id="picture-footer">
        <div class="grid pic-grid-tab" v-for="tab in tool.getTabList()" :key="tab.name"
             @click="tool.toggleTarget(tool.getTool(tab.name))">
          <img :src="tab.icon" :alt="tab.name"
               v-if="!tab?.activeIcon || (tab?.activeIcon && tool.getTool().id !== 'pen-tool')">
          <img :src="tab?.activeIcon" :alt="tab.name+'-active'" v-else>
        </div>
        <div class="grid pic-grid-tab">
          <button type="button" class="btn btn-primary" @click="$emit('sendCb',{type:'picture', data:tool.result(props.config.mime)})">
            {{ props.config.btn }}
          </button>
        </div>
        <div class="tool" id="pen-tool">
          <div class="pen-tool">
            <div class="color-tool">
              <div class="icon">
                <img src="../assets/xpc.png" alt="xpc" class="icon-btn pen-icon-btn">
                <div>|</div>
              </div>
              <div class="color">
                <div></div>
                <div :class="'circle-border-btn color-btn pen-color-btn' + (key === 0 ? ' tool-btn-active':'')"
                     v-for="(color,key) in tool.getColorList()" :key="key"
                     :style="'--before-color:'+color.value" :data-color="color.value">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tool" id="emoji-tool">
          <div class="emoji-tool">
            <div class="tab">
              <div class="item" @click="tool.toggleTarget(tool.getTool('emoji'))">
                <img src="../assets/arrow.png" alt="arrow">
              </div>
              <div :class="'item emoji-tab-item ' + (tool.getTool('emoji').activeTabId === tab.id ? 'active' : '')"
                   v-for="tab in tool.getTool('emoji').tab"
                   :key="tab.id" @click="tool.activeEmoji(tab.id)">
                <img :src="tab.path" :alt="tab.id">
              </div>

            </div>
            <div class="active-emoji">
              <div class="item" v-for="emoji in tool.getTool('emoji').activeEmoji" :key="emoji.name"
                   @click="tool.addCanvas(emoji.path)">
                <img :src="emoji.path"
                     :alt="emoji.name">
                <span>{{ emoji.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tool" id="text-tool">
          <div class="text-tool">
            <div class="nav">
              <span class="span-text" @click="tool.toggleTarget(tool.getTool('text'))">取消</span>
              <button type="button" class="btn btn-primary" @click="tool.addCanvas()">完成</button>
            </div>
            <textarea :style="'color:' + tool.getTool('text').color.active" id="pic-textarea"></textarea>
            <div class="color-tool">
              <div class="icon">
                <img src="../assets/text.png" alt="text" class="icon-btn icon-btn-large text-icon-btn">
                <div>|</div>
              </div>
              <div class="color">
                <div></div>
                <div
                    :class="'circle-border-btn color-btn color-btn-large text-color-btn' + (key === 0 ? ' tool-btn-active':'')"
                    v-for="(color,key) in tool.getColorList()" :key="key"
                    :style="'--before-color:'+color.value" :data-color="color.value">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>