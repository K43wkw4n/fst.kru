import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Drawer,
  Dropdown,
  Form,
  Input,
  Modal,
  Radio,
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
  DownOutlined,
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
import { HappyProvider } from "@ant-design/happy-work-theme";
import Footer from "./Footer";
import RouteHeaderPublic from "./route/RouteHeader.Public";
import RouteHeaderPercel from "./route/RouteHeader.Percel";
import RouteHeaderLoggedIn from "./route/RouteHeader.LoggedIn";
import type { RadioChangeEvent } from "antd";
import { Roles } from "../models/Roles";
import "dayjs/locale/th";
import locale from "antd/lib/locale/th_TH";
import dayjs from "dayjs";
import FooterTest from "./test/FooterTest";
import MyDrawer from "./components/MyDrawer";
import { Kru } from "../constants/Kru";

interface adminMode {
  adminMode: boolean;
  removeFooter: boolean;
}

const Header = ({ adminMode, removeFooter }: adminMode) => {
  const {
    userStore: {
      user,
      login,
      isLoggedIn,
      logout,
      getPrefixAndPosition,
      prefix,
      generalPosition,
      position,
      register,
      deCodeToken,
      createStudent,
      getStudentById,
      roles,
      getRoles,
      loading,
    },
    commonStore: { token, system, setSystem, setToken, removeSystem },
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
      getCurriculumById,
      setOpenMenuAdmin,
    },
  } = useStore();

  const navigate = useNavigate();
  // console.log("user", JSON.stringify(user?.fullName));
  // console.log("token", JSON.stringify(token?.substring(0, 50)));

  const [modalRegister, setModalRegister] = useState(false);

  const [form] = Form.useForm();

  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const [value, setValue] = useState(1);

  let routeNav = isLoggedIn
    ? system
      ? manageParcelRoute
      : isLoggedInRoute
    : publicRoute;

  // console.log("system : ", system);
  // console.log("token : ", token);
  // console.log("currentBranch : ", JSON.stringify(currentBranch));
  // console.log("systemSettings : ", JSON.stringify(systemSettings));

  useEffect(() => {}, [isLoggedIn]);

  useEffect(() => {
    getCurriculumById(Number(currentBranchId));
    getBranchById(Number(currentBranchId));
    getCurrentBranch();
    getRoles();
  }, [currentBranchId]);

  const onFinish = (values: any) => {
    console.log("success", values);
    if (values.password.length <= 5) {
      notify("กรุณาใส่รหัสอย่างน้อย 6 ตัวอักษร");
    } else {
      if (modalRegister) {
        if (value === 1) {
          register({
            userName: values.userName,
            password: values.password,
            fullName: values.fullName,
            image: null,
            expert: null,
            lvEdu: null,
            description: null,
            generalPositionID: values.generalPosition,
            roleId: values.role,
            prefixID: values.prefix,
            branchId: Number(currentBranchId),
            positionId: values.position,
          }).then((e: any) => {
            console.log("e", JSON.stringify(e));

            if (
              e.statusCode === HttpStatusCode.NotFound ||
              e.statusCode === HttpStatusCode.BadRequest
            ) {
              notify("บางอย่างผิดพลาด");
            } else if (e.statusCode === HttpStatusCode.Ok) {
              login({
                userName: values.userName,
                password,
                branchId: Number(currentBranchId),
              })
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
            } else {
              notify(`${e}`);
            }
          });
        } else {
          createStudent({
            id: 0,
            fullName: values.fullName,
            // image: file.length === 0 ? null : file[0].originFileObj,
            userName: values.userName,
            password: password,
            yearEdu: datePicker.format(),
            // address: values.address,
            branchId: Number(currentBranchId),
          }).then((e: any) => {
            console.log("e createStudent :L", e);
            if (e.statusCode === HttpStatusCode.BadRequest) {
              notify(`บางอย่างผิดพลาด!`);
            } else if (e.statusCode === HttpStatusCode.Ok) {
              login({
                userName: values.userName,
                password,
                branchId: Number(currentBranchId),
              })
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
              getStudentById(Number(currentBranchId));
              form.resetFields();
            } else {
              notify(`${e}`);
            }
          });
        }
      } else {
        login({
          userName: values.userName,
          password,
          branchId: Number(currentBranchId),
        }).then((e: any) => {
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

  const itemsAccount: any = [
    {
      label: (
        <NavLink to={RoutePath.myaccount} onClick={() => null}>
          บัญชี
        </NavLink>
      ),
      key: 1,
      value: [],
    },
    {
      label: (
        <div
          // className="nav-item animate__animated animate__fadeInDown hover"
          style={{
            textDecoration: "none",
            fontWeight: "unset",
            cursor: "pointer",
          }}
          onClick={() => {
            onLogout();
            removeSystem();
          }}
        >
          ออกจากระบบ
        </div>
      ),
      key: 2,
      value: [],
      danger: true,
    },
  ];

  const itemsRoles = roles
    .filter(
      (item: Roles) =>
        item?.id !== 1 &&
        item?.roleName.toLowerCase() !== "admin" &&
        item?.roleName.toLowerCase() !== "ผู้ดูแล"
    )
    ?.map((item: Roles) => {
      return {
        value: item?.id,
        label: item?.roleName,
      };
    });

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onLogout = () => {
    logout(navigate);
  };

  const [datePicker, setDatePicker]: any = useState<dayjs.Dayjs | null>(
    dayjs(Date.now()).add(543, "year")
  );

  const onChangeYear = (selectedDate: dayjs.Dayjs | null) => {
    console.log("datePicker selected : ", dayjs(selectedDate).format("YYYY"));
    setDatePicker(selectedDate);
  };

  const dataHeader = [
    {
      id: 1,
      name: "",
      functionOnClick: [],
      component: null,
    },
  ];

  return (
    <>
      <div
        className="topNav"
        style={
          adminMode
            ? { backgroundColor: "red" }
            : Number(currentBranchId) === 1
            ? { backgroundColor: "#FFF67E" }
            : { backgroundColor: "#6aad6a" }
        }
      >
        <div
          style={
            adminMode
              ? { color: "white" }
              : Number(currentBranchId) === 1
              ? { color: "black" }
              : { color: "white" }
          }
        >
          fst.kru.ac.th
        </div>
      </div>

      <Row
        className="header"
        style={{
          // height: Number(currentBranchId) === 1 ? 110 : 80,
          height: 110,
          zIndex: 999,
          justifyContent: "space-between",
        }}
      >
        {!adminMode ? (
          <>
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
                  height: 110,
                  // height: Number(currentBranchId) === 1 ? 110 : 80,
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
                  <div
                    style={{
                      marginLeft: 15,
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div className="webName" style={{ fontWeight: "bold" }}>
                        {system && "จัดการพัสดุ" + " "}{" "}
                        {currentBranch.branchName}
                      </div>
                      <div
                        style={{
                          position: "relative",
                          fontWeight: "unset",
                        }}
                      >
                        {Kru.name}
                      </div>
                    </div>
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
                  marginRight: 30,
                }}
              >
                {isLoggedIn ? (
                  system ? (
                    <RouteHeaderPercel />
                  ) : (
                    <>
                      <RouteHeaderLoggedIn />
                    </>
                  )
                ) : (
                  <RouteHeaderPublic />
                )}

                {isLoggedIn ? (
                  <Dropdown menu={{ items: itemsAccount }} placement="bottom">
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
                      <div>
                        {/* {!(user?.roleId === undefined || user?.roleId === 0) &&
                          user?.prefixName} */}
                        {user?.fullName}
                      </div>
                      <DownOutlined />
                    </Space>
                  </Dropdown>
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

                {/* <div style={{ display: "flex", justifyContent: "end" }}>
                  <HappyProvider>
                    <Button
                      style={{ marginRight: 10 }}
                      color="whtie"
                      onClick={() => setModalRegister(!modalRegister)}
                    >
                      {modalRegister ? "เข้าสู่ระบบ" : "ลงทะเบียน"}
                    </Button>
                  </HappyProvider>
                  <HappyProvider>
                    <Button htmlType="submit" type="primary" color="whtie">
                      {modalRegister ? "ลงทะเบียน" : "เข้าสู่ระบบ"}
                    </Button>
                  </HappyProvider>
                </div> */}

                <Modal
                  title={modalRegister ? "ลงทะเบียน" : "เข้าสู่ระบบ"}
                  wrapClassName="vertical-center-modal"
                  open={open}
                  okText={modalRegister ? "ลงทะเบียน" : "เข้าสู่ระบบ"}
                  cancelText={"ยกเลิก"}
                  confirmLoading={loading}
                  onOk={() => {
                    form.submit();
                  }}
                  onCancel={() => {
                    closeModal();
                    setValue(1);
                    setModalRegister(false);
                    // setModalRegister(!modalRegister);
                  }}
                >
                  <Form
                    form={form}
                    name={modalRegister ? "register" : "login"}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                  >
                    {modalRegister && (
                      <>
                        <div style={{ marginTop: 20 }}>
                          <Row>
                            <Col span={12}>
                              <Radio.Group onChange={onChange} value={value}>
                                <Radio value={1}>บุคลกร</Radio>
                                <Radio value={2}>นักศึกษา</Radio>
                              </Radio.Group>
                            </Col>
                          </Row>
                        </div>
                        <Row style={{ marginTop: 20 }}>
                          {value === 1 && (
                            <Col span={8}>
                              <Form.Item
                                name="prefix"
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณากรอกคำนำหน้าชื่อ",
                                  },
                                ]}
                              >
                                <Select
                                  // defaultValue="คำนำหน้าชื่อ"
                                  style={{ width: 150 }}
                                  placeholder="คำนำหน้าชื่อ"
                                  options={itemsPrefix}
                                  allowClear
                                />
                              </Form.Item>
                            </Col>
                          )}

                          <Col span={value === 1 ? 16 : 24}>
                            <div>
                              <Form.Item
                                name="fullName"
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณากรอกชื่อ-นามสกุล",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="ชื่อ-นามสกุล"
                                  prefix={<SolutionOutlined />}
                                />
                              </Form.Item>
                            </div>
                          </Col>
                        </Row>
                      </>
                    )}
                    <div>
                      <Form.Item
                        name="userName"
                        rules={[
                          { required: true, message: "กรุณากรอกชื่อผู้ใช้" },
                        ]}
                      >
                        <Input
                          placeholder={`ชื่อผู้ใช้${
                            value === 1 ? "" : " หรือ รหัสนักศึกษา"
                          } `}
                          prefix={<UserOutlined />}
                        />
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
                        rules={[
                          { required: true, message: "กรุณากรอกรหัสผ่าน" },
                        ]}
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

                    {modalRegister && value === 2 && (
                      <Form.Item
                        label="ปีการศึกษา"
                        name="yearEdu"
                        // rules={[
                        //   { required: true, message: "กรุณากรอกความชำนาน" },
                        // ]}
                      >
                        <ConfigProvider locale={locale}>
                          <DatePicker
                            id="yearEdu"
                            style={{ maxWidth: 150 }}
                            onChange={onChangeYear}
                            defaultValue={datePicker}
                            value={datePicker}
                            picker="year"
                            allowClear={true}
                          />
                        </ConfigProvider>
                      </Form.Item>
                    )}

                    {modalRegister && value === 1 && (
                      <Row>
                        <Col span={8}>
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
                        </Col>

                        <Col span={16}>
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
                              // style={{ width: 250 }}
                              allowClear
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    )}

                    {modalRegister && (
                      <>
                        {value === 1 && (
                          <Col span={value === 1 ? 12 : 24}>
                            <Form.Item
                              // label="บทบาท"
                              name="role"
                              rules={[
                                {
                                  required: true,
                                  message: "กรุณากรอกบทบาท",
                                },
                              ]}
                            >
                              <Select
                                // defaultValue="บทบาท"
                                style={{ width: 150 }}
                                placeholder="บทบาท"
                                options={itemsRoles}
                                allowClear
                              />
                            </Form.Item>
                          </Col>
                        )}
                      </>
                    )}

                    {/* <HappyProvider>
                      <Button
                        style={{ marginRight: 10 }}
                        color="whtie"
                        onClick={() => setModalRegister(!modalRegister)}
                        disabled={loading}
                      >
                        {modalRegister ? "เข้าสู่ระบบ" : "ลงทะเบียน"}
                      </Button>
                    </HappyProvider> */}

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
                    {/* <div style={{ display: "flex", justifyContent: "end" }}>
                      <HappyProvider>
                        <Button
                          style={{ marginRight: 10 }}
                          color="whtie"
                          onClick={() => setModalRegister(!modalRegister)}
                        >
                          {modalRegister ? "เข้าสู่ระบบ" : "ลงทะเบียน"}
                        </Button>
                      </HappyProvider>
                      <HappyProvider>
                        <Button htmlType="submit" type="primary" color="whtie">
                          {modalRegister ? "ลงทะเบียน" : "เข้าสู่ระบบ"}
                        </Button>
                      </HappyProvider>
                    </div> */}
                  </Form>
                </Modal>
              </Col>
            </div>
          </>
        ) : (
          <>
            <NavLink
              to={RoutePath.home}
              style={{
                color: "black",
              }}
              className="menuIcon-admin-out"
            >
              <Row
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 110,
                  // height: Number(currentBranchId) === 1 ? 110 : 80,
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

            {/* ของ admin */}
            <div className="menuIcon-admin">
              <MenuOutlined
                className="nav-item animate__animated animate__fadeInDown"
                style={{ color: "black", fontSize: 20 }}
                onClick={() => setOpenMenuAdmin(true)}
              />
            </div>

            <Col
              flex="auto"
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                marginRight: 30,
              }}
            >
              {isLoggedIn ? (
                <Dropdown menu={{ items: itemsAccount }} placement="bottom">
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
                    {user?.fullName}
                    <DownOutlined />
                  </Space>
                </Dropdown>
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
            </Col>
          </>
        )}

        {/* icon hamburger */}
        {!adminMode && (
          <div className="menuIcon">
            <MenuOutlined
              className="nav-item animate__animated animate__fadeInDown"
              style={{ color: "black", fontSize: 20, marginRight: 43 }}
              onClick={() => setOpenMenu(true)}
            />
          </div>
        )}

        <MyDrawer openMenu={openMenu} setOpenMenu={setOpenMenu} />
        {/* <Drawer
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
                  onLogout();
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
                  onLogout();
                  setOpenMenu(true);
                }}
              >
                เข้าสู่ระบบ
              </div>
            )}
          </div>
        </Drawer> */}
      </Row>

      {/* <UnderHead /> */}
      <Row justify="space-evenly">
        <Col span={21}>
          <Outlet />
        </Col>
      </Row>

      {!adminMode && !removeFooter && <Footer />}
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
