import { BaseFunction } from "./BaseFunction.js";

export class LinearFunction extends BaseFunction {
    constructor (slope, intercept) {
        super(LinearFunction.prototype.Name);
        this.slope = slope;
        this.intercept = this.intercept;
    }

    getValue (x) {
        return x * this.slope + this.intercept;
    }
}
LinearFunction.prototype.Name = "Linear";
