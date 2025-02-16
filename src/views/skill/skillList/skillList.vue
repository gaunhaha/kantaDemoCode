<template>
    <div class="skill-list-container">
        <h1 class="title">{{ t('Skill.SkillList.title') }}</h1>
        <div class="skills-section">
            <div class="skill-category">
                <h2 class="section-title">{{ t('Skill.SkillList.backend') }}</h2>
                <p>ASP.NET Core、C#、Spring Boot、Java、Node.js、C++</p>
            </div>
            <div class="skill-category">
                <h2 class="section-title">{{ t('Skill.SkillList.frontend') }}</h2>
                <p>jQuery、Vue.js、React、Angular、Bootstrap 5、Tailwind CSS、element-plus</p>
            </div>
            <div class="skill-category">
                <h2 class="section-title">{{ t('Skill.SkillList.database') }}</h2>
                <p>SQL Server、MS SQL、Firebase、MySQL</p>
            </div>
            <div class="skill-category">
                <h2 class="section-title">{{ t('Skill.SkillList.versionControl') }}</h2>
                <p>Git、GitHub、GitLab</p>
            </div>
            <div class="skill-category">
                <h2 class="section-title">{{ t('Skill.SkillList.other') }}</h2>
                <p>Git Actions、Docker、PM2</p>
            </div>
            <div class="skill-category">
                <h2 class="section-title">{{ t('Skill.SkillList.languageAbility') }}</h2>
                <p>{{ t('Skill.SkillList.languageAbilityText') }}</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n.ts";
const { t } = i18n.global;
</script>
<style scoped>
.skill-list-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}

.skills-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.skill-category {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>