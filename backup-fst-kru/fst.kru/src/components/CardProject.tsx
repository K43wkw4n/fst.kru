import { Card, Tag } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import { pathImages } from "../constants/RoutePath";
import { Project } from "../models/Projects";

const { Meta } = Card;

const CardProject = (props: { item: Project }) => {
  const { item } = props;

  return (
    <Card
      hoverable
      style={{
        borderRadius: 20,
      }}
      cover={
        <center>
          <img
            style={{
              maxWidth: "90%",
              marginTop: 10,
              borderRadius: 15,
            }}
            src={`${pathImages.project}${item.image}`}
          />
        </center>
      }
    >
      <Meta
        title={item.nameTH}
        description={JSON.parse(item.keyWords).map(
          (item: [], i: number) =>
            i < 3 && (
              <Tag
                key={i}
                style={{ fontSize: 10, marginTop: 10, borderRadius: 50 }}
                color={"green"}
              >
                {item}
              </Tag>
            )
        )}
      />
    </Card>
  );
};

export default observer(CardProject);
