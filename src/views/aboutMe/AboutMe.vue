<template>
    <div class="grid justify-items-center p-6">
        <div class="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded overflow-hidden shadow-lg bg-white">
            <img class="w-full" src="https://lh3.google.com/u/0/d/1ZAaG72nGnrSSwBxqFSuNwysih3xAHZuE=w1920-h953-iv1"
                alt="Profile Picture">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{{ t('AboutMe.title') }}</div>
                <p class="text-gray-700 text-base">
                    {{ t('AboutMe.text1') }}
                </p>
                <p class="text-gray-700 text-base mt-4">
                    {{ t('AboutMe.text2') }}
                </p>
                <p class="text-gray-700 text-base mt-4">
                    {{ t('AboutMe.text3') }}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n.ts";
const { t } = i18n.global;
</script>