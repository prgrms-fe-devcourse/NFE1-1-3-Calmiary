import axios, { type AxiosRequestConfig } from 'axios';

import { baseUrl } from './constants';

export const getJWTHeader = (userToken: string): Record<string, string> => {
  return { Authorization: `Bearer ${userToken}` };
};

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);

/**
 * console.log all requests and responses
 * 배포시 삭제 필요
 */
axiosInstance.interceptors.request.use(
  (request) => {
    console.log('Starting 요청', request);
    return request;
  },
  (error) => {
    console.log('요청 ERROR', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('응답:', response);
    return response;
  },
  (error) => {
    console.log('응답 ERROR', error.response ? error.response.data : error);
    return Promise.reject(error);
  }
);
