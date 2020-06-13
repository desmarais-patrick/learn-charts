/*global document, Chart, moment*/
import Moment from "./deps/moment/moment.js";

import { ChartHelperFactory } from "./charts/helpers/ChartHelperFactory.js";
import { ChartFactory } from "./charts/ChartFactory.js";
import { FunctionFactory } from "./functions/FunctionFactory.js";

'use strict';

let chartHelperFactory = new ChartHelperFactory();
let chartFactory = new ChartFactory();
let functionFactory = new FunctionFactory();

export let LearnCharts = {
    browser: {
        document
    },

    deps: {
        Chart,
        Moment
    },

    src: {
        chartHelperFactory,
        chartFactory,
        functionFactory,
    },
};
