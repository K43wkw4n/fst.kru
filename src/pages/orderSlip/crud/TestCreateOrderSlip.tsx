// import {
//     AutoComplete,
//     Button,
//     Col,
//     Form,
//     Input,
//     Row,
//     Modal,
//     Space,
//     Select,
//     SelectProps,
//     Divider,
//     Table,
//   } from "antd";
//   import { observer } from "mobx-react-lite";
//   import { marginHorizon } from "../../../styes/common.stye";
//   import { useStore } from "../../../store/store";
//   import React, { useEffect, useRef, useState } from "react";
//   import { ToastContainer, toast } from "react-toastify";
//   import "react-toastify/dist/ReactToastify.css";
//   import {
//     CloseOutlined,
//     ExclamationCircleFilled,
//     MinusOutlined,
//     PlusCircleOutlined,
//     PlusOutlined,
//   } from "@ant-design/icons";
//   import { Supplies } from "../../../models/Supplies";
//   const confirm = Modal.confirm;
  
//   type FieldType = {
//     id: number;
//     orderSlipImportantId: string; //ใบสำคัญเลขที่ (ร.001)
//     orderSlipNumber: string; //เลขที่ใบเบิก
//     petitionNumber: string; //เลขที่ฎีกา
//     year: string; //ปีเฉย ๆ (ต้องกรอกเอง)
//     storageLocation: string; //สถานที่จัดเก็บ
//     budget: any;
//   };
  
//   // interface ItemProps {
//   //   label: string;
//   //   value: string;
//   // }
  
//   // const options: ItemProps[] = [];
  
//   // for (let i = 10; i < 36; i++) {
//   //   const value = i.toString(36) + i;
//   //   options.push({
//   //     label: `Long Label: ${value}`,
//   //     value,
//   //   });
//   // }
//   import type { InputRef } from "antd";
//   import { useLocation } from "react-router-dom";
//   import moment from "moment";
  
//   const TestCreateOrderSlip = () => {
//     const { state } = useLocation();
  
//     const deta = JSON.parse(state);
  
//     const { budgets, getBudgetList, createBudget, removeBudget } =
//       useStore().budgetStore;
//     const { supplies, getSuppliesList } = useStore().suppliesStore;
//     const { createOrderSlip } = useStore().orderSlipStore;
  
//     const [onError, setOnError] = useState(false);
  
//     const [budget, setBudget] = useState<any>();
//     const [onSelect, setOnselect] = useState<any>();
  
//     const newData =
//       deta.id !== undefined &&
//       deta.orderSlipItem.map((item: any) => ({
//         id: item.supplies.id,
//         suppliesName: item.supplies.suppliesName,
//         classifier: item.supplies.classifier,
//         price: item.supplies.price,
//         year: item.supplies.year,
//         quantity: item.quantity,
//       }));
  
//     console.log("newData : ", newData);
  
//     const [data, setData] = useState<any>(deta.id !== undefined ? newData : []);
  
//     const inputRef = useRef<InputRef>(null);
  
//     const options = supplies.map((item: Supplies) => {
//       return {
//         label: item.suppliesName,
//         value: item.suppliesName,
//       };
//     });
  
//     const [modalOpen, setModalOpen] = useState(false);
  
//     console.log(
//       "deta.orderSlipItem : ",
//       deta.orderSlipItem && deta.orderSlipItem.length > 0
//         ? deta.orderSlipItem[0].supplies.suppliesName
//         : "No order slip items available"
//     );
  
//     const [suppliesList, setSuppliesList] = useState<any[]>(
//       deta.id !== undefined
//         ? deta.orderSlipItem.map((item: any) => ({
//             suppliesName: item.supplies.suppliesName,
//           }))
//         : []
//     );
  
//     console.log("suppliesList :", suppliesList);
//     console.log("data :", data);
  
//     // const [data, setData] = useState<any>([]);
  
//     //   useEffect(() => {
//     //   setData(suppliesList.length !== 0 && suppliesSelect);
//     // }, [suppliesList]);
  
//     // console.log(
//     //   "test : ",
//     //   deta.orderSlipItem.map((item: any) => {
//     //     return item.supplies;
//     //   })
//     // );
  
//     const notify = () => toast("งบประมาณไม่ถูกต้อง!");
//     const notifyFailed = () => toast("เกิดข้อผิดพลาด!");
  
//     useEffect(() => {
//       getBudgetList();
//     }, []);
  
