<template>
    <div
        class="bg-gradient-to-br from-purple-600 via-violet-500 to-blue-500 rounded-lg p-1 mb-8 transition-all duration-300 max-w-4xl mx-auto">
        <div class="bg-gray-50 w-full rounded-lg">
            <div class="p-5 rounded-t-lg shadow-md">
                <h2 class="text-3xl font-bold mb-5 text-center">{{ t('Skill.Project.title') }}</h2>

                <!-- 網站開發項目 -->
                <div class="bg-white rounded p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
                    <ul class="list-disc pl-5 space-y-4 mb-8">
                        <li>
                            <strong>
                                <p class="mt-1 text-blue-500 font-bold text-lg">
                                    <a id="project-ntpcluckytemple-button" href="https://www.ntpcluckytemple.tw/" target="_blank">
                                        {{ t('Skill.Project.1.title') }}
                                    </a>
                                </p>
                            </strong>
                            <p class="mt-1">{{ t('Skill.Project.1.text') }}</p>
                        </li>

                        <li>
                            <strong>
                                <p class="mt-1 text-blue-500 font-bold text-lg">
                                    <a id="project-aicreate360-button" href="https://www.aicreate360.com/" target="_blank">
                                        {{ t('Skill.Project.2.title') }}
                                    </a>
                                </p>
                            </strong>
                            <p class="mt-1">{{ t('Skill.Project.2.text') }}</p>
                        </li>

                        <li>
                            <strong>
                                <p class="mt-1 font-bold text-lg">
                                    {{ t('Skill.Project.3.title') }}
                                </p>
                            </strong>
                            <p class="mt-1">{{ t('Skill.Project.3.text') }}</p>
                        </li>

                        <li>
                            <strong>
                                <p class="mt-1 font-bold text-lg">
                                    {{ t('Skill.Project.4.title') }}
                                </p>
                            </strong>
                            <p class="mt-1">{{ t('Skill.Project.4.text') }}</p>
                        </li>
                    </ul>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <ul class="list-disc pl-5 space-y-2">
                            <li>{{ t('Skill.Project.other.1') }}</li>
                            <li>{{ t('Skill.Project.other.2') }}</li>
                            <li>{{ t('Skill.Project.other.3') }}</li>
                            <li>{{ t('Skill.Project.other.4') }}</li>
                        </ul>
                        <ul class="list-disc pl-5 space-y-2">
                            <li>{{ t('Skill.Project.other.5') }}</li>
                            <li>{{ t('Skill.Project.other.6') }}</li>
                            <li>{{ t('Skill.Project.other.7') }}</li>
                            <li>{{ t('Skill.Project.other.8') }}</li>
                        </ul>
                        <ul class="list-disc pl-5 space-y-2">
                            <li>{{ t('Skill.Project.other.9') }}</li>
                            <li>{{ t('Skill.Project.other.10') }}</li>
                            <li>{{ t('Skill.Project.other.11') }}</li>
                            <li>{{ t('Skill.Project.other.12') }}</li>
                        </ul>
                        <ul class="list-disc pl-5 space-y-2">
                            <li>{{ t('Skill.Project.other.13') }}</li>
                            <li>{{ t('Skill.Project.other.14') }}</li>
                            <li>{{ t('Skill.Project.other.15') }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n";
const { t } = i18n.global;
</script>
