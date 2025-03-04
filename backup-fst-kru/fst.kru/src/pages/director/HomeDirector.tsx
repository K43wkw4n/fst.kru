import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { AnnualDirectorM, DirectorType } from "../../models/AnnualDirectorM";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Image,
  Modal,
  Row,
  Select,
  Skeleton,
} from "antd";
import { DataEmpty } from "../../components/DataEmpty";
import MyCard from "../person/components/MyCard";
import { pathImages } from "../../constants/RoutePath";
import userImage from "../../assets/images/userImage.webp";
import dayjs from "dayjs";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { FaRegUser } from "react-icons/fa";
import MyTitleAdmin from "../../components/MyTitleAdmin";
import HTMLReactParser from "html-react-parser/lib/index";

const HomeDirector = () => {
  const {
    annualDirectorStore: {
      loading,
      directorType,
      getDirectorType,
      getDirectorTypeById,
    },
  } = useStore();

  useEffect(() => {
    getDirectorType();

    window.scrollTo(0, 0);
  }, []);

  const [data, setData] = useState([]);
  const [value, setValue] = useState<any>();
  const [open, setOpen] = useState<boolean>(true);

  const items = directorType
    .filter((x) => x.annualDirectors.length)
    .map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });

  const DirectorTypePage: React.FC<{ data: any }> = ({ data }) => {
    return (
      <div style={{ minHeight: 600 }}>
        <Row>
          <div onClick={() => setOpen(true)}>
            <Select
              // defaultValue="ทั้งหมด"
              placeholder="เลือกชุดคณะกรรมการ"
              options={items}
              style={{ minWidth: 250, marginBottom: 20 }}
              // allowClear
              value={value}
              onChange={(e) => {
                const find = directorType.find((x) => x.id === parseInt(e));

                setValue({
                  value: find?.id,
                  label: find?.name,
                });
              }}
              onSelect={(e: string) => {
                getDirectorTypeById(parseInt(e)).then((res: any) => {
                  setData(res);
                  setOpen(false);
                });
              }}
              open={open}
            />
          </div>
        </Row>

        {loading ? (
          <div
            style={{
              height: 600,
            }}
          >
            <Skeleton active />
          </div>
        ) : data.length !== 0 ? (
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{
              marginLeft: 20,
              marginRight: 20,
              textAlign: "center",
            }}
          >
            {data.map((items: AnnualDirectorM[], i: number) => {
              return (
                <div
                  key={i}
                  style={{
                    width: "100%",
                  }}
                >
                  <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{
                      justifyContent: "space-around",
                    }}
                  >
                    {items.map((item) => {
                      const [modalOpen, setModalOpen] = useState(false);

                      return (
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={6}
                          xl={4}
                          xxl={4}
                          key={item.id}
                          style={{
                            marginTop: 20,
                            marginBottom: 20,
                          }}
                        >
                          <div onClick={() => setModalOpen(true)}>
                            <MyCard
                              name={item.director.fullName}
                              path={pathImages.director}
                              image={item.director.imageName}
                              noImage={userImage}
                            />
                            <div>
                              <h3 style={{ color: "gray" }}>
                                {item?.director?.position?.positionName}
                              </h3>
                            </div>
                          </div>

                          <Modal
                            title={value.label}
                            centered
                            open={modalOpen}
                            onCancel={() => setModalOpen(false)}
                            footer={null}
                            width={700}
                          >
                            <div style={{ margin: "20px 30px" }}>
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
                                    {item.director?.imageName ? (
                                      <Image
                                        height={200}
                                        src={
                                          pathImages.director +
                                          item?.director?.imageName
                                        }
                                      />
                                    ) : (
                                      <FaRegUser size={100} />
                                    )}
                                  </div>
                                  <div style={{ textAlign: "center" }}>
                                    <div
                                      style={{
                                        fontSize: 20,
                                        marginBottom: 10,
                                      }}
                                    >
                                      {item.director.fullName}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <Divider />
                              <Row>
                                <Col
                                  span={24}
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Descriptions>
                                    <Descriptions.Item label="ชื่อ">
                                      {item.director.fullName}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="ตำแหน่ง">
                                      {item.director.position.positionName}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="ปีที่แต่งตั้ง">
                                      {dayjs(item.year).format("YYYY")}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="คำสั่งแต่งตั้ง">
                                      <HappyProvider>
                                        <Button
                                          color="whtie"
                                          href={
                                            pathImages.annualDirectorPDF +
                                            item.pdf
                                          }
                                          target="_blank"
                                          style={{
                                            top: -5,
                                            width: 100,
                                            borderRadius: 50,
                                          }}
                                          disabled={item.pdf === null}
                                        >
                                          pdf
                                        </Button>
                                      </HappyProvider>
                                    </Descriptions.Item>
                                  </Descriptions>
                                </Col>
                              </Row>
                              <Row>
                                <Descriptions>
                                  <Descriptions.Item label="รายระเอียดเพิ่มเติม">
                                    {HTMLReactParser(item.director.description)}
                                  </Descriptions.Item>
                                </Descriptions>
                              </Row>
                            </div>
                          </Modal>
                        </Col>
                      );
                    })}
                  </Row>
                  <br />
                  <Divider />
                </div>
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
      </div>
    );
  };

  return (
    <Card
      style={{
        marginTop: 25,
      }}
    >
      <DirectorTypePage data={data} />
    </Card>
  );
};

export default observer(HomeDirector);
