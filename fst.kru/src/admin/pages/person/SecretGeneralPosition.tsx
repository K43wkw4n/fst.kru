import { Button, Col, Form, Input, Modal, Row } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../store/store";
import { generalPosition } from "../../../models/GeneralPosition";
import { notify } from "../../../helper/components";
import { HappyProvider } from "@ant-design/happy-work-theme";
import PopConfirms from "../../../components/PopConfirm";
import DataTable from "../../../components/DataTable";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import MyRemovePop from "../../../components/MyRemovePop";
import MyButton from "../../../components/MyButton";
import { TitlePath } from "../../../constants/TitlePath";

const SecretGeneralPosition = () => {
  const [form] = Form.useForm();
  const {
    generalPosition,
    getGeneralPositions,
    createUpdateGeneralPosition,
    removeGeneralPosition,
  } = useStore().userStore;

  const [open, setOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState<any>([]);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  useEffect(() => {
    getGeneralPositions();
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (dataEdit.length !== 0) {
        form.setFieldsValue({
          generalPositionName: dataEdit.generalPositionName,
        });
      } else {
        form.setFieldsValue({
          generalPositionName: null,
        });
      }
    }
  }, [dataEdit, form, isFormInitialized]);

  const onFinish = async (values: generalPosition) => {
    values.id = dataEdit.id || 0;

    createUpdateGeneralPosition(values).then(() => {
      getGeneralPositions();
      setOpen(false);
      setDataEdit([]);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);

    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const handleRemove = (id: number) => {
    removeGeneralPosition(id).then(() => {
      getGeneralPositions();
    });
  };

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    setOpen(true);
  };

  const columns: any = [
    {
      id: 2,
      title: "ชื่อ",
      dataIndex: "generalPositionName",
      key: "generalPositionName",
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
        //     name={e?.generalPositionName}
        //     functionRemove={handleRemove}
        //     id={e.id}
        //   />
        // </HappyProvider>
      ),
      width: 80,
    },
  ];

  const data: any = generalPosition?.map((items) => {
    const { item, disable }: any = items;
    // const { item, disable }: { item: generalPosition; disable: boolean } =
    //   items;

    return {
      id: item?.id,
      generalPositionName: item?.generalPositionName,
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
        <MyTitleAdmin name={TitlePath.generalPosition} />

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
        title="ตำแหน่งทั่วไป"
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
          name="createUpdategeneralPosition"
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
              <Col span={24} style={{ marginTop: 15 }}>
                <Form.Item
                  label="ชื่อตำแหน่งทั่วไป"
                  name="generalPositionName"
                  rules={[
                    { required: true, message: "กรุณากรอกชื่อตำแหน่งทั่วไป" },
                  ]}
                >
                  <Input placeholder="ชื่อตำแหน่งทั่วไป" />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default observer(SecretGeneralPosition);
