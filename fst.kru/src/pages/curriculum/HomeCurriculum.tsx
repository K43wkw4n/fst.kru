import { Card, Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { RoutePath, pathImages } from "../../constants/RoutePath";
import { useStore } from "../../store/store";
import { useEffect } from "react";
import { dataMock } from "../../store/branch.store";
import { NavLink } from "react-router-dom";

const HomeCurriculum = () => {
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
                to={RoutePath.curriculum}
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

export default observer(HomeCurriculum);
