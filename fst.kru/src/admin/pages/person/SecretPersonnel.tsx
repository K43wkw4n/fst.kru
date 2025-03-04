import { observer } from "mobx-react-lite";
import DataTable from "../../../components/DataTable";
import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Tag,
  Typography,
  Upload,
} from "antd";
import { useStore } from "../../../store/store";
import { useEffect, useState } from "react";
import {
  ShowRemoveConfirm,
  getBase64,
  getTagColor,
  notify,
} from "../../../helper/components";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  PrinterOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { HttpStatusCode } from "axios";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { RoutePath, pathImages } from "../../../constants/RoutePath";
import { UploadButton } from "../../../components/UploadButton";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMore } from "react-icons/md";
import PersonDetails from "../../../pages/person/PersonDetails";
import { Roles } from "../../../models/Roles";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import MyRemovePop from "../../../components/MyRemovePop";
import React, { useRef } from "react";
import { Space, type InputRef } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { getColumnSearchProps } from "../../../components/Search";
import MyButton from "../../../components/MyButton";
import { TitlePath } from "../../../constants/TitlePath";
import JoditEditor from "jodit-react";
import { useReactToPrint } from "react-to-print";
const { TextArea } = Input;
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

const SecretPersonnel = () => {
  const componentRef = useRef<HTMLElement | null>(null);
  const editor: any = useRef(null);

  const [form] = Form.useForm();

  // const { open, openModal, closeModal } = useStore().modalStore;
  const { currentBranchId } = useStore().BranchStore;
  const {
    personnels,
    getPersonnelAdminById,
    prefix,
    generalPosition,
    getPrefixAndPosition,
    position,
    register,
    isUsedUser,
    updatePersonnel,
    removeUser,
    roles,
    getRoles,
    user,
  } = useStore().userStore;

  const [dataEdit, setDataEdit] = useState<any>([]);
  const [file, setFile] = useState<UploadFile[]>([]);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const [details, setDetails] = useState(false);
  const [dataDetails, setDataDetails] = useState([]);

  const [body, setBody]: any = useState([]);

  const [open, setOpen] = useState(false);

  const [onPrint, setOnPrint] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [dataToCSV, setDataToCSV]: any = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    getPrefixAndPosition();
    getPersonnelAdminById(Number(currentBranchId));
    getRoles();
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (dataEdit.length !== 0) {
        form.setFieldsValue({
          prefix: dataEdit.prefixId,
          generalPosition: dataEdit.generalPositionId,
          position: dataEdit.positionId,
          fullName: dataEdit?.fullName,
          userName: dataEdit?.userName,
          expert: dataEdit?.expert,
          lvEdu: dataEdit?.lvEdu,
          description: dataEdit?.description,
          password: "",
          role: dataEdit.roleId,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          prefix: null,
          generalPosition: null,
          position: null,
          fullName: null,
          userName: null,
          expert: "",
          lvEdu: "",
          description: "",
          password: "",
          role: null,
        });
      }
    }
    setFile([]);
  }, [dataEdit, form, isFormInitialized]);

  const onFinish = async (values: any) => {
    const data = {
      id: dataEdit.id !== undefined ? dataEdit.id : 0,
      fullName: values.fullName,
      image: file.length === 0 ? null : file[0].originFileObj,
      userName: values.userName,
      password: values.password,
      expert: values.expert || null,
      lvEdu: values.lvEdu || null,
      description: values.description || "",
      generalPositionID: values.generalPosition,
      roleId: values.role,
      prefixID: values.prefix,
      positionId: values.position,
      branchId: Number(currentBranchId),
    };

    console.log("onFinish", data);

    if (dataEdit.length === 0) {
      if (values.password.length <= 5) {
        notify("กรุณาใส่รหัสอย่างน้อย 6 ตัวอักษร");
      } else {
        register(data).then((e: any) => {
          if (e.statusCode === HttpStatusCode.BadRequest) {
            notify(`บางอย่างผิดพลาด!`);
          } else if (e.statusCode === HttpStatusCode.Ok) {
            getPersonnelAdminById(Number(currentBranchId));
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
        updatePersonnel(data).then(() => {
          getPersonnelAdminById(Number(currentBranchId));
          form.resetFields();
          setOpen(false);
          setDataEdit([]);
        });
      } else if (values.password.length <= 5) {
        notify("กรุณาใส่รหัสอย่างน้อย 6 ตัวอักษร");
      } else {
        updatePersonnel(data).then(() => {
          getPersonnelAdminById(Number(currentBranchId));
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

  const openDetails = (e: any) => {
    setDetails(true);
    setDataDetails(e);
  };

  const closeDetails = () => {
    setDetails(false);
    setDataDetails([]);
  };

  // const getRandomColor = () => {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  const columns: any = [
    {
      id: 2,
      title: "คำนำหน้าชื่อ",
      dataIndex: "",
      key: "prefixName",
      align: "center",
      render: (e: any) => <div>{e.prefixName}</div>,
      filters: prefix.map((item) => ({
        text: item.prefixName,
        value: item.id,
      })),
      onFilter: (value: string, record: any) => record.prefixId === value,
    },
    {
      id: 3,
      title: "ชื่อ-นามสกุล",
      dataIndex: "",
      key: "fullName",
      render: (e: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: 10 }}>
            {e.image ? (
              <Image
                height={30}
                width={30}
                style={{ borderRadius: 100 }}
                src={pathImages.personnel + e.image}
              />
            ) : (
              <FaRegUser size={25} />
            )}
          </div>
          <div>
            <div onClick={() => openDetails(e)} style={{ cursor: "pointer" }}>
              {e.fullName}
            </div>
          </div>
        </div>
      ),
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
                height={40}
                // width={30}
                style={{ borderRadius: 100 }}
                src={pathImages.personnel + record.image}
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
      title: "ชื่อผู้ใช้",
      dataIndex: "userName",
      key: "userName",
    },
    {
      id: 4,
      title: "ตำแหน่ง",
      dataIndex: "",
      key: "positionName",
      render: (e: any) => <div>{e.positionName}</div>,
      filters: position.map((item) => ({
        text: item.positionName,
        value: item.id,
      })),
      onFilter: (value: string, record: any) => record.positionId === value,
    },
    {
      id: 5,
      title: "ตำแหน่งทั่วไป",
      dataIndex: "",
      key: "generalPositionName",
      render: (e: any) => <div>{e.generalPositionName}</div>,
      filters: generalPosition.map((item) => ({
        text: item.generalPositionName,
        value: item.id,
      })),
      onFilter: (value: string, record: any) =>
        record.generalPositionId === value,
    },
    {
      id: 6,
      title: "บทบาท",
      key: "role",
      dataIndex: "",
      render: (e: any) => {
        const find = itemsRoles.find((x: any) => x.value === e.roleId);

        const color = getTagColor(find.label);

        return (
          <span>
            <Tag color={color} key={find.value}>
              {find.label.toUpperCase()}
            </Tag>
            {user?.userId === e.id && (
              <Tag color="red" key="0">
                คุณ
              </Tag>
            )}
          </span>
        );
      },
    },
    {
      id: 7,
      title: "แสดง",
      dataIndex: "",
      key: "isUsed",
      align: "center",
      width: 90,
      render: (e: any) => {
        return (
          <Switch
            checkedChildren="แสดง"
            unCheckedChildren="ซ่อน"
            defaultChecked={!!e.isUsed}
            onClick={() => isUsedUser(e.id)}
          />
        );
      },
    },
    {
      id: 8,
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
      id: 9,
      title: "ลบ",
      dataIndex: "",
      key: "delete",
      align: "center",
      render: (e: any) => (
        <MyRemovePop
          functionRemove={() =>
            removeUser(e.id).then(() => {
              getPersonnelAdminById(Number(currentBranchId));
            })
          }
          disabled={user?.userId === e.id}
          titleTooltip={2}
        />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Button
        //     color="whtie"
        //     onClick={() => {
        //       showRemoveConfirm(e.fullName, e.id);
        //     }}
        //     disabled={user?.userId === e.id}
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
      title: "คำนำหน้าชื่อ",
      dataIndex: "prefixName",
      key: "prefixName",
      align: "center",
      // render: (e: any) => <div>{e.prefixName}</div>,
      // filters: prefix.map((item) => ({
      //   text: item.prefixName,
      //   value: item.id,
      // })),
      // onFilter: (value: string, record: any) => record.prefixId === value,
    },
    {
      id: 3,
      title: "ชื่อ-นามสกุล",
      dataIndex: "fullName",
      key: "fullName",
      // render: (e: any) => (
      //   <div
      //     style={{
      //       display: "flex",
      //       alignItems: "center",
      //     }}
      //   >
      //     <div style={{ marginRight: 10 }}>
      //       {e.image ? (
      //         <Image
      //           height={30}
      //           width={30}
      //           style={{ borderRadius: 100 }}
      //           src={pathImages.personnel + e.image}
      //         />
      //       ) : (
      //         <FaRegUser size={25} />
      //       )}
      //     </div>
      //     <div>
      //       <div onClick={() => openDetails(e)} style={{ cursor: "pointer" }}>
      //         {e.fullName}
      //       </div>
      //     </div>
      //   </div>
      // ),
      // ...getColumnSearchProps("fullName", (text: string, record: any) => (
      //   <div
      //     style={{
      //       display: "flex",
      //       alignItems: "center",
      //     }}
      //   >
      //     <div style={{ marginRight: 10 }}>
      //       {record.image ? (
      //         <Image
      //           height={40}
      //           // width={30}
      //           style={{ borderRadius: 100 }}
      //           src={pathImages.personnel + record.image}
      //         />
      //       ) : (
      //         <FaRegUser size={25} />
      //       )}
      //     </div>
      //     <div>
      //       <div
      //         onClick={() => openDetails(record)}
      //         // style={{ cursor: "pointer" }}
      //       >
      //         {text}
      //       </div>
      //     </div>
      //   </div>
      // )),
    },
    {
      id: 4,
      title: "ตำแหน่ง",
      dataIndex: "positionName",
      key: "positionName",
      // render: (e: any) => <div>{e.positionName}</div>,
      // filters: position.map((item) => ({
      //   text: item.positionName,
      //   value: item.id,
      // })),
      // onFilter: (value: string, record: any) => record.positionId === value,
    },
    {
      id: 5,
      title: "ตำแหน่งทั่วไป",
      dataIndex: "generalPositionName",
      key: "generalPositionName",
      // render: (e: any) => <div>{e.generalPositionName}</div>,
      // filters: generalPosition.map((item) => ({
      //   text: item.generalPositionName,
      //   value: item.id,
      // })),
      // onFilter: (value: string, record: any) =>
      //   record.generalPositionId === value,
    },
    {
      id: 6,
      title: "ความชำนาน",
      dataIndex: "expert",
      key: "expert",
    },
    {
      id: 7,
      title: "วุฒิการศึกษา",
      dataIndex: "lvEdu",
      key: "lvEdu",
    },
    {
      id: 8,
      title: "รายละเอียดเพิ่มเติม",
      dataIndex: "description",
      key: "description",
    },
    {
      id: 9,
      title: "บทบาท",
      key: "role",
      dataIndex: "roleName",
      // render: (e: any) => {
      //   const find = itemsRoles.find((x: any) => x.value === e.roleId);

      //   const color = getTagColor(find.label);

      //   return find.label.toUpperCase();
      // },
    },
  ];

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    setOpen(true);
  };

  const itemsPrefix = prefix.map((item: any) => {
    return {
      value: item.id,
      label: item.prefixName,
    };
  });

  const itemsGeneralPosition = generalPosition.map((item: any) => {
    return {
      value: item.id,
      label: item.generalPositionName,
    };
  });

  const itemsPosition = position.map((item: any) => {
    return {
      value: item.id,
      label: item.positionName,
    };
  });

  const itemsRoles = roles?.map((item: Roles) => {
    return {
      value: item?.id,
      label: item?.roleName,
    };
  });

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

  const data = personnels.map((item: any) => {
    return {
      id: item.personnelId,
      image: item.personnel.image,
      prefixId: item.personnel.prefixID,
      prefixName: item.personnel.prefixes.prefixName,
      fullName: item.personnel.fullName,
      userName: item.personnel.userName,
      positionId: item.positionId,
      positionName: item.position.positionName,
      generalPositionId: item.personnel.generalPositionID,
      generalPositionName: item.personnel.generalPositions.generalPositionName,
      isUsed: item.isUsed,
      expert: item.personnel.expert,
      lvEdu: item.personnel.lvEdu,
      description: item.personnel.description,
      roleId: item.personnel.roleID,
      roleName: itemsRoles.find((x: any) => x.value === item.personnel.roleID)
        .label,
    };
  });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
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
          prefixName: item.prefixName,
          fullName: item.fullName,
          positionName: item.positionName,
          generalPositionName: item.generalPositionName,
          expert: item.expert,
          lvEdu: item.lvEdu,
          description: item.description,
          roleName: item?.roleName,
        };
      })
    );
  };

  console.log("dataToCSV", dataToCSV);

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
      .save("บุคลากร" + ".pdf");
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
      saveAs(blob, "บุคลากร.docx");
    });

    // html2pdf()
    //   .from(element)
    //   .save("มคอ" + ".docx");
  };

  const handleCancel = () => setPreviewOpen(false);

  const header = [
    { label: "คำนำหน้าชื่อ", key: "prefixName" },
    { label: "ชื่อ-นามสกุล", key: "fullName" },
    { label: "ตำแหน่ง", key: "positionName" },
    { label: "ตำแหน่งทั่วไป", key: "generalPositionName" },
    { label: "ความชำนาน", key: "expert" },
    { label: "วุฒิการศึกษา", key: "lvEdu" },
    { label: "รายละเอียดเพิ่มเติม", key: "description" },
    { label: "บทบาท", key: "roleName" },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <MyTitleAdmin name={TitlePath.personnel} />

        <MyButton
          functionOnClick={() => {
            setOpen(true);
            setIsFormInitialized(true);
          }}
          title="เพิ่ม"
        />
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
                    filename={"บุคลากร.csv"}
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
            sizeX={!onPrint ? 1300 : 0}
            onPrint={onPrint}
          />
        </div>
      </div>

      <Modal
        title="ลงทะเบียนผู้ใช้ (บุคลากร)"
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
          name="register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            ...dataEdit,
            personnels: dataEdit.personnels,
          }}
          autoComplete="off"
          layout="vertical"
        >
          <div style={{ marginTop: 15 }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
              <Col
                span={24}
                style={{
                  textAlign: "center",
                }}
              >
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={file}
                  onChange={onChange}
                  onPreview={handlePreview}
                  accept=".jpeg, .jpg, .png"
                >
                  {file.length === 0 && dataEdit.length !== 0 ? (
                    <>
                      {dataEdit?.image ? (
                        <img
                          src={`${pathImages.personnel}${dataEdit?.image}`}
                          alt="logo"
                          style={{
                            height: 120,
                            // width: "100%",
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
              <Col span={24}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="บทบาท"
                      name="role"
                      rules={[{ required: true, message: "กรุณากรอกบทบาท" }]}
                    >
                      <Select
                        // defaultValue="บทบาท"
                        style={{ width: "100%" }}
                        placeholder="บทบาท"
                        options={itemsRoles}
                        allowClear
                        disabled={user?.userId === dataEdit?.id}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="ตำแหน่ง"
                      name="position"
                      rules={[{ required: true, message: "กรุณากรอกตำแหน่ง" }]}
                    >
                      <Select
                        // defaultValue="ตำแหน่ง"
                        style={{ width: "100%" }}
                        placeholder="ตำแหน่ง"
                        options={itemsPosition}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="ตำแหน่งทั่วไป"
                      name="generalPosition"
                      rules={[
                        { required: true, message: "กรุณากรอกตำแหน่งทั่วไป" },
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="ตำแหน่งทั่วไป"
                        options={itemsGeneralPosition}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Form.Item
                      label="คำนำหน้าชื่อ"
                      name="prefix"
                      rules={[
                        { required: true, message: "กรุณากรอกคำนำหน้าชื่อ" },
                      ]}
                    >
                      <Select
                        // defaultValue="คำนำหน้า"
                        style={{ width: "100%" }}
                        placeholder="คำนำหน้าชื่อ"
                        options={itemsPrefix}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>
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
                label="ชื่อผู้ใช้"
                name="userName"
                rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
              >
                <Input placeholder="ชื่อผู้ใช้" prefix={<UserOutlined />} />
              </Form.Item>
            </div>
            <div style={{ marginTop: 15 }}>
              <Form.Item
                label={
                  "รหัสผ่าน" +
                  (dataEdit.length === 0 ? "" : " (เปลี่ยนรหัสผ่าน)")
                }
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
                label="ความชำนาน"
                name="expert"
                // rules={[
                //   { required: true, message: "กรุณากรอกความชำนาน" },
                // ]}
              >
                <Input placeholder="ความชำนาน" prefix={<MdOutlineMore />} />
              </Form.Item>
            </div>
            <div style={{ marginTop: 15 }}>
              <Form.Item
                label="วุฒิการศึกษา"
                name="lvEdu"
                // rules={[
                //   { required: true, message: "กรุณากรอกวุฒิการศึกษา" },
                // ]}
              >
                <Input placeholder="วุฒิการศึกษา" prefix={<MdOutlineMore />} />
              </Form.Item>
            </div>
            <div style={{ marginTop: 15 }}>
              {/* <Form.Item
                label="เนื้อหา"
                name="description"
                rules={
                  body === ""
                    ? [{ required: true, message: "กรุณากรอกเนื้อหา" }]
                    : undefined
                }
              >
                <JoditEditor
                  ref={editor}
                  value={body}
                  onChange={(newBody) => {
                    setBody(newBody);
                  }}
                />
              </Form.Item> */}
              <Form.Item
                label="รายละเอียดเพิ่มเติม"
                name="description"
                // rules={[
                //   {
                //     required: true,
                //     message: "กรุณากรอกรายละเอียดเพิ่มเติม",
                //   },
                // ]}
              >
                {/* <Form.Item
                label="รายละเอียดเพิ่มเติม"
                name="description"
                // rules={[
                //   {
                //     required: true,
                //     message: "กรุณากรอกรายละเอียดเพิ่มเติม",
                //   },
                // ]}
              >
                <Input
                  placeholder="รายละเอียดเพิ่มเติม"
                  prefix={<MdOutlineMore />}
                />
              </Form.Item> */}
                <TextArea
                  style={{
                    minHeight: 120,
                  }}
                  placeholder="รายละเอียดเพิ่มเติม"
                  rows={4}
                  // prefix={<MdOutlineMore />}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>

      <Modal
        open={previewOpen}
        title={null}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default observer(SecretPersonnel);
