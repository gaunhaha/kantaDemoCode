<template>
    <section class="shell">
        <SectionHeading eyebrow="Career" index="02" :title="t('Skill.WorkExperience.title')" />

        <!-- 時間軸：左側一條貫穿的線，每份工作是線上的一個節點 -->
        <div class="relative">
            <span class="absolute left-[7px] top-2 bottom-2 w-px bg-hairline/10 md:left-[9px]" aria-hidden="true"></span>

            <article v-for="job in jobs" :key="job.key" v-reveal="{ delay: 40 }"
                class="relative pl-8 pb-12 last:pb-0 md:pl-14">

                <!-- 節點 -->
                <span class="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center md:h-[19px] md:w-[19px]">
                    <span v-if="job.current"
                        class="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent"></span>
                    <span class="relative h-2.5 w-2.5 rounded-full ring-4 ring-ink-base md:h-3 md:w-3"
                        :class="job.current ? 'bg-accent' : 'bg-hairline/25'"></span>
                </span>

                <div class="group surface-interactive p-6 md:p-8">
                    <!-- 職稱、公司、期間 -->
                    <header class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                        <div>
                            <h3 class="font-display text-xl font-semibold text-content-strong md:text-2xl">
                                {{ t(`Skill.WorkExperience.${job.key}.position`) }}
                            </h3>
                            <p class="mt-1.5 text-sm text-accent">
                                {{ t(`Skill.WorkExperience.${job.key}.company`) }}
                            </p>
                        </div>

                        <div class="text-right">
                            <span v-if="has(job.key, 'period')"
                                class="block font-mono text-xs text-content-muted">
                                {{ t(`Skill.WorkExperience.${job.key}.period`) }}
                            </span>
                            <span v-if="has(job.key, 'location')"
                                class="mt-1 block text-xs text-content-faint">
                                {{ t(`Skill.WorkExperience.${job.key}.location`) }}
                            </span>
                        </div>
                    </header>

                    <p v-if="job.introKey" class="mt-5 leading-relaxed text-content-muted">
                        {{ t(job.introKey) }}
                    </p>

                    <!-- 各小節 -->
                    <div v-for="(section, si) in job.sections" :key="si" class="mt-7 first:mt-6">
                        <h4 v-if="section.headingKey"
                            class="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-content-faint">
                            {{ t(section.headingKey) }}
                        </h4>

                        <div class="space-y-4">
                            <div v-for="(entry, ei) in section.entries" :key="ei">
                                <!-- 有標題的項目（成就） -->
                                <template v-if="entry.titleKey">
                                    <h5 class="text-[15px] font-semibold text-content-strong">
                                        <a v-if="entry.titleLink" :id="entry.titleLink.id" :href="entry.titleLink.href"
                                            target="_blank" rel="noopener noreferrer" class="link-underline text-accent">
                                            {{ t(entry.titleKey) }}
                                            <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-[9px]"></i>
                                        </a>
                                        <template v-else>{{ t(entry.titleKey) }}</template>
                                    </h5>

                                    <p v-for="(text, ti) in entry.texts" :key="ti"
                                        class="mt-2 text-sm leading-relaxed text-content-muted">
                                        <a v-if="typeof text !== 'string'" :id="text.id" :href="text.href"
                                            target="_blank" rel="noopener noreferrer" class="link-underline text-accent">
                                            {{ t(text.key) }}
                                            <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-[9px]"></i>
                                        </a>
                                        <template v-else>{{ t(text) }}</template>
                                    </p>
                                </template>

                                <!-- 沒有標題的項目：條列 -->
                                <ul v-else class="space-y-2.5">
                                    <li v-for="(text, ti) in entry.texts" :key="ti"
                                        class="flex gap-3 text-sm leading-relaxed text-content-muted">
                                        <span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/60"></span>
                                        <span>
                                            <a v-if="typeof text !== 'string'" :id="text.id" :href="text.href"
                                                target="_blank" rel="noopener noreferrer"
                                                class="link-underline text-accent">
                                                {{ t(text.key) }}
                                            </a>
                                            <template v-else>{{ t(text) }}</template>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup lang="ts">
import i18n from '@/core/plugins/i18n/i18n';
import SectionHeading from '@/components/ui/SectionHeading.vue';
import { jobs } from './jobs';

const { t, te } = i18n.global;

/** 期間、地點並非每份工作都有（例如早期經歷），沒有就不渲染 */
const has = (jobKey: string, field: string) => te(`Skill.WorkExperience.${jobKey}.${field}`);
</script>
