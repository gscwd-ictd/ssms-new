import React, { FunctionComponent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@ssms/components/ui/avatar";
import { Badge } from "@ssms/components/ui/badge";
import { Clock, CircleCheckBig, CircleSlash2, ArrowRightLeft, UserRoundPen } from "lucide-react";

export type Ticket = {
  id: string;
  requestedBy: string;
  requestedByAvatar: string | null;
  requestedByEmail: string;
  assignedToId: string | null;
  assignedToName: string | null;
  assignedToAvatar: string | null;
  assignedToEmail: string | null;
  details: string;
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  supportTypeId: string;
  supportTypeName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  startedAt: string | null;
  cancelledAt: string | null;
  resolvedAt: string | null;
  cancelledDueTo: string | null;
  action: string | null;
  assessment: string | null;
};

type TimelineProps = {
  ticket: Ticket;
};

type User = {
  name: string;
  avatar: string | null;
  email: string | null;
};

type TimelineEvent = {
  id: number;
  timestamp: string;
  user?: User;
} & (
  | {
      type: "created";
      details: string;
      category: {
        name: string;
        subCategory: string;
        type: string;
      };
    }
  | {
      type: "assigned";
    }
  | {
      type: "resolved";
      action: string | null;
      assessment: string | null;
    }
  | {
      type: "cancelled";
      reason: string | null;
    }
);

export const TicketTimeline: FunctionComponent<TimelineProps> = ({ ticket }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const getTimelineEvents = (ticket: Ticket): TimelineEvent[] => {
    const events: TimelineEvent[] = [];

    // Creation event
    const createdEvent: TimelineEvent = {
      id: 1,
      type: "created",
      timestamp: ticket.createdAt,
      user: {
        name: ticket.requestedBy,
        avatar: ticket.requestedByAvatar,
        email: ticket.requestedByEmail,
      },
      details: ticket.details,
      category: {
        name: ticket.categoryName,
        subCategory: ticket.subCategoryName,
        type: ticket.supportTypeName,
      },
    };
    events.push(createdEvent);

    // Assignment event (if assigned)
    if (ticket.assignedToName && ticket.startedAt) {
      const assignedEvent: TimelineEvent = {
        id: 2,
        type: "assigned",
        timestamp: ticket.startedAt,
        user: {
          name: ticket.assignedToName,
          avatar: ticket.assignedToAvatar,
          email: ticket.assignedToEmail,
        },
      };
      events.push(assignedEvent);
    }

    // Resolution event (if resolved)
    if (ticket.resolvedAt) {
      const resolvedEvent: TimelineEvent = {
        id: 3,
        type: "resolved",
        timestamp: ticket.resolvedAt,
        action: ticket.action,
        assessment: ticket.assessment,
      };
      events.push(resolvedEvent);
    }

    // Cancellation event (if cancelled)
    if (ticket.cancelledAt) {
      const cancelledEvent: TimelineEvent = {
        id: 4,
        type: "cancelled",
        timestamp: ticket.cancelledAt,
        reason: ticket.cancelledDueTo,
      };
      events.push(cancelledEvent);
    }

    return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "created":
        return <UserRoundPen className="h-4 w-4 text-blue-500" />;
      case "assigned":
        return <ArrowRightLeft className="h-4 w-4 text-amber-500" />;
      case "resolved":
        return <CircleCheckBig className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <CircleSlash2 className="h-4 w-4 text-rose-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const ActivityContent = ({ activity }: { activity: TimelineEvent }) => {
    switch (activity.type) {
      case "created":
        return (
          <div className="space-y-2">
            <p className="text-sm">{activity.details}</p>
            {activity.category && activity.category.subCategory && (
              <div className="flex gap-1">
                <Badge variant="outline" className="flex items-center gap-1">
                  {activity.category.name}
                </Badge>
                <Badge variant="outline">{activity.category.subCategory}</Badge>
                <Badge variant="outline">{activity.category.type}</Badge>
              </div>
            )}
          </div>
        );
      case "assigned":
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm">Ticket assigned to</span>
            <span className="text-sm font-medium">{activity.user?.name}</span>
          </div>
        );
      case "resolved":
        return (
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-sm">Ticket resolved</span>
              {activity.action && <p className="text-sm text-muted-foreground">{activity.action}</p>}
            </div>
          </div>
        );
      case "cancelled":
        return (
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-sm">Ticket cancelled</span>
              {activity.reason && <p className="text-sm text-muted-foreground">{activity.reason}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-xl font-semibold leading-none tracking-tight">Activity Timeline</h1>
      </div>
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-secondary">
        {getTimelineEvents(ticket).map((activity) => (
          <div key={activity.id} className="relative flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-secondary">
              {getActivityIcon(activity.type)}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                {activity.user && (
                  <>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={activity.user.avatar || undefined} className="object-cover" />
                      <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{activity.user.name}</span>
                  </>
                )}
                <span className="text-sm text-muted-foreground">{formatDate(activity.timestamp)}</span>
              </div>

              <div className="mt-1">
                <ActivityContent activity={activity} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
