class Expect {
    constructor(value1) {
        this.value1 = value1;
    }

    toEqual(value2) {
        if (this.value1 !== value2) {
            this._throw(this.value1, "to equal", value2);
        }
    }

    toNotEqual(value2) {
        if (this.value1 === value2) {
            this._throw(this.value1, "to NOT equal", value2);
        }
    }

    toBeGreaterThan(value2) {
        if (this.value1 <= value2) {
            this._throw(this.value1, "to be greater than", value2);
        }
    };

    toBeLessThan(value2) {
        if (this.value1 >= value2) {
            this._throw(this.value1, "to be less than", value2);
        }
    };

    toBeDefined() {
        if (typeof this.value1 === "undefined") {
            this._throw(this.value1, "to be defined");
        }
    };

    toBeNull() {
        if (this.value1 !== null) {
            this._throw(this.value1, "to be null");
        }
    };

    toNotBeNull() {
        if (this.value1 === null) {
            this._throw(this.value1, "to NOT be null");
        }
    };

    toBeObject() {
        if (typeof this.value1 !== "object") {
            this._throw(this.value1, "to be an object");
        }
    };

    _throw(value1, reason, value2) {
        let message = `Expected '${value1}' ${reason}`;
        if (typeof value2 !== "undefined") {
            message += ` '${value2}'`;
        }
        throw new Error(message);
    }
}

export default function expect(value1) {
    return new Expect(value1);
}
