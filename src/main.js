// 1.Create APP
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// 2.Router
import router from "./router/index.js";
app.use(router);

// 3. Store
import store from "./store/index";
app.use(store);
import { createPinia } from "pinia";
app.use(createPinia());

// 4. Locale
import { i18n } from "@/locale";
app.use(i18n);

// 5. UI

// Head
import { head } from "@/utils/dom";
app.use(head);

// SVG Icon
import "virtual:svg-icons-register";
import Icon from "@/components/common/icon.vue";
app.component("Icon", Icon);

// External CSS
import "./assets/css/common/font.css";
import "./assets/css/common/tailwind.css";

// Element Plus
import "./assets/css/common/element.scss";
import ElementPlus from "element-plus";
// import zhCn from "element-plus/es/locale/lang/zh-cn";
// import en from "element-plus/es/locale/lang/en";
// import "element-plus/dist/index.css";
app.use(ElementPlus, {
    // locale: User.getLocale() == "zh-CN" ? zhCn : en,
});
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 6.Mount DOM
app.mount("#app");