//     var findBudget = budgets.find((item) => item.id === onSelect);
  
//     const onSubmit = (values: any) => {
//       if (findBudget) {
//         console.log("success");
//         setOnError(false);
  
//         createOrderSlip({
//           id: values.id === 0 ? 0 : deta.id,
//           orderSlipImportantId: values.orderSlipImportantId,
//           orderSlipNumber: values.orderSlipNumber,
//           petitionNumber: values.petitionNumber,
//           orderSlipStatus: values.orderSlipStatus,
//           year: values.year,
//           storageLocation: values.storageLocation,
//           budgetId: values.budgetId,
//           orderSlipItems: data.map((x: any) => {
//             return {
//               quantity: x.quantity,
//               status: 0,
//               quantityAlreadyWithdrawn: 0,
//               latestCodeWithdrawn: 0,
//               suppliesId: x.id,
//             };
//           }),
//         });
//       } else {
//         console.log("Failed");
//         setOnError(true);
//         notify();
//       }
//     };
  
//     const onFinishFailed = (errorInfo: any) => {
//       if (!findBudget) {
//         setOnError(true);
//         notifyFailed();
//       }
//       console.log("Failed:", errorInfo);
//     };
  
//     const rules = (name: string) => {
//       return [{ required: true, message: "กรุณากรอก" + name }];
//     };
  
//     //   const datafindBudget: any = [
//     //     {
//     //       id: 1,
//     //       nameTH: "ใบสำคัญเลขที่",
//     //       nameENG: "orderSlipImportantId",
//     //     },
//     //   ];
  
//     const optionsB = budgets.map((item, i) => {
//       return {
//         key: i.toString(),
//         label: (
//           <>
//             <Row
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//               }}
//             >
//               <div>{item.budgetName}</div>
//               <div>
//                 <CloseOutlined
//                   className="hoverRemove"
//                   style={{ padding: 3, borderRadius: 50 }}
//                   onClick={() => showRemoveConfirm(item.budgetName, item.id)}
//                 />
//               </div>
//             </Row>
//           </>
//         ),
//         value: item.id, // ส่งค่าที่ถูกเลือกไป
//       };
//     });
  
//     const showCreateConfirm = () => {
//       confirm({
//         title: "คุณยืนยันที่จะเพิ่มงบประมาณนี้ใช่ไหม",
//         icon: <ExclamationCircleFilled />,
//         content: "เพิ่มงบประมาณ : " + budget,
//         okText: "ใช่ เพิ่มเลย",
//         cancelText: "ไม่",
//         onOk() {
//           createBudget(budget);
//         },
//         onCancel() {
//           console.log("Cancel");
//         },
//       });
//     };
  
//     const showRemoveConfirm = (name: string, id: number) => {
//       confirm({
//         title: "คุณยืนยันที่จะลบงบประมาณนี้ใช่ไหม",
//         icon: <ExclamationCircleFilled />,
//         content: "ลบงบประมาณ : " + name,
//         okText: "ใช่ ลบเลย",
//         cancelText: "ไม่",
//         onOk() {
//           removeBudget(id);
//           setBudget(null);
//         },
//         onCancel() {
//           console.log("Cancel");
//         },
//       });
//     };
  
//     const selectProps = {
//       mode: "multiple" as const,
//       style: { width: "100%" },
//       options,
//       onChange: (newValue: any[]) => {
//         onSelectChangeSupplies(newValue);
//       },
//       placeholder: "Select Item...",
//       maxTagCount: "responsive" as const,
//       tagRender: () => {
//         return <></>;
//       },
//     };
  
//     const onSelectChange = (e: any) => {
//       setOnselect(e);
//     };
  
//     useEffect(() => {
//       if (suppliesList.length > 0) {
//         const updatedData = suppliesList.map((item: any) => {
//           const findSupplies = supplies.find(
//             (x:any) => x.suppliesName === item.suppliesName
//           );
  
//           if (findSupplies) {
//             setData(findSupplies);
//             return {
//               id: findSupplies.id,
//               suppliesName: findSupplies.suppliesName,
//               classifier: findSupplies.classifier,
//               price: findSupplies.price,
//               year: findSupplies.year,
//               quantity: 1,
//             };
//           }
  
//           return null;
//         });
//       }
//     }, [suppliesList]);
  
//     function onSelectChangeSupplies(newValue: any) {
//       setSuppliesList(newValue);
//     }
  
