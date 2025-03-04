import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../../store/store";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { Button, Col, Image, Modal, Row, Switch } from "antd";
import { FaRegUser } from "react-icons/fa";
import DataTable from "../../../components/DataTable";
import CreateUpdateRAP from "../../../pages/project/rapPersonnel/CreateUpdateRAP";
import { pathImages } from "../../../constants/RoutePath";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import MyRemovePop from "../../../components/MyRemovePop";
import { getColumnSearchProps } from "../../../components/Search";
import MyButton from "../../../components/MyButton";
import { TitlePath } from "../../../constants/TitlePath";
import { formatDateThai, stripHtml } from "../../../helper/components";
import dayjs from "dayjs";
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
import { PrinterOutlined } from "@ant-design/icons";
import HTMLReactParser from "html-react-parser/lib/index";
import * as XLSX from "xlsx";

const confirm = Modal.confirm;

const SecretResearch = () => {
  const componentRef = useRef<HTMLElement | null>(null);

  const {
    RAPUserAdmin,
    getResearchAndProjectByIdAdmin,
    isUsedResearch,
    removeRAP,
    categoryNameDropdown,
    getCategoryNameDDByBranchByGroup,
  } = useStore().ResearchAndProjectStore;
  const { currentBranchId } = useStore().BranchStore;

  const [dataEdit, setDataEdit] = useState([]);

  const [formMode, setFormMode] = useState(false);

  const [onPrint, setOnPrint] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [dataToCSV, setDataToCSV]: any = useState([]);

  useEffect(() => {
    getResearchAndProjectByIdAdmin(Number(currentBranchId));
    getCategoryNameDDByBranchByGroup(Number(currentBranchId));
  }, []);

  const handleSetMode = () => setFormMode(!formMode);

  const columns: any = [
    {
      id: 2,
      title: "โครงงานวิจัย",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      id: 3,
      title: "อาจารย์",
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
            {record.imagePerson ? (
              <Image
                height={30}
                width={30}
                style={{ borderRadius: 100 }}
                src={pathImages.personnel + record?.imagePerson}
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
      id: 5,
      title: "ประเภทโครงงานวิจัย",
      dataIndex: "",
      key: "categoryName",
      align: "center",
      render: (e: any) => <div>{e.categoryName}</div>,
      filters: categoryNameDropdown.map((item) => ({
        text: item.key,
        value: item.key,
      })),
      onFilter: (value: string, record: any) => record.categoryName === value,
      width: 170,
    },
    {
      id: 5,
      title: "ปีของโครงงานวิจัย",
      dataIndex: "year",
      key: "year",
      align: "center",
      render: (e: any) => <div>{dayjs(e).format("YYYY")}</div>,
      width: 140,
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
      id: 7,
      title: "เอกสาร",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <HappyProvider key={`delete-${e.id}`}>
          <Button
            color="whtie"
            href={pathImages.researchPDF + e.pdf}
            target="_blank"
          >
            ดู
          </Button>
        </HappyProvider>
      ),
      width: 80,
    },
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
      width: 80,
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
      key: "",
      align: "center",
      render: (e: any) => (
        <MyRemovePop
          functionRemove={() =>
            removeRAP(e.id).then(() => {
              getResearchAndProjectByIdAdmin(Number(currentBranchId));
            })
          }
        />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Button
        //     color="whtie"
        //     onClick={() => {
        //       showRemoveConfirm(e.name, e.id);
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
      title: "โครงงานวิจัย",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      id: 3,
      title: "อาจารย์",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      id: 5,
      title: "ประเภทโครงงานวิจัย",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
      // width: 170,
    },
    {
      id: 5,
      title: "ปีของโครงงานวิจัย",
      dataIndex: "year",
      key: "year",
      align: "center",
      render: (e: any) => <div>{dayjs(e).format("YYYY")}</div>,
      // width: 140,
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
    isUsedResearch(id).then(() => {
      getResearchAndProjectByIdAdmin(Number(currentBranchId));
    });
  };

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    handleSetMode();
  };

  const data = RAPUserAdmin.map((item) => {
    const newData = {
      id: item.id,
      name: item.name,
      imagePerson: item.personnel.image,
      fullName: item.personnel.fullName,
      isUsed: item.isUsed,
      categoryName: item.category.name,
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
        return {
          name: item.name,
          imagePerson: item.imagePerson,
          fullName: item.fullName,
          categoryName: item.categoryName,
          year: dayjs(item.year).format("YYYY"),
          createdAt: formatDateThai(item.createdAt, ""),
          categoryBudget: item.budget.budgetName,
          budgetAmount: item.budgetAmount,
          description: stripHtml(item.description),
          expertise: item.expertise,
          participant: JSON.parse(item.participant),
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
      .save("งานวิจัโครงงานวิจัยอาจารย์" + ".pdf");
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
      saveAs(blob, "โครงงานวิจัยอาจารย์.docx");
    });

    // html2pdf()
    //   .from(element)
    //   .save("มคอ" + ".docx");
  };

  const header = [
    { label: "ชื่อโครงงานวิจัย", key: "name" },
    { label: "ชื่อ-นามสกุล", key: "fullName" },
    { label: "ประเภทโครงงานวิจัย", key: "categoryName" },
    { label: "ปีของโครงงานวิจัย", key: "year" },
    { label: "วันที่สร้าง", key: "createdAt" },
    { label: "ประเภทงบประมาณ", key: "categoryBudget" },
    { label: "งบประมาณรวม", key: "budgetAmount" },
    { label: "รายละเอียด", key: "description" },
    { label: "ความเชี่ยวชาญ", key: "expertise" },
    { label: "ผู้ร่วมวิจัย", key: "participant" },
  ];

  return (
    <>
      <MyTitleAdmin name={TitlePath.research_and_project} />
      {!formMode ? (
        <>
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
                        filename={"โครงงานวิจัยอาจารย์.csv"}
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

          <CreateUpdateRAP dataEdit={dataEdit} handleSetMode={handleSetMode} />
        </>
      )}
    </>
  );
};

export default observer(SecretResearch);
