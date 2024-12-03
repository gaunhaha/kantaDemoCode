<template>
    <div class="work-experience-container">
        <h2 class="title">{{ t('Skill.WorkExperience.title') }}</h2>
        <div class="experience">
            <h3 class="position">{{ t('Skill.WorkExperience.1.position') }}</h3>
            <p class="company">{{ t('Skill.WorkExperience.1.company') }}</p>
            <ul class="responsibilities">
                <li>{{ t('Skill.WorkExperience.1.Responsibilities.1') }}</li>
                <li>{{ t('Skill.WorkExperience.1.Responsibilities.2') }}</li>
                <li>{{ t('Skill.WorkExperience.1.Responsibilities.3') }}</li>
                <li>{{ t('Skill.WorkExperience.1.Responsibilities.4') }}</li>
                <li>{{ t('Skill.WorkExperience.1.Responsibilities.5') }}</li>
                <li>{{ t('Skill.WorkExperience.1.Responsibilities.6') }}</li>
            </ul>
        </div>
        <div class="achievements">
            <h3 class="section-title">{{ t('Skill.WorkExperience.1.achievementTitle') }}</h3>
            <ul>
                <li>
                    <strong>{{ t('Skill.WorkExperience.1.Achievement1.title') }}</strong>
                    <p>
                        {{ t('Skill.WorkExperience.1.Achievement1.text') }}
                    </p>
                </li>
                <li>
                    <strong>{{ t('Skill.WorkExperience.1.Achievement2.title') }}</strong>
                    <p>
                        {{ t('Skill.WorkExperience.1.Achievement2.text') }}
                    </p>
                </li>
                <li>
                    <strong>{{ t('Skill.WorkExperience.1.Achievement3.title') }}</strong>
                    <p>
                        {{ t('Skill.WorkExperience.1.Achievement3.text') }}
                    </p>
                </li>
                <li>
                    <strong>{{ t('Skill.WorkExperience.1.Achievement4.title') }}</strong>
                    <p>
                        {{ t('Skill.WorkExperience.1.Achievement4.text') }}
                    </p>
                </li>
            </ul>
        </div>
        <br />
        
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<style scoped>
.work-experience-container {
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

.experience {
    margin-bottom: 20px;
}

.position {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 5px;
}

.company {
    font-size: 18px;
    color: #555;
    margin-bottom: 15px;
}

.responsibilities {
    list-style-type: disc;
    padding-left: 20px;
    margin-bottom: 20px;
}

.achievements {
    margin-top: 20px;
}

.section-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.achievements ul {
    list-style-type: circle;
    padding-left: 20px;
}

.achievements li {
    margin-bottom: 10px;
}
</style>