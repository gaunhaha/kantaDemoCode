<template>
    <div class="min-h-screen flex flex-col justify-between">
        <div class="grow flex flex-col">
            <div class="fixed top-0 left-0 w-full z-50 h-16">
                <Header></Header>
            </div>
            <div class="w-screen flex grow mt-20">
                <template v-if="width > 750">
                    <div class="h-fit w-60 me-5" style="position: sticky; top: 75px;">
                        <SideBar />
                    </div>
                </template>
                <div class="w-full bg-theme-light rounded p-8 mb-6" :class="{ 'me-6': width > 750 }">
                    <RouterView />
                    <button v-show="showScrollButton" @click="scrollToTop"
                        class="fixed bottom-4 right-4 bg-blue-500 text-white p-2 px-4 rounded-md shadow-lg"
                        style="opacity: 0.7;">
                        <i class="fa-solid fa-arrow-up"></i>
                    </button>
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
import { onMounted, onUnmounted, ref } from 'vue';

const { width } = useWindowSize()
const showScrollButton = ref(false);
const handleScroll = () => {
    showScrollButton.value = window.scrollY > 200;
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>