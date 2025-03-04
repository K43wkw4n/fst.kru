// import { Button, Col, DatePicker, Form, Input, Row } from "antd";
// import { observer } from "mobx-react-lite";
// import { useStore } from "../../../store/store";
// import { useLocation } from "react-router-dom";
// import dayjs from "dayjs";
// import type { DatePickerProps } from "antd";
// import moment from "moment";
// import { useState } from "react";
// import { marginHorizon } from "../../../styes/common.stye";

// type FieldType = {
//   suppliesName?: string; //ชื่อพัสดุ
//   classifier?: string; //ชื่อหน่อยของพัสดุ
//   price?: number; //ราคา
//   year?: Date;
// };

// const CreateSupplies = () => {
//   const { state } = useLocation();
//   const data = JSON.parse(state);
//   const [datePicker, setDatePicker] = useState<any>(
//     data.id === undefined ? Date : data.year
//   );

//   const { createUpdateSupplies } = useStore().suppliesStore;

//   const onSubmit = (values: any) => {
//     values.id = values.id === undefined ? data.id : 0;
//     values.year =
//       values.id === undefined
//         ? datePicker
//         : dayjs(moment(datePicker).format("YYYY/MM/DD"), "YYYY/MM/DD");

//     console.log("value: ", values);

//     createUpdateSupplies(values);
//   };

//   const onFinishFailed = (errorInfo: any) => {
//     console.log("Failed:", errorInfo);
//   };

//   console.log("date: " + data.year);

//   const onChange: DatePickerProps["onChange"] = (_, dateString) => {
//     const formattedDate = moment(dateString, "YYYY/MM/DD").format(
//       "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
//     );

//     setDatePicker(formattedDate);

//     console.log("data.year:", data.year);
//     console.log("data:", data);
//     console.log("Formatted date:", formattedDate);
//   };

//   console.log("date1: " + data.year);

//   return (
//     <Form
//       name="supplies"
//       initialValues={{
//         ...data,
//       }}
//       onFinish={onSubmit}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//       layout="vertical"
//     >
//       <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
//         เพิ่มพัสดุ
//       </div>
//       <Row style={marginHorizon}>
//         <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
//           <Form.Item<FieldType>
//             label="ชื่อพัสดุ"
//             name="suppliesName"
//             rules={[{ required: true, message: "กรุณากรอกชื่อพัสดุ" }]}
//           >
//             <Input placeholder="ชื่อพัสดุ" />
//           </Form.Item>
//         </Col>
//         <Col xs={{ span: 11, offset: 1 }} lg={{ span: 9, offset: 2 }}>
//           <Form.Item<FieldType>
//             label="หน่วยของพัสดุ"
//             name="classifier"
//             rules={[{ required: true, message: "กรุณากรอกหน่วยของพัสดุ" }]}
//           >
//             <Input placeholder="หน่วยของพัสดุ" />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row style={marginHorizon}>
//         <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
//           <Form.Item<FieldType>
//             label="ราคา"
//             name="price"
//             rules={[{ required: true, message: "กรุณากรอกราคา" }]}
//           >
//             <Input placeholder="ราคา" type="number" />
//           </Form.Item>
//         </Col>
//         <Col xs={{ span: 11, offset: 1 }} lg={{ span: 9, offset: 2 }}>
//           {/* <Form.Item<FieldType>
//             label="ปี"
//             name="year"
//             rules={[{ required: true, message: "กรุณากรอกปี" }]}
//           > */}
//           {/* <DatePicker onChange={onChange} /> */}
//           {/* <Input placeholder="ปี" /> */}
//           <DatePicker
//             // defaultValue={
//             //   (data.year
//             //     ? dayjs(moment(data.year).format("YYYY/MM/DD"), "YYYY/MM/DD")
//             //     : null) as never
//             // }
//             defaultValue={dayjs(
//               moment(datePicker).format("YYYY/MM/DD"),
//               "YYYY/MM/DD"
//             )}
//             format={"YYYY/MM/DD"}
//             onChange={onChange}
//           />
//           {/* </Form.Item> */}
//         </Col>
//       </Row>

//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default observer(CreateSupplies);
