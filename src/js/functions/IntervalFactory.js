import Interval from './Interval.js';

const DAYS_OF_WEEK = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
};

export default class IntervalFactory {
    constructor(LearnCharts) {
        this.LearnCharts = LearnCharts;

        this.DAYS_OF_WEEK = DAYS_OF_WEEK;
    }
    createDailyInterval(range) {
        // Rare
        // ex. createDailyInterval(rangeAB) => Every day from A to B inclusively
        const interval = new Interval("Daily", range);
        let date = new this.LearnCharts.deps.Moment(range.from);
        do {
            const copy = new this.LearnCharts.deps.Moment(date);
            interval.addValue(copy);
            date = date.add(1, "days");
        } while (date.isBefore(range.to) || date.isSame(range.to));
        return interval;
    }
    createWeeklyInterval(range, optionalWeekDays) {
        // Common, such as expenses at groceries or coffee shops every week or so
        // ex. createWeeklyInterval(rangeAB) => Every week on weekDay(A) until B inclusively
        // ex. createWeeklyInterval(rangeAB, ["Monday"]) => Every Monday between A and B inclusively
        // ex. createWeeklyInterval(rangeAB, ["Monday", "Friday"]) => Every Monday and Friday between A and B inclusively
        const interval = new Interval("Weekly", range);
        const targetWeekDays = this._translateWeekDaysToIntegers(range.from, optionalWeekDays);
        const date = new this.LearnCharts.deps.Moment(range.from);
        while (date.isBefore(range.to) || date.isSame(range.to)) {
            if (targetWeekDays.indexOf(date.day()) >= 0) {
                const copy = new this.LearnCharts.deps.Moment(date);
                interval.addValue(copy);
            }
            date.add(1, "days");
        }
        return interval;
    }
    _translateWeekDaysToIntegers(fromDate, weekDays) {
        if (typeof weekDays === "undefined") {
            return [fromDate.day()];
        }
        return weekDays.map((weekDay) => {
            const mappedValue = this.DAYS_OF_WEEK[weekDay];
            if (typeof mappedValue === "undefined") {
                throw new Error(`Bad argument! Expected weekday '${weekDay}'` + 
                    ` to be one of: ${Object.keys(this.DAYS_OF_WEEK).toString()}`);
            }
            return mappedValue;
        });
    }
    createMonthlyInterval(range, optionalMonthlyDates, optionalAssociatedDeltas) {
        // Common, such as rent payment every 1st of the month
        // ex. createMonthlyInterval(rangeAB) => Every month on dayOfMonth(A) until B inclusively
        // ex. createMonthlyInterval(rangeAB, ["1"]) => Every 1st day of the month between A and B inclusively
        // ex. createMonthlyInterval(rangeAB, ["1", "15"]) => Every 1st and 15th of the month between A and B inclusively
        // ex. createMonthlyInverval(rangeAB, ["1"], [-3]) => Every 1st, minus three days, of the month between A and B inclusively
        const interval = new Interval("Monthly", range);

        const monthlyDates = this._readyMonthlyDates(range.from, optionalMonthlyDates);
        const lastDate = range.to;
        while (monthlyDates.length > 0) {
            const date = monthlyDates.shift();
            const copy = new this.LearnCharts.deps.Moment(date);
            interval.addValue(copy);
            date.add(1, "months");
            if (date.isBefore(lastDate) || date.isSame(lastDate)) {
                monthlyDates.push(date);
            }
        }

        return interval;
    }
    _readyMonthlyDates(fromDate, monthlyDates) {
        if (typeof monthlyDates === "undefined") {
            const copyDate = new this.LearnCharts.deps.Moment(fromDate);
            return [copyDate];
        }

        const result = [];
        const monthlyDatesCopy = monthlyDates.map((day) => { return day; });

        let date = new this.LearnCharts.deps.Moment(fromDate);
        const nextMonthFromDate = (new this.LearnCharts.deps.Moment(fromDate)).add(1, "months");
        while (date.isBefore(nextMonthFromDate) && monthlyDatesCopy.length > 0) {
            let dateDate = date.date();
            while (monthlyDatesCopy.indexOf(dateDate) >= 0) {
                let matchIndex = monthlyDatesCopy.indexOf(dateDate);
                const copyDate = new this.LearnCharts.deps.Moment(date);
                result.push(copyDate);
                monthlyDatesCopy.splice(matchIndex, 1);
            }
            date.add(1, "days");
        }
        return result;
    }
    createYearlyInterval(range, optionalDaysOfYear) {
        // Common, such as permit payment every year on birthday
        // ex. createYearlyInterval(rangeAB) => Every year on monthDay(A) until B inclusively
        // ex. createYearlyInterval(rangeAB, [["January", 1]]) => Every year on 1st of January between A and B inclusively
    }
    createEveryNDay(n, range) {
        // Common, such as cellphone bill every 30 days
        // ex. createEveryNDay(2, rangeAB) => Every two days between A and B inclusively
    }
    createEveryNWeek(n, range, optionalWeekDays) {
        // Common, such as payday every two weeks on Wednesdays
        // ex. createEveryNWeek(2, rangeAB, ["Friday"]) => Every two Fridays between A and B inclusively
    }
    createEveryNMonth(n, range, optionalDaysOfMonth) {
        // Rare-common, such as investments
        // ex. createEveryNMonth(3, rangeAB, ["15"]) => Every 15th of each quarter between A and B inclusively
    }
    createEveryNYear(n, range, optionalMonthDays) {
        // Rare, such as big vacations
        // ex. createEveryNYear(2, rangeAB, [["September", 15]]) => Every 2 15th September between A and B inclusively
    }
}
