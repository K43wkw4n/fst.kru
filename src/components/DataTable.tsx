import { Table } from "antd";
import { observer } from "mobx-react-lite"; 

const DataTable = ({ data, columns, sizeX, pagination, showHeader }: any) => {
    
  return (
    <Table 
      showHeader={showHeader}
      columns={columns}
      scroll={{ x: sizeX, y: 500 }}
      dataSource={data}
      style={{ textAlign: "end" }}
      rowKey="id"
      pagination={pagination}
    />
  );
};

export default observer(DataTable);
