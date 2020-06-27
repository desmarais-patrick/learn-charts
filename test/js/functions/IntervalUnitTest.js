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

    testSuite.addTest("Weekly interval", (done) => {
        const monday = new LearnCharts.deps.Moment("2020-06-29");
        const monday2 = new LearnCharts.deps.Moment("2020-07-06");
        const monday3 = new LearnCharts.deps.Moment("2020-07-13");
        const monday4 = new LearnCharts.deps.Moment("2020-07-20");
        const monday5 = new LearnCharts.deps.Moment("2020-07-27");
        const oneMonthLater = new LearnCharts.deps.Moment("2020-07-29");
        const numberOfMondays = 5;
        const range = rangeBuilder.build({from: monday, to: oneMonthLater});

        const interval = intervalFactory.createWeeklyInterval(range);


        expect(interval.size()).toEqual(numberOfMondays);
        expect(interval.includes(monday)).toEqual(true);
        expect(interval.includes(monday2)).toEqual(true);
        expect(interval.includes(monday3)).toEqual(true);
        expect(interval.includes(monday4)).toEqual(true);
        expect(interval.includes(monday5)).toEqual(true);

        done();
    });

    testSuite.addTest("Weekly interval (specific days)", (done) => {
        const from = new LearnCharts.deps.Moment("2020-07-01");
        const wednesday = new LearnCharts.deps.Moment("2020-07-01");
        const monday = new LearnCharts.deps.Moment("2020-07-06");
        const wednesday2 = new LearnCharts.deps.Moment("2020-07-08");
        const monday2 = new LearnCharts.deps.Moment("2020-07-13");
        const wednesday3 = new LearnCharts.deps.Moment("2020-07-15");
        const monday3 = new LearnCharts.deps.Moment("2020-07-20");
        const wednesday4 = new LearnCharts.deps.Moment("2020-07-22");
        const monday4 = new LearnCharts.deps.Moment("2020-07-27");
        const wednesday5 = new LearnCharts.deps.Moment("2020-07-29");
        const to = new LearnCharts.deps.Moment("2020-07-31");
        const expectedNumberOfIntervalDates = 9;
        const range = rangeBuilder.build({from, to});

        const interval = intervalFactory.createWeeklyInterval(range, ["Monday", "Wednesday"]);

        expect(interval.size()).toEqual(expectedNumberOfIntervalDates);
        expect(interval.includes(wednesday)).toEqual(true);
        expect(interval.includes(monday)).toEqual(true);
        expect(interval.includes(wednesday2)).toEqual(true);
        expect(interval.includes(monday2)).toEqual(true);
        expect(interval.includes(wednesday3)).toEqual(true);
        expect(interval.includes(monday3)).toEqual(true);
        expect(interval.includes(wednesday4)).toEqual(true);
        expect(interval.includes(monday4)).toEqual(true);
        expect(interval.includes(wednesday5)).toEqual(true);

        done();
    });

    testSuite.addTest("Weekly interval (empty)", (done) => {
        const monday = new LearnCharts.deps.Moment("2020-06-29");
        const range = rangeBuilder.build({from: monday, to: monday});

        const interval = intervalFactory.createWeeklyInterval(range, ["Wednesday"]);

        expect(interval.size()).toEqual(0);

        done();
    });

    return testSuite;
}
