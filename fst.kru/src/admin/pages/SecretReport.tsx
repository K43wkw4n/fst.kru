import { Button, Card, Col, Modal, Row, Select, Statistic } from "antd";
import { FaRegFolderOpen } from "react-icons/fa";
import {
  FaRegFileExcel,
  FaRegFilePdf,
  FaRegFileWord,
  FaRegNewspaper,
} from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { MdOutlineWorkHistory } from "react-icons/md";
import { useStore } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { Line } from "@ant-design/charts";
import ChartPie from "../../pages/curriculum/components/Chart.pie";
import { observer } from "mobx-react-lite";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { PrinterOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import html2pdf from "html2pdf.js";
import { useReactToPrint } from "react-to-print";
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

const formatter: any = (value: number) => <CountUp end={value} separator="," />;

const SecretReport = () => {
  const componentRef = useRef<HTMLElement | null>(null);
  const {
    BranchStore: {
      currentBranchId,
      countAdmin,
      getCountAdminById,
      branch,
      currentBranch,
      getCurrentBranch,
      getBranchById,
      setParamsSelectMenu,
    },
    dashBoardStore: {
      userByPosition,
      getUserByPositionById,
      user,
      getUserById,
      userByLvEdu,
      getUserByLvEduById,
    },
  } = useStore();

  const branchId = Number(currentBranchId);

  const [selectBranchId, setSelectBranchId] = useState(branchId);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCountAdminById(selectBranchId);
    getUserByPositionById(selectBranchId);
    getUserById(selectBranchId);
    getUserByLvEduById(selectBranchId);
  }, [selectBranchId]);

  const totalResearchAndProjectCount =
    (countAdmin?.researchCount ?? 0) + (countAdmin?.projectCount ?? 0);

  const dataBox = [
    {
      id: 1,
      current: countAdmin?.userCount,
      name: "ผู้ใช้งานระบบ",
      icon: <FiUsers size={35} />,
      goTo: "6.1",
    },
    {
      id: 2,
      current: countAdmin?.jobHistoryCount,
      name: "ประวัติการทำงานของนักศึกษา",
      icon: <MdOutlineWorkHistory size={35} />,
      goTo: "11",
    },
    {
      id: 3,
      current: totalResearchAndProjectCount,
      name: "โครงงานวิจัย",
      icon: <FaRegFolderOpen size={35} />,
      goTo: "9.1",
    },
    {
      id: 4,
      current: countAdmin?.newsCount,
      name: "ข่าวประชาสัมพันธ์",
      icon: <FaRegNewspaper size={35} />,
      goTo: "5",
    },
  ];

  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const props = {
    data,
    xField: "year",
    yField: "value",
  };

  const userPosition = userByPosition?.map((item) => ({
    value: item.users,
    name: item.position.positionName,
  }));

  const users = user?.users?.map((item) => ({
    value: item.users,
    name: item.position.generalPositionName,
  }));

  const usersCount = [
    ...(users || []),
    {
      value: user?.students,
      name: "นักศึกษา",
    },
  ];

  const userLvEdu = userByLvEdu?.map((item) => ({
    value: item.users,
    name: item.lvEdu,
  }));

  // console.log("user", JSON.stringify(user));
  // console.log("users", JSON.stringify(users));
  // console.log("students", JSON.stringify(students));
  // console.log("usersCount", usersCount);

  const dataGraph = [
    {
      id: 1,
      title: "บุคลากร",
      data: usersCount,
    },
    {
      id: 2,
      title: "ตำแหน่ง",
      data: userPosition,
    },
    {
      id: 3,
      title: "วุฒิการศึกษาสูงสุด",
      data: userLvEdu,
    },
  ];

  const handleChange = (value: string) => {
    const branchId = Number(value);
    // console.log(`selected ${branchId}`);
    setSelectBranchId(branchId);
  };

  // console.log("currentBranch", JSON.stringify(currentBranch));
  // console.log("currentBranch", JSON.stringify(branch));

  const optionsBranch = branch.map((item) => ({
    value: item.id,
    label: item.branchName,
  }));

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const generatePDF = () => {
    const element = document.getElementById("html-element-id-to-pdf"); // เปลี่ยน 'your-html-element-id' เป็น ID ขององค์ประกอบ HTML ที่คุณต้องการแปลงเป็น PDF
    html2pdf()
      .from(element)
      .save("รายงาน" + ".pdf");

    // .save("รายงาน" + currentBranch.branchName + ".pdf");
  };

  // (countAdmin?.researchCount ?? 0) + (countAdmin?.projectCount ?? 0);

  const generateWord = () => {
    const headers = ["ชื่อ", "จำนวน", ...usersCount.map((item) => item.name)];
    const rows = dataBox.map((item, i) =>
      i === 0
        ? [item.name, item.current, ...usersCount.map((item) => item.value)]
        : i === 2
        ? [
            ...headers.map((itema) =>
              itema === "ชื่อ"
                ? item.name
                : itema === "จำนวน"
                ? item.current
                : itema === "อาจารย์"
                ? countAdmin?.researchCount ?? 0
                : itema === "นักศึกษา"
                ? countAdmin?.projectCount ?? 0
                : 0
            ),
          ]
        : [item.name, item.current, ...usersCount.map(() => 0)]
    );

    const tableRows = rows.map((rowData) => {
      return new TableRow({
        children: rowData.map((cellData: any) => {
          return new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun(cellData.toString())],
              }),
            ],
          });
        }),
      });
    });

    const table = new Table({
      rows: [
        new TableRow({
          children: headers.map((header) => {
            return new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun(header)],
                }),
              ],
            });
          }),
        }),
        ...tableRows,
      ],
    });

    const test = dataGraph.map((_, i) => {
      const headersGraph = ["", dataGraph[i].title];

      const rowsGraph = dataGraph[i].data.map(
        (item) => [item.name, item.value]
        // dataGraph[i].data[i].value,
        // ...item.data.map((item) => [item.value]),
      );

      const tableRowsGraph = rowsGraph.map((rowData) => {
        return new TableRow({
          children: rowData.map((cellData: any) => {
            return new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun(cellData.toString())],
                }),
              ],
            });
          }),
        });
      });

      const tableGraph = new Table({
        rows: [
          new TableRow({
            children: headersGraph.map((header) => {
              return new TableCell({
                children: [
                  new Paragraph({
                    children: [new TextRun(header)],
                  }),
                ],
              });
            }),
          }),
          ...tableRowsGraph,
        ],
      });

      return tableGraph;
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            table,
            new Paragraph({
              children: [],
            }),
            ...test,
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "รายงาน.docx");
    });
  };

  // Prepare headers
  // const headers = dataGraph.flatMap((data) => [
  //   { label: "ชื่อ", key: "name" },
  //   { label: data.title, key: data.title.toLowerCase().replace(/\s+/g, "_") },
  // ]);

  // Prepare data
  // const dataCSV = dataGraph.reduce((acc: any, graph: any) => {
  //   const test = [...graph.data];

  //   test.forEach((item: any, index: any) => {
  //     if (!acc[index]) {
  //       acc[index] = {};
  //     }

  //     console.log("acc in", acc);

  //     acc[index][graph.title.toLowerCase().replace(/\s+/g, "_")] = item.value;
  //   });

  //   console.log("acc out", acc);

  //   return acc;
  // }, []);

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {branchId === 1 && (
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={6}
            xxl={6}
            style={{
              marginBottom: 30,
            }}
          >
            <Select
              defaultValue="เลือกดูสาขาอื่น"
              style={{ width: "100%" }}
              onChange={handleChange}
              options={optionsBranch}
            />
          </Col>
        )}

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

        {/* <Col>
          <HappyProvider>
            <Button
              style={{
                borderRadius: 50,
                backgroundColor: "green",
                color: "white",
              }}
            >
              <CSVLink
                // headers={headers}
                filename={"รายงาน.csv"}
                data={dataCSV}
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
        </Col> */}

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
              onClick={() => setOpen(true)}
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
      </Row>

      <div ref={componentRef as React.Ref<HTMLDivElement>}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {dataBox.map((item) => (
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              key={item.id}
              style={{
                marginBottom: 15,
              }}
            >
              <Card hoverable onClick={() => setParamsSelectMenu(item.goTo)}>
                <Row>
                  <Col span={5}>
                    <div>{item.icon}</div>
                  </Col>
                  <Col span={19}>
                    <Statistic
                      title={item.name}
                      value={item.current}
                      formatter={formatter}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{
            textAlign: "center",
          }}
        >
          {dataGraph.map((item) => (
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              xxl={8}
              className="gutter-row"
              key={item.id}
            >
              <div>
                <h2>{item.title}</h2>
                <ChartPie data={item.data} name="จำนวน" top={-20} />
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        title="รายงาน"
        wrapClassName="vertical-center-modal"
        open={open}
        onCancel={() => setOpen(false)}
        okText="บันทึก"
        cancelText="ยกเลิก"
        style={{
          marginTop: 20,
        }}
        footer={
          <Row justify={"end"}>
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
                  ดาวโหลด pdf
                  <FaRegFilePdf
                    style={{ marginLeft: 10, position: "relative", top: 3 }}
                  />
                </Button>
              </HappyProvider>
            </Col>
          </Row>
        }
        width={700}
      >
        <div id="html-element-id-to-pdf">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
            {dataBox.map((item) => (
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                key={item.id}
                style={{
                  marginBottom: 15,
                }}
              >
                <Card hoverable onClick={() => setParamsSelectMenu(item.goTo)}>
                  <Row>
                    <Col span={5}>
                      <div>{item.icon}</div>
                    </Col>
                    <Col span={19}>
                      <Statistic
                        title={item.name}
                        value={item.current}
                        formatter={formatter}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>

          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}
            style={{
              textAlign: "center",
            }}
          >
            {dataGraph.map((item, i) => (
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                xxl={24}
                className="gutter-row"
                key={item.id}
                style={
                  i < 2
                    ? {
                        marginTop: 170,
                      }
                    : {}
                }
              >
                <div>
                  <h2>{item.title}</h2>
                  <ChartPie
                    data={item.data}
                    name="จำนวน"
                    top={-20}
                    open={open}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Modal>

      {/* <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{
          marginTop: 30,
          textAlign: "center",
        }}
      >
        <Col className="gutter-row" span={8}>
          <div>
            <h2>ตำแหน่งทั่วไป</h2>
            <ChartPie data={usersCount} height={"400"} name="จำนวน" top={-20} />
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div>
            <h2>ตำแหน่ง</h2>
            <ChartPie
              data={userPosition}
              height={"400"}
              name="จำนวน"
              top={-20}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div>
            <h2>ตำแหน่งทั่วไป</h2>
            <ChartPie data={usersCount} height={"400"} name="จำนวน" top={-20} />
          </div>
        </Col>
      </Row> */}

      {/* <Line {...props} /> */}
    </>
  );
};

export default observer(SecretReport);
