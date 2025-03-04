import { Button, Popconfirm } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";

const PopConfirms = ({ name, functionRemove, id }: any) => {
  return (
    <Popconfirm
      placement="topRight"
      title="ลบออกจากระบบ"
      description={`คุณยืนยันที่จะลบ ${name} ใช่ไหม`}
      okText="ใช่"
      cancelText="ยกเลิก"
      onConfirm={() => functionRemove(id)}
    >
      <Button color="whtie">ลบ</Button>
    </Popconfirm>
  );
};

export default observer(PopConfirms);
