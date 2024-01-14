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
import { useEffect, useRef, useState } from "react";
import { useStore } from "../../store/store";
import type { UploadFile } from "antd/es/upload/interface";
import moment from "moment";
import { ShowRemoveConfirm, notify } from "../../helper/components";
import { PlusOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import type { RcFile, UploadProps } from "antd/es/upload";
import { UploadButton } from "../../components/UploadButton";
import { HttpStatusCode } from "axios";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const HomeNews = () => {
  const [form] = Form.useForm();
  const {
    currentBranchId,
    news,
    getNewsById,
    isUsedNews,
    createUpdateNews,
    removeNewsPhoto,
    removeNews,
  } = useStore().BranchStore;

  const editor: any = useRef(null);

  const [open, setOpen] = useState(false);

  const [file, setFile] = useState<UploadFile[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [data, setdata]: any = useState([]);
  const [body, setBody]: any = useState([]);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [idRemove, setIdRemove]: any = useState([]);

  console.log("data :L", data);
  console.log("fileList :L", fileList);

  useEffect(() => {
    getNewsById(Number(currentBranchId));
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (data.length !== 0) {
        const formattedFileList = data?.newsPhotos?.map((photo: any) => ({
          uid: photo.id,
          name: photo.url,
          status: "done",
          url: `https://localhost:7203/newsPhotos/${photo.url}`,
        }));
        console.log("formattedFileList :L", formattedFileList);
        setFileList(formattedFileList);

        form.setFieldsValue({
          title: data.title,
          body: data.body,
        });
      } else {
        setFileList([]);
        form.setFieldsValue({
          title: "",
          body: "",
        });
      }
    }
    setFile([]);
    setIdRemove([]);
  }, [data, form, isFormInitialized]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFile(newFileList.slice(-1));
  };

  const columns: any = [
    {
      id: 1,
      title: "หัวข้อ",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      id: 2,
      title: "รายละเอียด",
      dataIndex: "imageName",
      key: "imageName",
      align: "center",
      render: (e: any) => (
        <Image height={50} src={`https://localhost:7203/news/${e}`} />
      ),
    },
    {
      id: 3,
      title: "สร้างเมื่อ",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (e: any) => <div>{moment(e.createdAt).format("DD/MM/YYYY")}</div>,
    },
    {
      id: 4,
      title: "แสดง",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <Switch
          checkedChildren="แสดง"
          unCheckedChildren="ซ่อน"
          defaultChecked={!!e.isUsed}
          onClick={() => isUsedNews(e.id)}
        />
      ),
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
              ShowRemoveConfirm("ประชาสัมพันธ์", e.title, e.id, removeNews)
            }
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
      title: values.title,
      imageName: file.length === 0 ? null : file[0].originFileObj,
      body: values.body,
      branchId: Number(currentBranchId),
    };

    console.log("fileList :L ", fileList);

    if (
      (file.length === 0 && data.length === 0) ||
      (fileList.length === 0 && data.length === 0)
    ) {
      notify("กรุณาใส่รูปภาพสไลด์");
    } else {
      createUpdateNews(value, fileList.length === 0 ? null : fileList).then(
        (e: any) => {
          idRemove.map((i: number) => removeNewsPhoto(i));

          // if (e.statusCode === HttpStatusCode.Ok) {
          getNewsById(Number(currentBranchId));
          setOpen(false);
          setdata([]);
          // }
          console.log("res :L", e);
        }
      );
    }

    console.log("value :L ", value);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleCancel = () => setPreviewOpen(false);

  console.log("idRemove :L", idRemove);

  const handleRemove = (id: number) => {
    setIdRemove([...idRemove, id]);
  };

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
      <DataTable data={news} columns={columns} sizeX={800} />
      <Modal
        title="ประชาสัมพันธ์"
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
          name="slideShow"
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
              margin: "40px 0",
            }}
          >
            <Row>
              <Col span={24}>
                <Form.Item
                  label="หัวเรื่อง"
                  name="title"
                  rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
                  style={{
                    width: "100%",
                  }}
                >
                  <Input placeholder="หัวเรื่อง" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col
                span={24}
                style={{
                  textAlign: "start",
                }}
              >
                <Form.Item
                  label="เนื้อหา"
                  name="body"
                  rules={
                    body === ""
                      ? [{ required: true, message: "กรุณากรอกเนื้อหา" }]
                      : undefined
                  }
                >
                  <JoditEditor
                    ref={editor}
                    value={body}
                    onChange={(newBody) => {
                      setBody(newBody);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col
                span={5}
                style={{
                  borderRight: "5px solid #f0f0f0",
                  marginRight: 30,
                }}
              >
                <Form.Item
                  label="รูปภาพ"
                  name=""
                  rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      marginTop: 40,
                    }}
                  >
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      //   defaultFileList={data.logo}
                      fileList={file}
                      onChange={onChange}
                      accept=".jpeg, .jpg, .png"
                    >
                      {file.length === 0 && data.length !== 0 ? (
                        <img
                          src={`https://localhost:7203/news/${data.imageName}`}
                          alt="logo"
                          style={{
                            width: 500,
                            // height: "100%",
                            // objectFit: "cover",
                            // borderRadius: "50%",
                          }}
                        />
                      ) : (
                        file.length === 0 && UploadButton
                      )}
                    </Upload>
                  </div>
                </Form.Item>
              </Col>
              <Col
                span={18}
                style={{
                  textAlign: "start",
                }}
              >
                <Form.Item
                  label="รูปภาพเพิ่มเติม"
                  name=""
                  style={{
                    width: "100%",
                  }}
                >
                  <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    onRemove={(e: any) => handleRemove(e.uid)}
                  >
                    {fileList?.length >= 6 ? null : UploadButton}
                  </Upload>
                </Form.Item>
                <Modal
                  open={previewOpen}
                  title={null}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default observer(HomeNews);
