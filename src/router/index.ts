import {
    createRouter,
    createWebHashHistory,
    type RouteRecordRaw,
} from "vue-router";

import HomePage from "@/views/home/HomePage.vue";

// 為 dataLayer 添加類型定義
declare global {
    interface Window {
        dataLayer: any[];
    }
}

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
    scrollBehavior(to, from, savedPosition) {
        to
        from
        if (savedPosition) {
            return savedPosition
        }
        return { top: 0 }
    }
});

router.beforeEach(async (to, from, next) => {
    to;
    from;
    next();
})

export default router;