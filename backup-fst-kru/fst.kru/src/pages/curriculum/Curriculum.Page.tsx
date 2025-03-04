import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { Card, Col, Divider, Row, Select, Typography } from "antd";
import ChartPie from "./components/Chart.pie";
import CollapseCradit from "./components/Collapse.Credit";
import { pathImages } from "../../constants/RoutePath";
import dayjs from "dayjs";
import { Curriculums } from "../../models/Curriculum";
import { useLocation } from "react-router-dom";
import { DataEmpty } from "../../components/DataEmpty";

const CurriculumPage = () => {
  const { state } = useLocation();

  const { curriculum, getCurriculumById } = useStore().BranchStore;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [data, setData] = useState<Curriculums | undefined>(
    curriculum?.[0] || undefined
  );

  useEffect(() => {
    // Ensure state exists before using it to fetch curriculum by ID
    if (state) {
      getCurriculumById(Number(state))
        .then((res: any) => {
          setData(res?.length === 0 ? undefined : res?.[0]);
        })
        .catch(() => setData(undefined));
    }
  }, [state, getCurriculumById]);

  const handleChange = (value: string) => {
    const find = curriculum?.find((x) => x.id === Number(value));
    setData(find);
  };

  const year =
    curriculum?.map((item) => ({
      value: item?.id,
      label: dayjs(item?.year).format("YYYY"),
    })) || [];

  const dataChart = data?.subjectGroups?.map((item) => {
    const totalCredit = item?.subSubjectGroups.reduce(
      (sum, group) => sum + (group?.credit || 0),
      0
    );

    return {
      value: totalCredit,
      name: item?.name,
    };
  });

  return (
    <>
      {!curriculum || curriculum.length === 0 ? (
        <DataEmpty />
      ) : (
        <div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Row>
                <h2 style={{ fontWeight: "bold" }}>{data?.curriculumTH}</h2>
              </Row>
              <Row>
                <Col span={20}>
                  <h3>{data?.curriculumEN}</h3>
                </Col>
                {data?.file && (
                  <Col
                    span={2}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <a
                      href={pathImages.uploadFile + data?.file}
                      target="_blank"
                      style={{
                        padding: "5px 15px",
                        color: "white",
                        backgroundColor: "#6aad6a",
                        borderRadius: 50,
                      }}
                    >
                      PDF
                    </a>
                  </Col>
                )}
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={20}
                  xxl={20}
                  style={{ marginBottom: 20 }}
                >
                  <h3 style={{ fontWeight: "bold" }}>ชื่อปริญญาและสาขาวิชา</h3>
                  <Row style={{ marginTop: 20, marginBottom: 20 }}>
                    <Typography>ภาษาไทย : {data?.curriculumTH}</Typography>
                  </Row>
                  <Row>
                    <Typography>ภาษาอังกฤษ : {data?.curriculumEN}</Typography>
                  </Row>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={4}
                  xxl={4}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Select
                    defaultValue={year[0]?.label}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={year}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <h2 style={{ fontWeight: "bold" }}>โครงสร้างหลักสูตร</h2>
              <p>
                โครงสร้างหลักสูตรแบ่งเป็นหมวดวิชาที่สอดคล้องกับที่กำหนดไว้ในเกณฑ์มาตรฐานหลักสูตรของกระทรวงศึกษาธิการ
                ดังนี้
              </p>
              <ChartPie data={dataChart} name="หน่วยกิจ" />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <CollapseCradit data={data?.subjectGroups} />
            </Col>
          </Row>
          <Divider />
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {data?.generalTopics?.map((item, i) => (
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} key={i}>
                <Card
                  style={{
                    marginBottom: 20,
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  }}
                >
                  <h2>{item?.name}</h2>
                  <ol>
                    {item?.subGeneralTopics?.map((subItem, j) => (
                      <li key={j}>{subItem?.name}</li>
                    ))}
                  </ol>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default observer(CurriculumPage);

// import { observer } from "mobx-react-lite";
// import React, { useEffect, useState } from "react";
// import { useStore } from "../../store/store";
// import { Card, Col, Divider, Row, Select, Typography } from "antd";
// import ChartPie from "./components/Chart.pie";
// import CollapseCradit from "./components/Collapse.Credit";
// import { pathImages } from "../../constants/RoutePath";
// import dayjs from "dayjs";
// import { Curriculums } from "../../models/Curriculum";
// import { useLocation } from "react-router-dom";
// import { DataEmpty } from "../../components/DataEmpty";

// const CurriculumPage = () => {
//   const { state } = useLocation();

//   const { curriculum, getCurriculumById } = useStore().BranchStore;

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const [data, setData] = useState<Curriculums | undefined>(
//     curriculum[0] !== undefined ? curriculum[0] : undefined
//   );

//   useEffect(() => {
//     getCurriculumById(Number(state)).then((res: any) => {
//       setData(res?.length === 0 ? [] : res[0]);
//     });
//   }, []);

//   // console.log("curriculum ", JSON.stringify(curriculum[0]?.id));
//   // console.log("data ", JSON.stringify(data));

//   const handleChange = (value: string) => {
//     const find = curriculum?.find((x) => x.id === Number(value));
//     setData(find);
//     console.log(`selected ${find}`);
//   };

//   const year = curriculum?.map((item) => {
//     return {
//       value: item?.id,
//       label: dayjs(item?.year).format("YYYY"),
//     };
//   });

//   console.log("year", year);

//   const dataChart = data?.subjectGroups?.map((item) => {
//     const totalCredit = item?.subSubjectGroups.reduce(
//       (sum, group) => sum + group?.credit,
//       0
//     );

//     return {
//       value: totalCredit,
//       name: item?.name,
//     };
//   });

//   return (
//     <>
//       {curriculum?.length !== undefined && curriculum?.length === 0 ? (
//         <DataEmpty />
//       ) : (
//         <div>
//           <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//             <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
//               <Row>
//                 <h2 style={{ fontWeight: "bold" }}>{data?.curriculumTH}</h2>
//               </Row>
//               <Row>
//                 <Col span={20}>
//                   <h3>{data?.curriculumEN}</h3>
//                 </Col>
//                 <Col
//                   span={2}
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Row>
//                     <a
//                       href={pathImages.uploadFile + data?.file}
//                       target="_blank"
//                       style={{
//                         padding: "5px 15px",
//                         color: "white",
//                         backgroundColor: "#6aad6a",
//                         borderRadius: 50,
//                       }}
//                     >
//                       PDF
//                     </a>
//                   </Row>
//                 </Col>
//               </Row>
//             </Col>
//             <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
//               <Row
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Col
//                   xs={24}
//                   sm={24}
//                   md={24}
//                   lg={24}
//                   xl={20}
//                   xxl={20}
//                   style={{ marginBottom: 20 }}
//                 >
//                   <div>
//                     <h3 style={{ fontWeight: "bold" }}>
//                       ชื่อปริญญาและสาขาวิชา
//                     </h3>
//                   </div>

//                   <Row style={{ marginTop: 20, marginBottom: 20 }}>
//                     <Typography>ภาษาไทย : {data?.curriculumTH}</Typography>
//                   </Row>
//                   <Row>
//                     <Typography>ภาษาอังกฤษ : {data?.curriculumEN}</Typography>
//                   </Row>
//                 </Col>
//                 <Col
//                   xs={24}
//                   sm={24}
//                   md={24}
//                   lg={24}
//                   xl={4}
//                   xxl={4}
//                   style={{ display: "flex", justifyContent: "flex-end" }}
//                 >
//                   <Select
//                     defaultValue={year[0]?.label}
//                     style={{ width: 120 }}
//                     onChange={handleChange}
//                     options={year}
//                   />
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//           <Divider />
//           <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//             <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
//               <h2
//                 style={{
//                   fontWeight: "bold",
//                 }}
//               >
//                 โครงสร้างหลักสูตร
//               </h2>
//               <div>
//                 <p>
//                   โครงสร้างหลักสูตร
//                   แบ่งเป็นหมวดวิชาที่สอดคล้องกับที่กำหนดไว้ในเกณฑ์มาตรฐานหลักสูตรของกระทรวงศึกษาธิการ
//                   ดังนี้
//                 </p>
//               </div>
//               <ChartPie data={dataChart} name="หน่วยกิจ" />
//             </Col>
//             <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
//               <CollapseCradit data={data?.subjectGroups} />
//             </Col>
//           </Row>
//           <Divider />
//           <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//             {data?.generalTopics?.map((item, i: number) => (
//               <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} key={i}>
//                 <Card
//                   style={{
//                     marginBottom: 20,
//                     backgroundColor: "rgba(0, 0, 0, 0.02)",
//                   }}
//                 >
//                   <h2>{item?.name}</h2>
//                   <ol>
//                     {item?.subGeneralTopics?.map((item, i: number) => (
//                       <li key={i}>{item?.name}</li>
//                     ))}
//                   </ol>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </div>
//       )}
//     </>
//   );
// };

// export default observer(CurriculumPage);
