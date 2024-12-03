<template>
    <div class="grid justify-items-center p-6 gap-10">
        <div>
            <WorkExperience />
        </div>
        <div>
            <SideProject />
        </div>
        <div>
            <SkillList />
        </div>
        <div>
            <OtherExperience />
        </div>
        <div>
            <University />
        </div>
    </div>
</template>
<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n.ts";
import WorkExperience from "./workExperience/WorkExperience.vue";
import SideProject from "./sideProject/SideProject.vue";
import SkillList from "./skillList/skillList.vue";
import OtherExperience from "./otherExperience/OtherExperience.vue";
import University from "./university/University.vue";
const { t } = i18n.global;
</script>