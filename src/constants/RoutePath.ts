import { config } from "../helper/config";

const HOST = config.baseURL ?? "/";

export const RoutePath = {
  home: HOST,
  parcel: `${HOST}parcel-list`,
  createparcel: `${HOST}createparcel`,
  orderslips: `${HOST}orderslip-list`,
  createorderslips: `${HOST}createorderslips`,
  paymentvoucher: `${HOST}paymentvoucher`,
  createpaymentvoucher: `${HOST}createpaymentvoucher`,
  parcelinstock: `${HOST}parcelinstock`,
  homeadmin: `${HOST}homeadmin`,
  testbranch: `${HOST}testbranch`,
};

const path = "https://localhost:7203/";

export const pathImages = {
  branch: `${path}branch/`,
  news: `${path}news/`,
  newsPhotos: `${path}news/`,
  slideShow: `${path}slideShow/`,
  weLearn: `${path}weLearn/`,
  uploadFile: `${path}upload-File/`,
  personnel: `${path}person/`,
};
