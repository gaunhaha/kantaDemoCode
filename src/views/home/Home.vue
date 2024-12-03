<template>
    <div class="grid justify-items-center p-6 gap-4">
        <div @click="toggleText()"
            class="card w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded overflow-hidden shadow-lg bg-white">
            <img class="w-full h-48 object-cover"
                src="https://lh3.google.com/u/0/d/1ZAaG72nGnrSSwBxqFSuNwysih3xAHZuE=w1920-h953-iv1"
                alt="Profile Picture">
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
                <p class="text-gray-700 text-base">
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
                </p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n.ts";
import { computed, ref } from "vue";
const { t } = i18n.global;

const isExpanded = ref(false);

function toggleText() {
    isExpanded.value = true;
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