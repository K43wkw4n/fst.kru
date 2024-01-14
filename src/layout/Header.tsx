import { NavLink, Outlet } from "react-router-dom";
import "../assets/css/style.css";
import {
  Col,
  Drawer,
  Dropdown,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tooltip,
} from "antd";
import {
  isLoggedInRoute,
  manageParcelRoute,
  publicRoute,
} from "../routesNav/NavigateNavbar";
import { useEffect, useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MenuOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
import { notify } from "../helper/components";
import { HttpStatusCode } from "axios";
import { RoutePath, pathImages } from "../constants/RoutePath";
import { dataMock } from "../store/branch.store";

const Header = () => {
  const {
    userStore: {
      login,
      isLoggedIn,
      logout,
      getCurrentUser,
      getPrefixAndPosition,
      prefix,
      generalPosition,
      position,
      register,
    },
    commonStore: { token, system, setSystem, removeSystem },
    modalStore: { open, openModal, closeModal },
    BranchStore: {
      currentBranchId,
      currentBranch,
      branch,
      getBranchs,
      setCurrentBranch,
      getBranchById,
      // systemSettings,
      getCurrentBranch,
      // GetSystemSettingByBranch,
    },
  } = useStore();

  const [modalRegister, setModalRegister] = useState(false);

  const [form] = Form.useForm();

  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const [openMenu, setOpenMenu] = useState(false);

  let routeNav = isLoggedIn
    ? system
      ? manageParcelRoute
      : isLoggedInRoute
    : publicRoute;

  // console.log("system : ", system);
  // console.log("token : ", token);
  // console.log("currentBranch : ", JSON.stringify(currentBranch));
  // console.log("systemSettings : ", JSON.stringify(systemSettings));

  useEffect(() => {
    getBranchs();
    token && getCurrentUser();
  }, []);

  useEffect(() => {
    getBranchById(Number(currentBranchId));
    getCurrentBranch();
  }, [currentBranchId]);

  const items: any = branch.map((item: any) => {
    return (
      item.id !== Number(currentBranchId) && {
        label: (
          <NavLink
            to={RoutePath.home}
            onClick={() => {
              setCurrentBranch(item.id);
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

  const onFinish = (values: any) => {
    console.log("success", values);
    if (values.password.length <= 5) {
      notify("กรุณาใส่รหัสอย่างน้อย 6 ตัวอักษร");
    } else {
      if (modalRegister) {
        register({
          userName: values.userName,
          password: values.password,
          fullName: values.fullName,
          generalPositionID: values.generalPosition,
          prefixID: values.prefix,
          branchId: Number(currentBranchId),
          positionId: values.position,
        }).then((e: any) => {
          if (
            e.statusCode === HttpStatusCode.NotFound ||
            e.statusCode === HttpStatusCode.BadRequest
          ) {
            notify("บางอย่างผิดพลาด");
          } else {
            login({ userName: values.userName, password })
              .then((e: any) => {
                if (
                  e.statusCode === HttpStatusCode.NotFound ||
                  e.statusCode === HttpStatusCode.BadRequest
                ) {
                } else {
                  form.resetFields();
                }
              })
              .then(() => {
                form.resetFields();
                setModalRegister(false);
              });
          }
        });
      } else {
        login({ userName: values.userName, password }).then((e: any) => {
          if (
            e.statusCode === HttpStatusCode.NotFound ||
            e.statusCode === HttpStatusCode.BadRequest
          ) {
          } else {
            form.resetFields();
          }
        });
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);

    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
    error === false && password === "" && setError(true);
  };

  const itemsPrefix = prefix.map((item: any) => {
    return {
      value: item.id,
      label: item.prefixName,
    };
  });

  const itemsGeneralPosition = generalPosition.map((item: any) => {
    return {
      value: item.id,
      label: item.generalPositionName,
    };
  });

  const itemsPosition = position.map((item: any) => {
    return {
      value: item.id,
      label: item.positionName,
    };
  });

  return (
    <>
      <div className="topNav">
        <div>fst.kru.ac.th</div>
      </div>
      <Row
        className="header"
        style={{ height: 80, zIndex: 999, justifyContent: "space-between" }}
      >
        <NavLink
          to={RoutePath.home}
          style={{
            color: "black",
          }}
        >
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              height: 80,
            }}
          >
            <Col span="auto">
              <img
                src={
                  currentBranch.id !== 0
                    ? currentBranch.logo === null
                      ? dataMock.logo
                      : pathImages.branch + currentBranch.logo
                    : currentBranch.logo
                }
                width={45}
                style={{ marginLeft: 20 }}
                alt="logo"
              />
            </Col>
            <Col span="auto">
              <div style={{ marginLeft: 15 }}>
                <h2 className="webName">
                  {system && "จัดการพัสดุ" + " "} {currentBranch.branchName}
                </h2>
                {/* <div>มหาวิทยาลัยราชภัฏกาญจนบุรี</div> */}
              </div>
            </Col>
          </Row>
        </NavLink>

        <div className="headerMenu">
          <Col
            flex="auto"
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <div className="nav-item animate__animated animate__fadeInDown">
              {routeNav.map((item, i) =>
                item.name === "หน่วยงาน" ? (
                  <Dropdown key={i} menu={{ items }} placement="bottom">
                    <Space
                      style={{
                        textDecoration: "none",
                        color: "gray",
                        fontWeight: "unset",
                        cursor: "pointer",
                        marginLeft: 20,
                      }}
                    >
                      หน่วยงาน
                    </Space>
                  </Dropdown>
                ) : (
                  // : item.name === "จัดการข้อมูล" ? (
                  //   <MenuManage
                  //     key={i}
                  //     data={dataSystem}
                  //     system={systemSettings}
                  //   />
                  // )
                  <NavLink
                    key={i}
                    to={item.path}
                    className="nav-item animate__animated animate__fadeInDown"
                    style={{
                      textDecoration: "none",
                      color: "gray",
                      fontWeight: "unset",
                    }}
                    onClick={() => {
                      system
                        ? item.name === "กลับ" && removeSystem()
                        : item.name === "จัดการพัสดุ" && setSystem();
                    }}
                  >
                    {item.name}
                  </NavLink>
                )
              )}
            </div>

            {isLoggedIn ? (
              <div
                className="nav-item animate__animated animate__fadeInDown hover"
                style={{
                  textDecoration: "none",
                  color: "gray",
                  fontWeight: "unset",
                  cursor: "pointer",
                }}
                onClick={() => logout()}
              >
                ออกจากระบบ
              </div>
            ) : (
              <div
                className="nav-item animate__animated animate__fadeInDown hover"
                style={{
                  textDecoration: "none",
                  color: "gray",
                  fontWeight: "unset",
                  cursor: "pointer",
                }}
                onClick={() => {
                  openModal();
                  getPrefixAndPosition();
                }}
              >
                เข้าสู่ระบบ
              </div>
            )}

            <div
              className="nav-item animate__animated animate__fadeInDown hover"
              style={{
                textDecoration: "none",
                color: "gray",
                fontWeight: "unset",
                cursor: "pointer",
              }}
              onClick={() => logout()}
            >
              ล้าง
            </div>

            <Modal
              title={modalRegister ? "ลงทะเบียน" : "เข้าสู่ระบบ"}
              wrapClassName="vertical-center-modal"
              open={open}
              okText={modalRegister ? "ลงทะเบียน" : "เข้าสู่ระบบ"}
              cancelText="ยกเลิก"
              onOk={() => form.submit()}
              onCancel={() => closeModal()}
            >
              <Form
                form={form} // Use the form instance
                name="login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                {modalRegister && (
                  <div>
                    <Form.Item
                      name="fullName"
                      rules={[
                        { required: true, message: "กรุณากรอกชื่อ-นามสกุล" },
                      ]}
                    >
                      <Input
                        placeholder="ชื่อ-นามสกุล"
                        prefix={<SolutionOutlined />}
                      />
                    </Form.Item>
                  </div>
                )}
                <div style={{ marginTop: 20 }}>
                  <Form.Item
                    name="userName"
                    rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
                  >
                    <Input placeholder="ชื่อผู้ใช้" prefix={<UserOutlined />} />
                  </Form.Item>
                </div>
                <div style={{ marginTop: 20 }}>
                  <Form.Item
                    name="password"
                    validateStatus={
                      error
                        ? "error"
                        : password.length <= 5 && password.length > 0
                        ? "error"
                        : "success"
                    }
                    rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
                    help={
                      error
                        ? "กรุณากรอกรหัสผ่าน"
                        : password.length <= 5 && password.length > 0
                        ? "อย่างน้อย 6 ตัวอักษร"
                        : null
                    }
                  >
                    <Input.Password
                      placeholder="รหัสผ่าน"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        error === true && setError(false);
                      }}
                      prefix={<LockOutlined />}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </div>

                {modalRegister && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Form.Item
                        name="prefix"
                        rules={[
                          { required: true, message: "กรุณากรอกคำนำหน้า" },
                        ]}
                      >
                        <Select
                          // defaultValue="คำนำหน้า"
                          style={{ width: 150 }}
                          placeholder="คำนำหน้า"
                          options={itemsPrefix}
                          allowClear
                        />
                      </Form.Item>
                      <Form.Item
                        name="generalPosition"
                        rules={[
                          { required: true, message: "กรุณากรอกตำแหน่ง" },
                        ]}
                      >
                        <Select
                          // defaultValue="ตำแหน่ง"
                          style={{ width: 150 }}
                          placeholder="ตำแหน่งทั่วไป"
                          options={itemsGeneralPosition}
                          allowClear
                        />
                      </Form.Item>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Form.Item
                        name="position"
                        rules={[
                          { required: true, message: "กรุณากรอกตำแหน่ง" },
                        ]}
                      >
                        <Select
                          // defaultValue="ตำแหน่ง"
                          placeholder="ตำแหน่ง"
                          options={itemsPosition}
                          style={{ width: 250 }}
                          allowClear
                        />
                      </Form.Item>
                    </div>
                  </>
                )}

                <div
                  style={{
                    // display: "flex",
                    // justifyContent: "end",
                    marginTop: 10,
                  }}
                >
                  <u
                    onClick={() => setModalRegister(!modalRegister)}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    {modalRegister ? "เข้าสู่ระบบ" : "ลงทะเบียน"}
                  </u>
                </div>
              </Form>
            </Modal>
          </Col>
        </div>

        <div className="menuIcon">
          <MenuOutlined
            className="nav-item animate__animated animate__fadeInDown"
            style={{ color: "black", fontSize: 20, marginRight: 43 }}
            onClick={() => setOpenMenu(true)}
          />
        </div>

        <Drawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          closable={false}
        >
          <div>
            {routeNav.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                className="nav-item animate__animated animate__fadeInDown"
                style={{
                  textDecoration: "none",
                  color: "gray",
                  fontWeight: "unset",
                  display: "block",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  item.id === 2 && setSystem();
                  setOpenMenu(false);
                }}
              >
                {item.name}
              </NavLink>
            ))}

            {isLoggedIn ? (
              <div
                className="nav-item animate__animated animate__fadeInDown hover"
                style={{
                  textDecoration: "none",
                  color: "gray",
                  fontWeight: "unset",
                  cursor: "pointer",
                  display: "block",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  logout();
                  setOpenMenu(false);
                }}
              >
                ออกจากระบบ
              </div>
            ) : (
              <div
                className="nav-item animate__animated animate__fadeInDown hover"
                style={{
                  textDecoration: "none",
                  color: "gray",
                  fontWeight: "unset",
                  cursor: "pointer",
                  display: "block",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  logout();
                  setOpenMenu(true);
                }}
              >
                เข้าสู่ระบบ
              </div>
            )}

            <div
              className="nav-item animate__animated animate__fadeInDown hover"
              style={{
                textDecoration: "none",
                color: "gray",
                fontWeight: "unset",
                cursor: "pointer",
                display: "block",
                marginBottom: "10px",
              }}
              onClick={() => {
                logout();
                setOpenMenu(true);
              }}
            >
              ออกจากระบบ
            </div>
          </div>
        </Drawer>
      </Row>

      {/* <UnderHead /> */}
      <div style={{ marginLeft: 50, marginRight: 50 }}>
        <Outlet />
      </div>
    </>
  );
};

export default observer(Header);

// <div className="header" style={{ height: 105 }}>
//   <Row>
//     <Col flex="500px">
//       <Row>
//         <Col span="auto">
//           <img
//             src="https://www.kru.ac.th/kru/assets/img/kru/logo/kru_color.png"
//             width={60}
//             style={{ margin: 13, marginLeft: 40 }}
//             alt="logo"
//           />
//         </Col>
//         <Col span="auto">
//           <h2>คณะวิทยาศาสตร์และเทคโนโลยี</h2>
//           <div>มหาลัยราชภัฏกาญจนบุรี</div>
//         </Col>
//       </Row>
//     </Col>
//     <Col flex="auto">
//       <div>
//         <NavLink
//           to={RoutePath.home}
//           className="nav-item"
//           style={{
//             textDecoration: "none",
//             color: "gray",
//             fontWeight: "unset",
//           }}
//         >
//           หน้าหลัก
//         </NavLink>
//         <NavLink
//           to={RoutePath.test}
//           className="nav-item"
//           style={{
//             textDecoration: "none",
//             color: "gray",
//             fontWeight: "unset",
//           }}
//         >
//           หลักสูตร
//         </NavLink>
//       </div>
//     </Col>
//   </Row>
// </div>;
