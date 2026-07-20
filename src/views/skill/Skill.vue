<template>
    <div>
        <!-- 頁面標題 -->
        <header class="shell pb-8 pt-6 md:pb-16">
            <span v-reveal="'fade'" class="eyebrow">Résumé</span>
            <h1 v-reveal="{ delay: 80 }" class="mt-6 max-w-4xl font-display text-display-md font-bold text-content-strong">
                {{ t('Skill.SkillList.title') }} · {{ t('Skill.WorkExperience.title') }}
            </h1>
            <p v-reveal="{ delay: 160 }" class="mt-5 max-w-prose leading-relaxed text-content-muted">
                {{ t('Home.Hero.tagline') }}
            </p>
        </header>

        <div class="flex flex-col gap-28 pt-8 md:gap-40">
            <SkillList />
            <WorkExperience />
            <Project />
            <OtherExperience />
            <University />
        </div>
    </div>
</template>

<script setup lang="ts">
import i18n from '@/core/plugins/i18n/i18n.ts';
import SkillList from './skillList/skillList.vue';
import WorkExperience from './workExperience/WorkExperience.vue';
import Project from './project/Project.vue';
import OtherExperience from './otherExperience/OtherExperience.vue';
import University from './university/University.vue';

const { t } = i18n.global;
</script>
