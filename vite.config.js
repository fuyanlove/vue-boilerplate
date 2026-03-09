import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// import legacy from "@vitejs/plugin-legacy";
import svgLoader from "vite-svg-loader";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";

import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const VITE_STATIC_URL = process.env.NODE_ENV == "production" ? env.VITE_STATIC_URL : "/";

    const config = {
        // 允许在客户端使用 import.meta.env.VUE_APP_*（兼容旧环境变量命名）
        envPrefix: ["VITE_", "VUE_APP_"],
        // 插件
        plugins: [
            vue(),
            svgLoader({
                svgo: false,
            }),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), "src/assets/img/icons")],
                symbolId: "icon-[name]",
            }),
            // legacy({ targets: ["defaults", "not IE 11"] }),
            createHtmlPlugin({
                inject: { data: {} },
            }),
            tailwindcss(),
        ],
        // 路径
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
            port: env.VITE_PORT || 16888,
            strictPort: true,
            open: false,
            proxy: (() => {
                const PROXY_ENVS = {
                    enable: "VUE_APP_PROXY_ENABLE",
                    prefix: "VUE_APP_PROXY_PREFIX",
                };

                const SERVICE_TARGETS = {
                    api: env.VITE_COMMON_API || env.VITE_API || env.VUE_APP_COMMON_API,
                    fsf: env.VITE_FSF_API || env.VITE_COMMON_API || env.VUE_APP_COMMON_API,
                    pay: env.VITE_PAY_API || env.VUE_APP_PAY_API,
                };

                const normalizeTarget = (value) => {
                    if (!value) return "";
                    const trimmed = value.trim();
                    if (/^https?:\/\//i.test(trimmed)) return trimmed;
                    return `https://${trimmed.replace(/^\/+/, "")}`;
                };

                const enabled = ["1", "true", "yes", "on"].includes(String(env[PROXY_ENVS.enable] || "").toLowerCase());
                if (!enabled) return {};

                const prefix = env[PROXY_ENVS.prefix] || "/__proxy";

                const mk = (serviceKey, target) => {
                    const normalized = normalizeTarget(target);
                    if (!normalized) return {};
                    return {
                        [`${prefix}/${serviceKey}`]: {
                            target: normalized,
                            changeOrigin: true,
                            secure: false,
                            cookieDomainRewrite: "",
                            rewrite: (p) => p.replace(new RegExp(`^${prefix}/${serviceKey}`), ""),
                        },
                    };
                };

                return Object.assign(
                    {},
                    mk("api", SERVICE_TARGETS.api),
                    mk("fsf", SERVICE_TARGETS.fsf),
                    mk("pay", SERVICE_TARGETS.pay)
                );
            })(),
        },
        // 清洁
        esbuild: {
            drop: mode === "production" ? ["debugger"] : [],
            pure: mode === "production" ? ["console.log"] : [],
            logOverride: { "css-syntax-error": "silent" },
        },
        // 构建
        base: VITE_STATIC_URL,
        build: {
            sourcemap: mode !== "production",
            outDir: "dist",
            rollupOptions: {
                // input : {
                //     main: path.resolve(__dirname, "index.html"),
                // },
                output: {
                    manualChunks: {
                        "vendor-vue": ["vue", "vue-router", "pinia", "vuex"],
                        "vendor-ui": ["element-plus", "vant"],
                        "vendor-lang": ["vue-i18n", "flag-icons", "i18n-iso-countries", "libphonenumber-js"],
                        "vendor-utils": ["axios", "dayjs", "mitt"],
                    },
                },
            },
            chunkSizeWarningLimit: 3000, // 单文件超过 3MB 警告
            assetsInlineLimit: 4096,
        },
    };

    // 插件
    if (process.env.ANALYZE === "true") {
        config.plugins.push(
            visualizer({
                filename: "dist/stats.html",
                template: "treemap",
                gzipSize: true,
                brotliSize: true,
                open: true,
            })
        );
    }

    return config;
});
