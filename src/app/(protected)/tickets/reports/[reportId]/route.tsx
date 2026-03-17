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
import { auth } from "@ssms/lib/auth";
import { headers } from "next/headers";
import { format } from "date-fns";

type MonthlyTicketSummaryProps = {
  tickets: MonthlyTicketSummary[];
  month: string;
  teamName: string;
  supportStaff: {
    name: string;
    position: string;
  };
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 10,
  },
});

const MonthlyTicketSummaryPDF: FunctionComponent<MonthlyTicketSummaryProps> = ({
  tickets,
  teamName,
  supportStaff,
  month,
}) => {
  const totalRequests = tickets.length;
  const totalAccomplished = tickets.filter((ticket) => ticket.status === "resolved").length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <DocumentHeader teamName={teamName} month={month} />
        <TicketsMonthlySummaryTable tickets={tickets} />
        <DocumentFooter
          accomplishedRequests={totalAccomplished}
          receivedRequests={totalRequests}
          supportStaff={supportStaff.name}
          position={supportStaff.position}
        />
      </Page>
    </Document>
  );
};

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const from = requestUrl.searchParams.get("from") as string;
  const to = requestUrl.searchParams.get("to") as string;

  // const fromDate = startOfMonth(new Date());
  // const toDate = endOfMonth(new Date());

  const fromDate = new Date(from);
  const toDate = new Date(to);
  const session = await auth.api.getSession({ headers: await headers() });

  const tickets = (
    await axios.get<MonthlyTicketSummary[]>(
      `${process.env.BETTER_AUTH_URL}/api/v1/reports/${session?.user.id}?from=${fromDate}&to=${toDate}`
    )
  ).data;

  const { teamName } = (
    await axios.get<{ teamName: string }>(
      `${process.env.BETTER_AUTH_URL}/api/v1/teams/assigned-team-name/${session?.user.id}`
    )
  ).data;

  const stream = await renderToStream(
    <MonthlyTicketSummaryPDF
      month={`${format(new Date(fromDate), "MMMM").toUpperCase()} ${format(new Date(fromDate), "yyy")}`}
      tickets={tickets}
      teamName={teamName}
      supportStaff={{
        name: session?.user.name ?? "",
        position: session?.user.position ?? "",
      }}
    />
  );

  return new NextResponse(stream as unknown as ReadableStream);
}
