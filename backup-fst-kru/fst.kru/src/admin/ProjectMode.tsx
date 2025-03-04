import { observer } from "mobx-react-lite";
import SecretResearch from "./pages/project/SecretResearch";
import SecretProject from "./pages/project/SecretProject";
import { Tabs } from "antd";

const ProjectMode = () => {
  const tabList = [
    {
      key: "โครงการอาจารย์",
      component: <SecretResearch />,
    },
    {
      key: "งานวิจัยนักศึกษา",
      component: <SecretProject />,
    },
  ];

  return (
    <Tabs
      type="card"
      items={tabList.map((item, i) => {
        const id = String(i + 1);
        return {
          label: <p style={{ color: "black" }}>{item.key}</p>,
          key: id,
          children: item.component,
        };
      })}
    />
  );
};

export default observer(ProjectMode);
