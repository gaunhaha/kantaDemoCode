<template>
    <div class="flex flex-wrap gap-10 justify-center items-center">
        <!-- 學校經驗 -->
        <div class="bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-lg p-1 mb-8 transition-all duration-300 max-w-md">
            <div class="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow max-w-[400px]">
                <p class="text-2xl font-bold mb-4">{{ t('Skill.OtherExperience.1.title') }}</p>
                <div class="border-b-2 border-gray-200 mb-4">
                    <img class="w-full h-28 object-cover rounded-t-lg" src="@/assets/images/school.webp"
                        alt="School Picture">
                </div>
                <p class="text-gray-700 mb-4">{{ t('Skill.OtherExperience.1.text1') }}</p>
                <ul class="list-disc pl-5 space-y-2 text-gray-700">
                    <li>{{ t('Skill.OtherExperience.1.text2') }}</li>
                    <li>{{ t('Skill.OtherExperience.1.text3') }}</li>
                </ul>
            </div>
        </div>
        <!-- 志工經驗 -->
        <div class="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-lg p-1 mb-8 transition-all duration-300 max-w-md">
            <div class="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow max-w-[400px]">
                <p class="text-2xl font-bold mb-4">{{ t('Skill.OtherExperience.2.title') }}</p>
                <div class="border-b-2 border-gray-200 mb-4">
                    <img class="w-full h-28 object-cover rounded-t-lg" src="@/assets/images/volunteer.webp"
                        alt="Volunteer Picture">
                </div>
                <div class="space-y-4 text-gray-700">
                    <p>{{ t('Skill.OtherExperience.2.text1') }}</p>
                    <p>{{ t('Skill.OtherExperience.2.text2') }}</p>
                    <p>{{ t('Skill.OtherExperience.2.text3') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n.ts";
const { t } = i18n.global;
</script>