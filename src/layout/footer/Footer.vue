<template>
    <footer class="relative z-10 mt-32 border-t border-hairline/8">
        <div class="shell py-16 md:py-20">
            <!-- 大型 CTA -->
            <div v-reveal="'up'" class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                    <p class="eyebrow">{{ t('Footer.contactMe') }}</p>
                    <a href="mailto:gaunhaha@gmail.com" id="footer-email-link"
                        class="group mt-5 block font-display text-display-sm font-semibold text-content-strong transition-colors duration-300 hover:text-accent">
                        gaunhaha@gmail.com
                        <i
                            class="fa-solid fa-arrow-right ml-3 text-[0.6em] transition-transform duration-300 group-hover:translate-x-1.5"></i>
                    </a>
                </div>

                <div class="flex gap-3">
                    <a v-for="social in socials" :key="social.label" :href="social.href" target="_blank"
                        rel="noopener noreferrer" :aria-label="social.label"
                        class="flex h-11 w-11 items-center justify-center rounded-full border border-hairline/10 text-content-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent">
                        <i :class="social.icon"></i>
                    </a>
                </div>
            </div>

            <div
                class="mt-14 flex flex-col gap-3 border-t border-hairline/8 pt-8 text-xs text-content-faint md:flex-row md:items-center md:justify-between">
                <span class="font-mono">© {{ year }} Kanta Chen</span>
                <span class="font-mono">Built with Vue 3 · Vite · Tailwind CSS</span>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const year = new Date().getFullYear();

const socials = [
    { label: 'GitHub', icon: 'fa-brands fa-github', href: 'https://github.com/gaunhaha' },
    {
        label: 'LinkedIn',
        icon: 'fa-brands fa-linkedin-in',
        href: 'https://www.linkedin.com/in/%E5%86%A0%E6%97%97-%E9%99%B3-34b48825b/',
    },
    { label: 'Email', icon: 'fa-solid fa-envelope', href: 'mailto:gaunhaha@gmail.com' },
];
</script>
