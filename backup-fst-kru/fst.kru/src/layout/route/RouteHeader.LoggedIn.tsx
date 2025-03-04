import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../constants/RoutePath";
import { useStore } from "../../store/store";
import RouteHeaderPublic from "./RouteHeader.Public";

const RouteHeaderLoggedIn = () => {
  const {
    commonStore: { setSystem, setSelectedKeys, setKeysToStorage },
    userStore: { user },
    BranchStore: { curriculum, currentBranchId },
  } = useStore();

  return (
    <>
      <RouteHeaderPublic />

      {(user?.roleId === 1 || user?.roleId === 3) && (
        <NavLink
          to={RoutePath.parcelinstock}
          className="nav-item animate__animated animate__fadeInDown"
          style={{
            textDecoration: "none",
            color: "gray",
            fontWeight: "unset",
          }}
          onClick={() => {
            setSystem();
            setSelectedKeys("12"), setKeysToStorage("12");
          }}
        >
          จัดการพัสดุ
        </NavLink>
      )}

      {user?.roleId === 1 && (
        <NavLink
          to={RoutePath.homeadmin}
          className="nav-item animate__animated animate__fadeInDown"
          style={{
            textDecoration: "none",
            color: "gray",
            fontWeight: "unset",
          }}
          onClick={() => {
            setSelectedKeys("11"), setKeysToStorage("11");
          }}
        >
          จัดการระบบ
        </NavLink>
      )}
    </>
  );
};

export default observer(RouteHeaderLoggedIn);
