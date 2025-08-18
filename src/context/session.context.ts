import { CookiesHandler } from "@/cookies";
import { ISession } from "@/interfaces/ISession";
import { create } from "zustand";

interface SessionState {
  session: ISession | null;
  sessionHandle: (obj: ISession) => void;
  sessionUpdate: (obj: Partial<ISession>) => void;
  sessionRecovery: () => Promise<boolean>;
  sessionLogout: () => boolean;
}

export const useSessionStore = create<SessionState>(set => ({
  session: null,
  sessionHandle: (obj: ISession) => {
    CookiesHandler.session.set(obj);
    return set({ session: obj });
  },
  sessionUpdate: (obj: Partial<ISession>) => {
    return set(state => ({
      session: { ...state.session, ...obj } as ISession,
    }));
  },
  sessionRecovery: async () => {
    const session = await CookiesHandler.session.get();
    if (session) {
      set({ session });
      return !!session?.token;
    }
    return false;
  },
  sessionLogout: () => {
    CookiesHandler.session.remove();
    set({ session: null });
    return true;
  },
}));
