import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import { visualizer } from "rollup-plugin-visualizer";
import svgLoader from "vite-svg-loader";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "node:path";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [
            vue(),
            svgLoader(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), "src/assets/img/icons")],
                symbolId: "icon-[name]",
            }),
            legacy({ targets: ["defaults", "not IE 11"] }),
            visualizer({ filename: "dist/stats.html", open: false }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        // 样式
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    // 全局注入（变量、mixin 等）
                    additionalData: `
                        @import "@/assets/css/var.less";
                        @import "@/assets/css/mixin.less";
                        @import "csslab/base.less";
                    `,
                },
            },
        },
        // 代理
        server: {
            // 允许局域网设备访问（手机可扫 IP 访问）
            host: true,
            port: 65073,
            strictPort: true,
            open: false,
            // proxy: {
            //     // 本地开发接口代理示例
            //     '/api': {
            //         target: env.VITE_API_BASE, // 从 .env* 读取
            //         changeOrigin: true,
            //         rewrite: p => p.replace(/^\/api/, ''),
            //     },
            // },
        },
        base: env.VITE_APP_BASE || "/",
        // 构建
        build: {
            sourcemap: mode !== "production",
            outDir: "dist",
            rollupOptions: {
                // 💠 多页面
                input: {
                    app: path.resolve(__dirname, "index.html"),
                    pc: path.resolve(__dirname, "pc.html"),
                    m: path.resolve(__dirname, "m.html"),
                },
                // 💠 分包
                output: {
                    manualChunks: {
                        "vendor-vue": ["vue", "vue-router", "pinia", "vuex"],
                        "vendor-ui-mobile": ["vant"],
                        "vendor-ui-pc": ["element-plus"],
                        "vendor-lang": ["vue-i18n", "flag-icons", "i18n-iso-countries", "libphonenumber-js"],
                        "vendor-utils": ["axios", "dayjs", "mitt"],
                    },
                },
            },
            chunkSizeWarningLimit: 3000, // 单文件超过 3MB 警告
        },
        esbuild: {
            drop: mode === "production" ? ["debugger"] : [],
            pure: mode === "production" ? ["console.log"] : [],
        },
    };
});
