import { NextResponse } from "next/server";
import { renderToStream, Document, Page, StyleSheet, View } from "@react-pdf/renderer";
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
import { TicketSummaryAndSignatories } from "@ssms/components/features/reports/TicketSummaryAndSignatories";

const FIRST_PAGE_ROW_COUNT = 18;
const NORMAL_PAGES_ROW_COUNT = 20;

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
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: "relative",
  },
  contentContainer: {
    flex: 1,
    marginBottom: 80, // Space for footer
  },
  footerContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
  },
});

// Pagination helper function with dynamic rows per page
const paginateTickets = (tickets: MonthlyTicketSummary[]) => {
  const pages: MonthlyTicketSummary[][] = [];
  let remainingTickets = [...tickets];
  let pageNumber = 0;

  while (remainingTickets.length > 0) {
    let rowsForThisPage: number;

    if (pageNumber === 0) {
      // First page: 21 rows
      rowsForThisPage = FIRST_PAGE_ROW_COUNT;
    } else if (remainingTickets.length > 20) {
      // Middle pages (not last page): 25 rows
      rowsForThisPage = NORMAL_PAGES_ROW_COUNT;
    } else {
      // Last page: max 20 rows (whatever is remaining)
      rowsForThisPage = remainingTickets.length;
    }

    // Take the slice for this page
    const pageTickets = remainingTickets.slice(0, rowsForThisPage);
    pages.push(pageTickets);

    // Remove the taken tickets from remaining
    remainingTickets = remainingTickets.slice(rowsForThisPage);
    pageNumber++;
  }

  return pages;
};

const MonthlyTicketSummaryPDF: FunctionComponent<MonthlyTicketSummaryProps> = ({
  tickets,
  teamName,
  supportStaff,
  month,
}) => {
  const totalRequests = tickets.length;
  const totalAccomplished = tickets.filter((ticket) => ticket.status === "resolved").length;
  const totalCancelledRequests = tickets.filter((ticket) => ticket.status === "cancelled").length;
  const totalOpenRequests = tickets.filter((ticket) => ticket.status === "open").length;

  // Split tickets into pages with dynamic row counts
  const ticketPages = paginateTickets(tickets);
  const totalPages = ticketPages.length;

  if (tickets.length === 0) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <DocumentHeader teamName={teamName} month={month} />
          <View style={styles.contentContainer}>
            <TicketsMonthlySummaryTable tickets={[]} />
          </View>

          <TicketSummaryAndSignatories
            receivedRequests={totalRequests}
            accomplishedRequests={totalAccomplished}
            cancelledRequests={totalCancelledRequests}
            openRequests={totalOpenRequests}
            supportStaff={supportStaff.name}
            position={supportStaff.position}
            isLastPage={true}
          />

          <DocumentFooter pageCount={1} totalPagesCount={1} />
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      {ticketPages.map((pageTickets, pageIndex) => {
        const isFirstPage = pageIndex === 0;
        const isLastPage = pageIndex === totalPages - 1;

        return (
          <Page key={pageIndex} size="A4" style={styles.page} wrap>
            {isFirstPage && <DocumentHeader teamName={teamName} month={month} />}

            <View style={styles.contentContainer}>
              <TicketsMonthlySummaryTable tickets={pageTickets} isFirstPage={isFirstPage} />
            </View>

            {/* Footer only on the last page with overall totals */}
            <TicketSummaryAndSignatories
              receivedRequests={totalRequests}
              accomplishedRequests={totalAccomplished}
              cancelledRequests={totalCancelledRequests}
              openRequests={totalOpenRequests}
              supportStaff={supportStaff.name}
              position={supportStaff.position}
              isLastPage={isLastPage}
            />
            <DocumentFooter pageCount={pageIndex + 1} totalPagesCount={totalPages} />
          </Page>
        );
      })}
    </Document>
  );
};

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const from = requestUrl.searchParams.get("from") as string;
  const to = requestUrl.searchParams.get("to") as string;

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
      month={`${format(new Date(fromDate), "MMMM").toUpperCase()} ${format(new Date(fromDate), "yyyy")}`}
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
