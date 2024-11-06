<template>
    <canvas :id="canvasId"></canvas>
</template>

<script lang="ts" setup>
import Chart, { type ChartConfiguration, type ChartItem, type LayoutPosition } from "chart.js/auto";
import { onMounted, ref, watch } from "vue";
import { colors, colors_6 } from '@/core/utils/chart';
import _ from "lodash";

const props = defineProps({
    labels: {
        type: Array<string>,
        default: [
            'Red',
            'Blue',
            'Yellow'
        ],
    },
    label: {
        type: String,
        default: 'My First Dataset'
    },
    data: {
        type: Array<number>,
        default: [300, 50, 100],
    },
    backgroundColor: {
        type: Array<string>,
        default:
            []
        ,
    },
    canvasId: {
        type: String,
        default: 'pieChart'
    },
    legend: {
        type: Boolean,
        default: true
    },
    position: {
        type: String,
        default: 'bottom'
    },
    maxQuantity: {
        type: Number,
        default: 99
    },
    autoSort: {
        type: Boolean,
        default: true
    },
    labelAddPercentages: {
        type: Boolean,
        default: false
    },
    toFixedNumber: {
        type: Number,
        default: 6
    },
    maxLabelWordCount: {
        type: Number,
        default: 10
    }
})


const data = {
    labels: getInRangeLabels(),
    datasets: [{
        //label: props.label,
        data: getInRangeData(),
        backgroundColor: props.backgroundColor.length ? props.backgroundColor : (props.data.length > 6 ? colors : colors_6),
        hoverOffset: 0
    }]
};

const formateValue = (raw: number) => {
    const sum = props.data.reduce(function (a, b) {
        return a + b;
    });
    return `${raw} (${((raw / sum) * 100).toFixed(props.toFixedNumber)}%)`
}

const getOrCreateTooltip = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';
        // tooltipEl.setAttribute('size', '10');
        tooltipEl.style.width = '200px';
        const table = document.createElement('table');
        table.style.margin = '0px';

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

const externalTooltipHandler = (context: any) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set Text
    if (tooltip.body) {
        // const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b: { lines: any; }) => b.lines);

        // const tableHead = document.createElement('thead');

        // titleLines.forEach(title => {
        //     const tr = document.createElement('tr');
        //     tr.style.borderWidth = '0';

        //     const th = document.createElement('th');
        //     th.style.borderWidth = '0';
        //     const text = document.createTextNode(title);

        //     th.appendChild(text);
        //     tr.appendChild(th);
        //     tableHead.appendChild(tr);
        // });

        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body: any, i: any) => {
            const colors = tooltip.labelColors[i];

            const span = document.createElement('span');
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;
            span.style.borderWidth = '2px';
            span.style.marginRight = '10px';
            span.style.height = '10px';
            span.style.width = '10px';
            span.style.display = 'inline-block';

            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = '0';

            const td = document.createElement('td');
            td.style.borderWidth = '0';

            const text = document.createTextNode(body);

            td.appendChild(span);
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');

        // Remove old children
        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }

        // Add new children
        // tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

const con = ref<ChartConfiguration>({
    type: 'pie',
    data: data,
    options: {
        plugins: {
            title: {
                display: false,
                text: ''
            },
            legend: {
                display: props.legend,
                position: props.position as LayoutPosition,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return [context.label + ": " + formateValue(Number(context.raw))];
                    }
                },
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler
            }
        },
        //關閉動畫
        animation: {
            duration: 0
        }
    }
})

// const config: ChartConfiguration = {
//     type: 'pie',
//     data: data,
//     options: {
//         plugins: {
//             title: {
//                 display: false,
//                 text: ''
//             },
//             legend: {
//                 position: 'bottom',
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function (context) {
//                         return [context.label + ": " + formateValue(context.raw)];
//                     }
//                 }
//             }

//         }
//     }
// };

onMounted(() => {
    const canvasTag = <ChartItem>document.getElementById(props.canvasId);
    new Chart(
        canvasTag,
        con.value
    );
})

watch(() => props.data, () => {
    setData();
}, { deep: true });

watch(() => props.labels, () => {
    setData();
}, { deep: true });

function getInRangeData() {
    const tempData: Array<number> = _.cloneDeep(props.data);
    if (props.autoSort) {
        tempData.sort((b, a) => a - b);
    }
    let inRangeData = tempData;
    if (tempData.length > props.maxQuantity) {
        inRangeData = tempData.filter((el, index) => {
            el;
            return index < props.maxQuantity - 1
        });
        const otherData = tempData.filter((el, index) => {
            el;
            return index >= props.maxQuantity - 1
        });
        inRangeData.push(_.sum(otherData));
    }
    return inRangeData;
}

function getInRangeLabels() {
    const tempData: Array<number> = _.cloneDeep(props.data);
    const tempLabels: Array<string> = _.cloneDeep(props.labels);

    if (props.autoSort) {
        tempData.sort((b, a) => a - b);
        tempLabels.sort((b, a) => props.data[props.labels.indexOf(a)] - props.data[props.labels.indexOf(b)]);
    }
    let inRangeLabels = tempLabels;
    let inRangeData = tempData;
    if (tempLabels.length > props.maxQuantity) {
        inRangeLabels = tempLabels.filter((el, index) => {
            el;
            return index < props.maxQuantity - 1
        });
        inRangeLabels.push("其他");
        inRangeData = tempData.filter((el, index) => {
            el;
            index < props.maxQuantity - 1
        });
        const otherData = tempData.filter((el, index) => {
            el;
            index >= props.maxQuantity - 1
        });
        inRangeData.push(_.sum(otherData));
    }
    // if (props.labelAddPercentages) {
    //     const percentages = inRangeData.map(e => (e / _.sum(inRangeData) * 100).toFixed(props.toFixedNumber));
    //     for (let i = 0; i < percentages.length; i++) {
    //         inRangeLabels[i] += ` (${percentages[i]}%)`;
    //     }
    // }
    return inRangeLabels;
}

const setData = () => {
    con.value =
    {
        type: 'pie',
        data: {
            labels: getInRangeLabels(),
            datasets: [{
                data: getInRangeData(),
                backgroundColor: props.backgroundColor.length ? props.backgroundColor : (getInRangeData().length > 6 ? colors : colors_6),
                hoverOffset: 0
            }]
        },
        options: {
            plugins: {
                title: {
                    display: false,
                    text: ''
                },
                legend: {
                    display: props.legend,
                    position: props.position as LayoutPosition,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return [context.label + ": " + formateValue(Number(context.raw))];
                        }
                    },
                    enabled: false,
                    position: 'nearest',
                    external: externalTooltipHandler
                }
            },
            //關閉動畫
            animation: {
                duration: 0
            }
        }
    }

    const chart = Chart.getChart(props.canvasId)
    // Chart.defaults.color = "#FFFFFF";
    if (chart) {
        chart.destroy();
        const canvasTag = <ChartItem>document.getElementById(props.canvasId);
        new Chart(
            canvasTag,
            con.value
        );
        // chart.update();
    }
}

</script>