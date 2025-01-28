import React, { FunctionComponent } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@ssms/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

type User = {
  id: string;
  name: string;
  image: string | null;
};

type StackedAvatarsProps = {
  users: User[];
  limit?: number;
  size?: "sm" | "md" | "lg";
};

export const StackedAvatars: FunctionComponent<StackedAvatarsProps> = ({ users, limit = 4, size = "md" }) => {
  const visibleUsers = users.slice(0, limit);
  const remaining = users.length - limit;

  // Size configurations
  const sizeStyles = {
    sm: {
      avatar: "h-6 w-6",
      overlap: "-ml-2",
      text: "text-xs",
      container: "space-x-[-8px]",
    },
    md: {
      avatar: "h-8 w-8",
      overlap: "-ml-3",
      text: "text-sm",
      container: "space-x-[-12px]",
    },
    lg: {
      avatar: "h-10 w-10",
      overlap: "-ml-4",
      text: "text-base",
      container: "space-x-[-16px]",
    },
  };

  const styles = sizeStyles[size];

  return (
    <div className="flex items-center">
      <div className={`flex ${styles.container}`}>
        {visibleUsers.map((user, index) => (
          <TooltipProvider key={index} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar
                  className={`${styles.avatar} ${
                    index !== 0 ? styles.overlap : ""
                  } ring-2 ring-background cursor-pointer`}
                >
                  <AvatarImage src={user.image ?? undefined} alt={user.name} className="object-cover" />
                  <AvatarFallback className={styles.text}>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <span>{user.name}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      {remaining > 0 && (
        <span
          className={`${styles.avatar} ${styles.overlap} ${styles.text} ring-2 ring-background relative inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground`}
        >
          +{remaining}
        </span>
      )}
    </div>
  );
};
