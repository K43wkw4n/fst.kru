import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RoutePath } from "../constants/RoutePath";
import HomePage from "../pages/home/Home.page";
import HomeNewsDetails from "../pages/home/content/Home.News.Details";
import MyAccount from "../pages/account/MyAccount";
import HomeParcel from "../pages/parcel/home/HomeParcel";
import CreateUpdateParcel from "../pages/parcel/crud/CreateUpdateParcel";
import HomeOrderSlips from "../pages/orderSlip/home/HomeOrderSlips";
import HomePaymentVoucher from "../pages/paymentVoucher/home/HomePaymentVoucher";
import CreateUpdatePaymentVoucher from "../pages/paymentVoucher/crud/CreateUpdatePaymentVoucher";
import HomeParcelInStock from "../pages/parcel/stock/HomeParcelInStock";
import CreateUpdateOrderSlip from "../pages/orderSlip/crud/CreateUpdateOrderSlip";
import AdminMode from "../admin/AdminMode";
import NotFound from "../pages/NotFound";
import ProjectPage from "../pages/project/projectStudent/Project.Page";
import CreateUpdateProject from "../pages/project/projectStudent/CreateUpdateProject";
import ViewProject from "../pages/project/projectStudent/ViewProject";
import CurriculumPage from "../pages/curriculum/Curriculum.Page";
import RAPAccount from "../pages/account/pages/personnel/RAPAccount.Page";
import ViewRAP from "../pages/project/rapPersonnel/ViewRAP";
import HomeProject from "../pages/project/HomeProject";
import RAPPage from "../pages/project/rapPersonnel/RAP.Page";
import CreateUpdateRAP from "../pages/project/rapPersonnel/CreateUpdateRAP";
import HomePersonnelPage from "../pages/person/Home.Personnel.page";
import HomeWelearn from "../pages/welearn/HomeWelearn";
import WelearnDetails from "../pages/welearn/WelearnDetails";
import HomeCurriculum from "../pages/curriculum/HomeCurriculum";
import HomeSection from "../pages/section/HomeSection";
import HomeDirector from "../pages/director/HomeDirector";
import TestNewsDetails from "../pages/home/content/test/Test.News.Details";
import JobHistoriesPage from "../pages/jobHistories/pages/JobHistories.page";
import HomeJobHistory from "../pages/jobHistories/pages/HomeJobHistory";
import TabHomeProject from "../pages/project/TabHomeProject";

export const RoutePublic = [
  // {
  //   path: RoutePath.home,
  //   element: <HomePage />,
  // },
  {
    path: RoutePath.homenewsdetails,
    element: <HomeNewsDetails />,
  },
  {
    path: RoutePath.curriculum,
    element: <CurriculumPage />,
  },
  {
    path: RoutePath.viewproject,
    element: <ViewProject />,
  },
  {
    path: RoutePath.projectpage,
    element: <ProjectPage branchId={null} />,
  },
  {
    path: RoutePath.viewresearchandproject,
    element: <ViewRAP />,
  },
  {
    path: RoutePath.homeproject,
    element: <HomeProject />,
  },
  {
    path: RoutePath.rappage,
    element: <RAPPage branchId={null} />,
  },
  {
    path: RoutePath.homepersonnelpage,
    element: <HomePersonnelPage />,
  },
  {
    path: RoutePath.homewelearn,
    element: <HomeWelearn />,
  },
  {
    path: RoutePath.welearndetails,
    element: <WelearnDetails />,
  },
  {
    path: RoutePath.homecurriculum,
    element: <HomeCurriculum />,
  },
  {
    path: RoutePath.homesection,
    element: <HomeSection />,
  },
  {
    path: RoutePath.homeDirector,
    element: <HomeDirector />,
  },
  {
    path: RoutePath.jobhistorypage,
    element: <JobHistoriesPage />,
  },
  {
    path: RoutePath.homeJobHistory,
    element: <HomeJobHistory />,
  },
  {
    path: RoutePath.tabhomeproject,
    element: <TabHomeProject />,
  },
];

export const RoutePrivate = [
  {
    path: RoutePath.myaccount,
    element: <MyAccount />,
  },
  {
    path: RoutePath.parcel,
    element: <HomeParcel />,
  },
  {
    path: RoutePath.createparcel,
    element: <CreateUpdateParcel />,
  },
  {
    path: RoutePath.orderslips,
    element: <HomeOrderSlips />,
  },
  {
    path: RoutePath.createorderslips,
    element: <CreateUpdateOrderSlip />,
  },
  {
    path: RoutePath.paymentvoucher,
    element: <HomePaymentVoucher />,
  },
  {
    path: RoutePath.createpaymentvoucher,
    element: <CreateUpdatePaymentVoucher />,
  },
  {
    path: RoutePath.parcelinstock,
    element: <HomeParcelInStock />,
  },
  {
    path: RoutePath.rap,
    element: <RAPAccount checkView />,
  },
  {
    path: RoutePath.createupdateproject,
    element: <CreateUpdateProject />,
  },
  {
    path: RoutePath.createupdateresearch,
    element: <CreateUpdateRAP />,
  },
  ...RoutePublic,
];

export const RouteAdmin = [
  // {
  //   path: RoutePath.homeadmin,
  //   element: <AdminMode />,
  // },
  {
    path: "*",
    element: <NotFound />,
  },
  ...RoutePrivate,
];
