import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type DateFilterState = {
  dateRange: DateRange | undefined;
  setDateFilter: (dateRange: DateRange | undefined) => void;
};

export const useDateFilter = create<DateFilterState>()(
  devtools((set) => ({
    dateRange: {
      from: addDays(new Date(), -30),
      to: new Date(),
    },
    setDateFilter: (dateRange) => set(() => ({ dateRange }), false, "set_date_filter"),
  }))
);
