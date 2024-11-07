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

            // {
            //     path: "/password-reset",
            //     name: "password-reset",
            //     component: () =>
            //         import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
            // },
            // {
            //     path: "/",
            //     redirect: "/sign-in"
            // },
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