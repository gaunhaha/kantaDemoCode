<template>
    <header class="fixed w-full top-0 z-50 transition-all duration-300" :class="[isScrolled ? 'h-14' : 'h-20']">
        <div class="flex justify-between items-center p-4 px-8 bg-white shadow-md h-full">
            <div class="flex items-center">
                <div class="me-3">
                    <img class="rounded-full transition-all duration-300" 
                         :class="[isScrolled ? 'h-8' : 'h-10']"
                         id="profile-pic" 
                         src="@/assets/images/selfie.jpg" 
                         alt="profile-pic">
                </div>
                <span class="transition-all duration-300" :class="[isScrolled ? 'text-base' : 'text-lg']">
                    Kanta
                </span>
            </div>
            <!-- 桌面版選單 -->
            <div class="hidden md:flex items-center gap-4">
                <el-menu :default-active="activeIndex" 
                        class="el-menu-demo transition-all duration-300" 
                        :class="[isScrolled ? 'small-menu' : '']"
                        mode="horizontal" 
                        :ellipsis="false"
                        @select="handleSelect">
                    <el-menu-item index="/">
                        <template #title>
                            <span class="transition-all duration-300" :class="[isScrolled ? 'text-base' : 'text-lg']">
                                {{ t('Menu.home') }}
                            </span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/skill">
                        <template #title>
                            <span class="transition-all duration-300" :class="[isScrolled ? 'text-base' : 'text-lg']">
                                {{ t('Menu.skill') }}
                            </span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/analysis">
                        <template #title>
                            <span class="transition-all duration-300" :class="[isScrolled ? 'text-base' : 'text-lg']">
                                {{ t('Menu.analysis') }}
                            </span>
                        </template>
                    </el-menu-item>
                    <el-sub-menu index="games">
                        <template #title>
                            <span class="transition-all duration-300" :class="[isScrolled ? 'text-base' : 'text-lg']">
                                {{ t('Menu.games') }}
                            </span>
                        </template>
                        <el-menu-item index="/whack-a-mole">
                            <span class="transition-all duration-300" :class="[isScrolled ? 'text-base' : 'text-lg']">
                                {{ t('Menu.whackAMole') }}
                            </span>
                        </el-menu-item>
                        <el-menu-item index="/maze-game">
                            <span class="transition-all duration-300" :class="[isScrolled ? 'text-base' : 'text-lg']">
                                {{ t('Menu.mazeGame') }}
                            </span>
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>

                <button @click="toggleThemeColor()" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i class="fas" :class="isLight ? 'fa-sun' : 'fa-moon'"></i>
                </button>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="fas fa-globe text-xl cursor-pointer"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="changeLanguage('en')">
                                {{ t('Language.en') }}
                            </el-dropdown-item>
                            <el-dropdown-item @click="changeLanguage('zh_tw')">
                                {{ t('Language.zh_tw') }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

            <!-- 手機版漢堡選單 -->
            <div class="md:hidden">
                <button @click="isMenuOpen = !isMenuOpen" class="p-2">
                    <i class="fas fa-bars text-xl"></i>
                </button>

                <!-- 手機版選單內容 -->
                <Transition name="slide-fade">
                    <div v-if="isMenuOpen" 
                        class="fixed inset-0 z-50">
                        <div class="absolute inset-0 bg-black bg-opacity-50"
                             @click="isMenuOpen = false">
                        </div>
                        <div class="absolute right-0 top-0 h-full w-[80%] max-w-[300px] bg-theme-light text-primary 
                                  transform transition-transform duration-300">
                            <div class="flex justify-end p-4">
                                <button @click="isMenuOpen = false" class="p-2">
                                    <i class="fas fa-times text-xl"></i>
                                </button>
                            </div>
                            <div class="px-4 pr-20">
                                <div class="flex flex-col space-y-4">
                                    <a @click="handleMobileNav('/')" class="py-2">{{ t('Menu.home') }}</a>
                                    <a @click="handleMobileNav('/skill')" class="py-2">{{ t('Menu.skill') }}</a>
                                    <a @click="handleMobileNav('/analysis')" class="py-2">{{ t('Menu.analysis') }}</a>
                                    <div class="py-2">
                                        <div @click="isGamesOpen = !isGamesOpen" class="flex justify-between items-center">
                                            <span>{{ t('Menu.games') }}</span>
                                            <i class="fas" :class="isGamesOpen ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                                        </div>
                                        <div v-if="isGamesOpen" class="pl-4 mt-2 space-y-2">
                                            <a @click="handleMobileNav('/whack-a-mole')" class="block py-1">{{ t('Menu.whackAMole') }}</a>
                                            <a @click="handleMobileNav('/maze-game')" class="block py-1">{{ t('Menu.mazeGame') }}</a>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-4 py-2">
                                        <button @click="toggleThemeColor()" class="p-2 rounded-full">
                                            <i class="fas" :class="isLight ? 'fa-sun' : 'fa-moon'"></i>
                                        </button>
                                        <el-dropdown>
                                            <span class="el-dropdown-link">
                                                <i class="fas fa-globe text-xl cursor-pointer text-primary"></i>
                                            </span>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item @click="changeLanguage('en')">
                                                        {{ t('Language.en') }}
                                                    </el-dropdown-item>
                                                    <el-dropdown-item @click="changeLanguage('zh_tw')">
                                                        {{ t('Language.zh_tw') }}
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </header>

    <!-- 添加一個占位元素，防止內容被 fixed header 遮擋 -->
    <div :class="[isScrolled ? 'h-14' : 'h-20']"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import i18n from "@/core/plugins/i18n/i18n";

const router = useRouter();
const { t } = i18n.global;
const isLight = ref<boolean>(document.documentElement.getAttribute('themeColor') == 'light');

const activeIndex = computed(() => {
    const fullPath = router.currentRoute.value.fullPath;
    return fullPath.replace(/^.*#/, '');
});

const isMenuOpen = ref(false);
const isGamesOpen = ref(false);

const isScrolled = ref(false);

const handleSelect = (key: string) => {
    router.push(key);
};

function toggleThemeColor() {
    isLight.value = !isLight.value;
    if (isLight.value) document.documentElement.setAttribute('themeColor', 'light');
    else document.documentElement.setAttribute('themeColor', 'dark');
    localStorage.setItem("theme_color", isLight.value ? 'light' : 'dark');
}

function changeLanguage(lang: 'en' | 'zh_tw') {
    i18n.global.locale.value = lang;
    localStorage.setItem('language', lang);
}

const handleMobileNav = (path: string) => {
    router.push(path);
    isMenuOpen.value = false;
};

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.el-menu {
    border-bottom: none;
    height: 100%;
}

.el-menu-demo {
    padding-right: 20px;
}

/* 縮小時的選單樣式 */
.small-menu {
    line-height: 3.5rem !important;
}

.small-menu :deep(.el-menu-item),
.small-menu :deep(.el-sub-menu__title) {
    height: 3.5rem !important;
    line-height: 3.5rem !important;
}

:deep(.el-sub-menu__title) {
    font-size: 1.125rem;
    transition: all 0.3s ease;
}

/* 手機版選單樣式 */
.mobile-menu-item {
    @apply py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer;
}

/* 滑動動畫 */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from {
    opacity: 0;
}

.slide-fade-enter-from .transform {
    transform: translateX(100%);
}

.slide-fade-leave-to {
    opacity: 0;
}

.slide-fade-leave-to .transform {
    transform: translateX(100%);
}

/* 確保過渡動畫平滑 */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
</style>