import { addDays, startOfMonth, startOfYear } from "date-fns";
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
      from: startOfMonth(new Date()),
      to: addDays(new Date(), +1),
    },
    setDateFilter: (dateRange) => set(() => ({ dateRange }), false, "set_date_filter"),
  }))
);

export const useDashboardDateFilter = create<DateFilterState>()(
  devtools((set) => ({
    dateRange: {
      from: startOfYear(new Date()),
      to: addDays(new Date(), +1),
    },
    setDateFilter: (dateRange) => set(() => ({ dateRange }), false, "set_dashboard_date_filter"),
  }))
);
