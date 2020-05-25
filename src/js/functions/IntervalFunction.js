import { BaseFunction } from "./BaseFunction.js";

// TODO Review if should be named Range instead
export class IntervalFunction extends BaseFunction {
    constructor (valueFunction, start, end) {
        this.valueFunction = valueFunction;
        this.start = start;
        this.end = end;
    }

    isWithinDomain(x) {
        return this.start < x && x < this.end;
    }

    getValue(x) {
        return this.valueFunction.getValue(x);
    }
}
IntervalFunction.prototype.Name = "Interval";
