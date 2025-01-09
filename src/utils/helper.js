import penIcon from "../assets/pen.png"
import penActiveIcon from "../assets/pen-active.png"
import emojiIcon from "../assets/emoji.png"
import textIcon from "../assets/text.png"
import cropIcon from "../assets/crop.png"
import mosaicIcon from "../assets/mosaic.png"


const resourceUri = "https://raw.githubusercontent.com/Juenfy/resources/refs/heads/master/"

const colorList = [
    {
        label: "白色",
        value: "white"
    },
    {
        label: "黑色",
        value: "black"
    },
    {
        label: "红色",
        value: "red"
    },
    {
        label: "橙色",
        value: "orange"
    },
    {
        label: "黄色",
        value: "yellow"
    },
    {
        label: "绿色",
        value: "green"
    },
    {
        label: "蓝色",
        value: "blue"
    },
    {
        label: "粉色",
        value: "pink"
    },
    {
        label: "紫色",
        value: "purple"
    },
    {
        label: "棕色",
        value: "brown"
    },
    {
        label: "灰色",
        value: "grey"
    },
    {
        label: "天空蓝",
        value: "skyblue"
    }
]

const tabList = [
    {
        name: "pen",
        icon: penIcon,
        activeIcon: penActiveIcon
    },
    {
        name: "emoji",
        icon: emojiIcon
    },
    {
        name: "text",
        icon: textIcon
    },
    {
        name: "crop",
        icon: cropIcon
    },
    {
        name: "mosaic",
        icon: mosaicIcon
    }
]

const emojiJson = {
    kaixinmao: [{
        name: 'kaixinmao_1',
        ext: 'gif',
        default: true
    }, {
        name: 'kaixinmao_2',
        ext: 'gif',
        default: true
    }, {
        name: 'kaixinmao_3',
        ext: 'gif',
        default: true
    }, {
        name: 'kaixinmao_4',
        ext: 'gif',
        default: true
    }, {
        name: 'kaixinmao_5',
        ext: 'gif',
        default: true
    }, {
        name: 'kaixinmao_6',
        ext: 'gif',
        default: true
    },],
    qiuqiu: [{
        name: 'qiuqiu_1',
        ext: 'gif',
        default: true
    }, {
        name: 'qiuqiu_2',
        ext: 'gif',
        default: true
    }, {
        name: 'qiuqiu_3',
        ext: 'gif',
        default: true
    }, {
        name: 'qiuqiu_4',
        ext: 'gif',
        default: true
    }, {
        name: 'qiuqiu_5',
        ext: 'gif',
        default: true
    }, {
        name: 'qiuqiu_6',
        ext: 'gif',
        default: true
    }, {
        name: 'qiuqiu_7',
        ext: 'gif',
        default: true
    }, {
        name: 'qiuqiu_8',
        ext: 'gif',
        default: true
    },],
    Silvervale: [{
        name: 'Silvervale_1',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_2',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_3',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_4',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_5',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_6',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_7',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_8',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_9',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_10',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_11',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_12',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_13',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_14',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_15',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_16',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_17',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_18',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_19',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_20',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_21',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_22',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_23',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_24',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_25',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_26',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_27',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_28',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_29',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_30',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_31',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_32',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_33',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_34',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_35',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_36',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_37',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_38',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_39',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_40',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_41',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_42',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_43',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_44',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_45',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_46',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_47',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_48',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_49',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_50',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_51',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_52',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_53',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_54',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_55',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_56',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_57',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_58',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_59',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_60',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_61',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_62',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_63',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_64',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_65',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_66',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_67',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_68',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_69',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_70',
        ext: 'jpg',
        default: true
    }, {
        name: 'Silvervale_71',
        ext: 'gif',
        default: true
    }, {
        name: 'Silvervale_72',
        ext: 'gif',
        default: true
    },],
    znbqb: [{
        name: 'znbqb_1',
        ext: 'jpeg',
        default: true
    }, {
        name: 'znbqb_2',
        ext: 'png',
        default: true
    }, {
        name: 'znbqb_3',
        ext: 'png',
        default: true
    }, {
        name: 'znbqb_4',
        ext: 'png',
        default: true
    }, {
        name: 'znbqb_5',
        ext: 'png',
        default: true
    }, {
        name: 'znbqb_6',
        ext: 'jpeg',
        default: true
    }, {
        name: 'znbqb_7',
        ext: 'jpeg',
        default: true
    }, {
        name: 'znbqb_8',
        ext: 'jpeg',
        default: true
    }, {
        name: 'znbqb_9',
        ext: 'jpeg',
        default: true
    }, {
        name: 'znbqb_10',
        ext: 'jpeg',
        default: true
    }, {
        name: 'znbqb_11',
        ext: 'jpeg',
        default: true
    }, {
        name: 'znbqb_12',
        ext: 'jpeg',
        default: true
    }, {
        name: 'znbqb_13',
        ext: 'jpeg',
        default: true
    }, {
        name: 'znbqb_14',
        ext: 'png',
        default: true
    }, {
        name: 'znbqb_15',
        ext: 'png',
        default: true
    }, {
        name: 'znbqb_16',
        ext: 'png',
        default: true
    }, {
        name: 'znbqb_17',
        ext: 'png',
        default: true
    },],
    zongzimiao: [{
        name: 'zongzimiao_1',
        ext: 'gif',
        default: true
    }, {
        name: 'zongzimiao_2',
        ext: 'gif',
        default: true
    }, {
        name: 'zongzimiao_3',
        ext: 'gif',
        default: true
    }, {
        name: 'zongzimiao_4',
        ext: 'gif',
        default: true
    }, {
        name: 'zongzimiao_5',
        ext: 'gif',
        default: true
    }, {
        name: 'zongzimiao_6',
        ext: 'gif',
        default: true
    }, {
        name: 'zongzimiao_7',
        ext: 'gif',
        default: true
    }, {
        name: 'zongzimiao_8',
        ext: 'gif',
        default: true
    },],
}

