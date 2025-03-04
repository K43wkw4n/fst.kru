import React, { useEffect, useState } from "react";
import { DataEmpty } from "../../../components/DataEmpty";
import {
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
import { useStore } from "../../../store/store";
import { observer } from "mobx-react-lite";
import { JobHistoryM } from "../../../models/JobHistory";
import MyCard from "../../person/components/MyCard";
import { pathImages } from "../../../constants/RoutePath";
import userImage from "../../../assets/images/userImage.webp";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { formatDateThai, thaiDateOptions } from "../../../helper/components";
import dayjs from "dayjs";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import { TitlePath } from "../../../constants/TitlePath";
import { useLocation } from "react-router-dom";

const JobHistoriesPage = () => {
  const { state } = useLocation();

  const {
    BranchStore: { currentBranchId },
    userStore: {
      loading,
      jobHistoryDropdown,
      getJobHistoryDDByBranchByGroup,
      jobHistory,
      getJobHistoriesByName,
      getJobHistoryByBranchByGroupAll,
      getJobHistoryByBranch,
    },
  } = useStore();

  const allValues = {
    value: 0,
    label: "ทั้งหมด",
  };

  const [value, setValue] = useState<any>(allValues);

  const branchId = Number(state) || Number(currentBranchId);

  useEffect(() => {
    getJobHistoryDDByBranchByGroup(branchId);

    branchId === 1
      ? getJobHistoryByBranchByGroupAll(branchId)
      : getJobHistoryByBranch(branchId);

    window.scrollTo(0, 0);
  }, []);

  const items = jobHistoryDropdown.map((item) => {
    return {
      value: item.key,
      label: item.key,
    };
  });

  console.log("value", value);
  console.log("jobHistory", JSON.stringify(jobHistory));

  const ViewJobHistory: React.FC<{ data: JobHistoryM[] }> = ({ data }) => {
    return (
      <>
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
            style={{ marginLeft: 20, marginRight: 20 }}
          >
            {data.map((item: any, i) => {
              // console.log("item", JSON.stringify(item));
              const [details, setDetails] = useState(false);

              const date: any = dayjs(item?.startJob).add(0, "year");

              const thaiStartDate: any = new Intl.DateTimeFormat(
                "th-TH",
                thaiDateOptions
              ).format(date);

              console.log("item", JSON.stringify(item.length));

              return value?.value !== 0 || item.length === undefined ? (
                <Col
                  key={i}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={4}
                  xxl={3}
                  className="gutter-row"
                  style={{
                    marginBottom: 20,
                    marginTop: 20,
                  }}
                >
                  <div
                    onClick={() => {
                      setDetails(true);
                    }}
                  >
                    <MyCard
                      name={item?.fullName}
                      path={pathImages.student}
                      image={item?.image}
                      noImage={userImage}
                    />
                  </div>

                  <Modal
                    title="ประวัติการทำงานของนักศึกษา"
                    centered
                    open={details}
                    onCancel={() => setDetails(false)}
                    footer={null}
                    width={1000}
                  >
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
                          {item.image ? (
                            <Image
                              height={200}
                              src={pathImages.student + item.image}
                            />
                          ) : (
                            <FaRegUser size={100} />
                          )}
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 20, marginBottom: 10 }}>
                            {item.fullName}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Card
                      hoverable
                      key={item.id}
                      style={{
                        margin: "20px 0",
                      }}
                    >
                      <Row>
                        <div
                          style={{
                            marginRight: 5,
                            position: "relative",
                            top: 2,
                          }}
                        >
                          <MdOutlineAccessTime />
                        </div>
                        <div>{formatDateThai(item.createdAt)}</div>
                      </Row>

                      <Descriptions title={item?.jobName}>
                        <Descriptions.Item label="ชื่อบริษัท">
                          {item?.company}
                        </Descriptions.Item>
                        <Descriptions.Item label="ตำแหน่ง">
                          {item?.position}
                        </Descriptions.Item>
                        <Descriptions.Item label="วันที่เริ่มทำงาน">
                          {thaiStartDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="รายละเอียดเพิ่มเติม">
                          {item.description}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Modal>
                </Col>
              ) : (
                <div key={i} style={{ width: "100%" }}>
                  <MyTitleAdmin name={item[0].jobName} />
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {item?.map((item: any) => (
                      <Col
                        key={item?.id}
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        xl={4}
                        xxl={3}
                        className="gutter-row"
                        style={{
                          marginBottom: 20,
                          marginTop: 20,
                        }}
                      >
                        <div
                          onClick={() => {
                            setDetails(true);
                          }}
                        >
                          <MyCard
                            name={item?.fullName}
                            path={pathImages.student}
                            image={item?.image}
                            noImage={userImage}
                          />
                        </div>

                        <Modal
                          title="ประวัติการทำงานของนักศึกษา"
                          centered
                          open={details}
                          onCancel={() => setDetails(false)}
                          footer={null}
                          width={1000}
                        >
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
                                {item?.image ? (
                                  <Image
                                    height={200}
                                    src={pathImages.student + item?.image}
                                  />
                                ) : (
                                  <FaRegUser size={100} />
                                )}
                              </div>
                              <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 20, marginBottom: 10 }}>
                                  {item?.fullName}
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Card
                            hoverable
                            style={{
                              margin: "20px 0",
                            }}
                          >
                            <Row>
                              <div
                                style={{
                                  marginRight: 5,
                                  position: "relative",
                                  top: 2,
                                }}
                              >
                                <MdOutlineAccessTime />
                              </div>
                              <div>
                                {formatDateThai(item?.createdAt, "", 0)}
                              </div>
                            </Row>

                            <Descriptions title={item?.jobName}>
                              <Descriptions.Item label="ชื่อบริษัท">
                                {item?.company}
                              </Descriptions.Item>
                              <Descriptions.Item label="ตำแหน่ง">
                                {item?.position}
                              </Descriptions.Item>
                              <Descriptions.Item label="วันที่เริ่มทำงาน">
                                {thaiStartDate}
                              </Descriptions.Item>
                              <Descriptions.Item label="รายละเอียดเพิ่มเติม">
                                {item?.description}
                              </Descriptions.Item>
                            </Descriptions>
                          </Card>
                        </Modal>
                      </Col>
                    ))}
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
      </>
    );
  };

  return (
    <Card
      style={{
        marginTop: 25,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <MyTitleAdmin name={TitlePath.jobHistory} />
      </div>
      <Row>
        <Select
          defaultValue={[allValues]}
          placeholder="ทั้งหมด"
          options={[allValues, ...items]}
          style={{ minWidth: 250, marginBottom: 20 }}
          // allowClear
          value={value}
          onChange={(e) => {
            const find = jobHistoryDropdown.find((x) => x.key === e);

            if (find === undefined) {
              setValue(allValues);
            } else {
              setValue({
                value: find?.key,
                label: find?.key,
              });
            }
          }}
          onSelect={(e) => {
            if (e === 0) {
              branchId === 1
                ? getJobHistoryByBranchByGroupAll(branchId)
                : getJobHistoryByBranch(branchId);
            } else {
              getJobHistoriesByName(e);
            }
          }}
        />
      </Row>

      <ViewJobHistory data={jobHistory} />
    </Card>
  );
};

export default observer(JobHistoriesPage);
