import { CompoundFunction } from "./CompoundFunction.js";
import { ConstantFunction } from "./ConstantFunction.js";
import { IntervalFunction } from "./IntervalFunction.js";
import { LinearFunction } from "./LinearFunction.js";
import { PieceWiseFunction } from "./PieceWiseFunction.js";
import { PulseFunction } from "./PulseFunction.js";

export class FunctionFactory {
    createFunction(name, options) {
        let newOptions;
        switch (name) {
            case "Constant":
                return new ConstantFunction(options.constant);
            default:
                throw new Error("Unrecognized function name: " + name);
        }
    }
    createCompoundFunction(initialAmount, compoundingFrequency, interestRate, 
            start, end) {

        let aFunction = new CompoundFunction(initialAmount, 
            compoundingFrequency, interestRate);

        let interval = new IntervalFunction(aFunction, start, end);
        return interval;
    } // TODO Review if we add pulse function to mimic payments made at a precise time for sums over a period.
    createConstantFunction(constant, start, end) {
        let aFunction = new ConstantFunction(constant);
        let interval = new IntervalFunction(aFunction, start, end);
        return interval;
    } // TODO Review if we add pulse function to mimic x axis.
    createLinearFunction(slope, intercept, start, end) {
        let aFunction = new LinearFunction(slope, intercept);
        let interval = new IntervalFunction(aFunction, start, end);
        return interval;
    }
}