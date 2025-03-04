import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../store/store";
import { HttpStatusCode } from "axios";
import { notify } from "../../helper/components";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import {
  Col,
  Upload,
  Form,
  Input,
  Modal,
  Row,
  Button,
  InputRef,
  theme,
  Tag,
  Tooltip,
} from "antd";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { RoutePath, pathImages } from "../../constants/RoutePath";
import { UploadButton } from "../../components/UploadButton";
import { dataMock } from "../../store/branch.store";
import MyTitleAdmin from "../../components/MyTitleAdmin";
import MyAlertCreateSmall from "../../components/MyAlertCreateSmall";
import ReactPlayer from "react-player";
import { TitlePath } from "../../constants/TitlePath";

const confirm = Modal.confirm;

const SecretSettingMyBranch = () => {
  const [form] = Form.useForm();
  const editor: any = useRef(null);
  const { token } = theme.useToken();

  const { currentBranchId, currentBranch, getBranchById, createUpdateBranch } =
    useStore().BranchStore;

  const data: any = currentBranch;

  const [file, setFile] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage]: any = useState("");

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");

  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  const [tags, setTags] = useState<any>(
    data?.id !== undefined ? JSON.parse(data?.videoUrl) : []
  );

  console.log("tags", tags);

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
      setTags(JSON.parse(data?.videoUrl));
    }
  }, [data, form]);

  const onFinish = async (values: any) => {
    const value = {
      id: data.id === undefined ? 0 : data.id,
      branchName: values.branchName,
      logo: file.length === 0 ? null : file[0].originFileObj,
      pageFacebook: values.pageFacebook,
      videoUrl: JSON.stringify(tags) || null,

      categoryBranch: values.categoryBranch,
      CategoryMajor: values.categoryMajor,
      text: values.text,
    };

    console.log("value :L ", value);

    await createUpdateBranch(value).then((e: any) => {
      if (e.statusCode === HttpStatusCode.Ok) {
        getBranchById(Number(currentBranchId));

        notify("บันทึกเสร็จสิ้น");

        window.scrollTo(0, 0);
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

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag: any) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (tags === null) {
      setTags([inputValue]);
    } else {
      if (inputValue && !tags.includes(inputValue)) {
        setTags([...tags, inputValue]);
      }
    }

    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const tagInputStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    marginInlineEnd: 8,
    verticalAlign: "top",
    marginBottom: 10,
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

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
        <MyTitleAdmin name={TitlePath.settingMyBranch} />
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
              <Form.Item
                label="ชื่อเว็บ"
                name="branchName"
                rules={[{ required: true, message: "กรุณากรอกชื่อเว็บ" }]}
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
                // rules={[{ required: true, message: "กรุณากรอก" }]}
                style={{
                  width: "100%",
                }}
              >
                <Input placeholder="คำอธิบาย" />
              </Form.Item>
            </Row>

            <Row>
              <Form.Item
                label="ลิ้งวีดีโอ (youtube)"
                // name="keyWord"
                // rules={rules("คำสำคัญ")}
              >
                <div style={{ marginBottom: 10 }}>
                  {inputVisible ? (
                    <Input
                      ref={inputRef}
                      type="text"
                      size="middle"
                      style={tagInputStyle}
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={handleInputConfirm}
                      onPressEnter={handleInputConfirm}
                    />
                  ) : (
                    <Col>
                      <Tag
                        style={tagPlusStyle}
                        icon={<PlusOutlined />}
                        onClick={showInput}
                      >
                        เพิ่ม
                      </Tag>
                    </Col>
                  )}
                </div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                  {tags?.map((tag: any, index: any) => {
                    if (editInputIndex === index) {
                      return (
                        <Input
                          ref={editInputRef}
                          key={tag}
                          size="middle"
                          style={tagInputStyle}
                          value={editInputValue}
                          onChange={handleEditInputChange}
                          onBlur={handleEditInputConfirm}
                          onPressEnter={handleEditInputConfirm}
                        />
                      );
                    }
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag
                        key={tag}
                        closable={index >= 0}
                        style={{ userSelect: "none", margin: "auto" }}
                        onClose={() => handleClose(tag)}
                      >
                        <span
                          onDoubleClick={(e) => {
                            // if (index !== 0) {
                            setEditInputIndex(index);
                            setEditInputValue(tag);
                            e.preventDefault();
                            // }
                          }}
                        >
                          {isLongTag ? `${tag.slice(0, 40)}...` : tag}
                        </span>
                      </Tag>
                    );

                    return (
                      <Col key={index} style={{ marginBottom: 10 }}>
                        {isLongTag ? (
                          <Tooltip title={tag} key={tag}>
                            {tagElem}
                          </Tooltip>
                        ) : (
                          tagElem
                        )}
                      </Col>
                    );
                  })}
                </Row>
              </Form.Item>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {tags?.map((item: string, i: number) => (
                <Col
                  key={i}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={6}
                  xxl={6}
                  style={{
                    marginBottom: 20,
                  }}
                >
                  <ReactPlayer controls height={240} width="100%" url={item} />
                </Col>
              ))}
            </Row>
          </Col>

          {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}> */}
          {/* <Row>
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
            </Row> */}
          {/* </Col> */}
        </Row>

        <MyAlertCreateSmall
          functionRemove={() => {
            form.submit();
          }}
        />
        {/* <HappyProvider>
          <Button color="whtie" onClick={showCreateConfirm}>
            บันทึก
          </Button>
        </HappyProvider> */}
      </div>
    </Form>
  );
};
export default observer(SecretSettingMyBranch);
