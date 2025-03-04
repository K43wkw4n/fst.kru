import { HappyProvider } from "@ant-design/happy-work-theme";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { RoutePath, pathImages } from "../../../../constants/RoutePath";
import { Button, Card, Col, Empty, Row, Tag } from "antd";
import { Project as Projects } from "../../../../models/Projects";
import CardProject from "../../../../components/CardProject";
import { useEffect } from "react";
import { useStore } from "../../../../store/store";
import MyListItem from "../../../../components/MyListItem";

const { Meta } = Card;

interface props {
  checkView: boolean;
}

const Project = ({ checkView }: props) => {
  const {
    userStore: { projectUser, user },
  } = useStore();

  const renderItem = (item: Projects) => {
    return (
      <Col
        xs={24}
        sm={12}
        md={8}
        lg={6}
        xl={6}
        xxl={6}
        style={{ marginBottom: 20 }}
      >
        <NavLink to={RoutePath.viewproject} state={JSON.stringify(item)}>
          <CardProject item={item} />
        </NavLink>
      </Col>
    );
  };

  console.log("projectUser, : ", projectUser[0]?.student?.id);
  console.log("user, : ", user?.userId);
  console.log("checkView, : ", !!checkView);

  return (
    <>
      {((projectUser[0]?.student?.id !== undefined &&
        user?.userId !== undefined &&
        projectUser[0]?.student?.id === user?.userId) ||
        !!checkView) && (
        <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
          <HappyProvider>
            <NavLink
              to={RoutePath.createupdateproject}
              state={JSON.stringify([])}
            >
              <Button
                color="whtie"
                style={{
                  borderRadius: 50,
                }}
              >
                เพิ่ม
              </Button>
            </NavLink>
          </HappyProvider>
        </div>
      )}

      {projectUser.length !== 0 ? (
        <>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
            {/* <MyListItem data={projectUser} renderItem={renderItem} /> */}
            {projectUser.map((item: Projects, i: number) => {
              // console.log("item", JSON.stringify(item));

              return (
                <Col
                  key={i}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={6}
                  xxl={6}
                  style={{ marginBottom: 20 }}
                >
                  <NavLink
                    to={RoutePath.viewproject}
                    state={JSON.stringify(item)}
                  >
                    <CardProject item={item} />
                  </NavLink>
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <Empty description="ไม่มีข้อมูล" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};

export default observer(Project);
