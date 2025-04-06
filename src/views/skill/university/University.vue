<template>
    <div class="flex justify-center mb-10">
        <p class="text-2xl font-bold text-primary">{{ t('Skill.University.title') }}</p>
    </div>
    <div class="flex flex-wrap gap-10 justify-center items-center">
        <div
            class="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-lg p-1 mb-8 transition-all duration-300 max-w-4xl mx-auto">
            <div class="bg-gray-50 w-full rounded-lg">
                <div class="card">
                    <p class="text-2xl font-bold mb-4">{{ t('Skill.University.1.title') }}</p>
                    <div class="border-b-2 border-gray-200 mb-4">
                        <img class="w-full h-28 object-cover" src="@/assets/images/Wanbao.png" alt="Wanbao Picture">
                    </div>
                </div>
            </div>
        </div>
        <div
            class="bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-lg p-1 mb-8 transition-all duration-300 max-w-4xl mx-auto">
            <div class="bg-gray-50 w-full rounded-lg">
                <div class="card">
                    <p class="text-2xl font-bold mb-4">{{ t('Skill.University.2.title') }}</p>
                    <div class="border-b-2 border-gray-200 mb-4">
                        <img class="w-full h-28 object-cover" src="@/assets/images/institution.jpg"
                            alt="Institution Picture">
                    </div>
                </div>
            </div>
        </div>
        <div
            class="bg-gradient-to-br from-cyan-500 via-teal-500 to-green-500 rounded-lg p-1 mb-8 transition-all duration-300 max-w-4xl mx-auto upTransition">
            <div id="university-graduation-project-competition-button" class="bg-gray-50 w-full rounded-lg cursor-pointer" @click="openYoutube">
                <div class="card">
                    <p class="text-2xl font-bold mb-4">{{ t('Skill.University.3.title') }}</p>
                    <div class="border-b-2 border-gray-200 mb-4">
                        <img class="w-full h-28 object-cover" src="@/assets/images/Graduation.png" alt="Graduation Picture">
                    </div>
                </div>
            </div>
        </div>
        <div
            class="bg-gradient-to-br from-green-500 via-lime-500 to-yellow-500 rounded-lg p-1 mb-8 transition-all duration-300 max-w-4xl mx-auto">
            <div class="bg-gray-50 w-full rounded-lg">
                <div class="card">
                    <p class="text-2xl font-bold mb-4">{{ t('Skill.University.4.title') }}</p>
                    <div class="border-b-2 border-gray-200 mb-4">
                        <img class="w-full h-28 object-cover" src="@/assets/images/presentation.png"
                            alt="Presentation Picture">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import i18n from "@/core/plugins/i18n/i18n.ts";
const { t } = i18n.global;
function openYoutube() {
    window.open('https://www.youtube.com/shorts/IHdd5cXa4FM', '_blank');
}
</script>
<style scoped>
.card {
    width: 300px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
}

.upTransition {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.upTransition:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
