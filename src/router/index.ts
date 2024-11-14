import {
    createRouter,
    createWebHashHistory,
    type RouteRecordRaw,
} from "vue-router";

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        children: [
            {
                path: "/",
                name: "aboutMe",
                component: () =>
                    import("@/views/aboutMe/AboutMe.vue"),
            },
            {
                path: "/demo",
                name: "demo",
                component: () =>
                    import("@/views/demo/Demo.vue"),
            },
            {
                path: "/analyze",
                name: "analyze",
                component: () =>
                    import("@/views/analyze/Analyze.vue"),
            },
            {
                path: "/whack-a-mole",
                name: "whackAMole",
                component: () =>
                    import("@/views/whack-a-mole/WhackAMole.vue"),
            },
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    to;
    from;
    next();
})

export default router;