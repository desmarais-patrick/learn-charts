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
    createWeeklyInterval(range, optionalDaysOfWeek) {
        // Common, such as expenses at groceries or coffee shops every week or so
        // ex. createWeeklyInterval(rangeAB) => Every week on weekDay(A) until B inclusively
        // ex. createWeeklyInterval(rangeAB, ["Monday"]) => Every Monday between A and B inclusively
        // ex. createWeeklyInterval(rangeAB, ["Monday", "Friday"]) => Every Monday and Friday between A and B inclusively
        let targetDaysOfWeek = null;
        if (typeof optionalDaysOfWeek !== "undefined") {
            targetDaysOfWeek = optionalDaysOfWeek.map((dayOfWeek) => {
                const mappedValue = this.DAYS_OF_WEEK[dayOfWeek];
                if (typeof mappedValue !== "number") {
                    throw new Error("Bad argument! Expected days of week as one of: " + Object.keys(this.DAYS_OF_WEEK).toString());
                }
                return mappedValue;
            });
        }
        
        

        if (targetDaysOfWeek !== null) {
            while (date.isBefore(range.to) &&
                targetDaysOfWeek.indexOf(date.day()) === -1) {
                    date.add(1, "days");
                }
        }
    }
    _translateDaysOfWeek(daysOfWeek) {
        let targetDaysOfWeek = daysOfWeek.map((dayOfWeek) => {
            const mappedValue = this.DAYS_OF_WEEK[dayOfWeek];
            if (typeof mappedValue !== "number") {
                throw new Error("Bad argument! Expected days of week as one of: " + Object.keys(this.DAYS_OF_WEEK).toString());
            }
            return mappedValue;
        });
        return targetDaysOfWeek.sort();
    }
    _findFirstWeekDay(range, daysOfWeek) {
        let date = range.from;
        let isNoMatch;
        while (isNoMatch = (daysOfWeek.indexOf(date.day()) === -1) && date.isBefore(range.to)) {
            date.add(1, "days");
        }
        return isNoMatch ? null : date;
    }
    _createWeeklyInterval(range, daysOfWeek) {
        const interval = new Interval("Weekly", range);

        // Find the first day.

        let date = range.from;
        do {
            interval.addValue(date);
            date = date.add(7, "days");
        } while (date.isBefore(range.to))
        return interval;
    }
    createMonthlyInterval(range, optionalDaysOfMonth, optionalAssociatedDeltas) {
        // Common, such as rent payment every 1st of the month
        // ex. createMonthlyInterval(rangeAB) => Every month on dayOfMonth(A) until B inclusively
        // ex. createMonthlyInterval(rangeAB, ["1"]) => Every 1st day of the month between A and B inclusively
        // ex. createMonthlyInterval(rangeAB, ["1", "15"]) => Every 1st and 15th of the month between A and B inclusively
        // ex. createMonthlyInverval(rangeAB, ["1"], [-3]) => Every 1st, minus three days, of the month between A and B inclusively
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
    createEveryNWeek(n, range, optionalDaysOfWeek) {
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
