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
import {
  ShowRemoveConfirm,
  formatDateThai,
  notify,
} from "../../helper/components";
import { PlusOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import type { RcFile, UploadProps } from "antd/es/upload";
import { UploadButton } from "../../components/UploadButton";
import { pathImages } from "../../constants/RoutePath";
import MyUpload from "../../components/MyUpload";
import MyTitleAdmin from "../../components/MyTitleAdmin";
import MyRemovePop from "../../components/MyRemovePop";
import MyButton from "../../components/MyButton";
import { TitlePath } from "../../constants/TitlePath";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const SecretNews = () => {
  const [form] = Form.useForm();
  const {
    currentBranchId,
    news,
    getNewsAdminById,
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
  // const [body, setBody]: any = useState([]);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [idRemove, setIdRemove]: any = useState([]);

  useEffect(() => {
    getNewsAdminById(Number(currentBranchId));
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (data.length !== 0) {
        const formattedFileList = data?.newsPhotos?.map((photo: any) => ({
          uid: photo.id,
          name: photo.url,
          status: "done",
          url: `${pathImages.newsPhoto}${photo.url}`,
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
    },
    {
      id: 2,
      title: "รูปภาพ",
      dataIndex: "imageName",
      key: "imageName",
      align: "center",
      render: (e: any) => <Image height={80} src={`${pathImages.news}${e}`} />,
      width: 190,
    },
    {
      id: 3,
      title: "วันที่สร้าง",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (e: any) => <div>{formatDateThai(e, "")}</div>,
      width: 150,
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
      width: 90,
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
        <MyRemovePop functionRemove={() => removeNews(e.id)} />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Button
        //     color="whtie"
        //     onClick={() =>
        //       ShowRemoveConfirm("ประชาสัมพันธ์", e.title, e.id, removeNews)
        //     }
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
    const formData = {
      id: data.id !== undefined ? data.id : 0,
      title: values.title,
      imageName: file.length === 0 ? null : file[0].originFileObj,
      body: values.body === "" ? null : values.body,
      branchId: Number(currentBranchId),
    };

    console.log("formData :L ", formData);

    console.log("fileList :L ", fileList.length);

    if (file.length === 0 && data.length === 0) {
      notify("กรุณาใส่รูปภาพ");
    } else {
      await createUpdateNews(
        formData,
        fileList.length === 0 ? [] : fileList
      ).then(() => {
        idRemove.map((i: number) => removeNewsPhoto(i));
      });

      // if (e.statusCode === HttpStatusCode.Ok) {
      getNewsAdminById(Number(currentBranchId));
      setOpen(false);
      setdata([]);
      // }
    }

    console.log("formData :L end ", formData);
  };

  console.log("idRemove", idRemove);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
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

    setFileList(modifiedFileList);
  };

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
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 10 }}
      >
        <MyTitleAdmin name={TitlePath.news} />

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
      <DataTable data={news} columns={columns} sizeX={1300} />
      <Modal
        title="ประชาสัมพันธ์"
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
          name="slideShow"
          initialValues={{
            ...data,
            imageName: data.imageName,
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
                  label="ชื่อเรื่อง"
                  name="title"
                  rules={[{ required: true, message: "กรุณากรอกชื่อเรื่อง" }]}
                  style={{
                    width: "100%",
                  }}
                >
                  <Input placeholder="ชื่อเรื่อง" />
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
                  // rules={
                  //   body === ""
                  //     ? [{ required: true, message: "กรุณากรอกเนื้อหา" }]
                  //     : undefined
                  // }
                >
                  <JoditEditor
                    ref={editor}
                    value={""}
                    // onChange={(newBody) => {
                    //   setBody(newBody);
                    // }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={7}
                xl={7}
                xxl={7}
                style={{
                  borderRight: "5px solid #f0f0f0",
                  marginRight: 30,
                }}
              >
                <Form.Item
                  label="รูปภาพ"
                  name="imageName"
                  rules={[{ required: true, message: "กรุณากรอกรูปภาพ" }]}
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      marginTop: 30,
                    }}
                  >
                    <MyUpload
                      data={data}
                      imageName={data.imageName}
                      file={file}
                      setFile={setFile}
                      prefixPath={pathImages.news}
                    />
                  </div>
                  {/* <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    defaultFileList={data.imageName}
                    fileList={file}
                    onChange={onChange}
                    accept=".jpeg, .jpg, .png"
                  >
                    {file.length === 0 && data.length !== 0 ? (
                      <img
                        src={`${pathImages.news}${data.imageName}`}
                        alt="logo"
                        style={{
                          width: "100%",
                          // height: "100%",
                          // objectFit: "cover",
                          // borderRadius: "50%",
                        }}
                      />
                    ) : (
                      file.length === 0 && UploadButton
                    )}
                  </Upload> */}
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={16}
                xl={16}
                xxl={16}
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
                  <div
                    style={{
                      marginTop: 30,
                    }}
                  >
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      fileList={fileList}
                      maxCount={4}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      onRemove={(e: any) => {
                        console.log("e", e);
                        handleRemove(e.uid);
                      }}
                    >
                      {fileList?.length >= 4 ? null : UploadButton}
                    </Upload>
                  </div>
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

export default observer(SecretNews);
