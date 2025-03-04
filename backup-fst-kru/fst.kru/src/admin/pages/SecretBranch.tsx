import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Switch,
  Upload,
} from "antd";
import { observer } from "mobx-react-lite";
import DataTable from "../../components/DataTable";
import { useStore } from "../../store/store";
import { pathImages } from "../../constants/RoutePath";
import { dataMock } from "../../store/branch.store";
import { useEffect, useState } from "react";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { ShowRemoveConfirm, notify } from "../../helper/components";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { UploadButton } from "../../components/UploadButton";
import { HttpStatusCode } from "axios";
import MyRemovePop from "../../components/MyRemovePop";
import MyButton from "../../components/MyButton";

const SecretBranch = () => {
  const [form] = Form.useForm();
  const {
    branch,
    getBranchs,
    currentBranchId,
    createUpdateBranch,
    getCurrentBranch,
    getBranchById,
    removeBranch,
  } = useStore().BranchStore;

  const [open, setOpen] = useState(false);

  const [data, setdata]: any = useState([]);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  const columns: any = [
    {
      id: 1,
      title: "หน่วยงาน",
      dataIndex: "branchName",
      key: "branchName",
      align: "center",
    },
    {
      id: 2,
      title: "รูปภาพ",
      dataIndex: "logo",
      key: "logo",
      align: "center",
      render: (e: any) => (
        <Image
          style={{ height: 50 }}
          src={e === null ? dataMock.logo : `${pathImages.branch}${e}`}
        />
      ),
    },
    {
      id: 3,
      title: "ประเภทหลักสูตร",
      dataIndex: "categoryBranch",
      key: "categoryBranch",
      align: "center",
    },
    {
      id: 4,
      title: "ประเภทสาขา",
      dataIndex: "categoryMajor",
      key: "categoryMajor",
      align: "center",
    },
    {
      id: 5,
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
      id: 6,
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <MyRemovePop
          functionRemove={() => e.id !== 1 && removeBranch(e.id)}
          disabled={e.id === 1 || Number(currentBranchId) !== 1}
          titleTooltip={1}
        />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Button
        //     color="whtie"
        //     onClick={() =>
        //       e.id !== 1 &&
        //       ShowRemoveConfirm("หน่วยงาน", e.branchName, e.id, removeBranch)
        //     }
        //     disabled={e.id === 1 || Number(currentBranchId) !== 1}
        //   >
        //     ลบ
        //   </Button>
        // </HappyProvider>
      ),
      width: 80,
    },
  ];

  const [file, setFile] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage]: any = useState("");

  useEffect(() => {
    getBranchs();
  }, [currentBranchId]);

  useEffect(() => {
    if (isFormInitialized) {
      if (data.length !== 0) {
        form.setFieldsValue({
          branchName: data.branchName,
          pageFacebook: data.pageFacebook,
          categoryBranch: data.categoryBranch,
          categoryMajor: data.categoryMajor,
          text: data.text,
        });
      } else {
        form.setFieldsValue({
          branchName: "",
          pageFacebook: "",
          categoryBranch: "",
          categoryMajor: "",
          text: "",
        });
      }
    }
    setFile([]);
  }, [data, form, isFormInitialized]);

  const onFinish = async (values: any) => {
    const value = {
      id: data.id === undefined ? 0 : data.id,
      branchName: values.branchName,
      logo: file.length === 0 ? null : file[0].originFileObj,
      pageFacebook: values.pageFacebook,

      categoryBranch: values.categoryBranch,
      CategoryMajor: values.categoryMajor,
      text: values.text || null,
    };

    console.log("value :L ", value);

    await createUpdateBranch(value).then((e: any) => {
      console.log("e ", e);
      if (e.statusCode === HttpStatusCode.Ok) {
        setOpen(false);
        setdata([]);

        getBranchs();
        getCurrentBranch();
        getBranchById(Number(currentBranchId));

        console.log("e succss", e);
      } else {
        notify("มีบางอย่างผิดพลาด");
      }
      // console.log("e ", e);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const modifiedFileList: any = newFileList.map((file) => {
      if (file.status === "uploading") {
        // ทำการอัพโหลดไฟล์ จะไม่มี status ในขณะที่อัพโหลด ดังนั้นให้ตั้งค่า status เป็น 'uploading'
        return { ...file, status: "uploading" };
      } else {
        // ทำการอัพโหลดสำเร็จ กำหนดค่า status เป็น 'done' และอัพเดท response และ linkProps ตามที่ต้องการ
        return {
          ...file,
          status: "done",
          response: '{"status": "success"}',
          linkProps: '{"download": "image"}',
        };
      }
    });

    setFile(modifiedFileList.slice(-1));
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

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 10 }}
      >
        <div>
          <h1 style={{ color: "gray" }}>ตั้งค่าหน่วยงานภายใต้คณะ</h1>
        </div>

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
      <DataTable data={branch} columns={columns} sizeX={1300} />
      <Modal
        title="หน่วยงาน"
        wrapClassName="vertical-center-modal"
        open={open}
        okText="บันทึก"
        cancelText="ยกเลิก"
        onOk={() => form.submit()}
        style={{
          textAlign: "center",
        }}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
          setdata([]);
          setIsFormInitialized(false);
        }}
        // style={{
        //   textAlign: "center",
        // }}
        width={1000}
      >
        <Form
          form={form}
          name="branch"
          initialValues={{
            ...data,
            imageName: file,
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
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}
              style={{ justifyContent: "center" }}
            >
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Row
                  style={{
                    marginBottom: 20,
                    justifyContent: "center",
                  }}
                >
                  {/* <ImgCrop rotationSlider> */}
                  <div>
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-circle"
                      // defaultFileList={data.logo}
                      fileList={file}
                      onChange={onChange}
                      onPreview={onPreview}
                      accept=".jpeg, .jpg, .png"
                      // showUploadList={false}
                    >
                      {file.length === 0 && data.length !== 0 ? (
                        // ถ้าไม่มีรูปที่อัพโหลดและมีรูปจากฐานข้อมูล
                        <div>
                          <img
                            src={
                              data.logo === null
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
                    rules={[
                      { required: true, message: "กรุณากรอกประเภทหลักสูตร" },
                    ]}
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
                    rules={[
                      { required: true, message: "กรุณากรอกประเภทสาขาวิชา" },
                    ]}
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
                    // rules={[{ required: true, message: "กรุณากรอก" }]}
                    style={{
                      width: "100%",
                    }}
                  >
                    <Input placeholder="คำอธิบาย" />
                  </Form.Item>
                </Row>
              </Col>

              {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}> */}

              {/* <Row>
                  {file.length === 0 && data.length !== 0 && (
                    // ถ้าไม่มีรูปที่อัพโหลดและมีรูปจากฐานข้อมูล
                    <div>
                      <img
                        src={
                          data.logo === null
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
                </Row> */}
              {/* </Col> */}
            </Row>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default observer(SecretBranch);
