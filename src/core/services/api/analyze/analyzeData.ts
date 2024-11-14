export class AnalyzeData {
    daysAgo: number;
    things: Array<Thing>;
    constructor() {
        this.daysAgo = 0;
        this.things = [];
    }
}

export class Thing {
    name: string;
    value: number;
    constructor() {
        this.name = "";
        this.value = 0;
    }
}