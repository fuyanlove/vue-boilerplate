export default [
    {
        name: "dashboard",
        path: "/dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "Dashboard" },
    },
];
