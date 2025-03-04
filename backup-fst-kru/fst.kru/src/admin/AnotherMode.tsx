import { observer } from "mobx-react-lite";
import React from "react";
import SecretRoles from "./pages/person/SecretRoles";
import { Tabs } from "antd";
import SecretGeneralPosition from "./pages/person/SecretGeneralPosition";
import SecretPrefix from "./pages/person/SecretPrefix";
import SecretPosition from "./pages/person/SecretPosition";

const AnotherMode = () => {
  const tabList = [
    {
      key: "บทบาท",
      component: <SecretRoles />,
    },
    {
      key: "คำนำหน้าชื่อ",
      component: <SecretPrefix />,
    },
    {
      key: "ตำแหน่ง",
      component: <SecretPosition />,
    },
    {
      key: "ตำแหน่งทั่วไป",
      component: <SecretGeneralPosition />,
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

export default observer(AnotherMode);
