import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../store/store";
import { HttpStatusCode } from "axios";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Empty,
  Form,
  Input,
  List,
  Popconfirm,
  Row,
} from "antd";
import { HappyProvider } from "@ant-design/happy-work-theme";
import {
  formatDateThai,
  notify,
  rules,
  thaiDateOptions,
} from "../../../helper/components";
import "dayjs/locale/th";
import locale from "antd/lib/locale/th_TH";
import dayjs from "dayjs";
import { JobHistoryM } from "../../../models/JobHistory";
import MyListItem from "../../../components/MyListItem";
import MyRemovePop from "../../../components/MyRemovePop";
import { MdOutlineAccessTime } from "react-icons/md";
import MyButton from "../../../components/MyButton";
import MySave from "../../../components/MySave";

const { TextArea } = Input;

const JobHistory = ({ my_account }: { my_account: boolean }) => {
  const [form] = Form.useForm();
  const { jobHistory, createUpdateJobHistory, removeJobHistory, user } =
    useStore().userStore;

  // const [data, setData] = useState<JobHistoryM[]>(
  //   jobHistory.id !== undefined ? jobHistory : []
  // );

  const [dataEdit, setDataEdit]: any = useState<JobHistoryM>();
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  const [formMode, setFormMode]: any = useState(false);
  const [datePicker, setDatePicker]: any = useState<dayjs.Dayjs | null>(
    // dataEdit?.id === undefined
    //   ? dayjs(Date.now()).add(543, "year")
    //   : dayjs(dataEdit?.startJob)
    dayjs(Date.now()).add(543, "year")
  );

  useEffect(() => {
    // setDatePicker(
    //   dataEdit?.id === undefined
    //     ? dayjs(Date.now()).add(543, "year")
    //     : dayjs(dataEdit?.startJob)
    // );
  }, []);

  useEffect(() => {
    if (isFormInitialized) {
      if (dataEdit.length !== 0) {
        form.setFieldsValue({
          id: dataEdit?.id,
          company: dataEdit.company,
          jobName: dataEdit.jobName,
          position: dataEdit.position,
          description: dataEdit.description,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          id: 0,
          company: null,
          jobName: null,
          position: null,
          description: null,
        });
      }
    }
    setDatePicker(
      dataEdit?.id === undefined
        ? dayjs(Date.now()).add(543, "year")
        : dayjs(dataEdit?.startJob)
    );
  }, [dataEdit, form, isFormInitialized]);

  const onFinish = async (values: any) => {
    const formData = {
      id: dataEdit?.id === undefined ? 0 : dataEdit?.id,
      company: values.company,
      jobName: values.jobName,
      position: values.position,
      description: values.description,
      startJob: datePicker.format(),
    };

    createUpdateJobHistory(formData).then(() => {
      setMode();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    notify("กรุณาใส่ข้อมูลให้ครบถ้วน");
  };

  const onChangeYear = (selectedDate: dayjs.Dayjs | null) => {
    console.log("datePicker selected : ", dayjs(selectedDate));
    setDatePicker(selectedDate);
  };

  const setMode = () => {
    setFormMode(!formMode);
    setIsFormInitialized(!isFormInitialized);
  };

  const renderItem = (item: JobHistoryM) => {
    const date: any = dayjs(item?.startJob).add(-543, "year");

    const thaiStartDate: any = new Intl.DateTimeFormat(
      "th-TH",
      thaiDateOptions
    ).format(date);

    const onRemove = () => {
      removeJobHistory(item?.id);
    };

    const onEdit = () => {
      setMode();
      setDataEdit(item);
      setIsFormInitialized(true);
    };

    console.log("item", item);

    return (
      <Card
        hoverable
        key={item.id}
        style={{
          margin: "20px 0",
        }}
      >
        <Row>
          <div
            style={{
              marginRight: 5,
              position: "relative",
              top: 2,
            }}
          >
            <MdOutlineAccessTime />
          </div>
          <div>{formatDateThai(item.createdAt, "วันที่สร้าง :", 543)}</div>
        </Row>

        <Descriptions title={item?.jobName}>
          <Descriptions.Item label="ชื่อบริษัท">
            {item?.company}
          </Descriptions.Item>
          <Descriptions.Item label="ตำแหน่ง">
            {item?.position}
          </Descriptions.Item>
          <Descriptions.Item label="วันที่เริ่มทำงาน">
            {thaiStartDate}
          </Descriptions.Item>
          <Descriptions.Item label="รายละเอียดเพิ่มเติม">
            {item.description}
          </Descriptions.Item>
        </Descriptions>

        {item.studentId === user?.userId && (
          <Row>
            <Col xs={12} sm={12} md={12} lg={4} xl={3} xxl={2}>
              <MyButton functionOnClick={onEdit} title="แก้ไข" />
              {/* <HappyProvider>
              <Button
                style={{
                  borderRadius: 50,
                }}
                onClick={() => {
                  setMode();
                  setDataEdit(item);
                  setIsFormInitialized(true);
                }}
              >
                แก้ไข
              </Button>
            </HappyProvider> */}
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} xl={3} xxl={2}>
              <MyRemovePop functionRemove={() => onRemove()} />
              {/* <HappyProvider>
              <Popconfirm
                title="ลบประวัติการทำงาน!"
                description="ยืนยันที่จะลบไหม?"
                onConfirm={onRemove}
                onCancel={() => null}
                okText="ใช่"
                cancelText="ไม่"
              >
                <Button
                  style={{
                    borderRadius: 50,
                  }}
                  danger
                >
                  ลบ
                </Button>
              </Popconfirm>
            </HappyProvider> */}
            </Col>
          </Row>
        )}
      </Card>
    );
  };

  console.log("jobHistory", jobHistory);

  return (
    <>
      {/* {data.id === undefined && ( */}

      {!!my_account && (
        <HappyProvider>
          <Button
            style={{
              borderRadius: 50,
            }}
            onClick={() => {
              setMode();
              setDataEdit([]);
            }}
          >
            {formMode ? "กลับ" : "เพิ่มประวัติการทำงาน"}
          </Button>
        </HappyProvider>
      )}

      {/* )} */}

      {formMode ? (
        <Form
          form={form}
          name="profile"
          initialValues={{
            ...dataEdit,
            startJob: dataEdit?.startJob
              ? dayjs(dataEdit?.startJob)
              : dayjs(Date.now()).add(543, "year"),
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}
            style={{
              marginTop: 20,
            }}
          >
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="ชื่อบริษัท"
                name="company"
                rules={rules("ชื่อบริษัท")}
              >
                <Input placeholder="ชื่อบริษัท" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="ชื่องาน"
                name="jobName"
                rules={rules("ชื่องาน")}
              >
                <Input placeholder="ชื่องาน" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="ตำแหน่ง"
                name="position"
                rules={rules("ตำแหน่ง")}
              >
                <Input placeholder="ตำแหน่ง" />
              </Form.Item>
              <Form.Item
                label="วันที่เริ่มทำงาน"
                name="startJob"
                rules={[
                  { required: true, message: "กรุณากรอกวันที่เริ่มทำงาน" },
                ]}
              >
                <ConfigProvider locale={locale}>
                  <DatePicker
                    id="startJob"
                    style={{ maxWidth: "100%" }}
                    onChange={onChangeYear}
                    defaultValue={datePicker}
                    value={datePicker}
                    picker="month"
                    allowClear={true}
                  />
                </ConfigProvider>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="รายละเอียด"
                name="description"
                // rules={rules("รายละเอียด")}
              >
                <TextArea placeholder="รายละเอียด" rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <MySave />
          {/* <HappyProvider>
            <Button htmlType="submit" color="whtie">
              บันทึก
            </Button>
          </HappyProvider> */}
        </Form>
      ) : (
        <>
          {jobHistory.length !== 0 ? (
            <>
              <MyListItem data={jobHistory} renderItem={renderItem} />

              {/* {jobHistory?.map((item: JobHistoryM) => )} */}
            </>
          ) : (
            <Empty
              description="ไม่มีข้อมูล"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </>
      )}
    </>
  );
};

export default observer(JobHistory);
