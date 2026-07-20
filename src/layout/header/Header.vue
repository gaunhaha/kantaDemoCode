<template>
    <header class="fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-smooth"
        :class="[isHidden ? '-translate-y-full' : 'translate-y-0']">
        <div class="nav-shell" :class="{ glass: isScrolled }">
            <div class="shell flex items-center justify-between transition-all duration-500 ease-smooth"
                :class="[isScrolled ? 'h-16' : 'h-20 md:h-24']">

                <!-- 品牌 -->
                <RouterLink to="/" class="group flex items-center gap-3" @click="track('logo')">
                    <span class="relative">
                        <img src="@/assets/images/profilePhoto.png" alt="Kanta" id="profile-pic"
                            class="rounded-full object-cover ring-1 ring-hairline/15 transition-all duration-500"
                            :class="[isScrolled ? 'h-8 w-8' : 'h-10 w-10']">
                        <span
                            class="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-ink-base"></span>
                    </span>
                    <span class="flex flex-col leading-none">
                        <span
                            class="font-display font-semibold tracking-tight text-content-strong transition-all duration-500"
                            :class="[isScrolled ? 'text-sm' : 'text-base']">Kanta</span>
                        <span class="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-content-faint">
                            Engineer
                        </span>
                    </span>
                </RouterLink>

                <!-- 桌面版導覽 -->
                <nav class="hidden items-center gap-1 md:flex">
                    <RouterLink v-for="item in navItems" :key="item.path" :to="item.path"
                        class="relative rounded-full px-4 py-2 text-sm transition-colors duration-300"
                        :class="isActive(item.path) ? 'text-content-strong' : 'text-content-muted hover:text-content-strong'">
                        <span v-if="isActive(item.path)"
                            class="absolute inset-0 rounded-full border border-hairline/10 bg-hairline/5"></span>
                        <span class="relative">{{ t(item.label) }}</span>
                    </RouterLink>

                    <!-- 遊戲下拉 -->
                    <div class="relative" @mouseenter="isGamesOpen = true" @mouseleave="isGamesOpen = false">
                        <button
                            class="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors duration-300"
                            :class="isGamesActive ? 'text-content-strong' : 'text-content-muted hover:text-content-strong'">
                            {{ t('Menu.games') }}
                            <i class="fa-solid fa-chevron-down text-[9px] transition-transform duration-300"
                                :class="{ 'rotate-180': isGamesOpen }"></i>
                        </button>

                        <Transition name="dropdown">
                            <div v-if="isGamesOpen"
                                class="absolute right-0 top-full w-52 overflow-hidden rounded-2xl border border-hairline/10 bg-ink-surface/95 p-1.5 backdrop-blur-xl shadow-lift">
                                <RouterLink v-for="game in gameItems" :key="game.path" :to="game.path"
                                    @click="isGamesOpen = false"
                                    class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-content-muted transition-colors duration-200 hover:bg-hairline/5 hover:text-accent">
                                    <i :class="game.icon" class="w-4 text-center text-xs"></i>
                                    {{ t(game.label) }}
                                </RouterLink>
                            </div>
                        </Transition>
                    </div>
                </nav>

                <!-- 右側控制項 -->
                <div class="flex items-center gap-1">
                    <button @click="toggleThemeColor" :aria-label="t('Header.darkMode')"
                        class="flex h-10 w-10 items-center justify-center rounded-full text-content-muted transition-all duration-300 hover:bg-hairline/6 hover:text-accent">
                        <i class="fas text-sm" :class="isLight ? 'fa-moon' : 'fa-sun'"></i>
                    </button>

                    <el-dropdown trigger="click">
                        <button :aria-label="t('Header.language')"
                            class="flex h-10 w-10 items-center justify-center rounded-full text-content-muted transition-all duration-300 hover:bg-hairline/6 hover:text-accent">
                            <i class="fas fa-globe text-sm"></i>
                        </button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="changeLanguage('en')">{{ t('Language.en') }}</el-dropdown-item>
                                <el-dropdown-item @click="changeLanguage('zh_tw')">{{ t('Language.zh_tw') }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                    <!-- 漢堡按鈕 -->
                    <button @click="handleMenuClick" :aria-label="t('Header.menu')" :aria-expanded="isMenuOpen"
                        class="ml-1 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full transition-colors duration-300 hover:bg-hairline/6 md:hidden">
                        <span class="block h-px w-5 bg-content-strong transition-all duration-300"
                            :class="{ 'translate-y-[3px] rotate-45': isMenuOpen }"></span>
                        <span class="block h-px w-5 bg-content-strong transition-all duration-300"
                            :class="{ '-translate-y-[3px] -rotate-45': isMenuOpen }"></span>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- 手機版全螢幕選單 -->
    <Teleport to="body">
        <Transition name="overlay">
            <div v-if="isMenuOpen" class="fixed inset-0 z-[55] md:hidden">
                <div class="absolute inset-0 bg-ink-base/95 backdrop-blur-2xl" @click="isMenuOpen = false"></div>

                <nav class="relative flex h-full flex-col justify-center px-8">
                    <RouterLink v-for="(item, i) in allMobileItems" :key="item.path" :to="item.path"
                        @click="handleMobileNav(item.path)"
                        class="mobile-link group flex items-baseline gap-4 border-b border-hairline/8 py-5"
                        :style="{ '--i': i }">
                        <span class="font-mono text-xs text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
                        <span
                            class="font-display text-3xl font-semibold transition-colors duration-300"
                            :class="isActive(item.path) ? 'text-accent' : 'text-content-strong group-hover:text-accent'">
                            {{ t(item.label) }}
                        </span>
                    </RouterLink>
                </nav>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import i18n from '@/core/plugins/i18n/i18n';
import { useScroll } from '@/composables/useScroll';

const router = useRouter();
const route = useRoute();
const { t } = i18n.global;
const { scrollY, isScrolled, isScrollingUp } = useScroll();

const isLight = ref<boolean>(document.documentElement.getAttribute('themeColor') === 'light');
const isMenuOpen = ref(false);
const isGamesOpen = ref(false);

const navItems = [
    { path: '/', label: 'Menu.home' },
    { path: '/skill', label: 'Menu.skill' },
];

const gameItems = [
    { path: '/whack-a-mole', label: 'Menu.whackAMole', icon: 'fa-solid fa-hammer' },
    { path: '/maze-game', label: 'Menu.mazeGame', icon: 'fa-solid fa-diagram-project' },
];

const allMobileItems = [...navItems, ...gameItems];

// 往下捲時收起導覽列，往上捲立刻回來
const isHidden = computed(() => scrollY.value > 220 && !isScrollingUp.value && !isMenuOpen.value);

const isActive = (path: string) => route.path === path;
const isGamesActive = computed(() => gameItems.some((g) => g.path === route.path));

// 選單開啟時鎖住背景捲動
watch(isMenuOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : '';
});

