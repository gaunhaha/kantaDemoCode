import { useAnalyzeStore } from "@/store/analyze/analyzeStore";
import { DisplayAnalyzeData } from "./displayAnalyzeData";
import moment from "moment";
import { BarChartData } from "@/components/chart/getFixRatio";

const analyzeStore = useAnalyzeStore();

export async function getDisplayAnalyzeDatas(startDate: string, endDate: string) {
    const datas = await analyzeStore.getFruitData(startDate, endDate);
    return datas.map(data => new DisplayAnalyzeData(data));
}

export function getPieChartLabelsByDisplayAnalyzeData(datas: Array<DisplayAnalyzeData>) {
    const res: Array<string> = [];
    for (const data of datas) {
        for (const name of data.things.map(e => e.name)) {
            if (!res.includes(name)) res.push(name);
        }
    }
    return res;
}

export function getPieChartDatasByDisplayAnalyzeData(datas: Array<DisplayAnalyzeData>) {
    const labels = getPieChartLabelsByDisplayAnalyzeData(datas);
    const res: Array<number> = labels.map(e => { e; return 0 });
    for (const data of datas) {
        for (const thing of data.things) {
            const index = labels.findIndex(e => e == thing.name);
            if (index != -1) res[index] += thing.value;
        }
    }
    return res;
}

export function getBarChartLabelsByDisplayAnalyzeData(datas: Array<DisplayAnalyzeData>) {
    return datas.map(e => moment(e.date).format("yyyy-MM-DD"))
}

export function getBarChartDataByDisplayAnalyzeData(datas: Array<DisplayAnalyzeData>) {
    const labels = getPieChartLabelsByDisplayAnalyzeData(datas);
    const res: Array<BarChartData> = labels.map(e => {
        return {
            label: e,
            data: []
        }
    });
    for (const data of datas) {
        for (const thing of data.things) {
            const found = res.find(e => e.label == thing.name);
            if (found) found.data.push(thing.value);
        }
    }
    return res;
}