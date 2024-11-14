<template>
    <div class="text-xl mb-3">
        Alert Service
    </div>
    <div class="flex gap-5">
        <button class="btn" @click="onClickSuccessButton">
            Please Click Me
        </button>
        <button class="btn" @click="onClickErrorButton">
            Don't Click Me
        </button>
    </div>
</template>

<script setup lang="ts">
import { AlertService } from '@/core/services/utils/AlertService';

function onClickSuccessButton() {
    AlertService.okAlert({
        icon: 'success',
        title: 'Success',
        text: 'hello world',
        confirmButtonText: 'Good job',
    })
}

function onClickErrorButton() {
    AlertService.okAlert({
        icon: 'error',
        title: 'error',
        text: "oh no ! Don't click me",
        confirmButtonText: 'try again',
    })
}
</script>