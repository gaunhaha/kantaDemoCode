import {
    createRouter,
    createWebHashHistory,
    type RouteRecordRaw,
} from "vue-router";

import HomePage from "@/views/home/HomePage.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        children: [
            {
                path: "/",
                name: "home",
                component: HomePage,
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