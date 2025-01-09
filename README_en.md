The cover wechat camera component for vue3
=======================

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![NPM Downloads][npm-downloads-img]][npm-downloads-url]

<p align="center" style="display: flex">
    <a href="https://camera.juenfy.cn"><img width="40%" src="https://raw.githubusercontent.com/Juenfy/resources/refs/heads/master/camera/preview01.jpg"></a>
    <a href="https://camera.juenfy.cn"><img width="40%" src="https://raw.githubusercontent.com/Juenfy/resources/refs/heads/master/camera/preview02.jpg"></a>
</p>

1.take photo support.<br/>
2.record video support

## Demo
### How to run the demo?
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

## Quick start
### How to install?
```shell
npm i vue-wechat-camera@latest
```

### How to use?

```vue
//import
import {WechatCamera} from "vue-wechat-camera"
import "vue-wechat-camera/dist/vue-wechat-camera.css"
import {onMounted, ref} from "vue"

const openCamera = ref(false)

const cameraCb = (e) => {
    console.log("cameraCb", e.file.name, e.file.size, e.file.type)
}
<!-- template -->
<button type="button" @click="openCamera = true">open camera</button>
<wechat-camera :open="openCamera" @close="openCamera = false" @cameraCb="cameraCb" :picture="{btn:'sure'}"></wechat-camera>
```

## API reference

### Initialisation

| Props                       | description                                             |            default            |
|-----------------------------|------------------------------------------------|:-----------------------------:|
| <b>open</b>: <i>Boolean</i> | open the camera                                |            `false`            |
| <b>picture</b>: <i>Object</i> | the config of preview picture after take photo | `{btn:"确定",mime:"image/png"}` |
| <b>video</b>: <i>Object</i> | the config of preview video after record video | `{btn:"确定",mime:"video/mp4"}` |

| Events            | description                  |                                                                           callback params                                                                            |
|-------------------|------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| <b>cameraCb</b>       | 预览图片、视频点确定后回调      | `{type:"picture",data:{original:{url:url,file:File},result:{url:url,file:File}}}` or `{type:"video",data:{original:{url:url,blob:Blob},result:{url:url,blob:Blob}}}` |

[npm-img]: https://img.shields.io/npm/v/vue-wechat-camera
[npm-url]: https://npmjs.org/package/vue-wechat-camera
[build-size-img]: https://img.shields.io/bundlephobia/minzip/vue-wechat-camera
[build-size-url]: https://bundlephobia.com/result?p=vue-wechat-camera
[npm-downloads-img]: https://img.shields.io/npm/dt/vue-wechat-camera
[npm-downloads-url]: https://www.npmtrends.com/vue-wechat-camera