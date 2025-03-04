import { Tabs } from "antd";
import { observer } from "mobx-react-lite";
import ProjectPage from "./projectStudent/Project.Page";
import RAPPage from "./rapPersonnel/RAP.Page";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../../store/store";

const HomeProject = () => {
  const { state } = useLocation();
  const { currentBranchId } = useStore().BranchStore;

  const branchId = Number(state) || Number(currentBranchId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabList = [
    {
      key: "โครงการและงานวิจัย",
      component: <RAPPage branchId={branchId} />,
    },
    {
      key: "งานวิจัยนักศึกษา",
      component: <ProjectPage branchId={branchId} />,
    },
  ];

  return (
    <center>
      <Tabs
        type="card"
        items={tabList.map((item, i) => {
          const id = String(i + 1);
          return {
            label: (
              <p
                style={{
                  color: "black",
                }}
              >
                {item.key}
              </p>
            ),
            key: id,
            children: item.component,
          };
        })}
      />
    </center>
  );
};

export default observer(HomeProject);
