import { LearnCharts } from "../main.js";
(function (document, LearnCharts, Chart) {
    var canvas = document.getElementById('02_Periodic-constant-values-over-a-month');
    var valueFunction = LearnCharts.functionFactory.createFunction("Constant", {
        constantValue: 110.00
    });
    var periodicFunction = LearnCharts.functionFactory.createFunction("Periodic", {
        range: {
            startDate: new Date(2020, 6, 1),
            endDate: new Date(2020, 6, 30),
        },
        occurences: {
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
    var chartHelper = LearnCharts.chartHelperFactory.createChartHelper("Chart.js", Chart);
    var barChart = LearnCharts.chartFactory.createChart("BarChart", data);
    chartHelper.render(barChart, canvas);
})(document, LearnCharts, Chart);
