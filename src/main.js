// 1.Create APP
import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
const app = createApp(App);

// 2.Router
import router from "./router/index.js";
app.use(router);

// 3. Store
import store from "./store/index";
app.use(store);

// 4. Locale
import { i18n } from "@/locale";
app.use(i18n);

// 5. UI

// Head
app.use(createHead());

// SVG Icon
import "virtual:svg-icons-register";
import Icon from "@/components/common/icon.vue";
app.component("Icon", Icon);

// Tailwind CSS
import "@/assets/css/external/tailwind.css";

// 6.Mount DOM
app.mount("#app");
