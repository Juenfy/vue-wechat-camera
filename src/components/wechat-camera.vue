<script setup>
import {onBeforeUnmount, onMounted, ref, watch} from "vue"
import VideoClip from "./video-clip.vue"
import PictureClip from "./picture-clip.vue"
import {durationFormat} from "../utils/helper"

const props = defineProps({
  open: {type: Boolean, default: false},
  picture: {
    type: Object,
    default: {
      btn: "确定"
    }
  },
  video: {
    type: Object,
    default: {
      btn: "确定"
    }
  }
})

const emit = defineEmits(["close", "cameraCb"])
const stream = ref(null)
const openPicClip = ref(false)
const openVideoClip = ref(false)
const canvas = ref(null)
const ctx = ref(null)
const bodyRef = ref(null)
const tipsRef = ref(null)
const width = ref(0)
const height = ref(0)
const videoRef = ref(null)
const videoSrc = ref("")
const picSrc = ref("")
const constraints = ref({})
const controlBtn = ref({
  torch: false,
  facingMode: false
})
const cameraBtnRef = ref(null)
const supportTorch = ref({}) // 闪光灯支持情况
const supportFacingMode = ref([]) // 前后置摄像头支持情况
const recordDuration = ref(0) // 录制时长
const durationInterval = ref(null) // 时长计算
const mediaRecorder = ref(null) // 用于录制视频
const recordedChunks = ref([]) // 存储录制的视频数据
const pressTimer = ref(null) // 定时器
const longPressThreshold = 500 // 长按阈值（毫秒）
const isLongPress = ref(false) // 是否长按
// const circleProcess = ref({
//   size: 64,
//   progress: 0,
//   interval: 0,
//   strokeWidth: 4,
//   duration: 60000
// })
const startCamera = () => {
  width.value = document.body.clientWidth
  height.value = bodyRef.value.clientHeight
  console.log(constraints.value)
  if (supportFacingMode.value.length <= 0) {
    console.error("获取摄像头失败")
    alert("获取摄像头失败")
    return stopCamera(true)
  }
  ctx.value = canvas.value.getContext("2d")
  if (!constraints.value?.video) {
    constraints.value.video = {
      facingMode: supportFacingMode.value[0],
      frameRate: {ideal: 60}, // 设置帧率
      focusMode: 'continuous' // 尝试启用连续对焦
    }
  }
  navigator.mediaDevices.getUserMedia(constraints.value).then(s => {
    stream.value = s
    videoRef.value.srcObject = stream.value
    // 额外的绑定处理，确保在所有浏览器中正常工作
    videoRef.value.onloadedmetadata = () => {
      videoRef.value.play()
    }
    console.log("打开摄像头成功")
    tipsRef.value.style.display = "block"
    setTimeout(() => {
      tipsRef.value.style.display = "none"
    }, 3000)
  }).catch(error => {
    console.error("打开摄像头失败:" + error)
    alert("打开摄像头失败:" + error)
    emit("close")
  })
}

// const circleProcessFun = {
//   radius() {
//     return (circleProcess.value.size - circleProcess.value.strokeWidth) / 2
//   },
//   circumference() {
//     return 2 * Math.PI * this.radius
//   },
//   dashOffset() {
//     return this.circumference - (circleProcess.value.progress / 100) * this.circumference
//   }
// }

const stopCamera = (close = false) => {
  if (close) emit("close")
  if (stream.value) {
    stream.value.getTracks().forEach((track) => {
      track.stop()
    })
  }
}

const switchCamera = () => {
  constraints.value.video.facingMode = constraints.value.video.facingMode === "user" ? "environment" : "user"
  stopCamera()
  startCamera()
}

