import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  Button,
  Col,
  Descriptions,
  Empty,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { useStore } from "../../../store/store";
import { notify, rules } from "../../../helper/components";
import { observer } from "mobx-react-lite";
import { user } from "./../../../store/user.store";
import dayjs from "dayjs";
import MyButton from "../../../components/MyButton";
import MySave from "../../../components/MySave";
import HTMLReactParser from "html-react-parser/lib/index";

const { TextArea } = Input;

const Profile = ({ data, my_account }: any) => {
  const [form] = Form.useForm();
  const {
    updateMyAccountStudent,
    getCurrentUser,
    user,
    updateMyAccountPersonnel,
    prefix,
    getPrefixAndPosition,
    position,
    generalPosition,
  } = useStore().userStore;
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getPrefixAndPosition();
  }, []);

  const setMode = () => setEditMode(!editMode);

  const onFinish = async (values: any) => {
    console.log("values", values);

    const updateMyAccount =
      user?.roleId === 0 ? updateMyAccountStudent : updateMyAccountPersonnel;

    updateMyAccount(values).then(() => {
      getCurrentUser();
      setMode();
    });
  };

  // console.log("user", JSON.stringify(user));

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const items = prefix.map((item: any) => {
    return {
      value: item.id,
      label: item.prefixName,
    };
  });

  const checkStudent = !(data.roleId === undefined || data.roleId === 0);

  const onBack = () => {
    setMode();
    form.resetFields();
  };

  const itemsPosition = position.map((item: any) => {
    return {
      value: item.id,
      label: item.positionName,
    };
  });

  const itemsGeneralPosition = generalPosition.map((item: any) => {
    return {
      value: item.id,
      label: item.generalPositionName,
    };
  });

  console.log("data", data);
  console.log("user", user?.userId);
  console.log("data.id", data.id);

  return data !== undefined ? (
    <>
      {editMode ? (
        <>
          <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
            <MyButton functionOnClick={onBack} title="กลับ" />
            {/* <HappyProvider>
              <Button
                onClick={() => {
                  setMode();
                  form.resetFields();
                }}
                color="whtie"
              >
                กลับ
              </Button>
            </HappyProvider> */}
          </div>
          <Form
            form={form}
            name="profile"
            initialValues={{
              ...data,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {!(data?.roleId === undefined || data?.roleId === 0) && (
                <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                  <Form.Item
                    label="คำนำหน้าชื่อ"
                    name="prefixId"
                    rules={[
                      { required: true, message: "กรุณากรอกคำนำหน้าชื่อ" },
                    ]}
                  >
                    <Select
                      // defaultValue="คำนำหน้าชื่อ"
                      style={{ width: "100%" }}
                      placeholder="คำนำหน้าชื่อ"
                      options={items}
                      allowClear
                    />
                  </Form.Item>
                </Col>
              )}

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={checkStudent ? 8 : 12}
                xl={checkStudent ? 8 : 12}
                xxl={checkStudent ? 8 : 12}
              >
                <Form.Item
                  label="ชื่อ-นามสกุล"
                  name="fullName"
                  rules={rules("ชื่อ-นามสกุล")}
                >
                  <Input placeholder="ชื่อ-นามสกุล" />
                </Form.Item>
              </Col>
              {data?.roleId === undefined || data?.roleId === 0 ? (
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Form.Item
                    label="ที่อยู่"
                    name="address"
                    // rules={rules("ที่อยู่")}
                  >
                    <TextArea placeholder="ที่อยู่" rows={4} />
                  </Form.Item>
                </Col>
              ) : (
                <>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="ความชำนาน"
                      name="expert"
                      // rules={rules("ความชำนาน")}
                    >
                      <Input placeholder="ความชำนาน" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="วุฒิการศึกษาสูงสุด"
                      name="lvEdu"
                      // rules={rules("วุฒิการศึกษา")}
                    >
                      <Input placeholder="วุฒิการศึกษาสูงสุด" />
                    </Form.Item>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Form.Item
                          label="ตำแหน่ง"
                          name="positionId"
                          rules={[
                            { required: true, message: "กรุณากรอกตำแหน่ง" },
                          ]}
                        >
                          <Select
                            // defaultValue="ตำแหน่ง"
                            style={{ width: "100%" }}
                            placeholder="ตำแหน่ง"
                            options={itemsPosition}
                            allowClear
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Form.Item
                          label="ตำแหน่งทั่วไป"
                          name="generalPositionId"
                          rules={[
                            {
                              required: true,
                              message: "กรุณากรอกตำแหน่งทั่วไป",
                            },
                          ]}
                        >
                          <Select
                            style={{ width: "100%" }}
                            placeholder="ตำแหน่งทั่วไป"
                            options={itemsGeneralPosition}
                            allowClear
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="รายละเอียดเพิ่มเติม"
                      name="description"
                      // rules={rules("รายละเอียดเพิ่มเติม")}
                    >
                      <TextArea
                        style={{
                          minHeight: 120,
                        }}
                        placeholder="รายละเอียดเพิ่มเติม"
                        rows={4}
                      />
                    </Form.Item>
                  </Col>
                </>
              )}
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}></Row>

            <MySave />
            {/* <HappyProvider>
              <Button htmlType="submit" color="whtie">
                บันทึก
              </Button>
            </HappyProvider> */}
          </Form>
        </>
      ) : (
        <>
          {((data?.userId &&
            user?.userId !== undefined &&
            data?.userId === user?.userId) ||
            my_account) && (
            <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
              <MyButton functionOnClick={setMode} title="แก้ไข" />
              {/* <MyButton functionEdit={setMode} /> */}
              {/* <HappyProvider>
                <Button onClick={setMode} color="whtie">
                  แก้ไข
                </Button>
              </HappyProvider> */}
            </div>
          )}

          <Descriptions>
            <Descriptions.Item label="ชื่อ-นามสกุล">
              {/* {!(user?.roleId === undefined || user?.roleId === 0) &&
                user?.prefixName} */}
              {data?.fullName}
            </Descriptions.Item>
            {my_account && (
              <Descriptions.Item label="ชื่อผู้ใช้">
                {data?.userName}
              </Descriptions.Item>
            )}

            {data?.roleId === undefined || data?.roleId === 0 ? (
              <>
                <Descriptions.Item label="ปีการศึกษา">
                  {dayjs(data?.yearEdu).format("YYYY")}
                </Descriptions.Item>
                {my_account && (
                  <>
                    <Descriptions.Item label="ที่อยู่">
                      {data?.address}
                    </Descriptions.Item>
                  </>
                )}
              </>
            ) : (
              <>
                <Descriptions.Item label="ความชํานาญ">
                  {data?.expert}
                </Descriptions.Item>
                <Descriptions.Item label="วุฒิการศึกษาสูงสุด">
                  {data?.lvEdu}
                </Descriptions.Item>

                <Descriptions.Item label="ตำแหน่ง">
                  {data?.positionName}
                </Descriptions.Item>
                <Descriptions.Item label="ตำแหน่งทั่วไป">
                  {data?.generalPositionName}
                </Descriptions.Item>

                {data?.description !== null && (
                  <Descriptions.Item label="รายละเอียดเพิ่มเติม">
                    {HTMLReactParser(data?.description)}
                  </Descriptions.Item>
                )}
              </>
            )}
          </Descriptions>
        </>
      )}
    </>
  ) : (
    <Empty description="ไม่มีข้อมูล" image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

export default observer(Profile);
