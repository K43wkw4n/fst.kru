import { RoutePath, pathImages } from "./constants/RoutePath";
import Header from "./layout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import HomePage from "./pages/home/Home.page";
import { useStore } from "./store/store.ts";
import { ToastContainer } from "react-toastify";
import AdminMode from "./admin/AdminMode.tsx";
import { RouteAdmin, RoutePrivate, RoutePublic } from "./routes/Routes";
import NotFound from "./pages/NotFound.tsx";
import { useEffect } from "react";
import RegisterAdmin from "./admin/adminEmpty/RegisterAdmin.tsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { dataMock } from "./store/branch.store.ts";
import { Spin } from "antd";

// useEffect(() => {
//   window.scrollTo(0, 0);
// }, []);

// window.scroll({
//   top: 0,
//   left: 0,
//   behavior: 'smooth' // เพื่อทำให้มีการเลื่อนแบบสามารถสะดวกได้
// });

function App() {
  const { user, isLoggedIn, deCodeToken, getCurrentUser, setUserToNull } =
    useStore().userStore;
  const {
    loading,
    setLoading,
    getBranchs,
    currentBranchId,
    setCurrentBranch,
    currentBranch,
  } = useStore().BranchStore;
  const { token, setToken } = useStore().commonStore;

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease",
      once: false,
    });

    if (!currentBranchId) {
      setCurrentBranch(1);
      window.location.reload();
    }

    // getAllAdminById(Number(currentBranchId));

    getBranchTest();
    token &&
      deCodeToken(token).then(async (e: any) => {
        console.log("e token :", JSON.stringify(e));

        if (!!e) {
          await getCurrentUser();
        } else {
          setToken(null);
          setUserToNull(null);
        }
      });

    // let link = document.createElement("link");

    // link.id = "favicon";
    // link.rel = "shortcut icon";
    // link.type = "image/svg+xml";
    // link.href =
    //   currentBranch?.logo === null
    //     ? dataMock.logo
    //     : pathImages.branch + currentBranch.logo;
    // document.head.appendChild(link);

    const existingFavicons = document.querySelectorAll(
      'link[rel="icon"], link[rel="shortcut icon"]'
    );
    existingFavicons.forEach((favicon: any) =>
      favicon.parentNode.removeChild(favicon)
    );

    // Create a new link element for the favicon
    const link = document.createElement("link");
    link.rel = "icon";
    link.href =
      currentBranch?.logo === null
        ? dataMock.logo
        : pathImages.branch + currentBranch.logo;

    // Append the new favicon to the head
    document.head.appendChild(link);

    document.title = currentBranch.branchName;
  }, [currentBranchId, currentBranch]);

  const getBranchTest = () => {
    // setLoading(true);
    getBranchs();
    // .then(() => {
    //   setLoading(false);
    // });
  };

  const route = isLoggedIn
    ? user?.roleId === 1
      ? RouteAdmin
      : RoutePrivate
    : RoutePublic;

  return (
    <>
      {/* <RouterProvider router={Routers} /> */}

      <div className="preloading" hidden={!loading}>
        <Spin tip="กำลังดาวน์โหลด" spinning={loading}>
          {" "}
        </Spin>
      </div>

      <BrowserRouter>
        <Routes>
          {/* <Route path={RoutePath.home} element={<Header adminMode={false} />}> */}
          <Route element={<Header adminMode={false} removeFooter={false} />}>
            {route.map((item, i) => (
              <Route key={i} path={item.path} element={item.element} />
            ))}

            {/* เมื่อ admin ไม่มี */}
          </Route>

          <Route path={RoutePath.home} element={<HomePage />} />

          <Route path={RoutePath.registeradmin} element={<RegisterAdmin />} />

          {user?.roleId === 1 && (
            <Route path={RoutePath.homeadmin} element={<AdminMode />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default observer(App);

{
  /* <BrowserRouter>
  <Routes>
    <Route path={RoutePath.home} element={<Header adminMode={false} />}>
      {route.map((item) => (
        <Route key={item.id} path={item.path} element={item.element} />
      ))}
    </Route>
  </Routes>
</BrowserRouter>; */
}

// export const Routers = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route
//         path={RoutePath.home}
//         element={<Header adminMode={false} removeFooter={false} />}
//       >
//         {/* <Route path="/manage" element={<Manage />} /> */}

//         <Route path={RoutePath.home} element={<HomePage />} />
//         <Route path={RoutePath.parcel} element={<HomeParcel />} />
//         <Route path={RoutePath.createparcel} element={<CreateUpdateParcel />} />

//         <Route path={RoutePath.orderslips} element={<HomeOrderSlips />} />
//         <Route
//           path={RoutePath.createorderslips}
//           element={<CreateUpdateOrderSlip />}
//         />
//         <Route
//           path={RoutePath.paymentvoucher}
//           element={<HomePaymentVoucher />}
//         />
//         <Route
//           path={RoutePath.createpaymentvoucher}
//           element={<CreateUpdatePaymentVoucher />}
//         />

//         <Route path={RoutePath.parcelinstock} element={<HomeParcelInStock />} />
//         <Route path={RoutePath.persondetails} element={<PersonDetails />} />

//         <Route path={RoutePath.homenewsdetails} element={<HomeNewsDetails />} />

//         <Route path={RoutePath.myaccount} element={<MyAccount />} />

//         <Route path={RoutePath.curriculum} element={<CurriculumPage />} />

//         <Route path={RoutePath.viewproject} element={<ViewProject />} />

//         <Route
//           path={RoutePath.createupdateproject}
//           element={<CreateUpdateProject />}
//         />

//         <Route path={RoutePath.projectpage} element={<ProjectPage />} />

//         {/* <Route path="" element={<HomePage />} /> */}
//       </Route>

//       <Route path={RoutePath.homeadmin} element={<AdminMode />} />
//       <Route path="*" element={<NotFound />} />
//       {/*<Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} /> */}
//     </>
//   )
// );
