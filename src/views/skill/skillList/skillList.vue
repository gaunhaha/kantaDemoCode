<template>
    <section class="shell">
        <SectionHeading eyebrow="Toolbox" index="01" :title="t('Skill.SkillList.title')" />

        <div class="grid gap-px overflow-hidden rounded-card border border-hairline/8 bg-hairline/8 md:grid-cols-2">
            <div v-for="(group, i) in groups" :key="group.labelKey" v-reveal="{ delay: i * 70 }"
                class="group bg-ink-base p-7 transition-colors duration-500 hover:bg-ink-surface md:p-9">
                <div class="flex items-center gap-3">
                    <i :class="group.icon"
                        class="w-4 text-center text-sm text-content-faint transition-colors duration-300 group-hover:text-accent"></i>
                    <h3 class="font-display text-lg font-semibold text-content-strong">
                        {{ t(group.labelKey) }}
                    </h3>
                </div>

                <!-- 語言能力是一段敘述，其餘是可拆成標籤的技術清單 -->
                <p v-if="group.text" class="mt-5 text-sm leading-relaxed text-content-muted">
                    {{ t(group.text) }}
                </p>
                <div v-else class="mt-5 flex flex-wrap gap-2">
                    <span v-for="item in group.items" :key="item" class="pill">{{ item }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import i18n from '@/core/plugins/i18n/i18n.ts';
import SectionHeading from '@/components/ui/SectionHeading.vue';

const { t } = i18n.global;

// 技術名稱不需要翻譯，只有分類標題走 i18n
const groups = [
    {
        labelKey: 'Skill.SkillList.frontendFramework',
        icon: 'fa-solid fa-layer-group',
        items: ['Vue 3', 'Vue 2', 'Nuxt.js', 'Pinia', 'Vue Router', 'Vuex', 'Composition API', 'Options API'],
    },
    {
        labelKey: 'Skill.SkillList.languages',
        icon: 'fa-solid fa-code',
        items: ['JavaScript (ES6+)', 'TypeScript'],
    },
    {
        labelKey: 'Skill.SkillList.frontendDev',
        icon: 'fa-solid fa-pen-ruler',
        items: ['HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Bootstrap 5', 'Vite', 'Webpack'],
    },
    {
        labelKey: 'Skill.SkillList.api',
        icon: 'fa-solid fa-plug',
        items: ['Axios', 'GraphQL', 'RESTful API', 'WebSocket'],
    },
    {
        labelKey: 'Skill.SkillList.devops',
        icon: 'fa-solid fa-code-branch',
        items: ['Git', 'GitHub', 'GitLab', 'Docker', 'PM2', 'Nginx', 'GitHub Actions', 'Vercel'],
    },
    {
        labelKey: 'Skill.SkillList.otherFrontend',
        icon: 'fa-solid fa-shapes',
        items: ['jQuery', 'React', 'Angular', 'Flutter'],
    },
    {
        labelKey: 'Skill.SkillList.backend',
        icon: 'fa-solid fa-server',
        items: ['Node.js', 'ASP.NET Core', 'Spring Boot', 'Golang', 'C++'],
    },
    {
        labelKey: 'Skill.SkillList.database',
        icon: 'fa-solid fa-database',
        items: ['Firebase', 'SQL Server', 'MySQL'],
    },
    {
        labelKey: 'Skill.SkillList.tracking',
        icon: 'fa-solid fa-chart-line',
        items: ['Google Analytics', 'Google Tag Manager'],
    },
    {
        labelKey: 'Skill.SkillList.languageAbility',
        icon: 'fa-solid fa-language',
        text: 'Skill.SkillList.languageAbilityText',
    },
];
</script>
