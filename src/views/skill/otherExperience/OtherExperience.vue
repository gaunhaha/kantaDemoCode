<template>
    <div class="flex flex-wrap gap-10 justify-center items-center">
        <div class="card">
            <p class="text-2xl font-bold mb-4">{{ t('Skill.OtherExperience.1.title') }}</p>
            <div class="border-b-2 border-gray-200 mb-4">
                <img class="w-full h-28 object-cover"
                    src="https://lh3.google.com/u/0/d/1EyKSUlUqWIDqIsmmsR_hSNtkDDWG1bFO=w958-h952-iv1"
                    alt="School Picture">
            </div>
            <p>{{ t('Skill.OtherExperience.1.text1') }}</p>
            <ul>
                <li>{{ t('Skill.OtherExperience.1.text2') }}</li>
                <li>{{ t('Skill.OtherExperience.1.text3') }}</li>
            </ul>
        </div>
        <div class="card">
            <p class="text-2xl font-bold mb-4">{{ t('Skill.OtherExperience.2.title') }}</p>
            <div class="border-b-2 border-gray-200 mb-4">
                <img class="w-full h-28 object-cover"
                    src="https://lh3.google.com/u/0/d/1Y2LQkXKTbAzCDss2nvg0-uL05BnTgruF=w958-h952-iv1"
                    alt="Volunteer Picture">
            </div>
            <p>{{ t('Skill.OtherExperience.2.text1') }}</p>
            <p>{{ t('Skill.OtherExperience.2.text2') }}</p>
            <p>{{ t('Skill.OtherExperience.2.text3') }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n.ts";
const { t } = i18n.global;
</script>
<style scoped>
.card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 400px;
    box-sizing: border-box;
}
</style>