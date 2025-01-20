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

// Define styles
const styles = StyleSheet.create({
  table: {
    width: "auto",
    margin: 10,
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  tableRowLast: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 0,
  },
  tableColHeader: {
    width: "14.28%", // Adjusted for 7 columns (100% ÷ 7)
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  tableColHeaderLast: {
    width: "14.28%",
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRightWidth: 0,
  },
  tableCol: {
    width: "14.28%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    padding: 5,
  },
  tableColLast: {
    width: "14.28%",
    padding: 5,
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

const PDFHeader: React.FC<PDFHeaderProps> = ({ children }) => <View style={styles.tableRow}>{children}</View>;

const PDFHeaderCell: React.FC<PDFHeaderCellProps> = ({ children, isLast }) => (
  <View style={isLast ? styles.tableColHeaderLast : styles.tableColHeader}>
    <Text style={styles.tableCellHeader}>{children}</Text>
  </View>
);

const PDFRow: React.FC<PDFRowProps> = ({ children, isLast }) => (
  <View style={isLast ? styles.tableRowLast : styles.tableRow}>{children}</View>
);

const PDFCell: React.FC<PDFCellProps> = ({ children, isLast }) => (
  <View style={isLast ? styles.tableColLast : styles.tableCol}>
    <Text style={styles.tableCell}>{children}</Text>
  </View>
);

// Data component
const PDFData: React.FC<PDFDataProps> = ({ data }) => (
  <>
    {data.map((row, index) => (
      <PDFRow key={row.id} isLast={index === data.length - 1}>
        <PDFCell>{row.requestorName}</PDFCell>
        <PDFCell>{row.category}</PDFCell>
        <PDFCell>{row.subCategory}</PDFCell>
        <PDFCell>{row.supportType}</PDFCell>
        <PDFCell>{format(row.requestedAt, "MMMM d, yyyy")}</PDFCell>
        <PDFCell>{row.resolvedAt ? format(row.resolvedAt, "MMMM d, yyyy") : "-"}</PDFCell>
        <PDFCell isLast>{row.assignedTo || "-"}</PDFCell>
      </PDFRow>
    ))}
  </>
);

// Main component
interface TicketsMonthlySummaryProps {
  tickets: MonthlyTicketSummary[];
}

export const TicketsMonthlySummaryTable: FunctionComponent<TicketsMonthlySummaryProps> = ({ tickets }) => (
  <PDFTable>
    <PDFHeader>
      <PDFHeaderCell>END-USER</PDFHeaderCell>
      <PDFHeaderCell>CATEGORY</PDFHeaderCell>
      <PDFHeaderCell>SUBCATEGORY</PDFHeaderCell>
      <PDFHeaderCell>TYPE</PDFHeaderCell>
      <PDFHeaderCell>REQUESTED</PDFHeaderCell>
      <PDFHeaderCell>ACCOMPLISHED</PDFHeaderCell>
      <PDFHeaderCell isLast>ASSIGNED TO</PDFHeaderCell>
    </PDFHeader>
    <PDFData data={tickets} />
  </PDFTable>
);
