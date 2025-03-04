import {
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Row,
  Tabs,
  Upload,
  theme,
} from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { pathImages } from "../../constants/RoutePath";
import { FaRegUser } from "react-icons/fa";
import type { TabsProps } from "antd";
import StickyBox from "react-sticky-box";
import type { UploadFile } from "antd/es/upload/interface";
import type { UploadProps } from "antd/es/upload";
import { UploadButton } from "../../components/UploadButton";
import { HappyProvider } from "@ant-design/happy-work-theme";
import Profile from "./pages/Profile";
import Project from "./pages/student/Project";
import Password from "./pages/Password";
import JobHistory from "./pages/JobHistory";
import RAPAccountPage from "./pages/personnel/RAPAccount.Page";
import CourseSpecificationAccount from "./pages/CourseSpecification.Account";
import { CourseSpecification } from "../../models/CourseSpecification";
import MySave from "../../components/MySave";
import { getBase64 } from "../../helper/components";

const MyAccount = () => {
  const {
    userStore: {
      user,
      getCurrentUser,
      updateImageUser,
      getProjectByUser,
      getJobHistoryById,
    },
    ResearchAndProjectStore: { getResearchAndProjectByUser },
    commonStore: { token },
  }: any = useStore();

  const [file, setFile] = useState<UploadFile[]>([]);
  const [key, setkey] = useState("1");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );

  // console.log("user :L", JSON.stringify(user));

  const pathShowImage =
    user?.roleId === 0 ? pathImages.student : pathImages.personnel;

  useEffect(() => {
    getCurrentUser();

    if (user?.roleId !== 1) {
      getResearchAndProjectByUser();
      getProjectByUser();
    }

    user?.roleId === 0 && getJobHistoryById();

    window.scrollTo(0, 0);
  }, []);

  let tabList = [
    {
      key: 1,
      label: "ข้อมูลส่วนตัว",
      component: <Profile data={user} my_account={true} />,
    },
    {
      key: 2,
      label: "โครงงานวิจัย",
      component:
        user?.roleId === 0 ? (
          <Project checkView={true} />
        ) : (
          <RAPAccountPage checkView={false} />
        ),
    },
    {
      key: 3,
      label: "ประวัติการทำงาน",
      component: <JobHistory my_account />,
    },
  ];

  tabList =
    user?.roleId === 2
      ? [
          ...tabList,
          {
            key: 4,
            label: "มคอ.",
            component: <CourseSpecificationAccount bool={false} />,
          },
          {
            key: 5,
            label: "รหัสผ่าน",
            component: <Password />,
          },
        ]
      : [
          ...tabList,
          {
            key: 5,
            label: "รหัสผ่าน",
            component: <Password />,
          },
        ];

  const items = tabList
    .filter((x: any) =>
      user?.roleId !== 0
        ? user?.roleId === 2
          ? x.key !== 3
          : x.key !== 3 && x.key !== 2
        : x?.key
    )
    .map((item, i) => {
      const id = String(i + 1);
      return {
        label: item.label,
        key: id,
        children: item.component,
        // style: undefined,
      };
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as any);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const onChange: UploadProps["onChange"] = ({ fileList: file }) => {
    const modifiedFileList: any = file.map((file) => {
      if (file.status === "uploading") {
        // ทำการอัพโหลดไฟล์ จะไม่มี status ในขณะที่อัพโหลด ดังนั้นให้ตั้งค่า status เป็น 'uploading'
        return { ...file, status: "uploading" };
      } else {
        // ทำการอัพโหลดสำเร็จ กำหนดค่า status เป็น 'done' และอัพเดท response และ linkProps ตามที่ต้องการ
        return {
          ...file,
          status: "done",
          response: '{"status": "success"}',
          linkProps: '{"download": "image"}',
        };
      }
    });

    setFile(modifiedFileList.slice(-1));
  };

  const handleUpdateImage = () => {
    updateImageUser({ file: file[0].originFileObj }).then(() => {
      getCurrentUser();
      setFile([]);
    });
  };

  return (
    <>
      <Card
        style={{
          minHeight: 600,
        }}
      >
        <div>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col
              span={24}
              style={{
                alignItems: "center",
              }}
            >
              <Row
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                }}
              >
                <div>
                  {user?.image ? (
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      defaultFileList={user?.image}
                      fileList={file}
                      onChange={onChange}
                      accept=".jpeg, .jpg, .png"
                      onPreview={handlePreview}
                    >
                      {file.length === 0 && user !== undefined ? (
                        // <Badge.Ribbon text="Hippies">
                        <img
                          height={200}
                          src={pathShowImage + user?.image}
                          alt="logo"
                          style={
                            {
                              // width: "100%",
                              // height: "100%",
                              // objectFit: "cover",
                              // borderRadius: "50%",
                            }
                          }
                        />
                      ) : (
                        // </Badge.Ribbon>
                        file.length === 0 && UploadButton
                      )}
                    </Upload>
                  ) : (
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      defaultFileList={user?.image}
                      fileList={file}
                      onChange={onChange}
                      accept=".jpeg, .jpg, .png"
                      onPreview={handlePreview}
                    >
                      {/* <Badge.Ribbon text="Hippies"> */}
                      {file.length === 0 && <FaRegUser size={100} />}
                      {/* </Badge.Ribbon> */}
                    </Upload>
                  )}
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: "none" }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                </div>
              </Row>

              {file.length !== 0 && (
                <div
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MySave functionSave={handleUpdateImage} />
                </div>
              )}

              <Row
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 20 }}>
                    ชื่อ-นามสกุล :{" "}
                    {/* {!(user?.roleId === undefined || user?.roleId === 0) &&
                      user?.prefixName} */}
                    {user?.fullName}
                  </div>
                  {/* <div style={{ fontSize: 20 }}>
                    ชื่อผู้ใช้ : {user?.userName}
                  </div> */}
                </div>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <Tabs
                tabPosition="left"
                defaultActiveKey={key}
                onChange={(e) => setkey(e)}
                renderTabBar={renderTabBar}
                items={items}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </div>
        {/* <Row>
          <Col>
            {user?.image ? (
              <img height={300} src={pathShowImage + user?.image} />
            ) : (
              <FaRegUser size={100} />
            )}
          </Col>
          <Col
            style={{
              marginLeft: 20,
            }}
          >
            <Row>{user?.fullName}</Row>
            <Row>{user?.userName}</Row>
          </Col>
        </Row> */}
      </Card>
    </>
  );
};

export default observer(MyAccount);
