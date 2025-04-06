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

// 配置路由切換後向 GA4 發送事件
router.afterEach((to) => {
    // 確保 window.dataLayer 存在
    window.dataLayer = window.dataLayer || [];
    
    // 發送頁面瀏覽事件到 GTM
    window.dataLayer.push({
        event: 'page_view',
        page_title: document.title,
        page_location: window.location.href,
        page_path: to.fullPath
    });
});

export default router;