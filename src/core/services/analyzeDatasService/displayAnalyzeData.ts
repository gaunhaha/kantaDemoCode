import moment from "moment";
import { AnalyzeData, Thing } from "@/core/services/api/analyze/analyzeData";

export class DisplayAnalyzeData {
    date: Date;
    things: Array<Thing>;
    constructor(data: AnalyzeData) {
        this.date = moment(new Date()).add(-data.daysAgo, 'day').toDate();
        this.things = data.things;
    }
}