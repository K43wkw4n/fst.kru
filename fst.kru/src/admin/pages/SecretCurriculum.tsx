import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  Button,
  Card,
  Col,
  Collapse,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Switch,
  Tooltip,
  Upload,
  message,
} from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  ShowRemoveConfirm,
  notify,
  showConfirm,
} from "../../helper/components";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "dayjs/locale/th";
import locale from "antd/lib/locale/th_TH";
import dayjs from "dayjs";
import { useStore } from "../../store/store";
import DataTable from "../../components/DataTable";
import moment from "moment";
import { HttpStatusCode } from "axios";
import MyTitleAdmin from "../../components/MyTitleAdmin";
import { getColumnSearchProps } from "../../components/Search";
import { pathImages } from "../../constants/RoutePath";
import MyRemovePop from "../../components/MyRemovePop";
import MyButton from "../../components/MyButton";
import MySave from "../../components/MySave";
import { TitlePath } from "../../constants/TitlePath";

const props = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  fileList: [],
  onChange(info: any) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  accept: ".pdf", // กำหนดประเภทของไฟล์ที่ยอมรับ (PDF)
};

const SecretCurriculum = () => {
  const [form] = Form.useForm();
  const {
    currentBranchId,
    curriculum,
    getCurriculumByIdAdmin,
    createUpdateCurriculum,
    uploadFile,
    removeCurriculum,
    removeSubjectGroup,
    removeSubSubjectGroup,
    removeGeneralTopic,
    removeSubGeneralTopic,
  } = useStore().BranchStore;

  const [dataEdit, setDataEdit] = useState<any>([]);
  const [formMode, setFormMode] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  const [datePicker, setDatePicker]: any = useState<dayjs.Dayjs | null>(
    dataEdit.id === undefined
      ? dayjs(Date.now()).add(543, "year")
      : dayjs(dataEdit.year)
  );

  useEffect(() => {
    getCurriculumByIdAdmin(Number(currentBranchId));
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (dataEdit.length === 0) {
        form.setFieldsValue({
          curriculumTH: "",
          curriculumEN: "",
          year: datePicker.format(),
          file: null,
          generalTopics: [],
          subjectGroups: [],
        });
      } else {
        form.setFieldsValue({
          curriculumTH: dataEdit.curriculumTH,
          curriculumEN: dataEdit.curriculumEN,
          year: dataEdit.year,
          file: dataEdit.file,
          generalTopics: dataEdit.generalTopics,
          subjectGroups: dataEdit.subjectGroups,
        });
      }
    }
    setDatePicker(
      dataEdit.id === undefined
        ? dayjs(Date.now()).add(543, "year")
        : dayjs(dataEdit.year)
    );
  }, [form, formMode, isFormInitialized]);

  const onFinish = async (values: any) => {
    console.log("values", values);

    const formattedData = {
      id: dataEdit.id || 0,
      curriculumTH: values.curriculumTH,
      curriculumEN: values.curriculumEN,
      year: datePicker.format(),
      file:
        dataEdit.file === null || dataEdit.file === undefined
          ? null
          : dataEdit.file,
      branchId: Number(currentBranchId),
      generalTopics: values.generalTopics.map((generalTopic: any) => ({
        id: generalTopic.id || 0,
        name: generalTopic.name,
        isUsed:
          generalTopic.isUsed === true || generalTopic.isUsed === 1 ? 1 : 0,
        curriculumId: values.id || 0,
        subGeneralTopics:
          generalTopic.subGeneralTopics &&
          generalTopic.subGeneralTopics.map((subGeneralTopic: any) => ({
            id: subGeneralTopic.id || 0,
            name: subGeneralTopic.name,
            generalTopicsId: generalTopic.id || 0,
          })),
      })),
      subjectGroups: values.subjectGroups.map((subjectGroup: any) => ({
        id: subjectGroup.id || 0,
        name: subjectGroup.name,
        curriculumId: values.id || 0,
        subSubjectGroups:
          subjectGroup.subSubjectGroups &&
          subjectGroup.subSubjectGroups.map((subSubjectGroup: any) => ({
            id: subSubjectGroup.id || 0,
            name: subSubjectGroup.name,
            credit: subSubjectGroup.credit || 0,
            subjectGroupId: subjectGroup.id || 0,
          })),
      })),
    };

    const map = curriculum.map((item: any) => {
      return dayjs(item?.year).format("YYYY") === datePicker.format("YYYY");
    });

    if (dataEdit.id === undefined) {
      if (map.find((x: any) => x === true) !== undefined) {
        notify("ปีหลักสูตรนี้ได้มีการสร้างไปแล้ว");
      } else {
        await createUpdateCurriculum(formattedData).then((e: any) => {
          if (e.statusCode === HttpStatusCode.Ok) {
            getCurriculumByIdAdmin(Number(currentBranchId));
            handleSetMode();
            setDataEdit([]);
          } else {
            notify("มีบางอย่างผิดพลาด");
          }
        });
      }
    } else {
      await createUpdateCurriculum(formattedData).then((e: any) => {
        if (e.statusCode === HttpStatusCode.Ok) {
          getCurriculumByIdAdmin(Number(currentBranchId));
          handleSetMode();
          setDataEdit([]);
        } else {
          notify("มีบางอย่างผิดพลาด");
        }
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const onChange = (selectedDate: dayjs.Dayjs | null) => {
    console.log("datePicker selected : ", dayjs(selectedDate).format("YYYY"));
    setDatePicker(selectedDate);
  };

  const columns: any = [
    {
      id: 1,
      title: "ชื่อหลักสูตรภาษาไทย",
      dataIndex: "curriculumTH",
      key: "curriculumTH",
      ...getColumnSearchProps("curriculumTH"),
    },
    {
      id: 2,
      title: "ชื่อหลักสูตรอังกฤษ",
      dataIndex: "curriculumEN",
      key: "curriculumEN",
      ...getColumnSearchProps("curriculumEN"),
    },
    {
      id: 3,
      title: "ปีของหลักสูตร",
      dataIndex: "yearFormat",
      key: "yearFormat",
      // render: (e: any) => <div>{moment(e.year).format("YYYY")}</div>,
      ...getColumnSearchProps("yearFormat", null, 3),
      width: 160,
      align: "center",
    },
    {
      id: "pdf",
      title: "คำสั่งแต่งตั้ง",
      dataIndex: "",
      key: "file",
      align: "center",
      render: (e: any) => (
        <HappyProvider key={`delete-${e.id}`}>
          <Button
            color="whtie"
            href={pathImages.uploadFile + e.file}
            target="_blank"
            disabled={!e.file}
          >
            ดู
          </Button>
        </HappyProvider>
      ),
      width: 140,
    },
    {
      id: 5,
      title: "แก้ไข",
      dataIndex: "",
      key: "edit",
      align: "center",
      render: (e: any) => (
        <MyButton
          functionOnClick={() => {
            handleEdit(e);
            setIsFormInitialized(true);
          }}
          title="แก้ไข"
        />
      ),
      width: 90,
    },
    {
      id: 6,
      title: "ลบ",
      dataIndex: "",
      key: "delete",
      align: "center",
      render: (e: any) => (
        <MyRemovePop functionRemove={() => removeCurriculum(e.id)} />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Button
        //     color="whtie"
        //     onClick={() =>
        //       ShowRemoveConfirm(
        //         "หลักสูตร",
        //         e.curriculumTH,
        //         e.id,
        //         removeCurriculum
        //       )
        //     }
        //   >
        //     ลบ
        //   </Button>
        // </HappyProvider>
      ),
      width: 80,
    },
  ];

  // const itemsGeneralTopics: CollapseProps["items"] =
  //   curriculum.length === 0
  //     ? []
  //     : curriculum?.generalTopics.map((item: GeneralTopics) => {
  //         return {
  //           key: item.id,
  //           label: (
  //             <div
  //               style={{
  //                 display: "flex",
  //                 justifyContent: "space-between",
  //               }}
  //             >
  //               <div>{item.name}</div>
  //             </div>
  //           ),
  //           children: (
  //             <>
  //               {item.subGeneralTopics.map((item: SubGeneralTopics, i) => (
  //                 <Card key={i} size="small" style={{ marginBottom: 5 }}>
  //                   {item.name}
  //                 </Card>
  //               ))}
  //               <div
  //                 style={{
  //                   display: "flex",
  //                   justifyContent: "space-evenly",
  //                 }}
  //               >
  //                 <LiaEdit
  //                   size={30}
  //                   onClick={() => {
  //                     setOpen(true);
  //                   }}
  //                   style={{
  //                     cursor: "pointer",
  //                   }}
  //                 />
  //                 <CiCircleRemove
  //                   size={30}
  //                   onClick={() => alert("remove")}
  //                   style={{
  //                     cursor: "pointer",
  //                   }}
  //                 />
  //               </div>
  //             </>
  //           ),
  //         };
  //       });

  const handleSetMode = () => setFormMode(!formMode);

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    handleSetMode();
  };

  // console.log("curriculum :L", JSON.stringify(curriculum));

  const onChangeFile = async (info: any) => {
    const uploadedFileName = info.file.originFileObj;

    await uploadFile({ file: uploadedFileName }).then((e) => {
      setDataEdit({ ...dataEdit, file: e });
    });
  };

  // const handleRemoveSubSubject = (keyObject: any, key: any) => {
  //   const find = dataEdit.subjectGroups[keyObject].subSubjectGroups[key];
  //   console.log("find", JSON.stringify(find));
  //   if (find !== undefined) {
  //     ShowRemoveConfirm("ชื่อกลุ่มวิชาย่อย", find.name, find.id, null);
  //   }
  // };

  const data = curriculum.map((item) => {
    const newData = {
      yearFormat: dayjs(item.year).format("YYYY"),
    };

    return { ...newData, ...item };
  });

  console.log("data", data);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <MyTitleAdmin name={TitlePath.curriculum} />
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
          <DataTable data={data} columns={columns} sizeX={1300} />
        </>
      ) : (
        <>
          <Form
            form={form}
            name="curriculum"
            initialValues={{
              ...dataEdit,
              year: dataEdit.year
                ? dayjs(dataEdit.year).format("YYYY")
                : dayjs(Date.now()).add(543, "year"),
              generalTopics: dataEdit.generalTopics || [],
              subjectGroups: dataEdit.subjectGroups || [],
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
                <Form.Item
                  label="ชื่อหลักสูตรภาษาไทย"
                  name="curriculumTH"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกชื่อหลักสูตรภาษาไทย",
                    },
                  ]}
                >
                  <Input placeholder="ชื่อหลักสูตรภาษาไทย" />
                </Form.Item>
                <Divider />
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Form.Item
                  label="ปีของหลักสูตร"
                  name="year"
                  rules={[
                    { required: true, message: "กรุณากรอกปีของหลักสูตร" },
                  ]}
                >
                  <ConfigProvider locale={locale}>
                    <DatePicker
                      id="year"
                      style={{ maxWidth: "100%" }}
                      onChange={onChange}
                      defaultValue={datePicker}
                      value={datePicker}
                      picker="year"
                      allowClear={false}
                    />
                  </ConfigProvider>
                </Form.Item>
                <Divider />
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
                <Form.Item
                  label="ชื่อหลักสูตรภาษาอังกฤษ"
                  name="curriculumEN"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกชื่อหลักสูตรภาษาอังกฤษ",
                    },
                  ]}
                >
                  <Input placeholder="ชื่อหลักสูตรภาษาอังกฤษ" />
                </Form.Item>
                <Divider />
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                <Form.Item
                  label="ไฟล์ PDF"
                  // name="file"
                  // rules={[{ required: true, message: "กรุณากรอกไฟล์ PDF" }]}
                >
                  <Upload {...props} onChange={onChangeFile}>
                    <Tooltip
                      placement="left"
                      title={
                        dataEdit.file
                          ? dataEdit.file.name !== undefined
                            ? dataEdit.file.name
                            : dataEdit.file
                          : "ว่างเปล่า"
                      }
                    >
                      <Button
                        icon={<UploadOutlined />}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {dataEdit.file ? (
                          <div
                            style={{
                              maxWidth: "100px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {dataEdit.file.name !== undefined
                              ? dataEdit.file.name
                              : dataEdit.file}
                          </div>
                        ) : (
                          "อัพโหลดไฟล์"
                        )}
                      </Button>
                    </Tooltip>
                  </Upload>
                  {/* {dataEdit.file && (
                        <a
                          href={pathImages.uploadFile + dataEdit.file}
                          target="_blank"
                        >
                          ดู
                        </a>
                      )} */}
                  <Divider />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Form.List name="generalTopics">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key}>
                          <Card
                            style={{
                              marginBottom: 30,
                              backgroundColor: "#F3F8FF",
                            }}
                          >
                            {/* <Row gutter={8}> */}
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                              <Col span={18}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "name"]}
                                  label={`หัวข้อทั่วไป`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "กรุณากรอกหัวข้อทั่วไป",
                                    },
                                  ]}
                                >
                                  <Input placeholder="หัวข้อทั่วไป" />
                                </Form.Item>
                              </Col>

                              <Col
                                span={4}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                }}
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "isUsed"]}
                                  valuePropName="checked"
                                >
                                  <Switch
                                    checkedChildren="แสดง"
                                    unCheckedChildren="ซ่อน"
                                    defaultChecked={true}
                                  />
                                </Form.Item>
                              </Col>

                              <Col
                                span={2}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                }}
                              >
                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={() => {
                                      const find = dataEdit.generalTopics[key];
                                      console.log("find", JSON.stringify(find));
                                      if (find !== undefined) {
                                        showConfirm(
                                          "ลบหัวข้อทั่วไป",
                                          find.name,
                                          find.id,
                                          removeGeneralTopic,
                                          remove,
                                          name
                                        );
                                      } else {
                                        remove(name);
                                      }
                                    }}
                                    icon={<MinusCircleOutlined />}
                                  ></Button>
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                              <Col span={24}>
                                <Form.List name={[name, "subGeneralTopics"]}>
                                  {(
                                    subGeneralTopicsFields,
                                    { add: addSubGeneralTopic, remove }
                                  ) => (
                                    <>
                                      {subGeneralTopicsFields.map(
                                        (subGeneralTopicField) => (
                                          <div key={subGeneralTopicField.key}>
                                            <Row
                                              gutter={{
                                                xs: 8,
                                                sm: 16,
                                                md: 24,
                                                lg: 14,
                                              }}
                                            >
                                              <Col span={22}>
                                                <Form.Item
                                                  {...subGeneralTopicField}
                                                  name={[
                                                    subGeneralTopicField.name,
                                                    "name",
                                                  ]}
                                                  label={`หัวข้อย่อยทั่วไป`}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "กรุณากรอกหัวข้อย่อยทั่วไป",
                                                    },
                                                  ]}
                                                >
                                                  <Input placeholder="หัวข้อย่อยทั่วไป" />
                                                </Form.Item>
                                              </Col>
                                              <Col
                                                span={2}
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "end",
                                                }}
                                              >
                                                <Form.Item>
                                                  <Button
                                                    type="dashed"
                                                    onClick={() => {
                                                      const find =
                                                        dataEdit.generalTopics[
                                                          key
                                                        ].subGeneralTopics[
                                                          subGeneralTopicField
                                                            .key
                                                        ];
                                                      if (find !== undefined) {
                                                        showConfirm(
                                                          "ลบหัวข้อย่อยทั่วไป",
                                                          find.name,
                                                          find.id,
                                                          removeSubGeneralTopic,
                                                          remove,
                                                          subGeneralTopicField.name
                                                        );
                                                      } else {
                                                        remove(
                                                          subGeneralTopicField.name
                                                        );
                                                      }
                                                    }}
                                                    icon={
                                                      <MinusCircleOutlined />
                                                    }
                                                  ></Button>
                                                </Form.Item>
                                              </Col>
                                            </Row>
                                          </div>
                                        )
                                      )}
                                      <Form.Item>
                                        <HappyProvider>
                                          <Button
                                            type="dashed"
                                            onClick={() => addSubGeneralTopic()}
                                            icon={<PlusOutlined />}
                                            style={{
                                              borderRadius: 50,
                                            }}
                                          >
                                            เพิ่มหัวข้อย่อยทั่วไป
                                          </Button>
                                        </HappyProvider>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </Col>
                            </Row>
                          </Card>
                          <Divider />
                        </div>
                      ))}

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
                            เพิ่มหัวข้อทั่วไป
                          </Button>
                        </HappyProvider>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Form.List name="subjectGroups">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key}>
                          <Card
                            style={{
                              marginBottom: 30,
                              backgroundColor: "#F3F8FF",
                            }}
                          >
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                              <Col span={22}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "name"]}
                                  label={`ชื่อกลุ่มวิชา`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "กรุณากรอกชื่อกลุ่มวิชา",
                                    },
                                  ]}
                                >
                                  <Input placeholder="ชื่อกลุ่มวิชา" />
                                </Form.Item>
                              </Col>
                              <Col
                                span={2}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                }}
                              >
                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={() => {
                                      const find = dataEdit.subjectGroups[key];
                                      if (find !== undefined) {
                                        showConfirm(
                                          "ลบชื่อกลุ่มวิชา",
                                          find.name,
                                          find.id,
                                          removeSubjectGroup,
                                          remove,
                                          name
                                        );
                                      } else {
                                        remove(name);
                                      }
                                    }}
                                    icon={<MinusCircleOutlined />}
                                  ></Button>
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                              <Col span={24}>
                                <Form.List name={[name, "subSubjectGroups"]}>
                                  {(
                                    subSubjectGroupsFields,
                                    { add: addSubSubjectGroup, remove }
                                  ) => (
                                    <>
                                      {subSubjectGroupsFields.map(
                                        (subSubjectGroupField) => (
                                          <div key={subSubjectGroupField.key}>
                                            <Row
                                              gutter={{
                                                xs: 8,
                                                sm: 16,
                                                md: 24,
                                                lg: 14,
                                              }}
                                            >
                                              <Col
                                                xs={16}
                                                sm={16}
                                                md={18}
                                                lg={16}
                                                xl={17}
                                                xxl={18}
                                              >
                                                <Form.Item
                                                  {...subSubjectGroupField}
                                                  name={[
                                                    subSubjectGroupField.name,
                                                    "name",
                                                  ]}
                                                  label={`ชื่อกลุ่มวิชาย่อย`}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "กรุณากรอกชื่อกลุ่มวิชาย่อย",
                                                    },
                                                  ]}
                                                >
                                                  <Input placeholder="ชื่อกลุ่มวิชาย่อย" />
                                                </Form.Item>
                                              </Col>
                                              <Col
                                                xs={6}
                                                sm={6}
                                                md={4}
                                                lg={6}
                                                xl={5}
                                                xxl={4}
                                              >
                                                <Form.Item
                                                  {...subSubjectGroupField}
                                                  name={[
                                                    subSubjectGroupField.name,
                                                    "credit",
                                                  ]}
                                                  label={`หน่วยกิจ`}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "กรุณากรอกหน่วยกิจ",
                                                    },
                                                  ]}
                                                  initialValue={1}
                                                >
                                                  <InputNumber
                                                    min={1}
                                                    placeholder="หน่วยกิจ"
                                                    style={{ width: "100%" }}
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <Col
                                                span={2}
                                                style={{
                                                  display: "flex",
                                                  alignItems: "end",
                                                }}
                                              >
                                                <Form.Item>
                                                  <Button
                                                    type="dashed"
                                                    onClick={() => {
                                                      const find =
                                                        dataEdit.subjectGroups[
                                                          key
                                                        ].subSubjectGroups[
                                                          subSubjectGroupField
                                                            .key
                                                        ];
                                                      if (find !== undefined) {
                                                        showConfirm(
                                                          "ลบชื่อกลุ่มวิชาย่อย",
                                                          find.name,
                                                          find.id,
                                                          removeSubSubjectGroup,
                                                          remove,
                                                          subSubjectGroupField.name
                                                        );
                                                      } else {
                                                        remove(
                                                          subSubjectGroupField.name
                                                        );
                                                      }
                                                    }}
                                                    icon={
                                                      <MinusCircleOutlined />
                                                    }
                                                  ></Button>
                                                </Form.Item>
                                              </Col>
                                            </Row>
                                          </div>
                                        )
                                      )}
                                      <Form.Item>
                                        <HappyProvider>
                                          <Button
                                            type="dashed"
                                            onClick={() => addSubSubjectGroup()}
                                            icon={<PlusOutlined />}
                                            style={{
                                              borderRadius: 50,
                                            }}
                                          >
                                            เพิ่มชื่อกลุ่มวิชาย่อย
                                          </Button>
                                        </HappyProvider>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </Col>
                            </Row>
                          </Card>
                          <Divider />
                        </div>
                      ))}
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
                            เพิ่มชื่อกลุ่มวิชา
                          </Button>
                        </HappyProvider>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>

            <div
              style={{
                marginTop: 40,
              }}
            >
              {/* <MySave
                functionSave={() => {
                  form.submit();
                }}
              /> */}
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
            </div>
          </Form>
        </>
      )}
    </>
  );
};

export default observer(SecretCurriculum);
