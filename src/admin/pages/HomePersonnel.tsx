import { observer } from "mobx-react-lite";
import DataTable from "../../components/DataTable";
import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Upload,
} from "antd";
import { useStore } from "../../store/store";
import { useEffect, useState } from "react";
import { notify } from "../../helper/components";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { HttpStatusCode } from "axios";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { pathImages } from "../../constants/RoutePath";
import { UploadButton } from "../../components/UploadButton";
import { FaRegUser } from "react-icons/fa";

const HomePersonnel = () => {
  const [form] = Form.useForm();

  const { open, openModal, closeModal } = useStore().modalStore;
  const { currentBranchId } = useStore().BranchStore;
  const {
    personnels,
    getPersonnelById,
    prefix,
    generalPosition,
    getPrefixAndPosition,
    position,
    register,
    isUsedUser,
    updatePersonnel,
  } = useStore().userStore;
 
  const [dataEdit, setDataEdit] = useState<any>([]);
  const [file, setFile] = useState<UploadFile[]>([]);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    getPrefixAndPosition();
    getPersonnelById(Number(currentBranchId));
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (dataEdit.length !== 0) {
        const { personnel } = dataEdit;

        form.setFieldsValue({
          prefix: personnel.prefixID,
          generalPosition: personnel.generalPositions.id,
          position: dataEdit.positionId,
          fullName: personnel.fullName,
          userName: personnel.userName,
          password: "",
        });
      } else {
        form.resetFields();
        form.setFieldsValue({  
          position: null, 
        });
      }
    }
    setFile([]);
  }, [dataEdit, form, isFormInitialized]);

  const onFinish = async (values: any) => {
    const data = {
      id: dataEdit.personnelId !== undefined ? dataEdit.personnelId : 0,
      fullName: values.fullName,
      image: file.length === 0 ? null : file[0].originFileObj,
      userName: values.userName,
      password: values.password, 
      generalPositionID: values.generalPosition,
      roleId: 2, //values.roleId,
      prefixID: values.prefix,
      positionId: values.position,
      branchId: Number(currentBranchId),
    };

    if (dataEdit.length === 0) {
      if (values.password.length <= 5) {
        notify("กรุณาใส่รหัสอย่างน้อย 6 ตัวอักษร");
      } else {
        if (file.length === 0 && dataEdit.length === 0) {
          notify("กรุณาใส่รูปภาพสไลด์");
        } else {
          register(data).then((e: any) => {
            console.log("e register :L", e);
            if (e.statusCode === HttpStatusCode.BadRequest) {
              notify(`บางอย่างผิดพลาด!`);
            } else if (e.statusCode === HttpStatusCode.Ok) {
              getPersonnelById(Number(currentBranchId));
              form.resetFields();
              closeModal();
              setDataEdit([]);
            } else {
              notify(`${e}`);
            }
          });
        }
      }
    } else {
      if (values.password.length === 0) {
        updatePersonnel(data).then(() => {
          getPersonnelById(Number(currentBranchId));
          form.resetFields();
          closeModal();
          setDataEdit([]);
        });
      } else {
        if (values.password.length <= 5) {
          notify("กรุณาใส่รหัสอย่างน้อย 6 ตัวอักษร");
        }
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);

    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
    error === false && password === "" && setError(true);
  };

  const columns: any = [
    {
      id: 1,
      title: "รูป",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) =>
        e.personnel.image ? (
          <Image
            height={50}
            src={`https://localhost:7203/person/${e.personnel.image}`}
          />
        ) : (
          <FaRegUser size={30} />
        ),
    },
    {
      id: 2,
      title: "คำนำหน้า",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => <div>{e.personnel.prefixes.prefixName}</div>,
    },
    {
      id: 3,
      title: "ชื่อ-นามสกุล",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => <div>{e.personnel.fullName}</div>,
    },
    {
      id: 4,
      title: "ตำแหน่ง",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => <div>{e.position.positionName}</div>,
    },
    {
      id: 5,
      title: "แสดง",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => {
        return (
          <Switch
            checkedChildren="แสดง"
            unCheckedChildren="ซ่อน"
            defaultChecked={!!e.isUsed}
            onClick={() => isUsedUser(e.personnelId)}
          />
        );
      },
    },
    {
      id: 5,
      title: "แก้ไข",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <HappyProvider>
          <Button
            color="whtie"
            onClick={() => {
              handleEdit(e);
              setIsFormInitialized(true);
            }}
          >
            แก้ไข
          </Button>
        </HappyProvider>
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
            // onClick={() =>
            //   ShowRemoveConfirm("ประชาสัมพันธ์", e.title, e.id, removeNews)
            // }
          >
            ลบ
          </Button>
        </HappyProvider>
      ),
      fixed: "right",
      width: 80,
    },
  ];

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    openModal();
  };
 
  const itemsPrefix = prefix.map((item: any) => {
    return {
      value: item.id,
      label: item.prefixName,
    };
  });

  const itemsGeneralPosition = generalPosition.map((item: any) => {
    return {
      value: item.id,
      label: item.generalPositionName,
    };
  });

  const itemsPosition = position.map((item: any) => {
    return {
      value: item.id,
      label: item.positionName,
    };
  });

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFile(newFileList.slice(-1));
  };

  console.log("dataEdit", JSON.stringify(dataEdit));
  console.log("file", JSON.stringify(file));

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h2>บุคลากร</h2>
        <h2>นักศึกษา</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
        <HappyProvider>
          <Button
            color="whtie"
            onClick={() => {
              openModal();
              setIsFormInitialized(true);
            }}
          >
            เพิ่ม
          </Button>
        </HappyProvider>
      </div>
      <DataTable data={personnels} columns={columns} sizeX={800} />

      <Modal
        title="ลงทะเบียนผู้ใช้ (บุคลากร)"
        wrapClassName="vertical-center-modal"
        open={open}
        okText="ตกลง"
        cancelText="ยกเลิก"
        onOk={() => form.submit()}
        onCancel={() => {
          closeModal();
          setDataEdit([]);
          setIsFormInitialized(false);
        }}
      >
        <Form
          form={form} // Use the form instance
          name="register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            ...dataEdit,
            personnels: dataEdit.personnels,
          }}
          autoComplete="off"
          layout="vertical"
        >
          <div style={{ marginTop: 20 }}>
            <Row>
              <Col span={6}>
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  //   defaultFileList={data.logo}
                  fileList={file}
                  onChange={onChange}
                  accept=".jpeg, .jpg, .png"
                >
                  {file.length === 0 && dataEdit.length !== 0 ? (
                    <>
                      {dataEdit.personnel.image ? (
                        <img
                          src={`${pathImages.personnel}${dataEdit.personnel.image}`}
                          alt="logo"
                          style={{
                            // width: 300,
                            height: "100%",
                            // objectFit: "cover",
                            borderRadius: "7%",
                          }}
                        />
                      ) : (
                        <FaRegUser size={30} />
                      )}
                    </>
                  ) : (
                    file.length === 0 && UploadButton
                  )}
                </Upload>
              </Col>
              <Col span={16}>
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Form.Item
                      name="prefix"
                      rules={[{ required: true, message: "กรุณากรอกคำนำหน้า" }]}
                    >
                      <Select
                        // defaultValue="คำนำหน้า"
                        style={{ width: 150 }}
                        placeholder="คำนำหน้า"
                        options={itemsPrefix}
                        allowClear
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      name="generalPosition"
                      rules={[{ required: true, message: "กรุณากรอกตำแหน่ง" }]}
                    >
                      <Select 
                        style={{ width: 150 }}
                        placeholder="ตำแหน่งทั่วไป"
                        options={itemsGeneralPosition}
                        allowClear
                      />
                    </Form.Item>
                  </div>
                </Row>
                <Row>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Form.Item
                      name="position"
                      rules={[{ required: true, message: "กรุณากรอกตำแหน่ง" }]}
                    >
                      <Select
                        // defaultValue="ตำแหน่ง"
                        style={{ width: 250 }}
                        placeholder="ตำแหน่ง"
                        options={itemsPosition}
                        allowClear
                      />
                    </Form.Item>
                  </div>
                </Row>
              </Col>
            </Row>

            <div>
              <Form.Item
                name="fullName"
                rules={[{ required: true, message: "กรุณากรอกชื่อ-นามสกุล" }]}
              >
                <Input
                  placeholder="ชื่อ-นามสกุล"
                  prefix={<SolutionOutlined />}
                />
              </Form.Item>
            </div>
            <div style={{ marginTop: 20 }}>
              <Form.Item
                name="userName"
                rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
              >
                <Input placeholder="ชื่อผู้ใช้" prefix={<UserOutlined />} />
              </Form.Item>
            </div>
            <div style={{ marginTop: 20 }}>
              <Form.Item
                name="password"
                validateStatus={
                  dataEdit.length === 0 && error
                    ? "error"
                    : password.length <= 5 && password.length > 0
                    ? "error"
                    : "success"
                }
                rules={
                  dataEdit.length === 0 && error
                    ? [{ required: true, message: "กรุณากรอกรหัสผ่าน" }]
                    : undefined
                }
                help={
                  dataEdit.length === 0 && error
                    ? "กรุณากรอกรหัสผ่าน"
                    : password.length <= 5 && password.length > 0
                    ? "อย่างน้อย 6 ตัวอักษร"
                    : null
                }
              >
                <Input.Password
                  placeholder="รหัสผ่าน"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    error === true && setError(false);
                  }}
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default observer(HomePersonnel);
