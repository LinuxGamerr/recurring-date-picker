import { addDays, addWeeks, addYears,
    addMonths, startOfDay,  isAfter,
    getDay, getDaysInMonth, setMonth, setDate,
    getMonth, getYear, isBefore
} from "date-fns"

export type RecurrenceType = "daily" | "weekly" | "monthly" | "yearly";

// configuration for recurring date picker
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

        // pushing the matching occurrances
        const day = new Date(year, month, i);
        if (getDay(day) === targetDayOfWeek) {
            occurrences.push(day)
        }
    }

    if (ordinal === "last") {

        return occurrences.length > 0 ? occurrences[occurrences.length - 1] : null;
    }

    else { //fallback

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

    // Date Validator to only pick date after start date and date before end date
    const validateDate = (date: Date) => {

        if (isAfter(date, addDays(startOfDay(new Date()), -1)) && isAfter(date, addDays(startDate, -1)) && (!endDate || isBefore(date, addDays(endDate, 1)))) {

            dates.push(date);
        }
    }

    let count = 0

    switch (recurrenceType) {

        case "daily":

            

            while (maxDates > count && (!endDate || isBefore(currentDate, addDays(endDate, 1)))) {

                validateDate(currentDate);
                currentDate = addDays(currentDate, interval);
                count++;
            }

            break;

        case "weekly":
            
             while (maxDates > count && (!endDate || isBefore(currentDate, addDays(endDate, 1)))) {

                // when no specific day selected
                if (!config.weeklyDays || config.weeklyDays.length === 0) {

                    validateDate(currentDate);
                    currentDate = addWeeks(currentDate, interval);
                    count++;
                }

                else {

                    let tempDate;

                    // picking the date that selected
                    config.weeklyDays.forEach((entry) => {

                        tempDate = currentDate;

                        tempDate = addDays(tempDate, entry - getDay(tempDate));
                        
                        count++;
                        validateDate(tempDate);
                        
                    });

                    currentDate = addWeeks(currentDate, interval);
                }
            }

            break;

        case "monthly":

            while (maxDates > count && (!endDate || isBefore(currentDate, addDays(endDate, 1)))) {

                // specifig day in month
                if (config.monthlyType === "dayOfMonth" && config.monthlyDayOfMonth !== undefined) {

                    const day = Math.min(config.monthlyDayOfMonth, getDaysInMonth(currentDate));

                    currentDate = setDate(currentDate, day);

                    validateDate(currentDate);

                    count++;

                    currentDate = addMonths(currentDate, interval);
                }

                // ordinal day in month
                else if (config.monthlyType === "ordinal" && config.monthlyOrdinalWeek && config.monthlyOrdinalDayofWeek !== undefined) {

                    const targetmonth = getMonth(currentDate);
                    const targetYear = getYear(currentDate);

                    const date = findNthDayofWeekInMonth(targetYear, targetmonth, config.monthlyOrdinalDayofWeek, config.monthlyOrdinalWeek);

                    if (date) {

                        currentDate = date;
                        validateDate(currentDate);
                        count++;
                        currentDate = addMonths(currentDate, interval)
                    }

                    else {

                        count++;
                        currentDate = addMonths(currentDate, interval);
                    }
                }

                else {}
            }

            break;

        case "yearly":

            while (maxDates > count && (!endDate || isBefore(currentDate, addDays(endDate, 1)))) {

                //specifig date in year
                if (config.yearlyType === "specificDate" && config.yearlyMonth !== undefined && config.yearlyDayOfMonth !== undefined) {

                    currentDate = setMonth(currentDate, config.yearlyMonth);

                    const day = Math.min(config.yearlyDayOfMonth, getDaysInMonth(currentDate));

                    currentDate = setDate(currentDate, day);

                    validateDate(currentDate);

                    currentDate = addYears(currentDate, interval);

                    count++
                }

                // ordinal year in week
                else if (config.yearlyType === "ordinal" && config.yearlyOrdinalDayofWeek !== undefined && config.yearlyOrdinalWeek && config.yearlyOrdinalMonth !== undefined) {

                    const targetYear = getYear(currentDate);

                    const date = findNthDayofWeekInMonth(targetYear, config.yearlyOrdinalMonth, config.yearlyOrdinalDayofWeek, config.yearlyOrdinalWeek);

                    if (date) {

                        currentDate = date;

                        validateDate(currentDate);
                        count++;
                        currentDate = addYears(currentDate, interval);
                    }

                    else {

                        count++;
                        currentDate = addYears(currentDate, interval);
                    }
                }
            }
    }

    //Filtering dates before startDate and Dates after endDate
    return dates.filter((d) => isAfter(d, addDays(startDate, -1)) && (!endDate || isBefore(d, addDays(endDate, 1)))).sort((a, b) => a.getTime() - b.getTime());
}

// Days and Month List for UI Diaplay
export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

export const ordinalWeeks = ["first", "second", "third", "fourth", "last"];

