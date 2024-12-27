<template>
    <div class="w-full h-full text-primary">
        <div v-show="showInstruction" class="text-black bg-gray-100 p-4 mb-4 rounded-md shadow-md relative">
            <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700" @click="showInstruction = false">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 class="font-bold text-lg">{{ t('MazeGame.title') }}</h2>
            <p class="mb-3">{{ t('MazeGame.instruction') }}</p>
            <p>{{ t('MazeGame.instructionDetail') }}</p>
        </div>
        <p class="mb-5">
            {{ t('MazeGame.completionCount') }} : {{ completionCount }} ,
            {{ t('MazeGame.spendTime') }}: {{ spendTime.diff(moment().startOf('day'), 'seconds') }}s
        </p>
        <button class="btn mb-5 w-20 h-10" @click="startGame">
            {{ t('MazeGame.startButton') }}
        </button>
        <template v-if="maze.length > 0">
            <div class="mx-auto w-fit mb-10">
                <div class="border-2 border-gray-500 p-2 shadow-lg bg-black rounded-md">
                    <template v-for="(row, rowIndex) in maze">
                        <div class="flex flex-wrap">
                            <template v-for="(cell, colIndex) in row">
                                <div :style="{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor:
                                        playerPosition.x === colIndex && playerPosition.y === rowIndex
                                            ? 'red'
                                            : cell === 0
                                                ? 'black'
                                                : 'white'
                                }">
                                    <template v-if="rowIndex === 14 && colIndex === 14">
                                        ⭐
                                    </template>
                                </div>
                            </template>
                        </div>
                    </template>
                </div>
            </div>
            <div class="flex flex-col items-center font-bold  md:hidden">
                <button class="btn mb-2 w-10 h-10" @click="handleKeyPress({ key: 'ArrowUp' })">⬆</button>
                <div class="flex gap-14">
                    <button class="btn w-10 h-10" @click="handleKeyPress({ key: 'ArrowLeft' })">⬅</button>
                    <button class="btn w-10 h-10" @click="handleKeyPress({ key: 'ArrowRight' })">⮕</button>
                </div>
                <button class="btn mt-2 w-10 h-10" @click="handleKeyPress({ key: 'ArrowDown' })">⬇</button>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import i18n from "@/core/plugins/i18n/i18n.ts";
import moment, { Moment } from 'moment';
import { Fireworks } from 'fireworks-js'; // 引入煙火特效

const { t } = i18n.global;

const spendTime = ref<Moment>(moment().startOf('day'));
const maze = ref<number[][]>([]); // 定義迷宮為二維數組
const playerPosition = ref<{ x: number, y: number }>({ x: 0, y: 0 }); // 紅點的初始位置
const goalPosition = ref<{ x: number, y: number }>({ x: 14, y: 14 }); // 星星記號的位置
const completionCount = ref<number>(0);
const timeoutId = ref<NodeJS.Timeout | null>(null);
const pointSound = ref<HTMLAudioElement>(new Audio('./gotPointSoundEffect.mp3'));
const showInstruction = ref<boolean>(true);

onMounted(() => {
    window.addEventListener('keydown', handleKeyPress);
    const metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no');
    }
    pointSound.value.load();
});

function startGame() {
    maze.value = generateRandomMaze();
    playerPosition.value = { x: 0, y: 0 }; // 重置紅點位置
    if (timeoutId.value !== null) {
        clearInterval(timeoutId.value);
    }
    timeoutId.value = setInterval(() => {
        spendTime.value = spendTime.value.clone().add(1, 'seconds');
    }, 1000);
}

function generateRandomMaze() {
    const size = 15;
    let maze = Array.from({ length: size }, () => Array(size).fill(0)); // 初始化迷宮為牆壁
    const directions = [
        { x: 0, y: -1 }, // 上
        { x: 0, y: 1 },  // 下
        { x: -1, y: 0 }, // 左
        { x: 1, y: 0 }   // 右
    ];

    function isValid(x: number, y: number) {
        return x >= 0 && y >= 0 && x < size && y < size;
    }

    function shuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function carvePath(x: number, y: number) {
        maze[y][x] = 1; // 將當前位置設為通路
        shuffle(directions); // 隨機打亂方向

        for (const { x: dx, y: dy } of directions) {
            const nx = x + dx * 2;
            const ny = y + dy * 2;

            if (isValid(nx, ny) && maze[ny][nx] === 0) {
                maze[y + dy][x + dx] = 1; // 打通牆壁
                carvePath(nx, ny); // 遞迴探索
            }
        }
    }

    //驗證迷宮是否有2*2的牆壁
    function check2x2Wall(maze: number[][]) {
        for (let i = 0; i < maze.length - 1; i++) {
            for (let j = 0; j < maze[i].length - 1; j++) {
                if (maze[i][j] === 0 && maze[i + 1][j] === 0 && maze[i][j + 1] === 0 && maze[i + 1][j + 1] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    do {
        maze = Array.from({ length: size }, () => Array(size).fill(0)); // 初始化迷宮為牆壁
        carvePath(14, 14); // 從起點開始挖掘
        maze[0][0] = 1; // 確保終點是通路
    } while (!check2x2Wall(maze));
    return maze;
}


function handleKeyPress(event: KeyboardEvent | { key: string }) {
    if (checkCompletion()) return;
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.value.y > 0 && maze.value[playerPosition.value.y - 1][playerPosition.value.x] === 1) {
                playerPosition.value.y--;
            }
            break;
        case 'ArrowDown':
            if (playerPosition.value.y < maze.value.length - 1 && maze.value[playerPosition.value.y + 1][playerPosition.value.x] === 1) {
                playerPosition.value.y++;
            }
            break;
        case 'ArrowLeft':
            if (playerPosition.value.x > 0 && maze.value[playerPosition.value.y][playerPosition.value.x - 1] === 1) {
                playerPosition.value.x--;
            }
            break;
        case 'ArrowRight':
            if (playerPosition.value.x < maze.value[0].length - 1 && maze.value[playerPosition.value.y][playerPosition.value.x + 1] === 1) {
                playerPosition.value.x++;
            }
            break;
    }
    handleMoved();
}

function handleMoved() {
    if (checkCompletion()) {
        completionCount.value++;
        if (timeoutId.value !== null) {
            clearInterval(timeoutId.value); // 停止計時
        }
        pointSound.value.currentTime = 0; // 重置音效時間
        pointSound.value.play();
        showFireworks(); // 顯示煙火特效
    }
}

function checkCompletion() {
    return playerPosition.value.x === goalPosition.value.x && playerPosition.value.y === goalPosition.value.y;
}

function showFireworks() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    const fireworks = new Fireworks(container, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        // trace: 3,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: {
            min: 0,
            max: 360
        },
        delay: {
            min: 15,
            max: 30
        },
        rocketsPoint: {
            min: 50,
            max: 50
        },
        lineWidth: {
            explosion: {
                min: 1,
                max: 3
            },
            trace: {
                min: 1,
                max: 2
            }
        },
        brightness: {
            min: 50,
            max: 80
        },
        decay: {
            min: 0.015,
            max: 0.03
        },
        mouse: {
            click: false,
            move: false,
            max: 1
        }
    });

    fireworks.start();

    setTimeout(() => {
        fireworks.stop();
        document.body.removeChild(container);
    }, 5000); // 煙火持續 5 秒
}
</script>