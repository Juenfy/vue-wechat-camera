基于vue3仿微信相机
=======================

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]

<p align="center" style="display: flex">
    <a href="https://camera.juenfy.cn"><img width="40%" src="https://raw.githubusercontent.com/Juenfy/resources/refs/heads/master/camera/preview01.jpg"></a>
    <a href="https://camera.juenfy.cn"><img width="40%" src="https://raw.githubusercontent.com/Juenfy/resources/refs/heads/master/camera/preview02.jpg"></a>
</p>

1.支持拍照、涂鸦、贴图.<br/>
2.支持录视频

## Demo
### 如何运行demo?
```shell
git clone https://github.com/Juenfy/vue-wechat-camera.git
cd vue-wechat-camera
npm install
npm link
cd demo
npm install
npm link vue-wechat-camera
npm run dev
```

## 快速开始
### 如何安装?
```shell
npm i vue-wechat-camera
```

### 如何使用?

```vue
//导入
import {WechatCamera} from "vue-wechat-camera"
import "vue-wechat-camera/dist/vue-wechat-camera.css"
import {onMounted, ref} from "vue"

const openCamera = ref(false)

const cameraCb = (e) => {
    console.log("cameraCb", e.file.name, e.file.size, e.file.type)
}
<!-- template -->
<button type="button" @click="openCamera = true">打开相机</button>
<wechat-camera :open="openCamera" @close="openCamera = false" @cameraCb="cameraCb" :picture="{btn:'确定'}"></wechat-camera>
```

## API 参考

### 初始化

| Props参数                       | 描述            |                             默认                              |
|-------------------------------|---------------|:-----------------------------------------------------------:|
| <b>open</b>: <i>Boolean</i>   | 打开相机          |                           `false`                           |
| <b>picture</b>: <i>Object</i> | 拍完照后预览图片的配置   |                        `{btn:"确定"}`                         |
| <b>video</b>: <i>Object</i>   | 录视频后预览视频的配置   |                        `{btn:"确定"}`                         |

| Events事件            | 描述                 |                            回调参数                            |
|---------------------|--------------------|:----------------------------------------------------------:|
| <b>cameraCb</b>       | 预览图片、视频点确定后回调      | `{type:"picture",file:File}` or `{type:"video",file:File}` |

[npm-img]: https://img.shields.io/npm/v/vue-wechat-camera
[npm-url]: https://npmjs.org/package/vue-wechat-camera
[build-size-img]: https://img.shields.io/bundlephobia/minzip/vue-wechat-camera
[build-size-url]: https://bundlephobia.com/result?p=vue-wechat-camera
[npm-downloads-img]: https://img.shields.io/npm/dt/vue-wechat-camera
[npm-downloads-url]: https://www.npmtrends.com/vue-wechat-camera