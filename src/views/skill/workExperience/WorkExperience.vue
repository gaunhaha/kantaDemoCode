<template>
    <div
        class="bg-gradient-to-br from-purple-600 via-violet-500 to-blue-500 rounded-lg p-1 mb-8 transition-all duration-300 max-w-4xl mx-auto">
        <div class=" bg-gray-50 w-full rounded-lg">
            <div class=" p-5 rounded-t-lg shadow-md">
                <h2 class="text-3xl font-bold mb-5 text-center">{{ t('Skill.WorkExperience.title') }}</h2>

                <!-- 第零份工作 -->
                <div class="bg-white rounded p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 class="text-2xl font-bold mb-1">{{ t('Skill.WorkExperience.0.position') }}</h3>
                    <p class="text-lg text-gray-600 mb-4">{{ t('Skill.WorkExperience.0.company') }}</p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>
                            {{ t('Skill.WorkExperience.0.text1') }}
                        </li>
                        <li>
                            {{ t('Skill.WorkExperience.0.text2') }}
                        </li>
                        <li>
                            {{ t('Skill.WorkExperience.0.text3') }}
                        </li>
                    </ul>
                </div>

                <!-- 第一份工作 -->
                <div class="bg-white rounded p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 class="text-2xl font-bold mb-1">{{ t('Skill.WorkExperience.1.position') }}</h3>
                    <p class="text-lg text-gray-600 mb-4">{{ t('Skill.WorkExperience.1.company') }}</p>
                    <ul class="list-disc pl-5 space-y-2 mb-8">
                        <li>
                            {{ t('Skill.WorkExperience.1.Responsibilities.frontend.title') }}：
                            <ul class="list-circle pl-5 mt-2 space-y-1">
                                <li>{{ t('Skill.WorkExperience.1.Responsibilities.frontend.item1') }}</li>
                                <li>{{ t('Skill.WorkExperience.1.Responsibilities.frontend.item2') }}</li>
                                <li>{{ t('Skill.WorkExperience.1.Responsibilities.frontend.item3') }}</li>
                                <li>{{ t('Skill.WorkExperience.1.Responsibilities.frontend.item4') }}</li>
                                <li>{{ t('Skill.WorkExperience.1.Responsibilities.frontend.item5') }}</li>
                                <li>{{ t('Skill.WorkExperience.1.Responsibilities.frontend.item6') }}</li>
                            </ul>
                        </li>
                        <li>
                            {{ t('Skill.WorkExperience.1.Responsibilities.devops.title') }}：
                            <ul class="list-circle pl-5 mt-2 space-y-1">
                                <li>{{ t('Skill.WorkExperience.1.Responsibilities.devops.item1') }}</li>
                                <li>{{ t('Skill.WorkExperience.1.Responsibilities.devops.item2') }}</li>
                            </ul>
                        </li>
                    </ul>
                    <h3 class="text-xl font-bold mb-4">{{ t('Skill.WorkExperience.1.achievementTitle') }}</h3>
                    <ul class="list-disc pl-5 space-y-4">
                        <li>
                            <strong>{{ t('Skill.WorkExperience.1.Achievement1.title') }}</strong>
                            <p class="mt-1 text-blue-500">
                                <a id="work-experience-ntpc-button" href="https://www.ntpc.gov.tw/ch/home.jsp?id=e8ca970cde5c00e1&dataserno=22ebd8830714b0d622280be4dfc913be"
                                    target="_blank">
                                    {{ t('Skill.WorkExperience.1.Achievement1.text1') }}
                                </a>
                            </p>
                            <p class="mt-1 text-blue-500">
                                <a id="work-experience-ntpcluckytemple-button" href="https://www.ntpcluckytemple.tw/zh-TW" target="_blank">
                                    {{ t('Skill.WorkExperience.1.Achievement1.text2') }}
                                </a>
                            </p>
                            <p class="mt-1">
                                {{ t('Skill.WorkExperience.1.Achievement1.text3') }}
                            </p>
                        </li>
                        <li>
                            <strong class="text-blue-500">
                                <a id="work-experience-aicreate360-button" href="https://www.aicreate360.com/" target="_blank">
                                    {{ t('Skill.WorkExperience.1.Achievement2.title') }}
                                </a>
                            </strong>
                            <p class="mt-1">{{ t('Skill.WorkExperience.1.Achievement2.text') }}</p>
                            <p class="mt-1">{{ t('Skill.WorkExperience.1.Achievement2.text2') }}</p>
                        </li>
                        <li>
                            <strong>{{ t('Skill.WorkExperience.1.Achievement3.title') }}</strong>
                            <p class="mt-1">{{ t('Skill.WorkExperience.1.Achievement3.text') }}</p>
                        </li>
                    </ul>
                </div>

                <!-- 第二份工作 -->
                <div class="bg-white rounded p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 class="text-2xl font-bold mb-1">{{ t('Skill.WorkExperience.2.position') }}</h3>
                    <p class="text-lg text-gray-600 mb-4">{{ t('Skill.WorkExperience.2.company') }}</p>
                    <ul class="list-disc pl-5 space-y-2 mb-8">
                        <li>{{ t('Skill.WorkExperience.2.Responsibilities.1') }}</li>
                        <li>{{ t('Skill.WorkExperience.2.Responsibilities.2') }}</li>
                        <li>{{ t('Skill.WorkExperience.2.Responsibilities.3') }}</li>
                        <li>{{ t('Skill.WorkExperience.2.Responsibilities.4') }}</li>
                        <li>{{ t('Skill.WorkExperience.2.Responsibilities.5') }}</li>
                        <li>{{ t('Skill.WorkExperience.2.Responsibilities.6') }}</li>
                    </ul>
                    <h3 class="text-xl font-bold mb-4">{{ t('Skill.WorkExperience.2.achievementTitle') }}</h3>
                    <ul class="list-disc pl-5 space-y-4">
                        <li>
                            <strong>{{ t('Skill.WorkExperience.2.Achievement1.title') }}</strong>
                            <p class="mt-1">{{ t('Skill.WorkExperience.2.Achievement1.text') }}</p>
                        </li>
                        <li>
                            <strong>{{ t('Skill.WorkExperience.2.Achievement2.title') }}</strong>
                            <p class="mt-1">{{ t('Skill.WorkExperience.2.Achievement2.text') }}</p>
                        </li>
                        <li>
                            <strong>{{ t('Skill.WorkExperience.2.Achievement3.title') }}</strong>
                            <p class="mt-1">{{ t('Skill.WorkExperience.2.Achievement3.text') }}</p>
                        </li>
                        <li>
                            <strong>{{ t('Skill.WorkExperience.2.Achievement4.title') }}</strong>
                            <p class="mt-1">{{ t('Skill.WorkExperience.2.Achievement4.text') }}</p>
                        </li>
                    </ul>
                </div>

                <!-- 第三份工作 -->
                <div class="bg-white rounded p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 class="text-2xl font-bold mb-1">{{ t('Skill.WorkExperience.3.position') }}</h3>
                    <p class="text-lg text-gray-600 mb-4">{{ t('Skill.WorkExperience.3.company') }}</p>
                    <ul class="list-disc pl-5 space-y-4">
                        <li>
                            <strong>{{ t('Skill.WorkExperience.3.Achievement1.title') }}</strong>
                            <p class="mt-1">{{ t('Skill.WorkExperience.3.Achievement1.text') }}</p>
                        </li>
                        <li>
                            <strong>{{ t('Skill.WorkExperience.3.Achievement2.title') }}</strong>
                            <p class="mt-1">{{ t('Skill.WorkExperience.3.Achievement2.text') }}</p>
                        </li>
                        <li>
                            <strong>{{ t('Skill.WorkExperience.3.Achievement3.title') }}</strong>
                            <p class="mt-1">{{ t('Skill.WorkExperience.3.Achievement3.text') }}</p>
                        </li>
                    </ul>
                </div>

                <!-- 第四份工作 -->
                <div class="bg-white rounded p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 class="text-2xl font-bold mb-1">{{ t('Skill.WorkExperience.4.position') }}</h3>
                    <p class="text-lg text-gray-600 mb-4">{{ t('Skill.WorkExperience.4.company') }}</p>
                    <ul class="list-disc pl-5 space-y-4">
                        <li>
                            <strong>{{ t('Skill.WorkExperience.4.Achievement1.title') }}</strong>
                            <p class="mt-1">{{ t('Skill.WorkExperience.4.Achievement1.text') }}</p>
                        </li>
                    </ul>
                </div>

                <!-- 第五份工作 -->
                <div class="bg-white rounded p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 class="text-2xl font-bold mb-1">{{ t('Skill.WorkExperience.5.position') }}</h3>
                    <p class="text-lg text-gray-600 mb-4">{{ t('Skill.WorkExperience.5.company') }}</p>
                    <ul class="list-disc pl-5">
                        <li>{{ t('Skill.WorkExperience.5.Responsibilities.1') }}</li>
                        <li>{{ t('Skill.WorkExperience.5.Responsibilities.2') }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n";
const { t } = i18n.global;
</script>