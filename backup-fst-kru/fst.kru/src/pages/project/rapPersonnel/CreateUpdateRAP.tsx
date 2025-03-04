import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Input,
  InputRef,
  Modal,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Upload,
  theme,
} from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { notify, props, rules } from "../../../helper/components";
import { RAP } from "../../../models/RAP";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import { pathImages } from "../../../constants/RoutePath";
import { UploadButton } from "../../../components/UploadButton";
import {
  CloseOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "dayjs/locale/th";
import locale from "antd/lib/locale/th_TH";
import dayjs from "dayjs";
import { useStore } from "../../../store/store";
import { Category } from "../../../models/Category";
import JoditEditor from "jodit-react";
import { HappyProvider } from "@ant-design/happy-work-theme";
import MySave from "../../../components/MySave";
const confirm = Modal.confirm;

type FieldTypeBudget = {
  id: number;
  orderSlipImportantId: string; //ใบสำคัญเลขที่ (ร.001)
  orderSlipNumber: string; //เลขที่ใบเบิก
  petitionNumber: string; //เลขที่ฎีกา
  year: string; //ปีเฉย ๆ (ต้องกรอกเอง)
  storageLocation: string; //สถานที่จัดเก็บ
  budget: any;
};

type FieldTypeCategory = {};

const CreateUpdateRAP = ({ dataEdit, handleSetMode }: any) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { budgets, getBudgetList, createBudget, removeBudget } =
    useStore().budgetStore;

  const { user } = useStore().userStore;
  const { currentBranchId } = useStore().BranchStore;

  const {
    categories,
    getCategory,
    ctreateUpdateCategory,
    removeCategory,
    uploadFile,
    uploadImage,
    createUpdateRAP,
    getResearchAndProjectByUser,
    getResearchAndProjectById,
    getResearchAndProjectByIdAdmin,
  } = useStore().ResearchAndProjectStore;

  const [form] = Form.useForm();
  const editor: any = useRef(null);
  const { token } = theme.useToken();

  const [data] = useState(
    dataEdit === undefined ? JSON.parse(state) : dataEdit
  );

  const [onErrorB, setOnErrorB] = useState(false);
  const [onErrorC, setOnErrorC] = useState(false);

  const [photo, setPhoto] = useState<any>(
    data?.id !== undefined ? data?.image : null
  );

  const [photoUpload, setPhotoUpload] = useState<UploadFile[]>([]);
  const [file, setFile]: any = useState<UploadFile[]>(
    data?.id !== undefined ? data?.pdf : []
  );

  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  const [body, setBody]: any = useState([]);

  useEffect(() => {
    getBudgetList();
    getCategory();
  }, []);

  const onFinish = async (values: RAP) => {
    console.log("values", values);
    const formattedData = {
      id: data?.id || 0,
      name: values.name || null,
      description: values.description || null,
      image: photo || null,
      pdf: file || null,
      year: datePicker.format(),
      budgetAmount: values.budgetAmount || 0,
      expertise: values.expertise || null,
      participant: JSON.stringify(tags) || null,
      personnelId:
        dataEdit === undefined ? user?.userId : dataEdit.personnelId || 0,
      budgetId: values.budget || null,
      categoryId: values.category || null,
    };

    createUpdateRAP(formattedData).then((e) => {
      getResearchAndProjectById(Number(currentBranchId));
      // getResearchAndProjectByUser();
      console.log("e", JSON.stringify(e));

      getResearchAndProjectByIdAdmin(Number(currentBranchId));

      dataEdit === undefined
        ? navigate(data?.length === 0 ? -1 : -2)
        : handleSetMode();
    });

    console.log("formattedData", formattedData);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");

    onErrorB === false && budget && setOnErrorB(true);
    onErrorC === false && category && setOnErrorC(true);
  };

  const [datePicker, setDatePicker]: any = useState<dayjs.Dayjs | null>(
    dayjs(Date.now()).add(543, "year")
  );

  const [budget, setBudget] = useState<any>(null);
  const [onSelectB, setOnselectB] = useState<any>(
    // data.id === undefined ? null : data.budget.id
    null
  );

  const [category, setCategory] = useState<any>(null);
  const [onSelectC, setOnselectC] = useState<any>(
    // data.id === undefined ? null : data.budget.id
    null
  );

  const [tags, setTags] = useState<any>(
    data?.id !== undefined ? JSON.parse(data?.participant) : []
  );

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");

  const onChangeYear = (selectedDate: dayjs.Dayjs | null) => {
    setDatePicker(selectedDate);
  };

  const onSelectChangeB = (e: any) => {
    setOnselectB(e);
  };

  const onSelectChangeC = (e: any) => {
    setOnselectC(e);
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
    const uploadedFileName = modifiedFileList.slice(-1);

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

  const optionsBudgets = budgets.map((item, i) => {
    return {
      key: i.toString(),
      label: item.budgetName,
      // (
      //   <>
      //     <Row
      //       style={{
      //         display: "flex",
      //         justifyContent: "space-between",
      //       }}
      //     >
      //       <div>{item.budgetName}</div>
      //       <div>
      //         <CloseOutlined
      //           className="hoverRemove"
      //           style={{ padding: 3, borderRadius: 50 }}
      //           // onClick={() => showRemoveConfirmB(item.budgetName, item.id)}
      //           onClick={() => {
      //             removeBudget(item.id).then(() => {
      //               setOnselectB(null);
      //               form.setFieldValue("budget", null);
      //             });
      //           }}
      //         />
      //       </div>
      //     </Row>
      //   </>
      // ),
      value: item.id, // ส่งค่าที่ถูกเลือกไป
    };
  });

  const optionsCategory = categories.map((item, i) => {
    return {
      key: i.toString(),
      label: item.name,
      // (
      //   <>
      //     <Row
      //       style={{
      //         display: "flex",
      //         justifyContent: "space-between",
      //       }}
      //     >
      //       <div>{item.name}</div>
      //       <div>
      //         <CloseOutlined
      //           className="hoverRemove"
      //           style={{ padding: 3, borderRadius: 50 }}
      //           // onClick={() => showRemoveConfirmC(item.name, item.id)}
      //           onClick={() => {
      //             removeCategory(item.id).then(() => {
      //               setOnselectC(null);
      //               form.setFieldValue(category, null);
      //             });
      //           }}
      //         />
      //       </div>
      //     </Row>
      //   </>
      // ),
      value: item.id, // ส่งค่าที่ถูกเลือกไป
    };
  });

  const showCreateConfirmC = () => {
    confirm({
      title: "คุณยืนยันที่จะเพิ่มงบประมาณนี้ใช่ไหม",
      icon: <ExclamationCircleFilled />,
      content: "เพิ่มงบประมาณ : " + category,
      okText: "ใช่ เพิ่มเลย",
      cancelText: "ไม่",
      onOk() {
        var result = categories.find(
          (item: Category) => item.name === category
        );

        if (result === undefined) {
          ctreateUpdateCategory(category);
          setCategory(null);
        } else {
          alert("มีงบประมาณนี้อยู่แล้ว");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

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
    width: "50%",
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
      name="project"
      initialValues={{
        ...data,
        pdf: data?.pdf,
        year: data?.id !== undefined ? data?.year : datePicker,
        image: data?.id !== undefined ? data?.image : null,
        budget: data?.id !== undefined ? data?.budgetId : null,
        category: data?.id !== undefined ? data?.categoryId : null,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <div style={{ marginTop: 15 }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
          <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3}>
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
                      src={`${pathImages.research}${data?.image}`}
                      alt="image"
                      style={{
                        width: "100%",
                        marginTop: 20,
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
          <Col xs={24} sm={24} md={24} lg={21} xl={21} xxl={21}>
            <div>
              <Form.Item
                label="ชื่องานวิจัย"
                name="name"
                rules={rules("ชื่องานวิจัย")}
              >
                <Input placeholder="ชื่องานวิจัย" />
              </Form.Item>
            </div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
              <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item
                  label="ไฟล์ PDF"
                  name="pdf"
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
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item
                  label="ปีของงานวิจัย"
                  name="year"
                  rules={[{ required: true, message: "กรุณากรอกความชำนาน" }]}
                >
                  <ConfigProvider locale={locale}>
                    <DatePicker
                      id="year"
                      onChange={onChangeYear}
                      defaultValue={datePicker}
                      value={datePicker}
                      picker="year"
                      allowClear={true}
                      style={{
                        width: "100%",
                      }}
                    />
                  </ConfigProvider>
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item
                  label="งบประมาณรวม"
                  name="budgetAmount"
                  rules={rules("งบประมาณรวม")}
                >
                  <Input placeholder="งบประมาณรวม" type="number" />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                <div>
                  <Form.Item<FieldTypeBudget>
                    label="ประเภทงบประมาณ"
                    name="budget"
                    validateStatus={onErrorB ? "error" : "success"}
                    rules={rules("ประเภทงบประมาณ")}
                    help={onErrorB ? "กรุณาเลือกประเภทงบประมาณ" : null}
                  >
                    <Select
                      style={{ width: "100%" }}
                      placeholder="เลือกประเภทงบประมาณ"
                      onChange={(e: any) => [
                        onSelectChangeB(e),
                        setOnErrorB(false),
                      ]}
                      options={optionsBudgets}
                      allowClear
                      defaultValue={onSelectB}
                      value={onSelectB}
                      dropdownRender={(menu) => {
                        return (
                          <>
                            {menu}
                            <Divider style={{ margin: "8px 0" }} />
                            <Space style={{ padding: "0 8px 4px" }}>
                              <Input
                                placeholder="กรุณากรอกประเภทงบประมาณ"
                                ref={inputRef}
                                defaultValue={budget}
                                value={budget}
                                onChange={(e: any) => setBudget(e.target.value)}
                                onKeyDown={(e) => e.stopPropagation()}
                              />
                              <Button
                                type="text"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                  var result = budgets.find(
                                    (item) => item.budgetName === budget
                                  );

                                  if (budget) {
                                    if (result === undefined) {
                                      createBudget(budget);
                                      setBudget(null);
                                    } else {
                                      alert("มีงบประมาณนี้อยู่แล้ว");
                                    }
                                  } else {
                                    alert("กรุณากรอกงบประมาณ");
                                  }
                                }}
                              >
                                เพิ่ม
                              </Button>
                            </Space>
                          </>
                        );
                      }}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item<FieldTypeCategory>
                  label="ประเภท (วิจัย หรือ โครงการ)"
                  name="category"
                  validateStatus={onErrorC ? "error" : "success"}
                  rules={rules("ประเภท (วิจัย หรือ โครงการ)")}
                  help={onErrorC ? "กรุณาเลือกประเภท" : null}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="เลือกประเภท (วิจัย หรือ โครงการ)"
                    onChange={(e: any) => [
                      onSelectChangeC(e),
                      setOnErrorC(false),
                    ]}
                    options={optionsCategory}
                    allowClear
                    defaultValue={onSelectC}
                    value={onSelectC}
                    dropdownRender={(menu) => {
                      return (
                        <>
                          {menu}
                          <Divider style={{ margin: "8px 0" }} />
                          <Space style={{ padding: "0 8px 4px" }}>
                            <Input
                              placeholder="กรุณากรอกประเภท"
                              ref={inputRef}
                              defaultValue={category}
                              value={category}
                              onChange={(e: any) => setCategory(e.target.value)}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={() => {
                                var result = categories.find(
                                  (item: Category) => item.name === category
                                );

                                if (category) {
                                  if (result === undefined) {
                                    ctreateUpdateCategory(category);
                                    setCategory(null);
                                  } else {
                                    alert("มีงบประมาณนี้อยู่แล้ว");
                                  }
                                } else {
                                  alert("กรุณากรอกงบประมาณ");
                                }

                                // category
                                //   ? showCreateConfirmC()
                                //   : alert("กรุณากรอกงบประมาณ");
                              }}
                            >
                              เพิ่ม
                            </Button>
                          </Space>
                        </>
                      );
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item
                  label="ผู้ร่วมวิจัย"
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
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                          </span>
                        </Tag>
                      );

                      return (
                        <Col key={tag} style={{ marginBottom: 10 }}>
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
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div>
              <Form.Item
                label="ความเชี่ยวชาญ"
                name="expertise"
                rules={rules("ความเชี่ยวชาญ")}
              >
                <Input placeholder="ความเชี่ยวชาญ" />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <div>
              <Form.Item
                label="รายละเอียด"
                name="description"
                rules={[{ required: true, message: "กรุณากรอกรายละเอียด" }]}
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
      </div>

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
    </Form>
  );
};

export default observer(CreateUpdateRAP);