// 拍照
const takePhoto = (event) => {
  console.log("点击拍照")
  event.stopPropagation()
  const track = stream.value.getVideoTracks()[0]
  const capabilities = track.getCapabilities()
  flashLight(true, track, capabilities)
  canvas.value.width = width.value
  canvas.value.height = height.value
  ctx.value.drawImage(
      videoRef.value,
      0,
      0,
      canvas.value.width,
      canvas.value.height
  )
  picSrc.value = canvas.value.toDataURL("image/jpeg")
  openPicClip.value = true
  // stopCamera()
  flashLight(false, track, capabilities)
}

// 录视频
const startRecording = (event) => {
  console.log("长按录制")
  recordDuration.value = 0
  event.stopPropagation()
  const track = stream.value.getVideoTracks()[0]
  const capabilities = track.getCapabilities()
  flashLight(true, track, capabilities)
  // 初始化 MediaRecorder
  mediaRecorder.value = new MediaRecorder(stream.value)
  // 当有数据可用时，将其存储到 recordedChunks
  mediaRecorder.value.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.value.push(event.data)
    }
  }
  // 当录制停止时，生成视频文件
  mediaRecorder.value.onstop = () => {
    const track = stream.value.getVideoTracks()[0]
    const capabilities = track.getCapabilities()
    const blob = new Blob(recordedChunks.value, {type: 'video/webm'})
    openVideoClip.value = true
    videoSrc.value = URL.createObjectURL(blob)
    flashLight(false, track, capabilities)
    // stopCamera()
    // 清理数据
    recordedChunks.value = []
  }
  // 开始录制
  mediaRecorder.value.start()

  // 录制计时
  tipsRef.value.style.display = "block"
  durationInterval.value = setInterval(() => {
    // 最多录制60秒
    if (recordDuration.value < 5) {
      recordDuration.value += 1
    } else {
      stopRecording()
    }
  }, 1000)


  // 按钮环形进度条
  // circleProcess.value.progress = 0
  // const step = 100 / (circleProcess.value.duration / 100) // 每 100ms 更新一次进度
  // circleProcess.value.interval = setInterval(() => {
  //   circleProcess.value.progress += step
  //   if (circleProcess.value.progress >= 100) {
  //     stopRecording()
  //   }
  // }, 100)
}

const flashLight = (open = true, track, capabilities) => {
  if (controlBtn.value.torch && capabilities?.torch) {
    track.applyConstraints({
      advanced: [{torch: open}]
    })
  }
}

const stopRecording = () => {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop()
  }
  isLongPress.value = false
  // if (circleProcess.value.interval) {
  //   clearInterval(circleProcess.value.interval)
  // }
  if (durationInterval.value) {
    clearInterval(durationInterval.value)
  }
  tipsRef.value.style.display = "none"
}

const goBack = (type) => {
  if (type === "picture") {
    openPicClip.value = false
    picSrc.value = ""
  } else {
    openVideoClip.value = false
    videoSrc.value = ""
  }
  // startCamera()
}

const checkDevice = () => {
  navigator.mediaDevices.enumerateDevices().then(devices => {
    devices.forEach(v => {
      // 是否支持麦克风
      if (v.kind === "audioinput") {
        constraints.value.audio = {
          sampleRate: 44100,
          sampleSize: 16,
          channelCount: 2,
          echoCancellation: true,      // 启用回声消除
          noiseSuppression: true,      // 启用噪声抑制
          autoGainControl: true        // 启用自动增益控制
        }
      }
    })

    // 判断是否支持前后置摄像头
    navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}}).then(s => {
      stream.value = s
      supportFacingMode.value.push("environment")
      console.log("支持后置摄像头")
      const track = stream.value.getVideoTracks()[0]
      const capabilities = track.getCapabilities()
      if (capabilities.torch) {
        console.log('后置摄像头支持闪光灯')
        supportTorch.value.environment = true
      }
    }).catch(error => {
      console.error("打开后置摄像头失败:" + error)
    }).finally(() => {
      stopCamera()
    })
    navigator.mediaDevices.getUserMedia({video: {facingMode: "user"}}).then(s => {
      stream.value = s
      supportFacingMode.value.push("user")
      console.log("支持前置摄像头")
      const track = stream.value.getVideoTracks()[0]
      const capabilities = track.getCapabilities()
      if (capabilities.torch) {
        console.log('前置摄像头支持闪光灯')
        supportTorch.value.user = true
      }
    }).catch(error => {
      console.error("打开前置摄像头失败:" + error)
    }).finally(() => {
      stopCamera()
    })
  }).catch(error => {
    console.error("获取设备列表失败:", error)
    alert("获取设备列表失败:" + error)
    stopCamera(true)
  })
}

