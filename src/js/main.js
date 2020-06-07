/*global document, Chart, moment*/
import Moment from "./deps/moment/moment.js";

import { ChartHelperFactory } from "./charts/helpers/ChartHelperFactory.js";
import { ChartFactory } from "./charts/ChartFactory.js";

'use strict';

let chartHelperFactory = new ChartHelperFactory();
let chartFactory = new ChartFactory();

export let LearnCharts = {
    browser: {
        document
    },

    deps: {
        Chart,
        Moment
    },

    src: {
        chartHelperFactory: chartHelperFactory,
        chartFactory: chartFactory,
    },
};
