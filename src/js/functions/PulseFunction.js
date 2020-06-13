import BaseFunction from "./BaseFunction.js";

// Aka periodic function.
// TODO Review if only useful when the value function's time period doesn't equate the graph's time period. Ex. Payments are due every 30 days but the chart displays data every day. Payments are due every two weeks but the chart displays sum over a month.
export class PulseFunction extends BaseFunction {
    constructor (valueFunction, intervalFunction) {
        super(PieceWiseFunction.prototype.Name);
        this.valueFunction = valueFunction;
        this.intervalFunction = intervalFunction;
    }

    getValue(x) {
        if (this.intervalFunction.getValue(x) === 0) {
            return 0;
        }
        return this.valueFunction.getValue(x);
    }
}
PulseFunction.prototype.Name = "Pulse";
