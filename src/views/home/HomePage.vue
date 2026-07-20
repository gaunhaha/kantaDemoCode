<template>
    <div>
        <!-- ============ HERO ============ -->
        <section class="relative flex min-h-[86vh] items-center">
            <div class="shell" :style="heroParallax">
                <!-- 開放接案狀態 -->
                <div :class="{ 'is-revealed': heroIn }" class="hero-fade" style="--d: 0ms">
                    <span class="pill pill-accent gap-2">
                        <span class="relative flex h-1.5 w-1.5">
                            <span class="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent"></span>
                            <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"></span>
                        </span>
                        {{ t('Home.Hero.available') }}
                    </span>
                </div>

                <!-- 主標題：兩行由下往上推出 -->
                <h1 class="mt-8 font-display text-display-lg font-bold text-content-strong">
                    <span class="reveal-line" :class="{ 'is-revealed': heroIn }">
                        <span style="--line-delay: 150ms">{{ t('Home.Hero.line1') }}</span>
                    </span>
                    <span class="reveal-line" :class="{ 'is-revealed': heroIn }">
                        <span class="text-gradient" style="--line-delay: 280ms">{{ t('Home.Hero.line2') }}</span>
                    </span>
                </h1>

                <!-- 姓名 / 職稱 -->
                <div class="hero-fade mt-8 flex flex-wrap items-center gap-x-4 gap-y-2" :class="{ 'is-revealed': heroIn }"
                    style="--d: 520ms">
                    <span class="font-display text-lg font-semibold text-content-strong">{{ t('Home.Hero.name') }}</span>
                    <span class="h-4 w-px bg-hairline/20"></span>
                    <span class="font-mono text-xs uppercase tracking-[0.2em] text-content-muted">
                        {{ t('Home.Hero.role') }}
                    </span>
                </div>

                <p class="hero-fade mt-6 max-w-prose text-base leading-relaxed text-content-muted md:text-lg"
                    :class="{ 'is-revealed': heroIn }" style="--d: 620ms">
                    {{ t('Home.Hero.tagline') }}
                </p>

                <!-- 主要動作 -->
                <div class="hero-fade mt-10 flex flex-wrap items-center gap-3" :class="{ 'is-revealed': heroIn }"
                    style="--d: 720ms">
                    <RouterLink to="/skill" id="more-button"
                        class="group inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-contrast transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow">
                        {{ t('Home.Hero.ctaWork') }}
                        <i class="fa-solid fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
                    </RouterLink>

                    <button @click="goToEmail"
                        class="inline-flex items-center gap-2.5 rounded-full border border-hairline/12 px-6 py-3 text-sm font-medium text-content-strong transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent">
                        {{ t('Home.Hero.ctaContact') }}
                    </button>

                    <div class="ml-2 flex gap-1">
                        <button v-for="social in socials" :key="social.label" :id="social.id" @click="social.action"
                            :aria-label="social.label"
                            class="flex h-11 w-11 items-center justify-center rounded-full text-content-muted transition-all duration-300 hover:-translate-y-0.5 hover:bg-hairline/6 hover:text-accent">
                            <i :class="social.icon"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 捲動提示 -->
            <div class="hero-fade absolute inset-x-0 bottom-8 flex justify-center" :class="{ 'is-revealed': heroIn }"
                style="--d: 900ms" :style="{ opacity: scrollY > 80 ? 0 : undefined }">
                <div class="flex flex-col items-center gap-3">
                    <span class="font-mono text-[10px] uppercase tracking-[0.25em] text-content-faint">
                        {{ t('Home.Hero.scroll') }}
                    </span>
                    <span class="relative h-10 w-px overflow-hidden bg-hairline/12">
                        <span class="absolute inset-x-0 top-0 h-4 animate-scroll-hint bg-accent"></span>
                    </span>
                </div>
            </div>
        </section>

        <!-- ============ 數據 ============ -->
        <section class="shell">
            <div v-reveal="{ stagger: 90 }"
                class="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-hairline/8 bg-hairline/8 md:grid-cols-4">
                <div v-for="stat in stats" :key="stat.label" class="bg-ink-base px-6 py-8 md:px-8 md:py-10">
                    <div class="font-display text-4xl font-bold text-content-strong md:text-5xl">
                        <CountUp :to="stat.value" :suffix="stat.suffix" />
                    </div>
                    <div class="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-content-muted">
                        {{ t(stat.label) }}
                    </div>
                </div>
            </div>
        </section>

        <!-- ============ 技術跑馬燈 ============ -->
        <section class="mt-24 border-y border-hairline/8 py-8 md:mt-32">
            <MarqueeRow :items="marqueeItems" />
        </section>

        <!-- ============ 關於我 ============ -->
        <section class="shell mt-24 md:mt-40">
            <div class="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
                <!-- 左欄標題會黏在畫面上，右欄段落捲過去 -->
                <div class="lg:sticky lg:top-32 lg:self-start">
                    <span v-reveal="'fade'" class="eyebrow">{{ t('Home.Sections.aboutEyebrow') }}</span>
                    <h2 v-reveal="{ delay: 80 }"
                        class="mt-5 font-display text-display-sm font-bold text-content-strong">
                        {{ t('Home.Sections.aboutTitle') }}
                    </h2>

                    <div v-reveal="{ delay: 200, variant: 'scale' }"
                        class="mt-10 hidden overflow-hidden rounded-card border border-hairline/8 lg:block">
                        <img src="@/assets/images/selfie.jpg" alt="Kanta"
                            class="h-64 w-full object-cover transition-transform duration-700 ease-smooth hover:scale-105" />
                    </div>
                </div>

                <div class="flex flex-col gap-6">
                    <article v-for="(para, i) in aboutParagraphs" :key="para" v-reveal="{ delay: i * 60 }"
                        class="surface-interactive group relative p-7 md:p-9">
                        <span
                            class="absolute left-7 top-7 font-mono text-[11px] text-content-faint transition-colors duration-300 group-hover:text-accent md:left-9 md:top-9">
                            0{{ i + 1 }}
                        </span>
                        <p class="mt-8 leading-[1.85] text-content-muted" v-html="formatBoldText(t(para))"></p>
                    </article>
                </div>
            </div>
        </section>

        <!-- ============ 專注領域 ============ -->
        <section class="shell mt-28 md:mt-40">
            <SectionHeading :eyebrow="t('Home.Sections.focusEyebrow')" index="01"
                :title="t('Home.Sections.focusTitle')" :description="t('Home.Sections.focusDesc')" />

            <div class="grid gap-5 md:grid-cols-3">
                <article v-for="(focus, i) in focusItems" :key="focus" v-reveal="{ delay: i * 110, variant: 'blur' }"
                    class="surface-interactive group relative overflow-hidden p-8">
                    <!-- hover 時從上方滲入的光暈 -->
                    <span
                        class="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-accent/12 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"></span>

                    <div class="relative">
                        <span class="font-mono text-xs text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
                        <h3 class="mt-5 font-display text-xl font-semibold text-content-strong">
                            {{ t(`Home.Focus.${focus}.title`) }}
                        </h3>
                        <p class="mt-3 text-sm leading-relaxed text-content-muted">
                            {{ t(`Home.Focus.${focus}.text`) }}
                        </p>
                    </div>
                </article>
            </div>
        </section>

        <!-- ============ 技術堆疊 ============ -->
        <section class="shell mt-28 md:mt-40">
            <SectionHeading :eyebrow="t('Home.Sections.stackEyebrow')" index="02"
                :title="t('Home.Sections.stackTitle')" :description="t('Home.Sections.stackDesc')" />

            <div v-reveal="{ stagger: 55 }" class="flex flex-wrap gap-2.5">
                <span v-for="tech in stack" :key="tech"
                    class="rounded-full border border-hairline/10 bg-hairline/4 px-5 py-2.5 font-mono text-sm text-content-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent">
                    {{ tech }}
                </span>
            </div>
        </section>

        <!-- ============ 聯絡 ============ -->
        <section class="shell mt-28 md:mt-40">
            <div v-reveal="'scale'"
                class="relative overflow-hidden rounded-card border border-hairline/8 px-8 py-16 text-center md:px-16 md:py-24">
                <span class="pointer-events-none absolute inset-0 bg-accent/6 blur-3xl"></span>

                <div class="relative">
                    <span class="eyebrow justify-center">{{ t('Home.Sections.contactEyebrow') }}</span>
                    <h2 class="mx-auto mt-6 max-w-2xl font-display text-display-sm font-bold text-content-strong">
                        {{ t('Home.Sections.contactTitle') }}
                    </h2>
                    <p class="mx-auto mt-5 max-w-prose text-content-muted">
                        {{ t('Home.Sections.contactDesc') }}
                    </p>

                    <button @click="goToEmail"
                        class="group mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-medium text-accent-contrast transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow">
                        {{ t('Home.Sections.contactCta') }}
                        <i class="fa-solid fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import i18n from '@/core/plugins/i18n/i18n.ts';
