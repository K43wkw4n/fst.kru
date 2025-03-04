import { Button, Input, InputRef, Space, Table } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { useEffect, useRef, useState } from "react";
import { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import DataTable from "../../../components/DataTable";
import MyTitleAdmin from "../../../components/MyTitleAdmin";

const HomeParcelInStock = () => {
  // const { suppliesInStock, getSuppliesInStock } = useStore().suppliesStore;
  const { parcelOfBranch, getParcelOfBranch } = useStore().parcelStore;
  const { currentBranch, currentBranchId, getCurrentBranch } =
    useStore().BranchStore;

  useEffect(() => {
    getCurrentBranch();
    getParcelOfBranch(Number(currentBranchId));
  }, [currentBranchId]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : dataIndex === "year" ? (
        moment(text).format("YYYY")
      ) : (
        text
      ),
  });

  const columns: any = [
    {
      id: 1,
      title: "ชื่อพัสดุ",
      dataIndex: "parcelName",
      key: "parcelName",
      align: "center",
      ...getColumnSearchProps("parcelName"),
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
      ...getColumnSearchProps("parcelName"),
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
        <MyTitleAdmin name={"พัสดุทั้งหมดของ " + currentBranch.branchName} />
      </div>
      <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
        <DataTable data={data} columns={columns} sizeX={1300} />
        {/* <Table
          columns={columns}
          scroll={{ x: 1300, y: 500 }}
          dataSource={data}
          style={{ textAlign: "end" }}
          rowKey="id"
        /> */}
      </div>
    </>
  );
};

export default observer(HomeParcelInStock);
