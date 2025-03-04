import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../constants/RoutePath";
import { useStore } from "../../store/store";

const RouteHeaderPercel = () => {
  const {
    commonStore: { removeSystem, setSelectedKeys, setKeysToStorage },
  } = useStore();

  return (
    <>
      <NavLink
        to={RoutePath.home}
        className="nav-item animate__animated animate__fadeInDown"
        style={{
          textDecoration: "none",
          color: "gray",
          fontWeight: "unset",
        }}
        onClick={() => {
          removeSystem(), setSelectedKeys("0"), setKeysToStorage("0");
        }}
        // onClick={() => {
        //   system
        //     ? item.name === "กลับ" && removeSystem()
        //     : item.name === "จัดการพัสดุ" && setSystem();
        // }}
      >
        กลับ
      </NavLink>
      <NavLink
        to={RoutePath.parcelinstock}
        className="nav-item animate__animated animate__fadeInDown"
        style={{
          textDecoration: "none",
          color: "gray",
          fontWeight: "unset",
        }}
        onClick={() => {
          setSelectedKeys("7"), setKeysToStorage("7");
        }}
      >
        พัสดุคงเหลือ
      </NavLink>
      <NavLink
        to={RoutePath.parcel}
        className="nav-item animate__animated animate__fadeInDown"
        style={{
          textDecoration: "none",
          color: "gray",
          fontWeight: "unset",
        }}
        onClick={() => {
          setSelectedKeys("8"), setKeysToStorage("8");
        }}
      >
        พัสดุทั้งหมด
      </NavLink>
      <NavLink
        to={RoutePath.orderslips}
        className="nav-item animate__animated animate__fadeInDown"
        style={{
          textDecoration: "none",
          color: "gray",
          fontWeight: "unset",
        }}
        onClick={() => {
          setSelectedKeys("9"), setKeysToStorage("9");
        }}
      >
        นำเข้าใบเบิก
      </NavLink>
      <NavLink
        to={RoutePath.paymentvoucher}
        className="nav-item animate__animated animate__fadeInDown"
        style={{
          textDecoration: "none",
          color: "gray",
          fontWeight: "unset",
        }}
        onClick={() => {
          setSelectedKeys("10"), setKeysToStorage("10");
        }}
      >
        ใบจ่ายพัสดุ
      </NavLink>
    </>
  );
};

export default observer(RouteHeaderPercel);
