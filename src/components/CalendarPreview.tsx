"use client"

import { useEffect, useState} from "react"
import { Calendar } from "@/components/ui/calendar"
import { type RecurringConfig, getRecurringDates } from "@/lib/Recurrence-utils"

interface CalendarPreviewProps {
  config: RecurringConfig
}

export function CalendarPreview({ config }: CalendarPreviewProps) {
  const [recurringDates, setRecurringDates] = useState<Date[]>([])
  const [month, setMonth] = useState<Date>(config.startDate || new Date())

  useEffect(() => {
    if (config.startDate) {
      const dates = getRecurringDates(config)
      setRecurringDates(dates)
      console.log(dates);
    } else {
      setRecurringDates([])
    }
  }, [config])

  const modifiers = {
    recurring: recurringDates,
  }

  const modifiersStyles = {
    recurring: {
      backgroundColor: "hsl(0 0 0)",
      color: "hsl(var(--primary-foreground))",
      borderRadius: "0.25rem",
    },
  }

  return (
    <div className="grid gap-4">
      <h3 className="text-lg font-semibold">Preview Recurring Dates</h3>
      {config.startDate ? (
        <Calendar
          mode="multiple"
          selected={recurringDates}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="rounded-md border"
          month={month}
          onMonthChange={setMonth}
          // Disabling Selection. Since it is just preview
          onSelect={() => {}}
          disabled
        />
      ) : (
        <p className="text-muted-foreground">Select a start date to see the preview.</p>
      )}
    </div>
  )
}
