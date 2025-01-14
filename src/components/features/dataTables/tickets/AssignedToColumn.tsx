import { Row } from "@tanstack/react-table";
import { FunctionComponent } from "react";
import { MutatedTickets } from "./columns";
import { AcceptTicketBadge } from "./AcceptTicketBadge";
import { AssignTicketBadgeDialog } from "./AssignTicketBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@ssms/components/ui/avatar";
import { useUserSession } from "@ssms/components/stores/useUserSession";
import { Badge } from "@ssms/components/ui/badge";

type AssignedToColumnProps = {
  row: Row<MutatedTickets>;
};

export const AssignedToColumn: FunctionComponent<AssignedToColumnProps> = ({ row }) => {
  const userSession = useUserSession((state) => state.userSession);

  if (row.original.status === "cancelled" && !row.getValue("assignedTo")) {
    return <Badge variant="destructive">Not Assigned</Badge>;
  }

  return (
    <>
      {userSession?.user.role === "user" && !row.getValue("assignedTo") ? (
        <Badge variant="secondary">Pending</Badge>
      ) : row.getValue("assignedTo") ? (
        <div className="flex items-center gap-3">
          <Avatar className="h-7 w-7">
            <AvatarImage src={row.original.assignedToAvatar!} className="object-cover" />
            <AvatarFallback className="font-semibold text-lg">
              {row.original.assignedTo?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold">{row.original.assignedTo}</span>
        </div>
      ) : userSession?.user.role === "support" && !row.getValue("assignedTo") ? (
        <div className="space-x-1">
          <AcceptTicketBadge ticketId={row.original.id} mode="badge" />
          <AssignTicketBadgeDialog ticketId={row.original.id} />
        </div>
      ) : (
        <></>
      )}
    </>
    // <>
    //   {userSession?.user.role === "support" && !row.getValue("assignedTo") ? (
    //     !row.getValue("assignedTo") ? (
    //       <div className="space-x-1">
    //         <AcceptTicketBadge ticketId={row.original.id} />
    //         <AssignTicketBadgeDialog ticketId={row.original.id} />
    //       </div>
    //     ) : (
    //       <div className="flex items-center gap-3">
    //         <Avatar className="h-7 w-7">
    //           <AvatarImage src={row.original.assignedToAvatar!} className="object-cover" />
    //           <AvatarFallback className="font-semibold text-lg">
    //             {row.original.assignedTo?.charAt(0)}
    //           </AvatarFallback>
    //         </Avatar>
    //         <span className="font-semibold">{row.original.assignedTo}</span>
    //       </div>
    //     )
    //   ) : (
    //     <>Pending</>
    //   )}
    // </>
  );
};
