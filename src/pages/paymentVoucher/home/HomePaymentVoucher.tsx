import { HappyProvider } from "@ant-design/happy-work-theme";
import { Button, Input, Modal, Space, Table, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { NavLink, json } from "react-router-dom";
import { useStore } from "../../../store/store";
import { useEffect, useRef, useState } from "react";
import { PaymentVoucher } from "../../../models/PaymentVoucher";
import type { InputRef } from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { RoutePath } from "../../../constants/RoutePath";
import { ViewPaymentVoucher } from "./ViewPaymentVoucher";
import dayjs from "dayjs";

const confirm = Modal.confirm;

const HomePaymentVoucher = () => {
  const {
    paymentVouchersByBranch,
    getPaymentVouchersByBranch,
    removePaymentVoucher,
    confirmPaymentVoucher,
  } = useStore().paymentVoucherStore;
  const { currentBranchId } = useStore().BranchStore;

  const [modalOpen, setModalOpen] = useState(false);
  const [evenConfirm, setEvenConfirm]: any = useState([]);

  useEffect(() => {
    getPaymentVouchersByBranch(Number(currentBranchId));
  }, []);

  useEffect(() => {
     
  }, [paymentVouchersByBranch])
  

  function showRemoveConfirm(name: string, id: number) {
    confirm({
      title: "คุณแน่ใจใช่ไหมที่จะลบใบเบิกนี้",
      content: "ลบใบเบิกที่ : " + name,
      okText: "ใช่ ลบเลย",
      okType: "danger",
      cancelText: "ไม่",
      onOk() {
        console.log("Success");
        removePaymentVoucher(id).then(() => {
          getPaymentVouchersByBranch(Number(currentBranchId));
        });
      },
      onCancel() {
        console.log("Cancel");
      },
      wrapClassName: "vertical-center-modal",
    });
  }

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
      ) : (
        text
      ),
  });

  const columns: any = [
    {
      id: 1,
      title: "ใบสำคัญเลขที่",
      dataIndex: "paymentVoucherImportantId",
      key: "paymentVoucherImportantId",
      align: "center",
      ...getColumnSearchProps("paymentVoucherImportantId"),
    },
    {
      id: 2,
      title: "เพื่อใช้สำหรับ",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      id: 3,
      title: "สถานะ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => {
        return e.paymentVoucherStatus === 1 ? (
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
        record.paymentVoucherStatus.toString() === value,
    },
    {
      id: 4,
      title: "สร้างเมื่อ",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    {
      id: 7,
      title: "ชื่อคนอนุมัติ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => {
        return e.paymentVoucherStatus === 1 ? (
          <div style={{ fontSize: 15 }}>{e.personApproving}</div>
        ) : (
          <div style={{ fontSize: 15 }}>รอการอนุมัติ</div>
        );
      },
    },
    {
      id: 8,
      title: "ยืนยัน",
      dataIndex: "",
      key: "",
      align: "center",
      fixed: "right",
      width: 90,
      render: (e: any) => {
        return (
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
      id: 9,
      title: "แก้ไข",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <NavLink
          key={`edit-${e.id}`}
          to={RoutePath.createpaymentvoucher}
          state={JSON.stringify(e)}
          style={{
            textDecoration: "none",
            color: "gray",
            fontWeight: "unset",
          }}
        >
          <HappyProvider key={`edit-${e.id}`}>
            <Button
              disabled={e.paymentVoucherStatus === 1 ? true : false}
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
      id: 10,
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <HappyProvider key={`delete-${e.id}`}>
          <Button
            disabled={e.paymentVoucherStatus === 1 ? true : false}
            color="whtie"
            onClick={() => showRemoveConfirm(e.paymentVoucherImportantId, e.id)}
          >
            ลบ
          </Button>
        </HappyProvider>
      ),
      fixed: "right",
      width: 80,
    },
  ];

  const data = paymentVouchersByBranch.map((item: any) => {
    return {
      id: item.id,
      paymentVoucherImportantId: item.paymentVoucherImportantId,
      description: item.description,
      paymentVoucherStatus: item.paymentVoucherStatus,
      createdAt: dayjs(item.createdAt).format("DD/MM/YYYY"),
      personApproving: item.personApproving,
      paymentVoucherItem: item.paymentVoucherItem,
      personnel: item.personnel,
    };
  });

  console.log("evenConfirm L::", JSON.stringify(evenConfirm));

  const handlePrint = () => {
    window.print();
  };

  const dataParcel =
    evenConfirm.length !== 0 &&
    evenConfirm?.paymentVoucherItem.map((item: any, i: any) => {
      return {
        ...item.parcel,
        i: i + 1,
        quantity: item.quantity,
        note: item.note,
      };
    });

  const confirmPayment = (e: any) => {
    console.log("e :LL:L", e.id);

    confirm({
      title: "คุณแน่ใจใช่ไหมที่จะยืนยันการเบิกนี้",
      content: "ยืนยันใบเบิกที่ : " + e.paymentVoucherImportantId,
      okText: "ใช่ ยืนยัน",
      okType: "dashed",
      cancelText: "ไม่",
      onOk() {
        console.log("currentBranchId", currentBranchId);

        confirmPaymentVoucher(e.id).then(() => {
          getPaymentVouchersByBranch(Number(currentBranchId));
          setModalOpen(false);
        });
      },
      onCancel() {
        console.log("Cancel");
      },
      wrapClassName: "vertical-center-modal",
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
        <NavLink
          to={RoutePath.createpaymentvoucher}
          state={JSON.stringify([
            {
              id: 0,
              paymentVoucherImportantId: "",
              description: "",
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
        scroll={{ x: 1300, y: 500 }}
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
                confirmPayment(evenConfirm);
              }}
              disabled={evenConfirm.paymentVoucherStatus === 1 ? true : false}
            >
              ยืนยันการเบิก
            </Button>
          </div>,
        ]}
      >
        <ViewPaymentVoucher dataParcel={dataParcel} evenConfirm={evenConfirm} />
      </Modal>
    </div>
  );
};

export default observer(HomePaymentVoucher);
