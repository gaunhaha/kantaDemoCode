<template>
    <section class="shell">
        <SectionHeading eyebrow="University" index="05" :title="t('Skill.University.title')" />

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <component v-for="(award, i) in awards" :key="award.key" :is="award.onClick ? 'button' : 'div'"
                :id="award.id" @click="award.onClick" v-reveal="{ delay: i * 80, variant: 'scale' }"
                class="surface-interactive group block overflow-hidden text-left">

                <div class="relative h-36 overflow-hidden">
                    <img :src="award.image" :alt="t(`Skill.University.${award.key}.title`)"
                        class="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105" />
                    <div class="absolute inset-0 bg-ink-base/20 transition-colors duration-500 group-hover:bg-transparent"></div>

                    <!-- 可點擊的那張顯示播放提示 -->
                    <span v-if="award.onClick"
                        class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span class="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-contrast">
                            <i class="fa-solid fa-play text-xs"></i>
                        </span>
                    </span>
                </div>

                <div class="p-5">
                    <h3 class="text-sm font-semibold leading-snug text-content-strong transition-colors duration-300"
                        :class="{ 'group-hover:text-accent': award.onClick }">
                        {{ t(`Skill.University.${award.key}.title`) }}
                    </h3>
                </div>
            </component>
        </div>
    </section>
</template>

<script setup lang="ts">
import i18n from '@/core/plugins/i18n/i18n.ts';
import SectionHeading from '@/components/ui/SectionHeading.vue';
import wanbaoImg from '@/assets/images/Wanbao.png';
import institutionImg from '@/assets/images/institution.jpg';
import graduationImg from '@/assets/images/Graduation.png';
import presentationImg from '@/assets/images/presentation.png';

const { t } = i18n.global;

function openYoutube() {
    window.open('https://www.youtube.com/shorts/IHdd5cXa4FM', '_blank', 'noopener');
}

const awards = [
    { key: '1', image: wanbaoImg },
    { key: '2', image: institutionImg },
    {
        key: '3',
        image: graduationImg,
        onClick: openYoutube,
        id: 'university-graduation-project-competition-button',
    },
    { key: '4', image: presentationImg },
];
</script>
