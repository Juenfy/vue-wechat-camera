import {ref} from "vue"
import {
    base64ToFile,
    colorList,
    getEmoji,
    getTwoFingerAngle,
    getTwoFingerCenter,
    getTwoFingerDistance,
    tabList,
    wrapText
} from "./helper"


class picTool {
    constructor() {
        this.canvas = null // 主画布
        this.ctx = null // 主画布ctx
        this.pictureData = null // 照片数据
        this.picture = null // 照片实例化类
        this.tool = ref({
            id: null,
            pen: {
                el: "",
                icon: {
                    type: "",
                    btnArr: []
                },
                color: {
                    list: colorList,
                    btnArr: [],
                    active: colorList[0].value
                },
            },
            emoji: {
                el: "",
                tab: [],
                activeTabId: "",
                json: {},
                activeEmoji: []
            },
            text: {
                el: "",
                icon: {
                    type: "",
                    btnArr: []
                },
                color: {
                    list: colorList,
                    btnArr: [],
                    active: colorList[0].value
                }
            }
        })

        this.params = {
            two: false, // 是否两指触摸
            x: 0, // 初始鼠标点击x轴位置
            y: 0,
            offsetX: 0,
            offsetY: 0,
            distance: 0, // 初始两指距离
            angle: 0, // 初始两指角度
            scale: 1, // 缩放比例,
            rotate: 0, // 旋转角度
            position: {x: 0, y: 0} // 控件位置
        }

        // 其他画布 像贴图、文本等
        this.otherCanvas = {
            list: [], // 控件画布
            selected: null, // 选中画布
            maxZIndex: 0 // 最大z-index
        }

        // 历史
        this.history = {
            list: [], // 画布历史变更 用来做撤销和前进的
            save: false, // 是否需要保存
            index: 0 // 画布当前变更的索引 对应list里的历史变更
        }
    }

    init(width, height, url) {
        this.initDom()
        this.initCanvas(width, height, url)
        this.initEmoji()
        this.initEvent()
    }

    initDom() {
        // 画布、布局dom
        this.canvas = document.getElementById("picture-canvas")// 主画布
        this.body = document.getElementById("picture-body")
        this.header = document.getElementById("picture-header")
        this.footer = document.getElementById("picture-footer")
        this.back = document.getElementById("history-back")
        this.forward = document.getElementById("history-forward")

        // 涂鸦笔dom
        this.tool.value.pen.el = document.getElementById("pen-tool")
        this.tool.value.pen.color.btnArr = Array.from(document.getElementsByClassName("pen-color-btn"))
        this.tool.value.pen.icon.btnArr = Array.from(document.getElementsByClassName("pen-icon-btn"))

        // 表情包dom
        this.tool.value.emoji.el = document.getElementById("emoji-tool")

        // 文本dom
        this.tool.value.text.el = document.getElementById("text-tool")
        this.tool.value.text.color.btnArr = Array.from(document.getElementsByClassName("text-color-btn"))

        // 底部选项
        this.tabArr = Array.from(document.getElementsByClassName("pic-grid-tab"))
    }

