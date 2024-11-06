<template>
    <div class="">
        <div class="ps-2 mb-2">
            <h2 class="text-xl">Analyze What Fruits I Ate</h2>
        </div>
        <div class="w-full flex gap-3">
            <vue-tailwind-datepicker :formatter="formatter" v-model="dateValue" readonly />
            <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                :class="{ 'cursor-pointer bg-blue-500 hover:bg-blue-700': !isDisabled(), 'bg-blue-300': isDisabled() }"
                :disabled="isDisabled()" @click="onClickSearch">
                search
            </button>
        </div>
        <div class="" v-if="isShow">
            <div class="flex justify-center flex-wrap">
                <div class="p-20 w-full max-w-screen-sm min-w-72">
                    <PieChart class="justifyPieChartSize" position="right" :data="getPieChartDatas()"
                        :labels="getPieChartLabels()" canvasId="PieChartDatas" :labelAddPercentages="true"
                        :max-quantity="12" :to-fixed-number="2" />
                </div>
                <div class="p-10 pb-20 w-full max-w-screen-sm min-w-72 content-end">
                    <GroupBarChartKanta id="GroupBarChartKanta" :labels="getBarChartLabels()"
                        :doneDatas="getBarChartData()" :limit="12" />
                </div>
            </div>
            <hr>
            <br>
            <br>
            <div class="">
                <div class="pb-3 overflow-x-auto">
                    <div class="w-20">
                        <table class="text-nowrap">
                            <tr>
                                <td class="border border-black w-32"></td>
                                <template v-for="label in getBarChartLabels()">
                                    <td class="p-3 border border-black text-end">
                                        {{ label }}
                                    </td>
                                </template>
                            </tr>
                            <template v-for="label in getPieChartLabels()">
                                <tr>
                                    <td class="p-3 border border-black">
                                        {{ label }}
                                    </td>
                                    <template v-for="data in getBarChartData().find(e => e.label == label)?.data ?? []">
                                        <td class="p-3 border border-black text-end">
                                            {{ data.toLocaleString() }}
                                        </td>
                                    </template>
                                </tr>
                            </template>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import moment from 'moment';
import { onMounted, ref } from 'vue';
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import PieChart from "@/components/chart/PieChart.vue";
import GroupBarChartKanta from "@/components/chart/GroupBarChartKanta.vue";
import { BarChartData } from '@/components/chart/getFixRatio';
class DateData {
    date: Date;
    things: Array<Thing>;
    constructor() {
        this.date = new Date();
        this.things = [];
    }
}

class DaysAgoData {
    daysAgo: number;
    things: Array<Thing>;
    constructor() {
        this.daysAgo = 0;
        this.things = [];
    }
}

class Thing {
    name: string;
    value: number;
    constructor() {
        this.name = "";
        this.value = 0;
    }
}

// const minDate = new Date("1998/06/02")

const dateValue = ref<string | [Date, Date] | {
    start: string | Date;
    end: string | Date;
} | {
    startDate: string | Date;
    endDate: string | Date;
}>([new Date(), new Date()]);
const formatter = ref({
    date: "YYYY-MM-DD",
    month: "MM",
});

const isShow = ref<boolean>(false);
const daysAgoToDate = ref<Array<DateData>>([]);

onMounted(() => {
    const defaultEndDayStr = moment(new Date()).format('YYYY-MM-DD');
    const defaultStartDayStr = moment(new Date()).add(-6, "day").format('YYYY-MM-DD');
    dateValue.value = `${defaultStartDayStr} ~ ${defaultEndDayStr}`
})

function onClickSearch() {
    const dateStr = dateValue.value as string
    const dateStrArr = dateStr.split(' ~ ');
    daysAgoToDate.value = [];
    for (const data of datas.value) {
        const newDateData = new DateData();
        newDateData.date = moment(new Date()).add(-data.daysAgo, 'day').toDate();
        newDateData.things = data.things;
        if (
            newDateData.date >= moment(dateStrArr[0]).startOf('day').toDate() &&
            newDateData.date <= moment(dateStrArr[1]).endOf('day').toDate()
        )
            daysAgoToDate.value.push(newDateData);
    }
    // datas.value.map(e => e)



    isShow.value = true;
}

function getPieChartLabels() {
    const res: Array<string> = [];
    for (const data of daysAgoToDate.value) {
        for (const name of data.things.map(e => e.name)) {
            if (!res.includes(name)) res.push(name);
        }
    }
    return res;
}

function getPieChartDatas() {
    const labels = getPieChartLabels();
    const res: Array<number> = labels.map(e => { e; return 0 });
    for (const data of daysAgoToDate.value) {
        for (const thing of data.things) {
            const index = labels.findIndex(e => e == thing.name);
            if (index != -1) res[index] += thing.value;
        }
    }
    return res;
}

function getBarChartLabels() {

    return daysAgoToDate.value.map(e => moment(e.date).format("yyyy-MM-DD"))
}

function getBarChartData() {
    const labels = getPieChartLabels();
    const res: Array<BarChartData> = labels.map(e => {
        return {
            label: e,
            data: []
        }
    });
    for (const data of daysAgoToDate.value) {
        for (const thing of data.things) {
            const found = res.find(e => e.label == thing.name);
            if (found) found.data.push(thing.value);
        }
    }
    return res;
}

function isDisabled() {
    const res = dateValue.value as string
    if (res) return false
    else return true
}

const datas = ref<Array<DaysAgoData>>([
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

</script>