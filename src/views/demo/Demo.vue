<template>
    <div>
        <div class="mb-20 pt-5">
            <span class="text-xl font-bold text-primary">
                {{ t('Demo.text1') }}
            </span>
        </div>
        <div class="p-5">
            <div class="mb-20">
                <AlertServiceVue />
            </div>
            <div class="mb-20">
                <DragAndSort />
            </div>
            <div>
                <LoadingMask />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import _ from 'lodash';
import AlertServiceVue from './alertService/AlertService.vue';
import DragAndSort from './dragAndSort/DragAndSort.vue';
import LoadingMask from './loadingMask/LoadingMask.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>