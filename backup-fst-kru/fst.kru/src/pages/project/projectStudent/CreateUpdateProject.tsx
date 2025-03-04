import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputRef,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Upload,
  message,
  theme,
} from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { notify, props, rules } from "../../../helper/components";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import { pathImages } from "../../../constants/RoutePath";
import { UploadButton } from "../../../components/UploadButton";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useStore } from "../../../store/store";
import { personnel } from "../../../models/Personnel";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { Project } from "../../../models/Projects";
import JoditEditor from "jodit-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Consultant } from "../../../models/Consultant";
import MySave from "../../../components/MySave";

const CreateUpdateProject = ({ dataEdit, handleSetMode }: any) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  // console.log("state :L", state);

  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const editor: any = useRef(null);

  const {
    uploadFile,
    allPersonnel,
    getAllPersonnel,
    user,
    createUpdateProject,
    uploadImage,
    getProjectById,
    removeConsultant,
    getProjectByIdAdmin,
  } = useStore().userStore;
  const { currentBranchId } = useStore().BranchStore;

  useEffect(() => {
    getAllPersonnel().then((res) => {
      setOptions(
        res?.map((item: any) => {
          return {
            // label: 'China',
            value:
              item?.projects?.prefixes?.prefixName + item?.projects?.fullName,
            // emoji: '🇨🇳',
            desc:
              item?.projects?.prefixes?.prefixName + item?.projects?.fullName,
            personnelId: item?.projects?.id,
            id: 0,
          };
        })
      );
    });
  }, []);

  const [data] = useState<any>(
    dataEdit === undefined ? JSON.parse(state) : dataEdit
  );

  // console.log("dataEdit", JSON.stringify(dataEdit));
  // console.log("data", JSON.stringify(data));

  const [tags, setTags] = useState<any>(
    data?.id !== undefined ? JSON.parse(data?.keyWords) : []
  );
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");

  const [options, setOptions] = useState<any[]>(
    // data?.id !== undefined
    //   ? allPersonnel?.map((item: any) => {
    //       return {
    //         // label: 'China',
    //         value: item?.projects?.prefixes?.prefixName + item?.projects?.fullName,
    //         // emoji: '🇨🇳',
    //         desc: item?.projects?.prefixes?.prefixName + item?.projects?.fullName,
    //         personnelId: item?.projects?.id,
    //         id: 0,
    //       };
    //     })
    //   : []
    []
  );

  const [consultants, setConsultants]: any = useState(
    data?.id !== undefined
      ? data?.consultants?.map((item: Consultant) => {
          return {
            id: item.id,
            ProjectId: item.projectId,
            personnelId: item.personnelId,
          };
        })
      : []
  );

  // console.log("allPersonnel l;", JSON.stringify(allPersonnel[0]));
  // console.log("options l;", JSON.stringify(options));
  // console.log("consultants l;", JSON.stringify(consultants));

  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  const [photo, setPhoto] = useState<any>(
    data?.id !== undefined ? data?.image : null
  );
  const [photoUpload, setPhotoUpload] = useState<UploadFile[]>([]);

  const [file, setFile]: any = useState<UploadFile[]>(
    data?.id !== undefined ? data?.pdf : []
  );

  const [body, setBody]: any = useState([]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  // console.log("file l;", JSON.stringify(file));

  const onFinish = async (values: Project) => {
    console.log("values", values);
    const formattedData = {
      id: data?.id || 0,
      nameTH: values.nameTH || null,
      nameEN: values.nameEN || null,
      description: values.description,
      image: photo || null,
      pdf: file || null,
      youtubeUrl: values.youtubeUrl || null,
      webUrl: values.webUrl || null,
      githubUrl: values.githubUrl || null,
      keyWords: JSON.stringify(tags) || null,
      studentId:
        dataEdit === undefined ? user?.userId : dataEdit.studentId || 0,
      consultants: consultants,
    };

    createUpdateProject(formattedData).then((e) => {
      getProjectById(Number(currentBranchId));
      console.log("e", JSON.stringify(e));

      getProjectByIdAdmin(Number(currentBranchId));

      dataEdit === undefined
        ? navigate(data?.length === 0 ? -1 : -2)
        : handleSetMode();
    });

    console.log("formattedData", formattedData);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

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
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
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
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  const onChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
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

    setPhotoUpload(modifiedFileList.slice(-1));
    const uploadedFileName = newFileList.slice(-1);

    await uploadImage({ file: uploadedFileName[0].originFileObj }).then((e) => {
      setPhoto(e);
    });
  };

  const onChangeFile = async (info: any) => {
    const uploadedFileName = info.file.originFileObj;
    await uploadFile({ file: uploadedFileName }).then((e) => {
      setFile(e);
    });
  };

  const handleChange = (value: number) => {
    setConsultants([
      ...consultants,
      { id: 0, ProjectId: 0, personnelId: value },
    ]);
  };

  const handleRemoveConsultant = (option: any) => {
    console.log("options s", option);

    const find = consultants.find(
      (x: any) => x.personnelId === option.personnelId
    );

    setConsultants(
      consultants.filter((x: any) => x.personnelId !== option.personnelId)
    );

    removeConsultant(find.id).then(() => {
      getProjectById(Number(currentBranchId));
    });
  };

  return (
    <Form
      form={form}
      name="project"
      initialValues={{
        ...data,
        file: data?.pdf,
        image: data?.id !== undefined ? data?.image : null,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <div style={{ marginTop: 15 }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
          <Col span={24}>
            <Form.Item
              label="ชื่อภาษาไทย"
              name="nameTH"
              rules={rules("ชื่อภาษาไทย")}
            >
              <Input placeholder="ชื่อภาษาไทย" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="ชื่อภาษาอังกฤษ"
              name="nameEN"
              rules={rules("ชื่อภาษาอังกฤษ")}
            >
              <Input placeholder="ชื่อภาษาอังกฤษ" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="ลิ้งยูทูป"
              name="youtubeUrl"
              // rules={rules("ลิ้งยูทูป")}
            >
              <Input placeholder="ลิ้งยูทูป" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
              <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <div>
                  <Form.Item
                    label="รูปภาพ"
                    name="image"
                    rules={[{ required: true, message: "กรุณากรอกรูปภาพ" }]}
                    style={{
                      width: "100%",
                    }}
                  >
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      defaultFileList={data?.image}
                      fileList={photoUpload}
                      onChange={onChange}
                      accept=".jpeg, .jpg, .png"
                    >
                      {photoUpload?.length === 0 && data?.length !== 0 ? (
                        <img
                          src={`${pathImages.project}${data?.image}`}
                          alt="image"
                          style={{
                            width: "100%",
                            // height: "100%",
                            // objectFit: "cover",
                            // borderRadius: "50%",
                          }}
                        />
                      ) : (
                        photoUpload?.length === 0 && UploadButton
                      )}
                    </Upload>
                  </Form.Item>
                </div>
              </Col>
              <Col xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                <div>
                  <Form.Item
                    label="ไฟล์ PDF"
                    name="file"
                    rules={[{ required: true, message: "กรุณากรอกไฟล์ PDF" }]}
                    style={{
                      width: "100%",
                    }}
                  >
                    {file?.length !== 0 ? (
                      <Tooltip
                        placement="left"
                        title={file?.length !== 0 ? file : "ว่างเปล่า"}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {file}
                          </div>
                        </Button>
                      </Tooltip>
                    ) : (
                      <Upload {...props} onChange={onChangeFile}>
                        <Tooltip
                          placement="left"
                          title={file?.length !== 0 ? file : "ว่างเปล่า"}
                        >
                          <Button
                            icon={<UploadOutlined />}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            อัพโหลดไฟล์
                          </Button>
                        </Tooltip>
                      </Upload>
                    )}
                    {/* <Upload {...props} onChange={onChangeFile}>
                      <Tooltip
                        placement="left"
                        title={file?.length !== 0 ? file : "ว่างเปล่า"}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          {file?.length !== 0 ? (
                            <div
                              style={{
                                maxWidth: "100px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {file}
                            </div>
                          ) : (
                            "อัพโหลดไฟล์"
                          )}
                        </Button>
                      </Tooltip>
                    </Upload> */}
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <div>
                  <Form.Item
                    label="คำสำคัญ"
                    // name="keyWord"
                    // rules={rules("คำสำคัญ")}
                  >
                    {inputVisible ? (
                      <Input
                        ref={inputRef}
                        type="text"
                        size="small"
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
                    {tags?.map((tag: any, index: any) => {
                      if (editInputIndex === index) {
                        return (
                          <Input
                            ref={editInputRef}
                            key={tag}
                            size="small"
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
                          closable={index !== 0}
                          style={{ userSelect: "none", marginTop: 10 }}
                          onClose={() => handleClose(tag)}
                        >
                          <span
                            onDoubleClick={(e) => {
                              if (index !== 0) {
                                setEditInputIndex(index);
                                setEditInputValue(tag);
                                e.preventDefault();
                              }
                            }}
                          >
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                          </span>
                        </Tag>
                      );
                      return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                          {tagElem}
                        </Tooltip>
                      ) : (
                        tagElem
                      );
                    })}
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <div>
              <Form.Item
                label="ลิ้งตัวอย่างเว็บ"
                name="webUrl"
                // rules={rules("ลิ้งตัวอย่างเว็บ")}
              >
                <Input placeholder="ลิ้งตัวอย่างเว็บ" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="ลิ้ง Github"
                name="githubUrl"
                // rules={rules("ลิ้ง ลิ้งGithub")}
              >
                <Input placeholder="ลิ้ง Github" />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <div>
              <Form.Item
                label="ที่ปรึกษา"
                // name="githubUrl"
                // rules={rules("ลิ้ง ลิ้งGithub")}
              >
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="เลือกที่ปรึกษา"
                  defaultValue={
                    data?.id !== undefined
                      ? data?.consultants?.map((item: any) => {
                          return {
                            value:
                              item.personnel.prefixes?.prefixName +
                              item.personnel.fullName,
                            desc:
                              item.personnel.prefixes?.prefixName +
                              item.personnel.fullName,
                            id: item?.id,
                            personnelId: item?.personnelId,
                          };
                        })
                      : []
                  }
                  optionLabelProp="label"
                  onSelect={(_, option) => handleChange(option?.personnelId)}
                  onDeselect={(_, option) => handleRemoveConsultant(option)}
                  options={options}
                  optionRender={(option) => (
                    <Space>
                      <span role="img" aria-label={option.data.label}>
                        {option.data.emoji}
                      </span>
                      {option.data.desc}
                    </Space>
                  )}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
          <Col span={24}>
            <div>
              <Form.Item
                label="รายละเอียด"
                name="description"
                // rules={[{ required: true, message: "กรุณากรอกรายละเอียด" }]}
              >
                <JoditEditor
                  ref={editor}
                  value={body}
                  onChange={(newBody) => {
                    setBody(newBody);
                  }}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <div
          style={{
            marginBottom: 20,
          }}
        >
          <MySave />
        </div>

        {/* <HappyProvider>
          <Button
            style={{
              marginBottom: 20,
            }}
            color="whtie"
            htmlType="submit"
          >
            บันทึก
          </Button>
        </HappyProvider> */}
      </div>
    </Form>
  );
};

export default observer(CreateUpdateProject);
