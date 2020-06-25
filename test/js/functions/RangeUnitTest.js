import { LearnCharts } from "../../../src/js/main.js";
import Range from "../../../src/js/functions/Range.js";

export default function createRangeUnitTestSuite({expect, testSuiteBuilder}) {
    const testSuite = testSuiteBuilder.build("Range");

    let aDate = new Date('1995-12-17T03:24:00');
    let aDateBefore = new Date('1995-12-16T12:24:00');
    let aDateAfter = new Date('1995-12-18T13:24:00');

    testSuite.addTest("Valid range is valid", (done) => {
        const range = new Range(LearnCharts, aDateBefore, aDateAfter);

        expect(range.isValid()).toEqual(true);
        expect(range.includes(aDateBefore)).toEqual(true);
        expect(range.includes(aDate)).toEqual(true);
        expect(range.includes(aDateAfter)).toEqual(true);

        done();
    });

    testSuite.addTest("Invalid range is invalid", (done) => {
        const range = new Range(LearnCharts, aDateAfter, aDateBefore);

        expect(range.isValid()).toEqual(false);

        done();
    });

    return testSuite;
}