import { useScroll } from '@/composables/useScroll';
import SectionHeading from '@/components/ui/SectionHeading.vue';
import MarqueeRow from '@/components/ui/MarqueeRow.vue';
import CountUp from '@/components/ui/CountUp.vue';

const { t } = i18n.global;
const { scrollY } = useScroll();

/** Hero 在掛載後才開始播，避免和路由轉場搶動畫 */
const heroIn = ref(false);
onMounted(() => {
    requestAnimationFrame(() => (heroIn.value = true));
});

/** Hero 隨捲動微微上移淡出，做出景深 */
const heroParallax = computed(() => {
    const y = Math.min(scrollY.value, 600);
    return {
        transform: `translate3d(0, ${y * 0.14}px, 0)`,
        opacity: String(Math.max(0, 1 - y / 520)),
    };
});

const aboutParagraphs = [
    'Home.AboutMe.text1',
    'Home.AboutMe.text2',
    'Home.AboutMe.text3',
    'Home.AboutMe.text4',
];
const focusItems = [1, 2, 3];

const stats = [
    { value: 6, suffix: '+', label: 'Home.Stats.years' },
    { value: 20, suffix: '+', label: 'Home.Stats.projects' },
    { value: 12, suffix: '', label: 'Home.Stats.stacks' },
    { value: 3, suffix: '', label: 'Home.Stats.langs' },
];

