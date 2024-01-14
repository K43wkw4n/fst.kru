import { RoutePath } from "./constants/RoutePath";
import Header from "./layout/Header";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomeOrderSlips from "./pages/orderSlip/home/HomeOrderSlips";
import { observer } from "mobx-react-lite";
import HomePage from "./pages/home/Home.page";
import CreateUpdaateOrderSlip from "./pages/orderSlip/crud/CreateUpdateOrderSlip";
import { StoreContext, store } from "./store/store.ts";
import HomePaymentVoucher from "./pages/paymentVoucher/home/HomePaymentVoucher.tsx";
import CreateUpdatePaymentVoucher from "./pages/paymentVoucher/crud/CreateUpdatePaymentVoucher.tsx";
import CreateUpdateParcel from "./pages/parcel/crud/CreateUpdateParcel.tsx";
import HomeParcel from "./pages/parcel/home/HomeParcel.tsx";
import HomeParcelInStock from "./pages/parcel/stock/HomeParcelInStock.tsx";
import TestBranch from "./branch/TestBranch.tsx";
import { ToastContainer } from "react-toastify";
import AdminMode from "./admin/AdminMode.tsx";

function App() {
  return (
    <>
      <StoreContext.Provider value={store}>
        <RouterProvider router={Routers} />
      </StoreContext.Provider>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default observer(App);

export const Routers = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={RoutePath.home} element={<Header />}>
        {/* <Route path="/manage" element={<Manage />} /> */}
        <Route path="" element={<HomePage />} />
        <Route path={RoutePath.parcel} element={<HomeParcel />} />
        <Route path={RoutePath.createparcel} element={<CreateUpdateParcel />} />
        <Route path={RoutePath.orderslips} element={<HomeOrderSlips />} />
        <Route
          path={RoutePath.createorderslips}
          element={<CreateUpdaateOrderSlip />}
        />
        <Route
          path={RoutePath.paymentvoucher}
          element={<HomePaymentVoucher />}
        />
        <Route
          path={RoutePath.createpaymentvoucher}
          element={<CreateUpdatePaymentVoucher />}
        />

        <Route path={RoutePath.parcelinstock} element={<HomeParcelInStock />} />

        {/* <Route path="" element={<HomePage />} /> */}
      </Route>

      <Route path={RoutePath.homeadmin} element={<AdminMode />} />
      {/* <Route path="*" element={<Notfound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
    </>
  )
);
