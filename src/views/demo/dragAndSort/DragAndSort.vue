<template>
    <div class="flex justify-between gap-3 mb-3">
        <div class="text-xl mb-3">
            Drag and Sort
        </div>
        <div class="flex gap-3">
            <button class="btn" @click="onClickReset">
                <i class="fa fa-refresh me-1"></i>
                reset
            </button>
            <button class="btn" @click="onClickSave">
                <i class="fa fa-save me-1"></i>
                save
            </button>
        </div>
    </div>
    <div class="flex gap-3 flex-wrap">
        <template v-for="(data, index) in displayDragDatas">
            <div class="grabbable border border-gray-400 rounded-md"
                :class="{ 'bg-primary-light-active': !data.isOriginal }" @dragenter.prevent @dragover.prevent
                :draggable="true" @drop="onDropSelectedItem(index)" @dragstart="startDragSelectedItem($event, index)"
                @touchstart="startDragSelectedItem($event, index)" @touchmove="onTouchMove($event)"
                @touchend="onDropSelectedItem(index)">
                <div class="p-3" data-bs-toggle="tab">
                    <span>{{ index + 1 }}. </span>
                    <span>{{ data.name }}</span>
                </div>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import _ from 'lodash';
import { onMounted, ref } from 'vue';
import { AlertService } from '@/core/services/utils/AlertService';
import { DisplaySortData } from '@/core/services/sortService/displaySortData';
import { getDisplaySortData, updateSortData } from '@/core/services/sortService/sortService';

const displayDragDatas = ref<Array<DisplaySortData>>([])
const dragItemIndex = ref<number>(0);

onMounted(async () => {
    displayDragDatas.value = await getDisplaySortData();
})

async function onClickReset() {
    displayDragDatas.value = await getDisplaySortData();
}

async function onClickSave() {
    await updateSortData(displayDragDatas.value);
    for (const data of displayDragDatas.value) data.isOriginal = true;
    AlertService.okAlert({
        icon: 'success',
        title: 'Success',
        text: 'Save Success',
        confirmButtonText: 'confirm',
    })
}

function startDragSelectedItem(event: any, itemIndex: number) {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    dragItemIndex.value = itemIndex;
}

function onDropSelectedItem(itemIndex: number) {
    if (dragItemIndex.value == itemIndex) return;
    const dragItem = displayDragDatas.value[dragItemIndex.value];
    dragItem.isOriginal = false;
    displayDragDatas.value.splice(dragItemIndex.value, 1);
    displayDragDatas.value.splice(itemIndex, 0, dragItem);
}

let touchStartX = 0;
let touchStartY = 0;

function onTouchMove(event: TouchEvent) {
    event.preventDefault(); // 防止滾動
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    // 這裡可以更新元素的位置，或者顯示一個拖曳的預覽
}
</script>
<style>
.grabbable {
    cursor: move;
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
}

.grabbable:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
}
</style>
