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
import MyUpload from "../../components/MyUpload";
import MyButton from "../../components/MyButton";
import MyRemovePop from "../../components/MyRemovePop";
import MyTitleAdmin from "../../components/MyTitleAdmin";
import { TitlePath } from "../../constants/TitlePath";

const confirm = Modal.confirm;

const SecretWeLearn = () => {
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
      title: "ชื่อเรื่อง",
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
      width: 90,
      render: (e: any) => {
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
      id: 7,
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <MyRemovePop
          functionRemove={() =>
            removeWeLearn(e.id).then(() => {
              getWeLearnById(Number(currentBranchId));
            })
          }
        />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Button
        //     color="whtie"
        //     onClick={() => showRemoveConfirm(e.title, e.id)}
        //   >
        //     ลบ
        //   </Button>
        // </HappyProvider>
      ),
      width: 80,
    },
  ];

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFile(newFileList.slice(-1));
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 10 }}
      >
        <MyTitleAdmin
          name={currentBranch.branchName + " " + TitlePath.weLearn}
        />

        <MyButton
          functionOnClick={() => {
            setOpen(true);
            setIsFormInitialized(true);
          }}
          title="เพิ่ม"
        />
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
                <MyUpload
                  data={data}
                  imageName={data.imageName}
                  file={file}
                  setFile={setFile}
                  prefixPath={pathImages.weLearn}
                />
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
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
              <Col span={24}>
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

export default observer(SecretWeLearn);
