import { Col, Row, Space, Typography, Layout } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/store";
import { dataMock } from "../store/branch.store";
import { pathImages } from "../constants/RoutePath";
import { Kru } from "../constants/Kru";
import { NavLink } from "react-router-dom";
import { RoutePath } from "./../constants/RoutePath";

const FooterAntd = Layout.Footer;

const { Title, Paragraph, Text } = Typography;

const Footer = () => {
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
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{ marginBottom: 30 }}
              >
                <Col xs={4} sm={4} md={6} lg={5} xl={6} xxl={4}>
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
                  xl={18}
                  xxl={20}
                  style={{
                    margin: "auto",
                  }}
                >
                  <div>
                    <div>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
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

              {/* <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{
                  marginTop: 10,
                }}
              >
                <Col
                  xs={16}
                  sm={12}
                  md={14}
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
              </Row> */}
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
                  style={{ marginTop: 15, marginBottom: 30 }}
                >
                  <div>
                    <div style={{ fontSize: 20, fontWeight: "bold" }}>
                      ติดต่อ {currentBranch.branchName}
                    </div>
                    <div style={{ fontSize: 18, marginTop: 20 }}>
                      <a
                        className="linkText"
                        target="_blank"
                        href={currentBranch.pageFacebook}
                      >
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
                    <div style={{ fontSize: 20, fontWeight: "bold" }}>
                      หน่วยงาน
                    </div>
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
                                  className="linkText"
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
      {/* <FooterAntd
        style={{
          textAlign: "center",
          backgroundColor: "#0F0F0F",
          color: "#ccc",
          marginBottom: -30,
          marginTop: -30,
        }}
      >
        Dev. by Mr.Kaewkwan Kraithep and Asst. Prof.Teeradet Tavarpinun
      </FooterAntd> */}
    </div>
  );
};

export default observer(Footer);

{
  /* <div
  style={{
    backgroundColor: "#0F0F0F",
    color: "white",
    padding: 30,
    marginTop: 10,
  }}
>
  <Row justify="space-evenly">
    <Col span={21}>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Col span={10}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} sm={16} md={6} lg={5} xl={4} xxl={3}>
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
              xs={24}
              sm={16}
              md={18}
              lg={19}
              xl={20}
              xxl={21}
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
              marginTop: 30,
            }}
          >
            <Col span={12}>
              <img
                src={Kru.fst}
                width="100%"
                alt="science and technology"
                style={{
                  borderRadius: 20,
                }}
              />
            </Col>
            <Col span={12}>
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
        <Col
          xs={24}
          sm={16}
          md={10}
          lg={9}
          xl={8}
          xxl={7}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
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
          span={7}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
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
</div>; */
}
