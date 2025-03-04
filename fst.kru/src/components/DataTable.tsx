import { Empty, Table } from "antd";
import { observer } from "mobx-react-lite";

const DataTable = ({
  onPrint = false,
  runNumber = true,
  data,
  columns,
  sizeX,
  sizeY = 500,
  pagination = {
    pageSize: 6,
  },
  showHeader,
  expandedRowRender,
  rowSelection,
}: any) => {
  const formData = data.map((item: any, i: number) => ({
    i: i + 1,
    ...item,
  }));

  const column = runNumber
    ? [
        {
          title: "ลำดับ",
          dataIndex: "i",
          key: "i",
          align: "center",
          width: 70,
          // render: (_t: any, _r: any, index: number) => index + 1,
        },
        ...columns,
      ]
    : columns;

  return (
    <Table
      className="custom-table"
      showHeader={showHeader}
      columns={column}
      scroll={(!onPrint ? { x: sizeX, y: sizeY } : undefined) as any}
      dataSource={formData}
      style={{ textAlign: "end", marginTop: 20 }}
      rowKey="id"
      pagination={pagination}
      expandable={{ expandedRowRender }}
      rowSelection={rowSelection}
      locale={{
        emptyText: (
          <Empty
            description="ไม่มีข้อมูล"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ),
      }}
    />
  );
};

export default observer(DataTable);
