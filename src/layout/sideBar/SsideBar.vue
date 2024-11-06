<template>
    <div class="rounded bg-cyan-200">
        <div class="bg-cyan-600 p-2 border-b border-slate-400">
            <span>
                Menu
            </span>
        </div>
        <div class="cursor-pointer p-2 border-b border-slate-800"
            :class="name == 'aboutMe' ? 'bg-cyan-500' : 'bg-cyan-200'" @click="toAboutMe">
            <span class="ps-4">
                Home
            </span>
        </div>
        <div class="cursor-pointer p-2 border-b border-slate-800"
            :class="name == 'demo' ? 'bg-cyan-500' : 'bg-cyan-200'" @click="toDemo">
            <span class="ps-4">
                Demo
            </span>
        </div>
        <div class="cursor-pointer p-2 border-b border-slate-800"
            :class="name == 'analyze' ? 'bg-cyan-500' : 'bg-cyan-200'" @click="toAnalyze">
            <span class="ps-4">
                Analyze
            </span>
        </div>
        <!-- <div class="cursor- p-2 border-b border-slate-800">
            <span class="ps-4">
                not available
            </span>
        </div>
        <div class="cursor- p-2 border-b border-slate-800">
            <span class="ps-4">
                not available
            </span>
        </div>
        <div class="cursor- p-2 border-b border-slate-800">
            <span class="ps-4">
                not available
            </span>
        </div>
        <div class="cursor- p-2 border-b border-slate-800">
            <span class="ps-4">
                not available
            </span>
        </div> -->
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const name = ref<string>("");

onMounted(() => {
    name.value = route.name?.toString() ?? "";
})

watch(() => route.name, () => {
    name.value = route.name?.toString() ?? "";
})

function toAboutMe() {
    router.push({ path: `/` });
}

function toDemo() {
    router.push({ path: `/demo` });
}

function toAnalyze() {
    router.push({ path: `/analyze` });
}
</script>