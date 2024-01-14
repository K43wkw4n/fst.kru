import { useEffect, useRef, useState } from "react";
import { useStore } from "../../../store/store";
import { observer } from "mobx-react-lite";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { Button, Table, Modal, Input, Space } from "antd";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../../constants/RoutePath";
import type { InputRef } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Parcels } from "../../../models/Supplies";
import DataTable from "../../../components/DataTable";

const confirm = Modal.confirm;

const HomeParcel = () => {
  const { parcel, getParcelList, removeParcel } = useStore().parcelStore;

  useEffect(() => {
    getParcelList();
  }, []);

  // const test: any = JSON.stringify(parcel);

  // console.log("data :L ", parcel[0]?.id);
  // console.log("supplies :L ", test[0]?.id == "1004" ? "=" : "!=");

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
        moment(text).format("DD/MM/YYYY")
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
      title: "ปี (วัน / เดือน / ปี)",
      dataIndex: "year",
      key: "year",
      align: "center",
      // render: (e: any) => <div>{moment(e.year).format("DD/MM/YYYY")}</div>,
      ...getColumnSearchProps("year"),
    },
    {
      id: 5,
      title: "แก้ไข",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <NavLink
          key={`edit-${e.id}`}
          to={RoutePath.createparcel}
          state={JSON.stringify(e)}
          style={{
            textDecoration: "none",
            color: "gray",
            fontWeight: "unset",
          }}
        >
          <HappyProvider>
            <Button color="whtie">แก้ไข</Button>
          </HappyProvider>
        </NavLink>
      ),
      fixed: "right",
      width: 90,
    },
    {
      id: 6,
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <HappyProvider key={`delete-${e.id}`}>
          <Button
            color="whtie"
            onClick={() => showRemoveConfirm(e.parcelName, e.id)}
            disabled
          >
            ลบ
          </Button>
        </HappyProvider>
      ),
      fixed: "right",
      width: 80,
    },
  ];

  function showRemoveConfirm(parcelName: string, parcelId: number) {
    confirm({
      title: "คุณแน่ใจใช่ไหมที่จะลบพัสดุนี้",
      content: "ลบพัสดุ : " + parcelName,
      okText: "ใช่ ลบเลย",
      okType: "danger",
      cancelText: "ไม่",
      onOk() {
        removeParcel(parcelId);
      },
      onCancel() {
        console.log("Cancel");
      },
      wrapClassName: "vertical-center-modal",
    });
  }

  const data = parcel.map((item: Parcels) => {
    return {
      id: item.id,
      parcelName: item.parcelName,
      classifier: item.classifier,
      price: item.price,
      year: item.year,
      quantity: item.quantity,
    };
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        พัสดุทั้งหมด
      </div>
      <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
        <NavLink
          to={RoutePath.createparcel}
          state={JSON.stringify([
            {
              id: 0,
              parcelName: "", //ชื่อพัสดุ
              classifier: "", //ชื่อหน่อยของพัสดุ
              price: 1, //ราคา
              year: Date,
              quantity: 0,
            },
          ])}
          style={{
            textDecoration: "none",
            color: "gray",
            fontWeight: "unset",
          }}
        >
          <HappyProvider>
            <Button color="whtie">เพิ่มพัสดุ</Button>
          </HappyProvider>
        </NavLink>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default observer(HomeParcel);
