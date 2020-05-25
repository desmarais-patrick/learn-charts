import { BaseFunction } from "./BaseFunction.js";

export class CompoundFunction extends BaseFunction {
    constructor (initialAmount, compoundingFrequency, interestRate) {
        super(CompoundFunction.prototype.Name);

        this.initialAmount = initialAmount;

        this.compoundingFrequency = compoundingFrequency;
        if (this.compoundingFrequency === 0) {
            throw new Error("Invalid compounding frequency; must different from 0");
        }

        this.interestRate = interestRate;
    }

    getValue(x) {
        return this.initialAmount *
            Math.pow(1 + this.interestRate / this.compoundingFrequency,
                this.compoundingFrequency * x);
    }
}
CompoundFunction.prototype.Name = "CompoundInterest";
