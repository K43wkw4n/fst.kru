import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import { useStore } from "../../../store/store";
import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Switch,
  Tooltip,
  Upload,
} from "antd";
import {
  ShowRemoveConfirm,
  formatDateThai,
  notify,
  props,
  showConfirm,
} from "../../../helper/components";
import type { UploadFile } from "antd/es/upload/interface";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import moment from "moment";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import MyRemovePop from "../../../components/MyRemovePop";
import { getColumnSearchProps } from "../../../components/Search";
import MyButton from "../../../components/MyButton";
import MySave from "../../../components/MySave";
import { TitlePath } from "../../../constants/TitlePath";

const SecretSection = () => {
  const {
    sectionAdmin,
    getSectionAdmin,
    createUpdateSection,
    removeSection,
    removeSubsection,
    uploadFileSection,
    isUsedSection,
  } = useStore().BranchStore;
  const [form] = Form.useForm();

  const [dataEdit, setDataEdit] = useState<any>([]);
  const [formMode, setFormMode] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  const [files, setFiles]: any = useState<Record<string, UploadFile[]>>({});

  useEffect(() => {
    getSectionAdmin();
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (dataEdit.length === 0) {
        form.setFieldsValue({
          name: "",
          subsections: [],
        });
        setFiles({});
      } else {
        form.setFieldsValue({
          name: dataEdit.name,
          subsections: dataEdit.subsections,
          pdf: dataEdit.subsections.map((item: any) => {
            return item.pdf || null;
          }),
        });
        setFiles(
          dataEdit.subsections.map((item: any) => {
            return item.pdf || null;
          })
        );
      }
    }
  }, [form, formMode, isFormInitialized]);

  const onFinish = async (values: any) => {
    console.log("values", values);

    const formattedData = {
      id: dataEdit.id || 0,
      name: values.name,
      subsections: values.subsections.map((item: any, i: number) => ({
        id: item.id || 0,
        name: item.name,
        pdf: files[i] || null,
      })),
    };

    createUpdateSection(formattedData).then(() => {
      getSectionAdmin();
      handleSetMode();
      setDataEdit([]);
    });

    console.log("formattedData", formattedData);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const handleSetMode = () => setFormMode(!formMode);

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    handleSetMode();
  };

  const columns: any = [
    {
      id: 1,
      title: "ปรัชญา วิสัยทัศน์ พันธกิจ",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      id: 2,
      title: "วันที่สร้าง",
      dataIndex: "",
      key: "createdAt",
      align: "center",
      render: (e: any) => <div>{formatDateThai(e.createdAt, "")}</div>,
      width: 150,
    },
    {
      id: 3,
      title: "แสดง",
      dataIndex: "",
      key: "",
      width: 90,
      align: "center",
      render: (e: any) => {
        return (
          <Switch
            checkedChildren="แสดง"
            unCheckedChildren="ซ่อน"
            defaultChecked={!!e.isUsed}
            onClick={() => isUsedSection(e.id)}
          />
        );
      },
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
            handleEdit(e);
            setIsFormInitialized(true);
          }}
          title="แก้ไข"
        />
        // <HappyProvider>
        //   <Button
        //     color="whtie"
        //     onClick={() => {
        //       handleEdit(e);
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
        <MyRemovePop functionRemove={() => removeSection(e.id)} />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Popconfirm
        //     placement="topRight"
        //     title="ลบออกจากระบบ"
        //     description="คุณยืนยันที่จะลบ ใช่ไหม"
        //     okText="ใช่ ลบเลย"
        //     onConfirm={() => removeSection(e.id)}
        //     cancelText="ยกเลิก"
        //   >
        //     <Button color="whtie">ลบ</Button>
        //   </Popconfirm>
        // </HappyProvider>
      ),
      width: 80,
    },
  ];

  const onChangeFile = async (info: any, name: number) => {
    const uploadedFileName = info.file.originFileObj;
    await uploadFileSection({
      file: uploadedFileName,
    }).then((e) => {
      setFiles((prevState: any) => ({
        ...prevState,
        [name]: e,
      }));
    });
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 10 }}
      >
        <MyTitleAdmin name={TitlePath.section} />
        {!formMode ? (
          <MyButton
            functionOnClick={() => {
              handleSetMode();
              setIsFormInitialized(true);
            }}
            title="เพิ่ม"
          />
        ) : (
          <MyButton
            functionOnClick={() => {
              handleSetMode();
              setDataEdit([]);
              setIsFormInitialized(false);
            }}
            title="กลับ"
          />
        )}
      </div>
      {!formMode ? (
        <>
          <DataTable data={sectionAdmin} columns={columns} sizeX={500} />
        </>
      ) : (
        <>
          <Form
            form={form}
            name="section"
            initialValues={{
              ...dataEdit,
              subsections: dataEdit.subsections || [],
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={12}
                xl={12}
                xxl={12}
                style={{
                  marginTop: 15,
                }}
              >
                <Form.Item
                  label="ชื่อปรัชญา วิสัยทัศน์ พันธกิจ"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกชื่อปรัชญา วิสัยทัศน์ พันธกิจ",
                    },
                  ]}
                  style={{
                    width: "100%",
                  }}
                >
                  <Input placeholder="ชื่อปรัชญา วิสัยทัศน์ พันธกิจ" />
                </Form.Item>
              </Col>

              <Form.List name="subsections">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      const fileList: any = files[name] || [];

                      return (
                        <Col
                          xs={24}
                          sm={24}
                          md={24}
                          lg={12}
                          xl={12}
                          xxl={12}
                          key={key}
                          style={{ marginTop: 15 }}
                        >
                          <Card
                            hoverable
                            style={{
                              backgroundColor: "#F3F8FF",
                            }}
                          >
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                              <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={14}
                                xxl={15}
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "name"]}
                                  label={`หัวข้อย่อย`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "กรุณากรอกหัวข้อย่อย",
                                    },
                                  ]}
                                >
                                  <Input placeholder="หัวข้อย่อย" />
                                </Form.Item>
                              </Col>

                              <Col xs={12} sm={9} md={6} lg={10} xl={8} xxl={7}>
                                <Form.Item
                                  label="ไฟล์ PDF"
                                  name="pdf"
                                  // rules={[
                                  //   {
                                  //     required: true,
                                  //     message: "กรุณากรอกไฟล์ PDF",
                                  //   },
                                  // ]}
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  {fileList?.length !== 0 ? (
                                    <Tooltip
                                      placement="left"
                                      title={
                                        fileList?.length !== 0
                                          ? fileList
                                          : "ว่างเปล่า"
                                      }
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
                                          {fileList}
                                        </div>
                                      </Button>
                                    </Tooltip>
                                  ) : (
                                    <Upload
                                      {...props}
                                      onChange={(info) =>
                                        onChangeFile(info, name)
                                      }
                                    >
                                      <Tooltip
                                        placement="left"
                                        title={
                                          fileList?.length !== 0
                                            ? fileList
                                            : "ว่างเปล่า"
                                        }
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
                                  {/* <Upload
                                    {...props}
                                    onChange={(info) =>
                                      onChangeFile(info, name)
                                    }
                                  >
                                    <Tooltip
                                      placement="left"
                                      title={
                                        fileList?.length !== 0
                                          ? fileList
                                          : "ว่างเปล่า"
                                      }
                                    >
                                      <Button
                                        icon={<UploadOutlined />}
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {fileList?.length !== 0 ? (
                                          <div
                                            style={{
                                              maxWidth: "100px",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            {fileList}
                                          </div>
                                        ) : (
                                          "อัพโหลดไฟล์"
                                        )}
                                      </Button>
                                    </Tooltip>
                                  </Upload> */}
                                </Form.Item>
                              </Col>

                              <Col
                                xs={2}
                                sm={2}
                                md={2}
                                lg={2}
                                xl={2}
                                xxl={2}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                }}
                              >
                                <Form.Item>
                                  <Popconfirm
                                    placement="topRight"
                                    title="ลบออกจากระบบ"
                                    description="คุณยืนยันที่จะลบ ใช่ไหม"
                                    okText="ใช่ ลบเลย"
                                    onConfirm={() => {
                                      if (dataEdit.length === 0) {
                                        remove(name);
                                      } else {
                                        const find = dataEdit.subsections[key];
                                        // console.log("find", JSON.stringify(find));
                                        if (find !== undefined) {
                                          removeSubsection(find.id).then(() => {
                                            remove(name);
                                            setFiles(
                                              files.filter(
                                                (_: any, i: number) => i !== key
                                              )
                                            );
                                          });
                                        } else {
                                          remove(name);
                                        }
                                      }
                                    }}
                                    cancelText="ยกเลิก"
                                  >
                                    <Button
                                      type="dashed"
                                      icon={<MinusCircleOutlined />}
                                      color="whtie"
                                    ></Button>
                                  </Popconfirm>
                                </Form.Item>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      );
                    })}
                    <Col span={12} style={{ marginTop: 15 }}>
                      <Form.Item>
                        <HappyProvider>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            icon={<PlusOutlined />}
                            style={{
                              borderRadius: 50,
                            }}
                          >
                            เพิ่มหัวข้อย่อย
                          </Button>
                        </HappyProvider>
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Form.List>
            </Row>

            {/* <div
              style={{
                marginTop: 40,
              }}
            >
              <MySave
                functionSave={() => {
                  form.submit();
                }}
              />
            </div> */}
            <HappyProvider>
              <Button
                style={{
                  marginTop: 40,
                  borderRadius: 50,
                }}
                color="whtie"
                onClick={() => {
                  form.submit();
                }}
              >
                บันทึก
              </Button>
            </HappyProvider>
          </Form>
        </>
      )}
    </>
  );
};

export default observer(SecretSection);
