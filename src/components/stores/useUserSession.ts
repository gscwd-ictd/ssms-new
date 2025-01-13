import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UserInSession } from "../features/dataTables/tickets/AcceptTicketBadge";

type UserSessionState = {
  userSession: UserInSession | null;
  setUserSession: (userSession: UserInSession) => void;
};

export const useUserSession = create<UserSessionState>()(
  devtools((set) => ({
    userSession: null,
    setUserSession: (userSession) => set(() => ({ userSession }), false, "set_user_session"),
  }))
);
