"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type RecurringConfig, type RecurrenceType, dayNames, monthNames, ordinalWeeks } from "@/lib/Recurrence-utils";
import { ChangeEvent } from "react";


interface RecurrenceOptionProps {

    config: RecurringConfig;
    onConfigChange: (newConfig: Partial<RecurringConfig>) => void
}

export function RecurrenceOption({ config, onConfigChange }: RecurrenceOptionProps) {

    const handleIntervalChange = (e: ChangeEvent<HTMLInputElement>) => {

        const value = Number.parseInt(e.target.value, 10);
        onConfigChange({ interval: isNaN(value) || value < 1 ? 1 : value})
    }

    const handleWeeklyDayChange = (dayIndex: number, checked: boolean) => {

        const currentDays = config.weeklyDays || [];

        if (checked) {

            onConfigChange({ weeklyDays: [...currentDays, dayIndex].sort((a, b) => a - b) });
        }
        else {
            onConfigChange({ weeklyDays: currentDays.filter((d) => d !== dayIndex) });
        }
    }

    const handleMonthlyDayofMonthChange = (e: ChangeEvent<HTMLInputElement>) => {

        const value = Number.parseInt(e.target.value, 10);
        onConfigChange({ monthlyDayOfMonth: isNaN(value) || value < 1 || value > 31 ? 1 : value });
    }

    const handleMonthlyOrdinalWeekChange = (value: string) => {

        onConfigChange({ monthlyOrdinalWeek: value as RecurringConfig["monthlyOrdinalWeek"] });
    }

    const handleMonthlyOrdinalDayofWeekChange = (value: string) => {

        onConfigChange({ monthlyOrdinalDayofWeek: Number.parseInt(value, 10) });
    }

    const handleYearlyMonthChange = (value: string) => {

        onConfigChange({ yearlyMonth: Number.parseInt(value, 10) });
    };

    const handleYearlyDayofMonthChange = (e: ChangeEvent<HTMLInputElement>) => {

        const value = Number.parseInt(e.target.value, 10);
        onConfigChange({ yearlyDayOfMonth: isNaN(value) || value < 1 || value > 31 ? 1 : value });
    };

    const handleYearlyOrdinalWeekChange = (value: string) => {

        onConfigChange({ yearlyOrdinalWeek: value as RecurringConfig["yearlyOrdinalWeek"] });
    }

    const handleYearlyOrdinalDayofWeekChange = (value: string) => {

        onConfigChange({ yearlyOrdinalDayofWeek: Number.parseInt(value, 10) });
    };

    const handleYearlyOrdinalMonthChange = (value: string) => {

        onConfigChange({ yearlyOrdinalMonth: Number.parseInt(value, 10) });
    };

    return (
        <div className="grid gap-4">
            <RadioGroup
            value={config.recurrenceType}
            onValueChange={(value: RecurrenceType) => onConfigChange({ recurrenceType: value })}
            className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily"/>
                    <Label htmlFor="daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly"/>
                    <Label htmlFor="weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly"/>
                    <Label htmlFor="monthly">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yearly" id="yearly"/>
                    <Label htmlFor="yearly">Daily</Label>
                </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
                <Label htmlFor="interval">Every</Label>
                <Input
                id="interval"
                type="number"
                min="1"
                value={config.interval}
                onChange={handleIntervalChange}
                className="w-20"/>
                <span>
                    {config.recurrenceType === "daily" && "day(s)"}
                    {config.recurrenceType === "weekly" && "week(s)"}
                    {config.recurrenceType === "monthly" && "month(s)"}
                    {config.recurrenceType === "yearly" && "year(s)"}
                </span>        
            </div>

            {config.recurrenceType === "weekly" && (
                <div className="grid gap-2">
                    <Label>On specific day(s) of the week:</Label>
                    <div className="flex flex-wrap gap-2">
                        {dayNames.map((day, index) => (
                            <div key={day} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`day-${index}`}
                                    checked={config.weeklyDays?.includes(index)}
                                    onCheckedChange={(checked) => handleWeeklyDayChange(index, checked as boolean)}/>
                                <Label htmlFor={`day-${index}`}>(day)</Label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {config.recurrenceType === "monthly" && (

                <div className="grid gap-2">
                    <RadioGroup
                        value={config.monthlyType || "dayOfMonth"}
                        onValueChange={(value: RecurringConfig["monthlyType"]) => onConfigChange({ monthlyType: value })}
                        className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="dayOfMonth"
                                    id="monthly-day-of-month"/>
                                <Label htmlFor="monthly-day-of-month" className="flex items-center gap-2">
                                    on day
                                    <Input
                                        type="number"
                                        min={`1`}
                                        max={`31`}
                                        value={config.monthlyDayOfMonth || ""}
                                        onChange={handleMonthlyDayofMonthChange}
                                        className="w-20"
                                        disabled={config.monthlyType !== "dayOfMonth"}/>
                                    of the month
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="ordinal" id="monthly-ordinal" />
                                <Label htmlFor="monthly-ordinal" className="flex items-center gap-2">
                                    On the
                                    <Select
                                    value={config.monthlyOrdinalWeek || ""}
                                    onValueChange={handleMonthlyOrdinalWeekChange}
                                    disabled={config.monthlyType !== "ordinal"}
                                    >
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ordinalWeeks.map((ordinal) => (
                                        <SelectItem key={ordinal} value={ordinal}>
                                            {ordinal}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <Select
                                    value={config.monthlyOrdinalDayofWeek?.toString() || ""}
                                    onValueChange={handleMonthlyOrdinalDayofWeekChange}
                                    disabled={config.monthlyType !== "ordinal"}
                                    >
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dayNames.map((day, index) => (
                                        <SelectItem key={day} value={index.toString()}>
                                            {day}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    of the month
                                </Label>
                                </div>
                    </RadioGroup>
                </div>
            )}
            {config.recurrenceType === "yearly" && (
        <div className="grid gap-2">
          <RadioGroup
            value={config.yearlyType || "specificDate"}
            onValueChange={(value: RecurrenceConfig["yearlyType"]) => onConfigChange({ yearlyType: value })}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="specificDate" id="yearly-specific-date" />
              <Label htmlFor="yearly-specific-date" className="flex items-center gap-2">
                On
                <Select
                  value={config.yearlyMonth?.toString() || ""}
                  onValueChange={handleYearlyMonthChange}
                  disabled={config.yearlyType !== "specificDate"}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthNames.map((month, index) => (
                      <SelectItem key={month} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  min="1"
                  max="31"
                  value={config.yearlyDayOfMonth || ""}
                  onChange={handleYearlyDayofMonthChange}
                  className="w-20"
                  disabled={config.yearlyType !== "specificDate"}
                />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ordinal" id="yearly-ordinal" />
              <Label htmlFor="yearly-ordinal" className="flex items-center gap-2">
                On the
                <Select
                  value={config.yearlyOrdinalWeek || ""}
                  onValueChange={handleYearlyOrdinalWeekChange}
                  disabled={config.yearlyType !== "ordinal"}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {ordinalWeeks.map((ordinal) => (
                      <SelectItem key={ordinal} value={ordinal}>
                        {ordinal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={config.yearlyOrdinalDayofWeek?.toString() || ""}
                  onValueChange={handleYearlyOrdinalDayofWeekChange}
                  disabled={config.yearlyType !== "ordinal"}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {dayNames.map((day, index) => (
                      <SelectItem key={day} value={index.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                of
                <Select
                  value={config.yearlyOrdinalMonth?.toString() || ""}
                  onValueChange={handleYearlyOrdinalMonthChange}
                  disabled={config.yearlyType !== "ordinal"}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthNames.map((month, index) => (
                      <SelectItem key={month} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}
        </div>
    );
}