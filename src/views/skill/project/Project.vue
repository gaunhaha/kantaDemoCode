<template>
    <section class="shell">
        <SectionHeading eyebrow="Selected work" index="03" :title="t('Skill.Project.title')" />

        <!-- 主要專案 -->
        <div class="grid gap-5 md:grid-cols-2">
            <component v-for="(project, i) in featured" :key="project.key"
                :is="project.href ? 'a' : 'div'" :id="project.id" :href="project.href"
                :target="project.href ? '_blank' : undefined"
                :rel="project.href ? 'noopener noreferrer' : undefined"
                v-reveal="{ delay: i * 90, variant: 'blur' }" class="surface-interactive group block p-7 md:p-9">

                <div class="flex items-start justify-between gap-4">
                    <span class="font-mono text-xs text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
                    <i v-if="project.href"
                        class="fa-solid fa-arrow-up-right-from-square text-xs text-content-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-accent"></i>
                </div>

                <h3 class="mt-5 font-display text-xl font-semibold transition-colors duration-300"
                    :class="project.href ? 'text-content-strong group-hover:text-accent' : 'text-content-strong'">
                    {{ t(`Skill.Project.${project.key}.title`) }}
                </h3>
                <p class="mt-3 text-sm leading-relaxed text-content-muted">
                    {{ t(`Skill.Project.${project.key}.text`) }}
                </p>
            </component>
        </div>

        <!-- 接案專案 -->
        <h3 v-reveal="'fade'" class="mb-4 mt-12 font-mono text-[11px] uppercase tracking-[0.16em] text-content-faint">
            {{ t('Skill.Project.otherTitle') }}
        </h3>
        <div v-reveal="{ stagger: 40 }" class="flex flex-wrap gap-2.5">
            <span v-for="n in otherCount" :key="n"
                class="rounded-full border border-hairline/10 px-4 py-2 text-sm text-content-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-content-strong">
                {{ t(`Skill.Project.other.${n}`) }}
            </span>
        </div>
    </section>
</template>

<script setup lang="ts">
import i18n from '@/core/plugins/i18n/i18n';
import SectionHeading from '@/components/ui/SectionHeading.vue';

const { t } = i18n.global;

const featured = [
    { key: '1', href: 'https://www.momentx.ai/', id: 'project-momentx-button' },
    { key: '2', href: 'https://www.ntpcluckytemple.tw/', id: 'project-ntpcluckytemple-button' },
    { key: '3', href: 'https://www.aicreate360.com/', id: 'project-aicreate360-button' },
    { key: '4' },
    { key: '5' },
];

const otherCount = 10;
</script>
