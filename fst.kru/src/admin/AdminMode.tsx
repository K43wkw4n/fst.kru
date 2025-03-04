import React, { useEffect, useState } from "react";
import {
  BookOutlined,
  DesktopOutlined,
  FileImageOutlined,
  FileOutlined,
  LeftOutlined,
  MenuOutlined,
  MoreOutlined,
  PieChartOutlined,
  RightOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Drawer, Layout, Menu, theme } from "antd";
import Header from "../layout/Header";
import SecretReport from "./pages/SecretReport";
import SecretSettingMyBranch from "./pages/SecretSettingMyBranch";
import SecretSlideShow from "./pages/SecretSlideShow";
import SecretWeLearn from "./pages/SecretWeLearn";
import SecretNews from "./pages/SecretNews";
import { GrActions } from "react-icons/gr";
import SecretBranch from "./pages/SecretBranch";
import SecretCurriculum from "./pages/SecretCurriculum";
import { FaRegNewspaper, FaBookBookmark } from "react-icons/fa6";
const { Content, Footer, Sider } = Layout;
import { IoImagesOutline } from "react-icons/io5";
import { FaSwatchbook, FaRegFolderOpen } from "react-icons/fa";
import PersonnelMode from "./PersonnelMode";
import { useStore } from "../store/store";
import ProjectMode from "./ProjectMode";
import { IoIosBookmarks } from "react-icons/io";
import CourseSpecificationAccount from "../pages/account/pages/CourseSpecification.Account";
import { CourseSpecification } from "../models/CourseSpecification";
import SecretJob from "./pages/job/SecretJob";
import SecretAnnualDirector from "./pages/annualDirector/SecretAnnualDirector";
import { BsFilePerson } from "react-icons/bs";
import { MdOutlineWorkHistory } from "react-icons/md";
import SecretSection from "./pages/section/SecretSection";
import AnnualDirectorMode from "./AnnualDirectorMode";
import SecretPersonnel from "./pages/person/SecretPersonnel";
import SecretStudent from "./pages/person/SecretStudent";
import AnotherMode from "./AnotherMode";
import SecretRoles from "./pages/person/SecretRoles";
import SecretGeneralPosition from "./pages/person/SecretGeneralPosition";
import SecretPrefix from "./pages/person/SecretPrefix";
import SecretPosition from "./pages/person/SecretPosition";
import { observer } from "mobx-react-lite";
import SecretResearch from "./pages/project/SecretResearch";
import SecretProject from "./pages/project/SecretProject";
import { GoGoal } from "react-icons/go";
import NotFound from "../pages/NotFound";
import SecretDirector from "./pages/annualDirector/SecretDirector";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
  } as MenuItem;
}

