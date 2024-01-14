import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Table,
  Upload,
} from "antd";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { notify } from "../../helper/components";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import { HttpStatusCode } from "axios";
import { UploadButton } from "../../components/UploadButton";
import { pathImages } from "../../constants/RoutePath";

const confirm = Modal.confirm;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const HomeSlideShow = () => {
  const [form] = Form.useForm();
  const {
    currentBranchId,
    createUpdateSlideShow,
    slideShow,
    GetSlideShowById,
    removeSlideShow,
  } = useStore().BranchStore;

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<UploadFile[]>([]);
  const [data, setdata]: any = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [isFormInitialized, setIsFormInitialized] = useState(false);

  console.log("data ", JSON.stringify(data));

  useEffect(() => {
    if (isFormInitialized) {
      if (data.length !== 0) {
        form.setFieldsValue({
          slideShowName: data.slideShowName,
        });
      } else {
        form.setFieldsValue({
          slideShowName: "",
        });
      }
    }
    setFile([]);
  }, [data, form, isFormInitialized]);

  //console.log("branch", JSON.stringify(currentBranch.slideShow));

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFile(newFileList.slice(-1));
  };

  function showRemoveConfirm(slideName: string, id: number) {
    confirm({
      title: "คุณแน่ใจใช่ไหมที่จะลบสไลด์นี้",
      content: "ลบสไลด์ : " + slideName,
      okText: "ใช่ ลบเลย",
      okType: "danger",
      cancelText: "ไม่",
      onOk() {
        removeSlideShow(id).then(() => {
          GetSlideShowById(Number(currentBranchId));
        });
      },
      onCancel() {
        console.log("Cancel");
      },
      wrapClassName: "vertical-center-modal",
    });
  }

  const columns: any = [
    {
      id: 1,
      title: "ชื่อสไลด์",
      dataIndex: "slideShowName",
      key: "slideShowName",
      align: "center",
    },
    {
      id: 2,
      title: "รูปภาพ",
      dataIndex: "imageName",
      key: "imageName",
      align: "center",
      render: (e: any) => (
        <Image height={50} src={`${pathImages.slideShow}${e}`} />
      ),
    },
    {
      id: 3,
      title: "แก้ไข",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <HappyProvider>
          <Button
            color="whtie"
            onClick={() => {
              setOpen(true);
              setdata(e);
              setIsFormInitialized(true);
            }}
          >
            แก้ไข
          </Button>
        </HappyProvider>
      ),
      fixed: "right",
      width: 90,
    },
    {
      id: 4,
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <HappyProvider key={`delete-${e.id}`}>
          <Button
            color="whtie"
            onClick={() => showRemoveConfirm(e.slideShowName, e.id)}
          >
            ลบ
          </Button>
        </HappyProvider>
      ),
      fixed: "right",
      width: 80,
    },
  ];

  const onFinish = async (values: any) => {
    console.log("values :L ", values);
    const value = {
      id: data.id !== undefined ? data.id : 0,
      slideShowName: values.slideShowName,
      imageName: file.length === 0 ? null : file[0].originFileObj,
      branchId: Number(currentBranchId),
    };

    console.log("value :L ", value);
    if (file.length === 0 && data.length === 0) {
      notify("กรุณาใส่รูปภาพสไลด์");
    } else {
      createUpdateSlideShow(value).then((e: any) => {
        if (e.statusCode === HttpStatusCode.Ok) {
          GetSlideShowById(Number(currentBranchId));
          setOpen(false);
          setdata([]);
        }
        console.log("res :L", e);
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
        <HappyProvider>
          <Button
            color="whtie"
            onClick={() => {
              setOpen(true);
              setIsFormInitialized(true);
            }}
          >
            เพิ่ม
          </Button>
        </HappyProvider>
      </div>
      <Table
        columns={columns}
        scroll={{ x: 500, y: 500 }}
        dataSource={slideShow}
        style={{ textAlign: "end" }}
        rowKey="id"
      />
      <Modal
        title="สไลด์"
        wrapClassName="vertical-center-modal"
        open={open}
        okText="ตกลง"
        cancelText="ยกเลิก"
        onOk={() => form.submit()}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
          setdata([]);
          setIsFormInitialized(false);
        }}
        style={{
          textAlign: "center",
        }}
        width={1000}
      >
        <Form
          form={form}
          name="slideShow"
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
              margin: "40px 0",
            }}
          >
            <Row>
              <Col
                xs={{ span: 5, offset: 1 }}
                lg={{ span: 9, offset: 2 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Form.Item
                  label="ชื่อสไลด์"
                  name="slideShowName"
                  rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
                  style={{
                    width: "100%",
                  }}
                >
                  <Input placeholder="ชื่อเว็บ" />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
                {/* <ImgCrop rotationSlider> */}

                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-circle"
                  //   defaultFileList={data.logo}
                  fileList={file}
                  onChange={onChange}
                  onPreview={handlePreview}
                  multiple={true}
                  accept=".jpeg, .jpg, .png"
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
                    <img
                      src={`${pathImages.slideShow}${data.imageName}`}
                      alt="logo"
                      style={{
                        // width: 300,
                        height: 150,
                        // objectFit: "cover",
                        // borderRadius: "50%",
                      }}
                    />
                  ) : (
                    // ถ้าไม่มีรูปจากฐานข้อมูลและไม่มีรูปที่อัพโหลด
                    file.length === 0 && UploadButton
                  )}
                </Upload>
                {/* </ImgCrop> */}
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
      <Modal
        open={previewOpen}
        title={null}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default observer(HomeSlideShow);
