<template>
    <div class="w-full h-full text-primary">
        <div class="flex items-center justify-between mb-1">
            <div class="font-bold text-xl">{{ t('MazeGame.title') }}</div>
        </div>
        <p class="mb-3 text-sm">
            {{ t('MazeGame.instruction') }}
        </p>
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
                                            : cell === 1
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

onMounted(() => {
    window.addEventListener('keydown', handleKeyPress);
    const metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no');
    }
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
    let maze = Array.from({ length: size }, () => Array(size).fill(1)); // 初始化迷宮為牆壁
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
        maze[y][x] = 0; // 將當前位置設為通路
        shuffle(directions); // 隨機打亂方向

        for (const { x: dx, y: dy } of directions) {
            const nx = x + dx * 2;
            const ny = y + dy * 2;

            if (isValid(nx, ny) && maze[ny][nx] === 1) {
                maze[y + dy][x + dx] = 0; // 打通牆壁
                carvePath(nx, ny); // 遞迴探索
            }
        }
    }

    function isPathAvailable(maze: number[][], start: { x: number, y: number }, end: { x: number, y: number }) {
        const visited = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));
        const queue = [start];

        while (queue.length > 0) {
            const { x, y } = queue.shift()!;
            if (x === end.x && y === end.y) return true;

            for (const { x: dx, y: dy } of directions) {
                const nx = x + dx;
                const ny = y + dy;
                if (isValid(nx, ny) && maze[ny][nx] === 0 && !visited[ny][nx]) {
                    visited[ny][nx] = true;
                    queue.push({ x: nx, y: ny });
                }
            }
        }
        return false;
    }

    do {
        maze = Array.from({ length: size }, () => Array(size).fill(1)); // 初始化迷宮為牆壁
        carvePath(14, 14); // 從起點開始挖掘
        maze[0][0] = 0; // 確保終點是通路
    } while (!isPathAvailable(maze, { x: 0, y: 0 }, { x: size - 1, y: size - 1 }));
    return maze;
}


function handleKeyPress(event: KeyboardEvent | { key: string }) {
    if (checkCompletion()) return;
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.value.y > 0 && maze.value[playerPosition.value.y - 1][playerPosition.value.x] === 0) {
                playerPosition.value.y--;
            }
            break;
        case 'ArrowDown':
            if (playerPosition.value.y < maze.value.length - 1 && maze.value[playerPosition.value.y + 1][playerPosition.value.x] === 0) {
                playerPosition.value.y++;
            }
            break;
        case 'ArrowLeft':
            if (playerPosition.value.x > 0 && maze.value[playerPosition.value.y][playerPosition.value.x - 1] === 0) {
                playerPosition.value.x--;
            }
            break;
        case 'ArrowRight':
            if (playerPosition.value.x < maze.value[0].length - 1 && maze.value[playerPosition.value.y][playerPosition.value.x + 1] === 0) {
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
        new Audio('./gotPointSoundEffect.wav').play();
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