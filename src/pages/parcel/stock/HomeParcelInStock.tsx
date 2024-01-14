import { Table } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { useEffect } from "react";
import moment from "moment";

const HomeParcelInStock = () => {
  // const { suppliesInStock, getSuppliesInStock } = useStore().suppliesStore;
  const { parcelOfBranch, getParcelOfBranch } = useStore().parcelStore;
  const { currentBranch, currentBranchId, getCurrentBranch } = useStore().BranchStore;

  useEffect(() => {
    getCurrentBranch();
    getParcelOfBranch(Number(currentBranchId));
  }, [currentBranchId]);

  const columns: any = [
    {
      id: 1,
      title: "ชื่อพัสดุ",
      dataIndex: "parcelName",
      key: "parcelName",
      align: "center",
    },
    {
      id: 2,
      title: "ชื่อหน่วยของพัสดุ",
      dataIndex: "classifier",
      key: "classifier",
      align: "center",
    },
    {
      id: 3,
      title: "ราคา",
      dataIndex: "price",
      key: "price",
      align: "center",
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      id: 4,
      title: "ปีงบประมาณ",
      dataIndex: "year",
      key: "year",
      align: "center",
      // render: (e: any) => <div>{moment(e.year).format("DD/MM/YYYY")}</div>,
    },
    {
      id: 5,
      title: "จำนวนคงเหลือ",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
  ];

  const data: any = parcelOfBranch.map((item: any, i: number) => ({
    key: item.id,
    id: i,
    parcelName: item.parcelName,
    classifier: item.classifier,
    price: item.price,
    year: item.year,
    quantity: item.quantity,
  }));

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        พัสดุทั้งหมดของ {currentBranch.branchName}
      </div>
      <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
        <Table
          columns={columns}
          scroll={{ x: 1300, y: 500 }}
          dataSource={data}
          style={{ textAlign: "end" }}
          rowKey="id"
        />
      </div>
    </>
  );
};

export default observer(HomeParcelInStock);
