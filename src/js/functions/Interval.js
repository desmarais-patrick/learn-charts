export default class DateInterval {
    constructor(name, range) {
        this._name = name;
        this._range = range;
        this._interval = [];
    }
    addValue(newValue) {
        this._interval.push(newValue);
    }
    includes(x) {
        return !!this._interval.find((value) => value.isSame(x, "day"));
    }
    size() {
        return this._interval.length;
    }
    toString() {
        return `${this._name} interval with ${this._interval.length} values` + 
            ` between ${this._range.from} and ${this._range.to}. Values are:` +
            ` ${this._interval.join(", ")}`;
    }
}
