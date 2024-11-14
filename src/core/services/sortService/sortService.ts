import { DisplaySortData } from "./displaySortData";
import { useSortStore } from "@/store/sort/sortStore";

const sortStore = useSortStore();

export async function getDisplaySortData(): Promise<Array<DisplaySortData>> {
    const sortDatas = await sortStore.getData();
    return sortDatas.map(e => new DisplaySortData(e.name));
}

export async function getDisplaySortDataByApi(): Promise<Array<DisplaySortData>> {
    const sortDatas = await sortStore.getDataByApi();
    return sortDatas.map(e => new DisplaySortData(e.name));
}

export async function updateSortData(sortDatas: Array<DisplaySortData>): Promise<Array<DisplaySortData>> {
    const result = await sortStore.updateData(sortDatas);
    return result.map(e => new DisplaySortData(e.name));
}

