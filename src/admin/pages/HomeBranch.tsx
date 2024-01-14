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

const HomeBranch = () => {
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

  console.log("data.logo :L", data.logo);

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
      title: "รายละเอียด",
      dataIndex: "logo",
      key: "logo",
      align: "center",
      render: (e: any) => {
        return (
          <Image
            style={{ height: 50 }}
            src={e === null ? dataMock.logo : `${pathImages.branch}${e}`}
          />
        );
      },
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
      id: 6,
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <HappyProvider key={`delete-${e.id}`}>
          <Button
            color="whtie"
            onClick={() =>
              e.id !== 1 &&
              ShowRemoveConfirm("หน่วยงาน", e.branchName, e.id, removeBranch)
            }
            disabled={e.id === 1 || Number(currentBranchId) !== 1}
          >
            ลบ
          </Button>
        </HappyProvider>
      ),
      fixed: "right",
      width: 80,
    },
  ];

  const [file, setFile] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage]: any = useState("");

  console.log("file :L", file);

  useEffect(() => {
    getBranchs();
  }, [currentBranchId]);

  useEffect(() => {
    if (data.id !== undefined) {
    }
    if (isFormInitialized) {
      if (data.length !== 0) {
        form.setFieldsValue({
          branchName: data.branchName,
          pageFacebook: data.pageFacebook,

          categoryBranch:
            data.categoryBranch === null ? "" : data.categoryBranch,
          categoryMajor: data.categoryMajor === null ? "" : data.categoryMajor,
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
      text: values.text,
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
      <DataTable data={branch} columns={columns} sizeX={800} />
      <Modal
        title="หน่วยงาน"
        wrapClassName="vertical-center-modal"
        open={open}
        okText="ตกลง"
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
                            src={`${pathImages.branch}${data.logo}`}
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
                  {file.length === 0 && data.length !== 0 && (
                    // ถ้าไม่มีรูปที่อัพโหลดและมีรูปจากฐานข้อมูล
                    <div>
                      <img
                        src={`${pathImages.branch}${data.logo}`}
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
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default observer(HomeBranch);
