export type InputData = {
  month: string;
  category_name: string;
  ticket_count: string;
};

// Make the type dynamic using an index signature
type OutputData = {
  month: string;
  [key: string]: string | number; // Allow string keys with number or string values
};

export function transformMonthlyLoadData(data: InputData[]): OutputData[] {
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // First, get unique categories
  const categories = [...new Set(data.map((item) => item.category_name.toLowerCase()))];

  const groupedByMonth = data.reduce((acc, curr) => {
    if (!acc[curr.month]) {
      // Initialize with month and all categories set to 0
      acc[curr.month] = {
        month: curr.month,
        ...Object.fromEntries(categories.map((cat) => [cat.toLowerCase(), 0])),
      };
    }

    // Set the value for the current category
    const categoryKey = curr.category_name.toLowerCase();
    acc[curr.month][categoryKey] = parseInt(curr.ticket_count);

    return acc;
  }, {} as Record<string, OutputData>);

  return Object.values(groupedByMonth).sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );
}
