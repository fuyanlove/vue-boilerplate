// 壳通讯
// 1) 子应用自身的标识
import pkg from "../../../package.json";
const APP = (import.meta.env.VITE_APP_NAME || pkg.name || "unknown").trim();

// ---- 位置记忆 ----
const lastKey = (name) => `__micro_last_${name}`;

export function getLastHash(name = APP) {
    try {
        return localStorage.getItem(lastKey(name)) || "";
    } catch {
        return "";
    }
}
export function setLastHash(hash, name = APP) {
    try {
        localStorage.setItem(lastKey(name), hash || "");
    } catch (err) {
        console.error("[Shell-Bridge.go] setLastHash error", err);
    }
}

// 绑定路由：进入时尝试恢复；之后每次变更记录
export function bindRouter(router) {
    // 首次进入无 hash 时，恢复上次位置
    if (!location.hash) {
        const last = getLastHash();
        if (last) {
            // 用 router 更平滑；没有 router 就改 location.hash
            try {
                router && router.replace?.(last.replace(/^#/, ""));
            } catch (err) {
                console.error("[Shell-Bridge.go] bindRouter error", err);
            }
            if (!router) location.hash = last;
        }
    }
    // 记录每次变化
    if (router && router.afterEach) {
        router.afterEach(() => setLastHash(location.hash || ""));
    } else {
        window.addEventListener("hashchange", () => setLastHash(location.hash || ""));
        window.addEventListener("beforeunload", () => setLastHash(location.hash || ""));
    }
}

// ---- 跳转 ----
function normalizeHash(hash) {
    if (!hash) return "";
    const s = String(hash);
    if (s.startsWith("#/")) return s;
    if (s.startsWith("#")) return "#/" + s.replace(/^#\/?/, "");
    if (s.startsWith("/")) return "#" + s; // "/a" -> "#/a"
    return "#/" + s.replace(/^\/+/, "");
}

/**
 * go(app, hash, router?)
 * - app 等于当前子应用：同应用内跳转（router.push 或改 hash）+ 记录位置
 * - app 不同：跨应用整页导航到 /subapps/<app>/index.html#/...
 */
export function go(app, hash = "", router) {
    const h = normalizeHash(hash);

    if (app === APP) {
        if (h) {
            if (router && router.push) router.push(h.replace(/^#/, ""));
            else window.location.hash = h;
            setLastHash(h);
        }
        return;
    }

    // 跨应用：整页跳
    const clean = h.replace(/^#/, "");
    const url = `/subapps/${app}/index.html${clean ? `#/${clean.replace(/^\/+/, "")}` : ""}`;
    window.location.assign(url);
}
