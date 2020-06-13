import Range from "./Range.js";

export default class RangeBuilder {
    constructor(LearnCharts) {
        this.LearnCharts = LearnCharts;
    }

    createRange({from, to}) {
        return new Range(this.LearnCharts, from, to);
    }
}
