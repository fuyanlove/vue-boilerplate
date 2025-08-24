// 1.Dependency
import {
    createRouter,
    createWebHistory,
    // createWebHashHistory
} from "vue-router";
// import User from '@iruxu/rx-common/utils/user'
import Settings from "@/settings.js";

// 2.Routes
const modules = import.meta.glob(
    [
        "./**/*.js", // 匹配 router 下所有 js
        "!./index.js", // 排除 index.js
    ],
    { eager: true }
);
const routesFromModules = Object.values(modules).flatMap((mod) => {
    const v = mod.default;
    return Array.isArray(v) ? v : v ? [v] : [];
});
export const constantRoutes = [
    {
        name: "index",
        path: "/",
        // redirect: "/dashboard",
        // beforeEnter: () => {
        //     if (User.isLogin()) {
        //         return "/dashboard";
        //     }
        // },
    },
    ...routesFromModules,
    // ...dashboard, // 手动补充
];
console.log(constantRoutes);

// 3.Build An Instance
const router = createRouter({
    // history: createWebHashHistory(import.meta.env.BASE_URL),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes,
});

// 5. Global Guard
router.beforeEach((to, from, next) => {
    document.title = to.meta?.title + " 🌕 " + Settings.TitleSuffix;
    document.documentElement.classList.add("p-" + (to.name || "page"));
    next();
});

export default router;
