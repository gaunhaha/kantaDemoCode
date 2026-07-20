<template>
    <section class="shell">
        <SectionHeading eyebrow="Beyond code" index="04" :title="t('Skill.OtherExperience.title')" />

        <div class="grid gap-5 md:grid-cols-2">
            <article v-for="(item, i) in items" :key="item.key" v-reveal="{ delay: i * 100, variant: 'scale' }"
                class="surface-interactive group overflow-hidden">

                <div class="relative h-44 overflow-hidden">
                    <img :src="item.image" :alt="t(`Skill.OtherExperience.${item.key}.title`)"
                        class="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105" />
                    <!-- 由下往上的漸層，讓標題壓在圖上仍然可讀 -->
                    <div class="absolute inset-0 bg-gradient-to-t from-ink-surface via-ink-surface/40 to-transparent"></div>
                    <h3 class="absolute inset-x-0 bottom-0 p-6 font-display text-lg font-semibold text-content-strong">
                        {{ t(`Skill.OtherExperience.${item.key}.title`) }}
                    </h3>
                </div>

                <div class="space-y-3 p-6 md:p-7">
                    <p v-for="n in 3" :key="n" class="text-sm leading-relaxed text-content-muted">
                        {{ t(`Skill.OtherExperience.${item.key}.text${n}`) }}
                    </p>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup lang="ts">
import i18n from '@/core/plugins/i18n/i18n.ts';
import SectionHeading from '@/components/ui/SectionHeading.vue';
import schoolImg from '@/assets/images/school.webp';
import volunteerImg from '@/assets/images/volunteer.webp';

const { t } = i18n.global;

const items = [
    { key: '1', image: schoolImg },
    { key: '2', image: volunteerImg },
];
</script>
