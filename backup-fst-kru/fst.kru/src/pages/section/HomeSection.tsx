import React, { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { Divider, List } from "antd";
import { Section } from "../../models/Section";
import { pathImages } from "../../constants/RoutePath";
import moment from "moment";
import ThaiDateFormat from "../../components/ThaiDateFormat";
import { formatDateThai } from "../../helper/components";

const HomeSection = () => {
  const { section, getSection, currentBranch } = useStore().BranchStore;

  const [data, setData] = useState<Section[]>(section);

  useEffect(() => {
    window.scrollTo(0, 0);

    getSection().then((res) => {
      setData(res);
    });
  }, []);

  const dataConstant = [
    {
      id: 1,
      topic: "ปรัชญา / Philosophy",
      name: "วิทยาศาสตร์ก้าวหน้า คู่จิตอาสา เชิดชูภูมิปัญญาท้องถิ่น",
      children: [],
    },
    {
      id: 2,
      topic: "วิสัยทัศน์ / Vision",
      name: "“ผลิตบัณฑิตและงานวิจัยที่มีคุณภาพเพื่อถ่ายทอดองค์ความรู้และนวัตกรรม เสริมสร้างความเข้มแข็งสู่ท้องถิ่นและสังคม เพื่อการพัฒนาอย่างยั่งยืน”",
      children: [],
    },
    {
      id: 3,
      topic: "พันธกิจ / Mission",
      name: "พันธกิจ เป็นภารกิจโดยหน้าที่และภารกิจตามวิสัยทัศน์ที่องค์กรให้พันธสัญญาว่า จะใช้เป็นกรอบดำเนินงาน ซึ่งคณะวิทยาศาสตร์และเทคโนโลยีมีพันธกิจ 5 พันธกิจ ดังนี้",
      children: [
        {
          id: 1,
          name: "ผลิตบัณฑิตที่มีคุณภาพ มีความรู้ ความเชี่ยวชาญตามมาตรฐานวิชาชีพ และมีคุณธรรม จริยธรรม",
        },
        {
          id: 2,
          name: "ผลิตงานวิจัยและนวัตกรรมเพื่อเสริมสร้างความเข้มแข็งแก่ท้องถิ่นและสังคม",
        },
        {
          id: 3,
          name: "บริการทางวิชาการถ่ายทอดองค์ความรู้และนวัตกรรม สืบสานแนวพระราชดำริเพื่อนำไปสู่การพัฒนาท้องถิ่นและสังคมอย่างยั่งยืน",
        },
        {
          id: 4,
          name: "ทำนุบำรุงศิลปวัฒนธรรม และสืบสานภูมิปัญญาท้องถิ่น",
        },
        {
          id: 5,
          name: "บริหารจัดการองค์กรตามหลักธรรมาภิบาล",
        },
      ],
    },
  ];

  const aboutBranch = [
    {
      id: 1,
      topic: "ประเภทหลักสูตร",
      name: currentBranch.categoryMajor,
    },
    {
      id: 2,
      topic: "ประเภทสาขาวิชา",
      name: currentBranch.categoryBranch,
    },
    {
      id: 3,
      topic: "คำอธิบาย",
      name: currentBranch.text,
    },
  ];

  return (
    <>
      <h1>ปรัชญา วิสัยทัศน์ พันธกิจ</h1>
      {dataConstant.map((item) => (
        <div key={item.id}>
          <Divider orientation="left">
            <h2>{item.topic}</h2>
          </Divider>
          <h3>{item.name}</h3>
          {item.children.map((child) => (
            <h4 key={child.id}>
              {child.id}. {child.name}
            </h4>
          ))}
        </div>
      ))}
      <Divider />
      {data.map((item, i) => (
        <React.Fragment key={i}>
          <List
            header={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>{item.name}</h2>
                {formatDateThai(item.createdAt)}
                {/* <ThaiDateFormat date={item.createdAt} /> */}
                {/* <div>
                  สร้างเมื่อ : {moment(item.createdAt).format("DD/MM/YYYY")}
                </div> */}
              </div>
            }
            bordered
            dataSource={item.subsections}
            renderItem={(item, i) => (
              <List.Item
                style={{
                  backgroundColor: i % 2 ? "white" : "#f3f4f6",
                }}
              >
                <ul>
                  <li
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {item.pdf ? (
                      <a
                        href={pathImages.sectionPDF + item.pdf}
                        target="_blank"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span>{item.name}</span>
                    )}
                    {/* <div>
                      (สร้างเมื่อ :{" "}
                      {moment(item.createdAt).format("DD/MM/YYYY")})
                    </div> */}
                  </li>
                </ul>
              </List.Item>
            )}
          />

          {data.length - (i + 1) !== 0 ? (
            <Divider />
          ) : (
            <div
              style={{
                marginBottom: 40,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default HomeSection;
