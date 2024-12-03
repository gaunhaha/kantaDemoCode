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
                name: "home",
                component: () =>
                    import("@/views/home/Home.vue"),
            },
            {
                path: "/skill",
                name: "skill",
                component: () =>
                    import("@/views/skill/Skill.vue"),
            },
            {
                path: "/analysis",
                name: "analysis",
                component: () =>
                    import("@/views/analysis/Analysis.vue"),
            },
            {
                path: "/whack-a-mole",
                name: "whackAMole",
                component: () =>
                    import("@/views/whack-a-mole/WhackAMole.vue"),
            },
            {
                path: "/maze-game",
                name: "mazeGame",
                component: () => import("@/views/mazeGame/mazeGame.vue"),
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