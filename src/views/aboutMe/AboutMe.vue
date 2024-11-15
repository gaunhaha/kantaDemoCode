<template>
    <div class="grid justify-items-center">
        <div class="p-10">
            <img class="max-h-96 rounded-md" id="profile-pic"
                src="https://lh3.google.com/u/0/d/1ZAaG72nGnrSSwBxqFSuNwysih3xAHZuE=w1920-h953-iv1" alt="pic">
        </div>
        <div class="flex flex-col max-w-screen-lg text-primary">
            <div>
                <span class="px-3"></span>
                {{ t('AboutMe.text1') }}
            </div>
            <br>
            <div>
                <span class="px-3"></span>
                {{ t('AboutMe.text2') }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n.ts";
const { t } = i18n.global;
</script>