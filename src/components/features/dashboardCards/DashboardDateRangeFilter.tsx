"use client";

import { Button } from "@ssms/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@ssms/components/ui/popover";
import { cn } from "@ssms/lib/shadcn";
import { Calendar as CalendarIcon } from "lucide-react";
import { FunctionComponent, useState } from "react";
import { addDays, format, startOfYear } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@ssms/components/ui/calendar";
import { useDashboardDateFilter } from "@ssms/components/stores/useDateFilter";

export const DashboardDateRangeFilter: FunctionComponent = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfYear(new Date()),
    to: addDays(new Date(), +1),
  });

  const setDateFilter = useDashboardDateFilter((state) => state.setDateFilter);

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />

          <div className="p-5">
            <Button variant="secondary" onClick={() => setDateFilter(date)}>
              Filter
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
