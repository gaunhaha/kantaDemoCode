<template>
    <div class="relative overflow-hidden">
        <div class="relative z-10">
            <div class="flex justify-center items-center p-6">
                <div class="carousel-container relative w-full max-w-2xl mx-auto">
                    <div class="flex flex-col gap-6">
                        <div
                            class="card w-full flex-shrink-0 rounded overflow-hidden shadow-lg bg-gradient-to-br from-purple-600 via-violet-500 to-blue-500">
                            <div class="p-1">
                                <div class="p-6 bg-white rounded">
                                    <h2 class="text-2xl font-bold mb-4">{{ t('Home.Stack.title') }}</h2>
                                    <p class="text-gray-700">{{ t('Home.Stack.text') }}</p>
                                    <ul>
                                        <li class="py-1">• Vite</li>
                                        <li class="py-1">• TypeScript</li>
                                        <li class="py-1">• Vue.js</li>
                                        <li class="py-1">• Element Plus</li>
                                        <li class="py-1">• Vue Router</li>
                                        <li class="py-1">• Pinia</li>
                                        <li class="py-1">• i18n</li>
                                        <li class="py-1">• Axios</li>
                                        <li class="py-1">• Tailwind CSS</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- About Me Cards -->
                        <div class="flex flex-col gap-6">
                            <h2 class="text-2xl font-bold text-primary">{{ t('Home.AboutMe.title') }}</h2>

                            <div class="card w-full flex-shrink-0 rounded overflow-hidden shadow-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500">
                                <div class="p-1">
                                    <div class="p-6 bg-white rounded">
                                        <p class="text-gray-700" v-html="formatBoldText(t('Home.AboutMe.text1'))"></p>
                                    </div>
                                </div>
                            </div>

                            <div class="card w-full flex-shrink-0 rounded overflow-hidden shadow-lg bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
                                <div class="p-1">
                                    <div class="p-6 bg-white rounded">
                                        <p class="text-gray-700" v-html="formatBoldText(t('Home.AboutMe.text2'))"></p>
                                    </div>
                                </div>
                            </div>

                            <div class="card w-full flex-shrink-0 rounded overflow-hidden shadow-lg bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500">
                                <div class="p-1">
                                    <div class="p-6 bg-white rounded">
                                        <p class="text-gray-700" v-html="formatBoldText(t('Home.AboutMe.text3'))"></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- More button card -->
                        <div class="card w-full flex-shrink-0 rounded overflow-hidden shadow-lg bg-gradient-to-br from-yellow-500 via-green-500 to-teal-500">
                            <div class="p-1">
                                <div class="p-6 bg-white rounded" id="more-button">
                                    <router-link to="/skill" class="text-blue-500 hover:text-blue-700 font-bold">
                                        {{ t('Home.AboutMe.more') }} →
                                    </router-link>
                                </div>
                            </div>
                        </div>

                        <!-- 社交媒體卡片 -->
                        <div class="flex flex-col md:flex-row justify-between gap-4">
                            <div class="card flex-1 rounded overflow-hidden shadow-lg bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500">
                                <div class="p-1">
                                    <div class="p-6 bg-white rounded">
                                        <button id="github-button" class="w-full text-center" @click="goToGitHub">
                                            <i class="fa-brands fa-github text-3xl mb-2 text-gray-800"></i>
                                            <p class="text-gray-700">GitHub</p>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="card flex-1 rounded overflow-hidden shadow-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500">
                                <div class="p-1">
                                    <div class="p-6 bg-white rounded">
                                        <button id="linkedin-button" class="w-full text-center" @click="goToLinkedIn">
                                            <i class="fa-brands fa-linkedin text-3xl mb-2 text-blue-500"></i>
                                            <p class="text-gray-700">LinkedIn</p>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="card flex-1 rounded overflow-hidden shadow-lg bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500">
                                <div class="p-1">
                                    <div class="p-6 bg-white rounded">
                                        <button class="w-full text-center" @click="goToEmail">
                                            <i class="fa-solid fa-envelope text-3xl mb-2 text-red-500"></i>
                                            <p class="text-gray-700">Email</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n.ts";
import { ref } from "vue";
const { t } = i18n.global;

const currentIndex = ref(0);

function nextSlide() {
    currentIndex.value = (currentIndex.value + 1) % 3;
}

function prevSlide() {
    currentIndex.value = currentIndex.value === 0 ? 2 : currentIndex.value - 1;
}

function handleCardClick(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    if (target.classList.contains('card-prev')) {
        nextSlide();
    } else if (target.classList.contains('card-next')) {
        prevSlide();
    }
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

function formatBoldText(text: string) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-500">$1</strong>');
}
</script>

<style scoped>
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* 手機版調整 */
@media (max-width: 640px) {
    .carousel-container {
        padding: 0 1rem;
    }
}

/* 深色模式下的藍色文字調整 */
:deep(.text-blue-500) {
    @apply dark:text-blue-400;
}
</style>