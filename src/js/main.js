import { ChartHelperFactory } from "./charts/helpers/ChartHelperFactory.js";
import { ChartFactory } from "./charts/ChartFactory.js";

'use strict';

let chartHelperFactory = new ChartHelperFactory();
let chartFactory = new ChartFactory();

export let LearnCharts = {
    chartHelperFactory: chartHelperFactory,
    chartFactory: chartFactory
};
