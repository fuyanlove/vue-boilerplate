export default [
    {
        name: "dashboard",
        path: "/dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
            title: "pages.dashboard.title",
            keywords: "pages.dashboard.keywords",
            description: "pages.dashboard.description",
        },
    },
];
