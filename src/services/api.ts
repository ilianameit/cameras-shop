import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

type DetailMessageType = {
  error: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.GATEWAY_TIMEOUT]: true,
  [StatusCodes.BAD_GATEWAY]: true,
  [StatusCodes.EXPECTATION_FAILED]: true,
  [StatusCodes.FORBIDDEN]: true,
  [StatusCodes.NOT_ACCEPTABLE]: true,
  [StatusCodes.PRECONDITION_REQUIRED]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://camera-shop.accelerator.htmlacademy.pro/';
const TIMEOUT_DURATION = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT_DURATION,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.message);
        toast.warn(detailMessage);
      }

      throw error;
    }
  );

  return api;
};
