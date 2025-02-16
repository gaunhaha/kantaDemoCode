<template>
    <div class="relative min-h-screen overflow-hidden">
        <!-- 星星背景層 -->
        <div class="star-container fixed top-0 left-0 w-full" :style="{ height: '200vh' }">
            <div v-for="i in 100" :key="i" 
                 class="star absolute"
                 :style="{
                     left: `${Math.random() * 100}%`,
                     top: `${Math.random() * 200}%`,
                     animationDelay: `${Math.random() * 2}s`,
                     transform: `scale(${Math.random() * 0.3 + 0.2})`
                 }">⭐</div>
        </div>

        <div class="relative z-10">
            <div class="grid justify-items-center  gap-10">
                <div>
                    <WorkExperience />
                </div>
                <div>
                    <SideProject />
                </div>
                <div>
                    <SkillList />
                </div>
                <div>
                    <OtherExperience />
                </div>
                <div>
                    <University />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n.ts";
import WorkExperience from "./workExperience/WorkExperience.vue";
import SideProject from "./sideProject/SideProject.vue";
import SkillList from "./skillList/skillList.vue";
import OtherExperience from "./otherExperience/OtherExperience.vue";
import University from "./university/University.vue";
import { onMounted, onUnmounted } from "vue";
const { t } = i18n.global;

// 視差滾動效果
const handleScroll = () => {
    const container = document.querySelector('.star-container') as HTMLElement;
    if (container) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        // 當滾動到一定程度時，重置位置
        const adjustedRate = rate % (window.innerHeight / 2);
        container.style.transform = `translate3d(0, ${adjustedRate}px, 0)`;
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.star-container {
    pointer-events: none;
    z-index: 1;
    /* 視差效果 */
    will-change: transform;
}

.star {
    font-size: 24px;
    color: #2c3e50;
    animation: twinkle 1s infinite alternate;
    position: absolute;
    will-change: transform;
}

@keyframes twinkle {
    from {
        opacity: 0.2;
    }
    to {
        opacity: 1;
    }
}

/* 在深色模式下調整星星顏色 */
:global(.dark) .star {
    color: #FFD700;
}

/* 原有的樣式保持不變 */
</style>