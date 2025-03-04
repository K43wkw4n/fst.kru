import { Card, Col, List, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { Welearn } from "../../models/Welearn";
import { pathImages } from "../../constants/RoutePath";
import HTMLReactParser from "html-react-parser/lib/index";
import { useEffect } from "react";

const WelearnDetails = () => {
  const { state } = useLocation();

  const data: Welearn = JSON.parse(state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Card
      style={{
        marginBottom: 10,
      }}
    >
      <List
        itemLayout="vertical"
        size="large"
        dataSource={[data]}
        renderItem={(item, i) => (
          <Card
            key={i}
            style={{
              marginBottom: 10,
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
        )}
      />
      <div>{HTMLReactParser(data.content)}</div>
    </Card>
  );
};

export default observer(WelearnDetails);
