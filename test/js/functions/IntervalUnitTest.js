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

    testSuite.addTest("Monthly interval", (done) => {
        const month1 = new LearnCharts.deps.Moment("2020-06-01");
        const month2 = new LearnCharts.deps.Moment("2020-07-01");
        const month3 = new LearnCharts.deps.Moment("2020-08-01");
        const month4 = new LearnCharts.deps.Moment("2020-09-01");
        const month5 = new LearnCharts.deps.Moment("2020-10-01");
        const month6 = new LearnCharts.deps.Moment("2020-11-01");
        const month7 = new LearnCharts.deps.Moment("2020-12-01");
        const numberOfOccurrences = 7;
        const range = rangeBuilder.build({from: month1, to: month7});

        const interval = intervalFactory.createMonthlyInterval(range);

        expect(interval.size()).toEqual(numberOfOccurrences);
        expect(interval.includes(month1)).toEqual(true);
        expect(interval.includes(month2)).toEqual(true);
        expect(interval.includes(month3)).toEqual(true);
        expect(interval.includes(month4)).toEqual(true);
        expect(interval.includes(month5)).toEqual(true);
        expect(interval.includes(month6)).toEqual(true);
        expect(interval.includes(month7)).toEqual(true);

        done();
    });

    testSuite.addTest("Monthly interval (specific days)", (done) => {
        const from = new LearnCharts.deps.Moment("2020-06-01");
        const month1 = new LearnCharts.deps.Moment("2020-06-01");
        const month15 = new LearnCharts.deps.Moment("2020-06-15");
        const month2 = new LearnCharts.deps.Moment("2020-07-01");
        const month25 = new LearnCharts.deps.Moment("2020-07-15");
        const month3 = new LearnCharts.deps.Moment("2020-08-01");
        const month35 = new LearnCharts.deps.Moment("2020-08-15");
        const month4 = new LearnCharts.deps.Moment("2020-09-01");
        const to = new LearnCharts.deps.Moment("2020-09-01");
        const expectedNumberOfIntervalDates = 7;
        const range = rangeBuilder.build({from, to});

        const interval = intervalFactory.createMonthlyInterval(range, [1, 15]);

        expect(interval.size()).toEqual(expectedNumberOfIntervalDates);
        expect(interval.includes(month1)).toEqual(true);
        expect(interval.includes(month15)).toEqual(true);
        expect(interval.includes(month2)).toEqual(true);
        expect(interval.includes(month25)).toEqual(true);
        expect(interval.includes(month3)).toEqual(true);
        expect(interval.includes(month35)).toEqual(true);
        expect(interval.includes(month4)).toEqual(true);

        done();
    });

    testSuite.addTest("Monthly interval (specific days and deltas)", (done) => {
        const from = new LearnCharts.deps.Moment("2020-06-01");
        const expected1 = new LearnCharts.deps.Moment("2020-05-26");
        const expected2 = new LearnCharts.deps.Moment("2020-06-09");
        const expected3 = new LearnCharts.deps.Moment("2020-06-25");
        const expected4 = new LearnCharts.deps.Moment("2020-07-09");
        const expected5 = new LearnCharts.deps.Moment("2020-07-26");
        const expected6 = new LearnCharts.deps.Moment("2020-08-09");
        const expected7 = new LearnCharts.deps.Moment("2020-08-26");
        const to = new LearnCharts.deps.Moment("2020-09-01");
        const expectedNumberOfIntervalDates = 7;
        const range = rangeBuilder.build({from, to});

        const interval = intervalFactory.createMonthlyInterval(range, [1, 15], [-6, -6]);

        expect(interval.size()).toEqual(expectedNumberOfIntervalDates);
        expect(interval.includes(expected1)).toEqual(true);
        expect(interval.includes(expected2)).toEqual(true);
        expect(interval.includes(expected3)).toEqual(true);
        expect(interval.includes(expected4)).toEqual(true);
        expect(interval.includes(expected5)).toEqual(true);
        expect(interval.includes(expected6)).toEqual(true);
        expect(interval.includes(expected7)).toEqual(true);

        done();
    });
    
    testSuite.addTest("Monthly interval (empty)", (done) => {
        const aDate = new LearnCharts.deps.Moment("2020-06-29");
        const anotherDate = new LearnCharts.deps.Moment("2020-07-29");
        const range = rangeBuilder.build({from: aDate, to: anotherDate});

        const interval = intervalFactory.createMonthlyInterval(range, [31]);

        expect(interval.size()).toEqual(0);

        done();
    });

    return testSuite;
}
