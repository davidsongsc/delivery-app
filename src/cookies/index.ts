import { CompanyPropsState } from "@/context/company.context";
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
  company: {
    set: (obj: CompanyPropsState) => Promise<void>;
    get: () => Promise<CompanyPropsState | false>;
    remove: () => Promise<void>;
  };
}

export const CookiesHandler: ICookiesHandler = {
  session: {
    set: async obj => {
      await Cookies.set(COOKIES_TYPES.SESSION, JSON.stringify(obj), {
        expires: 10,
      });
    },
    get: async () => {
      const session = Cookies.get(COOKIES_TYPES.SESSION);
      if (!!session) {
        return JSON.parse(session);
      }
      return false;
    },
    remove: async () => {
      await Cookies.remove(COOKIES_TYPES.SESSION);
    },
  },
  login: {
    set: async obj => {
      await Cookies.set(COOKIES_TYPES.LOGIN, JSON.stringify(obj), {
        expires: 10,
      });
    },
    get: async () => {
      const login = Cookies.get(COOKIES_TYPES.LOGIN);
      if (!!login) {
        return JSON.parse(login);
      }
      return false;
    },
    remove: async () => {
      await Cookies.remove(COOKIES_TYPES.LOGIN);
    },
  },
  company: {
    set: async obj => {
      await Cookies.set(COOKIES_TYPES.COMPANY, JSON.stringify(obj), {
        expires: 10,
      });
    },
    get: async () => {
      const company = Cookies.get(COOKIES_TYPES.COMPANY);
      if (!!company) {
        return JSON.parse(company);
      }
      return false;
    },
    remove: async () => {
      await Cookies.remove(COOKIES_TYPES.COMPANY);
    },
  },
};
