import Range from "./Range.js";

export default class RangeBuilder {
    constructor(LearnCharts) {
        this.LearnCharts = LearnCharts;
    }

    build({from, to}) {
        return new Range(this.LearnCharts, from, to);
    }
}
