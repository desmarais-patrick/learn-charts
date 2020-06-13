export default class BaseInterval {
    constructor(type, range) {
        this.type = type;
        this.range = range;
    }
    IsValue(x) {
        throw new Error("Not implemented, override in a subclass");
    }
}
