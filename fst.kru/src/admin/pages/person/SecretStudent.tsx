import { observer } from "mobx-react-lite";
import DataTable from "../../../components/DataTable";
import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Typography,
  Upload,
} from "antd";
import { useStore } from "../../../store/store";
import { useEffect, useRef, useState } from "react";
import { notify } from "../../../helper/components";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  PrinterOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { HttpStatusCode } from "axios";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { pathImages } from "../../../constants/RoutePath";
import { UploadButton } from "../../../components/UploadButton";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMore } from "react-icons/md";
import dayjs from "dayjs";
import "dayjs/locale/th";
import locale from "antd/lib/locale/th_TH";
import StudentDetails from "../../../pages/person/StudentDetails";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import MyRemovePop from "../../../components/MyRemovePop";
const { TextArea } = Input;
import { Space, type InputRef } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import MyButton from "../../../components/MyButton";
import { TitlePath } from "../../../constants/TitlePath";
import { getColumnSearchProps } from "../../../components/Search";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import { CSVLink } from "react-csv";
import type { TourProps } from "antd";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";
import { FaRegFileExcel, FaRegFilePdf, FaRegFileWord } from "react-icons/fa6";

const confirm = Modal.confirm;

const SecretStudent = () => {
  const [form] = Form.useForm();
  const componentRef = useRef<HTMLElement | null>(null);

  const { currentBranchId } = useStore().BranchStore;
  const {
    students,
    getStudentById,
    createStudent,
    updateStudent,
    isUsedStudent,
    removeStudent,
  } = useStore().userStore;

  const [dataEdit, setDataEdit] = useState<any>([]);
  const [file, setFile] = useState<UploadFile[]>([]);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const [details, setDetails] = useState(false);
  const [dataDetails, setDataDetails] = useState([]);

  const [datePicker, setDatePicker]: any = useState<dayjs.Dayjs | null>(
    dataEdit.id === undefined
      ? dayjs(Date.now()).add(543, "year")
      : dayjs(dataEdit.yearEdu)
  );

  const [open, setOpen] = useState(false);

  const [onPrint, setOnPrint] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [dataToCSV, setDataToCSV]: any = useState([]);

  useEffect(() => {
    getStudentById(Number(currentBranchId));
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (dataEdit.length !== 0) {
        form.setFieldsValue({
          fullName: dataEdit.fullName,
          userName: dataEdit.userName,
          password: "",
          yearEdu: dataEdit.yearEdu,
          address: dataEdit.address,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          fullName: null,
          userName: null,
          password: "",
          yearEdu: null,
          address: "",
        });
      }
    }
    setFile([]);
    setDatePicker(
      dataEdit.id === undefined
        ? dayjs(Date.now()).add(543, "year")
        : dayjs(dataEdit.yearEdu)
    );
  }, [dataEdit, form, isFormInitialized]);

  const onFinish = async (values: any) => {
    const data = {
      id: dataEdit.id !== undefined ? dataEdit.id : 0,
      fullName: values.fullName,
      image: file.length === 0 ? null : file[0].originFileObj,
      userName: values.userName,
      password: values.password,
      yearEdu: datePicker.format(),
      address: values.address,
      branchId: Number(currentBranchId),
    };

    console.log("data", data);

    if (dataEdit.length === 0) {
      if (values.password.length <= 5) {
        notify("กรุณาใส่รหัสอย่างน้อย 6 ตัวอักษร");
      } else {
        createStudent(data).then((e: any) => {
          console.log("e createStudent :L", e);
          if (e.statusCode === HttpStatusCode.BadRequest) {
            notify(`บางอย่างผิดพลาด!`);
          } else if (e.statusCode === HttpStatusCode.Ok) {
            getStudentById(Number(currentBranchId));
            form.resetFields();
            setOpen(false);
            setDataEdit([]);
          } else {
            notify(`${e}`);
          }
        });
      }
    } else {
      if (values.password.length === 0) {
        console.log("update");
        updateStudent(data).then(() => {
          getStudentById(Number(currentBranchId));
          form.resetFields();
          setOpen(false);
          setDataEdit([]);
        });
      } else if (values.password.length <= 5) {
        notify("กรุณาใส่รหัสอย่างน้อย 6 ตัวอักษร");
      } else {
        updateStudent(data).then(() => {
          getStudentById(Number(currentBranchId));
          form.resetFields();
          setOpen(false);
          setDataEdit([]);
        });
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);

    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
    error === false && password === "" && setError(true);
  };

  const data = students.map((item: any) => {
    return {
      id: item.id,
      fullName: item.fullName,
      userName: item.userName,
      image: item.image,
      yearEdu: dayjs(item.yearEdu).format("YYYY"),
      isUsed: item.isUsed,
      address: item.address,
    };
  });

  const groupedData = Array.from(new Set(data.map((item) => item.yearEdu)));

  console.log("groupedData", JSON.stringify(groupedData));

  const columns: any = [
    {
      id: 2,
      title: "ชื่อ-นามสกุล",
      dataIndex: "",
      key: "fullName",
      ...getColumnSearchProps("fullName", (text: string, record: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: 10 }}>
            {record.image ? (
              <Image
                height={30}
                width={30}
                style={{ borderRadius: 100 }}
                src={`${pathImages.student}${record.image}`}
              />
            ) : (
              <FaRegUser size={25} />
            )}
          </div>
          <div>
            <div
              onClick={() => openDetails(record)}
              // style={{ cursor: "pointer" }}
            >
              {text}
            </div>
          </div>
        </div>
      )),
    },
    {
      id: 14,
      title: "ชื่อผู้ใช้ หรือ รหัสนักศึกษา",
      dataIndex: "userName",
      key: "userName",
    },
    {
      id: 3,
      title: "ปีการศึกษา",
      dataIndex: "",
      key: "yearEdu",
      align: "center",
      render: (e: any) => <div>{dayjs(e.yearEdu).format("YYYY")}</div>,
      filters: groupedData.map((item) => ({
        text: item,
        value: item,
      })),
      onFilter: (value: string, record: any) => record.yearEdu === value,
      width: 140,
    },
    {
      id: 4,
      title: "แสดง",
      dataIndex: "",
      key: "isUsed",
      align: "center",
      render: (e: any) => {
        return (
          <Switch
            checkedChildren="แสดง"
            unCheckedChildren="ซ่อน"
            defaultChecked={!!e.isUsed}
            onClick={() => isUsedStudent(e.id)}
          />
        );
      },
      width: 90,
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
      key: "delete",
      align: "center",
      render: (e: any) => (
        <MyRemovePop
          functionRemove={() =>
            removeStudent(e.id).then(() => {
              getStudentById(Number(currentBranchId));
            })
          }
        />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Button
        //     color="whtie"
        //     onClick={() => {
        //       showRemoveConfirm(e.fullName, e.id);
        //     }}
        //   >
        //     ลบ
        //   </Button>
        // </HappyProvider>
      ),
      width: 80,
    },
  ];

  const columnsPrint: any = [
    {
      id: 2,
      title: "ชื่อ-นามสกุล",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      id: 3,
      title: "ปีการศึกษา",
      dataIndex: "",
      key: "yearEdu",
      align: "center",
      render: (e: any) => <div>{dayjs(e.yearEdu).format("YYYY")}</div>,
    },
  ];

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    setOpen(true);
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

  const onChangeYear = (selectedDate: dayjs.Dayjs | null) => {
    console.log("datePicker selected : ", dayjs(selectedDate).format("YYYY"));
    setDatePicker(selectedDate);
  };

  const openDetails = (e: any) => {
    setDetails(true);
    setDataDetails(e);
  };

  const closeDetails = () => {
    setDetails(false);
    setDataDetails([]);
  };

  const onSelectChangeTable = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);

    setSelectedRowKeys(newSelectedRowKeys);

    const formData: any = newSelectedRowKeys.map((item) => {
      const test = data.find((x: any) => x.id === item);

      console.log("test", test);
      return test;
    });

    setDataToCSV(
      formData?.map((item: any) => {
        console.log("item", item);

        return {
          fullName: item.fullName,
          yearEdu: item.yearEdu,
        };
      })
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChangeTable,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const goToPrint = () => {
    setOnPrint(!onPrint);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const generatePDF = () => {
    const element = document.getElementById("html-element-id-to-pdf"); // เปลี่ยน 'your-html-element-id' เป็น ID ขององค์ประกอบ HTML ที่คุณต้องการแปลงเป็น PDF
    html2pdf()
      .from(element)
      .save("นักศึกษา" + ".pdf");
  };

  const generateWord = () => {
    const element: any = document.getElementById("html-element-id-to-word"); // เปลี่ยน 'your-html-element-id' เป็น ID ขององค์ประกอบ HTML ที่คุณต้องการแปลงเป็น PDF
    const dataTable = element.querySelector(".ant-table");
    const headers = Array.from(dataTable.querySelectorAll("thead th")).map(
      (th: any) => th.innerText
    );
    const rows = Array.from(dataTable.querySelectorAll("tbody tr")).map(
      (tr: any) =>
        Array.from(tr.querySelectorAll("td")).map((td: any) => td.innerText)
    );

    const table = new Table({
      rows: [
        new TableRow({
          children: headers.map(
            (header) =>
              new TableCell({
                children: [new Paragraph({ children: [new TextRun(header)] })],
              })
          ),
        }),
        ...rows.map(
          (row) =>
            new TableRow({
              children: row.map(
                (cell) =>
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun(cell)] }),
                    ],
                  })
              ),
            })
        ),
      ],
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [table],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "นักศึกษา.docx");
    });

    // html2pdf()
    //   .from(element)
    //   .save("มคอ" + ".docx");
  };

  const header = [
    { label: "ชื่อ-นามสกุล", key: "fullName" },
    { label: "ปีการศึกษา", key: "yearEdu" },
  ];

  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h2>บุคลากร</h2>
        <h2>นักศึกษา</h2>
      </div> */}
      {/* {details ? (
        <>
          <Modal
            title="นักศึกษา"
            centered
            open={details}
            onCancel={() => setDetails(false)}
            footer={null}
            width={800}
          >
            <StudentDetails
              data={dataDetails}
              close={closeDetails}
              path={pathImages.student}
            />
          </Modal>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <MyTitleAdmin name="นักศึกษา" />
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

          <DataTable data={data} columns={columns} sizeX={800} />
        </>
      )} */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <MyTitleAdmin name={TitlePath.student} />

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

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
        {!onPrint && (
          <Col>
            <div style={{ marginTop: 7 }}>
              {hasSelected ? `จำนวนที่เลือก ${selectedRowKeys.length}` : ""}
            </div>
          </Col>
        )}

        {onPrint && (
          <Col>
            <HappyProvider>
              <Button
                onClick={goToPrint}
                style={{
                  borderRadius: 50,
                }}
              >
                กลับ
              </Button>
            </HappyProvider>
          </Col>
        )}

        {!onPrint ? (
          <Col>
            <HappyProvider>
              <Button
                onClick={goToPrint}
                style={{
                  borderRadius: 50,
                }}
                disabled={dataToCSV.length === 0}
              >
                พิมพ์ หรือ ดาวโหลด
              </Button>
            </HappyProvider>
          </Col>
        ) : (
          <>
            <Col>
              <HappyProvider>
                <Button
                  key="print"
                  onClick={handlePrint}
                  style={{
                    borderRadius: 50,
                    backgroundColor: "gray",
                    color: "white",
                  }}
                >
                  พิมพ์ <PrinterOutlined />
                </Button>
              </HappyProvider>
            </Col>

            <Col>
              <HappyProvider>
                <Button
                  style={{
                    borderRadius: 50,
                    backgroundColor: "green",
                    color: "white",
                  }}
                >
                  <CSVLink
                    headers={header}
                    filename={"นักศึกษา.csv"}
                    data={dataToCSV}
                    className="btn btn-primary"
                  >
                    ดาวโหลด Excel
                    <FaRegFileExcel
                      style={{
                        marginLeft: 10,
                        position: "relative",
                        top: 2,
                      }}
                    />
                  </CSVLink>
                </Button>
              </HappyProvider>
            </Col>

            <Col>
              <HappyProvider>
                <Button
                  key="print"
                  onClick={generateWord}
                  style={{
                    borderRadius: 50,
                    backgroundColor: "blue",
                    color: "white",
                  }}
                >
                  ดาวโหลด Word
                  <FaRegFileWord
                    style={{ marginLeft: 10, position: "relative", top: 2 }}
                  />
                </Button>
              </HappyProvider>
            </Col>

            <Col>
              <HappyProvider>
                <Button
                  key="print"
                  onClick={generatePDF}
                  style={{
                    borderRadius: 50,
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  ดาวโหลด PDF
                  <FaRegFilePdf
                    style={{ marginLeft: 10, position: "relative", top: 3 }}
                  />
                </Button>
              </HappyProvider>
            </Col>
          </>
        )}
      </Row>

      <div id="html-element-id-to-word">
        <div
          ref={componentRef as React.Ref<HTMLDivElement>}
          id="html-element-id-to-pdf"
        >
          <DataTable
            data={onPrint ? dataToCSV : data}
            columns={onPrint ? columnsPrint : columns}
            rowSelection={!onPrint && rowSelection}
            pagination={
              onPrint
                ? false
                : {
                    pageSize: 6,
                  }
            }
            sizeX={!onPrint ? 800 : 0}
            onPrint={onPrint}
          />
        </div>
      </div>

      {/* <Modal
        title="นักศึกษา"
        centered
        open={details}
        onCancel={() => setDetails(false)}
        footer={null}
        width={800}
      >
        <StudentDetails data={dataDetails} path={pathImages.student} />
      </Modal> */}

      <Modal
        title="ลงทะเบียนผู้ใช้ (นักศึกษา)"
        wrapClassName="vertical-center-modal"
        open={open}
        okText="บันทึก"
        cancelText="ยกเลิก"
        onOk={() => form.submit()}
        onCancel={() => {
          setOpen(false);
          setDataEdit([]);
          setIsFormInitialized(false);
        }}
        style={{
          marginTop: 20,
        }}
      >
        <Form
          form={form} // Use the form instance
          name="student"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            ...dataEdit,
            yearEdu: dataEdit.yearEdu
              ? dayjs(dataEdit.yearEdu).format("YYYY")
              : dayjs(Date.now()).add(543, "year"),
          }}
          autoComplete="off"
          layout="vertical"
        >
          <div style={{ marginTop: 20 }}>
            <Row>
              <Col
                span={24}
                style={{
                  textAlign: "center",
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
                  {file.length === 0 && dataEdit.length !== 0 ? (
                    <>
                      {dataEdit.image ? (
                        <img
                          src={`${pathImages.student}${dataEdit.image}`}
                          alt="logo"
                          style={{
                            // width: 300,
                            height: "100%",
                            // objectFit: "cover",
                            borderRadius: "7%",
                          }}
                        />
                      ) : (
                        <FaRegUser size={30} />
                      )}
                    </>
                  ) : (
                    file.length === 0 && UploadButton
                  )}
                </Upload>
              </Col>
            </Row>

            <div style={{ marginTop: 15 }}>
              <Form.Item
                label="ชื่อ-นามสกุล"
                name="fullName"
                rules={[{ required: true, message: "กรุณากรอกชื่อ-นามสกุล" }]}
              >
                <Input
                  placeholder="ชื่อ-นามสกุล"
                  prefix={<SolutionOutlined />}
                />
              </Form.Item>
            </div>
            <div style={{ marginTop: 15 }}>
              <Form.Item
                label="ชื่อผู้ใช้ หรือ รหัสนักศึกษา"
                name="userName"
                rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
              >
                <Input placeholder="ชื่อผู้ใช้" prefix={<UserOutlined />} />
              </Form.Item>
            </div>
            <div style={{ marginTop: 15 }}>
              <Form.Item
                label="รหัสผ่าน (เปลี่ยนรหัสผ่าน)"
                name="password"
                validateStatus={
                  dataEdit.length === 0 && error
                    ? "error"
                    : password.length <= 5 && password.length > 0
                    ? "error"
                    : "success"
                }
                rules={
                  dataEdit.length === 0 && error
                    ? [{ required: true, message: "กรุณากรอกรหัสผ่าน" }]
                    : undefined
                }
                help={
                  dataEdit.length === 0 && error
                    ? "กรุณากรอกรหัสผ่าน"
                    : password.length <= 5 && password.length > 0
                    ? "อย่างน้อย 6 ตัวอักษร"
                    : null
                }
              >
                <Input.Password
                  placeholder="รหัสผ่าน"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    error === true && setError(false);
                  }}
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </div>

            <div style={{ marginTop: 15 }}>
              <Typography.Title level={5}>
                <p>เพิ่มเติม</p>
              </Typography.Title>
              <Form.Item
                label="ปีการศึกษา"
                name="yearEdu"
                // rules={[
                //   { required: true, message: "กรุณากรอกความชำนาน" },
                // ]}
              >
                <ConfigProvider locale={locale}>
                  <DatePicker
                    id="yearEdu"
                    style={{ maxWidth: 150 }}
                    onChange={onChangeYear}
                    defaultValue={datePicker}
                    value={datePicker}
                    picker="year"
                    allowClear={false}
                  />
                </ConfigProvider>
              </Form.Item>
            </div>
            <div style={{ marginTop: 15 }}>
              <Form.Item
                label="ที่อยู่"
                name="address"
                // rules={[
                //   { required: true, message: "กรุณากรอกวุฒิการศึกษา" },
                // ]}
              >
                <TextArea placeholder="ที่อยู่" rows={4} />
                {/* <Input placeholder="ที่อยู่" prefix={<MdOutlineMore />} /> */}
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default observer(SecretStudent);
