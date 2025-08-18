import { ILogin } from "@/interfaces/ILogin";
import { ISession } from "@/interfaces/ISession";
import Cookies from "js-cookie";

const applicationName = "lojavel";

const COOKIES_TYPES = {
  SESSION: applicationName + "$S",
  LOGIN: applicationName + "$L",
  COMPANY: applicationName + "$C",
};

interface ICookiesHandler {
  session: {
    set: (obj: ISession) => Promise<void>;
    get: () => Promise<ISession | false>;
    remove: () => Promise<void>;
  };
  login: {
    set: (obj: Pick<ILogin, "email" | "password">) => Promise<void>;
    get: () => Promise<Pick<ILogin, "email" | "password"> | false>;
    remove: () => Promise<void>;
  };
}

export const CookiesHandler = {
  session: {
    get: async () => {
      return {
        token: document.cookie
          .split('; ')
          .find(row => row.startsWith('access_token='))?.split('=')[1],
        refresh: document.cookie
          .split('; ')
          .find(row => row.startsWith('refresh_token='))?.split('=')[1],
      };
    },
    set: async ({ token, refresh }: { token?: string; refresh?: string }) => {
      if (token) document.cookie = `access_token=${token}; path=/;`;
      if (refresh) document.cookie = `refresh_token=${refresh}; path=/;`;
    },
    remove: async () => {
      document.cookie = `access_token=; path=/; max-age=0`;
      document.cookie = `refresh_token=; path=/; max-age=0`;
    },
  },
};
