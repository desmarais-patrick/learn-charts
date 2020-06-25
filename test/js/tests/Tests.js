import expect from "./Expect.js";
import HtmlLogger from "./HtmlLogger.js";
import TestSuiteBuilder from "./TestSuiteBuilder.js";

export default class Tests {
    constructor({document, rootNodeId, timeoutInMillis}) {
        this._logger = new HtmlLogger(document, rootNodeId);
        this._timeoutInMillis = timeoutInMillis;

        const testSuiteBuilder = new TestSuiteBuilder({
            logger: this._logger,
            timeoutInMillis: timeoutInMillis
        });
        this._testSuiteOptions = {
            expect,
            testSuiteBuilder
        };
        this._testSuites = [];
    }

    add(createTestSuite) {
        const testSuite = createTestSuite(this._testSuiteOptions);
        this._testSuites.push(testSuite);
    }

    run() {
        console.log("Hello from Learn Charts!");

        const startTime = new Date();
        this._printStart();

        this._testSuites.forEach((ts) => ts.run());

        window.setTimeout(() => {
            this._testSuites.forEach((ts) => ts.stop());

            if (this._isAnyPendingTest() === false) {
                const stopTime = new Date();
                this._printFinish(startTime, stopTime);
                return;
            }

            // Wait for last test suites to finish.
            window.setTimeout(() => {
                const stopTime = new Date();
                this._printFinish(startTime, stopTime);
            }, this._timeoutInMillis);
        }, 0);
    }

    _isAnyPendingTest() {
        return !!this._testSuites.find((ts) => ts.isPending());
    }

    _printStart() {
        this._logger.log("Tests have started");
        this._logger.log("---");
    }

    _printFinish(startTime, stopTime) {
        const duration = stopTime.getTime() - startTime.getTime();
        var formattedDuration = duration > 1000 ?
            (duration / 1000) + "s" : 
            duration + "ms";
        this._logger.log("---");
        this._logger.log("Tests have completed in " + formattedDuration);
    }
}
