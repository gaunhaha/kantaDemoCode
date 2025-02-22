<template>
    <div
        class="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-lg p-1 mb-8 transition-all duration-300 hover:shadow-xl max-w-4xl mx-auto">
        <div class=" bg-gray-50 w-full rounded-lg">
            <div class="p-5 rounded-t-lg shadow-md">
                <h2 class="text-3xl font-bold mb-5 text-center">{{ t('Skill.SkillList.title') }}</h2>

                <div class="flex flex-col gap-5">
                    <!-- 後端技能 -->
                    <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-bold mb-3">{{ t('Skill.SkillList.backend') }}</h3>
                        <p class="text-gray-700">ASP.NET Core、C#、Spring Boot、Java、Node.js、C++</p>
                    </div>

                    <!-- 前端技能 -->
                    <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-bold mb-3">{{ t('Skill.SkillList.frontend') }}</h3>
                        <p class="text-gray-700">jQuery、Vue.js、React、Angular、Bootstrap 5、Tailwind CSS、element-plus</p>
                    </div>

                    <!-- 資料庫 -->
                    <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-bold mb-3">{{ t('Skill.SkillList.database') }}</h3>
                        <p class="text-gray-700">SQL Server、MS SQL、Firebase、MySQL</p>
                    </div>

                    <!-- 版本控制 -->
                    <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-bold mb-3">{{ t('Skill.SkillList.versionControl') }}</h3>
                        <p class="text-gray-700">Git、GitHub、GitLab</p>
                    </div>

                    <!-- 其他技能 -->
                    <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-bold mb-3">{{ t('Skill.SkillList.other') }}</h3>
                        <p class="text-gray-700">Git Actions、Docker、PM2</p>
                    </div>

                    <!-- 語言能力 -->
                    <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 class="text-xl font-bold mb-3">{{ t('Skill.SkillList.languageAbility') }}</h3>
                        <p class="text-gray-700">{{ t('Skill.SkillList.languageAbilityText') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n.ts";
const { t } = i18n.global;
</script>