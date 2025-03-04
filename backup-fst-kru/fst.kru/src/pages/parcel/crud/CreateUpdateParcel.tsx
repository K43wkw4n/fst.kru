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
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useState } from "react";
import { marginHorizon } from "../../../styes/common.stye";
import "dayjs/locale/th";
import locale from "antd/lib/locale/th_TH";
import { RoutePath } from "../../../constants/RoutePath";
import { notify } from "../../../helper/components";
import MySave from "../../../components/MySave";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
// import utc from "dayjs/plugin/utc";

// dayjs.extend(utc);

const CreateUpdateParcel = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const data = JSON.parse(state);
  const { createUpdateParcel, checkAlreadyParcel } = useStore().parcelStore;
  const [form] = Form.useForm(); // Use Form.useForm() to get the form instance

  const [datePicker, setDatePicker]: any = useState<dayjs.Dayjs | null>(
    data.id === undefined
      ? dayjs(Date.now()).add(543, "year")
      : dayjs(data.year)
  );

  // console.log("data : ", data);
  // console.log("data.year : ", data.year);
  // console.log("dayjs(data.year) : ", dayjs(data.year));
  // console.log("datePicker : ", datePicker.format("DD/MM/YYYY"));

  const onFinish = (values: any) => {
    values.id = data.id !== undefined ? data.id : 0;
    if (datePicker) {
      // Format the selected date with timezone before sending it to the server
      values.year = datePicker.format();
    }
    // values.id === undefined
    //   ? datePicker?.toDate() || null
    //   : dayjs(datePicker).toDate();

    console.log("values : ", JSON.stringify(values));

    checkAlreadyParcel(values).then((res) => {
      if (res) {
        console.log("already");
        notify("มีพัสดุนี้อยู่แล้ว");
      } else {
        console.log("go to create");
        createUpdateParcel(values, navigate);
      }
    });
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
        <MyTitleAdmin name="เพิ่มพัสดุ" />
      </div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={marginHorizon}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Form.Item
            label="ชื่อพัสดุ"
            name="parcelName"
            rules={[{ required: true, message: "กรุณากรอกชื่อพัสดุ" }]}
          >
            <Input placeholder="ชื่อพัสดุ" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Form.Item
            label="หน่วยของพัสดุ"
            name="classifier"
            rules={[{ required: true, message: "กรุณากรอกหน่วยของพัสดุ" }]}
          >
            <Input placeholder="หน่วยของพัสดุ" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={marginHorizon}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Form.Item
            label="ราคา"
            name="price"
            rules={[{ required: true, message: "กรุณากรอกราคา" }]}
          >
            <Input placeholder="ราคา" type="number" />
          </Form.Item>
        </Col>
        {/* <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Form.Item
            label="ปี"
            name="year"
            rules={[{ required: true, message: "กรุณากรอกปี" }]}
          >
            <ConfigProvider locale={locale}>
              <DatePicker
                // format="DD/MM/YYYY"
                picker="year"
                onChange={onChange}
                defaultValue={datePicker}
                allowClear={false}
              />
            </ConfigProvider>
          </Form.Item>
        </Col> */}
      </Row>

      <div style={{ marginBottom: 20 }}>
        <MySave />
      </div>
      {/* <Button type="primary" htmlType="submit" style={{ marginBottom: 20 }}>
        Submit
      </Button> */}
    </Form>
  );
};

export default observer(CreateUpdateParcel);
