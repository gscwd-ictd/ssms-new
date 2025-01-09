import { TicketDetailsHeader } from "@ssms/components/features/ticketDetails/TicketDetailsHeader";
import { PageProps } from "@ssms/types/page-props";

export default async function TicketDetails(props: PageProps<{ id: string }>) {
  console.log((await props.params)?.id);

  return (
    <div>
      <TicketDetailsHeader />
    </div>
  );
}
