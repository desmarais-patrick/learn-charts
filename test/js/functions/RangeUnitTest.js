import { LearnCharts } from "../../../src/js/main.js";

import RangeBuilder from "../../../src/js/functions/RangeBuilder.js";

export default function createRangeUnitTestSuite({expect, testSuiteBuilder}) {
    const testSuite = testSuiteBuilder.build("Range");

    let aDate = new Date('1995-12-17T03:24:00');
    let aDateBefore = new Date('1995-12-16T12:24:00');
    let aDateAfter = new Date('1995-12-18T13:24:00');

    let rangeBuilder = new RangeBuilder(LearnCharts);

    testSuite.addTest("Valid range is valid", (done) => {
        const range = rangeBuilder.build({from: aDateBefore, to: aDateAfter});

        expect(range.isValid()).toEqual(true);
        expect(range.includes(aDateBefore)).toEqual(true);
        expect(range.includes(aDate)).toEqual(true);
        expect(range.includes(aDateAfter)).toEqual(true);

        done();
    });

    testSuite.addTest("Invalid range is invalid", (done) => {
        const range = rangeBuilder.build({from: aDateAfter, to: aDateBefore});

        expect(range.isValid()).toEqual(false);

        done();
    });

    return testSuite;
}
