import { Tabs } from "antd";
import React from "react";
import SecretAnnualDirector from "./pages/annualDirector/SecretAnnualDirector";
import SecretDirector from "./pages/annualDirector/SecretDirector";

const AnnualDirectorMode = () => {
  const tabList = [
    {
      key: "ชุดคณะกรรมการ",
      component: <SecretAnnualDirector />,
    },
    {
      key: "กรรมการ",
      component: <SecretDirector />,
    },
  ];

  return (
    <Tabs
      type="card"
      items={tabList.map((item, i) => {
        const id = String(i + 1);
        return {
          label: <div style={{ color: "black" }}>{item.key}</div>,
          key: id,
          children: item.component,
        };
      })}
    />
  );
};

export default AnnualDirectorMode;
