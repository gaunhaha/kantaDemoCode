<template>
    <div class="min-h-screen flex flex-col justify-between">
        <div class="grow flex flex-col">
            <div class="fixed top-0 left-0 w-full z-50 h-16">
                <Header></Header>
            </div>
            <div class="w-screen flex grow mt-20">
                <template v-if="width > 750">
                    <div class="h-fit w-60 me-5">
                        <SideBar />
                    </div>
                </template>
                <div class="w-full bg-theme-light rounded p-8 mb-6" :class="{ 'me-6': width > 750 }">
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
import SideBar from "@/layout/sideBar/SideBar.vue";
import Header from "@/layout/header/Header.vue";
import Footer from "@/layout/footer/Footer.vue";

const { width } = useWindowSize()
</script>