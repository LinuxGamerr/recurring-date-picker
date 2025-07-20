import { addDays, addWeeks, addYears,
    addMonths, startOfDay, isSameDay, isAfter,
    getDay, getDaysInMonth, setMonth, setDate,
    getMonth, getYear, isBefore
} from "date-fns"

export type RecurrenceType = "daily" | "weekly" | "monthly" | "yearly";

export type RecurringConfig = {

    startDate: Date;
    endDate?: Date;
    recurrenceType: RecurrenceType;
    interval: number;

    weeklyDays?: number[];

    monthlyType?: "dayOfMonth" | "ordinal";
    monthlyDayOfMonth?: number;
    monthlyOrdinalWeek?: "first" | "second" | "third" | "fourth" | "last"
    monthlyOrdinalDayofWeek?: number;

    yearlyType?: "specificDate" | "ordinal";
    yearlyMonth?: number;
    yearlyDayOfMonth?: number;
    yearlyOrdinalWeek?: "first" | "second" | "third" | "fourth" | "last";
    yearlyOrdinalDayofWeek?: number;
    yearlyOrdinalMonth?: number;
}

const ordinalMap: Record<string, number> = {

    first: 1,
    second:2,
    third: 3,
    fourth: 4,
    last: -1
}

const findNthDayofWeekInMonth = ( year: number,
        month: number,
        targetDayOfWeek: number,
        ordinal: RecurringConfig["monthlyOrdinalWeek"]
    ): Date | null => {

    const occurrences: Date[] = [];
    const daysInMonth = getDaysInMonth(new Date(year, month, 1));

    for (let i = 1; i <= daysInMonth; i++) {

        const day = new Date(year, month, i);
        if (getDay(day) === targetDayOfWeek) {
            occurrences.push(day)
        }
    }

    if (ordinal === "last") {

        return occurrences.length > 0 ? occurrences[occurrences.length - 1] : null;
    }

    else {

        const index = ordinalMap[ordinal!] - 1;
        return occurrences.length > index ? occurrences[index] : null;
    }
}

export function getRecurringDates (

    config: RecurringConfig,
    maxDates = 365 * 2,
): Date[] {

    const { startDate, endDate, recurrenceType, interval } = config;
    const dates: Date[] = [];
    let currentDate = startOfDay(startDate);
    let count = 0;

    while (count < maxDates && (!endDate || isBefore(currentDate, addDays(endDate, 1)))) {

        //add the current date if its valid
        if (!isAfter(currentDate, addDays(startDate, -1)) && (!endDate || isBefore(currentDate, addDays(endDate, 1)))) {
            dates.push(currentDate)
        }

        let nextDate: Date | null = null;

        switch (recurrenceType) {

            case "daily":

                nextDate = addDays(currentDate, interval);
                break;

                case "weekly":

                if (!config.weeklyDays || config.weeklyDays.length === 0) {

                    nextDate = addWeeks(currentDate, 1); //if no specific days
                }

                else {

                    let tempDate = addDays(currentDate, 1); // start checking fro mnext day
                    let foundCurrentCycle = false;

                    // check for next occurrence with the current week cycle
                    for (let i = 0; i < 7; i++) {

                        if (config.weeklyDays.includes(getDay(tempDate))) {

                            nextDate = tempDate;
                            foundCurrentCycle = true;
                            break;
                        }

                        tempDate = addDays(tempDate, 1);
                    }

                    if (!foundCurrentCycle) {

                        // if no day found in the current week cycle advance by interval weeks
                        // and find the first matching day in new cycle

                        tempDate = addWeeks(currentDate, interval);

                        // conforming we land on one of the selected days
                        while (!config.weeklyDays.includes(getDay(tempDate))) {

                            tempDate = addDays(tempDate, 1);
                        }

                        nextDate = tempDate;
                    }
                }

                break;

            case "monthly":

                if (config.monthlyType === "dayOfMonth" && config.monthlyDayOfMonth !== undefined) {

                    const tempDate = addMonths(currentDate, interval)

                    //set to the specified day of the month, handling month end

                    const day = Math.min(config.monthlyDayOfMonth, getDaysInMonth(tempDate));
                    nextDate = setDate(tempDate, day);
                }

                else if (config.monthlyType === "ordinal" && config.monthlyOrdinalWeek && config.monthlyOrdinalDayofWeek !== undefined) {

                    const nextMonthDate = addMonths(currentDate, interval);
                    const targetMonth = getMonth(nextMonthDate);
                    const  targetYear = getYear(nextMonthDate);
                    const foundDate = findNthDayofWeekInMonth(targetYear, targetMonth, config.monthlyOrdinalDayofWeek, config.monthlyOrdinalWeek);

                    if (foundDate) {
                        nextDate = foundDate;
                    }
                    else {
                        //fallback if the nth day doesn't exist in the target month
                        //advance by interval and try again
                        nextDate = addMonths(currentDate, interval);
                    }
                }
                else {
                    nextDate = addMonths(currentDate, interval);
                }
                break;

            case "yearly":

                if (config.yearlyType === "specificDate" && config.yearlyMonth !== undefined && config.yearlyDayOfMonth !== undefined) {

                    let tempDate = addYears(currentDate, interval);
                    tempDate = setMonth(tempDate, config.yearlyMonth);

                    //Handle day of month for non-leap years
                    const day = Math.min(config.yearlyDayOfMonth, getDaysInMonth(tempDate))
                    nextDate = setDate(tempDate, day);
                }

                else if (

                    config.yearlyType === "ordinal" &&
                    config.yearlyOrdinalWeek &&
                    config.yearlyOrdinalDayofWeek !== undefined &&
                    config.yearlyOrdinalMonth !== undefined
                ) {

                    const nextYearDate = addYears(currentDate, interval);
                    const targetYear = getYear(nextYearDate);

                    const foundDate = findNthDayofWeekInMonth(targetYear, config.yearlyOrdinalMonth, config.yearlyOrdinalDayofWeek, config.yearlyOrdinalWeek);

                    if (foundDate) {

                        nextDate = foundDate;
                    }

                    else {

                        nextDate = addYears(currentDate, interval); // fallback
                    }
                }

                else {

                    nextDate = addYears(currentDate, interval); //fallback
                }

                break;   
        }

        if (!nextDate || isSameDay(nextDate, currentDate)) {

            //prevent infinite loops if nextDate not advance
            nextDate = addDays(currentDate, 1); // fallback to advance by one day
        }

        currentDate = nextDate;
        count++;
    }

    //Filtering dates before startDate and Dates after endDate
    return dates.filter((d) => isAfter(d, addDays(startDate, -1)) && (!endDate || isBefore(d, addDays(endDate, 1)))).sort((a, b) => a.getTime() - b.getTime());
}

// Days and Month List for UI Diaplay
export const dayNames = ["Sun", "Mon", "Tur", "Wed", "Thu", "Fri", "Sat"];

export const monthNames = [
    
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

