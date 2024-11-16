<template>
    <div class="h-16 bg-theme border-bottom flex items-center p-3 ps-8 justify-between static">
        <div class="flex items-center">
            <div class="me-3">
                <img class="h-10 rounded-full" id="profile-pic"
                    src="https://lh3.google.com/u/0/d/1jNCxRzTQ-f0tU8YMt8F_VqwENvVyRqz3=w1920-h953-iv1"
                    alt="profile-pic">
            </div>
            <span class="">
                Kanta {{ t('Menu.demo') }}
            </span>
        </div>
        <div class="flex justify-end items-center gap-3">
            <template v-if="width > 750">
                <div>
                    <label class="inline-flex items-center cursor-pointer gap-3">
                        <i class="fas fa-moon"></i>
                        <input type="checkbox" v-model="isLight" class="sr-only peer" @change="toggleTheme">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-600">
                        </div>
                        <i class="material-icons" style="font-size:20px">wb_sunny</i>
                    </label>
                </div>
                <div>
                    <button class="text-sm bg-sky-600 px-3 py-1 rounded-md text-white"
                        @click="isShowLanguage = !isShowLanguage">
                        {{ locale == 'en' ? t('Language.en') : t('Language.zh_tw') }}
                    </button>
                </div>
            </template>
            <template v-else>
                <div class="cursor-pointer" @click="isShowMenu = !isShowMenu">
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                        </path>
                    </svg>
                </div>
            </template>
        </div>
    </div>
    <template v-if="isShowMenu && width <= 750">
        <div class="absolute top-16 right-0 mt-3 z-50">
            <div class="w-60 bg-theme rounded-md shadow-md flex flex-col">
                <div class="flex justify-between p-3 pb-2">
                    <div>
                        {{ t('Header.darkMode') }}
                    </div>
                    <label class="inline-flex items-center cursor-pointer gap-3">
                        <i class="fas fa-moon"></i>
                        <input type="checkbox" v-model="isLight" class="sr-only peer" @change="toggleTheme()">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-600">
                        </div>
                        <i class="material-icons" style="font-size:20px">wb_sunny</i>
                    </label>
                </div>
                <hr class="border-t border-gray-200">
                <div class="flex justify-between p-3">
                    <div>
                        {{ t('Header.language') }}
                    </div>
                    <div class="w-32 flex flex-col gap-2">
                        <button class="text-sm bg-sky-600 px-3 py-1 rounded-md text-white"
                            @click="changeLanguage(Language.en)">
                            {{ t('Language.en') }}
                        </button>
                        <button class="text-sm bg-sky-600 px-3 py-1 rounded-md text-white"
                            @click="changeLanguage(Language.zh_tw)">
                            {{ t('Language.zh_tw') }}
                        </button>
                    </div>
                </div>
                <hr class="border-t border-gray-200">
                <SideBar v-model:isShow="isShowMenu" />
            </div>
        </div>
    </template>
    <template v-if="isShowLanguage && width > 750">
        <div class="absolute top-12 right-0 mt-3 z-50">
            <div class="w-40 bg-white rounded-md shadow-md p-3 flex flex-col gap-2">
                <button class="text-sm bg-sky-600 px-3 py-1 rounded-md text-white" @click="changeLanguage(Language.en)">
                    {{ t('Language.en') }}
                </button>
                <button class="text-sm bg-sky-600 px-3 py-1 rounded-md text-white" @click="changeLanguage(Language.zh_tw)">
                    {{ t('Language.zh_tw') }}
                </button>
            </div>
        </div>
    </template>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useWindowSize } from '@vueuse/core'
import SideBar from "@/layout/sideBar/SideBar.vue";
import i18n, { Language } from "@/core/plugins/i18n/i18n.ts";
const { t, locale } = i18n.global;
const { width } = useWindowSize()
const isShowMenu = ref<boolean>(false);
const isShowLanguage = ref<boolean>(false);
const isLight = ref<boolean>(document.documentElement.getAttribute('data-theme') == 'light');

onMounted(() => {
    var themeMode = localStorage.getItem("theme_mode_value");
    if (!themeMode) {
        themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", themeMode);
    isLight.value = themeMode == 'light';
})

function toggleTheme() {
    if (isLight.value) document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem("theme_mode_value", isLight.value ? 'light' : 'dark');
}

function changeLanguage(language: Language) {
    locale.value = language;
    localStorage.setItem("lang", language);
    document.documentElement.setAttribute("lang", language);
    isShowLanguage.value = false;
}
</script>