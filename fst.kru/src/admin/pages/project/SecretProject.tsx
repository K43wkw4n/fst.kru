import { HappyProvider } from "@ant-design/happy-work-theme";
import { Button, Col, Image, Modal, Row, Switch } from "antd";
import { observer } from "mobx-react-lite";
import DataTable from "../../../components/DataTable";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../../../store/store";
import { pathImages } from "../../../constants/RoutePath";
import { FaRegUser } from "react-icons/fa";
import CreateUpdateProject from "../../../pages/project/projectStudent/CreateUpdateProject";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import MyRemovePop from "../../../components/MyRemovePop";
import { getColumnSearchProps } from "../../../components/Search";
import MyButton from "../../../components/MyButton";
import { TitlePath } from "../../../constants/TitlePath";
import { formatDateThai, stripHtml } from "../../../helper/components";
import { PrinterOutlined } from "@ant-design/icons";
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

const SecretProject = () => {
  const componentRef = useRef<HTMLElement | null>(null);

  const { projectAdmin, getProjectByIdAdmin, isUsedProject, removeProject } =
    useStore().userStore;
  const { currentBranchId } = useStore().BranchStore;

  const [dataEdit, setDataEdit] = useState([]);

  const [formMode, setFormMode] = useState(false);

  const [onPrint, setOnPrint] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [dataToCSV, setDataToCSV]: any = useState([]);

  useEffect(() => {
    getProjectByIdAdmin(Number(currentBranchId));
  }, []);
  // console.log("dataEdit", JSON.stringify(dataEdit));

  const handleSetMode = () => setFormMode(!formMode);

  const columns: any = [
    {
      id: 2,
      title: "งานวิจัย",
      dataIndex: "nameTH",
      key: "nameTH",
      ...getColumnSearchProps("nameTH"),
    },
    {
      id: 3,
      title: "นักศึกษา",
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
            {record.imageStudent ? (
              <Image
                height={30}
                width={30}
                style={{ borderRadius: 100 }}
                src={pathImages.student + record.imageStudent}
              />
            ) : (
              <FaRegUser size={25} />
            )}
          </div>
          <div>
            <div>{text}</div>
          </div>
        </div>
      )),
    },
    {
      id: 4,
      title: "วันที่สร้าง",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (e: any) => <div>{formatDateThai(e, "")}</div>,
      width: 150,
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
      key: "isUsed",
      align: "center",
      render: (e: any) => {
        return (
          <Switch
            checkedChildren="แสดง"
            unCheckedChildren="ซ่อน"
            defaultChecked={!!e.isUsed}
            onClick={() => isUsed(e.id)}
          />
        );
      },
    },
    {
      id: 6,
      title: "แก้ไข",
      dataIndex: "",
      key: "edit",
      align: "center",
      render: (e: any) => (
        <MyButton
          functionOnClick={() => {
            handleEdit(e);
          }}
          title="แก้ไข"
        />
        // <HappyProvider>
        //   <Button
        //     color="whtie"
        //     onClick={() => {
        //       handleEdit(e);
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
      key: "delete",
      align: "center",
      render: (e: any) => (
        <MyRemovePop
          functionRemove={() =>
            removeProject(e.id).then(() => {
              getProjectByIdAdmin(Number(currentBranchId));
            })
          }
        />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Button
        //     color="whtie"
        //     onClick={() => {
        //       showRemoveConfirm(e.nameTH, e.id);
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
      id: 1,
      title: "งานวิจัย",
      dataIndex: "nameTH",
      key: "nameTH",
    },
    {
      id: 2,
      title: "นักศึกษา",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      id: 3,
      title: "ที่ปรึกษา",
      dataIndex: "consultantName",
      key: "consultantName",
    },
    {
      id: 4,
      title: "วันที่สร้าง",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: 150,
    },
  ];

  const isUsed = (id: number) => {
    isUsedProject(id).then(() => {
      getProjectByIdAdmin(Number(currentBranchId));
    });
  };

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    handleSetMode();
  };

  console.log("projectAdmin", projectAdmin);

  const data = projectAdmin.map((item) => {
    const newData = {
      id: item.id,
      nameTH: item.nameTH,
      nameEN: item.nameEN,
      imageStudent: item.student?.image,
      fullName: item.student?.fullName,
      isUsed: item.isUsed,
      createdAt: item.createdAt,
    };

    return { ...newData, ...item };
  });

  const onSelectChangeTable = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);

    setSelectedRowKeys(newSelectedRowKeys);

    const formData: any = newSelectedRowKeys.map((item) => {
      const test = data.find((x: any) => x.id === item);

      return test;
    });

    setDataToCSV(
      formData?.map((item: any) => {
        console.log("item", item);

        return {
          nameTH: item.nameTH,
          nameEN: item.nameEN,
          fullName: item.fullName,
          createdAt: formatDateThai(item.createdAt, ""),
          consultantName: item.consultants.map(
            (item: any) =>
              item.personnel.prefixes.prefixName + item.personnel.fullName
          ),
          description: stripHtml(item.description),
          githubUrl: item.githubUrl,
          webUrl: item.webUrl,
          youtubeUrl: item.youtubeUrl,
          keyWords: JSON.parse(item.keyWords),
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
      .save("วิจัยนักศึกษา" + ".pdf");
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
      saveAs(blob, "วิจัยนักศึกษา.docx");
    });

    // html2pdf()
    //   .from(element)
    //   .save("มคอ" + ".docx");
  };

  const header = [
    { label: "ชื่อภาษาไทย", key: "nameTH" },
    { label: "ชื่อภาษาอังกฤษ", key: "nameEN" },
    { label: "ชื่อ-นามสกุล", key: "fullName" },
    { label: "วันที่สร้าง", key: "createdAt" },
    { label: "อาจารย์ที่ปรึกษา", key: "consultantName" },
    { label: "ลิ้ง Youtube", key: "youtubeUrl" },
    { label: "ลิ้ง Github", key: "githubUrl" },
    { label: "ลิ้งตัวอย่างเว็บ", key: "webUrl" },
    { label: "คำสำคัญ", key: "keyWords" },
    { label: "รายละเอียด", key: "description" },
  ];

  return (
    <>
      <MyTitleAdmin name={TitlePath.project} />
      {!formMode ? (
        <>
          {/* <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
            <HappyProvider>
              <Button
                color="whtie"
                onClick={() => {
                  handleSetMode();
                  setIsFormInitialized(true);
                }}
              >
                เพิ่ม
              </Button>
            </HappyProvider>
          </div> */}

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
                        filename={"วิจัยนักศึกษา.csv"}
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
        </>
      ) : (
        <>
          <MyButton
            functionOnClick={() => {
              handleSetMode();
              setDataEdit([]);
            }}
            title="กลับ"
          />
          {/* <HappyProvider>
            <Button
              color="whtie"
              onClick={() => {
                handleSetMode();
                setDataEdit([]);
              }}
            >
              กลับ
            </Button>
          </HappyProvider> */}

          <CreateUpdateProject
            dataEdit={dataEdit}
            handleSetMode={handleSetMode}
          />
        </>
      )}
    </>
  );
};

export default observer(SecretProject);
