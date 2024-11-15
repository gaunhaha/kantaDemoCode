<template>
    <div class="text-xl mb-3 text-primary">
        {{ t('AlertService.title') }}
    </div>
    <div class="flex gap-5">
        <button class="btn" @click="onClickSuccessButton">
            {{ t('AlertService.button1') }}
        </button>
        <button class="btn" @click="onClickErrorButton">
            {{ t('AlertService.button2') }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { AlertService } from '@/core/services/utils/AlertService';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

function onClickSuccessButton() {
    AlertService.okAlert({
        icon: 'success',
        title: t('AlertService.successTitle'),
        text: 'hello world',
        confirmButtonText: t('AlertService.confirmButtonText1'),
    })
}

function onClickErrorButton() {
    AlertService.okAlert({
        icon: 'error',
        title: t('AlertService.errorTitle'),
        text: t('AlertService.errorText'),
        confirmButtonText: t('AlertService.confirmButtonText2'),
    })
}
</script>