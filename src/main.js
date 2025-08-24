// 1.Create APP
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// 2.Router
import router from "./router/index.js";

import { go, bindRouter } from "@/utils/shell-bridge/go.js";
bindRouter(router); // 记录/恢复“最后位置”
app.config.globalProperties.$shell = {
    go,
};

app.use(router);

// 3. Store
import store from "./store/index";
app.use(store);

// 4. Locale
import { i18n } from "@/locale";
app.use(i18n);

// 5. UI
import "virtual:svg-icons-register";
import Icon from "@/components/common/icon.vue";
app.component("Icon", Icon);

// 6.Mount DOM
app.mount("#app");
