<template>
    <span ref="el">{{ display }}{{ suffix }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{
    to: number
    /** 動畫長度（毫秒） */
    duration?: number
    suffix?: string
}>(), {
    duration: 1600,
    suffix: '',
});

const el = ref<HTMLElement | null>(null);
const display = ref(0);
let observer: IntersectionObserver | null = null;
let frame = 0;

// easeOutExpo：一開始衝很快，結尾溫和停下
const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

function run() {
    const start = performance.now();

    const step = (now: number) => {
        const t = Math.min(1, (now - start) / props.duration);
        display.value = Math.round(ease(t) * props.to);
        if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
}

onMounted(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window) || !el.value) {
        display.value = props.to;
        return;
    }

    observer = new IntersectionObserver(
        (entries) => {
            if (!entries[0].isIntersecting) return;
            run();
            observer?.disconnect();
        },
        { threshold: 0.5 },
    );

    observer.observe(el.value);
});

onUnmounted(() => {
    observer?.disconnect();
    if (frame) cancelAnimationFrame(frame);
});
</script>
