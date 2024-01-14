import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Switch,
  Upload,
} from "antd";
import HTMLReactParser from "html-react-parser";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../store/store";
import { notify } from "../../helper/components";
import JoditEditor from "jodit-react";
import DataTable from "../../components/DataTable";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { HttpStatusCode } from "axios";
import { UploadButton } from "../../components/UploadButton";
import { pathImages } from "../../constants/RoutePath";

const confirm = Modal.confirm;

const HomeWeLearn = () => {
  const [form] = Form.useForm();
  const editor: any = useRef(null);
  const {
    currentBranch,
    currentBranchId,
    getWeLearnById,
    welearn,
    createUpdateWeLearn,
    isUsedWeLearn,
    removeWeLearn,
  } = useStore().BranchStore;

  const [file, setFile] = useState<UploadFile[]>([]);

  console.log("welearn ::L", JSON.stringify(welearn));

  useEffect(() => {
    getWeLearnById(Number(currentBranchId));
  }, []);

  const [isFormInitialized, setIsFormInitialized] = useState(false);

  const [open, setOpen] = useState(false);

  const [content, setContent]: any = useState([]);
  const [data, setdata]: any = useState([]);

  useEffect(() => {
    if (isFormInitialized) {
      if (data.length !== 0) {
        form.setFieldsValue({
          title: data.title,
          description: data.description,
          content: data.content,
        });
      } else {
        form.setFieldsValue({
          title: "",
          description: "",
          content: "",
        });
      }
    }
    setFile([]);
  }, [data, form, isFormInitialized]);

  const onFinish = async (values: any) => {
    console.log("values :L ", values);
    const value = {
      id: data.id !== undefined ? data.id : 0,
      title: values.title,
      imageName: file.length === 0 ? null : file[0].originFileObj,
      description: values.description,
      content: content,
      branchId: Number(currentBranchId),
    };

    console.log("value :L ", value);

    if (file.length === 0 && data.length === 0) {
      notify("กรุณาใส่รูปภาพสไลด์");
    } else {
      createUpdateWeLearn(value).then((e: any) => {
        if (e.statusCode === HttpStatusCode.Ok) {
          getWeLearnById(Number(currentBranchId));
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

  const columns: any = [
    {
      id: 1,
      title: "ชื่อ",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      id: 2,
      title: "รูปภาพ",
      dataIndex: "imageName",
      key: "imageName",
      align: "center",
      render: (e: any) => (
        <Image height={50} src={`${pathImages.weLearn}${e}`} />
      ),
    },
    {
      id: 3,
      title: "รายละเอียด",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    // {
    //   id: 4,
    //   title: "เนื้อหา",
    //   dataIndex: "content",
    //   key: "content",
    //   align: "center",
    //   render: (e: string) => HTMLReactParser(e),
    // },
    {
      id: 5,
      title: "แสดง",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => {
        console.log("e :LL", JSON.stringify(e.id));

        return (
          <Switch
            checkedChildren="แสดง"
            unCheckedChildren="ซ่อน"
            defaultChecked={!!e.isUsed}
            onClick={() => isUsedWeLearn(e.id)}
          />
        );
      },
    },
    {
      id: 6,
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
      id: 7,
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <HappyProvider key={`delete-${e.id}`}>
          <Button
            color="whtie"
            onClick={() => showRemoveConfirm(e.title, e.id)}
          >
            ลบ
          </Button>
        </HappyProvider>
      ),
      fixed: "right",
      width: 80,
    },
  ];

  function showRemoveConfirm(slideName: string, id: number) {
    confirm({
      title: "คุณแน่ใจใช่ไหมที่จะลบสไลด์นี้",
      content: "ลบสไลด์ : " + slideName,
      okText: "ใช่ ลบเลย",
      okType: "danger",
      cancelText: "ไม่",
      onOk() {
        removeWeLearn(id).then(() => {
          getWeLearnById(Number(currentBranchId));
        });
      },
      onCancel() {
        console.log("Cancel");
      },
      wrapClassName: "vertical-center-modal",
    });
  }

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFile(newFileList.slice(-1));
  };

  console.log("welearn :L", JSON.stringify(welearn));

  return (
    <>
      <h2>{currentBranch.branchName} เรียนอะไรบ้าง?</h2>
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

      <DataTable data={welearn} columns={columns} sizeX={1000} />

      {/* {welearn.map((item: any, i: number) => (
        <Card
          key={i}
          style={{
            marginTop: 20,
            borderRadius: 5,
          }}
        >
          <Card.Grid style={gridStyle}>{item.title}</Card.Grid>
        </Card>
      ))} */}

      <Modal
        title="เรียนอะไรบ้าง"
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
              <Col span={12}>
                <Form.Item
                  label="เรื่อง"
                  name="title"
                  rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
                  style={{
                    width: "100%",
                  }}
                >
                  <Input placeholder="หัวเรื่อง" />
                </Form.Item>
              </Col>
              <Col span={12}>
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
                      src={`${pathImages.weLearn}${data.imageName}`}
                      alt="logo"
                      style={{
                        // width: 300,
                        marginTop: 80,

                        height: 200,
                        // objectFit: "cover",
                        // borderRadius: "50%",
                      }}
                    />
                  ) : (
                    file.length === 0 && UploadButton
                  )}
                </Upload>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="รายละเอียดเพิ่มเติม"
                  name="description"
                  rules={[
                    { required: true, message: "กรุณากรอกรายละเอียดเพิ่มเติม" },
                  ]}
                  style={{
                    width: "100%",
                  }}
                >
                  <Input placeholder="รายละเอียดเพิ่มเติม" />
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
                  name="content"
                  rules={
                    content === ""
                      ? [{ required: true, message: "กรุณากรอกเนื้อหา" }]
                      : undefined
                  }
                  style={{
                    width: "100%",
                  }}
                >
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => {
                      setContent(newContent);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default observer(HomeWeLearn);
