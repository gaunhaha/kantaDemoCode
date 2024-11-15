<template>
    <div class="">
        <div class="bg-theme p-2 border-b border-slate-400 rounded-t">
            <span>
                {{ t('Header.menu') }}
            </span>
        </div>
        <template v-for="menu in sideBarMenus">
            <div class="cursor-pointer p-2 border-b border-slate-800"
                :class="name == menu.name ? 'bg-primary-light-active' : 'bg-primary-light'"
                @click="router.push({ path: menu.path }); isShow = false">
                <i :class="menu.icon"></i>
                <span class="ms-2">
                    {{ t(`Menu.${menu.displayName}`) }}
                </span>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { sideBarMenus } from './Menu';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isShow = defineModel("isShow", { type: Boolean, default: false });

const route = useRoute();
const router = useRouter();
const name = ref<string>("");

onMounted(() => {
    name.value = route.name?.toString() ?? "";
})

watch(() => route.name, () => {
    name.value = route.name?.toString() ?? "";
})
</script>