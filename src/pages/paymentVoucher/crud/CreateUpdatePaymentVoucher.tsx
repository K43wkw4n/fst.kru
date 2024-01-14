import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Modal,
  Table,
  theme,
  Steps,
  Space,
  Select,
  InputNumber,
} from "antd";
import { observer } from "mobx-react-lite";
import { marginHorizon } from "../../../styes/common.stye";
import { useStore } from "../../../store/store";
import React, { isValidElement, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { rules } from "../../../helper/components";
import moment from "moment";
import {
  ExclamationCircleFilled,
  LockFilled,
  MinusOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Routers } from "../../../App";
import { RoutePath } from "../../../constants/RoutePath";

const confirm = Modal.confirm;

type FieldType = {
  id: number;
  paymentVoucherImportantId: string;
  description: string;
};

const notifyNoParcel = () => toast("กรุณาเลือกอย่างน้อย 1 พัสดุ!");

const CreateUpdatePaymentVoucher = () => {
  const { state } = useLocation();

  const data = JSON.parse(state);

  const {
    createPaymentVoucher,
    paymentItem,
    createPaymentVoucherItem,
    removePaymentVoucherItem,
    noteInPaymentVoucherItem,
    ChangeQuantity,
    getItemById,
    setItem,
  } = useStore().paymentVoucherStore;
  const { parcelOfBranch, getParcelOfBranch } = useStore().parcelStore;
  const { currentBranchId } = useStore().BranchStore;

  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const [newPaymentVId, setnewPaymentVId]: any = useState(
    data.id !== undefined ? data.id : null
  );

  const dataFormat = paymentItem.map((item: any) => ({
    id: item.parcel.id,
    parcelName: item.parcel.parcelName,
    classifier: item.parcel.classifier,
    price: item.parcel.price,
    year: item.parcel.year,
    quantity: item.quantity,
    totalQuantity: item.totalQuantity,
    note: item.note,
    paymentVoucherItemId: item.id,
    parcelOfBranchId: item.parcelOfBranchId,
  }));

  useEffect(() => {
    newPaymentVId !== null && getItemById(newPaymentVId);
  }, [modalOpen]);

  useEffect(() => {
    setParcelSelected(dataFormat);
  }, [paymentItem]);

  const [parcelSelected, setParcelSelected]: any = useState(
    data.id === undefined ? [] : dataFormat
  );

  const allParcel = parcelOfBranch
    .filter((item: any) => item.quantity !== 0)
    .map((item: any) => ({
      id: item.id,
      parcelName: item.parcelName,
      classifier: item.classifier,
      price: item.price,
      year: moment(item.year).format("YYYY"),
      totalQuantity: item.quantity,
      quantity: 1,
      note: "",
      parcelOfBranchId: item.parcelOfBranchId,
    }));

  const onSubmit = (values: any) => {
    console.log("values11 :L", values);

    createPaymentVoucher({
      id: values.id === 0 ? 0 : data.id,
      paymentVoucherImportantId: values.paymentVoucherImportantId,
      description: values.description,
    }).then((e) => {
      console.log("e submit", e);
      setnewPaymentVId(e.paymentVId);
      getItemById(e.paymentVId);
      setParcelSelected(dataFormat);
      setCurrent(+1);
    });
  };

  const paymentVoucherItems = parcelSelected.map((x: any) => {
    return {
      quantity: x.quantity,
      note: x.note,
      parcelOfBranchId: x.parcelOfBranchId,
      paymentVoucherId: newPaymentVId?.paymentVId,
    };
  });

  const showRemoveItemConfirm = (
    name: string,
    paymentVoucherItemId: number,
    parcelOfBranchId: number
  ) => {
    confirm({
      title: "คุณยืนยันที่จะลบพัสดุนี้ใช่ไหม",
      icon: <ExclamationCircleFilled />,
      content: "ลบพัสดุ : " + name,
      okText: "ใช่ ลบเลย",
      cancelText: "ไม่",
      onOk() {
        console.log("paymentVoucherItemId :L ", paymentVoucherItemId);
        console.log("id :L ", parcelOfBranchId);

        setParcelSelected(
          parcelSelected.filter(
            (x: any) => x.parcelOfBranchId !== parcelOfBranchId
          )
        );
        removePaymentVoucherItem(paymentVoucherItemId);
        setItem();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onSubmitItem = () => {
    if (paymentVoucherItems.length !== 0) {
      createPaymentVoucherItem({
        paymentVoucherItems: paymentVoucherItems,
      }).then(() => {
        Routers.navigate(RoutePath.paymentvoucher);
      });
    } else {
      notifyNoParcel();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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
      title: "ปี",
      dataIndex: "year",
      key: "year",
      align: "center",
      render: (e: any) => (
        <div>{moment(e.year).add(+543, "year").format("YYYY")}</div>
      ),
    },
    {
      id: 5,
      title: "จำนวนคงเหลือ",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      align: "center",
    },
    {
      id: 5,
      title: "จำนวนจ่าย",
      dataIndex: "",
      key: "quantity",
      align: "center",
      render: (e: any) => <RenderQuantity props={e} />,
      width: 150,
    },
    {
      id: 6,
      title: "หมายเหตุ",
      dataIndex: "",
      key: "note",
      align: "center",
      render: (e: any) => <RenderNote props={e} />,
    },
    {
      id: 7,
      title: "นำออก",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <HappyProvider key={`delete-${e.id}`}>
          <Button
            color="whtie"
            onClick={() => {
              console.log("e :L ", e);

              showRemoveItemConfirm(
                e.parcelName,
                e.paymentVoucherItemId,
                e.parcelOfBranchId
              );
            }}
          >
            ลบ
          </Button>
        </HappyProvider>
      ),
      width: 80,
    },
  ];

  const columnsModal: any = [
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
      title: "ปี",
      dataIndex: "year",
      key: "year",
      align: "center",
      render: (e: any) => (
        <div>{moment(e.year).add(+543, "year").format("YYYY")}</div>
      ),
    },
    {
      id: 5,
      title: "จำนวนคงเหลือ",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      align: "center",
    },
  ];

  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const contentStyle: React.CSSProperties = {
    lineHeight: "443px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const RenderNote = ({ props }: any) => {
    const { paymentVoucherItemId } = props;

    const [note, setNote] = useState(props.note);

    const onChangeNote = (e: string) => {
      console.log("e :L ", e);
      setNote(e);
      noteInPaymentVoucherItem({ id: paymentVoucherItemId, note: e });
      // data.id === undefined &&
      //   setParcelSelected(
      //     parcelSelected.map((item: any) => {
      //       if (item.id === props.id) {
      //         return { ...item, note: note };
      //       }
      //       return item;
      //     })
      //   );
    };

    return (
      <Input value={note} onChange={(e: any) => onChangeNote(e.target.value)} />
    );
  };

  const RenderQuantity = (props: any) => {
    const { id, paymentVoucherItemId, quantity, totalQuantity } = props.props;

    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const onChange = (e: any) => {
      setCurrentQuantity(e > totalQuantity ? totalQuantity : e);

      ChangeQuantity({ id: paymentVoucherItemId, quantity: e === "" ? 1 : e });
    };

    const minusQuantity = () => {
      currentQuantity !== 1 && setCurrentQuantity(currentQuantity - 1);

      ChangeQuantity({
        id: paymentVoucherItemId,
        quantity: currentQuantity !== 1 ? currentQuantity - 1 : 1,
      });
      // setParcelSelected(
      //   parcelSelected.map((item: any) => {
      //     if (item.id === props.props.id && item.quantity !== 1) {
      //       return { ...item, quantity: item.quantity - 1 };
      //     }
      //     return item;
      //   })
      // );
    };

    const plusQuantity = () => {
      setCurrentQuantity(
        currentQuantity < totalQuantity ? currentQuantity + 1 : totalQuantity
      );
      ChangeQuantity({
        id: paymentVoucherItemId,
        quantity:
          currentQuantity < totalQuantity ? currentQuantity + 1 : totalQuantity,
      });
      // setParcelSelected(
      //   parcelSelected.map((item: any) => {
      //     if (
      //       item.id === props.props.id &&
      //       item.quantity < item.totalQuantity
      //     ) {
      //       return { ...item, quantity: item.quantity + 1 };
      //     }
      //     return item;
      //   })
      // );
    };

    return (
      <div>
        <Button.Group>
          <Button
            icon={<MinusOutlined />}
            onClick={() => {
              minusQuantity();
            }}
          />
          <InputNumber
            value={currentQuantity}
            style={{
              maxWidth: 60,
              minWidth: 35,
              textAlign: "center",
              borderRadius: 0,
            }}
            onChange={(e) => onChange(e)}
            type="number"
            className="no-spin-button"
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              plusQuantity();
            }}
          />
        </Button.Group>
      </div>
    );
  };

  const steps = [
    {
      title: "ใบจ่าย",
      content: (
        <>
          <Form
            form={form}
            name="paymentVoucher"
            initialValues={{
              ...data,
            }}
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            style={{ marginBottom: 100 }}
          >
            <div
              style={{ display: "flex", justifyContent: "center", margin: 20 }}
            >
              เพิ่มใบเบิก
            </div>

            <Row style={marginHorizon}>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
                <Form.Item<FieldType>
                  label="ใบสำคัญเลขที่"
                  name="paymentVoucherImportantId"
                  rules={rules("ใบสำคัญเลขที่")}
                >
                  <Input placeholder="ใบสำคัญเลขที่" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 11, offset: 1 }} lg={{ span: 9, offset: 2 }}>
                <Form.Item<FieldType>
                  label="เพื่อใช้สำหรับ"
                  name="description"
                  rules={rules("เพื่อใช้สำหรับ")}
                >
                  <Input placeholder="เพื่อใช้สำหรับ" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      ),
    },
    {
      title: "เลือกพัสดุ",
      content: (
        <>
          <Table
            columns={columns}
            scroll={{ x: 250, y: 443 }}
            dataSource={parcelSelected}
            style={{ textAlign: "end" }}
            rowKey="id"
            pagination={false}
          />
        </>
      ),
    },
  ];

  const next = () => {
    form.submit();
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const createItem = async (values: any) => {
    const data = {
      quantity: values.quantity,
      note: values.note,
      parcelOfBranchId: values.parcelOfBranchId,
      paymentVoucherId: newPaymentVId,
    };

    await createPaymentVoucherItem({ paymentVoucherItems: [data] }).then(() => {
      getItemById(newPaymentVId);
    });
  };

  const options = allParcel.map((item: any) => {
    return {
      label: "ปี" + " / " + item.year + " : " + item.parcelName,
      value: item.parcelOfBranchId + " : " + item.parcelName,
      id: item.parcelOfBranchId,
    };
  });

  console.log("parcelSelected :LLL", parcelSelected);

  const selectProps = {
    mode: "multiple" as const,
    style: { width: "100%" },
    value:
      parcelSelected.length === 0
        ? []
        : parcelSelected.map(
            (item: any) => item.parcelOfBranchId + " : " + item.parcelName
          ),
    options: options,
    defaultValue: parcelSelected.map(
      (item: any) => item.parcelOfBranchId + " : " + item.parcelName
    ),
    onSelect: (_: any, option: any) => {
      console.log("value : ", option.id);

      const selected: any = allParcel.find(
        (x: any) => x.parcelOfBranchId === option.id
      );

      createItem(selected);

      // const newData = {
      //   id: selected.id,
      //   parcelName: selected.parcelName,
      //   classifier: selected.classifier,
      //   price: selected.price,
      //   year: selected.year,
      //   parcelOfBranchId: selected.parcelOfBranchId,
      //   quantity: selected.quantity,
      //   totalQuantity: selected.totalQuantity,
      //   note: selected.note,
      // };

      // setParcelSelected([...parcelSelected, newData]);
    },
    onDeselect: (_: any, option: any) => {
      const deSelected = parcelSelected.find(
        (item: any) => item.parcelOfBranchId === option.id
      );

      setParcelSelected(
        parcelSelected.filter(
          (x: any) => x.parcelOfBranchId !== deSelected.parcelOfBranchId
        )
      );
      removePaymentVoucherItem(deSelected.paymentVoucherItemId);
      setItem();
    },
    placeholder: "เลือกพัสดุ...",
    maxTagCount: "responsive" as const,
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Steps
          current={current}
          items={items}
          style={{
            width: 800,
          }}
        />
      </div>
      {/* {current === steps.length - 1 && (
          <div style={{ marginTop: 10, marginBottom: 10, marginLeft: 0 }}>
            <div>เลือกพัสดุ</div>
            <PlusCircleOutlined
              style={{ fontSize: 50 }}
              onClick={() => [setModalOpen(true), getSuppliesList()]}
            />
          </div>
        )} */}

      {current === steps.length - 1 && (
        <div style={{ marginTop: 10, marginBottom: 10, marginLeft: 0 }}>
          <div>เลือกพัสดุ</div>
          <PlusCircleOutlined
            style={{ fontSize: 50 }}
            onClick={() => [
              setModalOpen(true),
              getParcelOfBranch(Number(currentBranchId)),
            ]}
          />
        </div>
      )}

      <div style={contentStyle}>{steps[current].content}</div>

      <div style={{ marginTop: 24, display: "flex", justifyContent: "end" }}>
        {current < steps.length - 1 && (
          <Button type="primary" htmlType="submit" onClick={next}>
            ถัดไป
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={onSubmitItem}>
            ตกลง
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            ก่อนหน้า
          </Button>
        )}
      </div>

      <Modal
        title="เลือกพัสดุที่ต้องการเบิก"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => {
          setModalOpen(false);
        }}
        width={1300}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Select {...selectProps} placeholder="ค้นหา" />
          <Table
            columns={columnsModal}
            scroll={{ x: 500, y: 250 }}
            dataSource={parcelSelected}
            style={{ textAlign: "end" }}
            rowKey={(record) => `${record.id}_${record.parcelOfBranchId}`}
            pagination={false}
          />
        </Space>
      </Modal>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default observer(CreateUpdatePaymentVoucher);
