<template>
    <div class="">
        <div class="ps-2 mb-2">
            <h2 class="text-xl">Analyze What Fruits I Ate</h2>
        </div>
        <div class="w-full flex gap-3">
            <vue-tailwind-datepicker :formatter="formatter" v-model="dateValue" readonly />
            <button class="btn" :disabled="isDisabled()" @click="onClickSearch">
                search
            </button>
        </div>
        <div class="" v-if="isShow">
            <div class="flex justify-center flex-wrap">
                <div class="md:p-20 w-full max-w-screen-sm min-w-72">
                    <PieChart class="" position="right" :data="getPieChartDatasByDisplayAnalyzeData(daysAgoToDate)"
                        :labels="getPieChartLabelsByDisplayAnalyzeData(daysAgoToDate)" canvasId="PieChartDatas"
                        :labelAddPercentages="true" :max-quantity="12" :to-fixed-number="2" />
                </div>
                <div class="md:p-10 w-full max-w-screen-md min-w-96 content-end">
                    <GroupBarChartKanta class="" id="BarChart"
                        :labels="getBarChartLabelsByDisplayAnalyzeData(daysAgoToDate)"
                        :doneDatas="getBarChartDataByDisplayAnalyzeData(daysAgoToDate)" :limit="12" />
                </div>
            </div>
            <hr>
            <br>
            <br>
            <div class="">
                <div class="pb-3 overflow-x-auto">
                    <div class="w-20">
                        <table class="text-nowrap">
                            <tbody>
                                <tr>
                                    <td class="border border-black w-32"></td>
                                    <template v-for="label in getBarChartLabelsByDisplayAnalyzeData(daysAgoToDate)">
                                        <td class="p-3 border border-black text-end">
                                            {{ label }}
                                        </td>
                                    </template>
                                </tr>
                                <template v-for="label in getPieChartLabelsByDisplayAnalyzeData(daysAgoToDate)">
                                    <tr>
                                        <td class="p-3 border border-black">
                                            {{ label }}
                                        </td>
                                        <template
                                            v-for="data in getBarChartDataByDisplayAnalyzeData(daysAgoToDate).find(e => e.label == label)?.data ?? []">
                                            <td class="p-3 border border-black text-end">
                                                {{ data.toLocaleString() }}
                                            </td>
                                        </template>
                                    </tr>
                                </template>
                            </tbody>
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
import { DisplayAnalyzeData } from '@/core/services/analyzeDatasService/displayAnalyzeData';
import {
    getDisplayAnalyzeDatas,
    getPieChartLabelsByDisplayAnalyzeData,
    getPieChartDatasByDisplayAnalyzeData,
    getBarChartLabelsByDisplayAnalyzeData,
    getBarChartDataByDisplayAnalyzeData
} from '@/core/services/analyzeDatasService/analyzeDatasService';

// const minDate = new Date("1998/06/02")
const dateValue = ref<string | [Date, Date] | { start: string | Date; end: string | Date; } | { startDate: string | Date; endDate: string | Date; }>(`${moment(new Date()).format('YYYY-MM-DD')} ~ ${moment(new Date()).format('YYYY-MM-DD')}`);
const formatter = ref({ date: "YYYY-MM-DD", month: "MM", });
const isShow = ref<boolean>(false);
const daysAgoToDate = ref<Array<DisplayAnalyzeData>>([]);

onMounted(() => {
    const defaultEndDayStr = moment(new Date()).format('YYYY-MM-DD');
    const defaultStartDayStr = moment(new Date()).add(-6, "day").format('YYYY-MM-DD');
    dateValue.value = `${defaultStartDayStr} ~ ${defaultEndDayStr}`
})

async function onClickSearch() {
    const dateStr = dateValue.value as string
    const dateStrArr = dateStr.split(' ~ ');
    daysAgoToDate.value = await getDisplayAnalyzeDatas(dateStrArr[0], dateStrArr[1]);
    isShow.value = true;
}

function isDisabled() {
    const res = dateValue.value as string
    const resArr = res.split(' ~ ');
    if (resArr.length == 2 && moment(resArr[0]).isValid() && moment(resArr[1]).isValid()) return false
    else return true
}
</script>