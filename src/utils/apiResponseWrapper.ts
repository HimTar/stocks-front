import { AxiosError, isAxiosError } from "axios";
import { ApiResponse } from "../interface";

export const apiResponseWrapper = <T extends Array<unknown>>(
  childFunction: (...args: T) => unknown
) => {
  return async (...args: T): Promise<ApiResponse> => {
    try {
      return {
        data: await childFunction(...args),
        isError: false,
      };
    } catch (err) {
      if (isAxiosError(err)) {
        return {
          isError: true,
          data: null,
          error: {
            data: (err as AxiosError).response?.data,
            status: (err as AxiosError).response?.status,
          },
        };
      }

      return {
        isError: true,
        data: null,
        error: {},
      };
    }
  };
};
