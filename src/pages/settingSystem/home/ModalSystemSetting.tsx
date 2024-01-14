// import { Col, Divider, Form, Input, Modal, Row } from "antd";
// import React, { useEffect, useState } from "react";
// import { notify } from "../../../helper/components";
// import { PlusOutlined, UserOutlined } from "@ant-design/icons";
// import { Upload } from "antd";
// import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
// // import ImgCrop from "antd-img-crop";
// import { useStore } from "../../../store/store";
// import { HttpStatusCode } from "axios";
// import { observer } from "mobx-react-lite";

// const ModalSystemSetting = ({ data, open, close }: any) => {
//   const [form] = Form.useForm();
//   const {
//     currentBranchId,
//     createUpdateSystemSettings,
//     GetSystemSettingByBranch,
//   } = useStore().BranchStore;

//   console.log("data", JSON.stringify(data));

//   const [file, setFile] = useState<UploadFile[]>([]);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage]: any = useState("");
 
//   console.log("file ", file);

//   const onFinish = async (values: any) => {
//     const value = {
//       id: data.id === undefined ? 0 : data.id,
//       webName: values.webName,
//       logo: file.length === 0 ? null : file[0].originFileObj,
//       pageFacebook: values.pageFacebook,
//       branchId: Number(currentBranchId),
//     };

//     await createUpdateSystemSettings(value).then((e: any) => {
//       if (e.statusCode === HttpStatusCode.Ok) {
//         close(!true);
//         GetSystemSettingByBranch(Number(currentBranchId));
//         console.log("e succss", e);
//       }
//       console.log("e ", e);
//     });
//   };

//   const onFinishFailed = (errorInfo: any) => {
//     console.log("Failed:", errorInfo);
//     notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
//   };

//   const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
//     setFile(newFileList.slice(-1));
//   };

//   const onPreview = async (file: UploadFile) => {
//     let src = file.url as string;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj as RcFile);
//         reader.onload = () => resolve(reader.result as string);
//       });
//     }
//     setPreviewImage(src);
//     setPreviewOpen(true);
//   };

//   const handleCancel = () => setPreviewOpen(false);

//   return (
//     <Modal
//       title="จัดการระบบ"
//       wrapClassName="vertical-center-modal"
//       open={open}
//       okText="ตกลง"
//       cancelText="ยกเลิก"
//       onOk={() => form.submit()}
//       onCancel={() => {
//         close(!true);
//         window.location.reload();
//       }}
//       style={{
//         textAlign: "center",
//       }}
//       width={1000}
//     >
//       <Form
//         form={form}
//         name="systemSetting"
//         initialValues={{
//           ...data,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//         layout="vertical"
//       >
//         <div
//           style={{
//             marginTop: 40,
//           }}
//         >
//           <Row>
//             <Col
//               xs={{ span: 5, offset: 1 }}
//               lg={{ span: 9, offset: 2 }}
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Form.Item
//                 label="ชื่อเว็บ"
//                 name="webName"
//                 rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
//                 style={{
//                   width: "100%",
//                 }}
//               >
//                 <Input placeholder="ชื่อเว็บ" />
//               </Form.Item>
//             </Col>

//             <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
//               {/* <ImgCrop rotationSlider> */}

//               <Upload
//                 action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
//                 listType="picture-circle"
//                 defaultFileList={data.logo}
//                 fileList={file}
//                 onChange={onChange}
//                 onPreview={onPreview}
//                 accept=".jpeg, .jpg, .png"
//                 // itemRender={(e) => (
//                 //   <div
//                 //     style={{
//                 //       width: 160,
//                 //     }}
//                 //   >
//                 //     {e}
//                 //   </div>
//                 // )}
//               >
//                 {file.length === 0 && data.id !== 0 ? (
//                   // ถ้าไม่มีรูปที่อัพโหลดและมีรูปจากฐานข้อมูล
//                   <img
//                     src={`https://localhost:7203/systemsetting/${data.logo}`}
//                     alt="logo"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       borderRadius: "50%",
//                     }}
//                   />
//                 ) : (
//                   // ถ้าไม่มีรูปจากฐานข้อมูลและไม่มีรูปที่อัพโหลด
//                   file.length === 0 && <PlusOutlined />
//                 )}
//               </Upload>
//               {/* </ImgCrop> */}
//               <Modal
//                 open={previewOpen}
//                 footer={null}
//                 onCancel={handleCancel}
//                 closeIcon={false}
//               >
//                 {previewImage && (
//                   <img
//                     alt="logo"
//                     style={{ width: "100%" }}
//                     src={previewImage}
//                   />
//                 )}
//               </Modal>
//             </Col>
//           </Row>

//           <Row>
//             <Col
//               xs={{ span: 5, offset: 1 }}
//               lg={{ span: 9, offset: 2 }}
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Form.Item
//                 label="ลิ้งเพจเฟสบุ๊ค"
//                 name="pageFacebook"
//                 rules={[{ required: true, message: "กรุณากรอก" }]}
//                 style={{
//                   width: "100%",
//                 }}
//               >
//                 <Input placeholder="ลิ้งเพจเฟสบุ๊ค" />
//               </Form.Item>
//             </Col>
//           </Row>
//         </div>
//       </Form>
//     </Modal>
//   );
// };

// export default observer(ModalSystemSetting);
