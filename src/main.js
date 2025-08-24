// 1.Create APP
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// 2.Components
import router from "./router/index.js";
app.use(router);

import store from "./store/index";
app.use(store);

import { i18n } from "@/locale";
app.use(i18n);

import "virtual:svg-icons-register";
import Icon from "@/components/common/icon.vue";
app.component("Icon", Icon);

// app-shell通讯
import { go, bindRouter } from "@/utils/shell-bridge/go.js";
bindRouter(router); // 记录/恢复“最后位置”
app.config.globalProperties.$shell = {
    go,
};

// 3.Mount DOM
app.mount("#app");
