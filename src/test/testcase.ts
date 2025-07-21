import { getRecurringDates } from "../lib/Recurrence-utils"
import type { RecurringConfig } from "../lib/Recurrence-utils"
import { startOfDay } from "date-fns";

test("Test Case 1 - Daily recurrence (interval 1)", () => {
    
  const config: RecurringConfig = {
    recurrenceType: "daily",
    interval: 1,
    startDate: startOfDay(new Date("2025-09-21")),
    endDate: startOfDay(new Date("2025-09-24")),
  }

  const result = getRecurringDates(config)

  expect(result.map(d => d.toDateString())).toEqual([
    "Sun Sep 21 2025",
    "Mon Sep 22 2025",
    "Tue Sep 23 2025",
    "Wed Sep 24 2025",
  ])
})

test("Test Case 2 - Weekly recurrence on Wednesdays", () => {
  const config: RecurringConfig = {
    recurrenceType: "weekly",
    interval: 1,
    startDate: startOfDay(new Date("2025-09-21")),
    endDate: startOfDay(new Date("2025-11-31")),
    weeklyDays: [3], // Wednesday
  }

  const result = getRecurringDates(config)

  expect(result.map(d => d.toDateString())).toEqual([
    "Wed Sep 24 2025",
    "Wed Oct 01 2025",
    "Wed Oct 08 2025",
    "Wed Oct 15 2025",
    "Wed Oct 22 2025",
    "Wed Oct 29 2025",
    "Wed Nov 05 2025",
    "Wed Nov 12 2025",
    "Wed Nov 19 2025",
    "Wed Nov 26 2025",
  ])
})

test("Test Case 3 - Monthly recurrence on the 15th", () => {
  const config: RecurringConfig = {
    recurrenceType: "monthly",
    interval: 1,
    startDate: startOfDay(new Date("2025-09-01")),
    endDate: startOfDay(new Date("2025-12-01")),
    monthlyDayOfMonth: 15,
    monthlyType: "dayOfMonth"
  }

  const result = getRecurringDates(config)

  expect(result.map(d => d.toDateString())).toEqual([
    
    "Mon Sep 15 2025",
    "Wed Oct 15 2025",
    "Sat Nov 15 2025",
  ])
})

test("Test Case 4 - Missing startDate returns empty result", () => {
  const config = {
    recurrenceType: "daily",
    interval: 1,
    endDate: new Date("2025-07-05"),
  } as RecurringConfig

  const result = getRecurringDates(config)

  expect(result).toEqual([])
})

test("Test Case 5 - Weekly recurrence every 2 weeks on Tuesdays", () => {
  const config: RecurringConfig = {
    recurrenceType: "weekly",
    interval: 2,
    startDate: startOfDay(new Date("2025-08-30")),
    endDate: startOfDay(new Date("2025-09-30")),
    weeklyDays: [2], // Tuesday
  }

  const result = getRecurringDates(config)

  expect(result.map(d => d.toDateString())).toEqual([
    "Tue Sep 09 2025",
    "Tue Sep 23 2025",
  ])
})

test("Test Case 6 - Yearly Day of Month", () => {
  const config: RecurringConfig = {
    recurrenceType: "yearly",
    interval: 1,
    startDate: startOfDay(new Date("2025-09-01")),
    endDate: startOfDay(new Date("2027-09-30")),
    yearlyType: "specificDate",
    yearlyMonth: 8, //september
    yearlyDayOfMonth: startOfDay(new Date("2027-09-12")).getDate(),
    
  }

  const result = getRecurringDates(config)

  expect(result.map(d => d.toDateString())).toEqual([
    "Fri Sep 12 2025",
    "Sat Sep 12 2026",
    "Sun Sep 12 2027",
  ])
})

test("Test Case 7 - Yearly Ordinal", () => {
  const config: RecurringConfig = {
    recurrenceType: "yearly",
    interval: 1,
    startDate: startOfDay(new Date("2025-09-01")),
    endDate: startOfDay(new Date("2027-09-30")),
    yearlyType: "ordinal",
    yearlyOrdinalWeek: "first",
    yearlyOrdinalDayofWeek: 1, //monday
    yearlyOrdinalMonth: 8, //september
    
  }

  const result = getRecurringDates(config)

  expect(result.map(d => d.toDateString())).toEqual([
    "Mon Sep 01 2025",
    "Mon Sep 07 2026",
    "Mon Sep 06 2027",
  ])
})
