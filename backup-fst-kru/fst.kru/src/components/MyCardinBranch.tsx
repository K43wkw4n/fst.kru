import React, { useEffect } from "react";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
import { Card, Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import { pathImages } from "../constants/RoutePath";
import { dataMock } from "../store/branch.store";

const MyCardinBranch = ({ goTo }: any) => {
  const { branch, getBranchs } = useStore().BranchStore;

  useEffect(() => {
    getBranchs();

    window.scrollTo(0, 0);
  }, []);

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {branch.map(
        (item) =>
          item.id !== 1 && (
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <NavLink
                to={goTo}
                state={item.id}
                className="nav-item animate__animated animate__fadeInDown"
                style={{
                  textDecoration: "none",
                  color: "gray",
                  fontWeight: "unset",
                }}
              >
                <Card
                  hoverable
                  style={{
                    textAlign: "center",
                  }}
                >
                  <center>
                    <img
                      style={{
                        height: 300,
                        borderRadius: 15,
                      }}
                      src={
                        item.logo
                          ? pathImages.branch + item.logo
                          : dataMock.logo
                      }
                    />
                    <h2>{item.branchName}</h2>
                  </center>
                </Card>
              </NavLink>
            </Col>
          )
      )}
    </Row>
  );
};

export default observer(MyCardinBranch);
