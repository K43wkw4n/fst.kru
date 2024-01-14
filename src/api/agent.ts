import axios, { AxiosResponse } from "axios";
import { Parcels } from "./parcel.api";
import { store } from "../store/store";
import { OrderSlips } from "./orderSlip.api";
import { Acounts } from "./account.api";
import { PaymentVouchers } from "./paymentVoucher.api";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;
import { Branchs } from "./branch.api";

const responseBody = <T>(res: AxiosResponse<T>) => res.data;

axios.interceptors.request.use((config: any) => {
  const token = store.commonStore.token;
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

export const createFormData = (item: any) => {
  let formData = new FormData();
  for (const key in item) {
    if(key !== null) {
      formData.append(key, item[key]);
    } 
  }
  return formData;
};

export const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, params: {}) => axios.post(url, params).then(responseBody),
  onlyPost: (url: string) => axios.post(url).then(responseBody),
  put: (url: string, params: {}) => axios.put(url, params).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
};

export default {
  Parcels,
  OrderSlips,
  Acounts,
  PaymentVouchers,
  Branchs,
};
