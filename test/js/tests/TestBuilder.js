import Test from "./Test.js";

export default class TestBuilder {
    constructor({timeoutInMillis}) {
        this.timeoutInMillis = timeoutInMillis;
    }

    build(name, runnable) {
        return new Test({
            name,
            runnable,
            timeoutInMillis: this.timeoutInMillis
        });
    }
}
