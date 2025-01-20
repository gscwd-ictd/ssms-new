import { endOfMonth, startOfMonth } from "date-fns";
import { NextResponse } from "next/server";
import { renderToStream, Document, Page, StyleSheet } from "@react-pdf/renderer";
import { FunctionComponent } from "react";
import {
  MonthlyTicketSummary,
  TicketsMonthlySummaryTable,
} from "@ssms/components/features/reports/TicketsMonthlySummaryTable";

import axios from "axios";
import DocumentHeader from "@ssms/components/features/reports/DocumentHeader";
import { DocumentFooter } from "@ssms/components/features/reports/DocumentFooter";

type MonthlyTicketSummaryProps = {
  tickets: MonthlyTicketSummary[];
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 10,
  },
});

export const MonthlyTicketSummaryPDF: FunctionComponent<MonthlyTicketSummaryProps> = ({ tickets }) => {
  const totalRequests = tickets.length;
  const totalAccomplished = tickets.filter((ticket) => ticket.status === "resolved").length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <DocumentHeader />
        <TicketsMonthlySummaryTable tickets={tickets} />
        <DocumentFooter accomplishedRequests={totalAccomplished} receivedRequests={totalRequests} />
      </Page>
    </Document>
  );
};

export async function GET() {
  const fromDate = startOfMonth(new Date());
  const toDate = endOfMonth(new Date());

  const res = (
    await axios.get<MonthlyTicketSummary[]>(
      `${process.env.BETTER_AUTH_URL}/api/v1/reports?from=${fromDate}&to=${toDate}`
    )
  ).data;

  const stream = await renderToStream(<MonthlyTicketSummaryPDF tickets={res} />);

  return new NextResponse(stream as unknown as ReadableStream);
}
