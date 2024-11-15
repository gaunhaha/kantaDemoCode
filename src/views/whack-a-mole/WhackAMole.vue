<template>
    <div class="text-primary">
        <div class="flex justify-center mb-3">
            <h1 class="text-3xl font-bold">
                {{ formatTime() }}
            </h1>
        </div>
        <div class="flex justify-between items-center mb-5 gap-3 flex-wrap">
            <button class="btn h-12 w-20 ms-4"
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
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isCountingDown = ref<boolean>(false);
const countdownValue = ref<number>(3);
const remainingTime = ref<Moment>(moment().startOf('day').add(20, 's'));
const isGameActive = ref<boolean>(false);
const highestScore = ref<number>(0);
const currentScore = ref<number>(0);
const currentActiveMole = ref<number>(Math.floor(Math.random() * 16) + 1);
const slowReactionTimeoutId = ref<NodeJS.Timeout | null>(null);

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

function hitMole() {
    const audio = new Audio('./gotPointSoundEffect.wav');
    audio.play();
    currentScore.value++;
    currentActiveMole.value = Math.floor(Math.random() * 16) + 1;
    if (slowReactionTimeoutId.value) clearTimeout(slowReactionTimeoutId.value);
    slowReactionTimeoutId.value = initiateSlowReaction();
}

function initiateSlowReaction() {
    return setTimeout(() => {
        if (isGameActive.value) {
            currentActiveMole.value = Math.floor(Math.random() * 16) + 1;
            slowReactionTimeoutId.value = initiateSlowReaction();
        } else if (slowReactionTimeoutId.value) {
            clearTimeout(slowReactionTimeoutId.value);
        }
    }, (Math.random() * (2000 - 500) + 500));
}
</script>