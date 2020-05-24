import { BaseChart } from "./BaseChart.js";

export class BarChart extends BaseChart {
    constructor (data) {
        super(BarChart.prototype.ChartType);
        this.data = data;
    }

    getYAxisLabel() {
        return this.data.yAxisLabel;
    }

    getValueColors() {
        return this.data.values.map(value => value.color);
    }

    getValueLabels() {
        return this.data.values.map(value => value.label);
    }

    getDataValues() {
        return this.data.values.map(value => value.value);
    }
}
BarChart.prototype.ChartType = "BarChart";
