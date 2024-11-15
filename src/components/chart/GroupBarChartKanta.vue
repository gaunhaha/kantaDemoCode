<template>
    <canvas v-show="visible" class="p-10" :id="id"></canvas>
</template>

<script lang="ts" setup>
import { colors, colors_6, transparentize } from "@/core/utils/chart";
import Chart, { type ChartConfiguration, type ChartItem } from "chart.js/auto";
import { onMounted, ref, watch } from "vue";
import type { BarChartData } from "./getFixRatio";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Datasets {
    label: string,
    data: Array<number>,
    backgroundColor: string,
    stack: string,
}

const props = defineProps({
    i18nString: {
        type: String,
        default: 'Analysis.DataName.'
    },
    id: {
        type: String,
        default: "chart",
    },
    labels: {
        type: Array<string>,
        default: [],
    },
    //從API得到的結果 Bar底下不透明的部分
    doneDatas: {
        type: Array<BarChartData>,
        default: [],
    },
    //從API得到的結果 Bar頂部半透明的部分
    undoneDatas: {
        type: Array<BarChartData>,
        default: [],
    },
    doneLabel: {
        type: String,
        default: "",
    },
    undoneLabel: {
        type: String,
        default: "",
    },
    legend: {
        type: Boolean,
        default: true,
    },
    colors: {
        type: Array<string>,
        default: [],
    },
    limit: {
        type: Number,
        default: 999,
    },
    yAxisStepSize: {
        type: Number,
        default: 100,
    }
});

const config = ref<ChartConfiguration>({
    type: 'bar',
    data: { labels: [], datasets: [] },
    options: {
        plugins: {
            legend: {
                display: props.legend,
                position: 'right',
                maxWidth: 9999999999999999999,
            },
            title: {
                display: false,
                text: ''
            },
        },
        responsive: true,
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                stacked: true,
            },
            y: {
                grid: {
                    display: false
                },
                stacked: true,
                ticks: {
                    stepSize: props.yAxisStepSize
                },
                // title: { 
                //     text: '次數', 
                //     display: true 
                // },
            },
        },
        //關閉動畫
        animation: {
            duration: 0
        }
    }
})

const visible = ref<boolean>(false);

onMounted(() => {
    const canvasTag = <ChartItem>document.getElementById(props.id);
    new Chart(canvasTag, config.value);
    getDatasets();
})

watch(() => props.doneDatas, () => {
    visible.value = false
    getDatasets();
}, { deep: true });

watch(() => props.undoneDatas, () => {
    visible.value = false
    getDatasets();
}, { deep: true });

watch(() => props.labels, () => {
    visible.value = false
    getDatasets();
}, { deep: true });

const getDatasets = () => {
    let _colors: Array<string> = [];
    if (props.colors.length) _colors = props.colors;
    else if (props.doneDatas.length <= 6) _colors = colors_6;
    else _colors = colors;

    config.value.data.labels = props.labels
    const datasets: Datasets[] = [];
    for (const [index, data] of props.doneDatas.entries()) {
        datasets.push({
            label: `${t(props.i18nString + data.label)} ${props.doneLabel}`,
            data: data.data,
            backgroundColor: _colors[index % (_colors.length)],
            stack: index.toString()
        })
    }
    for (const [index, data] of props.undoneDatas.entries()) {
        const same = datasets.find(e => e.label == data.label);
        if (same) {
            datasets.push({
                label: same.label + props.undoneLabel,
                data: data.data,
                backgroundColor: transparentize(_colors[Number(same.stack) % (_colors.length)], 0.7),
                stack: same.stack
            })
        }
        else {
            datasets.push({
                label: data.label + props.undoneLabel,
                data: data.data,
                backgroundColor: transparentize(_colors[(props.doneDatas.length + index) % (_colors.length)], 0.7),
                stack: (props.doneDatas.length + index).toString()
            })
        }
    }
    config.value.data.datasets = datasets.slice(0, props.limit);
    const groupChart = Chart.getChart(props.id);
    // if (groupChart) {
    //     groupChart.destroy();
    //     const canvasTag = <ChartItem>document.getElementById(props.id);
    //     new Chart(
    //         canvasTag,
    //         config.value
    //     );
    // }
    groupChart?.update()
    visible.value = true;
}

</script>