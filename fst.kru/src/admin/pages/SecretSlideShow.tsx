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
import MyUpload from "../../components/MyUpload";
import MyTitleAdmin from "../../components/MyTitleAdmin";
import MyRemovePop from "../../components/MyRemovePop";
import MyButton from "../../components/MyButton";
import { TitlePath } from "../../constants/TitlePath";

const confirm = Modal.confirm;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const SecretSlideShow = () => {
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

  // const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
  //   const modifiedFileList = newFileList.map((file) => {
  //     if (file.status === "uploading") {
  //       // ทำการอัพโหลดไฟล์ จะไม่มี status ในขณะที่อัพโหลด ดังนั้นให้ตั้งค่า status เป็น 'uploading'
  //       return { ...file, status: "uploading" };
  //     } else {
  //       // ทำการอัพโหลดสำเร็จ กำหนดค่า status เป็น 'done' และอัพเดท response และ linkProps ตามที่ต้องการ
  //       return {
  //         ...file,
  //         status: "done",
  //         response: '{"status": "success"}',
  //         linkProps: '{"download": "image"}',
  //       };
  //     }
  //   });

  //   setFile(modifiedFileList.slice(-1));
  // };

  const columns: any = [
    {
      id: 1,
      title: "ชื่อรูปภาพ",
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
        <Image
          height={100}
          style={{ borderRadius: 10 }}
          src={`${pathImages.slideShow}${e}`}
        />
      ),
    },
    {
      id: 3,
      title: "แก้ไข",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <MyButton
          functionOnClick={() => {
            setOpen(true);
            setdata(e);
            setIsFormInitialized(true);
          }}
          title="แก้ไข"
        />
        // <HappyProvider>
        //   <Button
        //     color="whtie"
        //     onClick={() => {
        //       setOpen(true);
        //       setdata(e);
        //       setIsFormInitialized(true);
        //     }}
        //   >
        //     แก้ไข
        //   </Button>
        // </HappyProvider>
      ),
      width: 90,
    },
    {
      id: 4,
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <MyRemovePop
          functionRemove={() =>
            removeSlideShow(e.id).then(() => {
              GetSlideShowById(Number(currentBranchId));
            })
          }
        />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Button
        //     color="whtie"
        //     onClick={() => showRemoveConfirm(e.slideShowName, e.id)}
        //   >
        //     ลบ
        //   </Button>
        // </HappyProvider>
      ),
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
      notify("กรุณาใส่รูปภาพ");
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

  // const handlePreview = async (file: UploadFile) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj as RcFile);
  //   }

  //   setPreviewImage(file.url || (file.preview as string));
  //   setPreviewOpen(true);
  // };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 10 }}
      >
        <MyTitleAdmin name={TitlePath.slideShow} />
        <MyButton
          functionOnClick={() => {
            setOpen(true);
            setIsFormInitialized(true);
          }}
          title="เพิ่ม"
        />

        {/* <HappyProvider>
          <Button
            color="whtie"
            onClick={() => {
              setOpen(true);
              setIsFormInitialized(true);
            }}
          >
            เพิ่ม
          </Button>
        </HappyProvider> */}
      </div>

      <Table
        columns={columns}
        scroll={{ x: 800, y: 500 }}
        dataSource={slideShow}
        style={{ textAlign: "end" }}
        rowKey="id"
      />
      <Modal
        title="รูปภาพหน้าเว็บ"
        wrapClassName="vertical-center-modal"
        open={open}
        okText="บันทึก"
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
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}
              style={{ justifyContent: "center" }}
            >
              <Col span={24}>
                <Row
                  style={{
                    marginBottom: 20,
                    justifyContent: "center",
                  }}
                >
                  <MyUpload
                    data={data}
                    imageName={data.imageName}
                    file={file}
                    setFile={setFile}
                    prefixPath={pathImages.slideShow}
                  />
                </Row>
                <Row>
                  <Form.Item
                    label="ชื่อรูปภาพ"
                    name="slideShowName"
                    rules={[{ required: true, message: "กรุณากรอกชื่อรูปภาพ" }]}
                    style={{
                      width: "100%",
                    }}
                  >
                    <Input placeholder="ชื่อรูปภาพ" />
                  </Form.Item>
                </Row>
              </Col>

              {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}> */}
              {/* <ImgCrop rotationSlider> */}

              {/* </ImgCrop> */}
              {/* </Col> */}
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

export default observer(SecretSlideShow);
