export default class Range {
    constructor(LearnCharts, from, to) {
        this._Moment = LearnCharts.deps.Moment;
        this.from = new this._Moment(from);
        this.to = new this._Moment(to);
    }

    isValid() {
        return this.from.isValid() && this.to.isValid() && 
            this.to.isBefore(this.from, "day") === false;
    }

    isValidToString() {
        let result = "";

        const fromIsValid = this.from.isValid();
        const toIsValid = this.to.isValid();

        if (fromIsValid === false) {
            result += "Invalid range start: '" + from + "'. ";
        }

        if (toIsValid === false) {
            result += "Invalid range end: '" + to + "'. ";
        }

        if (fromIsValid && toIsValid) {
            if (this.to.isBefore(this.from, "day")) {
                result += "Range end (" + this.to.format('YYYY-MM-DD') + ")" + 
                    " should be after start (" + this.from.format('YYYY-MM-DD') + ")";
            } else {
                result += "Valid range start and end! :)";
            }
        }

        return result;
    }

    includes(date) {
        const momentDate = new this._Moment(date);
        if (momentDate.isValid() === false) {
            throw new Error("Invalid date argument: " + date);
        }

        return momentDate.isAfter(this.from, "day") && momentDate.isBefore(this.to, "day") || 
            momentDate.isSame(this.from, "day") || 
            momentDate.isSame(this.to, "day");
    }
}
