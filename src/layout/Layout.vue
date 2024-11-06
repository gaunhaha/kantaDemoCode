<template>
    <div class="min-h-screen flex flex-col justify-between">
        <div class="grow flex flex-col">
            <Header></Header>
            <div class="w-screen flex p-8 grow" :class="{ 'ps-0': width > 750 }">
                <template v-if="width > 750">
                    <div class="h-fit w-60 me-5">
                        <SsideBar />
                    </div>
                </template>
                <div class="w-full bg-cyan-200 rounded p-8">
                    <RouterView />
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { RouterView } from "vue-router";
import SsideBar from "@/layout/sideBar/SsideBar.vue";
import Header from "@/layout/header/Header.vue";
import Footer from "@/layout/footer/Footer.vue";

const { width } = useWindowSize()
</script>