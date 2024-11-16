import { DisplaySortData } from "./displaySortData";
import { useSortDataStore } from "@/store/sortData/sortDataStore";

const sortDataStore = useSortDataStore();

export async function getDisplaySortData(): Promise<Array<DisplaySortData>> {
    const sortDatas = await sortDataStore.getData();
    return sortDatas.map(e => new DisplaySortData(e.name));
}

export async function getDisplaySortDataByApi(): Promise<Array<DisplaySortData>> {
    const sortDatas = await sortDataStore.getDataByApi();
    return sortDatas.map(e => new DisplaySortData(e.name));
}

export async function updateSortData(sortDatas: Array<DisplaySortData>): Promise<Array<DisplaySortData>> {
    const result = await sortDataStore.updateData(sortDatas);
    return result.map(e => new DisplaySortData(e.name));
}

