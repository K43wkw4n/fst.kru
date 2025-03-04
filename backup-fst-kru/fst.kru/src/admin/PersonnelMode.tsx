import { Tabs } from "antd";
import SecretPersonnel from "./pages/person/SecretPersonnel";
import { observer } from "mobx-react-lite";
import SecretStudent from "./pages/person/SecretStudent";
import SecretRoles from "./pages/person/SecretRoles";
import AnotherMode from "./AnotherMode";

const PersonnelMode = () => {
  const tabList = [
    {
      key: "บุคลากร",
      component: <SecretPersonnel />,
    },
    {
      key: "นักศึกษา",
      component: <SecretStudent />,
    },
    {
      key: "อื่น ๆ",
      component: <AnotherMode />,
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

export default observer(PersonnelMode);
