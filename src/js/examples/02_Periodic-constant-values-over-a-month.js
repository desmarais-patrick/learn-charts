export default class {
    constructor(LearnCharts) {
        this.LearnCharts = LearnCharts;
    }

    render(elementId) {
        const canvas = this.LearnCharts.browser.document.getElementById(elementId);
        var valueFunction = this.LearnCharts.src.functionFactory.createFunction("Constant", {
            constantValue: 110.00
        });
        var periodicFunction = this.LearnCharts.src.functionFactory.createFunction("Periodic", {
            range: {
                startDate: new Date(2020, 6, 1),
                endDate: new Date(2020, 6, 30),
            },
            interval: {
                type: "Weekly",
                day: "Saturday"
            },
            valueFunction,
            valueLabels: {
                type: "Day"
            },
            color: "#17b978"
        });
        var data = {
            yAxisLabel: "Grocery expenses - June 2020",
            values: periodicFunction.getValues()
        };
        const chartHelper = this.LearnCharts.src.chartHelperFactory.createChartHelper(
            "Chart.js", this.LearnCharts.deps.Chart);
        const barChart = this.LearnCharts.src.chartFactory.createChart("BarChart", data);
        chartHelper.render(barChart, canvas);
    }
}
