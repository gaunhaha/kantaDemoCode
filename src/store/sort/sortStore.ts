import { defineStore } from "pinia";
import { ref } from "vue";
import { getSortDataByApi, updateSortData } from "@/core/services/api/sort/sortApi";
import { SortData } from "@/core/services/api/sort/sortData";

export const useSortStore = defineStore("sortStore", () => {
    const storeData = ref<Array<SortData>>([]);

    async function getData() {
        if (storeData.value.length === 0) storeData.value = await getSortDataByApi();
        return storeData.value;
    }

    async function getDataByApi() {
        storeData.value = await getSortDataByApi();
        return storeData.value;
    }

    async function updateData(datas: Array<SortData>) {
        storeData.value = await updateSortData(datas);
        return storeData.value;
    }

    return {
        getData,
        getDataByApi,
        updateData,
    }
})