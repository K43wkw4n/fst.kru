import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../store/store";
import { Col, Row, Space, Typography } from "antd";
import { Kru } from "../../constants/Kru";
import { dataMock } from "../../store/branch.store";
import { RoutePath, pathImages } from "../../constants/RoutePath";
import { NavLink } from "react-router-dom";
const { Title, Paragraph, Text } = Typography;

const FooterTest = () => {
  const { currentBranch, branch, setCurrentBranch } = useStore().BranchStore;

  return (
    <div
      style={{
        backgroundColor: "#0F0F0F",
        color: "white",
        padding: "30px 0",
      }}
    >
      <Row justify="space-evenly">
        <Col span={21}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} sm={24} md={14} lg={14} xl={9} xxl={10}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col xs={4} sm={4} md={6} lg={5} xl={5} xxl={4}>
                  <img
                    src={
                      currentBranch.id !== 0
                        ? currentBranch.logo === null
                          ? dataMock.logo
                          : pathImages.branch + currentBranch.logo
                        : currentBranch.logo
                    }
                    width="100%"
                    alt="logo"
                  />
                </Col>
                <Col
                  xs={20}
                  sm={20}
                  md={18}
                  lg={19}
                  xl={19}
                  xxl={20}
                  style={{
                    margin: "auto",
                  }}
                >
                  <div>
                    <div>
                      <Text style={{ fontSize: 20, color: "white" }}>
                        {currentBranch.branchName}
                      </Text>
                    </div>
                    <div>
                      <Text style={{ fontSize: 15, color: "white" }}>
                        {Kru.name}
                      </Text>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{
                  marginTop: 10,
                }}
              >
                <Col
                  xs={16}
                  sm={14}
                  md={18}
                  lg={12}
                  xl={14}
                  xxl={12}
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <img
                    src={Kru.fst}
                    width="100%"
                    alt="science and technology"
                    style={{
                      borderRadius: 20,
                    }}
                  />
                </Col>
                <Col xs={24} sm={14} md={24} lg={12} xl={10} xxl={12}>
                  <div
                    style={{
                      fontSize: 18,
                    }}
                  >
                    <div>คณะวิทยาศาสตร์ และ เทคโนโลยี</div>
                    <div>โทร. {Kru.phone}</div>
                    <div>
                      <a target="_blank" href={currentBranch.pageFacebook}>
                        Facebook Page
                      </a>
                    </div>
                    <div>
                      <Row>
                        <div
                          style={{
                            fontSize: 18,
                            width: 250,
                          }}
                        >
                          {Kru.address}
                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col xs={24} sm={24} md={10} lg={10} xl={15} xxl={14}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={14}
                  xxl={12}
                  style={{ marginTop: 15 }}
                >
                  <div>
                    <div style={{ fontSize: 20 }}>
                      ติดต่อ {currentBranch.branchName}
                    </div>
                    <div style={{ fontSize: 18, marginTop: 20 }}>
                      <a target="_blank" href={currentBranch.pageFacebook}>
                        Facebook Page
                      </a>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={10}
                  xxl={12}
                  style={{ marginTop: 15 }}
                >
                  <div>
                    <div style={{ fontSize: 20 }}>หน่วยงาน</div>
                    <div style={{ fontSize: 15 }}>
                      {branch.map(
                        (item, i) =>
                          i < 6 && (
                            <Space.Compact
                              block
                              style={{
                                margin: "25px 0",
                              }}
                              key={i}
                            >
                              <div style={{ cursor: "pointer" }}>
                                <NavLink
                                  to={RoutePath.home}
                                  onClick={() => {
                                    setCurrentBranch(item.id);
                                  }}
                                >
                                  {item.branchName}
                                </NavLink>
                              </div>
                            </Space.Compact>
                          )
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default observer(FooterTest);
