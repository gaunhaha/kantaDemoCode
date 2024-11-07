<template>
    <div>
        <div class="text-xl mb-3">
            Whack-A-Mole
        </div>
        <div class="flex justify-center mb-3">
            <h1>
                {{ getTime() }}
            </h1>
        </div>
        <div class="flex justify-between mb-5 gap-3 flex-wrap">
            <button class="h-16 w-24 text-white font-bold rounded"
                :class="(isShowStartCount || gaming) ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'"
                @click="onClickStart" :disabled="isShowStartCount || gaming">
                <span v-if="isShowStartCount">
                    {{ startCount }}
                </span>
                <span v-else-if="gaming">
                    Go !
                </span>
                <span v-else>
                    Start
                </span>
            </button>
            <div class="text-3xl font-bold text-end">
                <div v-if="maxPoint" class="text-nowrap">
                    highest {{ maxPoint }}
                </div>
                <div class="text-nowrap">
                    point {{ point }}
                </div>
            </div>
        </div>
        <template v-for="i in 4">
            <div class="flex justify-around mb-10">
                <template v-for="j in 4">
                    <button class="lg:p-16 md:p-10 p-7 rounded-md"
                        :class="(activeNumber == ((i - 1) * 4 + j)) && gaming ? 'bg-red-400 cursor-pointer' : 'bg-gray-400'"
                        :disabled="activeNumber != ((i - 1) * 4 + j) || !gaming" @click="gotIt">
                    </button>
                </template>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import moment, { Moment } from 'moment';
import { ref } from 'vue';

const isShowStartCount = ref<boolean>(false);
const startCount = ref<number>(3);
const time = ref<Moment>(moment().startOf('day').add(20, 's'));
const gaming = ref<boolean>(false);
const maxPoint = ref<number>(0);
const point = ref<number>(0);
const activeNumber = ref<number>(Math.floor(Math.random() * 16) + 1);
const tooSlowCountId = ref(
    setTimeout(() => {
    }, (Math.random() * (2000 - 1000) + 1000))
);

function getTime() {
    return time.value.format('ss:SS')
}

function onClickStart() {
    startCount.value = 3;
    time.value = moment().startOf('day').add(20, 's');
    isShowStartCount.value = true;
    startCountDown();
    point.value = 0;
}

function startCountDown() {
    if (startCount.value > 1) {
        setTimeout(() => {
            startCount.value--
            startCountDown();
        }, 1000);
    }
    else {
        isShowStartCount.value = false;
        gaming.value = true;
        tooSlowCountId.value = tooSlow();
        timeCountDown();
    }
}

function timeCountDown() {
    if (time.value > moment().startOf('day')) {
        setTimeout(() => {
            time.value = moment(time.value).add(-10, 'milliseconds');
            timeCountDown();
        }, 10);
    }
    else {
        gaming.value = false;
        clearTimeout(tooSlowCountId.value);
        if (maxPoint.value < point.value) maxPoint.value = point.value;
    }
}

function gotIt() {
    var audio = new Audio('./gotPointSoundEffect.wav');
    audio.play();
    point.value++;
    activeNumber.value = Math.floor(Math.random() * 16) + 1
    //把原本的setTimeout暫停
    clearTimeout(tooSlowCountId.value);
    //產生新的setTimeout
    tooSlowCountId.value = tooSlow();
}

function tooSlow() {
    return setTimeout(() => {
        if (gaming) {
            activeNumber.value = Math.floor(Math.random() * 16) + 1
            tooSlowCountId.value = tooSlow();
        }
        else clearTimeout(tooSlowCountId.value);
    }, (Math.random() * (2000 - 500) + 500))
}
</script>