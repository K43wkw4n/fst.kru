import React, { useEffect, useState } from "react";
import {
  BookOutlined,
  DesktopOutlined,
  FileImageOutlined,
  FileOutlined,
  LeftOutlined,
  MenuOutlined,
  PieChartOutlined,
  RightOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import Header from "../layout/Header";
import { HomeAdmin } from "./pages/HomeAdmin";
import HomeSettingMyBranch from "./pages/HomeSettingMyBranch";
import HomeSlideShow from "./pages/HomeSlideShow";
import HomePersonnel from "./pages/HomePersonnel";
import HomeWeLearn from "./pages/HomeWeLearn";
import HomeNews from "./pages/HomeNews";
import { GrActions } from "react-icons/gr";
import HomeBranch from "./pages/HomeBranch";
import { SiFuturelearn } from "react-icons/si";
import HomeCurriculum from "./pages/HomeCurriculum";
import { FaRegNewspaper, FaBookBookmark } from "react-icons/fa6";
const { Content, Footer, Sider } = Layout;
import { IoImagesOutline } from "react-icons/io5";
import { FaSwatchbook } from "react-icons/fa";

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

const items: MenuItem[] = [
  getItem("ข้อมูลสรุป", "1", <PieChartOutlined />),
  getItem("สาขา", "2", <GrActions />),
  getItem("เกี่ยวกับเว็บ", "3", <DesktopOutlined />),
  getItem("สไลด์", "4", <IoImagesOutline />),
  getItem("ข่าวประชาสัมพันธ์", "5", <FaRegNewspaper />),
  getItem("ผู้ใช้ในระบบ", "6", <UserOutlined />),
  getItem("สิ่งที่เรียน", "7", <FaSwatchbook />),
  getItem("หลักสูตร", "8", <FaBookBookmark />),
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

const menuContentMap: any = {
  "1": <HomeAdmin />,
  "2": <HomeBranch />,
  "3": <HomeSettingMyBranch />,
  "4": <HomeSlideShow />,
  "5": <HomeNews />,
  "6": <HomePersonnel />,
  "7": <HomeWeLearn />,
  "8": <HomeCurriculum />,
};

const AdminMode = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectMenu, setSelectMenu]: any = useState(() => {
    // ตรวจสอบว่ามี URL parameters ที่เก็บข้อมูลเมนูที่เลือกหรือไม่
    const params = new URLSearchParams(location.search);
    return params.get("menu") || "1";
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    // เปลี่ยน URL parameters เมื่อมีการเลือกเมนูใหม่
    const params = new URLSearchParams();
    params.set("menu", selectMenu);
    // เปลี่ยน URL โดยไม่รีโหลดหน้า
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${params.toString()}`
    );
  }, [selectMenu, location]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        // collapsible
        collapsed={collapsed}
        // onCollapse={(value) => setCollapsed(value)}
        style={{
          backgroundColor: "#fff",
        }}
      >
        <Button
          // type="primary"
          onClick={() => setCollapsed(!collapsed)}
          style={{ borderRadius: 0, backgroundColor: "#F3F8FF" }} // กำหนด margin หรือ styling ตามต้องการ
          size="large"
          block
        >
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </Button>
        {/* <div className="demo-logo-vertical" /> */}
        <Menu
          theme="light"
          defaultSelectedKeys={[selectMenu]}
          mode="inline"
          items={items}
          onClick={(item) => setSelectMenu(item.key)}
          style={{
            minHeight: "100%",
            position: "fixed",
            width: collapsed ? 80 : 200,
          }}
        >
          {/* {items.map((item: any) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => setSelectMenu(item.key)}
            >
              <span>{item.label}</span>
            </Menu.Item>
          ))} */}
        </Menu>
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {menuContentMap[selectMenu]}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminMode;
