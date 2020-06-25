import TestBuilder from "./TestBuilder.js";
import TestSuite from "./TestSuite.js";

export default class TestSuiteBuilder {
    constructor({logger, timeoutInMillis}) {
        this._logger = logger;
        this._timeoutInMillis = timeoutInMillis;

        this._testBuilder = new TestBuilder({timeoutInMillis});
    }

    build(name) {
        return new TestSuite({
            name,
            testBuilder: this._testBuilder,
            logger: this._logger,
            timeoutInMillis: this._timeoutInMillis
        });
    }
}
