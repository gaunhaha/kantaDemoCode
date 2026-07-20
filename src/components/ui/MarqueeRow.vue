<template>
    <div class="marquee" :class="{ 'marquee--reverse': reverse }">
        <div class="marquee__track" :style="{ animationDuration: duration }">
            <!-- 內容重複兩份，位移 -50% 時剛好無縫接回 -->
            <template v-for="pass in 2" :key="pass">
                <span v-for="item in items" :key="`${pass}-${item}`" class="marquee__item">
                    {{ item }}
                    <span class="marquee__dot" aria-hidden="true">◆</span>
                </span>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    items: string[]
    reverse?: boolean
    duration?: string
}>(), {
    reverse: false,
    duration: '42s',
});
</script>

<style scoped>
.marquee {
    overflow: hidden;
    /* 左右淡出，讓跑馬燈不會硬切在邊界 */
    mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.marquee__track {
    display: flex;
    width: max-content;
    animation-name: marquee-scroll;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.marquee--reverse .marquee__track {
    animation-direction: reverse;
}

.marquee:hover .marquee__track {
    animation-play-state: paused;
}

.marquee__item {
    display: inline-flex;
    align-items: center;
    gap: 2rem;
    padding-right: 2rem;
    font-family: 'Sora', 'Noto Sans TC', sans-serif;
    font-size: clamp(1rem, 2vw, 1.5rem);
    font-weight: 300;
    white-space: nowrap;
    color: rgb(var(--c-text-muted));
}

.marquee__dot {
    font-size: 0.4em;
    color: rgb(var(--c-accent));
}

@keyframes marquee-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
    .marquee__track {
        animation: none;
    }
}
</style>
