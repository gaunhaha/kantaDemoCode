<template>
    <div class="h-16 flex justify-end items-center p-3 bg-theme">
        <span>
            <i class="fa fa-envelope me-2"></i>
            <span class="me-2">
                {{ t('Footer.contactMe') }}
            </span>
            <span class="me-2">
                <a href="mailto: gaunhaha@gmail.com" class="">
                    gaunhaha@gmail.com
                </a>
            </span>
        </span>
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>