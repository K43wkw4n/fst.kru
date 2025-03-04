import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Image,
  Row,
  Tabs,
  theme,
} from "antd";
import { observer } from "mobx-react-lite";
import { FaRegUser } from "react-icons/fa";
import type { TabsProps } from "antd";
import StickyBox from "react-sticky-box";
import ProfileAdmin from "./components/Profile.admin";

const PersonDetails = ({ data, path }: any) => {
  console.log("data", JSON.stringify(data));

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );

  const Project = () => (
    <>
      <Descriptions>
        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
    </>
  );

  const JobHistory = () => (
    <>
      <Descriptions>
        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
    </>
  );

  const tabList = [
    {
      key: "ข้อมูลส่วนตัว",
      component: <ProfileAdmin data={data} />,
    },
    {
      key: "โครงงานวิจัย",
      component: <Project />,
    },
    {
      key: "ประวัติการทำงาน",
      component: <JobHistory />,
    },
  ];

  const items = tabList.map((item, i) => {
    const id = String(i + 1);
    return {
      label: item.key,
      key: id,
      children: item.component,
      // style: undefined,
    };
  });

  return (
    <>
      {/* <HappyProvider>
        <Button color="whtie" onClick={close}>
          กลับ
        </Button>
      </HappyProvider> */}
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
              {data?.image ? (
                <Image height={200} src={path + data?.image} />
              ) : (
                <FaRegUser size={100} />
              )}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 10 }}>
                {data.prefixName} {data.fullName}
              </div>
              {/* <div style={{ fontSize: 20 }}>ชื่อผู้ใช้ : {data.userName}</div> */}
            </div>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <ProfileAdmin data={data} />
            {/* <Tabs
              tabPosition="left"
              defaultActiveKey="1"
              renderTabBar={renderTabBar}
              items={items}
            />
             */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default observer(PersonDetails);
