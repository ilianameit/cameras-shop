import axios, { AxiosInstance } from 'axios';

const BACKEND_URL = 'https://camera-shop.accelerator.htmlacademy.pro/';
const TIMEOUT_DURATION = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT_DURATION,
  });

  return api;
};
