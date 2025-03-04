import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  Image,
  List,
  Row,
} from "antd";
import { observer } from "mobx-react-lite";
import { NavLink, useLocation } from "react-router-dom";
import { RAP } from "../../../models/RAP";
import { FaRegUser } from "react-icons/fa";
import { useStore } from "../../../store/store";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { RoutePath, pathImages } from "../../../constants/RoutePath";
import dayjs from "dayjs";
import { formatDateThai } from "../../../helper/components";
import HTMLReactParser from "html-react-parser/lib/index";
import { MdOutlineAccessTime } from "react-icons/md";

const ViewRAP = () => {
  const { state } = useLocation();
  const { user } = useStore().userStore;
  // console.log("state :L11", state);

  const data: RAP = JSON.parse(state);

  return (
    <>
      {data.personnelId === user?.userId && (
        <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
          <HappyProvider>
            <NavLink to={RoutePath.createupdateresearch} state={state}>
              <Button color="whtie">แก้ไข</Button>
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

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
          <Col span={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
              <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
                <h1>{data.name}</h1>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <div>
                  <a
                    href={pathImages.researchPDF + data.pdf}
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
          </Col>
        </Row>
        <Divider />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                src={pathImages.research + data.image}
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}
              style={{ marginTop: 20 }}
            >
              <Col
                className="gutter-row"
                // xs={24}
                // sm={24}
                // md={24}
                // lg={12}
                // xl={12}
                // xxl={12}
              >
                <Card
                  size="small"
                  // style={{ backgroundColor: "#F3F8FF" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginRight: 10 }}>
                      {data.image ? (
                        <Image
                          height={30}
                          width={30}
                          style={{ borderRadius: 100 }}
                          src={pathImages?.personnel + data?.personnel?.image}
                        />
                      ) : (
                        <FaRegUser size={25} />
                      )}
                    </div>
                    <div>
                      <div>
                        {data?.personnel?.prefixes.prefixName}
                        {data?.personnel?.fullName}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Divider />

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
              <Descriptions>
                <Descriptions.Item label="ปีของงานวิจัย">
                  {dayjs(data?.year).format("YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="จำนวนงบประมาณรวม">
                  {data?.budgetAmount.toLocaleString()} บาท
                </Descriptions.Item>
                <Descriptions.Item label="ความเชี่ยวชาญ">
                  {data?.expertise}
                </Descriptions.Item>
                <Descriptions.Item label="ประเภทงบประมาณ">
                  {data?.budget?.budgetName}
                </Descriptions.Item>
                <Descriptions.Item label="ประเภท">
                  {data?.category?.name}
                </Descriptions.Item>
              </Descriptions>
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
            renderItem={(item: any) => <p>{HTMLReactParser(item)}</p>}
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
                ผู้ร่วมวิจัย
              </div>
            }
            style={{
              width: "100%",
            }}
            bordered
            dataSource={JSON.parse(data.participant)}
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
      </Card>
    </>
  );
};

export default observer(ViewRAP);
