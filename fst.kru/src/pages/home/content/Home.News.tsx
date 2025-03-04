import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Col,
  Divider,
  List,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { pathImages } from "../../../constants/RoutePath";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { RoutePath } from "./../../../constants/RoutePath";
import { NavLink } from "react-router-dom";
import { NewsM } from "../../../models/NewsM";
import InfiniteScroll from "react-infinite-scroll-component";

interface props {
  data: NewsM[];
}

const HomeNews = ({ data }: props) => {
  return (
    data.length !== 0 && (
      <>
        <div>
          <Divider />
          <div
            style={{
              borderStyle: "solid",
              borderTop: "none",
              borderRight: "none",
              borderBottom: "none",
              borderRadius: 3,
            }}
          >
            <h1 style={{ marginLeft: 10 }}>ข่าวประชาสัมพันธ์</h1>
          </div>

          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{
              marginBottom: -20,
            }}
          >
            <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={16}>
              <NavLink
                to={RoutePath.homenewsdetails}
                state={JSON.stringify(data[0])}
              >
                <img
                  width="100%"
                  style={{ borderRadius: 10 }}
                  src={pathImages.news + data[0].imageName}
                />
              </NavLink>
              <Typography>
                <div
                  style={{
                    display: "flex",
                    marginTop: 10,
                  }}
                >
                  <div>
                    <MdKeyboardDoubleArrowRight size={45} />
                  </div>
                  <div style={{ fontSize: 24 }}>
                    {data[0].title.substring(0, 58)}
                    {data[0].title.length > 150 && "..."}
                  </div>
                </div>
              </Typography>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
              <div
                id="scrollableDiv"
                style={{
                  height: 480,
                  overflow: "auto",
                  padding: "0 16px",
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                }}
              >
                <InfiniteScroll
                  next={() => null}
                  dataLength={data.length}
                  hasMore={data.length < 50}
                  loader={null}
                  // loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                  // endMessage={
                  //   <Divider plain>It is all, nothing more 🤐</Divider>
                  // }
                  scrollableTarget="scrollableDiv"
                >
                  <List
                    dataSource={data.filter((_, i) => i > 0)}
                    renderItem={(item) => (
                      <NavLink
                        to={RoutePath.homenewsdetails}
                        state={JSON.stringify(item)}
                      >
                        <Card
                          style={{
                            marginTop: 20,
                            marginBottom: 20,
                          }}
                        >
                          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                              xxl={12}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div>
                                <img
                                  width="100%"
                                  style={{ borderRadius: 10 }}
                                  src={pathImages.news + item.imageName}
                                />
                              </div>
                            </Col>
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                              xxl={12}
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ fontSize: 16 }}>
                                {item.title.substring(0, 58)}
                                {item.title.length > 150 && "..."}
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </NavLink>
                    )}
                  />
                </InfiniteScroll>
              </div>
              {/* {data.map(
                (item: any, i: number) =>
                  i !== 0 && (
                    <NavLink
                      key={i}
                      to={RoutePath.homenewsdetails}
                      state={JSON.stringify(item)}
                    >
                      <Card
                        style={{
                          marginBottom: 20,
                        }}
                      >
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                          <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            xxl={12}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div>
                              <img
                                width="100%"
                                style={{ borderRadius: 10 }}
                                src={pathImages.news + item.imageName}
                              />
                            </div>
                          </Col>
                          <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            xxl={12}
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ fontSize: 16 }}>
                              {item.title.substring(0, 58)}
                              {item.title.length > 150 && "..."}
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </NavLink>
                  )
              )} */}
            </Col>
          </Row>
        </div>

        {/* <div>
          <Divider />
          <div
            style={{
              borderStyle: "solid",
              borderTop: "none",
              borderRight: "none",
              borderBottom: "none",
              borderRadius: 3,
            }}
          >
            <h1 style={{ marginLeft: 10 }}>ข่าวประชาสัมพันธ์</h1>
          </div>
          <div>
            <Row>
              <Col
                span={13}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <NavLink
                  to={RoutePath.homenewsdetails}
                  state={JSON.stringify(data[0])}
                >
                  <img
                    width="100%"
                    style={{ borderRadius: 10 }}
                    src={pathImages.news + data[0].imageName}
                  />
                </NavLink>
              </Col>
              <Col
                span={10}
                style={{
                  marginLeft: 20,
                }}
              >
                {data.map(
                  (item: any, i: number) =>
                    i !== 0 && (
                      <NavLink
                        key={i}
                        to={RoutePath.homenewsdetails}
                        state={JSON.stringify(item)}
                      >
                        <Card
                          style={{
                            marginBottom: 20,
                          }}
                        >
                          <Row>
                            <Col
                              span={12}
                              style={{
                                height: 150,
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div>
                                <img
                                  width="100%"
                                  style={{ borderRadius: 10 }}
                                  src={pathImages.news + item.imageName}
                                />
                              </div>
                            </Col>
                            <Col
                              span={11}
                              style={{
                                marginLeft: 20,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ fontSize: 25 }}>
                                {item.title.substring(0, 85)}
                                {item.title.length > 150 && "..."}
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </NavLink>
                    )
                )}
              </Col>
            </Row>
            <Row>
              <Typography>
                <div
                  style={{
                    display: "flex",
                    marginTop: 10,
                  }}
                >
                  <div>
                    <MdKeyboardDoubleArrowRight size={50} />
                  </div>
                  <div style={{ fontSize: 30 }}>
                    {data[0].title.substring(0, 70)}
                    {data[0].title.length > 128 && "..."}
                  </div>
                </div>
              </Typography>
            </Row>
          </div>
        </div> */}
      </>
    )
  );
};

export default observer(HomeNews);
