import { ref } from "vue";
import { defineStore } from "pinia";
import { SortData } from "@/core/services/api/sort/sortData";
import { getSortDataByApi, updateSortData } from "@/core/services/api/sort/sortApi";

export const useSortDataStore = defineStore("sortDataStore", () => {
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