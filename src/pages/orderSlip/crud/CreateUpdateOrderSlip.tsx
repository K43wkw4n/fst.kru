import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Modal,
  Space,
  Select,
  Divider,
  Table,
  theme,
  Steps,
  DatePicker,
  ConfigProvider,
  InputNumber,
} from "antd";
import { observer } from "mobx-react-lite";
import { marginHorizon } from "../../../styes/common.stye";
import { useStore } from "../../../store/store";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CloseOutlined,
  ExclamationCircleFilled,
  LockFilled,
  MinusOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const confirm = Modal.confirm;
import "dayjs/locale/th";
import locale from "antd/lib/locale/th_TH";
import type { InputRef } from "antd";
import { useLocation } from "react-router-dom";
import { rules } from "../../../helper/components";
import { HappyProvider } from "@ant-design/happy-work-theme";
import dayjs from "dayjs";
import { Routers } from "../../../App";
import { RoutePath } from "../../../constants/RoutePath";
import moment from "moment";

type FieldType = {
  id: number;
  orderSlipImportantId: string; //ใบสำคัญเลขที่ (ร.001)
  orderSlipNumber: string; //เลขที่ใบเบิก
  petitionNumber: string; //เลขที่ฎีกา
  year: string; //ปีเฉย ๆ (ต้องกรอกเอง)
  storageLocation: string; //สถานที่จัดเก็บ
  budget: any;
};

