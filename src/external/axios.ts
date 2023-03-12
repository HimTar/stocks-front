import axios from "axios";
import constants from "../constants";

export { AxiosError } from "axios";

export const axiosConfig = axios.create({
  baseURL: constants.BASE_URL,
});

export const isAxiosError = (payload: unknown) => axios.isAxiosError(payload);
