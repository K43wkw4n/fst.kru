import { useState } from "react";
import { notify, rules } from "../../../helper/components";
import { HttpStatusCode } from "axios";
import { Button, Col, Form, Input, Row } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { useStore } from "../../../store/store";
import { observer } from "mobx-react-lite";
import MySave from "../../../components/MySave";

const Password = ({ data }: any) => {
  const [form] = Form.useForm();
  const { changePassword }: any = useStore().userStore;

  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const onFinish = async (values: any) => {
    console.log("values", values);

    const formData = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    if (values.newPassword.length <= 5) {
      notify("กรุณาใส่รหัสอย่างน้อย 6 ตัวอักษร");
    } else {
      changePassword(formData).then((res: any) => {
        console.log("res :LL", JSON.stringify(res));
        if (res.statusCode === HttpStatusCode.BadRequest) {
          notify("รหัสผ่านผิด");
        } else if (res.statusCode === HttpStatusCode.Ok) {
          notify("เปลี่ยนรหัสผ่านสำเร็จแล้ว");
          form.resetFields();
        }
      });
    }
    console.log("formData", formData);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");

    error === false && password === "" && setError(true);
  };

  return (
    <>
      <Form
        form={form}
        name="project"
        initialValues={{
          ...data,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="รหัสผ่านเดิม"
              name="oldPassword"
              rules={rules("รหัสผ่านเดิม")}
            >
              <Input.Password
                placeholder="รหัสผ่านเดิม"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="รหัสผ่านใหม่"
              name="newPassword"
              validateStatus={
                error
                  ? "error"
                  : password.length <= 5 && password.length > 0
                  ? "error"
                  : "success"
              }
              rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
              help={
                error
                  ? "กรุณากรอกรหัสผ่าน"
                  : password.length <= 5 && password.length > 0
                  ? "อย่างน้อย 6 ตัวอักษร"
                  : null
              }
            >
              <Input.Password
                placeholder="รหัสผ่านใหม่"
                onChange={(e) => {
                  setPassword(e.target.value);
                  error === true && setError(false);
                }}
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <MySave />
        {/* <HappyProvider>
          <Button htmlType="submit" color="whtie">
            บันทึก
          </Button>
        </HappyProvider> */}
      </Form>
    </>
  );
};

export default observer(Password);
