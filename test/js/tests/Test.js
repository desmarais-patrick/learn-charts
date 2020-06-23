export default class Test {
    constructor({name, runnable, setTimeout, timeoutInMillis, clearTimeout}) {
        this.name = name;
        this.runnable = runnable;

        this.setTimeout = setTimeout;
        this.timeoutInMillis = timeoutInMillis;
        this.clearTimeout = clearTimeout;
        this.timeoutId = null;

        this.statuses = {
            UNKNOWN: "[unknown]",
            PENDING: "[pending]",
            FAILED: "[✘ failed]",
            SUCCESS: "︎︎︎[✔ success]",
            TIMEOUT: "[⚑ timeout]",
        };
        this.status = this.statuses.UNKNOWN;        

        this.messages = [];
        this.startTime = null;
        this.stopTime = null;
    }

    
}
