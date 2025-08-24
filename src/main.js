// 1.Create APP
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// 2.Components
// import router from "./router/index.cjs";
// app.use(router);

// import store from "./store/index";
// app.use(store);

// import { i18n } from "@/locale";
// app.use(i18n);

import "virtual:svg-icons-register";
import Icon from "@/components/common/icon.vue";
app.component("Icon", Icon);

// 3.Mount DOM
app.mount("#app");
