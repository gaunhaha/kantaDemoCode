<template>
    <div class="relative min-h-screen bg-ink-base text-content">
        <!-- 背景氛圍層（固定，不隨內容捲動） -->
        <AtmosphereBackground />

        <!-- 頁面捲動進度條 -->
        <div class="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent" aria-hidden="true">
            <div class="h-full origin-left bg-accent transition-transform duration-150 ease-out"
                :style="{ transform: `scaleX(${progress})` }"></div>
        </div>

        <Header />

        <div class="relative z-10 flex min-h-screen flex-col">
            <main class="grow pt-24 md:pt-28">
                <RouterView v-slot="{ Component }">
                    <Transition name="page" mode="out-in">
                        <component :is="Component" />
                    </Transition>
                </RouterView>
            </main>

            <Footer />
        </div>

        <!-- 回到頂端 -->
        <Transition name="fab">
            <button v-show="showScrollButton" @click="scrollToTop" aria-label="回到頁面頂端"
                class="group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-hairline/12 bg-ink-surface/80 backdrop-blur-lg transition-all duration-300 hover:border-accent/40 hover:text-accent">
                <i class="fa-solid fa-arrow-up transition-transform duration-300 group-hover:-translate-y-0.5"></i>
            </button>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterView } from 'vue-router';
import Header from '@/layout/header/Header.vue';
import Footer from '@/layout/footer/Footer.vue';
import AtmosphereBackground from '@/components/ui/AtmosphereBackground.vue';
import { useScroll } from '@/composables/useScroll';

const { scrollY, progress } = useScroll();

const showScrollButton = computed(() => scrollY.value > 400);

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
/* 換頁轉場 */
.page-enter-active,
.page-leave-active {
    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.page-enter-from {
    opacity: 0;
    transform: translateY(14px);
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.fab-enter-active,
.fab-leave-active {
    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.fab-enter-from,
.fab-leave-to {
    opacity: 0;
    transform: translateY(12px) scale(0.9);
}
</style>
