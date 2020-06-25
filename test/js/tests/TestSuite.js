export default class TestSuite {
    constructor({name, testBuilder, logger, timeoutInMillis}) {
        this.name = name;
        this.tests = [];
        this.testBuilder = testBuilder;
        this.pending = false;

        this.logger = logger;

        this.timeoutInMillis = timeoutInMillis;
    }

    addTest(name, runnable) {
        const newTest = this.testBuilder.build(name, runnable);
        this.tests.push(newTest);
    }

    run() {
        this.pending = true;
        this.tests.forEach((test) => test.run());
    }

    isPending() {
        return this.pending;
    }

    stop() {
        const anyPendingTests = this.tests.find((test) => test.isPending());
        if (!anyPendingTests) {
            this._end();
            return;
        }

        // One last timeout.
        window.setTimeout(() => this._end(), this.timeoutInMillis);
    }

    _end() {
        this.pending = false;
        this.logger.log(this.toString());
    }

    toString() {
        const strings = this.tests.map((test) => test.toString());
        const result = (strings.length === 0) ? "No tests :(" : strings.join("\n");
        return "▪ " + this.name + "\n\n" + result + "\n\n";
    };
}