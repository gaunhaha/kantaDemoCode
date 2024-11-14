import { defineStore } from "pinia";
import _ from "lodash";
import { getAnalyzeFruitDataByApi } from "@/core/services/api/analyze/analyzeApi";
import { ref } from "vue";
import { AnalyzeDataStore } from "./analyzeDataStore";

export const useAnalyzeStore = defineStore("analyzeStore", () => {
    const storeData = ref<Array<AnalyzeDataStore>>([]);

    async function getFruitData(startDay: string, endDay: string) {
        const foundStoreData = storeData.value.find(e => e.startDay == startDay && e.endDay == endDay);
        if (foundStoreData == undefined) {
            const analyzeFruitDatas = await getAnalyzeFruitDataByApi(startDay, endDay);
            storeData.value.push(new AnalyzeDataStore(startDay, endDay, analyzeFruitDatas));
            return analyzeFruitDatas;
        } else return foundStoreData.analyzeFruitDatas;
    }

    return {
        getFruitData,
    }
})