<template>
    <div class="relative min-h-screen overflow-hidden">
        <div class="relative z-10">
            <div class="flex justify-center items-center p-6">
                <div class="carousel-container relative w-full max-w-2xl mx-auto">
                    <div class="relative h-[600px]">
                        <div class="cards-wrapper">
                            <div class="card w-full flex-shrink-0 rounded overflow-hidden shadow-lg bg-white"
                                :class="{ 
                                    'card-active': currentIndex === 0,
                                    'card-next': currentIndex === 1,
                                    'card-prev': currentIndex === 2
                                }"
                                @click="handleCardClick"
                            >
                                <div class="relative">
                                    <img class="w-full h-48 object-cover" src="@/assets/images/about me.jpg" alt="Kanta Picture">
                                    <div class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-b from-transparent to-white"></div>
                                </div>
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">{{ t('Home.AboutMe.title') }}</div>
                                    <p class="text-gray-700 text-base">
                                        {{ t('Home.AboutMe.text1') }}
                                    </p>
                                </div>
                            </div>
                            
                            <div class="card w-full flex-shrink-0 rounded overflow-hidden shadow-lg bg-white"
                                :class="{
                                    'card-active': currentIndex === 1,
                                    'card-next': currentIndex === 2,
                                    'card-prev': currentIndex === 0
                                }"
                                @click="handleCardClick"
                            >
                                <div class="px-6 py-4 relative">
                                    <div class="flex flex-col h-full">
                                        <div class="flex-grow">
                                            <div class="font-bold text-xl mb-2">{{ t('Home.Stack.title') }}</div>
                                            <div class="text-gray-700 text-base">
                                                {{ t('Home.Stack.text') }}
                                                <ul>
                                                    <li class="py-1">• Vue.js</li>
                                                    <li class="py-1">• TypeScript</li>
                                                    <li class="py-1">• Vue Router</li>
                                                    <li class="py-1">• Pinia</li>
                                                    <li class="py-1">• i18n</li>
                                                    <li class="py-1">• Axios</li>
                                                    <li class="py-1">• Vite</li>
                                                    <li class="py-1">• Tailwind CSS</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <img 
                                                src="@/assets/images/bookcase.png" 
                                                alt="Bookcase" 
                                                class="w-48 sm:w-56 md:w-64 lg:w-80 h-auto opacity-80 ml-auto"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card w-full flex-shrink-0 rounded overflow-hidden shadow-lg bg-white"
                                :class="{
                                    'card-active': currentIndex === 2,
                                    'card-next': currentIndex === 0,
                                    'card-prev': currentIndex === 1
                                }"
                                @click="handleCardClick"
                            >
                                <div class="px-6 py-4 relative">
                                    <div class="flex flex-col h-full">
                                        <div class="flex-grow">
                                            <div class="font-bold text-xl mb-2">{{ t('Home.AboutMe.title') }} - {{ t('Home.AboutMe.more') }}</div>
                                            <p class="text-gray-700 text-base mt-4">
                                                {{ t('Home.AboutMe.text2') }}
                                            </p>
                                            <p class="text-gray-700 text-base mt-4">
                                                {{ t('Home.AboutMe.text3') }}
                                            </p>
                                        </div>
                                        <div class="mt-4">
                                            <img 
                                                src="@/assets/images/good.png" 
                                                alt="Thumbs up" 
                                                class="w-20 sm:w-48 md:w-56 lg:w-64 h-auto opacity-80 ml-auto"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center gap-4 mt-6 rounded-lg p-4 shadow-lg relative overflow-hidden social-container" 
                 style="background: white">
                <div class="sliding-car">
                    <img 
                        src="@/assets/images/car.png" 
                        alt="Moving car" 
                        class="w-20 h-auto"
                    >
                </div>
                <button class="social-btn bg-gray-800 text-white px-6 py-4 rounded-md" @click="goToGitHub">
                    <i class="fa-brands fa-github text-2xl"></i>
                </button>
                <button class="social-btn bg-blue-500 text-white px-6 py-4 rounded-md" @click="goToLinkedIn">
                    <i class="fa-brands fa-linkedin text-2xl"></i>
                </button>
                <button class="social-btn bg-red-500 text-white px-6 py-4 rounded-md" @click="goToEmail">
                    <i class="fa-solid fa-envelope text-2xl"></i>
                </button>
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
</script>

<style scoped>
.cards-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
}

.card {
    position: absolute;
    width: 100%;
    max-width: 600px;
    min-height: 500px;
    max-height: 500px;
    transition: all 0.5s ease;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: column;
}

.card > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
}

.card .px-6 {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.card-active {
    left: 50%;
    transform: translateX(-50%) scale(1);
    z-index: 3;
    opacity: 1;
}

.card-next {
    left: 60%;
    transform: translateX(0%) scale(0.85);
    z-index: 2;
    opacity: 0.7;
}

.card-prev {
    left: 40%;
    transform: translateX(-100%) scale(0.85);
    z-index: 1;
    opacity: 0.7;
}

.content {
    transition: max-height 0.7s ease-out;
    overflow: visible;
}

.card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-active:hover {
    transform: translateX(-50%) translateY(-5px) scale(1.02);
}

.card-next:hover {
    transform: translateX(0%) translateY(-5px) scale(0.87);
}

.card-prev:hover {
    transform: translateX(-100%) translateY(-5px) scale(0.87);
}

.carousel-container {
    perspective: 1000px;
}

.carousel-container button {
    opacity: 0.7;
    transition: opacity 0.3s ease;
}

.carousel-container button:hover {
    opacity: 1;
}

.social-btn {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.social-btn:hover {
    transform: translateY(-12px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.social-container {
    isolation: isolate;
}

.sliding-car {
    position: absolute;
    top: 50%;
    right: -100%;
    transform: translateY(-50%);
    animation: slide 8s linear infinite;
    z-index: -1;
}

@keyframes slide {
    0% {
        right: -100%;
    }
    45% {
        right: 45%;
    }
    55% {
        right: 55%;
    }
    100% {
        right: 200%;
    }
}
</style>