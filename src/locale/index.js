import { createI18n } from "vue-i18n";

// 1. Ready translated locale messages
// The structure of the locale message is the hierarchical object structure with each locale as the top property
import enUs from "./en-us";
import zhCn from "./zh-cn";
const lang = {
    "en-US": enUs,
    "zh-CN": zhCn,
};

// 2. Create i18n instance with options
const i18n = createI18n({
    locale: "zh-CN", // set locale
    fallbackLocale: "zh-CN", // set fallback locale
    messages: lang, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
    warnHtmlInMessage: "off",
});

export { i18n };