    initCanvas(width, height, url) {
        this.canvas.width = width
        this.canvas.height = height
        this.ctx = this.canvas.getContext("2d")
        this.picture = new Image()
        this.picture.onload = () => {
            console.log("初始化画布")
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // 清空画布
            this.ctx.drawImage(this.picture, 0, 0, this.canvas.width, this.canvas.height) // 绘制图片
            this.pictureData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height) // 保存图片数据
            this.history.list.push({type: "image-data", value: this.pictureData})
        }
        this.picture.src = url
    }

    initEvent() {
        const self = this
        this.body.addEventListener("mousedown", (e) => {
            // console.log("mousedown")
            self.onDown(e, self)
        })
        this.body.addEventListener("mousemove", (e) => {
            self.onMove(e, self)
        })
        this.body.addEventListener("mouseup", (e) => {
            self.onUp(e, self)
        })
        this.body.addEventListener("touchstart", (e) => {
            // console.log("touchstart")
            self.onDown(e, self)
        })
        this.body.addEventListener("touchmove", (e) => {
            self.onMove(e, self)
        })
        this.body.addEventListener("touchend", (e) => {
            self.onUp(e, self)
        })

        this.initPenEvent()
        this.initTextEvent()
    }

    initPenEvent() {
        this.tool.value.pen.color.btnArr.forEach(el => {
            el.addEventListener("click", (e) => {
                e.stopPropagation()
                this.tool.value.pen.icon.type = ""
                this.tool.value.pen.color.active = e.target.getAttribute("data-color")
                this.removeToolBtnActive(this.tool.value.pen.color.btnArr)
                this.removeToolBtnActive(this.tool.value.pen.icon.btnArr)
                this.addToolBtnActive(e.target)
            })
        })
        this.tool.value.pen.icon.btnArr.forEach(el => {
            el.addEventListener("click", (e) => {
                e.stopPropagation()
                this.tool.value.pen.color.active = ""
                this.tool.value.pen.icon.type = "eraser"
                this.removeToolBtnActive(this.tool.value.pen.icon.btnArr)
                this.removeToolBtnActive(this.tool.value.pen.color.btnArr)
                this.addToolBtnActive(e.target)
            })
        })
    }

    initEmoji() {
        [this.tool.value.emoji.json, this.tool.value.emoji.tab, this.tool.value.emoji.activeTabId, this.tool.value.emoji.activeEmoji] = getEmoji()
    }

    initTextEvent() {
        this.tool.value.text.color.btnArr.forEach(el => {
            el.addEventListener("click", (e) => {
                e.stopPropagation()
                this.tool.value.text.color.active = e.target.getAttribute("data-color")
                this.removeToolBtnActive(this.tool.value.text.color.btnArr)
                this.addToolBtnActive(e.target)
            })
        })
    }


    onDown(e, self) {
        // 初始化点击时的参数
        if (e.touches?.length >= 2) {
            [this.params.x, this.params.y] = getTwoFingerCenter(e.touches)
            this.params.distance = getTwoFingerDistance(e.touches)
            this.params.angle = getTwoFingerAngle(e.touches)
            e = e.touches[0]
        } else {
            if (e.touches?.length > 0) {
                e = e.touches[0]
            }
            this.params.x = e.clientX
            this.params.y = e.clientY
        }

        this.selectedCanvas(e)
    }

    onMove(e, self) {
        this.params.two = false
        this.params.scale = 1
        this.params.rotate = 0
        let newX, newY
        if (e.touches?.length >= 2) {
            [newX, newY] = getTwoFingerCenter(e.touches)
            const newDistance = getTwoFingerDistance(e.touches)
            const newAngle = getTwoFingerAngle(e.touches)
            this.params.scale = newDistance / this.params.distance
            this.params.rotate = newAngle - this.params.angle
            this.params.two = true
        } else {
            if (e.touches?.length > 0) {
                e = e.touches[0]
            }
            newX = e.clientX
            newY = e.clientY
        }
        // console.log(e.clientX, e.clientY)
        this.params.position.x = newX - this.params.offsetX
        this.params.position.y = newY - this.params.offsetY
        // console.log(this.params.position)
        this.updateCanvas()
        if (!self.tool.value.id) return
        // self.header.style.display = "none"
        // self.footer.style.display = "none"
        this.drawCanvas()
    }

    onUp(e, self) {
        if (e?.touches?.length > 0)
            e = e.touches[0]
        this.setCanvas(e)
        if (!self.tool.value.id) return

        switch (self.tool.value.id) {
            case "pen-tool":
                const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
                this.saveHistory("image-data", imageData)
                break
        }
    }

    drawCanvas() {
        const x = this.params.position.x + this.params.offsetX
        const y = this.params.position.y + this.params.offsetY
        this.ctx.lineCap = "round"
        this.ctx.lineJoin = "round"
        this.ctx.beginPath()
        this.ctx.moveTo(this.params.x, this.params.y)
        this.ctx.lineTo(x, y)

        if (this.tool.value.pen.color.active.length > 0) {
            // console.log("pen-tool:绘制模式", e)
            this.ctx.globalCompositeOperation = "source-over"
            this.ctx.strokeStyle = this.tool.value.pen.color.active
            this.ctx.lineWidth = 5
            this.ctx.stroke()
        }
        if (this.tool.value.pen.icon.type === "eraser") {
            // console.log("pen-tool:擦除模式", e)
            const radius = 15 // 擦除区域半径
            const sx = Math.max(0, x - radius)
            const sy = Math.max(0, y - radius)
            const sWidth = Math.min(radius * 2, this.canvas.width - sx)
            const sHeight = Math.min(radius * 2, this.canvas.height - sy)
            // 从背景图像数据中提取区域并重新绘制
            this.ctx.putImageData(this.pictureData, 0, 0, sx, sy, sWidth, sHeight)
        }
        this.history.save = true
        this.params.x = x
        this.params.y = y
    }

    addCanvas(src = "") {
        const canvasElement = document.createElement("canvas")
        const key = this.otherCanvas.maxZIndex + 2
        canvasElement.classList.add("canvas")
        canvasElement.classList.add("canvas-" + key)
        let x, y, w, h
        const ctx = canvasElement.getContext("2d")
        if (this.tool.value.id === "emoji-tool") {
            let img = new Image()
            img.crossOrigin = 'anonymous' // 外部图片启用 CORS
            img.src = src // 替换为你的图片路径
            img.onload = () => {
                let r1 = img.width / img.height
                let r2 = this.canvas.width / this.canvas.height
                w = img.width
                h = img.height
                if (r1 >= r2) {
                    // 用宽跟画布比较
                    if (img.width > this.canvas.width) {
                        w = this.canvas.width - 100
                        h = w / r1
                    }
                } else {
                    // 用高跟画布比较
                    if (img.height > this.canvas.height) {
                        h = this.canvas.height - 100
                        w = h * r1
                    }
                }
                x = Math.floor((this.canvas.width - w) / 2)
                y = Math.floor((this.canvas.height - h) / 2)
                // 设置画布宽高
                canvasElement.width = w
                canvasElement.height = h
                // 将画布居中到屏幕中央
                canvasElement.style.left = `${x}px`
                canvasElement.style.top = `${y}px`
                canvasElement.style.zIndex = `${key}`
                this.body.appendChild(canvasElement)
                const canvasItem = {
                    key: key,
                    el: canvasElement,
                    ctx: ctx,
                    scale: 1,
                    rotate: 0,
                    x: x,
                    y: y
                }
                if (key > this.otherCanvas.maxZIndex) this.otherCanvas.maxZIndex = key
                this.otherCanvas.list.push(canvasItem)
                this.history.save = true
                this.saveHistory("add-canvas", canvasItem)
                ctx.drawImage(img, 0, 0, w, h) // 绘制图片
                this.toggleTarget(this.tool.value.emoji)
            }
        } else {
            const el = document.getElementById('pic-textarea')
            const fontSize = 20
            const text = el.value
            const fontColor = this.tool.value.text.color.active
            const lineHeight = fontSize * 1.5

            ctx.font = `${fontSize}px Arial`
            ctx.fillStyle = fontColor

            // 动态计算画布宽度
            const padding = 10
            const textWidth = ctx.measureText(text).width + 2 * padding
            w = Math.min(textWidth, this.canvas.width - 2 * padding)

            // 绘制文本并动态调整画布高度
            const textHeight = wrapText(ctx, text, padding, padding + fontSize, w - 2 * padding, lineHeight)
            h = textHeight + 2 * padding // 动态调整高度

            x = (this.canvas.width - w) / 2
            y = (this.canvas.height - h) / 2

            // 设置画布宽高
            canvasElement.width = w
            canvasElement.height = h

            // 重新绘制文本以适应新高度
            ctx.clearRect(0, 0, w, h)
            ctx.font = `${fontSize}px Arial`
            ctx.fillStyle = fontColor
            wrapText(ctx, text, padding, padding + fontSize, w - 2 * padding, lineHeight)

            // 将画布居中到屏幕中央
            canvasElement.style.left = `${x}px`
            canvasElement.style.top = `${y}px`
            canvasElement.style.zIndex = `${key}`
            this.body.appendChild(canvasElement)
            const canvasItem = {
                key: key,
                el: canvasElement,
                ctx: ctx,
                scale: 1,
                rotate: 0,
                x: x,
                y: y
            }
            if (key > this.otherCanvas.maxZIndex) this.otherCanvas.maxZIndex = key
            this.otherCanvas.list.push(canvasItem)
            this.history.save = true
            this.saveHistory("add-canvas", canvasItem)
            this.toggleTarget(this.tool.value.text)
        }
    }

    selectedCanvas(e) {
        this.otherCanvas.list.forEach(canvasItem => {
            if (e.target.classList.contains("canvas-" + canvasItem.key)) {
                this.otherCanvas.selected = canvasItem
                this.otherCanvas.maxZIndex += 1
                this.params.offsetX = this.params.x - canvasItem.el.style.left.replace("px", "") * 1
                this.params.offsetY = this.params.y - canvasItem.el.style.top.replace("px", "") * 1
                canvasItem.el.style.zIndex = "" + this.otherCanvas.maxZIndex
                console.log("选中了canvas:", this.otherCanvas.selected, this.params)
            }
        })
    }

    updateCanvas() {
        if (this.otherCanvas.selected) {
            // 平移
            this.otherCanvas.selected.el.style.left = this.params.position.x + "px"
            this.otherCanvas.selected.el.style.top = this.params.position.y + "px"
            // 旋转、缩放
            if (this.params.two) {
                this.otherCanvas.list.forEach(canvasItem => {
                    if (canvasItem.key === this.otherCanvas.selected.key) {
                        let rotate, scale
                        // 有旋转角度才计算
                        if (this.params.rotate !== 0) {
                            rotate = this.params.rotate + canvasItem.rotate
                        } else {
                            rotate = canvasItem.rotate
                        }

                        // 缩放后宽度不能小于30
                        scale = this.params.scale * canvasItem.scale
                        if (canvasItem.el.width * scale < 30) {
                            scale = canvasItem.scale
                        }
                        this.otherCanvas.selected.el.style.transform = `scale(${scale}) rotate(${rotate}deg)`
                    }
                })
            }
        }
    }

    setCanvas() {
        if (this.otherCanvas.selected) {
            this.otherCanvas.list.forEach((canvasItem, index) => {
                if (canvasItem.key === this.otherCanvas.selected.key) {
                    this.otherCanvas.list[index].scale = this.params.scale * canvasItem.scale
                    this.otherCanvas.list[index].rotate = this.params.rotate + canvasItem.rotate
                    this.otherCanvas.list[index].x = this.params.position.x
                    this.otherCanvas.list[index].y = this.params.position.y
                    this.history.save = true
                    this.saveHistory("update-canvas", this.otherCanvas.list[index])
                    console.log("松开了canvas:", this.otherCanvas.list[index])
                }
            })
            this.otherCanvas.selected = null
        }
    }


    activeEmoji(tabId) {
        this.tool.value.emoji.activeTabId = tabId
        this.tool.value.emoji.activeEmoji = this.tool.value.emoji.json[this.tool.value.emoji.activeTabId]
        // console.log(this.tool.value.emoji)
    }

    removeToolBtnActive(colorBtnArr) {
        colorBtnArr.forEach(el => {
            el.classList.remove("tool-btn-active")
        })
    }

    addToolBtnActive(target) {
        target.classList.add("tool-btn-active")
    }

    toggleTarget(tool) {
        tool.el.classList.toggle("tool-active")
        if (tool.el.classList.contains("tool-active")) {
            Array.from(document.getElementsByClassName("tool")).forEach((el) => {
                el.classList.remove("tool-active")
            })
            this.header.style.display = "none"
            tool.el.classList.add("tool-active")
            this.tool.value.id = tool.el.getAttribute("id")
            if (["emoji-tool", "text-tool"].indexOf(this.tool.value.id) !== -1) {
                this.tabArr.forEach(el => {
                    el.style.display = "none"
                })
            }
        } else {
            this.header.style.display = "flex"
            this.tabArr.forEach(el => {
                el.style.display = "flex"
            })
            this.tool.value.id = null
        }
    }

    saveHistory(type, value) {
        if (this.history.save) {
            this.history.list.push({type: type, value: value})
            this.history.index += 1
            this.history.save = false
            console.log(this.history)
        }
    }

    goHistory(num) {
        this.forward.classList.add("disabled-event")
        this.back.classList.add("disabled-event")
        const index = this.history.index
        if (num > 0) {
            this.history.index += 1
        } else {
            this.history.index -= 1
        }
        if (this.history.list?.[this.history.index]) {
            const history = this.history.list[this.history.index]
            console.log("goHistory", history)
            switch (history.type) {
                case "image-data":
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                    this.ctx.putImageData(history.value, 0, 0)
                    break
                case "add-canvas":
                    if (index > this.history.index) {
                        this.body.removeChild(history.value.el)
                    } else {
                        this.body.appendChild(history.value.el)
                    }
                    break
                case "update-canvas":
                    const scale = history.value.scale
                    const rotate = history.value.rotate
                    history.value.el.style.left = history.value.x + "px"
                    history.value.el.style.top = history.value.y + "px"
                    history.value.el.style.transform = `scale(${scale}) rotate(${rotate}deg)`
                    break
            }
        } else {
            this.history.index = index
        }
        this.forward.classList.remove("disabled-event")
        this.back.classList.remove("disabled-event")
    }

    getColorList() {
        return colorList
    }

    getTabList() {
        return tabList
    }

    getTool(name = "") {
        return name.length > 0 && this.tool.value.hasOwnProperty(name) ? this.tool.value[name] : this.tool.value
    }

    toDataURL(mimeType = "image/jpeg") {
        const cva = document.createElement("canvas")
        const ctx = cva.getContext("2d")
        cva.width = this.canvas.width
        cva.height = this.canvas.height
        ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height)
        this.otherCanvas.list.forEach(canvasItem => {
            const canvas = canvasItem.el
            ctx.save()
            ctx.rotate(canvasItem.rotate)
            ctx.scale(canvasItem.scale, canvasItem.scale)
            ctx.drawImage(canvas, canvasItem.x, canvasItem.y)
            ctx.restore()
        })
        return cva.toDataURL(mimeType)
    }

    toFile(mimeType = "image/jpeg") {
        return base64ToFile(this.toDataURL(mimeType))
    }

    clear() {
        this.otherCanvas.list.forEach(canvasItem => {
            this.body.removeChild(canvasItem.el)
        })
    }
}

class videoTool {
    constructor() {
        this.player = null
    }

    init(width, height, url) {

        this.initDom()
        this.player.src = url
        this.player.width = width
        this.player.height = height
        this.player.play()
        this.player.onplay = (e) => {
            console.log("play", e)
        }
        this.player.onplaying = (e) => {
            console.log("playing", e)
        }
    }

    initDom() {
        this.player = document.getElementById("video-player")
        this.body = document.getElementById("video-body")
        this.header = document.getElementById("video-header")
        this.footer = document.getElementById("video-footer")
    }

    toFile() {
        return new File([this.player.src], "video.webm", {type: "video/webm"})
    }
}

export {
    picTool,
    videoTool
}