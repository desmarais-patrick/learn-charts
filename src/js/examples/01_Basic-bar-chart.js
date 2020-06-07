import { LearnCharts } from "../main.js";
(function (document, LearnCharts, Chart) {
    var canvas = document.getElementById('01_Basic-bar-chart');
    var data = {
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
    var chartHelper = LearnCharts.chartHelperFactory.createChartHelper("Chart.js", Chart);
    var barChart = LearnCharts.chartFactory.createChart("BarChart", data);
    chartHelper.render(barChart, canvas);
})(document, LearnCharts, Chart);
