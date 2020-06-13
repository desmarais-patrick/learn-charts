export default class Range {
    constructor(LearnCharts, from, to) {
        this.from = new LearnCharts.deps.Moment(from);
        if (this.from.isValid() === false) {
            throw new Error("Invalid range start: " + from);
        }

        this.to = new LearnCharts.deps.Moment(to);
        if (this.end.isValid() === false) {
            throw new Error("Invalid range end: " + to);
        }
    }
}
