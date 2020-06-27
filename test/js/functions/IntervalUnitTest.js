import { LearnCharts } from "../../../src/js/main.js";

import RangeBuilder from "../../../src/js/functions/RangeBuilder.js";
import IntervalFactory from "../../../src/js/functions/IntervalFactory.js";

export default function createIntervalUnitTestSuite({expect, testSuiteBuilder}) {
    const testSuite = testSuiteBuilder.build("Interval");

    let rangeBuilder = new RangeBuilder(LearnCharts);
    let intervalFactory = new IntervalFactory(LearnCharts);

    testSuite.addTest("Daily interval", (done) => {
        const yesterday = new LearnCharts.deps.Moment().add(-1, "days");
        const today = new LearnCharts.deps.Moment();
        const tomorrow = new LearnCharts.deps.Moment().add(1, "days");
        const range = rangeBuilder.build({from: yesterday, to: tomorrow});
        const interval = intervalFactory.createDailyInterval(range);

        expect(interval.size()).toEqual(3);
        expect(interval.includes(yesterday)).toEqual(true);
        expect(interval.includes(today)).toEqual(true);
        expect(interval.includes(tomorrow)).toEqual(true);

        done();
    });

    testSuite.addTest("Daily interval of one", (done) => {
        const today = new LearnCharts.deps.Moment();
        const range = rangeBuilder.build({from: today, to: today});
        const interval = intervalFactory.createDailyInterval(range);

        expect(interval.size()).toEqual(1);
        expect(interval.includes(today)).toEqual(true);

        done();
    });

    return testSuite;
}
