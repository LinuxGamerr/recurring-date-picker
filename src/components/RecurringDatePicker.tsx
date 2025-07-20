"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; 
import DateRangeSelector from "./DateRangeSlector";
import { RecurringConfig } from "../lib/Recurrence-utils"
import { useState } from "react";
import { RecurrenceOption } from "./RecurrenceOptions";
import { CalendarPreview } from "./CalendarPreview";

export default function RecurringDatePicker() {

    const today = new Date();

    const [config, setConfig] = useState<RecurringConfig>({

        startDate: today,
        endDate: undefined,
        recurrenceType: "daily",
        interval: 1,
        weeklyDays: [today.getDay()],
        monthlyType: "dayOfMonth",
        monthlyDayOfMonth: today.getDate(),
        monthlyOrdinalWeek: "first",
        monthlyOrdinalDayofWeek: today.getDay(),
        yearlyType: "specificDate",
        yearlyMonth: today.getMonth(),
        yearlyDayOfMonth: today.getDate(),
        yearlyOrdinalWeek: "first",
        yearlyOrdinalDayofWeek: today.getDay(),
        yearlyOrdinalMonth: today.getMonth()
    })

    const handleConfigChange = (newValues: Partial<RecurringConfig>) => {

        setConfig((prevConfig) => ({ ...prevConfig, ...newValues}));
    }

     return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Recurring Date Picker</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8 lg:grid-cols-2">
          <div className="grid gap-6">
            <DateRangeSelector
              startDate={config.startDate}
              onStartDateChange={(date) => handleConfigChange({ startDate: date || new Date() })}
              endDate={config.endDate}
              onEndDateChange={(date) => handleConfigChange({ endDate: date })}
            />
            <RecurrenceOption config={config} onConfigChange={handleConfigChange} />
          </div>
          <CalendarPreview config={config} />
        </CardContent>
      </Card>
    </div>
  )
}