const CreateUpdaateOrderSlip = () => {
  const { state } = useLocation();

  const data = JSON.parse(state);

  const { budgets, getBudgetList, createBudget, removeBudget } =
    useStore().budgetStore;
  const { parcel, getParcelList } = useStore().parcelStore;

  const {
    orderSlipItem,
    createOrderSlip,
    createOrderSlipItem,
    removeOrderSlipItem,
    ChangeQuantity,
    getItemById,
  } = useStore().orderSlipStore;
  const { openModal } = useStore().modalStore;

  const { currentBranchId, getCurrentBranch } = useStore().BranchStore;

  const [onError, setOnError] = useState(false);
  const [datePicker, setDatePicker]: any = useState<dayjs.Dayjs | null>(
    data.id === undefined
      ? dayjs(Date.now()).add(543, "year")
      : dayjs(data.year)
  );

  // const [onErrorYear, setOnErrorYear] = useState(false);

  const [budget, setBudget] = useState<any>();
  const [onSelect, setOnselect] = useState<any>(
    data.id === undefined ? null : data.budget.id
  );

  useEffect(() => {
    getParcelList();
    getCurrentBranch();
  }, []);

  // console.log("supplies : ", JSON.stringify(supplies));

  // console.log(
  //   "data : ",
  //   data.orderSlipItem.map((item: any) => ({
  //     id: item.supplies.id,
  //     suppliesName: item.supplies.suppliesName,
  //     classifier: item.supplies.classifier,
  //     price: item.supplies.price,
  //     year: item.supplies.year,
  //     quantity: item.quantity,
  //   }))
  // );

  console.log("orderSlipItem :LLL ", JSON.stringify(orderSlipItem));

  const [modalOpen, setModalOpen] = useState(false);

  const [newOrderSlipId, setNewOrderSlipId]: any = useState(
    data.id !== undefined ? data.id : null
  );

  const dataFormat = orderSlipItem.map((item: any) => ({
    id: item.parcel.id,
    parcelName: item.parcel.parcelName,
    classifier: item.parcel.classifier,
    price: item.parcel.price,
    year: moment(item.year).format("YYYY"),
    quantity: item.quantity,
    orderSlipItemId: item.id,
  }));

  useEffect(() => {
    newOrderSlipId !== null && getItemById(newOrderSlipId);
  }, [modalOpen]);

  useEffect(() => {
    setParcelSelected(dataFormat);
  }, [orderSlipItem]);

  // const test1 = data.orderSlipItem.map((item: any) => {
  //   const find: any = supplies.find(
  //     (x: any) => x.suppliesName === item.supplies.suppliesName
  //   );

  //   const newData = {
  //     id: find.id,
  //     suppliesName: find.suppliesName,
  //     classifier: find.classifier,
  //     price: find.price,
  //     year: find.year,
  //     quantity: item.quantity,
  //   };

  //   return newData;
  // });

  const [parcelSelected, setParcelSelected]: any = useState(
    // data.id === undefined ? [] : []
    data.id === undefined ? [] : dataFormat
    // []
  );

  const orderSlipItems = parcelSelected.map((x: any) => {
    return {
      quantity: x.quantity,
      parcelId: x.id,
      orderSlipId: newOrderSlipId,
      branchId: Number(currentBranchId),
    };
  });

  const [current, setCurrent] = useState(0);

  const inputRef = useRef<InputRef>(null);

  const notify = () => toast("งบประมาณไม่ถูกต้อง!");
  const notifyFailed = () => toast("เกิดข้อผิดพลาด!");
  // const notifyYear = () => toast("ปีไม่ถูกต้อง!");
  const notifyNoParcel = () => toast("กรุณาเลือกอย่างน้อย 1 พัสดุ!");

  useEffect(() => {
    getBudgetList();
  }, []);

  var findBudget = budgets.find((item) => item.id === onSelect);

  const onSubmit = (values: any) => {
    console.log("values :LLL", values);

    if (findBudget) {
      console.log("success : ", values);
      setOnError(false);

      createOrderSlip({
        id: values.id === 0 ? 0 : data.id,
        orderSlipImportantId: values.orderSlipImportantId,
        orderSlipNumber: values.orderSlipNumber,
        petitionNumber: values.petitionNumber,
        orderSlipStatus: values.orderSlipStatus,
        year: datePicker.format("YYYY"),
        storageLocation: values.storageLocation,
        budgetId: findBudget.id,
      }).then((e: any) => {
        console.log("e : ", e);
        if (e === undefined) {
          openModal();
        } else {
          console.log("e11 : ", e);
          setCurrent(+1);
          setNewOrderSlipId(e.orderSlipId);
        }
      });
    } else {
      console.log("Failed");
      setOnError(true);
      notify();
    }
  };

  const onSubmitItem = () => {
    if (orderSlipItems.length !== 0) {
      createOrderSlipItem({
        orderSlipItems,
      }).then(() => {
        Routers.navigate(RoutePath.orderslips);
      });
    } else {
      notifyNoParcel();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    if (!findBudget) {
      setOnError(true);
      notifyFailed();
    }
    console.log("Failed:", errorInfo);
  };

  const optionsBudgets = budgets.map((item, i) => {
    return {
      key: i.toString(),
      label: (
        <>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>{item.budgetName}</div>
            <div>
              <CloseOutlined
                className="hoverRemove"
                style={{ padding: 3, borderRadius: 50 }}
                onClick={() => showRemoveConfirm(item.budgetName, item.id)}
              />
            </div>
          </Row>
        </>
      ),
      value: item.id, // ส่งค่าที่ถูกเลือกไป
    };
  });

  const showCreateConfirm = () => {
    confirm({
      title: "คุณยืนยันที่จะเพิ่มงบประมาณนี้ใช่ไหม",
      icon: <ExclamationCircleFilled />,
      content: "เพิ่มงบประมาณ : " + budget,
      okText: "ใช่ เพิ่มเลย",
      cancelText: "ไม่",
      onOk() {
        var result = budgets.find((item) => item.budgetName === budget);

        if (result === undefined) {
          createBudget(budget);
        } else {
          alert("มีงบประมาณนี้อยู่แล้ว");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showRemoveConfirm = (name: string, id: number) => {
    confirm({
      title: "คุณยืนยันที่จะลบงบประมาณนี้ใช่ไหม",
      icon: <ExclamationCircleFilled />,
      content: "ลบงบประมาณ : " + name,
      okText: "ใช่ ลบเลย",
      cancelText: "ไม่",
      onOk() {
        removeBudget(id);
        setBudget(null);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showRemoveItemConfirm = (
    name: string,
    orderSlipItemId: number,
    id: number
  ) => {
    confirm({
      title: "คุณยืนยันที่จะลบพัสดุนี้ใช่ไหม",
      icon: <ExclamationCircleFilled />,
      content: "ลบพัสดุ : " + name,
      okText: "ใช่ ลบเลย",
      cancelText: "ไม่",
      onOk() {
        setParcelSelected(parcelSelected.filter((x: any) => x.id !== id));
        removeOrderSlipItem(orderSlipItemId);
        setBudget(null);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onSelectChange = (e: any) => {
    setOnselect(e);
  };

  //----------------------------------------------------------------------------------------------//

  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const RenderQuantity = (props: any) => {
    const { id, orderSlipItemId, quantity } = props.props;
    console.log("id", orderSlipItemId);
    console.log("quantity", quantity);

    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    console.log("currentQuantity :L", currentQuantity);

    const onChange = (e: any) => {
      console.log("change quantity", e);

      setCurrentQuantity(e);
      console.log("quantity is null");

      ChangeQuantity({ id: orderSlipItemId, quantity: e === "" ? 1 : e });

      // orderSlipItems.find((x:any)=>x.parcelId === id);

      // setParcelSelected(
      //   parcelSelected.map((item: any) => {
      //     if (item.id === id && item.quantity !== 1) {
      //       return { ...item, quantity: e };
      //     }
      //     return item;
      //   })
      // );
      console.log("currentQuantity", currentQuantity);
    };

    const minusQuantity = () => {
      currentQuantity !== 1 && setCurrentQuantity(currentQuantity - 1);
      ChangeQuantity({ id: orderSlipItemId, quantity: currentQuantity - 1 });
      // setParcelSelected(
      //   parcelSelected.map((item: any) => {
      //     if (item.id === id && item.quantity !== 1) {
      //       return { ...item, quantity: item.quantity - 1 };
      //     }
      //     return item;
      //   })
      // );
    };

    const plusQuantity = () => {
      setCurrentQuantity(currentQuantity + 1);
      ChangeQuantity({ id: orderSlipItemId, quantity: currentQuantity + 1 });
      // setParcelSelected(
      //   parcelSelected.map((item: any) => {
      //     if (item.id === id) {
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
      title: "ชื่อหน่อยของพัสดุ",
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
    },
    {
      id: 4,
      title: "ปี (วัน / เดือน / ปี)",
      dataIndex: "",
      key: "year",
      align: "center",
      render: (e: any) => (
        <div>{e && e.year ? dayjs(e.year).format("DD/MM/YYYY") : null}</div>
      ),
    },
    {
      id: 5,
      title: "จำนวน",
      dataIndex: "",
      key: "quantity",
      align: "center",
      render: (e: any) => <RenderQuantity props={e} />,
    },
    {
      id: 6,
      title: "นำออก",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <HappyProvider key={`delete-${e.id}`}>
          <Button
            color="whtie"
            onClick={() => {
              showRemoveItemConfirm(e.parcelName, e.orderSlipItemId, e.id);
            }}
          >
            ลบ
          </Button>
        </HappyProvider>
      ),
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
      title: "ชื่อหน่อยของพัสดุ",
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
    },
    {
      id: 4,
      title: "ปี (วัน / เดือน / ปี)",
      dataIndex: "",
      key: "year",
      align: "center",
      render: (e: any) => (
        <div>{e && e.year ? dayjs(e.year).format("DD/MM/YYYY") : null}</div>
      ),
    },
  ];

  const onChange = (selectedDate: dayjs.Dayjs | null) => {
    console.log("datePicker selected : ", dayjs(selectedDate).format("YYYY"));
    setDatePicker(selectedDate);
  };

  const steps = [
    {
      title: "ใบเบิก",
      content: (
        <>
          <Form
            form={form}
            name="orderSlip"
            initialValues={{
              ...data,
              budget: data.id === undefined ? null : data.budget.id,
              year: data.year
                ? dayjs(data.year).format("YYYY")
                : dayjs(Date.now()).add(543, "year"),
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
                  name="orderSlipImportantId"
                  rules={rules("ใบสำคัญเลขที่")}
                >
                  <Input placeholder="ใบสำคัญเลขที่" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 11, offset: 1 }} lg={{ span: 9, offset: 2 }}>
                <Form.Item<FieldType>
                  label="เลขที่ใบเบิก"
                  name="orderSlipNumber"
                  rules={rules("เลขที่ใบเบิก")}
                >
                  <Input placeholder="เลขที่ใบเบิก" />
                </Form.Item>
              </Col>
            </Row>

            <Row style={marginHorizon}>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
                <Form.Item<FieldType>
                  label="เลขที่ฎีกา"
                  name="petitionNumber"
                  rules={rules("เลขที่ฎีกา")}
                >
                  <Input placeholder="เลขที่ฎีกา" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
                <Form.Item
                  label="ปีงบประมาณ"
                  name="year"
                  // validateStatus={onErrorYear ? "error" : "success"}
                  rules={[{ required: true, message: "กรุณากรอกปีงบประมาณ" }]}
                  // help={onErrorYear ? "กรุณากรอกปีงบประมาณ" : null}
                >
                  {/* <Input
                    // style={[
                    //   {
                    //     width: "100%",
                    //   },
                    //   onErrorYear && { border: "1px solid", borderColor: "red" },
                    // ]}
                    style={{ width: "100%" }}
                    placeholder="ปีของงบประมาณ"
                    minLength={1}
                    maxLength={4}
                    type="number"
                  /> */}
                  <ConfigProvider locale={locale}>
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={onChange}
                      defaultValue={datePicker}
                      picker="year"
                      allowClear={false}
                    />
                  </ConfigProvider>
                </Form.Item>
              </Col>
            </Row>

            <Row style={marginHorizon}>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
                <Form.Item<FieldType>
                  label="สถานที่จัดเก็บ"
                  name="storageLocation"
                  rules={rules("สถานที่จัดเก็บ")}
                >
                  <Input placeholder="สถานที่จัดเก็บ" />
                </Form.Item>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 9, offset: 2 }}>
                <Form.Item<FieldType>
                  label="งบประมาณ"
                  name="budget"
                  validateStatus={onError ? "error" : "success"}
                  rules={rules("งบประมาณ")}
                  help={onError ? "กรุณาเลือกงบประมาณ" : null}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="เลือกงบประมาณ"
                    onChange={(e: any) => [
                      onSelectChange(e),
                      setOnError(false),
                    ]}
                    options={optionsBudgets}
                    allowClear
                    dropdownRender={(menu) => {
                      return (
                        <>
                          {menu}
                          <Divider style={{ margin: "8px 0" }} />
                          <Space style={{ padding: "0 8px 4px" }}>
                            <Input
                              placeholder="กรุณากรอกงบประมาณ"
                              ref={inputRef}
                              defaultValue={budget}
                              onChange={(e: any) => setBudget(e.target.value)}
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={() =>
                                budget
                                  ? showCreateConfirm()
                                  : alert("กรุณากรอกงบประมาณ")
                              }
                            >
                              เพิ่ม
                            </Button>
                          </Space>
                        </>
                      );
                    }}
                  />
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

  const contentStyle: React.CSSProperties = {
    lineHeight: "443px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const options = parcel.map((item: any) => {
    return {
      label:
        "ปี" +
        " / " +
        moment(item.year).format("YYYY") +
        " : " +
        item.parcelName,
      value: item.id + " : " + item.parcelName,
      id: item.id,
    };
  });

  console.log("newOrderSlipId :Ll", newOrderSlipId);

  const createItem = async (values: any) => {
    const data = {
      quantity: 1,
      parcelId: values.id,
      orderSlipId: newOrderSlipId,
      branchId: Number(currentBranchId),
    };

    console.log("data created: ", data);

    await createOrderSlipItem({ orderSlipItems: [data] }).then(() => {
      getItemById(newOrderSlipId);
    });
  };

  const selectProps = {
    mode: "multiple" as const,
    style: { width: "100%" },
    value:
      parcelSelected.length === 0
        ? []
        : parcelSelected.map((item: any) => item.id + " : " + item.parcelName),
    defaultValue: parcelSelected.map(
      (item: any) => item.id + " : " + item.parcelName
    ),
    options: options,
    onSelect: (_: any, option: any) => {
      console.log("selected : ", option.id);

      // const test = parcelSelected.find((item: any) => item.suppliesName == value);

      const selected: any = parcel.find((x: any) => x.id === option.id);

      console.log("parcel data : ", JSON.stringify(parcel));
      console.log("parcel selected : ", selected);

      createItem(selected);

      // const newData = {
      //   id: selected.id,
      //   parcelName: selected.parcelName,
      //   classifier: selected.classifier,
      //   price: selected.price,
      //   year: selected.year,
      //   quantity: 1,
      // };

      // setParcelSelected([...parcelSelected, newData]);
    },
    onDeselect: (_: any, option: any) => {
      console.log("deselect data : ", option);
      console.log("deselect id : ", option.id);

      const deSelected = parcelSelected.find(
        (item: any) => item.id === option.id
      );

      setParcelSelected(
        parcelSelected.filter((x: any) => x.id !== deSelected.id)
      );

      console.log("parcelSelected data : ", parcelSelected);

      removeOrderSlipItem(deSelected.orderSlipItemId);

      // setSupplieSelected(test);

      // Remove the deselected item from supplieSelected
      // setSupplieSelected((prevSelected: any) =>
      //   prevSelected.filter((item: any) => item.suppliesName !== value)
      // );
    },
    // onChange: (values: any) => {
    //   const test = values.map((item: any) => {
    //     const find: any = supplies.find((x: any) => x.suppliesName === item);

    //     const newData = {
    //       id: find.id,
    //       suppliesName: find.suppliesName,
    //       classifier: find.classifier,
    //       price: find.price,
    //       year: find.year,
    //       quantity: 1,
    //     };

    //     return newData;
    //   });

    //   setSupplieSelected([...supplieSelected, ...test]);
    // },
    placeholder: "Select Item...",
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

      {current === steps.length - 1 && (
        <div style={{ marginTop: 10, marginBottom: 10, marginLeft: 0 }}>
          <div>เลือกพัสดุ</div>
          <PlusCircleOutlined
            style={{ fontSize: 50 }}
            onClick={() => [setModalOpen(true), getParcelList()]}
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
        title="เลือกพัสดุ"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => {
          setModalOpen(false);
        }}
        width={1000}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Select {...selectProps} placeholder="ค้นหา" />
          <Table
            columns={columnsModal}
            scroll={{ x: 500, y: 250 }}
            dataSource={parcelSelected}
            style={{ textAlign: "end" }}
            rowKey="id"
            pagination={false}
          />
        </Space>
      </Modal>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default observer(CreateUpdaateOrderSlip);
