import { observer } from "mobx-react-lite";
import DataTable from "../../../components/DataTable";
import { useStore } from "../../../store/store";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Image, Row, Switch } from "antd";
import { pathImages } from "../../../constants/RoutePath";
import { FaRegUser } from "react-icons/fa6";
import moment from "moment";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import { getColumnSearchProps } from "../../../components/Search";
import dayjs from "dayjs";
import { TitlePath } from "../../../constants/TitlePath";
import { formatDateThai } from "../../../helper/components";
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
import { HappyProvider } from "@ant-design/happy-work-theme";
import { PrinterOutlined } from "@ant-design/icons";

const SecretJob = () => {
  const componentRef = useRef<HTMLElement | null>(null);
  const { currentBranchId } = useStore().BranchStore;
  const { jobHistoryinBranch, getJobHistoryByBranch, isUsedJob } =
    useStore().userStore;

  const [onPrint, setOnPrint] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [dataToCSV, setDataToCSV]: any = useState([]);

  useEffect(() => {
    getJobHistoryByBranch(Number(currentBranchId));
  }, []);

  const columns: any = [
    {
      id: 1,
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
                src={`${pathImages.student}${record.imageStudent}`}
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
      id: 2,
      title: "ชื่องาน",
      dataIndex: "jobName",
      key: "jobName",
      align: "center",
      ...getColumnSearchProps("jobName"),
    },
    {
      id: 3,
      title: "ชื่อบริษัท",
      dataIndex: "company",
      key: "company",
      align: "center",
      ...getColumnSearchProps("company"),
    },
    {
      id: 5,
      title: "ตำแหน่ง",
      dataIndex: "position",
      key: "position",
      align: "center",
      ...getColumnSearchProps("position"),
    },
    {
      id: 3,
      title: "วันที่เริ่มทำงาน (เดือน / ปี)",
      dataIndex: "startJobFormat",
      key: "startJobFormat",
      align: "center",
      // render: (e: any) => <div>{dayjs(e.startJob).format("MM/YYYY")}</div>,
      //ต้องใส่ชื่อให้ตรงด้วย ถ้าเป็น Date ให้ทำการใส่ format ด้วย เข้าไปดูชื่อที่ if ไว้ ถ้าไม่มีให้เพิ่ม
      ...getColumnSearchProps("startJobFormat", null, 2),
    },
    {
      id: 6,
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
            onClick={() => isUsedJob(e.id)}
          />
        );
      },
    },
  ];

  const columnsPrint: any = [
    {
      id: 1,
      title: "นักศึกษา",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      id: 2,
      title: "ชื่องาน",
      dataIndex: "jobName",
      key: "jobName",
      align: "center",
    },
    {
      id: 3,
      title: "ชื่อบริษัท",
      dataIndex: "company",
      key: "company",
      align: "center",
    },
    {
      id: 5,
      title: "ตำแหน่ง",
      dataIndex: "position",
      key: "position",
      align: "center",
    },
    {
      id: 3,
      title: "วันที่เริ่มทำงาน (เดือน / ปี)",
      dataIndex: "startJobFormat",
      key: "startJobFormat",
      align: "center",
    },
  ];

  //ข้อมูลมาจาก backend เลย ไม่จำเป็นต้องเข้าถึง student ก่อน เพื่อที่จะได้ fullName และ image
  const data = jobHistoryinBranch.map((item: any) => {
    const newData = {
      fullName: item?.fullName,
      imageStudent: item.image,
      jobName: item?.jobName,
      company: item?.company,
      position: item?.position,
      startJobFormat: formatDateThai(item?.startJob, "", 0, 2),
      isUsed: item?.isUsed,
    };

    //เอาข้อมูลที่ต้องการมา เพื่อง่ายต่อการแสดงตารางที่เป็น รูป และ fullName และ ได้เอาข้อมูลอื่นมาด้วยนั่นก็คือ ...item
    return { ...newData, ...item };
  });

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
          fullName: item?.fullName,
          jobName: item?.jobName,
          company: item?.company,
          position: item?.position,
          startJobFormat: formatDateThai(item?.startJob, "", 0, 2),
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
      .save("ประวัติการทำงานของนักศึกษา" + ".pdf");
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
      saveAs(blob, "ประวัติการทำงานของนักศึกษา.docx");
    });

    // html2pdf()
    //   .from(element)
    //   .save("มคอ" + ".docx");
  };

  const header = [
    { label: "ชื่อนักศึกษา", key: "fullName" },
    { label: "ชื่องาน", key: "jobName" },
    { label: "ชื่อบริษัท", key: "company" },
    { label: "ตำแหน่ง", key: "position" },
    { label: "วันที่เริ่มทำงาน (เดือน / ปี)", key: "startJobFormat" },
  ];

  return (
    <>
      <MyTitleAdmin name={TitlePath.jobHistory} />

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
                    filename={"ประวัติการทำงานของนักศึกษา.csv"}
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
  );
};

export default observer(SecretJob);
