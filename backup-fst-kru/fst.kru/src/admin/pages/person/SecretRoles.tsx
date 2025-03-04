import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../store/store";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import DataTable from "../../../components/DataTable";
import { Roles } from "../../../models/Roles";
import { notify } from "../../../helper/components";
import { SolutionOutlined } from "@ant-design/icons";
import PopConfirms from "../../../components/PopConfirm";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import MyRemovePop from "../../../components/MyRemovePop";
import MyButton from "../../../components/MyButton";
import { TitlePath } from "../../../constants/TitlePath";

const SecretRoles = () => {
  const [form] = Form.useForm();
  const { roles, getRoles, CreateUpdateRole, removeRole } =
    useStore().userStore;

  const [open, setOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState<any>([]);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (dataEdit.length !== 0) {
        form.setFieldsValue({
          roleName: dataEdit.roleName,
        });
      } else {
        form.setFieldsValue({
          roleName: null,
        });
      }
    }
  }, [dataEdit, form, isFormInitialized]);

  console.log("roles :L", JSON.stringify(roles));

  const onFinish = async (values: Roles) => {
    values.id = dataEdit.id || 0;

    CreateUpdateRole(values).then(() => {
      getRoles();
      setOpen(false);
      setDataEdit([]);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);

    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const handleRemove = (id: number) => {
    const find = roles.find((x: any) => x.id === id);

    if (find?.personnels?.length === 0) {
      removeRole(id).then(() => {
        getRoles();
      });
    } else {
      notify("ไม่สามารถลบได้ บทบาทนี้มีผู้ใช้อยู่");
    }
  };

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    setOpen(true);
  };

  const columns: any = [
    {
      id: 2,
      title: "ชื่อ",
      dataIndex: "roleName",
      key: "roleName",
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
        //     name={e?.roleName}
        //     functionRemove={handleRemove}
        //     id={e.id}
        //   />
        // </HappyProvider>
      ),
      width: 80,
    },
  ];

  const data: any = roles?.map((item: Roles) => {
    return {
      id: item?.id,
      roleName: item?.roleName,
      disable: item.personnels.length > 0,
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
        <MyTitleAdmin name={TitlePath.role} />

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
        title="บทบาท"
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
          name="createUpdateRole"
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
                  label="ชื่อบทบาท"
                  name="roleName"
                  rules={[{ required: true, message: "กรุณากรอกชื่อบทบาท" }]}
                >
                  <Input placeholder="ชื่อบทบาท" />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default observer(SecretRoles);
