import { Button, Col, Form, Input, Modal, Row } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../store/store";
import { Position } from "../../../models/Position";
import { notify } from "../../../helper/components";
import { HappyProvider } from "@ant-design/happy-work-theme";
import PopConfirms from "../../../components/PopConfirm";
import DataTable from "../../../components/DataTable";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import MyRemovePop from "../../../components/MyRemovePop";
import MyButton from "../../../components/MyButton";
import { TitlePath } from "../../../constants/TitlePath";

const SecretPosition = () => {
  const [form] = Form.useForm();
  const { position, getPositions, createUpdatePosition, removePosition } =
    useStore().userStore;

  const [open, setOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState<any>([]);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  useEffect(() => {
    getPositions();
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (dataEdit.length !== 0) {
        form.setFieldsValue({
          positionName: dataEdit.positionName,
          sequence: dataEdit.sequence,
        });
      } else {
        form.setFieldsValue({
          positionName: null,
          sequence: null,
        });
      }
    }
  }, [dataEdit, form, isFormInitialized]);

  const onFinish = async (values: Position) => {
    values.id = dataEdit.id || 0;

    createUpdatePosition(values).then(() => {
      getPositions();
      setOpen(false);
      setDataEdit([]);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);

    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const handleRemove = (id: number) => {
    removePosition(id);
  };

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    setOpen(true);
  };

  const columns: any = [
    {
      id: 2,
      title: "ชื่อ",
      dataIndex: "positionName",
      key: "positionName",
    },
    {
      id: 2,
      title: "ลำดับที่แสดง",
      dataIndex: "sequence",
      key: "sequence",
    },
    {
      id: 5,
      title: "แก้ไข",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <MyButton
          functionOnClick={() => {
            handleEdit(e);
            setIsFormInitialized(true);
          }}
          title="แก้ไข"
        />
        // <HappyProvider>
        //   <Button
        //     color="whtie"
        //     onClick={() => {
        //       handleEdit(e);
        //       setIsFormInitialized(true);
        //     }}
        //   >
        //     แก้ไข
        //   </Button>
        // </HappyProvider>
      ),
      width: 90,
    },
    {
      id: 6,
      title: "ลบ",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <MyRemovePop
          functionRemove={() => handleRemove(e.id)}
          disabled={e.disable}
          titleTooltip={2}
        />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <PopConfirms
        //     name={e?.positionName}
        //     functionRemove={handleRemove}
        //     id={e.id}
        //   />
        // </HappyProvider>
      ),
      width: 80,
    },
  ];

  console.log("position", position);

  const data: any = position?.map((items) => {
    const { item, disable }: any = items;
    // const { item, disable }: { item: Position; disable: boolean } = items;

    return {
      id: item?.id,
      positionName: item?.positionName,
      sequence: item?.sequence,
      disable: disable,
    };
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <MyTitleAdmin name={TitlePath.position} />

        <MyButton
          functionOnClick={() => {
            setOpen(true);
            setIsFormInitialized(true);
          }}
          title="เพิ่ม"
        />
        {/* <HappyProvider>
          <Button
            color="whtie"
            onClick={() => {
              setOpen(true);
              setIsFormInitialized(true);
            }}
          >
            เพิ่ม
          </Button>
        </HappyProvider> */}
      </div>

      <DataTable data={data} columns={columns} sizeX={500} />

      <Modal
        title="ตำแหน่ง"
        wrapClassName="vertical-center-modal"
        open={open}
        okText="บันทึก"
        cancelText="ยกเลิก"
        onOk={() => form.submit()}
        onCancel={() => {
          setOpen(false);
          setDataEdit([]);
          setIsFormInitialized(false);
        }}
      >
        <Form
          form={form} // Use the form instance
          name="createUpdatePositionName"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            ...dataEdit,
          }}
          autoComplete="off"
          layout="vertical"
        >
          <div style={{ marginTop: 15 }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
              <Col span={17} style={{ marginTop: 15 }}>
                <Form.Item
                  label="ชื่อตำแหน่ง"
                  name="positionName"
                  rules={[{ required: true, message: "กรุณากรอกชื่อตำแหน่ง" }]}
                >
                  <Input placeholder="ชื่อตำแหน่ง" />
                </Form.Item>
              </Col>
              <Col span={7} style={{ marginTop: 15 }}>
                <Form.Item
                  label="ลำดับที่แสดง"
                  name="sequence"
                  rules={[{ required: true, message: "กรุณากรอกลำดับที่แสดง" }]}
                >
                  <Input placeholder="ลำดับที่แสดง" type="number" min={1} />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default observer(SecretPosition);
