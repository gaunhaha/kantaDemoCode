import ApiService from "@/core/services/utils/ApiService";
import { AnalyzeData } from "./analyzeData";
import moment from "moment";

export function getAnalyzeFruitDataByApi(startDay: string, endDay: string): Promise<Array<AnalyzeData>> {
    return Promise.resolve(getAnalyzeDataByPeriod(startDay, endDay));
    // return new Promise((resolve, reject) => {
    //     ApiService.get(`/What/Fruits/I/Ate/startDay/${startDay}/endDay/${endDay}`).then(res => {
    //         resolve(res.data)
    //     }).catch(err => {
    //         reject(err)
    //     })
    // })
}

function getAnalyzeDataByPeriod(startDayStr: string, endDayStr: string) {
    const today = moment();
    const startDay = moment(startDayStr);
    const endDay = moment(endDayStr);
    const res = datas.filter(e => e.daysAgo <= today.diff(startDay, 'day') && e.daysAgo >= today.diff(endDay, 'day'));
    return res;
}

const datas = ([
    {
        "daysAgo": 0,
        "things": [
            { "name": "apples", "value": 290, }, { "name": "bananas", "value": 75, }, { "name": "oranges", "value": 112, }, { "name": "peaches", "value": 122, },
        ]
    },
    {
        "daysAgo": 1,
        "things": [
            { "name": "apples", "value": 942, }, { "name": "bananas", "value": 24, }, { "name": "oranges", "value": 372, }, { "name": "peaches", "value": 54, },
        ]
    },
    {
        "daysAgo": 2,
        "things": [
            { "name": "apples", "value": 428, }, { "name": "bananas", "value": 135, }, { "name": "oranges", "value": 235, }, { "name": "peaches", "value": 5, },
        ]
    },
    {
        "daysAgo": 3,
        "things": [
            { "name": "apples", "value": 255, }, { "name": "bananas", "value": 1003, }, { "name": "oranges", "value": 14, }, { "name": "peaches", "value": 315, },
        ]
    },
    {
        "daysAgo": 4,
        "things": [
            { "name": "apples", "value": 82, }, { "name": "bananas", "value": 65, }, { "name": "oranges", "value": 159, }, { "name": "peaches", "value": 65, },
        ]
    },
    {
        "daysAgo": 5,
        "things": [
            { "name": "apples", "value": 252, }, { "name": "bananas", "value": 172, }, { "name": "oranges", "value": 95, }, { "name": "peaches", "value": 89, },
        ]
    },
    {
        "daysAgo": 6,
        "things": [
            { "name": "apples", "value": 423, }, { "name": "bananas", "value": 155, }, { "name": "oranges", "value": 514, }, { "name": "peaches", "value": 45, },
        ]
    },
    {
        "daysAgo": 7,
        "things": [
            { "name": "apples", "value": 0, }, { "name": "bananas", "value": 65, }, { "name": "oranges", "value": 540, }, { "name": "peaches", "value": 162, },
        ]
    },
    {
        "daysAgo": 8,
        "things": [
            { "name": "apples", "value": 265, }, { "name": "bananas", "value": 489, }, { "name": "oranges", "value": 434, }, { "name": "peaches", "value": 355, },
        ]
    },
    {
        "daysAgo": 9,
        "things": [
            { "name": "apples", "value": 139, }, { "name": "bananas", "value": 556, }, { "name": "oranges", "value": 554, }, { "name": "peaches", "value": 416, },
        ]
    },
    {
        "daysAgo": 10,
        "things": [
            { "name": "apples", "value": 226, }, { "name": "bananas", "value": 195, }, { "name": "oranges", "value": 183, }, { "name": "peaches", "value": 48, },
        ]
    },
    {
        "daysAgo": 11,
        "things": [
            { "name": "apples", "value": 65, }, { "name": "bananas", "value": 74, }, { "name": "oranges", "value": 5, }, { "name": "peaches", "value": 92, },
        ]
    },
    {
        "daysAgo": 12,
        "things": [
            { "name": "apples", "value": 264, }, { "name": "bananas", "value": 515, }, { "name": "oranges", "value": 312, }, { "name": "peaches", "value": 0, },
        ]
    },
    {
        "daysAgo": 13,
        "things": [
            { "name": "apples", "value": 445, }, { "name": "bananas", "value": 327, }, { "name": "oranges", "value": 592, }, { "name": "peaches", "value": 621, },
        ]
    },
    {
        "daysAgo": 14,
        "things": [
            { "name": "apples", "value": 102, }, { "name": "bananas", "value": 10, }, { "name": "oranges", "value": 354, }, { "name": "peaches", "value": 268, },
        ]
    },
])