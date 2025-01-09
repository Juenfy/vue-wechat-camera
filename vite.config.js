import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: "./src/index.js",          // 指定入口文件
            name: "VueWechatCamera",           // 库的全局名称
            fileName: (format) => `vue-wechat-camera.${format}.js`,
            cssFileName: (format) => `vue-wechat-camera.${format}.css`
        },
        rollupOptions: {
            external: ["vue"],               // Vue 不打包
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        }
    }
});
