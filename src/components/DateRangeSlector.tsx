"use client"

import { Popover,  PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DateRangeSelectorProps {

    startDate: Date | undefined
    onStartDateChange: (date: Date | undefined) => void
    endDate: Date | undefined
    onEndDateChange: (date: Date | undefined) => void
}

export default function DateRangeSelector({ startDate, onStartDateChange, endDate, onEndDateChange }: DateRangeSelectorProps) {
    
    const [ startOpen, setStartOpen ] = useState(false);
    const [ endOpen, setEndOpen ] = useState(false);

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Popover open={startOpen} onOpenChange={setStartOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        id="start-date"
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 size-4"/>
                            {startDate ? format(startDate, "PPP"): <span>Pick a Date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single"
                            selected={ startDate }
                            onSelect={(date) => {
                                onStartDateChange(date || undefined)
                                setStartOpen(false)
                            }}
                            autoFocus/>     
                    </PopoverContent>
                </Popover>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="end-date">End Date (Optional)</Label>
                <Popover open={endOpen} onOpenChange={setEndOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        id="end-date"
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 size-4"/>
                            {endDate ? format(endDate, "PPP"): <span>Pick a Date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single"
                            selected={ endDate }
                            onSelect={(date) => {
                                onEndDateChange(date || undefined)
                                setEndOpen(false)
                            }}
                            autoFocus/>     
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}