import { Card, List } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../store/store";
import { RoutePath, pathImages } from "../../constants/RoutePath";
import { NavLink } from "react-router-dom";
import MyTitleAdmin from "../../components/MyTitleAdmin";
import { TitlePath } from "../../constants/TitlePath";

const HomeWelearn = () => {
  const {
    BranchStore: { welearn, getWeLearnById, currentBranchId, currentBranch },
  } = useStore();

  useEffect(() => {
    getWeLearnById(Number(currentBranchId));
    window.scrollTo(0, 0);
  }, []);

  const data = welearn.map((item) => ({
    title: item.title,
    description: item.description,
    imageName: item.imageName,
    content: item.content,
  }));

  return (
    <div
      style={{
        marginBottom: 30,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <MyTitleAdmin
          name={currentBranch.branchName + " " + TitlePath.weLearn}
        />
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
        dataSource={data}
        renderItem={(item, i) => (
          <NavLink
            key={i}
            to={RoutePath.welearndetails}
            state={JSON.stringify(item)}
          >
            <Card
              hoverable
              style={{
                marginBottom: 10,
                backgroundColor: (i + 1) % 2 ? "rgba(0, 0, 0, 0.02)" : "white",
              }}
            >
              <List.Item
                key={item.title}
                extra={
                  <img
                    // width={272}
                    height={100}
                    alt="logo"
                    src={pathImages.weLearn + item.imageName}
                  />
                }
              >
                <h2>{item.title}</h2>
                <List.Item.Meta description={item.description} />
              </List.Item>
            </Card>
          </NavLink>
        )}
      />
    </div>
  );
};

export default observer(HomeWelearn);
