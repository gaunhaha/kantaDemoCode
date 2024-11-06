import _ from "lodash";

export function getFixRatio(data: number[], n: number) {
    const sum = _.sum(data);
    const percentages = data.map(e => Number.parseFloat((e / sum * 100).toFixed(6)))
    const sumPercentages = _.sum(percentages)
    if (sumPercentages !== 100) {
        const diff = Number.parseFloat((100 - sumPercentages).toFixed(6))
        const maxIndex = percentages.indexOf(Math.max(...percentages))
        percentages[maxIndex] += diff
    }
    return percentages[data.indexOf(n)];
}

export interface BarChartData {
    label: string,
    data: Array<number>,
}