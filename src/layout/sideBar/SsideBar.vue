<template>
    <div class="">
        <div class="bg-cyan-600 p-2 border-b border-slate-400 rounded-t">
            <span>
                Menu
            </span>
        </div>
        <div class="cursor-pointer p-2 border-b border-slate-800"
            :class="name == 'aboutMe' ? 'bg-cyan-500' : 'bg-cyan-200'" @click="toAboutMe">
            <i class="fa fa-home"></i>
            <span class="">
                Home
            </span>
        </div>
        <div class="cursor-pointer p-2 border-b border-slate-800"
            :class="name == 'demo' ? 'bg-cyan-500' : 'bg-cyan-200'" @click="toDemo">
            <i class="fa fa-laptop"></i>
            <span class="">
                Demo
            </span>
        </div>
        <div class="cursor-pointer p-2 border-b border-slate-800 rounded-b"
            :class="name == 'analyze' ? 'bg-cyan-500' : 'bg-cyan-200'" @click="toAnalyze">
            <i class="fa fa-pie-chart"></i>
            <span class="">
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