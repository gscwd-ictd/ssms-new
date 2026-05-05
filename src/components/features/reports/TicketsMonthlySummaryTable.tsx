import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
import { FunctionComponent } from "react";

// Types
export type MonthlyTicketSummary = {
  id: string;
  details: string;
  requestorId: string;
  requestorName: string;
  category: string;
  subCategory: string;
  supportType: string;
  requestedAt: string;
  resolvedAt: string | null;
  assignedTo: string | null;
  status: "open" | "cancelled" | "resolved" | "ongoing";
  ticketNo: string;
};

interface PDFTableProps {
  children: React.ReactNode;
}

interface PDFHeaderProps {
  children: React.ReactNode;
}

interface PDFHeaderCellProps {
  children: React.ReactNode;
  isLast?: boolean;
}

interface PDFRowProps {
  children: React.ReactNode;
  isLast?: boolean;
}

interface PDFCellProps {
  children: React.ReactNode;
  isLast?: boolean;
}

interface PDFDataProps {
  data: MonthlyTicketSummary[];
}

interface TicketsMonthlySummaryProps {
  tickets: MonthlyTicketSummary[];
  isFirstPage?: boolean;
}

// Define styles with adjusted widths to prevent overflow
const styles = StyleSheet.create({
  table: {
    width: "auto",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  tableHeaderRow: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    height: 35,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    height: 30,
  },
  tableRowLast: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 0,
    height: 30,
  },
  // Adjusted column widths (total 100%)
  // ticketNo: 15% (wider), requestor: 12%, category: 8%, subCategory: 10%,
  // supportType: 8%, requested: 10%, accomplished: 10%, assignedTo: 27% (wider)
  tableColHeaderTicketNo: {
    width: "16%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  tableColHeaderRequestor: {
    width: "15%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  tableColHeaderCategory: {
    width: "9%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  tableColHeaderSubCategory: {
    width: "16%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  tableColHeaderSupportType: {
    width: "9%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  tableColHeaderRequested: {
    width: "10%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  tableColHeaderAccomplished: {
    width: "10%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  tableColHeaderAssignedTo: {
    width: "15%",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 5,
    justifyContent: "center",
    borderRightWidth: 0,
  },

  // Corresponding cell styles
  tableColTicketNo: {
    width: "16%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  tableColRequestor: {
    width: "15%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  tableColCategory: {
    width: "9%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  tableColSubCategory: {
    width: "16%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  tableColSupportType: {
    width: "9%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  tableColRequested: {
    width: "10%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  tableColAccomplished: {
    width: "10%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  tableColAssignedTo: {
    width: "15%",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRightWidth: 0,
  },
  tableCellHeader: {
    fontSize: 8,
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 8,
  },
});

// Reusable Components
const PDFTable: React.FC<PDFTableProps> = ({ children }) => <View style={styles.table}>{children}</View>;

const PDFHeader: React.FC<PDFHeaderProps> = ({ children }) => (
  <View style={styles.tableHeaderRow}>{children}</View>
);

// Header cell components
const PDFHeaderCellTicketNo: React.FC<PDFHeaderCellProps> = ({ children }) => (
  <View style={styles.tableColHeaderTicketNo}>
    <Text style={styles.tableCellHeader}>{children}</Text>
  </View>
);

const PDFHeaderCellRequestor: React.FC<PDFHeaderCellProps> = ({ children }) => (
  <View style={styles.tableColHeaderRequestor}>
    <Text style={styles.tableCellHeader}>{children}</Text>
  </View>
);

const PDFHeaderCellCategory: React.FC<PDFHeaderCellProps> = ({ children }) => (
  <View style={styles.tableColHeaderCategory}>
    <Text style={styles.tableCellHeader}>{children}</Text>
  </View>
);

const PDFHeaderCellSubCategory: React.FC<PDFHeaderCellProps> = ({ children }) => (
  <View style={styles.tableColHeaderSubCategory}>
    <Text style={styles.tableCellHeader}>{children}</Text>
  </View>
);

const PDFHeaderCellSupportType: React.FC<PDFHeaderCellProps> = ({ children }) => (
  <View style={styles.tableColHeaderSupportType}>
    <Text style={styles.tableCellHeader}>{children}</Text>
  </View>
);

const PDFHeaderCellRequested: React.FC<PDFHeaderCellProps> = ({ children }) => (
  <View style={styles.tableColHeaderRequested}>
    <Text style={styles.tableCellHeader}>{children}</Text>
  </View>
);

const PDFHeaderCellAccomplished: React.FC<PDFHeaderCellProps> = ({ children }) => (
  <View style={styles.tableColHeaderAccomplished}>
    <Text style={styles.tableCellHeader}>{children}</Text>
  </View>
);

