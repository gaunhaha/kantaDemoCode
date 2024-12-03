<template>
    <div class="grid justify-items-center p-6 gap-10">
        <div @click="toggleText()"
            class="card w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded overflow-hidden shadow-lg bg-white">
            <img class="w-full h-48 object-cover" src="@/assets/images/about me.jpg" alt="Kanta Picture">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{{ t('Home.AboutMe.title') }}</div>
                <p class="text-gray-700 text-base">
                    {{ t('Home.AboutMe.text1') }}
                </p>
                <p v-if="!isExpanded" class="text-gray-700 text-base mt-4 cursor-pointer">
                    ...
                </p>
                <div class="content" :style="{ maxHeight: isExpanded ? '500px' : '0' }">
                    <p class="text-gray-700 text-base mt-4">
                        {{ t('Home.AboutMe.text2') }}
                    </p>
                    <p class="text-gray-700 text-base mt-4">
                        {{ t('Home.AboutMe.text3') }}
                    </p>
                </div>
            </div>
        </div>
        <div
            class="card w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded overflow-hidden shadow-lg bg-white">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{{ t('Home.Stack.title') }}</div>
                <div class="text-gray-700 text-base">
                    {{ t('Home.Stack.text') }}
                    <ul>
                        <li>- Vue.js</li>
                        <li>- TypeScript</li>
                        <li>- Vue Router</li>
                        <li>- Pinia</li>
                        <li>- i18n</li>
                        <li>- Axios</li>
                        <li>- Vite</li>
                        <li>- Tailwind CSS</li>
                    </ul>
                </div>
            </div>
        </div>
        <div
            class="flex justify-center gap-4 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded overflow-hidden shadow-lg bg-white p-4   ">
            <button class="card bg-gray-800 text-white px-4 py-2 rounded-md" @click="goToGitHub">
                <i class="fa-brands fa-github"></i>
            </button>
            <button class="card bg-blue-500 text-white px-4 py-2 rounded-md" @click="goToLinkedIn">
                <i class="fa-brands fa-linkedin"></i>
            </button>
            <button class="card bg-red-500 text-white px-4 py-2 rounded-md" @click="goToEmail">
                <i class="fa-solid fa-envelope"></i>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n.ts";
import { ref } from "vue";
const { t } = i18n.global;

const isExpanded = ref(false);

function toggleText() {
    isExpanded.value = true;
}

function goToGitHub() {
    window.open("https://github.com/gaunhaha", "_blank");
}

function goToLinkedIn() {
    window.open("https://www.linkedin.com/in/%E5%86%A0%E6%97%97-%E9%99%B3-34b48825b/", "_blank");
}

function goToEmail() {
    window.location.href = "mailto:gaunhaha@gmail.com";
}
</script>
<style scoped>
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.content {
    max-height: 0;
    transition: max-height 0.7s ease-out;
    overflow: hidden;
}
</style>