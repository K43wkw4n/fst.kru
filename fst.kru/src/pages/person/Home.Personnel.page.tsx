import {
  Col,
  Empty,
  Image,
  Modal,
  Row,
  Select,
  Skeleton,
  Tabs,
  theme,
} from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store/store";
import { useEffect, useState } from "react";
import { imageLocal, pathImages } from "../../constants/RoutePath";
import { PersonnelinBranch } from "../../models/PersonnelinBranch";
import { Student } from "./../../models/Student";
import MyCard from "./components/MyCard";
import { DataEmpty } from "../../components/DataEmpty";
// import userImage from "../../assets/images/userImage.webp";
import StickyBox from "react-sticky-box";
import type { TabsProps } from "antd";
import Profile from "../account/pages/Profile";
import Project from "../account/pages/student/Project";
import RAPAccountPage from "../account/pages/personnel/RAPAccount.Page";
import JobHistory from "../account/pages/JobHistory";
import { FaRegUser } from "react-icons/fa";

const HomePersonnelPage = () => {
  const {
    BranchStore: { currentBranchId },
    userStore: {
      user,
      loading,
      personnels,
      getPersonnelById,
      students,
      getStudentById,
      getProjectByUserId,
      getJobHistoryByUserId,
    },
    ResearchAndProjectStore: { getResearchAndProjectByUserId },
  } = useStore();
  const { branch, getBranchs } = useStore().BranchStore;

  useEffect(() => {
    getBranchs();
    getPersonnelById(
      Number(currentBranchId) === 1 ? 0 : Number(currentBranchId)
    );
    getStudentById(Number(currentBranchId) === 1 ? 0 : Number(currentBranchId));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const items = branch.map((item) => {
    return {
      value: item.id,
      label: item.branchName,
    };
  });

  const [value, setValue] = useState<any>();

  const allValues = {
    value: 0,
    label: "ทั้งหมด",
  };

  const LecturerPage: React.FC<{ data: PersonnelinBranch[] }> = ({ data }) => {
    const lecturer = data.filter((x) => x.personnel.roleID === 2);

    return (
      <>
        {Number(currentBranchId) === 1 && (
          <Row>
            <Select
              defaultValue="ทั้งหมด"
              placeholder="ทั้งหมด"
              options={[allValues, ...items]}
              style={{ minWidth: 250, marginBottom: 20 }}
              // allowClear
              value={value}
              onChange={(e) => {
                const find = branch.find((x) => x.id === Number(e));

                if (find === undefined) {
                  setValue(allValues);
                } else {
                  setValue({
                    value: find?.id,
                    label: find?.branchName,
                  });
                }
              }}
              onSelect={(e) => getPersonnelById(Number(e))}
            />
          </Row>
        )}

        {lecturer.length !== 0 ? (
          <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {data.map((item) => {
                // console.log("item", JSON.stringify(item));

                return (
                  item.personnel.roleID === 2 && (
                    <Col
                      key={item.id}
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: 20,
                      }}
                    >
                      <MyCard
                        name={
                          item.personnel.prefixes.prefixName +
                          item.personnel.fullName
                        }
                        path={pathImages.personnel}
                        image={item.personnel.image}
                        noImage={imageLocal.userImage}
                      />
                    </Col>
                  )
                );
              })}
            </Row>
          </>
        ) : (
          <>
            <Empty
              description="ไม่มีข้อมูล"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </>
        )}
      </>
    );
  };

  const PersonPage: React.FC<{ data: PersonnelinBranch[] }> = ({ data }) => {
    return (
      <>
        {Number(currentBranchId) === 1 && (
          <Row>
            <Select
              defaultValue="ทั้งหมด"
              placeholder="ทั้งหมด"
              options={[allValues, ...items]}
              style={{ minWidth: 250, marginBottom: 20 }}
              // allowClear
              value={value}
              onChange={(e) => {
                const find = branch.find((x) => x.id === Number(e));

                if (find === undefined) {
                  setValue(allValues);
                } else {
                  setValue({
                    value: find?.id,
                    label: find?.branchName,
                  });
                }
              }}
              onSelect={(e) => {
                getPersonnelById(Number(e));
                getStudentById(Number(e));
              }}
            />
          </Row>
        )}

        {loading ? (
          <div
            style={{
              height: 600,
            }}
          >
            <Skeleton active />
          </div>
        ) : data.length !== 0 ? (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {data.map((item) => {
              // console.log("item", JSON.stringify(item));
              const [details, setDetails] = useState(false);

              const [key, setkey] = useState("1");

              const {
                token: { colorBgContainer },
              } = theme.useToken();
              const renderTabBar: TabsProps["renderTabBar"] = (
                props,
                DefaultTabBar
              ) => (
                <StickyBox
                  offsetTop={0}
                  offsetBottom={20}
                  style={{ zIndex: 1 }}
                >
                  <DefaultTabBar
                    {...props}
                    style={{ background: colorBgContainer }}
                  />
                </StickyBox>
              );

              const dataShow = {
                id: item.personnelId,
                prefixId: item.personnel.prefixes.id,
                prefixName: item.personnel.prefixes.prefixName,
                fullName: item.personnel.fullName,
                image: item.personnel.image,
                roleId:
                  item.personnel.roleID === undefined
                    ? 0
                    : item.personnel.roleID,
                expert: item.personnel.expert,
                lvEdu: item.personnel.lvEdu,
                description: item.personnel.description,
                positionId: item.position.id,
                positionName: item.position.positionName,
                generalPositionId: item.personnel.generalPositions.id,
                generalPositionName:
                  item.personnel.generalPositions.generalPositionName,
              };

              let tabLists = [
                {
                  key: 1,
                  label: "ข้อมูลส่วนตัว",
                  component: (
                    <Profile
                      data={dataShow}
                      my_account={dataShow.id === user?.userId}
                    />
                  ),
                },
                {
                  key: 2,
                  label: "โครงงานวิจัย",
                  component: (
                    <RAPAccountPage checkView={dataShow.id !== user?.userId} />
                  ),
                },
                {
                  key: 3,
                  label: "ประวัติการทำงาน",
                  component: <JobHistory my_account={false} />,
                },
              ];

              const items = tabLists
                .filter((x: any) =>
                  dataShow?.roleId !== 0
                    ? dataShow?.roleId === 2
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

              return (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={4}
                  xxl={3}
                  key={item.id}
                  className="gutter-row"
                  style={{
                    marginBottom: 20,
                  }}
                >
                  <div
                    onClick={() => {
                      getResearchAndProjectByUserId(dataShow.id).then(() => {
                        setDetails(true);
                      });
                    }}
                  >
                    <MyCard
                      name={
                        item.personnel.prefixes.prefixName +
                        item.personnel.fullName
                      }
                      path={pathImages.personnel}
                      image={item.personnel.image}
                      noImage={imageLocal.userImage}
                    />
                  </div>

                  <Modal
                    title="บุคลากร"
                    centered
                    open={details}
                    onCancel={() => setDetails(false)}
                    footer={null}
                    width={1300}
                  >
                    {/* <PersonDetails
                      data={dataShow}
                      path={pathImages.personnel}
                    /> */}
                    <Row
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col span={24}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 20,
                          }}
                        >
                          {dataShow?.image ? (
                            <Image
                              height={200}
                              src={pathImages.personnel + dataShow?.image}
                            />
                          ) : (
                            <FaRegUser size={100} />
                          )}
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 20, marginBottom: 10 }}>
                            {dataShow.prefixName} {dataShow.fullName}
                          </div>
                          {/* <div style={{ fontSize: 20 }}>ชื่อผู้ใช้ : {data.userName}</div> */}
                        </div>
                      </Col>
                    </Row>
                    <Tabs
                      tabPosition="left"
                      defaultActiveKey={key}
                      onChange={(e) => setkey(e)}
                      renderTabBar={renderTabBar}
                      items={items}
                      style={{ width: "100%" }}
                    />
                  </Modal>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div
            style={{
              height: 600,
            }}
          >
            <DataEmpty />
          </div>
        )}
      </>
    );
  };

  const StudentPage: React.FC<{ data: Student[] }> = ({ data }) => {
    return (
      <>
        {Number(currentBranchId) === 1 && (
          <Row>
            <Select
              defaultValue="ทั้งหมด"
              placeholder="ทั้งหมด"
              options={[allValues, ...items]}
              style={{ minWidth: 250, marginBottom: 20 }}
              // allowClear
              value={value}
              onChange={(e) => {
                const find = branch.find((x) => x.id === Number(e));

                if (find === undefined) {
                  setValue(allValues);
                } else {
                  setValue({
                    value: find?.id,
                    label: find?.branchName,
                  });
                }
              }}
              onSelect={(e) => {
                getPersonnelById(Number(e));
                getStudentById(Number(e));
              }}
            />
          </Row>
        )}

        {loading ? (
          <div
            style={{
              height: 600,
            }}
          >
            <Skeleton active />
          </div>
        ) : data.length !== 0 ? (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {data.map((item) => {
              // console.log("item", JSON.stringify(item));
              const [details, setDetails] = useState(false);

              const [key, setkey] = useState("1");

              const {
                token: { colorBgContainer },
              } = theme.useToken();
              const renderTabBar: TabsProps["renderTabBar"] = (
                props,
                DefaultTabBar
              ) => (
                <StickyBox
                  offsetTop={0}
                  offsetBottom={20}
                  style={{ zIndex: 1 }}
                >
                  <DefaultTabBar
                    {...props}
                    style={{ background: colorBgContainer }}
                  />
                </StickyBox>
              );

              let tabLists = [
                {
                  key: 1,
                  label: "ข้อมูลส่วนตัว",
                  component: (
                    <Profile
                      data={item}
                      my_account={item.id === user?.userId}
                    />
                  ),
                },
                {
                  key: 2,
                  label: "โครงงานวิจัย",
                  component: <Project checkView={item.id === user?.userId} />,
                },
                {
                  key: 3,
                  label: "ประวัติการทำงาน",
                  component: (
                    <JobHistory my_account={item.id === user?.userId} />
                  ),
                },
              ];

              const items = tabLists.map((item, i) => {
                const id = String(i + 1);
                return {
                  label: item.label,
                  key: id,
                  children: item.component,
                  // style: undefined,
                };
              });

              return (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={4}
                  xxl={3}
                  key={item.id}
                  className="gutter-row"
                  style={{
                    marginBottom: 20,
                  }}
                >
                  <div
                    onClick={() => {
                      getJobHistoryByUserId(item.id);
                      getProjectByUserId(item.id).then(() => {
                        setDetails(true);
                      });
                    }}
                  >
                    <MyCard
                      name={item.fullName}
                      path={pathImages.student}
                      image={item.image}
                      noImage={imageLocal.userImage}
                    />
                  </div>

                  <Modal
                    title="นักศึกษา"
                    centered
                    open={details}
                    onCancel={() => setDetails(false)}
                    footer={null}
                    width={1300}
                  >
                    {/* <StudentDetails data={item} path={pathImages.student} /> */}
                    <Row
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Col span={24}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 20,
                          }}
                        >
                          {item.image ? (
                            <Image
                              height={200}
                              src={pathImages.student + item.image}
                            />
                          ) : (
                            <FaRegUser size={100} />
                          )}
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 20, marginBottom: 10 }}>
                            {item.fullName}
                          </div>
                          {/* <div style={{ fontSize: 20 }}>ชื่อผู้ใช้ : {data.userName}</div> */}
                        </div>
                      </Col>
                    </Row>
                    <Tabs
                      tabPosition="left"
                      defaultActiveKey={key}
                      onChange={(e) => setkey(e)}
                      renderTabBar={renderTabBar}
                      items={items}
                      style={{ width: "100%" }}
                    />
                  </Modal>
                  {/* <Modal
                    title="นักศึกษา"
                    centered
                    open={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    footer={null}
                  >
                    <Descriptions column={2}>
                      <Descriptions.Item label="ชื่อ-นามสกุล">
                        {item?.fullName}
                      </Descriptions.Item>
                      <Descriptions.Item label="ที่อยู่">
                        {item?.address}
                      </Descriptions.Item>
                    </Descriptions>
                  </Modal> */}
                  {/* <Card
                hoverable
                cover={
                  <center>
                    <img
                      style={{
                        maxWidth: "90%",
                        marginTop: 10,
                        borderRadius: 15,
                      }}
                      src={
                        item.image
                          ? `${pathImages.student}${item.image}`
                          : "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MzctYWV3LTEzOS5qcGc.jpg"
                      }
                    />
                  </center>
                }
              >
                <div>{item.fullName}</div>
              </Card> */}
                </Col>
              );
            })}
          </Row>
        ) : (
          <div
            style={{
              height: 600,
            }}
          >
            <DataEmpty />
          </div>
        )}
      </>
    );
  };

  const tabList = [
    {
      key: "อาจารย์",
      component: (
        <PersonPage data={personnels.filter((x) => x.personnel.roleID === 2)} />
      ),
    },
    {
      key: "บุคลากร",
      component: (
        <PersonPage data={personnels.filter((x) => x.personnel.roleID === 3)} />
      ),
    },
    {
      key: "นักศึกษา",
      component: <StudentPage data={students} />,
    },
  ];

  // console.log("personnels", JSON.stringify(personnels));

  return (
    <center>
      <Tabs
        type="card"
        items={tabList.map((item, i) => {
          const id = String(i + 1);
          return {
            label: (
              <p
                style={{
                  color: "black",
                }}
              >
                {item.key}
              </p>
            ),
            key: id,
            children: item.component,
          };
        })}
      />
    </center>
  );
};

export default observer(HomePersonnelPage);