const PDFHeaderCellAssignedTo: React.FC<PDFHeaderCellProps> = ({ children }) => (
  <View style={styles.tableColHeaderAssignedTo}>
    <Text style={styles.tableCellHeader}>{children}</Text>
  </View>
);

const PDFRow: React.FC<PDFRowProps> = ({ children, isLast }) => (
  <View style={isLast ? styles.tableRowLast : styles.tableRow}>{children}</View>
);

// Cell components
const PDFCellTicketNo: React.FC<PDFCellProps> = ({ children }) => (
  <View style={styles.tableColTicketNo}>
    <Text style={styles.tableCell}>{children}</Text>
  </View>
);

const PDFCellRequestor: React.FC<PDFCellProps> = ({ children }) => (
  <View style={styles.tableColRequestor}>
    <Text style={styles.tableCell}>{children}</Text>
  </View>
);

const PDFCellCategory: React.FC<PDFCellProps> = ({ children }) => (
  <View style={styles.tableColCategory}>
    <Text style={styles.tableCell}>{children}</Text>
  </View>
);

const PDFCellSubCategory: React.FC<PDFCellProps> = ({ children }) => (
  <View style={styles.tableColSubCategory}>
    <Text style={styles.tableCell}>{children}</Text>
  </View>
);

const PDFCellSupportType: React.FC<PDFCellProps> = ({ children }) => (
  <View style={styles.tableColSupportType}>
    <Text style={styles.tableCell}>{children}</Text>
  </View>
);

const PDFCellRequested: React.FC<PDFCellProps> = ({ children }) => (
  <View style={styles.tableColRequested}>
    <Text style={styles.tableCell}>{children}</Text>
  </View>
);

const PDFCellAccomplished: React.FC<PDFCellProps> = ({ children }) => (
  <View style={styles.tableColAccomplished}>
    <Text style={styles.tableCell}>{children}</Text>
  </View>
);

const PDFCellAssignedTo: React.FC<PDFCellProps> = ({ children }) => (
  <View style={styles.tableColAssignedTo}>
    <Text style={styles.tableCell}>{children}</Text>
  </View>
);

// Data component
const PDFData: React.FC<PDFDataProps> = ({ data }) => (
  <>
    {data.map((row, index) => (
      <PDFRow key={row.id} isLast={index === data.length - 1}>
        <PDFCellTicketNo>{row.ticketNo}</PDFCellTicketNo>
        <PDFCellRequestor>{row.requestorName}</PDFCellRequestor>
        <PDFCellCategory>{row.category}</PDFCellCategory>
        <PDFCellSubCategory>{row.subCategory}</PDFCellSubCategory>
        <PDFCellSupportType>{row.supportType}</PDFCellSupportType>
        <PDFCellRequested>{format(new Date(row.requestedAt), "MMMM d, yyyy")}</PDFCellRequested>
        <PDFCellAccomplished>
          {row.status !== "cancelled" && row.resolvedAt
            ? format(new Date(row.resolvedAt), "MMMM d, yyyy")
            : row.status === "cancelled"
            ? "Cancelled"
            : row.status === "open"
            ? "Open"
            : "-"}
        </PDFCellAccomplished>
        <PDFCellAssignedTo isLast>
          {row.assignedTo !== null ? row.assignedTo : row.assignedTo === null ? "Unassigned" : "-"}
        </PDFCellAssignedTo>
      </PDFRow>
    ))}
  </>
);

// Main component
export const TicketsMonthlySummaryTable: FunctionComponent<TicketsMonthlySummaryProps> = ({
  tickets,
  isFirstPage = true,
}) => (
  <PDFTable>
    {isFirstPage && (
      <PDFHeader>
        <PDFHeaderCellTicketNo>TICKET NO</PDFHeaderCellTicketNo>
        <PDFHeaderCellRequestor>END-USER</PDFHeaderCellRequestor>
        <PDFHeaderCellCategory>CATEGORY</PDFHeaderCellCategory>
        <PDFHeaderCellSubCategory>SUBCATEGORY</PDFHeaderCellSubCategory>
        <PDFHeaderCellSupportType>TYPE</PDFHeaderCellSupportType>
        <PDFHeaderCellRequested>REQUESTED</PDFHeaderCellRequested>
        <PDFHeaderCellAccomplished>ACCOMPLISHED</PDFHeaderCellAccomplished>
        <PDFHeaderCellAssignedTo isLast>ASSIGNED TO</PDFHeaderCellAssignedTo>
      </PDFHeader>
    )}
    <PDFData data={tickets} />
  </PDFTable>
);