const AdminMode = () => {
  const {
    currentBranchId,
    openMenuAdmin,
    setOpenMenuAdmin,
    paramsSelectMenu,
    setParamsSelectMenu,
  } = useStore().BranchStore;
  const [collapsed, setCollapsed] = useState(true);

  // const [selectMenu, setSelectMenu]: any = useState(() => {
  //   // ตรวจสอบว่ามี URL parameters ที่เก็บข้อมูลเมนูที่เลือกหรือไม่
  //   const params = new URLSearchParams(location.search);
  //   return params.get("menu") || "1";
  // });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    window.scrollTo(0, 0);

    // เปลี่ยน URL parameters เมื่อมีการเลือกเมนูใหม่
    const params = new URLSearchParams();
    params.set("menu", paramsSelectMenu);
    // เปลี่ยน URL โดยไม่รีโหลดหน้า
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${params.toString()}`
    );
  }, [paramsSelectMenu, location]);

  const items: MenuItem[] = [
    getItem("หน้าหลัก", "1", <PieChartOutlined />),
    getItem("สาขา", "2", <GrActions />),
    getItem("ตั้งค่าระบบ", "3", <DesktopOutlined />),
    getItem("รูปภาพหน้าเว็บ", "4", <IoImagesOutline />),
    getItem("ข่าวประชาสัมพันธ์", "5", <FaRegNewspaper />),
    getItem("ผู้ใช้ในระบบ", "6", <UserOutlined />, [
      getItem("บุคลากร", "6.1"),
      getItem("นักศึกษา", "6.2"),
      getItem("อื่น ๆ", "6.3", <MoreOutlined />, [
        getItem("บทบาท", "6.3.1"),
        getItem("คำนำหน้าชื่อ", "6.3.2"),
        getItem("ตำแหน่ง", "6.3.3"),
        getItem("ตำแหน่งทั่วไป", "6.3.4"),
        // getItem("อื่น ๆ", "6.3"),
      ]),
    ]),
    getItem("สิ่งที่เรียน", "7", <FaSwatchbook />),
    getItem("หลักสูตร", "8", <FaBookBookmark />),
    getItem("โครงงาน, งานวิจัย", "9", <FaRegFolderOpen />, [
      getItem("งานวิจัยอาจารย์", "9.1"),
      getItem("งานวิจัยนักศึกษา", "9.2"),
      // getItem("อื่น ๆ", "6.3"),
    ]),
    getItem("มคอ.", "10", <IoIosBookmarks />),
    getItem("ประวัติการทำงาน", "11", <MdOutlineWorkHistory />),
    getItem("กรรมการประจำคณะ", "12", <BsFilePerson />, [
      getItem("ชุดคณะกรรมการ", "12.1"),
      getItem("กรรมการ", "12.2"),
      // getItem("คำนำหน้า", "6.3.2"),
      // getItem("อื่น ๆ", "6.3"),
    ]),
    getItem("ปรัชญา วิสัยทัศน์ พันธกิจ", "13", <GoGoal />),
    // getItem("User", "sub1", <UserOutlined />, [
    //   getItem("Tom", "4"),
    //   getItem("Bill", "5"),
    //   getItem("Alex", "6"),
    // ]),
    // getItem("Team", "sub2", <TeamOutlined />, [
    //   getItem("Team 1", "7"),
    //   getItem("Team 2", "8"),
    // ]),
    // getItem("Files", "9", <FileOutlined />),
  ];

  const menuAll: any = {
    "1": <SecretReport />,

    "3": <SecretSettingMyBranch />,
    "4": <SecretSlideShow />,
    "5": <SecretNews />,
    // "6": <PersonnelMode />,
    "6.1": <SecretPersonnel />,
    "6.2": <SecretStudent />,
    // "6.3": <AnotherMode />,
    "6.3.1": <SecretRoles />,
    "6.3.2": <SecretPrefix />,
    "6.3.3": <SecretPosition />,
    "6.3.4": <SecretGeneralPosition />,
    // "9": <ProjectMode />,
    "9.1": <SecretResearch />,
    "9.2": <SecretProject />,

    "11": <SecretJob />,
    // "12": <AnnualDirectorMode />,
  };

  const menuFST: any = {
    "2": <SecretBranch />,
    "12.1": <SecretAnnualDirector />,
    "12.2": <SecretDirector />,
    "10": <CourseSpecificationAccount bool={true} />,
    "13": <SecretSection />,
  };

  const menuBranch: any = {
    "7": <SecretWeLearn />,
    "8": <SecretCurriculum />,
  };

  const menu =
    Number(currentBranchId) === 1
      ? { ...menuAll, ...menuFST }
      : { ...menuBranch, ...menuAll };

  const filteredItems =
    Number(currentBranchId) !== 1
      ? items.filter(
          (item: any) =>
            item.key !== "2" &&
            item.key !== "12" &&
            item.key !== "13" &&
            item.key !== "10"
        )
      : items.filter((item: any) => item.key !== "7" && item.key !== "8");

  // const itemsBrach = items.filter((item: any) => item.key !== "2");

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          // collapsible
          collapsed={collapsed}
          // onCollapse={(value) => setCollapsed(value)}
          theme="light"
          className="layout-admin-web"
        >
          <Button
            // type="primary"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              borderRadius: 0,
              backgroundColor: "#F3F8FF",
            }} // กำหนด margin หรือ styling ตามต้องการ
            size="large"
            block
          >
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </Button>
          {/* <div className="demo-logo-vertical" /> */}
          <Menu
            theme="light"
            selectedKeys={[paramsSelectMenu]}
            mode="vertical"
            items={filteredItems}
            onClick={(item) => setParamsSelectMenu(item.key)}
            style={{
              minHeight: "100%",
              // position: "fixed",
              width: collapsed ? 80 : 200,
            }}
          >
            {/* {items.map((item: any) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => setParamsSelectMenu(item.key)}
            >
              <span>{item.label}</span>
            </Menu.Item>
          ))} */}
          </Menu>
        </Sider>

        <Drawer
          open={openMenuAdmin}
          onClose={() => setOpenMenuAdmin(false)}
          closable={false}
          placement="left"
        >
          <Menu
            theme="light"
            selectedKeys={[paramsSelectMenu]}
            mode="inline"
            items={filteredItems}
            onClick={(item) => {
              setParamsSelectMenu(item.key);
              setOpenMenuAdmin(false);
            }}
            style={{
              minHeight: "100%",
              // position: "fixed",
            }}
          ></Menu>
        </Drawer>

        <Layout>
          <Header adminMode={true} removeFooter={false} />
          <Content style={{ margin: "16px" }}>
            {/* <Breadcrumb style={{ margin: "0" }}> */}
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            {/* </Breadcrumb> */}
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {menu[paramsSelectMenu] || <NotFound />}
            </div>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
        </Layout>
      </Layout>
    </>
  );
};

export default observer(AdminMode);
