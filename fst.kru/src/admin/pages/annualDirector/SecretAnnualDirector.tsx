import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import { useStore } from "../../../store/store";
import { AnnualDirectorM } from "../../../models/AnnualDirectorM";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  Popconfirm,
  Row,
  Select,
  Switch,
  Tag,
  Tooltip,
  Upload,
} from "antd";
import { FaRegUser } from "react-icons/fa6";
import { pathImages } from "../../../constants/RoutePath";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { notify, props, showConfirm } from "../../../helper/components";
import "dayjs/locale/th";
import locale from "antd/lib/locale/th_TH";
import dayjs from "dayjs";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { SelectProps } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import MyRemovePop from "../../../components/MyRemovePop";
import { getColumnSearchProps } from "../../../components/Search";
import MyButton from "../../../components/MyButton";
import MySave from "../../../components/MySave";
import { TitlePath } from "../../../constants/TitlePath";

const SecretAnnualDirector = () => {
  const [form] = Form.useForm();

  const {
    annualDirectorByType,
    getAnnualDirectorType,
    isUsedAnnDirector,
    removeAnnualDirector,
    director,
    getDirector,
    uploadFileAnnualDirector,
    createUpdateAnnualDirector,
    isUsedDirectorType,
    removeDirectorType,
  } = useStore().annualDirectorStore;

  const [dataEdit, setDataEdit] = useState<any>([]);
  const [formMode, setFormMode] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  const [files, setFiles]: any = useState<Record<string, UploadFile[]>>({});

  const [datePicker, setDatePicker]: any = useState<
    Record<string, dayjs.Dayjs[]>
  >({});

  const [options, setOptions] = useState<SelectProps["options"]>([]);

  useEffect(() => {
    getAnnualDirectorType();
    // getDirectorType();
    getDirector();
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (dataEdit.length !== 0) {
        form.setFieldsValue({
          directorType: dataEdit.name,
          annualDirectors: dataEdit.annualDirectors,
          pdf: dataEdit.annualDirectors.map((item: any) => {
            return item.pdf || null;
          }),
        });
        setFiles(
          dataEdit.annualDirectors.map((item: any) => {
            return item.pdf || null;
          })
        );
        setDatePicker(
          dataEdit.annualDirectors.map((item: any) => {
            return item.year || null;
          })
        );
        // setOptions(
        //   director
        //     // .filter((item) =>
        //     //   dataEdit?.annualDirectors?.some(
        //     //     (editDirector: AnnualDirectorM) =>
        //     //       editDirector.directorId !== item.id
        //     //   )
        //     // )
        //     .map((item) => ({ label: item.fullName, value: item.id }))
        // );
      } else {
        form.setFieldsValue({
          directorType: null,
          annualDirectors: [],
          pdf: null,
        });
        setFiles([]);
        setDatePicker([]);
      }
      setOptions(
        director
          // .filter(
          //   (director) =>
          //     !dataEdit.annualDirectors.some(
          //       (d) => d.directorId === director.id
          //     )
          // )
          .map((item) => ({
            label: item.fullName,
            value: item.id,
          }))
      );
    }
  }, [dataEdit, form, isFormInitialized]);

  const findDuplicateDirectorIds = (data: any[]) => {
    const directorIds: number[] = [];
    const duplicates: number[] = [];

    data.forEach((item) => {
      if (directorIds.includes(item.directorId)) {
        if (!duplicates.includes(item.directorId)) {
          duplicates.push(item.directorId);
        }
      } else {
        directorIds.push(item.directorId);
      }
    });

    return duplicates;
  };

  console.log("datePicker", datePicker);

  const onFinish = async (values: any) => {
    console.log("values", values);

    const formattedData = {
      id: parseInt(dataEdit.id) || 0,
      name: values.directorType || "",
      annualDirectors: values.annualDirectors.map((item: any, i: number) => ({
        id: item.id || 0,
        year:
          datePicker[i] !== undefined
            ? datePicker[i]
            : dayjs(new Date()).add(543, "year"),
        pdf: files[i] || null,
        isUsed: item.isUsed === undefined ? true : item.isUsed,
        directorTypeId: parseInt(dataEdit.id) || 0,
        directorId: values.directorId || item.directorId || 0,
      })),
    };

    // เรียกใช้ฟังก์ชันเพื่อหา directorId ที่ซ้ำกัน
    const duplicateDirectorIds = findDuplicateDirectorIds(
      formattedData.annualDirectors
    );

    if (duplicateDirectorIds.length) {
      duplicateDirectorIds.map((item) => {
        const name = director.find((x: any) => x.id === item);
        return notify(`มีกรรมการ ${name?.fullName} ที่ซ้ำกัน`);
      });
    } else {
      // console.log("pre send formData", formattedData);
      createUpdateAnnualDirector(formattedData).then(() => {
        handleSetMode();
        setDataEdit([]);
        setFiles([]);
      });
      console.log("formattedData", formattedData);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const handleSetMode = () => setFormMode(!formMode);

  const expandedRowRender = (record: any) => {
    const columns: any = [
      {
        id: "directorName",
        title: "ชื่อกรรมการ",
        key: "directorName",
        dataIndex: "",
        render: (e: any) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: 10 }}>
              {e.imageName ? (
                <Image
                  height={30}
                  width={30}
                  style={{ borderRadius: 100 }}
                  src={`${pathImages.director}${e.imageName}`}
                />
              ) : (
                <FaRegUser size={25} />
              )}
            </div>
            <div>
              <div>{e.fullName}</div>
            </div>
          </div>
        ),
      },
      {
        id: "position",
        title: "ตำแหน่ง",
        key: "position",
        dataIndex: "position",
      },
      {
        id: "year",
        title: "ปีที่แต่งตั้ง",
        key: "year",
        dataIndex: "year",
        align: "center",
        width: 110,
      },
      {
        id: "isUsed",
        title: "แสดง",
        dataIndex: "",
        key: "isUsed",
        align: "center",
        width: 80,
        render: (e: any) => {
          return (
            <Switch
              checkedChildren="แสดง"
              unCheckedChildren="ซ่อน"
              defaultChecked={e.isUsed}
              onClick={() => isUsedAnnDirector(e.id)}
            />
          );
        },
      },
      {
        id: "pdf",
        title: "คำสั่งแต่งตั้ง",
        dataIndex: "",
        key: "pdf",
        align: "center",
        render: (e: any) => (
          <HappyProvider key={`delete-${e.id}`}>
            <Button
              color="whtie"
              href={pathImages.annualDirectorPDF + e.pdf}
              target="_blank"
              disabled={!e.pdf}
            >
              ดู
            </Button>
          </HappyProvider>
        ),
        width: 140,
      },
      {
        id: "delete",
        title: "ลบ",
        dataIndex: "",
        key: "delete",
        align: "center",
        render: (e: any) => (
          <MyRemovePop functionRemove={() => removeAnnualDirector(e.id)} />
          // <HappyProvider key={`delete-${e.id}`}>
          //   <Popconfirm
          //     placement="topRight"
          //     title="ลบออกจากระบบ"
          //     description="คุณยืนยันที่จะลบ ใช่ไหม"
          //     okText="ใช่ ลบเลย"
          //     onConfirm={() => removeAnnualDirector(e.id)}
          //     cancelText="ยกเลิก"
          //   >
          //     <Button color="whtie">ลบ</Button>
          //   </Popconfirm>
          // </HappyProvider>
        ),
        width: 80,
      },
    ];

    const data = record.annualDirectors.map((item: AnnualDirectorM) => {
      return {
        id: item.id,
        fullName: item.director.fullName,
        position: item.director.position.positionName,
        imageName: item.director.imageName,
        isUsed: item.isUsed,
        year: dayjs(item.year).format("YYYY"),
        pdf: item.pdf,
      };
    });

    // const dataT = data.map((item) => {
    //   return item.annualDirector.map((item) => {
    //     return {
    //       id: item.directorId,
    //     };
    //   });
    // });

    return (
      <DataTable data={data} columns={columns} pagination={false} sizeX={900} />
    );
  };

  const data = annualDirectorByType;

  // const columns: any = [
  //   {
  //     id: 1,
  //     title: "ภาคการศึกษาที่",
  //     dataIndex: "semester",
  //     key: "semester",
  //   },
  //   {
  //     id: 2,
  //     title: "อาจารย์",
  //     dataIndex: "",
  //     key: "",
  //     align: "center",
  //   },
  //   {
  //     id: 2,
  //     title: "ประเภท มคอ.",
  //     dataIndex: "categoryName",
  //     key: "categoryName",
  //     align: "center",
  //   },
  //   {
  //     id: 3,
  //     title: "รหัสรายวิชา",
  //     dataIndex: "courseCode",
  //     key: "courseCode",
  //     align: "center",
  //   },
  //   {
  //     id: 5,
  //     title: "ชื่อรายวิชา",
  //     dataIndex: "courseName",
  //     key: "courseName",
  //     align: "center",
  //   },
  //   {
  //     id: 5,
  //     title: "แก้ไข",
  //     dataIndex: "",
  //     key: "",
  //     align: "center",
  //     render: (_e: any) => (
  //       <HappyProvider>
  //         <Button
  //           color="whtie"
  //           onClick={() => {
  //             // handleEdit(e);
  //             // setFile(e.pdf);
  //             // setCategory(e.categoryCourseSpecificationId);
  //             // setIsFormInitialized(true);
  //           }}
  //         >
  //           แก้ไข
  //         </Button>
  //       </HappyProvider>
  //     ),
  //     fixed: "right",
  //     width: 90,
  //   },
  //   {
  //     id: 6,
  //     title: "ลบ",
  //     dataIndex: "",
  //     key: "",
  //     align: "center",
  //     render: (e: any) => (
  //       <HappyProvider key={`delete-${e.id}`}>
  //         <Popconfirm
  //           placement="topRight"
  //           title="ลบ มคอ."
  //           description="คุณยืนยันที่จะลบ มคอ. นี้ใช่ไหม"
  //           okText="ใช่ ลบเลย"
  //           // onConfirm={() => removeCourseSpecification(e.id)}
  //           cancelText="ยกเลิก"
  //         >
  //           <Button color="whtie">ลบ</Button>
  //         </Popconfirm>
  //       </HappyProvider>
  //     ),
  //     fixed: "right",
  //     width: 80,
  //   },
  // ];

  const onChange = (selectedDate: dayjs.Dayjs | null, name: number) => {
    setDatePicker((prevState: any) => ({
      ...prevState,
      [name]: dayjs(selectedDate).format(),
    }));
  };

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    handleSetMode();
  };

  const columns: any = [
    {
      id: "name",
      title: "ชุดคณะกรรมการ",
      key: "name",
      dataIndex: "",
      ...getColumnSearchProps("name", (text: string, record: any) => (
        <div
          style={{
            display: "flex",
          }}
        >
          <div>{text}</div>
          <div
            style={{
              marginLeft: 20,
            }}
          >
            {!record.annualDirectors.length && (
              <span>
                <Tag color="red">ไม่มีกรรมการ</Tag>
              </span>
            )}
          </div>
        </div>
      )),
    },
    {
      id: "isUsed",
      title: "แสดง",
      dataIndex: "",
      key: "isUsed", // เปลี่ยน key เป็น "isUsed"
      align: "center",
      width: 80,
      render: (e: any) => {
        return (
          <Switch
            checkedChildren="แสดง"
            unCheckedChildren="ซ่อน"
            defaultChecked={e.isUsed}
            onClick={() => isUsedDirectorType(e.id)}
          />
        );
      },
    },
    {
      id: "edit",
      title: "แก้ไข",
      dataIndex: "",
      key: "edit", // เปลี่ยน key เป็น "edit"
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
      // fixed: "right",
      width: 90,
    },
    {
      id: "delete",
      title: "ลบ",
      dataIndex: "",
      key: "delete", // เปลี่ยน key เป็น "delete"
      align: "center",
      render: (e: any) => {
        return (
          <MyRemovePop
            functionRemove={() => removeDirectorType(e.id)}
            disabled={e.annualDirectors.length ? true : false}
            titleTooltip={2}
          />
          // <HappyProvider key={`delete-${e.id}`}>
          //   <Popconfirm
          //     placement="topRight"
          //     title="ลบออกจากระบบ"
          //     description="คุณยืนยันที่จะลบ ใช่ไหม"
          //     okText="ใช่ ลบเลย"
          //     onConfirm={() => removeDirectorType(e.id)}
          //     cancelText="ยกเลิก"
          //     disabled={e.annualDirectors.length ? true : false}
          //   >
          //     <Button
          //       color="whtie"
          //       disabled={e.annualDirectors.length ? true : false}
          //     >
          //       ลบ
          //     </Button>
          //   </Popconfirm>
          // </HappyProvider>
        );
      },
      width: 80,
    },
  ];

  const onChangeFile = async (info: any, name: number) => {
    const uploadedFileName = info.file.originFileObj;

    await uploadFileAnnualDirector({
      file: uploadedFileName,
    }).then((e) => {
      setFiles((prevState: any) => ({
        ...prevState,
        [name]: e,
      }));
    });
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <MyTitleAdmin name={TitlePath.annualDirector} />
        {!formMode ? (
          <MyButton
            functionOnClick={() => {
              handleSetMode();
              setIsFormInitialized(true);
            }}
            title="เพิ่ม"
          />
        ) : (
          // <HappyProvider>
          //   <Button
          //     color="whtie"
          //     onClick={() => {
          //       handleSetMode();
          //       setIsFormInitialized(true);
          //     }}
          //   >
          //     เพิ่ม
          //   </Button>
          // </HappyProvider>
          <MyButton
            functionOnClick={() => {
              handleSetMode();
              setDataEdit([]);
              setFiles([]);
              setIsFormInitialized(false);
            }}
            title="กลับ"
          />
          // <HappyProvider>
          //   <Button
          //     color="whtie"
          //     onClick={() => {
          //       handleSetMode();
          //       setDataEdit([]);
          //       setFiles([]);
          //       setIsFormInitialized(false);
          //     }}
          //   >
          //     กลับ
          //   </Button>
          // </HappyProvider>
        )}
      </div>
      {!formMode ? (
        <>
          <DataTable
            data={data}
            columns={columns}
            sizeX={800}
            expandedRowRender={expandedRowRender}
          />
        </>
      ) : (
        <>
          <Form
            form={form}
            name="secretAnnualDirector"
            initialValues={{
              ...dataEdit,
              directorType: dataEdit.name || null,
              annualDirectors: dataEdit.annualDirectors || [],
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
              <Col span={24}>
                <Form.Item
                  label="ชุดคณะกรรมการ"
                  name="directorType"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกชุดคณะกรรมการ",
                    },
                  ]}
                  style={{
                    width: "100%",
                  }}
                >
                  <Input placeholder="ชุดคณะกรรมการ" />
                </Form.Item>
              </Col>
            </Row>

            <Form.List name="annualDirectors">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    const fileEach: any = files[name] || [];
                    const dateEach: any =
                      datePicker[name] !== undefined
                        ? datePicker[name]
                        : dayjs(datePicker[name]).add(543, "year");
                    // dayjs(datePicker[name]).add(543, "year") || [];

                    console.log("dateEach", dateEach);

                    return (
                      <div key={key}>
                        <Card
                          hoverable
                          style={{
                            marginBottom: 30,
                            backgroundColor: "#F3F8FF",
                          }}
                        >
                          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                            <Col
                              xs={24}
                              sm={24}
                              md={24}
                              lg={12}
                              xl={14}
                              xxl={14}
                            >
                              <Form.Item
                                {...restField}
                                name={[name, "directorId"]}
                                label={`กรรมการ`}
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณาเลือกกรรมการ",
                                  },
                                ]}
                              >
                                <Select
                                  // mode="multiple"
                                  // allowClear
                                  style={{ width: "100%" }}
                                  placeholder="เลือกกรรมการ"
                                  // defaultValue={["a10", "c12"]}
                                  onChange={handleChange}
                                  options={options}
                                />
                              </Form.Item>
                            </Col>

                            <Col xs={12} sm={12} md={8} lg={4} xl={3} xxl={3}>
                              <Form.Item
                                {...restField}
                                // name={[name, "year"]}
                                name="year"
                                label={`ปีที่แต่งตั้ง`}
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: "กรุณากรอกปีที่แต่งตั้ง",
                                //   },
                                // ]}
                              >
                                <ConfigProvider locale={locale}>
                                  <DatePicker
                                    id="year"
                                    style={{ width: "100%" }}
                                    onChange={(e) => onChange(e, name)}
                                    // defaultValue={dayjs(dateEach)}
                                    value={dayjs(dateEach)}
                                    picker="year"
                                    allowClear={false}
                                  />
                                </ConfigProvider>
                              </Form.Item>
                            </Col>

                            <Col xs={12} sm={12} md={10} lg={5} xl={4} xxl={4}>
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
                                {fileEach?.length !== 0 ? (
                                  <Tooltip
                                    placement="left"
                                    title={
                                      fileEach?.length !== 0
                                        ? fileEach
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
                                        {fileEach}
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
                                        fileEach?.length !== 0
                                          ? fileEach
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
                                  onChange={(info) => onChangeFile(info, name)}
                                >
                                  <Tooltip
                                    placement="left"
                                    title={
                                      fileEach?.length !== 0
                                        ? fileEach
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
                                      {fileEach?.length !== 0 ? (
                                        <div
                                          style={{
                                            maxWidth: "100px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          {fileEach}
                                        </div>
                                      ) : (
                                        "อัพโหลดไฟล์"
                                      )}
                                    </Button>
                                  </Tooltip>
                                </Upload> */}
                              </Form.Item>
                            </Col>

                            <Col xs={4} sm={4} md={4} lg={2} xl={2} xxl={2}>
                              <Form.Item
                                {...restField}
                                label="แสดง"
                                name={[name, "isUsed"]}
                                style={{
                                  width: "100%",
                                }}
                              >
                                <Switch
                                  defaultChecked={true}
                                  checkedChildren="แสดง"
                                  unCheckedChildren="ซ่อน"
                                  disabled={
                                    !(
                                      dataEdit?.annualDirectors !== undefined &&
                                      dataEdit?.annualDirectors[key]?.isUsed !==
                                        undefined
                                    )
                                  }
                                  checked={
                                    dataEdit?.annualDirectors !== undefined &&
                                    dataEdit?.annualDirectors[key]?.isUsed !==
                                      undefined
                                      ? dataEdit.annualDirectors[key].isUsed
                                      : true
                                  }
                                  onClick={() => {
                                    if (
                                      dataEdit?.annualDirectors !== undefined &&
                                      dataEdit?.annualDirectors[key]?.isUsed !==
                                        undefined
                                    ) {
                                      dataEdit.annualDirectors[key].isUsed =
                                        !dataEdit.annualDirectors[key].isUsed;
                                      getAnnualDirectorType();
                                    }
                                  }}
                                />
                              </Form.Item>
                            </Col>

                            <Col
                              xs={12}
                              sm={12}
                              md={2}
                              lg={1}
                              xl={1}
                              xxl={1}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Form.Item label="ลบ">
                                <Popconfirm
                                  placement="topRight"
                                  title="ลบออกจากระบบ"
                                  description="คุณยืนยันที่จะลบ ใช่ไหม"
                                  okText="ใช่ ลบเลย"
                                  onConfirm={() => {
                                    if (dataEdit.length === 0) {
                                      remove(name);
                                    } else {
                                      const find =
                                        dataEdit.annualDirectors[key];
                                      // console.log("find", JSON.stringify(find));
                                      if (find !== undefined) {
                                        removeAnnualDirector(find.id).then(
                                          () => {
                                            remove(name);
                                            setFiles(
                                              files.filter(
                                                (_: any, i: number) => i !== key
                                              )
                                            );
                                          }
                                        );
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
                        <Divider />
                      </div>
                    );
                  })}
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
                        เพิ่มกรรมการ
                      </Button>
                    </HappyProvider>
                  </Form.Item>
                </>
              )}
            </Form.List>

            {/* <div
              style={{
                marginTop: 20,
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
                  marginTop: 20,
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

export default observer(SecretAnnualDirector);

{
  /* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={16}>
          <Form.Item
            label="กรรมการ"
            name="director"
            rules={[{ required: true, message: "กรุณาเลือกกรรมการ" }]}
            style={{
              width: "100%",
            }}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="เลือกกรรมการ"
              // defaultValue={["a10", "c12"]}
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            label="ปีที่แต่งตั้ง"
            name="year"
            rules={[
              { required: true, message: "กรุณากรอกปีที่แต่งตั้ง" },
            ]}
          >
            <ConfigProvider locale={locale}>
              <DatePicker
                id="year"
                style={{ maxWidth: 150 }}
                onChange={onChange}
                defaultValue={datePicker}
                value={datePicker}
                picker="year"
                allowClear={false}
              />
            </ConfigProvider>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            label="ไฟล์ PDF"
            // name="file"
            // rules={[{ required: true, message: "กรุณากรอกไฟล์ PDF" }]}
            style={{
              width: "100%",
            }}
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
          </Form.Item>
        </Col>
      </Row> */
}
