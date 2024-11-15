import { ref } from "vue";
import { SortData } from "./sortData";
import _ from "lodash";

export function getSortDataByApi() {
    return Promise.resolve(_.cloneDeep(sortDatas.value));
    // return new Promise((resolve, reject) => {
    //     ApiService.get(`/SortData`).then(res => {
    //         resolve(res.data)
    //     }).catch(err => {
    //         reject(err)
    //     })
    // })
}

export function updateSortData(datas: Array<SortData>) {
    // return new Promise((resolve, reject) => {
    //     ApiService.post(`/SortData`, datas).then(res => {
    //         resolve(res.data)
    //     }).catch(err => {
    //         reject(err)
    //     })
    // })
    sortDatas.value = datas;
    return Promise.resolve(sortDatas.value);
}

const sortDatas = ref<Array<SortData>>([
    new SortData("apple"),
    new SortData("banana"),
    new SortData("orange"),
    new SortData("peach"),
]);
