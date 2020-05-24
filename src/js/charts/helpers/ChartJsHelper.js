import { BaseHelper } from "./BaseHelper.js";

export class ChartJsHelper extends BaseHelper {
    ChartJs = null;

    backgroundAlpha = (0.2 * 255).toString(16);
    borderAlpha = (0.8 * 255).toString(16);

    constructor (api) {
        super(ChartJsHelper.prototype.HelperType);
        this.ChartJs = api;

        if (this.backgroundAlpha.length === 1) {
            this.backgroundAlpha = "0" + this.backgroundAlpha;
        }
        if (this.borderAlpha.length === 1) {
            this.borderAlpha = "0" + this.borderAlpha;
        }
    }

    render(chart, canvas) {
        let options;
        switch (chart.getType()) {
            case "BarChart":
                options = this.createBarChartOptions(chart);
                return new this.ChartJs(canvas, options);
            default:
                throw new Error(
                    "Helper does not implement Chart.js of type: " + 
                    chart.getType());
        }
    }

    createBarChartOptions(chart) {
        let backgroundColors = chart.getValueColors().map(
            this.toBackgroundColor, this);
        let borderColors = chart.getValueColors().map(
            this.toBorderColor, this);

        return {
            type: "bar",
            data: {
                labels: chart.getValueLabels(),
                datasets: [{
                    label: chart.getYAxisLabel(),
                    data: chart.getDataValues(),
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };
    }

    toBackgroundColor(baseColor) {
        return this.toColorWithAlpha(baseColor, this.backgroundAlpha);
    }

    toBorderColor(baseColor) {
        return this.toColorWithAlpha(baseColor, this.borderAlpha);
    }

    toColorWithAlpha(baseColor, alpha) {
        if (typeof baseColor !== "string" || 
            /^#[a-f0-9]{6}$/.test(baseColor) === false) {

            throw new Error("Unsupported color: " + baseColor);
        }

        return baseColor + alpha;
    }
}
ChartJsHelper.prototype.HelperType = "Chart.js";