watch(() => props.open, () => {
  startCamera()
})

onBeforeUnmount(() => {
  stopCamera(true)
})

onMounted(() => {
  checkDevice()
  cameraBtnRef.value.addEventListener("mousedown", (e) => {
    pressTimer.value = setTimeout(() => {
      isLongPress.value = true
      startRecording(e)
    }, longPressThreshold)
  })
  cameraBtnRef.value.addEventListener('mouseup', (e) => {
    clearTimeout(pressTimer.value) // 清除定时器
    if (!isLongPress.value) {
      takePhoto(e)
    } else {
      stopRecording()
    }
  })

  cameraBtnRef.value.addEventListener('touchstart', (e) => {
    pressTimer.value = setTimeout(() => {
      isLongPress.value = true
      startRecording(e)
    }, longPressThreshold)
  })

  cameraBtnRef.value.addEventListener('touchend', (e) => {
    clearTimeout(pressTimer.value) // 清除定时器
    if (isLongPress.value) {
      stopRecording()
    }
  })
})
</script>

<template>
  <div>
    <div :class="'camera popup'+(props.open ? ' popup-active' : '')">
      <div class="container">
        <div class="header">
          <div class="left">
            <img src="../assets/close.png" alt="close" @click="stopCamera(true)"/>
          </div>
        </div>
        <div class="body" ref="bodyRef">
          <video autoplay playsinline ref="videoRef" muted></video>
          <canvas ref="canvas" style="display: none"></canvas>
          <span class="tips"
                ref="tipsRef">
          {{ isLongPress ? durationFormat(recordDuration) : '轻触拍照，按住摄像' }}
        </span>
        </div>
        <div class="footer">
          <div class="grid" @click="controlBtn.torch = !controlBtn.torch">
            <img src="../assets/torch.png" alt="torch" v-if="controlBtn.torch">
            <img src="../assets/torch-close.png" alt="torch-close" v-else>
          </div>
          <div class="grid">
            <div class="circle-border-btn camera-btn" ref="cameraBtnRef"
                 :style="'--cb-color:'+(isLongPress ? '#f56c6c' : '#ffffff')">
              <!--              <svg :width="circleProcess.size" :height="circleProcess.size"-->
              <!--                   style="position:absolute;left: 0;top: 0;z-index: 2;"-->
              <!--              >-->
              <!--                <circle :r="circleProcessFun.radius()" fill="none" :stroke-width="circleProcess.strokeWidth"-->
              <!--                        :cx="circleProcessFun.radius()"-->
              <!--                        :cy="circleProcessFun.radius()"-->
              <!--                        stroke="green"></circle>-->
              <!--              </svg>-->
            </div>

          </div>
          <div class="grid" v-if="supportFacingMode.length === 2" @click="switchCamera">
            <img src="../assets/switch.png" alt="switch">
          </div>
        </div>
      </div>
    </div>
    <picture-clip :open="openPicClip" @close="goBack('picture')" :src="picSrc" :width="width" :height="height"
                  @sendCb="(e) => emit('cameraCb',e)" :btn="props.picture.btn"/>
    <video-clip :open="openVideoClip" @close="goBack('video')" :src="videoSrc" :width="width" :height="height"
                @sendCb="(e) => emit('cameraCb',e)" :btn="props.picture.btn"/>
  </div>
</template>

<style lang="scss">
@import "../assets/common";
@import "../assets/style";
</style>