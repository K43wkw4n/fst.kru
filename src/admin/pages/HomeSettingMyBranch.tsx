import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { HttpStatusCode } from "axios";
import { notify } from "../../helper/components";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { Col, Upload, Form, Input, Modal, Row, Button } from "antd";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { RoutePath, pathImages } from "../../constants/RoutePath";
import { UploadButton } from "../../components/UploadButton";
import { dataMock } from "../../store/branch.store";

const confirm = Modal.confirm;

const HomeSettingMyBranch = () => {
  const [form] = Form.useForm();
  const { currentBranchId, currentBranch, getBranchById, createUpdateBranch } =
    useStore().BranchStore;

  const data: any = currentBranch;

  console.log("data.logo :L", data.logo);

  const [file, setFile] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage]: any = useState("");

  useEffect(() => {
    getBranchById(Number(currentBranchId));
  }, [currentBranchId]);

  useEffect(() => {
    if (data.id !== undefined) {
      form.setFieldsValue({
        branchName: data.branchName,
        pageFacebook: data.pageFacebook,

        categoryBranch: data.categoryBranch === null ? "" : data.categoryBranch,
        categoryMajor: data.categoryMajor === null ? "" : data.categoryMajor,
        text: data.text,
      });
    }
  }, [data, form]);

  const onFinish = async (values: any) => {
    const value = {
      id: data.id === undefined ? 0 : data.id,
      branchName: values.branchName,
      logo: file.length === 0 ? null : file[0].originFileObj,
      pageFacebook: values.pageFacebook,

      categoryBranch: values.categoryBranch,
      CategoryMajor: values.categoryMajor,
      text: values.text,
    };

    console.log("value :L ", value);

    await createUpdateBranch(value).then((e: any) => {
      if (e.statusCode === HttpStatusCode.Ok) {
        getBranchById(Number(currentBranchId));
        console.log("e succss", e);
      } else {
        notify("มีบางอย่างผิดพลาด");
      }
      console.log("e ", e);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFile(newFileList.slice(-1));
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    setPreviewImage(src);
    setPreviewOpen(true);
  };

  const handleCancel = () => setPreviewOpen(false);

  function showCreateConfirm() {
    confirm({
      title: "คุณแน่ใจใช่ไหมที่จะเพิ่ม!",
      content: "",
      okText: "ใช่ เพิ่มเลย",
      okType: "dashed",
      cancelText: "ไม่",
      onOk() {
        form.submit();
      },
      onCancel() {
        console.log("Cancel");
      },
      wrapClassName: "vertical-center-modal",
    });
  }

  console.log("data LK", JSON.stringify(data));

  return (
    <Form
      form={form}
      name="branch"
      initialValues={{
        ...data,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <div
        style={{
          marginTop: 40,
        }}
      >
        <Row>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
            <Row>
              <Form.Item
                label="ชื่อเว็บ"
                name="branchName"
                rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
                style={{
                  width: "100%",
                }}
              >
                <Input placeholder="ชื่อเว็บ" />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                label="ลิ้งเพจเฟสบุ๊ค"
                name="pageFacebook"
                rules={[{ required: true, message: "กรุณากรอก" }]}
                style={{
                  width: "100%",
                }}
              >
                <Input placeholder="ลิ้งเพจเฟสบุ๊ค" />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                label="ประเภทหลักสูตร"
                name="categoryBranch"
                // rules={[{ required: true, message: "กรุณากรอก" }]}
                style={{
                  width: "100%",
                }}
              >
                <Input placeholder="ประเภทหลักสูตร" />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                label="ประเภทสาขาวิชา"
                name="categoryMajor"
                // rules={[{ required: true, message: "กรุณากรอก" }]}
                style={{
                  width: "100%",
                }}
              >
                <Input placeholder="ประเภทสาขาวิชา" />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                label="คำอธิบาย"
                name="text"
                rules={[{ required: true, message: "กรุณากรอก" }]}
                style={{
                  width: "100%",
                }}
              >
                <Input placeholder="คำอธิบาย" />
              </Form.Item>
            </Row>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
            <Row>
              {/* <ImgCrop rotationSlider> */}
              <div>
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-circle"
                  defaultFileList={data.logo}
                  fileList={file}
                  onChange={onChange}
                  onPreview={onPreview}
                  accept=".jpeg, .jpg, .png"
                  // showUploadList={false}
                  // itemRender={(e) => (
                  //   <div
                  //     style={{
                  //       width: 160,
                  //     }}
                  //   >
                  //     {e}
                  //   </div>
                  // )}
                >
                  {file.length === 0 && data.length !== 0 ? (
                    // ถ้าไม่มีรูปที่อัพโหลดและมีรูปจากฐานข้อมูล
                    <div>
                      <img
                        src={
                          data.id === 0
                            ? dataMock.logo
                            : data.logo === null
                            ? dataMock.logo
                            : `${pathImages.branch}${data.logo}`
                        }
                        alt="logo"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  ) : (
                    // ถ้าไม่มีรูปจากฐานข้อมูลและไม่มีรูปที่อัพโหลด
                    file.length === 0 && UploadButton
                  )}
                </Upload>
              </div>
              {/* <div
                style={{
                  fontSize: 20,
                }}
              >
                <LeftOutlined /> เพิ่มรูปภาพ
              </div> */}

              {/* </ImgCrop> */}
              <Modal
                open={previewOpen}
                footer={null}
                onCancel={handleCancel}
                closeIcon={false}
              >
                {previewImage && (
                  <img
                    alt="logo"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                )}
              </Modal>
            </Row>
            <Row>
              {data.logo !== null && (
                // ถ้าไม่มีรูปที่อัพโหลดและมีรูปจากฐานข้อมูล
                <div>
                  <img
                    src={
                      data.id === 0
                        ? dataMock.logo
                        : data.logo === null
                        ? dataMock.logo
                        : `${pathImages.branch}${data.logo}`
                    }
                    alt="logo"
                    style={{
                      marginTop: 20,
                      // width: 400,
                      height: 350,
                      // objectFit: "cover",
                      // borderRadius: "50%",
                    }}
                  />
                </div>
              )}
            </Row>
          </Col>
        </Row>

        <HappyProvider>
          <Button color="whtie" onClick={showCreateConfirm}>
            ตกลง
          </Button>
        </HappyProvider>
      </div>
    </Form>
  );
};
export default observer(HomeSettingMyBranch);