//     const RenderQuantity = (props: any) => {
//       console.log("props : ", props.props);
  
//       const minusQuantity = () => {
//         setData(
//           data.map((item: any) => {
//             if (item.id === props.props.id && item.quantity !== 1) {
//               return { ...item, quantity: item.quantity - 1 };
//             }
//             return item;
//           })
//         );
//       };
  
//       const plusQuantity = () => {
//         // const updatedData = data.map((item: any) => {
//         //   if (item.id === props.props.id) {
//         //     return { ...item, quantity: quantity + 1 };
//         //   }
//         //   return item;
//         // });
  
//         setData(
//           data.map((item: any) => {
//             if (item.id === props.props.id) {
//               return { ...item, quantity: item.quantity + 1 };
//             }
//             return item;
//           })
//         );
  
//         // console.log("Updated Data:", updatedData);
//         // return updatedData;
//       };
  
//       // useEffect(() => {
//       //   setSuplieSelected(updateQuantity());
//       // }, [quantity]);
  
//       return (
//         <div>
//           <Button.Group>
//             <Button
//               icon={<MinusOutlined />}
//               onClick={() => {
//                 // minusQuantity();
//               }}
//             />
//             <Input
//               value={props.props.quantity}
//               style={{
//                 maxWidth: 60,
//                 minWidth: 35,
//                 textAlign: "center",
//                 borderRadius: 0,
//               }}
//             />
//             <Button
//               icon={<PlusOutlined />}
//               onClick={() => {
//                 // plusQuantity();
//               }}
//             />
//           </Button.Group>
//         </div>
//       );
//     };
  
//     const columns: any = [
//       {
//         id: 1,
//         title: "ชื่อพัสดุ",
//         dataIndex: "suppliesName",
//         key: "suppliesName",
//         align: "center",
//       },
//       {
//         id: 2,
//         title: "ชื่อหน่อยของพัสดุ",
//         dataIndex: "classifier",
//         key: "classifier",
//         align: "center",
//       },
//       {
//         id: 3,
//         title: "ราคา",
//         dataIndex: "price",
//         key: "price",
//         align: "center",
//       },
//       {
//         id: 4,
//         title: "ปี",
//         dataIndex: "",
//         key: "year",
//         align: "center",
//         render: (e: any) => (
//           <div>{e && e.year ? moment(e.year).format("YYYY/MM/DD") : null}</div>
//         ),
//       },
//       {
//         id: 5,
//         title: "จำนวน",
//         dataIndex: "",
//         key: "quantity",
//         align: "center",
//         render: (e: any) => <RenderQuantity props={e} />,
//       },
//     ];
  
//     return (
//       <>
//         <Form
//           name="orderSlip"
//           initialValues={{
//             ...deta,
//             budget: deta.id === undefined ? null : deta.budget.id,
//           }}
//           onFinish={onSubmit}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//           layout="vertical"
//           style={{ marginBottom: 100 }}
//         >
//           <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
//             เพิ่มใบเบิก
//           </div>
  
//           <Row style={marginHorizon}>
//             {/* {datafindBudget.map((item: any) => (
//             <>
//               <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
//                 <Form.Item<FieldType>
//                   label={item.nameTH}
//                   name={item.nameENG}
//                   rules={rules(item.nameTH)}
//                 >
//                   <Input placeholder={item.nameTH} />
//                 </Form.Item>
//               </Col>
//             </>
//           ))} */}
//             <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
//               <Form.Item<FieldType>
//                 label="ใบสำคัญเลขที่"
//                 name="orderSlipImportantId"
//                 rules={rules("ใบสำคัญเลขที่")}
//               >
//                 <Input placeholder="ใบสำคัญเลขที่" />
//               </Form.Item>
//             </Col>
//             <Col xs={{ span: 11, offset: 1 }} lg={{ span: 9, offset: 2 }}>
//               <Form.Item<FieldType>
//                 label="เลขที่ใบเบิก"
//                 name="orderSlipNumber"
//                 rules={rules("เลขที่ใบเบิก")}
//               >
//                 <Input placeholder="เลขที่ใบเบิก" />
//               </Form.Item>
//             </Col>
//           </Row>
  
