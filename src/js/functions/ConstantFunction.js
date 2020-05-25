import { BaseFunction } from "./ConstantFunction.js";

export class ConstantFunction extends BaseFunction {
    constructor (constant) {
        super(ConstantFunction.prototype.Name);
        this.constantValue = constant;
    }

    getValue() {
        return this.constantValue;
    }
}
ConstantFunction.prototype.Name = "Constant";