const getEmoji = () => {
    let tab = [],
        json = {},
        activeTabId = 0,
        activeEmoji = []
    for (let key of Object.keys(emojiJson)) {
        if (!json[key]) json[key] = []
        emojiJson[key].forEach((item) => {
            if (item.hasOwnProperty("default"))
                delete item.default
            if (!item.hasOwnProperty("path")) {
                item.path = resourceUri + `emoji/${key}/${item.name}.${item.ext}`
            }
            json[key].push(item)
        })
    }
    for (let key of Object.keys(json)) {
        let tabItem = {}
        for (let item of json[key]) {
            if (item.ext.toLowerCase().indexOf('gif') === -1) {
                tabItem = {
                    id: key,
                    name: item.name,
                    ext: item.ext,
                    path: item.path
                }
                break
            }
        }
        if (!tabItem.hasOwnProperty('id')) {
            let item = json[key][0]
            tabItem = {
                id: key,
                name: item.name,
                ext: item.ext,
                path: item.path
            }
        }
        tab.push(tabItem)
    }
    if (tab.length > 0) {
        activeTabId = tab[0].id
        activeEmoji = json[activeTabId]
    }

    return [json, tab, activeTabId, activeEmoji]
}

const base64ToFile = (base64, fileName = "") => {
    const arr = base64.split(",")
    const mime = arr[0].match(/:(.*?);/)[1] // 提取 MIME 类型
    const bstr = atob(arr[1]) // 解码 Base64 数据
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    // 处理文件名
    if (fileName.trim().length <= 0) {
        fileName = Math.floor(Date.now() / 1000) + "." + mime.split('/')[1]
    }
    return new File([u8arr], fileName, { type: mime })
}

const getTwoFingerDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
}

const getTwoFingerAngle = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.atan2(dy, dx) * (180 / Math.PI)
}

const getTwoFingerCenter = (touches) => {
    return [
        (touches[0].clientX + touches[1].clientX) / 2,
        (touches[0].clientY + touches[1].clientY) / 2,
    ]
}

function zeroize(num) {
    return (String(num).length === 1 ? "0" : "") + num
}

const durationFormat = (duration) => {
    let h = Math.floor(duration / 3600)
    let m = Math.floor((duration - h * 3600) / 60)
    let s = duration - h * 3600 - m * 60
    return zeroize(h) + ":" + zeroize(m) + ":" + zeroize(s)
}

const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
    const words = text.split('') // 按字符分割
    let line = ''
    let lines = []

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n]
        const metrics = context.measureText(testLine)
        const testWidth = metrics.width

        if (testWidth > maxWidth && n > 0) {
            lines.push(line)
            line = words[n]
        } else {
            line = testLine
        }
    }
    lines.push(line)

    // 绘制文本并计算高度
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * lineHeight)
    })

    return lines.length * lineHeight
}
export {
    getEmoji,
    base64ToFile,
    getTwoFingerDistance,
    getTwoFingerAngle,
    getTwoFingerCenter,
    durationFormat,
    wrapText,
    colorList,
    tabList
}