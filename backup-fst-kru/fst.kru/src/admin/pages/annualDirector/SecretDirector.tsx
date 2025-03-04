import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Upload,
} from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import DataTable from "../../../components/DataTable";
import { useStore } from "../../../store/store";
import { FaRegUser } from "react-icons/fa6";
import { notify, rules } from "../../../helper/components";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { InputRef } from "antd";
import { UploadButton } from "../../../components/UploadButton";
import JoditEditor from "jodit-react";
import { pathImages } from "../../../constants/RoutePath";
import {
  CloseOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import MyTitleAdmin from "../../../components/MyTitleAdmin";
import MyAlertCreateSmall from "../../../components/MyAlertCreateSmall";
import { getColumnSearchProps } from "../../../components/Search";
import MyButton from "../../../components/MyButton";
import MyRemovePop from "../../../components/MyRemovePop";
import MySave from "../../../components/MySave";
import { TitlePath } from "../../../constants/TitlePath";

const confirm = Modal.confirm;

const SecretDirector = () => {
  const [form] = Form.useForm();

  const inputRef = useRef<InputRef>(null);

  const editor: any = useRef(null);

  const {
    annualDirectorStore: {
      director,
      getDirector,
      uploadImage,
      createUpdateDirector,
      removePosition,
      // createUpdatePosition,
      removeDirector,
    },
    userStore: { position: positions, getPrefixAndPosition },
  } = useStore();
  const [dataEdit, setDataEdit] = useState<any>([]);

  const [formMode, setFormMode] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  const [content, setContent]: any = useState([]);

  const [photo, setPhoto] = useState<any>(
    dataEdit?.id !== undefined ? dataEdit?.imageName : null
  );

  const [photoUpload, setPhotoUpload] = useState<UploadFile[]>([]);

  const [onError, setOnError] = useState(false);

  const [onSelect, setOnselect] = useState<any>(
    dataEdit.id === undefined ? null : dataEdit.positionId
  );

  const [position, setPosition] = useState<any>(null);

  useEffect(() => {
    getDirector();
    // getDirectorPosition();
    getPrefixAndPosition();
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (dataEdit.length !== 0) {
        form.setFieldsValue({
          fullName: dataEdit.fullName,
          imageName: dataEdit.imageName,
          description: dataEdit.description,
          position: dataEdit.position,
        });
        setOnselect(dataEdit.positionId);
        setPhoto(dataEdit?.imageName);
      } else {
        form.setFieldsValue({
          fullName: null,
          imageName: null,
          description: "",
          position: null,
        });
        setPhoto(null);
        setPhotoUpload([]);
      }
    }
  }, [dataEdit, form, isFormInitialized]);

  var findBudget = positions.find((item) => item.id === onSelect);

  const onFinish = async (values: any) => {
    console.log("values", values);

    if (findBudget) {
      setOnError(false);

      const formattedData = {
        id: dataEdit.id || 0,
        fullName: values.fullName,
        imageName: photo || null,
        description: content,
        positionId: onSelect,
      };

      createUpdateDirector(formattedData).then(() => {
        handleSetMode();
        setDataEdit([]);
      });

      console.log("formattedData", formattedData);
    } else {
      setOnError(true);
      notify("งบตำแหน่งไม่ถูกต้อง!");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    if (!findBudget) {
      setOnError(true);
      notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
    }

    console.log("Failed:", errorInfo);
  };

  const handleSetMode = () => setFormMode(!formMode);

  const handleEdit = async (e: any) => {
    setDataEdit(e);
    handleSetMode();
  };

  const columns: any = [
    {
      id: "fullName",
      title: "ชื่อกรรมการ",
      dataIndex: "",
      key: "fullName",
      ...getColumnSearchProps("fullName", (text: string, record: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: 10 }}>
            {record.imageName ? (
              <Image
                height={30}
                width={30}
                style={{ borderRadius: 100 }}
                src={`${pathImages.director}${record.imageName}`}
              />
            ) : (
              <FaRegUser size={25} />
            )}
          </div>
          <div>
            <div>{text}</div>
          </div>
        </div>
      )),
    },
    {
      id: "position",
      title: "ตำแหน่ง",
      dataIndex: "position",
      key: "position",
      filters: positions.map((item) => ({
        text: item.positionName,
        value: item.id,
      })),
      onFilter: (value: string, record: any) => record.positionId === value,
    },
    // {
    //   id: "isUsed",
    //   title: "แสดง",
    //   dataIndex: "",
    //   key: "",
    //   align: "center",
    //   width: 80,
    //   render: (e: any) => {
    //     return (
    //       <Switch
    //         checkedChildren="แสดง"
    //         unCheckedChildren="ซ่อน"
    //         defaultChecked={e.isUsed}
    //         onClick={() => isUsedDirector(e.id)}
    //       />
    //     );
    //   },
    // },
    {
      id: "edit",
      title: "แก้ไข",
      dataIndex: "",
      key: "edit",
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
      id: "delete",
      title: "ลบ",
      dataIndex: "",
      key: "delete",
      align: "center",
      render: (e: any) => (
        <MyRemovePop functionRemove={() => removeDirector(e.id)} />
        // <HappyProvider key={`delete-${e.id}`}>
        //   <Popconfirm
        //     placement="topRight"
        //     title="ลบออกจากระบบ"
        //     description="คุณยืนยันที่จะลบ ใช่ไหม"
        //     okText="ใช่ ลบเลย"
        //     onConfirm={() => removeDirector(e.id)}
        //     cancelText="ยกเลิก"
        //   >
        //     <Button color="whtie">ลบ</Button>
        //   </Popconfirm>
        // </HappyProvider>
      ),
      width: 80,
    },
  ];

  const data = director.map((item) => {
    return {
      id: item.id,
      fullName: item.fullName,
      imageName: item.imageName,
      isUsed: item.isUsed,
      description: item.description,
      positionId: item.positionId,
      position: item.position.positionName,
    };
  });

  const onChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    const modifiedFileList: any = newFileList.map((file) => {
      if (file.status === "uploading") {
        // ทำการอัพโหลดไฟล์ จะไม่มี status ในขณะที่อัพโหลด ดังนั้นให้ตั้งค่า status เป็น 'uploading'
        return { ...file, status: "uploading" };
      } else {
        // ทำการอัพโหลดสำเร็จ กำหนดค่า status เป็น 'done' และอัพเดท response และ linkProps ตามที่ต้องการ
        return {
          ...file,
          status: "done",
          response: '{"status": "success"}',
          linkProps: '{"download": "image"}',
        };
      }
    });

    setPhotoUpload(modifiedFileList.slice(-1));
    const uploadedFileName = modifiedFileList.slice(-1);

    await uploadImage({ file: uploadedFileName[0].originFileObj }).then((e) => {
      setPhoto(e);
    });
  };

  const onSelectChange = (e: any) => {
    setOnselect(e);
  };

  const optionsPositions = positions.map((item, i) => {
    return {
      key: i.toString(),
      label: item.positionName,
      // (
      //   <>
      //     <Row
      //       style={{
      //         display: "flex",
      //         justifyContent: "space-between",
      //       }}
      //     >
      //       <div>{item.positionName}</div>
      //       <div>
      //         <CloseOutlined
      //           className="hoverRemove"
      //           style={{ padding: 3, borderRadius: 50 }}
      //           onClick={() => showRemoveConfirm(item.positionName, item.id)}
      //         />
      //       </div>
      //     </Row>
      //   </>
      // )
      value: item.id, // ส่งค่าที่ถูกเลือกไป
    };
  });

  // const showRemoveConfirm = (name: string, id: number) => {
  //   confirm({
  //     title: "คุณยืนยันที่จะลบตำแหน่งนี้ใช่ไหม",
  //     icon: <ExclamationCircleFilled />,
  //     content: "ลบตำแหน่ง : " + name,
  //     okText: "ใช่ ลบเลย",
  //     cancelText: "ไม่",
  //     onOk() {
  //       removePosition(id);
  //       setPosition(null);
  //     },
  //     onCancel() {
  //       console.log("Cancel");
  //     },
  //   });
  // };

  // const onCreate = () => {
  //   var result = positions.find((item) => item.positionName === position);

  //   if (result === undefined) {
  //     createUpdatePosition(position);
  //   } else {
  //     notify("มีตำแหน่งนี้อยู่แล้ว");
  //   }
  // };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <MyTitleAdmin name={TitlePath.director} />
        {!formMode ? (
          <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
            <MyButton
              functionOnClick={() => {
                handleSetMode();
                setIsFormInitialized(true);
              }}
              title="เพิ่ม"
            />
            {/* <HappyProvider>
              <Button
                color="whtie"
                onClick={() => {
                  handleSetMode();
                  setIsFormInitialized(true);
                }}
              >
                เพิ่ม
              </Button>
            </HappyProvider> */}
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "end", margin: 10 }}>
            <MyButton
              functionOnClick={() => {
                handleSetMode();
                setDataEdit([]);
                setIsFormInitialized(false);
              }}
              title="กลับ"
            />
            {/* <HappyProvider>
              <Button
                color="whtie"
                onClick={() => {
                  handleSetMode();
                  setDataEdit([]);
                  setIsFormInitialized(false);
                }}
              >
                กลับ
              </Button>
            </HappyProvider> */}
          </div>
        )}
      </div>
      {!formMode ? (
        <DataTable data={data} columns={columns} sizeX={800} />
      ) : (
        <Form
          form={form}
          name="secretAnnualDirector"
          initialValues={{
            imageName: dataEdit.id === undefined ? null : dataEdit?.imageName,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
            <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <Form.Item
                  label="รูปภาพ"
                  name="imageName"
                  rules={[{ required: true, message: "กรุณากรอกรูปภาพ" }]}
                  style={{
                    width: "100%",
                  }}
                >
                  <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    defaultFileList={dataEdit?.imageName}
                    fileList={photoUpload}
                    onChange={onChange}
                    accept=".jpeg, .jpg, .png"
                  >
                    {photoUpload?.length === 0 && dataEdit?.length !== 0 ? (
                      <>
                        {dataEdit?.imageName ? (
                          <img
                            src={`${pathImages.director}${dataEdit?.imageName}`}
                            alt="image"
                            style={{
                              // width: "100%",
                              maxWidth: 150,
                              height: "100%",
                              // objectFit: "cover",
                              // borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <FaRegUser size={30} />
                        )}
                      </>
                    ) : (
                      photoUpload?.length === 0 && UploadButton
                    )}
                  </Upload>
                </Form.Item>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={13} xl={13} xxl={13}>
              <Form.Item
                label="ชื่อกรรมการ"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อกรรมการ",
                  },
                ]}
                style={{
                  width: "100%",
                }}
              >
                <Input placeholder="ชื่อกรรมการ" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={7} xl={7} xxl={7}>
              <Form.Item
                label="ตำแหน่ง"
                name="position"
                validateStatus={onError ? "error" : "success"}
                rules={rules("ตำแหน่ง")}
                help={onError ? "กรุณาเลือกตำแหน่ง" : null}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="เลือกตำแหน่ง"
                  onChange={(e: any) => [onSelectChange(e), setOnError(false)]}
                  options={optionsPositions}
                  allowClear
                  // dropdownRender={(menu) => {
                  //   return (
                  //     <>
                  //       {menu}
                  //       <Divider style={{ margin: "8px 0" }} />
                  //       <Space style={{ padding: "0 8px 4px" }}>
                  //         <Input
                  //           placeholder="กรุณากรอกตำแหน่ง"
                  //           ref={inputRef}
                  //           defaultValue={position}
                  //           onChange={(e: any) => setPosition(e.target.value)}
                  //           onKeyDown={(e) => e.stopPropagation()}
                  //         />
                  //         <MyAlertCreateSmall
                  //           name="เพิ่ม"
                  //           functionRemove={() => {
                  //             position ? onCreate() : alert("กรุณากรอกตำแหน่ง");
                  //           }}
                  //         />
                  //         {/* <Button
                  //           type="text"
                  //           icon={<PlusOutlined />}
                  //           onClick={() =>
                  //             position
                  //               ? showCreateConfirm()
                  //               : alert("กรุณากรอกตำแหน่ง")
                  //           }
                  //         >
                  //           เพิ่ม
                  //         </Button> */}
                  //       </Space>
                  //     </>
                  //   );
                  // }}
                />
              </Form.Item>
              {/* <Form.Item
                  label="ตำแหน่ง"
                  name="position"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกประเภทกรรมการ",
                    },
                  ]}
                  style={{
                    width: "100%",
                  }}
                >
                  <Select
                    showSearch
                    placeholder="เลือกประเภทกรรมการ"
                    optionFilterProp="children"
                    onChange={onChangeSelect}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    allowClear
                    options={directorPosition.map((item) => {
                      return {
                        value: item.id.toString(),
                        label: item.positionName,
                      };
                    })}
                  />
                </Form.Item> */}
            </Col>
          </Row>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ justifyContent: "center" }}
          >
            <Col span={24}>
              <Form.Item
                label="เนื้อหา"
                name="description"
                // rules={
                //   content === ""
                //     ? [{ required: true, message: "กรุณากรอกเนื้อหา" }]
                //     : undefined
                // }
              >
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={(newContent) => {
                    setContent(newContent);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <div
            style={{
              marginTop: 40,
            }}
          >
            <MySave />
          </div>
          {/* <HappyProvider>
            <Button
              style={{
                marginTop: 40,
              }}
              color="whtie"
              htmlType="submit"
            >
              บันทึก
            </Button>
          </HappyProvider> */}
        </Form>
      )}
    </>
  );
};

export default observer(SecretDirector);
