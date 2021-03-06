import axios from "axios";
import {Url} from "./const";


const Error = {
  UNAUTHORIZED: 401
};


export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: Url.START_URL + Url.PROJECT_ROUTE,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
