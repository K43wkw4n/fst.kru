import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Row,
} from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { useState } from "react";
import { marginHorizon } from "../../../styes/common.stye";
import "dayjs/locale/th";
import locale from "antd/lib/locale/th_TH";
// import utc from "dayjs/plugin/utc";

// dayjs.extend(utc);

const CreateUpdateParcel = () => {
  const { state } = useLocation();
  const data = JSON.parse(state);
  const { createUpdateParcel } = useStore().parcelStore;
  const [form] = Form.useForm(); // Use Form.useForm() to get the form instance

  const [datePicker, setDatePicker]: any = useState<dayjs.Dayjs | null>(
    data.id === undefined
      ? dayjs(Date.now()).add(543, "year")
      : dayjs(data.year)
  );

  // console.log("data : ", data);
  // console.log("data.year : ", data.year);
  // console.log("dayjs(data.year) : ", dayjs(data.year));
  console.log("datePicker : ", datePicker.format("DD/MM/YYYY"));

  const onFinish = (values: any) => {
    values.id = values.id === undefined ? data.id : 0;
    if (datePicker) {
      // Format the selected date with timezone before sending it to the server
      values.year = datePicker.format();
    }
    values.quantity = data.quantity;
    // values.id === undefined
    //   ? datePicker?.toDate() || null
    //   : dayjs(datePicker).toDate();

    console.log("values : ", values);

    createUpdateParcel(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (selectedDate: dayjs.Dayjs | null) => {
    console.log("datePicker selected : ", selectedDate);
    setDatePicker(selectedDate);
  };

  return (
    <Form
      form={form} // Use the form instance
      name="supplies"
      initialValues={{
        ...data,
        year: data.year
          ? dayjs(data.year).format("DD/MM/YYYY")
          : dayjs(Date.now()).add(543, "year"),
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        เพิ่มพัสดุ
      </div>
      <Row style={marginHorizon}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
          <Form.Item
            label="ชื่อพัสดุ"
            name="parcelName"
            rules={[{ required: true, message: "กรุณากรอกชื่อพัสดุ" }]}
          >
            <Input placeholder="ชื่อพัสดุ" />
          </Form.Item>
        </Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 9, offset: 2 }}>
          <Form.Item
            label="หน่วยของพัสดุ"
            name="classifier"
            rules={[{ required: true, message: "กรุณากรอกหน่วยของพัสดุ" }]}
          >
            <Input placeholder="หน่วยของพัสดุ" />
          </Form.Item>
        </Col>
      </Row>
      <Row style={marginHorizon}>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
          <Form.Item
            label="ราคา"
            name="price"
            rules={[{ required: true, message: "กรุณากรอกราคา" }]}
          >
            <Input placeholder="ราคา" type="number" />
          </Form.Item>
        </Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 9, offset: 2 }}>
          <Form.Item
            label="ปีงบประมาณ"
            name="year"
            rules={[{ required: true, message: "กรุณากรอกปีงบประมาณ" }]}
          >
            <ConfigProvider locale={locale}>
              <DatePicker
                format="DD/MM/YYYY"
                onChange={onChange}
                defaultValue={datePicker}
                allowClear={false}
              />
            </ConfigProvider>
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default observer(CreateUpdateParcel);
