import { Button, Card, Col, Form, Input, Row } from "antd";
import { observer } from "mobx-react-lite";
import { notify } from "../../helper/components";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useStore } from "../../store/store";
import { HttpStatusCode } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePath, imageLocal } from "../../constants/RoutePath";

const RegisterAdmin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { register, login } = useStore().userStore;
  const { currentBranchId } = useStore().BranchStore;

  const [error, setError] = useState(false);
  const [errorConfirm, setErrorConfirm] = useState(false);
  const [password, setPassword] = useState("");

  const onFinish = (values: any) => {
    console.log("success", values);
    if (values.password.length <= 5) {
      notify("กรุณาใส่รหัสอย่างน้อย 6 ตัวอักษร!");
    } else {
      if (values.password !== values.confirmPassword) {
        notify("รหัสผ่านไม่ตรงกัน!");
        setErrorConfirm(true);
      } else {
        setErrorConfirm(false);
        register({
          userName: values.userName,
          password: values.password,
          fullName: values.fullName,
          image: null,
          expert: null,
          lvEdu: null,
          description: null,
          generalPositionID: 1,
          roleId: 1,
          prefixID: 1,
          branchId: Number(currentBranchId),
          positionId: 1,
        }).then((e: any) => {
          console.log("e", JSON.stringify(e));
          if (
            e.statusCode === HttpStatusCode.NotFound ||
            e.statusCode === HttpStatusCode.BadRequest
          ) {
            notify("มีบางอย่างผิดพลาด");
          } else if (e.statusCode === HttpStatusCode.Ok) {
            login({
              userName: values.userName,
              password: values.password,
              branchId: Number(currentBranchId),
            })
              .then((e: any) => {
                if (
                  e.statusCode === HttpStatusCode.NotFound ||
                  e.statusCode === HttpStatusCode.BadRequest
                ) {
                  notify("มีบางอย่างผิดพลาด");
                } else {
                  form.resetFields();
                  navigate(RoutePath.home);
                }
              })
              .then(() => {
                form.resetFields();
              });
          } else {
            notify(`${e}`);
          }
        });
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);

    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
    error === false && password === "" && setError(true);
  };

  const image8 = imageLocal.image8;

  return (
    <div
      style={{
        backgroundImage: `url(${image8})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 500, margin: 20 }}>
        <Form
          form={form}
          name="registeradmin"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "กรุณากรอกชื่อ-นามสกุล!" }]}
          >
            <Input placeholder="ชื่อ-นามสกุล" />
          </Form.Item>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้!" }]}
          >
            <Input placeholder="ชื่อผู้ใช้" />
          </Form.Item>
          <Form.Item
            name="password"
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
              onChange={(e) => {
                setPassword(e.target.value);
                error === true && setError(false);
              }}
              placeholder="รหัสผ่าน"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            validateStatus={errorConfirm ? "error" : "success"}
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่านให้ตรงกัน" }]}
            help={errorConfirm ? "กรุณากรอกรหัสผ่านให้ตรงกัน" : null}
          >
            <Input.Password placeholder="ยืนยันรหัสผ่าน" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            ลงทะเบียน
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default observer(RegisterAdmin);
