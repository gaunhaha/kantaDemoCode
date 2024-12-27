<template>
    <div v-show="showInstruction" class="text-black bg-gray-100 p-4 mb-10 rounded-md shadow-md relative">
        <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700" @click="showInstruction = false">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <h2 class="font-bold text-lg">{{ t('WhackAMole.title') }}</h2>
        <p class="mb-3">{{ t('WhackAMole.instruction') }}</p>
        <p>{{ t('WhackAMole.instructionDetail') }}</p>
    </div>
    <div class="text-primary">
        <div class="flex justify-center mb-3">
            <h1 class="text-3xl font-bold">
                {{ formatTime() }}
            </h1>
        </div>
        <div class="flex justify-between items-center mb-5 gap-3 flex-wrap">
            <button class="btn-light h-12 w-20 ms-4"
                :class="(isCountingDown || isGameActive) ? 'bg-primary-light-active' : 'bg-primary hover:bg-primary-active'"
                @click="startGame" :disabled="isCountingDown || isGameActive">
                <span v-if="isCountingDown">
                    {{ countdownValue }}
                </span>
                <span v-else-if="isGameActive">
                    {{ t('WhackAMole.go') }}
                </span>
                <span v-else>
                    {{ t('WhackAMole.start') }}
                </span>
            </button>
            <div class="text-3xl font-bold text-end me-4">
                <div v-if="highestScore" class="text-nowrap">
                    {{ t('WhackAMole.highest') }} {{ highestScore }}
                </div>
                <div class="text-nowrap">
                    {{ t('WhackAMole.score') }} {{ currentScore }}
                </div>
            </div>
        </div>
        <template v-for="i in 4">
            <div class="flex justify-around mb-10 gap-3">
                <template v-for="j in 4">
                    <button class="lg:p-16 md:p-10 p-7 rounded-md"
                        :class="(currentActiveMole == ((i - 1) * 4 + j)) && isGameActive ? 'bg-red-400 cursor-pointer' : 'bg-gray-400'"
                        :disabled="currentActiveMole != ((i - 1) * 4 + j) || !isGameActive" @click="hitMole">
                    </button>
                </template>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import moment, { Moment } from 'moment';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isCountingDown = ref<boolean>(false);
const countdownValue = ref<number>(3);
const remainingTime = ref<Moment>(moment().startOf('day').add(20, 's'));
const isGameActive = ref<boolean>(false);
const highestScore = ref<number>(0);
const currentScore = ref<number>(0);
const currentActiveMole = ref<number>(0);
const slowReactionTimeoutId = ref<NodeJS.Timeout | null>(null);
const pointSound = ref<HTMLAudioElement>(new Audio('./gotPointSoundEffect.mp3'));
const showInstruction = ref<boolean>(true);

onMounted(() => {
    randomMole();
    pointSound.value.load();
});

function formatTime() {
    return remainingTime.value.format('ss : SS');
}

function startGame() {
    countdownValue.value = 3;
    remainingTime.value = moment().startOf('day').add(20, 's');
    isCountingDown.value = true;
    initiateCountdown();
    currentScore.value = 0;
}

function initiateCountdown() {
    if (countdownValue.value > 1) {
        setTimeout(() => {
            countdownValue.value--;
            initiateCountdown();
        }, 1000);
    } else {
        isCountingDown.value = false;
        isGameActive.value = true;
        slowReactionTimeoutId.value = initiateSlowReaction();
        startTimer();
    }
}

function startTimer() {
    if (remainingTime.value > moment().startOf('day')) {
        setTimeout(() => {
            remainingTime.value = moment(remainingTime.value).add(-10, 'milliseconds');
            startTimer();
        }, 10);
    } else {
        isGameActive.value = false;
        if (slowReactionTimeoutId.value) clearTimeout(slowReactionTimeoutId.value);
        if (highestScore.value < currentScore.value) highestScore.value = currentScore.value;
    }
}

function randomMole() {
    currentActiveMole.value = Math.floor(Math.random() * 16) + 1;
}

function hitMole() {
    pointSound.value.currentTime = 0; // 重置音效時間
    pointSound.value.play();
    currentScore.value++;
    randomMole();
    resetSlowReaction();
}

function initiateSlowReaction() {
    return setTimeout(() => {
        randomMole();
        slowReactionTimeoutId.value = initiateSlowReaction();
    }, (Math.random() * (2000 - 500) + 500));
}

function resetSlowReaction() {
    if (slowReactionTimeoutId.value) clearTimeout(slowReactionTimeoutId.value);
    slowReactionTimeoutId.value = initiateSlowReaction();
}
</script>