import { Col, Form, Input, Row } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";

const InputCurriculum = ({ data }: any) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} name="curriculum" initialValues={{ ...data }}>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Form.Item
                label="หัวข้อ"
                name="name"
                rules={[{ required: true, message: "กรุณากรอกหัวข้อ" }]}
                style={{
                  width: "100%",
                }}
              >
                <Input size="small" placeholder="หัวข้อ" />
              </Form.Item>
              {/* 
              {data.subGeneralTopics.map(() => (
                <Form.Item
                  label="หัวข้อย่อย"
                  name="subName"
                  rules={[{ required: true, message: "กรุณากรอกหัวข้อย่อย" }]}
                  style={{
                    width: "100%",
                  }}
                >
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginTop: 20,
                    }}
                  >
                    <Col span={18}>
                      <Input size="small" placeholder="หัวข้อย่อย" />
                    </Col>
                  </Row>
                </Form.Item>
              ))} */}
            </Col>
          </Row>
          {/* <Collapse size="small" accordion items={itemsGeneralTopics} /> */}
        </Col>
        <Col span={12}></Col>
      </Row>
    </Form>
  );
};

export default observer(InputCurriculum);
