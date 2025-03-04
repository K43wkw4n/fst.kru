import { List } from "antd";
import React from "react";

interface props {
  data: any;
  renderItem: any;
  pageSize?: number;
}

const MyListItem = ({ data, renderItem, pageSize = 3 }: props) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: pageSize,
      }}
      dataSource={data}
      renderItem={renderItem}
    />
  );
};

export default MyListItem;
