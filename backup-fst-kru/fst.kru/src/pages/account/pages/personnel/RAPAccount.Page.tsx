import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../../../store/store";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { NavLink } from "react-router-dom";
import { Button, Card, Col, Empty, Row } from "antd";
import { RAP } from "../../../../models/RAP";
import { RoutePath, pathImages } from "../../../../constants/RoutePath";
import CardResearch from "../../../../components/CardResearch";

const { Meta } = Card;

interface props {
  checkView: boolean;
}

const RAPAccountPage = ({ checkView }: props) => {
  const {
    ResearchAndProjectStore: { RAPUser },
    userStore: { user },
  } = useStore();

  // console.log("RAPUser", JSON.stringify(RAPUser[0].personnel.id));
  // console.log("user", JSON.stringify(user));

  useEffect(() => {}, []);

  return (
    <>
      {(RAPUser[0]?.personnel.id === user?.userId || !checkView) && (
        <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
          <HappyProvider>
            <NavLink
              to={RoutePath.createupdateresearch}
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

      {RAPUser.length !== 0 ? (
        <>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
            {RAPUser.map((item: RAP, i: number) => (
              <Col
                key={i}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={4}
                xxl={3}
                style={{ marginBottom: 20 }}
              >
                <NavLink
                  to={RoutePath.viewresearchandproject}
                  state={JSON.stringify(item)}
                >
                  <CardResearch item={item} />
                </NavLink>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Empty description="ไม่มีข้อมูล" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};

export default observer(RAPAccountPage);
