<template>
    <div>
        <div class="flex gap-5">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="onClickSuccessButton">
                Please Click Me
            </button>
            <button class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="onClickErrorButton">
                Don't Click Me
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { AlertService } from '@/core/services/AlertService';
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