// 這一區講的是「這個網站」用了什麼，所以只列本專案實際使用的技術
const stack = [
    'Vue 3', 'TypeScript', 'Vite', 'Tailwind CSS', 'SCSS', 'Pinia',
    'Vue Router', 'Element Plus', 'Chart.js', 'vue-i18n', 'Axios',
];

// 跑馬燈呈現的是履歷上的主力技術
const marqueeItems = [
    'Vue 3', 'Nuxt.js', 'TypeScript', 'Tailwind CSS', 'Pinia', 'GraphQL',
    'WebSocket', 'Flutter', 'Golang', 'ASP.NET Core', 'Docker', 'Nginx',
    'GitHub Actions', 'Vercel',
];

const socials = [
    {
        label: 'GitHub',
        id: 'github-button',
        icon: 'fa-brands fa-github text-lg',
        action: () => open('https://github.com/gaunhaha'),
    },
    {
        label: 'LinkedIn',
        id: 'linkedin-button',
        icon: 'fa-brands fa-linkedin-in text-lg',
        action: () => open('https://www.linkedin.com/in/%E5%86%A0%E6%97%97-%E9%99%B3-34b48825b/'),
    },
];

function open(url: string) {
    window.open(url, '_blank', 'noopener');
}

function goToEmail() {
    window.location.href = 'mailto:gaunhaha@gmail.com';
}

/** 把 i18n 文案裡的 **粗體** 轉成強調樣式 */
function formatBoldText(text: string) {
    return text.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-content-strong">$1</strong>',
    );
}
</script>

<style scoped>
/* Hero 內元素依 --d 延遲淡入 */
.hero-fade {
    opacity: 0;
    transform: translateY(18px);
    transition:
        opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
        transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--d, 0ms);
}

.hero-fade.is-revealed {
    opacity: 1;
    transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
    .hero-fade {
        opacity: 1;
        transform: none;
    }
}
</style>
