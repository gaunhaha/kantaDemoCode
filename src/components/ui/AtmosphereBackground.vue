<template>
    <div class="atmosphere" aria-hidden="true">
        <!-- 兩顆緩慢飄移的光暈，會微微跟隨滑鼠 -->
        <div class="orb orb-a" :style="orbAStyle"></div>
        <div class="orb orb-b" :style="orbBStyle"></div>
        <!-- 細網格 -->
        <div class="grid-lines"></div>
        <!-- 顆粒雜訊，讓純色底不會太「數位」 -->
        <div class="noise"></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePointer } from '@/composables/useScroll';

const { px, py } = usePointer();

const orbAStyle = computed(() => ({
    transform: `translate3d(${px.value * 44}px, ${py.value * 44}px, 0)`,
}));

const orbBStyle = computed(() => ({
    transform: `translate3d(${px.value * -34}px, ${py.value * -34}px, 0)`,
}));
</script>

<style scoped>
.atmosphere {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
}

.orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
}

.orb-a {
    top: -18vh;
    right: -10vw;
    width: 62vw;
    height: 62vw;
    max-width: 900px;
    max-height: 900px;
    background: var(--glow-a);
    animation: drift-a 26s ease-in-out infinite;
}

.orb-b {
    bottom: -24vh;
    left: -14vw;
    width: 54vw;
    height: 54vw;
    max-width: 780px;
    max-height: 780px;
    background: var(--glow-b);
    animation: drift-b 32s ease-in-out infinite;
}

@keyframes drift-a {
    0%, 100% { translate: 0 0; }
    50% { translate: -4vw 6vh; }
}

@keyframes drift-b {
    0%, 100% { translate: 0 0; }
    50% { translate: 5vw -5vh; }
}

.grid-lines {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgb(var(--c-line) / 0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgb(var(--c-line) / 0.045) 1px, transparent 1px);
    background-size: 72px 72px;
    /* 邊緣淡出，避免網格看起來像表格 */
    mask-image: radial-gradient(ellipse 100% 70% at 50% 0%, #000 20%, transparent 78%);
    -webkit-mask-image: radial-gradient(ellipse 100% 70% at 50% 0%, #000 20%, transparent 78%);
}

.noise {
    position: absolute;
    inset: -200%;
    opacity: var(--noise-opacity);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@media (prefers-reduced-motion: reduce) {
    .orb {
        animation: none;
        transition: none;
    }
}
</style>
