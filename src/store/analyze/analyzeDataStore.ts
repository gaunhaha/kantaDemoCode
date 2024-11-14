import { AnalyzeData } from "@/core/services/api/analyze/analyzeData";

export class AnalyzeDataStore {
    startDay: string;
    endDay: string;
    analyzeFruitDatas: Array<AnalyzeData>;
    constructor(startDay: string, endDay: string, analyzeFruitDatas: Array<AnalyzeData>) {
        this.startDay = startDay;
        this.endDay = endDay;
        this.analyzeFruitDatas = analyzeFruitDatas;
    }
}