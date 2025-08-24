import { createI18n } from "vue-i18n";
// import User from "@iruxu/rx-common/utils/user";

// 1. Ready translated locale messages
const locales = import.meta.glob(["./*/index.js", "./!./index.js"], { eager: true });

const messages = {};
for (const [path, mod] of Object.entries(locales)) {
    // ./zh-CN/common.js  →  locale = zh-CN, ns = common
    const m = path.match(/^\.\/([^/]+)\/([^/]+)\.(?:js|ts)$/);
    if (!m) continue;
    const [, locale, ns] = m;
    messages[locale] ??= {};
    messages[locale][ns] = mod.default || {};
}

// 2. Create i18n instance with options
const i18n = createI18n({
    // locale: User.getLocale(), // set locale
    locale: "zh-CN", // set locale
    fallbackLocale: "zh-CN", // set fallback locale
    messages, // set locale messages
    globalInjection: true,
    warnHtmlInMessage: "off",
});

export { i18n };