//           <Row style={marginHorizon}>
//             <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
//               <Form.Item<FieldType>
//                 label="เลขที่ฎีกา"
//                 name="petitionNumber"
//                 rules={rules("เลขที่ฎีกา")}
//               >
//                 <Input placeholder="เลขที่ฎีกา" />
//               </Form.Item>
//             </Col>
//             <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
//               <Form.Item<FieldType> label="ปี" name="year" rules={rules("ปี")}>
//                 <Input placeholder="ปี" />
//               </Form.Item>
//             </Col>
//           </Row>
  
//           <Row style={marginHorizon}>
//             <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
//               <Form.Item<FieldType>
//                 label="สถานที่จัดเก็บ"
//                 name="storageLocation"
//                 rules={rules("สถานที่จัดเก็บ")}
//               >
//                 <Input placeholder="สถานที่จัดเก็บ" />
//               </Form.Item>
//             </Col>
//             <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
//               <Form.Item<FieldType>
//                 label="งบประมาณ"
//                 name="budget"
//                 validateStatus={onError ? "error" : "success"}
//                 rules={rules("งบประมาณ")}
//                 help={onError ? "กรุณาเลือกงบประมาณ" : null}
//                 style={{ display: "flex", justifyItems: "space-between" }}
//               >
//                 <Select
//                   style={{ width: 300 }}
//                   placeholder="เลือกงบประมาณ"
//                   onChange={(e: any) => [onSelectChange(e), setOnError(false)]}
//                   options={optionsB}
//                   allowClear
//                   dropdownRender={(menu) => {
//                     return (
//                       <>
//                         {menu}
//                         <Divider style={{ margin: "8px 0" }} />
//                         <Space style={{ padding: "0 8px 4px" }}>
//                           <Input
//                             placeholder="กรุณากรอกงบประมาณ"
//                             ref={inputRef}
//                             defaultValue={budget}
//                             onChange={(e: any) => setBudget(e.target.value)}
//                             onKeyDown={(e) => e.stopPropagation()}
//                           />
//                           <Button
//                             type="text"
//                             icon={<PlusOutlined />}
//                             onClick={() =>
//                               budget
//                                 ? showCreateConfirm()
//                                 : alert("กรุณากรอกงบประมาณ")
//                             }
//                           >
//                             เพิ่ม
//                           </Button>
//                         </Space>
//                       </>
//                     );
//                   }}
//                 />
//                 {/* <AutoComplete
//                   style={{ width: 200, marginRight: 10 }}
//                   options={optionsB}
//                   placeholder="เลือกงบประมาณ"
//                   filterOption={(inputValue, option) =>
//                     option!.value
//                       .toUpperCase()
//                       .indexOf(inputValue.toUpperCase()) !== -1
//                   }
//                   onChange={(e: any) => setOnChange(e)}
//                   allowClear
//                 />
//                 <HappyProvider>
//                   <Button
//                     onClick={() =>
//                       onChange ? showCreateConfirm() : alert("กรุณากรอกงบประมาณ")
//                     }
//                     color="whtie"
//                   >
//                     เพิ่ม
//                   </Button>
//                 </HappyProvider> */}
//               </Form.Item>
//             </Col>
//           </Row>
  
//           <div style={{ marginTop: 10, marginBottom: 10, marginLeft: 120 }}>
//             <div>เลือกพัสดุ</div>
//             <PlusCircleOutlined
//               style={{ fontSize: 50 }}
//               onClick={() => [setModalOpen(true), getSuppliesList()]}
//             />
//           </div>
  
//           <Modal
//             title="เลือกพัสดุที่ต้องการเบิก"
//             centered
//             open={modalOpen}
//             onOk={() => setModalOpen(false)}
//             onCancel={() => {
//               setModalOpen(false);
//             }}
//             width={1000}
//           >
//             <Space direction="vertical" style={{ width: "100%" }}>
//               <Select {...selectProps} allowClear placeholder="ค้นหา" />
//               <Table
//                 columns={columns}
//                 scroll={{ x: 500, y: 250 }}
//                 dataSource={data}
//                 style={{ textAlign: "end" }}
//                 rowKey="id"
//                 pagination={false}
//               />
//             </Space>
//           </Modal>
  
//           <div>
//             {data.length !== 0 && (
//               <Table
//                 columns={columns}
//                 scroll={{ x: 250, y: 250 }}
//                 dataSource={data}
//                 style={{ textAlign: "end" }}
//                 rowKey="id"
//                 pagination={false}
//               />
//             )}
//           </div>
  
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form>
  
//         <ToastContainer position="bottom-right" />
//       </>
//     );
//   };
  
//   export default observer(TestCreateOrderSlip);
  