import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../constants/RoutePath";
import { useStore } from "../../store/store";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const RouteHeaderPublic = () => {
  const {
    commonStore: { setSystem, setSelectedKeys, setKeysToStorage },
    BranchStore: {
      branch,
      currentBranchId,
      setCurrentBranch,
      getCurrentBranch,
      curriculum,
    },
    userStore: { isLoggedIn },
  } = useStore();

  const items: any = branch.map((item: any) => {
    return (
      item.id !== Number(currentBranchId) && {
        label: (
          <NavLink
            to={RoutePath.home}
            onClick={() => {
              setCurrentBranch(item.id);
              getCurrentBranch();
            }}
          >
            {item.branchName}
          </NavLink>
        ),
        key: item.id,
        value: item,
      }
    );
  });

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
          setSelectedKeys("0"), setKeysToStorage("0");
        }}
        // onClick={() => {
        //   system
        //     ? item.name === "กลับ" && removeSystem()
        //     : item.name === "จัดการพัสดุ" && setSystem();
        // }}
      >
        หน้าหลัก
      </NavLink>

      <NavLink
        to={RoutePath.homepersonnelpage}
        className="nav-item animate__animated animate__fadeInDown"
        style={{
          textDecoration: "none",
          color: "gray",
          fontWeight: "unset",
        }}
        onClick={() => {
          setSelectedKeys("15"), setKeysToStorage("15");
        }}
      >
        บุคลากร
      </NavLink>

      <NavLink
        to={RoutePath.tabhomeproject}
        className="nav-item animate__animated animate__fadeInDown"
        style={{
          textDecoration: "none",
          color: "gray",
          fontWeight: "unset",
        }}
        onClick={() => {
          setSelectedKeys("1"), setKeysToStorage("1");
        }}
      >
        งานวิจัย
      </NavLink>

      {Number(currentBranchId) !== 1 && curriculum.length !== 0 && (
        <NavLink
          // to={RoutePath.curriculum}
          to={
            Number(currentBranchId) === 1
              ? RoutePath.homecurriculum
              : RoutePath.curriculum
          }
          state={Number(currentBranchId)}
          className="nav-item animate__animated animate__fadeInDown"
          style={{
            textDecoration: "none",
            color: "gray",
            fontWeight: "unset",
          }}
          onClick={() => {
            setSelectedKeys("14"), setKeysToStorage("14");
          }}
        >
          หลักสูตร
        </NavLink>
      )}

      {!isLoggedIn && (
        <Dropdown menu={{ items }} placement="bottom">
          <Space
            className="nav-item animate__animated animate__fadeInDown hover"
            style={{
              textDecoration: "none",
              color: "gray",
              fontWeight: "unset",
              cursor: "pointer",
              marginLeft: 20,
            }}
          >
            หน่วยงาน
            <DownOutlined />
          </Space>
        </Dropdown>
      )}
    </>
  );
};

export default observer(RouteHeaderPublic);
