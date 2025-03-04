import { observer } from "mobx-react-lite";
import React from "react";
import { Project } from "../../../models/Projects";
import { NavLink, useLocation } from "react-router-dom";
import { Button, Card, Col, Divider, Empty, Image, List, Row } from "antd";
import { RoutePath, pathImages } from "../../../constants/RoutePath";
import { FaChrome, FaRegUser } from "react-icons/fa";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { VscGithub } from "react-icons/vsc";
import { Consultant } from "../../../models/Consultant";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { useStore } from "../../../store/store";
import HTMLReactParser from "html-react-parser";
import { MdOutlineAccessTime } from "react-icons/md";
import { formatDateThai } from "../../../helper/components";

const ViewProject = () => {
  const { state } = useLocation();
  const { user } = useStore().userStore;
  // console.log("state :L11", state);

  const data: Project = JSON.parse(state);

  console.log("data", data);

  return (
    <>
      {data.student?.id === user?.userId && (
        <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
          <HappyProvider>
            <NavLink to={RoutePath.createupdateproject} state={state}>
              <Button color="whtie" style={{ borderRadius: 50 }}>
                แก้ไข
              </Button>
            </NavLink>
          </HappyProvider>
        </div>
      )}

      <Card>
        <Row>
          <div
            style={{
              marginRight: 5,
              position: "relative",
              top: 2,
            }}
          >
            <MdOutlineAccessTime />
          </div>
          <div>{formatDateThai(data.createdAt)}</div>
        </Row>
        <Row>
          <Col span={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
              <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
                <h1>{data.nameTH}</h1>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={4}
                xl={4}
                xxl={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>
                  <a
                    href={pathImages.uploadPDF + data?.pdf}
                    target="_blank"
                    style={{
                      padding: 15,
                      color: "white",
                      backgroundColor: "#6aad6a",
                      borderRadius: 50,
                      fontSize: 20,
                    }}
                  >
                    {/* <LuFileDown /> */}
                    เอกสาร
                  </a>
                </div>
              </Col>
            </Row>
            <div>
              <h3>{data.nameEN}</h3>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Image
                style={{
                  borderRadius: 10,
                  maxHeight: 300,
                }}
                src={`${pathImages.project}${data.image}`}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}
              style={{
                marginTop: 20,
              }}
            >
              <Col>
                <Card size="small">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginRight: 10 }}>
                      {data?.student?.image ? (
                        <Image
                          height={30}
                          width={30}
                          style={{ borderRadius: 100 }}
                          src={pathImages.student + data?.student?.image}
                        />
                      ) : (
                        <FaRegUser size={25} />
                      )}
                    </div>
                    <div>
                      <div>{data?.student?.fullName}</div>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={24}
                xl={14}
                xxl={14}
                style={{ display: "flex", alignItems: "start", marginTop: 10 }}
              >
                {data.webUrl && (
                  <Button
                    style={{
                      marginLeft: 20,
                      backgroundColor: "rgb(85, 172, 238)",
                      color: "white",
                    }}
                    icon={<FaChrome />}
                    href={data.webUrl}
                    target="_blank"
                  >
                    Web
                  </Button>
                )}
                {data.youtubeUrl && (
                  <Button
                    style={{
                      marginLeft: 20,
                      backgroundColor: "rgb(205, 32, 31)",
                      color: "white",
                    }}
                    icon={<PiYoutubeLogoLight />}
                    href={data.youtubeUrl}
                    target="_blank"
                  >
                    Youtube
                  </Button>
                )}
                {data.githubUrl && (
                  <Button
                    style={{
                      marginLeft: 20,
                      backgroundColor: "black",
                      color: "white",
                    }}
                    icon={<VscGithub />}
                    href={data.githubUrl}
                    target="_blank"
                  >
                    Github
                  </Button>
                )}
              </Col>
            </Row>
            <Divider />
            <Row>
              <List
                size="small"
                header={
                  <div
                    style={{
                      padding: "10px 0",
                    }}
                  >
                    เกี่ยวข้อง
                  </div>
                }
                style={{
                  width: "100%",
                }}
                bordered
                dataSource={JSON.parse(data.keyWords)}
                renderItem={(item: any) => <List.Item>{item}</List.Item>}
                locale={{
                  emptyText: (
                    <Empty
                      description="ไม่มีข้อมูล"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  ),
                }}
              />
            </Row>
          </Col>
        </Row>
        <Divider />
        <Row
          style={{
            marginTop: 20,
          }}
        >
          <List
            header={
              <div
                style={{
                  padding: "10px 0",
                }}
              >
                รายละเอียด
              </div>
            }
            bordered
            style={{ width: "100%" }}
            dataSource={[data.description]}
            renderItem={(item: any) => (
              <List.Item>{HTMLReactParser(item)}</List.Item>
            )}
            locale={{
              emptyText: (
                <Empty
                  description="ไม่มีข้อมูล"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ),
            }}
          />
        </Row>
        <Divider orientation="left">อาจารย์ที่ปรึกษา</Divider>
        <Row
          style={{
            marginTop: 20,
          }}
        >
          {data?.consultants?.map((item: Consultant, i: number) => {
            return (
              <Col
                key={i}
                style={{
                  marginRight: 20,
                  marginBottom: 20,
                }}
              >
                <Card size="small">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginRight: 10 }}>
                      {item.personnel.image ? (
                        <Image
                          height={30}
                          width={30}
                          style={{ borderRadius: 100 }}
                          src={pathImages.personnel + item.personnel.image}
                        />
                      ) : (
                        <FaRegUser size={25} />
                      )}
                    </div>
                    <div>
                      <div>{item.personnel.fullName}</div>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>
    </>
  );
};

export default observer(ViewProject);
