import { BarChart } from "./BarChart.js";

export class ChartFactory {
    createChart(type, data) {
        switch (type) {
            case BarChart.prototype.ChartType:
                return new BarChart(data);
            default:
                throw new Error("Unrecognized chart: " + type);
        }
    }
}
