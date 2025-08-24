// 子项目与壳的统一协议：
// - URI 格式：app:/path?query
// - 每个子项目写入 __micro_last_uri_<app>
// - 跨项目 = 硬导航 /subapps/<app>/index.html#/path
// - 同项目 = router.push(path) 或 location.hash

import pkg from "../../../package.json";

// 当前子应用名（优先 env 配置）
export const APP = (import.meta.env.VITE_APP_NAME || pkg.name || "unknown").trim();

// 存储 key
const lastKey = (app) => `__micro_last_uri_${app}`;

// ------------ 存取 ------------
export function getLastUri(app = APP) {
    try {
        return localStorage.getItem(lastKey(app)) || "";
    } catch {
        return "";
    }
}
export function setLastUri(app, uri) {
    try {
        localStorage.setItem(lastKey(app), uri || "");
    } catch (e) {
        console.error(e);
    }
}
export function clearLast(app = APP) {
    try {
        localStorage.removeItem(lastKey(app));
    } catch (e) {
        console.error(e);
    }
}

// ------------ 工具函数 ------------
function normalizePath(pathOrHash = "") {
    // 输入 "/a" | "a" | "#/a" -> 输出 "/a"
    let s = String(pathOrHash).trim();
    if (!s) return "/";
    s = s.replace(/^#/, "");
    if (!s.startsWith("/")) s = "/" + s.replace(/^\/+/, "");
    return s;
}
function toHash(path = "/") {
    const p = normalizePath(path);
    return p.startsWith("#") ? p : `#${p}`;
}
function parseUri(uri = "") {
    const m = String(uri).match(/^([^:]+):(.*)$/);
    if (!m) return null;
    const app = m[1].trim();
    const path = normalizePath((m[2] || "/").trim());
    return { app, path };
}

// ------------ 路由绑定 ------------
export function bindRouter(router) {
    // 首次进入时恢复上次位置
    if (!location.hash) {
        const last = getLastUri(APP);
        const parsed = last && parseUri(last);
        if (parsed && parsed.app === APP) {
            const path = parsed.path;
            try {
                if (router?.replace) router.replace(path);
                else location.hash = toHash(path);
            } catch (e) {
                console.error(e);
            }
        }
    }
    // 记录每次变化
    const write = () => {
        const path = location.hash.replace(/^#/, "") || "/";
        setLastUri(APP, `${APP}:${path}`);
    };
    if (router?.afterEach) router.afterEach(write);
    window.addEventListener("hashchange", write);
    window.addEventListener("beforeunload", write);
}

// ------------ 跳转 ------------
export function go(app, pathOrHash = "/", router) {
    const path = normalizePath(pathOrHash);

    if (app === APP) {
        // 同应用内
        if (router?.push) router.push(path);
        else location.hash = toHash(path);
        setLastUri(APP, `${APP}:${path}`);
        return;
    }

    // 跨应用：整页跳
    setLastUri(app, `${app}:${path}`);
    const url = `/subapps/${app}/index.html${toHash(path)}`;
    window.location.assign(url);
}
