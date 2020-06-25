export default class Test {
    constructor({name, runnable, timeoutInMillis}) {
        this.name = name;
        this.runnable = runnable;

        this.timeoutInMillis = timeoutInMillis;
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

    run() {
        this.startTime = new Date();
        this.status = this.statuses.PENDING;
        this.timeoutId = window.setTimeout(() => this._timeout(), this.timeoutInMillis);
        window.setTimeout(() => {
            try {
                this.runnable((error) => this._doneRunning(error));
            } catch (error) {
                this._doneRunning(error);
            }
        }, 0);
        return this;
    }

    isPending() {
        return (this.status === this.statuses.PENDING);
    }

    toString() {
        let duration, formattedDuration;
        
        if (this.status === this.statuses.FAILED ||
            this.status === this.statuses.SUCCESS) {

            duration = this.stopTime.getTime() - this.startTime.getTime();
            formattedDuration = duration > 1000 ?
                (duration / 1000) + "s" : 
                duration + "ms";
        } else {
            formattedDuration = "?ms";
        }
        
        return this.name + " " + this.status + " " + this.messages.join(", ") + 
            " " + "(" + formattedDuration + ")";
    }

    _timeout() {
        this.status = this.statuses.TIMEOUT;
        this.stopTime = new Date();
    }

    _doneRunning(error) {
        if (error) {
            this._addMessage(error)._addMessage(error.stack)._fail();
            return;
        }
        this._success();
    }

    _addMessage(message) {
        this.messages.push(message);
        return this;
    };

    _fail() {
        this._endTest(this.statuses.FAILED);
    }

    _success() {
        this._endTest(this.statuses.SUCCESS);
    }

    _endTest(finalState) {
        if (this.status === finalState) {
            throw new Error("Implementation error! Already in final state: " + finalState);
        }

        window.clearTimeout(this.timeoutId);
        this.status = finalState;
        this.stopTime = new Date();
    }
}
