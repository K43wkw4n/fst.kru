import { Col, Row, Table } from "antd";
import moment from "moment";
import React from "react";
import { useStore } from "../../../store/store";

export const ViewOrderSlip = ({ dataParcel, evenConfirm }: any) => {
  const { currentBranch } = useStore().BranchStore;

  const columns: any = [
    {
      id: 1,
      title: "ที่",
      dataIndex: "i",
      key: "i",
      align: "center",
      width: 50,
    },
    {
      id: 2,
      title: "รายการ",
      dataIndex: "parcelName",
      key: "parcelName",
      align: "center",
      render: (text: string) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      ),
      width: 250,
    },
    {
      id: 3,
      title: "จำนวน/หน่วย",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => (
        <div>
          {e.quantity} / {e.classifier}
        </div>
      ),
    },
    {
      id: 4,
      title: "ราคา",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      id: 4,
      title: "รวมเงิน",
      dataIndex: "",
      key: "",
      align: "center",
      render: (e: any) => <div>{e.quantity * e.price}</div>,
    },
    {
      id: 5,
      title: "ปี (วัน / เดือน / ปี)",
      dataIndex: "year",
      key: "year",
      align: "center",
      render: (e: any) => <div>{moment(e.year).format("DD/MM/YYYY")}</div>,
    },
  ];

  return (
    <div className="printable-content">
      <div
        style={{
          fontSize: 25,
        }}
      >
        ใบสำคัญรับวัสดุ
      </div>
      <div
        style={{
          fontSize: 21,
        }}
      >
        {currentBranch.branchNameTH} มหาวิทยาลัยราชภัฏกาญจนบุรี
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginRight: 80,
          fontSize: 18,
        }}
      >
        <div>
          <div>
            ใบสำคัญเลขที่ {evenConfirm?.orderSlipImportantId} /{" "}
            {moment(Date.now()).add(+543, "year").format("YYYY")}
          </div>
          <div>วันที่ {evenConfirm?.createdAt}</div>
        </div>
      </div>

      <Row>
        <Col
          span={13}
          style={{
            marginLeft: 40,
          }}
        >
          <Row
            style={{
              fontSize: 18,
            }}
          >
            ข้าพเจ้า {evenConfirm.personnel?.prefixName}{" "}
            {evenConfirm.personnel?.fullName}
          </Row>
          <Row
            style={{
              fontSize: 18,
            }}
          >
            เลขที่ฎีกา {evenConfirm?.petitionNumber}
          </Row>
          <Row
            style={{
              fontSize: 18,
            }}
          >
            เลขที่ใบเบิก {evenConfirm?.orderSlipNumber}
          </Row>
        </Col>

        <Col span={8}>
          <Row
            style={{
              fontSize: 18,
            }}
          >
            ตำแหน่ง {evenConfirm.personnel?.positionName}
          </Row>
          <Row
            style={{
              fontSize: 18,
            }}
          >
            งบประมาณ {evenConfirm?.budget?.budgetName}
          </Row>
          <Row
            style={{
              fontSize: 18,
            }}
          >
            สถานที่จัดเก็บ {evenConfirm?.storageLocation}
          </Row>
        </Col>
      </Row>

      <Table
        columns={columns}
        scroll={{ x: 900, y: 500 }}
        dataSource={dataParcel}
        style={{ marginTop: 20, marginBottom: 100 }}
        rowKey={(record) => record.id}
        pagination={false}
        footer={() => {
          const totalPrice = dataParcel.reduce(
            (total: number, item: any) => total + item.quantity * item.price,
            0
          );
          return (
            <div
              style={{
                textAlign: "end",
                marginRight: 45,
              }}
            >
              รวม {totalPrice.toLocaleString()}
            </div>
          );
        }}
      />

      <div
        style={{
          marginLeft: 250,
        }}
      >
        <div>
          .............................................................................
        </div>
        <div
          style={{
            fontSize: 18,
          }}
        >
          {evenConfirm.personnel?.prefixName} {evenConfirm.personnel?.fullName}
        </div>
        <div
          style={{
            fontSize: 18,
          }}
        >
          ผู้รับพัสดุ
        </div>
      </div>
    </div>
  );
};
