import { BaseFunction } from "./BaseFunction.js";

// TODO Review if a sum can be done over an interval if all functions are pulse-interval ones.
export class PieceWiseFunction extends BaseFunction {
    constructor (intervalFunctions) {
        super(PieceWiseFunction.prototype.Name);
        this.intervalFunctions = intervalFunctions;
    }

    getValue(x) {
        let valueFunction = this.intervalFunctions.find((intervalFunction) => {
            return intervalFunction.isWithinDomain(x);
        });
        if (valueFunction === null) {
            return 0;
        }
        return valueFunction.getValue(x);
    }
}
PieceWiseFunction.prototype.Name = "Piece-wise";