const handleMenuClick = () => {
    isMenuOpen.value = !isMenuOpen.value;
    window.dataLayer.push({
        event: 'menu_click',
        menu: isMenuOpen.value ? 'open' : 'close',
    });
};

const handleMobileNav = (path: string) => {
    router.push(path);
    isMenuOpen.value = false;
};

function track(target: string) {
    window.dataLayer.push({ event: 'nav_click', target });
}

function toggleThemeColor() {
    isLight.value = !isLight.value;
    document.documentElement.setAttribute('themeColor', isLight.value ? 'light' : 'dark');
    localStorage.setItem('theme_color', isLight.value ? 'light' : 'dark');
    window.dataLayer.push({
        event: 'theme_color_change',
        theme_color: isLight.value ? 'light' : 'dark',
    });
}

function changeLanguage(lang: 'en' | 'zh_tw') {
    i18n.global.locale.value = lang;
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
    window.dataLayer.push({ event: 'language_change', language: lang });
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 0.4s ease;
}

.overlay-enter-from,
.overlay-leave-to {
    opacity: 0;
}

/* 選單項目依序滑入 */
.overlay-enter-active .mobile-link {
    animation: link-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) backwards;
    animation-delay: calc(var(--i) * 70ms + 120ms);
}

@keyframes link-in {
    from {
        opacity: 0;
        transform: translateX(28px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .overlay-enter-active .mobile-link {
        animation: none;
    }
}
</style>
