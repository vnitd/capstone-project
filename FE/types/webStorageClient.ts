import { getCookie, setCookie } from "cookies-next";
import _ from "lodash";

import { constants } from "@/config";

const webStorageClient = {
  set(key: string, rawValue: any, option?: any) {
    const value = _.isString(rawValue) ? rawValue : JSON.stringify(rawValue);

    setCookie(key, value, option);
  },
  get(key: string) {
    const value: string = getCookie(key) || "";

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  },
  remove(key: string) {
    setCookie(key, null, { maxAge: 0 });
  },

  setToken(value: string, option?: any) {
    setCookie(constants.ACCESS_TOKEN, value, option);
  },

  getToken() {
    return getCookie(constants.ACCESS_TOKEN);
  },
};

export default webStorageClient;
