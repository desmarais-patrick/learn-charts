export class BasicBarChartExample {
    constructor(LearnCharts) {
        this.LearnCharts = LearnCharts;
    }

    render(elementId) {
        const canvas = this.LearnCharts.browser.document.getElementById(elementId);
        const data = {
            yAxisLabel: "Cashflow - Total revenue",
            values: [
                {
                    color: "#a7ff83",
                    value: 500.56,
                    label: "January"
                },
                {
                    color: "#17b978",
                    value: 350.76,
                    label: "February"
                },
                {
                    color: "#086972",
                    value: 100.12,
                    label: "March"
                },
                {
                    color: "#071a52",
                    value: -200.21,
                    label: "April"
                },
                {
                    color: "#086972",
                    value: 150.76,
                    label: "May"
                }
            ]
        };
        const chartHelper = this.LearnCharts.src.chartHelperFactory.createChartHelper(
            "Chart.js", this.LearnCharts.deps.Chart);
        const barChart = this.LearnCharts.src.chartFactory.createChart("BarChart", data);
        chartHelper.render(barChart, canvas);
    }
}
