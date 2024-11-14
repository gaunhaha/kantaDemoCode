<template>
    <div>
        <div class="mb-20 pt-5">
            <span class="text-xl font-bold">
                This is a SPA website built with Vite、Vue framework、TailwindCSS、Kanta.
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
</script>