<template>
    <div class="h-16 bg-theme border-bottom flex items-center p-3 ps-8 justify-between static">
        <div class="flex items-center">
            <div class="me-3">
                <img class="h-10 rounded-full" id="profile-pic"
                    src="https://lh3.google.com/u/0/d/1jNCxRzTQ-f0tU8YMt8F_VqwENvVyRqz3=w1920-h953-iv1"
                    alt="profile-pic">
            </div>
            <span class="">
                Kanta Demo
            </span>
        </div>
        <template v-if="width <= 750">
            <div class="cursor-pointer" @click="isShow = !isShow">
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                    </path>
                </svg>
            </div>
        </template>
    </div>
    <template v-if="isShow && width <= 750">
        <div class="absolute top-16 right-0 mt-3 z-50">
            <div class="w-60">
                <SideBar />
            </div>
        </div>
    </template>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useWindowSize } from '@vueuse/core'
import SideBar from "@/layout/sideBar/SideBar.vue";

const { width } = useWindowSize()
const isShow = ref<boolean>(false);
</script>