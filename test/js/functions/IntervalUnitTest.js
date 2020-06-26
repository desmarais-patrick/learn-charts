import { LearnCharts } from "../../../src/js/main.js";

import RangeBuilder from "../../../src/js/functions/RangeBuilder.js";
import IntervalFactory from "../../../src/js/functions/IntervalFactory.js";

export default function createIntervalUnitTestSuite({expect, testSuiteBuilder}) {
    const testSuite = testSuiteBuilder.build("Interval");

    let aDate = new Date('1995-12-17T03:24:00');
    let aDateBefore = new Date('1995-12-16T12:24:00');
    let aDateAfter = new Date('1995-12-18T13:24:00');

    let rangeBuilder = new RangeBuilder(LearnCharts);
    let intervalFactory = new IntervalFactory(LearnCharts);

    testSuite.addTest("Daily interval", (done) => {
        const yesterday = new LearnCharts.deps.Moment().add(-1, "days");
        const today = new LearnCharts.deps.Moment();
        const tomorrow = new LearnCharts.deps.Moment().add(1, "days");
        const range = rangeBuilder.build({from: yesterday, to: tomorrow});
        const interval = intervalFactory.createDailyInterval(range);

        expect(interval.includes(yesterday)).toEqual(true);
        expect(interval.includes(today)).toEqual(true);
        expect(interval.includes(tomorrow)).toEqual(true);

        done();
    });

    return testSuite;
}
