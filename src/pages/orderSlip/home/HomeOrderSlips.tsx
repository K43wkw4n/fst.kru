import { useEffect, useRef, useState } from "react";
import { useStore } from "../../../store/store";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { Button, Col, Input, Modal, Row, Space, Table, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../../constants/RoutePath";
import { OrderSlips } from "../../../models/OrderSlips";
import type { InputRef } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { ViewOrderSlip } from "./ViewOrderSlip";

const confirm = Modal.confirm;

const HomeOrderSlips = () => {
  const {
    orderSlipsByBranch,
    getOrderSlipsByBranch,
    removeOrderSlip,
    confirmOrderSlip,
  } = useStore().orderSlipStore;
  const { currentBranchId } = useStore().BranchStore;

  useEffect(() => {
    getOrderSlipsByBranch(Number(currentBranchId));
  }, []);

  function showRemoveConfirm(name: string, id: number) {
    confirm({
      title: "คุณแน่ใจใช่ไหมที่จะลบใบเบิกนี้",
      content: "ลบใบเบิกที่ : " + name,
      okText: "ใช่ ลบเลย",
      okType: "danger",
      cancelText: "ไม่",
      onOk() {
        removeOrderSlip(id).then(() => {
          getOrderSlipsByBranch(Number(currentBranchId));
        });
      },
      onCancel() {
        console.log("Cancel");
      },
      wrapClassName: "vertical-center-modal",
    });
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [evenConfirm, setEvenConfirm]: any = useState([]);

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
      ) : (
        text
      ),
  });

  const confirmOrderSlipL = (e: any) => {
    console.log("e :L", e.id);
    console.log("data :L", {
      orderSlipId: e.id,
      branchId: Number(currentBranchId),
    });
    confirm({
      title: "คุณแน่ใจใช่ไหมที่จะยืนยันการเบิกนี้",
      content: "ยืนยันใบเบิกที่ : " + e.orderSlipImportantId,
      okText: "ใช่ ยืนยัน",
      okType: "dashed",
      cancelText: "ไม่",
      onOk() {
        confirmOrderSlip({
          orderSlipId: e.id,
          branchId: Number(currentBranchId),
        }).then(() => {
          getOrderSlipsByBranch(Number(currentBranchId));
          setModalOpen(false);
        });
      },
      onCancel() {
        console.log("Cancel");
      },
      wrapClassName: "vertical-center-modal",
    });
  };

  const columns: any = [
    {
      id: 1,
      title: "ใบสำคัญเลขที่",
      dataIndex: "orderSlipImportantId",
      key: "orderSlipImportantId",
      align: "center",
      ...getColumnSearchProps("orderSlipImportantId"),
    },
    {
      id: 2,
      title: "เลขที่ใบเบิก",
      dataIndex: "orderSlipNumber",
      key: "orderSlipNumber",
      align: "center",
    },
    {
      id: 3,
      title: "เลขที่ฎีกา",
      dataIndex: "petitionNumber",
      key: "petitionNumber",
      align: "center",
    },
    {
      id: 4,
      title: "สถานะ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => {
        return e.orderSlipStatus === 1 ? (
          <Tag style={{ fontSize: 15 }} color={"green"}>
            ได้รับการอนุมัติแล้ว
          </Tag>
        ) : (
          <div style={{ fontSize: 15 }}>รอการอนุมัติ</div>
        );
      },
      filters: [
        {
          text: "ได้รับการอนุมัติแล้ว",
          value: "1",
        },
        {
          text: "รอการอนุมัติ",
          value: "0",
        },
      ],
      onFilter: (value: string, record: any) =>
        record.orderSlipStatus.toString() === value,
    },
    {
      id: 5,
      title: "ปี",
      dataIndex: "year",
      key: "year",
      align: "center",
    },
    {
      id: 6,
      title: "สถานที่จัดเก็บ",
      dataIndex: "storageLocation",
      key: "storageLocation",
      align: "center",
    },
    {
      id: 7,
      title: "งบประมาณ",
      dataIndex: "budgetId",
      key: "budgetId",
      align: "center",
    },
    {
      id: 8,
      title: "สร้างเมื่อ",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    {
      id: 9,
      title: "ยืนยัน",
      dataIndex: "",
      key: "",
      align: "center",
      fixed: "right",
      width: 90,
      render: (e: any) => {
        return (
          // <HappyProvider key={`confirm-${e.id}`}>
          //   <Button
          //     disabled={e.orderSlipStatus === 1 ? true : false}
          //     color="whtie"
          //     onClick={() => confirmOrderSlipL(e)}
          //   >
          //     ยืนยัน
          //   </Button>
          // </HappyProvider>
          <HappyProvider>
            <Button
              onClick={() => {
                setModalOpen(true);
                setEvenConfirm(e);
              }}
            >
              ดู
            </Button>
          </HappyProvider>
        );
      },
    },
    {
      id: 10,
      title: "แก้ไข",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <NavLink
          key={`edit-${e.id}`}
          to={RoutePath.createorderslips}
          state={JSON.stringify(e)}
          style={{
            textDecoration: "none",
            color: "gray",
            fontWeight: "unset",
          }}
        >
          <HappyProvider key={`edit-${e.id}`}>
            <Button
              disabled={e.orderSlipStatus === 1 ? true : false}
              color="whtie"
            >
              แก้ไข
            </Button>
          </HappyProvider>
        </NavLink>
      ),
      fixed: "right",
      width: 90,
    },
    {
      id: 11,
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: OrderSlips) => (
        <HappyProvider key={`delete-${e.id}`}>
          <Button
            disabled={e.orderSlipStatus === 1 ? true : false}
            color="whtie"
            onClick={() => showRemoveConfirm(e.orderSlipImportantId, e.id)}
          >
            ลบ
          </Button>
        </HappyProvider>
      ),
      fixed: "right",
      width: 80,
    },
  ];

  const data = orderSlipsByBranch.map((item: any) => {
    return {
      id: item.id,
      orderSlipImportantId: item.orderSlipImportantId,
      orderSlipNumber: item.orderSlipNumber,
      petitionNumber: item.petitionNumber,
      orderSlipStatus: item.orderSlipStatus,
      year: item.year,
      storageLocation: item.storageLocation,
      createdAt: moment(item.createdAt).format("DD/MM/YYYY"),
      budget: item.budget,
      budgetId: item.budget?.budgetName,
      orderSlipItem: item.orderSlipItem,
      personnel: {
        id: item.personnel.id,
        fullName: item.personnel.fullName,
        image: item.personnel.image,
        expert: item.personnel.expert,
        lvEdu: item.personnel.lvEdu,
        generalPositionId: item.personnel.generalPositionId,
        roleId: item.personnel.roleId,
        positionName: item.personnel.position.generalPositionName,
        prefixName: item.personnel.prefixName,
      },
    };
  });

  console.log("evenConfirm :LLL", evenConfirm);

  const handlePrint = () => {
    window.print();
  };

  const dataParcel =
    evenConfirm.length !== 0 &&
    evenConfirm?.orderSlipItem.map((item: any, i: any) => {
      return {
        ...item.parcel,
        i: i + 1,
        quantity: item.quantity,
      };
    });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
        <NavLink
          to={RoutePath.createorderslips}
          state={JSON.stringify([
            {
              id: 0,
              orderSlipImportantId: "",
              orderSlipNumber: "",
              petitionNumber: "",
              orderSlipStatus: 0,
              year: "",
              storageLocation: "",
              budgetId: null,
            },
          ])}
          style={{
            textDecoration: "none",
            color: "gray",
            fontWeight: "unset",
          }}
        >
          <HappyProvider>
            <Button color="whtie">เพิ่มใบเบิก</Button>
          </HappyProvider>
        </NavLink>
      </div>

      <Table
        columns={columns}
        scroll={{ x: 2000, y: 500 }}
        dataSource={data}
        style={{ textAlign: "end" }}
        rowKey="id"
      />

      <Modal
        title=""
        // centered
        open={modalOpen}
        style={{
          textAlign: "center",
          top: 60,
        }}
        width={1000}
        onCancel={() => setModalOpen(false)}
        footer={[
          <div
            key="id"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button key="print" onClick={handlePrint}>
              ปริ้น <PrinterOutlined />
            </Button>

            <Button
              key="confirm"
              type="dashed"
              onClick={() => {
                confirmOrderSlipL(evenConfirm);
              }}
              disabled={evenConfirm.orderSlipStatus === 1 ? true : false}
            >
              ยืนยันการนำเข้าใบเบิก
            </Button>
          </div>,
        ]}
      >
        <ViewOrderSlip dataParcel={dataParcel} evenConfirm={evenConfirm} />
      </Modal>
    </div>
  );
};

export default observer(HomeOrderSlips);
