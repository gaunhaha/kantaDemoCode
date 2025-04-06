<template>
    <div class="max-w-4xl mx-auto">
        <div v-show="showInstruction" class="text-black bg-gray-100 p-4 mb-10 rounded-md shadow-md relative">
            <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700" @click="showInstruction = false">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 class="font-bold text-lg">{{ t('Analysis.title') }}</h2>
            <p class="mb-3">{{ t('Analysis.instruction') }}</p>
            <p>{{ t('Analysis.instructionDetail') }}</p>
        </div>
        <div class="text-primary">
            <!-- <div class="ps-2 mb-2">
                <h2 class="text-xl">{{ t('Analysis.title') }}</h2>
            </div> -->
            <div class="w-full flex gap-3">
                <vue-tailwind-datepicker :formatter="formatter" v-model="dateValue" readonly />
                <button id="analysis-search-button" class="btn-light" :disabled="isDisabled()" @click="onClickSearch">
                    {{ t('Analysis.searchButton') }}
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
                        <el-table :data="tableData" border class="w-full custom-table" :header-cell-style="{
                            background: 'linear-gradient(to right, #93C5FD, #60A5FA)',
                            color: '#1E3A8A',
                            fontWeight: 'bold',
                            fontSize: '0.7rem'  // 14px
                        }" :cell-style="getCellStyle" :row-class-name="getRowClass">
                            <!-- 日期欄位 -->
                            <el-table-column prop="date" :label="''" width="120" fixed="left" :header-cell-style="{
                                background: 'linear-gradient(to right, #A5B4FC, #818CF8)',
                                color: '#312E81',
                                fontWeight: 'bold',
                                fontSize: '0.875rem'  // 14px
                            }" />

                            <!-- 動態生成的日期欄位 -->
                            <template v-for="label in getBarChartLabelsByDisplayAnalyzeData(daysAgoToDate)"
                                :key="label">
                                <el-table-column :prop="label" :label="label" align="right" />
                            </template>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import moment from 'moment';
import { onMounted, ref, computed } from 'vue';
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
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// const minDate = new Date("1998/06/02")
const dateValue = ref<string | [Date, Date] | { start: string | Date; end: string | Date; } | { startDate: string | Date; endDate: string | Date; }>(`${moment(new Date()).format('YYYY-MM-DD')} ~ ${moment(new Date()).format('YYYY-MM-DD')}`);
const formatter = ref({ date: "YYYY-MM-DD", month: "MM", });
const isShow = ref<boolean>(false);
const daysAgoToDate = ref<Array<DisplayAnalyzeData>>([]);
const showInstruction = ref<boolean>(true);

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

// 處理表格資料
const tableData = computed(() => {
    const labels = getPieChartLabelsByDisplayAnalyzeData(daysAgoToDate.value);
    return labels.map(label => {
        const rowData: Record<string, any> = {
            date: t('Analysis.DataName.' + label)
        };

        // 獲取該水果的所有日期數據
        const fruitData = getBarChartDataByDisplayAnalyzeData(daysAgoToDate.value)
            .find(e => e.label == label)?.data ?? [];

        // 將數據與日期對應
        getBarChartLabelsByDisplayAnalyzeData(daysAgoToDate.value)
            .forEach((dateLabel, index) => {
                rowData[dateLabel] = fruitData[index]?.toLocaleString() ?? '0';
            });

        return rowData;
    });
});

interface TableCell {
    row: Record<string, any>;
    column: {
        property: string;
    };
    rowIndex: number;
    columnIndex: number;
}

const getCellStyle = ({ row, column, rowIndex, columnIndex }: TableCell) => {
    rowIndex
    columnIndex
    const value = Number(row[column.property]);
    if (column.property === 'date') return {};

    const opacity = Math.min(value / 1000, 0.35);
    return {
        background: `rgba(147, 197, 253, ${opacity})`,
        transition: 'all 0.3s ease'
    };
};

interface RowProps {
    row: Record<string, any>;
    rowIndex: number;
}

const getRowClass = ({ row, rowIndex }: RowProps) => {
    row
    rowIndex
    return 'hover:bg-blue-50 transition-colors duration-200';
};
</script>

<style>
.custom-table {
    @apply rounded-lg overflow-hidden shadow-sm;
    /* 更輕的陰影 */
}

.custom-table .el-table__header-wrapper {
    @apply shadow-sm;
}

.custom-table .el-table__row:hover>td {
    @apply bg-blue-50;
}

.custom-table .el-table__cell {
    @apply align-middle;
}

/* 圓角設定 */
.custom-table {
    border-radius: 0.5rem;
}

.custom-table th:first-child {
    border-top-left-radius: 0.5rem;
}

.custom-table th:last-child {
    border-top-right-radius: 0.5rem;
}

/* 添加邊框顏色 */
.custom-table td,
.custom-table th {
    border-color: #93C5FD !important;
    /* blue-300 */
}
</style>