<template>
    <div class="mb-12 md:mb-16" :class="align === 'center' ? 'text-center' : ''">
        <div v-reveal="'fade'" class="flex" :class="align === 'center' ? 'justify-center' : ''">
            <span class="eyebrow">
                <span v-if="index" class="text-accent">{{ index }}</span>
                {{ eyebrow }}
            </span>
        </div>

        <h2 v-reveal="{ delay: 80 }"
            class="mt-5 font-display text-display-md font-bold text-content-strong">
            {{ title }}
        </h2>

        <p v-if="description" v-reveal="{ delay: 160 }"
            class="mt-4 max-w-prose text-base leading-relaxed text-content-muted"
            :class="align === 'center' ? 'mx-auto' : ''">
            {{ description }}
        </p>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    /** 小標籤文字，例如「經歷」 */
    eyebrow: string
    /** 區塊編號，例如「01」 */
    index?: string
    title: string
    description?: string
    align?: 'left' | 'center'
}>(), {
    align: 'left',
});
</script>
