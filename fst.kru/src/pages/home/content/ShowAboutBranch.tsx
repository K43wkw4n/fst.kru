import { Col, Row } from "antd";
import React from "react";
import { Kru } from "../../../constants/Kru";
import icon from "../../../assets/images/KRU.png";
import { useStore } from "../../../store/store";

const ShowAboutBranch = () => {
  const { currentBranch } = useStore().BranchStore;

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col xs={24} sm={24} md={24} lg={20} xl={16} xxl={16}>
        <div
          style={{
            alignContent: "center",
          }}
        >
          <div className="card">
            <div className="card__left">
              <div
                className="card__content"
                style={{
                  marginTop: -30,
                }}
              >
                {/* <div className="center-text">
                    A text <br />
                    was written
                    <br />
                    here
                  </div> */}
                <div>
                  <div className="card__content__icon">
                    <img src={icon} />
                  </div>
                </div>
                <div className="center-text">
                  <small>
                    {currentBranch.branchName} <br />
                    {Kru.name} <br />
                  </small>
                </div>
              </div>
            </div>
            <div className="card__right">
              <div className="card__content">
                <div>
                  <div className="card__content__icon align-top">
                    <img src={icon} />
                  </div>
                  <div>
                    <h2 style={{ color: "white" }}>
                      {currentBranch.branchName}
                    </h2>
                  </div>
                  {currentBranch.id !== 1 ? (
                    <div style={{ marginLeft: 10 }}>
                      <b>ประเภทหลักสุตร : </b>
                      {currentBranch.categoryBranch}
                      <br />
                      <br />
                      <b>ประเภท : </b>
                      {currentBranch.categoryMajor}
                    </div>
                  ) : (
                    <div>
                      <br />
                      <br />
                      <br />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ShowAboutBranch;
