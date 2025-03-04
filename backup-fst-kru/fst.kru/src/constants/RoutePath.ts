import { config } from "../helper/config";

const HOST = config.baseURL ?? "/";

export const RoutePath = {
  home: HOST,
  parcel: `${HOST}parcel-list`,
  createparcel: `${HOST}create-parcel`,
  orderslips: `${HOST}orderslip-list`,
  createorderslips: `${HOST}create-orderslips`,
  paymentvoucher: `${HOST}paymentvoucher`,
  createpaymentvoucher: `${HOST}create-paymentvoucher`,
  parcelinstock: `${HOST}parcelinstock`,
  homeadmin: `${HOST}home-admin`,
  testbranch: `${HOST}test-branch`,
  persondetails: `${HOST}person-details`,
  homenewsdetails: `${HOST}home-news-details`,
  myaccount: `${HOST}myaccount`,
  curriculum: `${HOST}curriculum`,
  viewproject: `${HOST}view-project`,
  createupdateproject: `${HOST}create-update-project`,
  projectpage: `${HOST}project-page`,
  registeradmin: `${HOST}register-admin`,
  rap: `${HOST}research-project`,
  viewresearchandproject: `${HOST}view-researchandproject`,
  homeproject: `${HOST}home-project`,
  rappage: `${HOST}research-project-page`,
  createupdateresearch: `${HOST}create-update-research`,
  homepersonnelpage: `${HOST}home-personnel-page`,
  homewelearn: `${HOST}home-welearn`,
  welearndetails: `${HOST}welearn-details`,
  homecurriculum: `${HOST}home-curriculum`,
  homesection: `${HOST}home-section`,
  homeDirector: `${HOST}home-Director`,
  homeJobHistory: `${HOST}home-JobHistory`,
  jobhistorypage: `${HOST}jobhistory-page`,
  tabhomeproject: `${HOST}home-research-project`,
};

const path = config.baseURL ?? "https://localhost:7203/";

export const pathImages = {
  branch: `${path}branch/`,
  news: `${path}news/`,
  newsPhoto: `${path}newsPhotos/`,
  newsPhotos: `${path}news/`,
  slideShow: `${path}slideShow/`,
  weLearn: `${path}weLearn/`,
  uploadFile: `${path}upload-file-curriculum/`,
  personnel: `${path}person/`,
  student: `${path}student/`,
  project: `${path}project/`,
  uploadPDF: `${path}upload-pdf-project/`,
  researchPDF: `${path}upload-pdf-research/`,
  research: `${path}research/`,
  CourseSpecification: `${path}upload-file-CourseSpecification/`,
  sectionPDF: `${path}upload-file-section/`,
  director: `${path}director/`,
  annualDirectorPDF: `${path}upload-file-annualDirector/`,
};

const ass = HOST + "assets/";

const local = "/src/pages/home/content/another/images/";
const local_assets = "/src/assets/images/";

export const imageLocal = {
  kru: `${config.baseURL ? ass + "KRU-690f1497" : local_assets + "KRU"}.png`,
  image1: `${config.baseURL ? ass + "1-00f046f9" : local + "1"}.jpg`,
  image6: `${config.baseURL ? ass + "6-68784b1a" : local + "6"}.jpg`,
  image3: `${config.baseURL ? ass + "3-822327b0" : local + "3"}.jpg`,
  image4: `${config.baseURL ? ass + "4-9f07937a" : local + "4"}.jpg`,
  image7: `${config.baseURL ? ass + "7-71686636" : local + "7"}.jpg`,
  image8: `${config.baseURL ? ass + "8-aa5ad172" : local + "8"}.jpg`,
  userImage: `${
    config.baseURL ? ass + "userImage-3ec890e4" : local_assets + "userImage"
  }.webp`,
};
