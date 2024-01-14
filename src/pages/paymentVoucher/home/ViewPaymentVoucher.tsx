import { Col, Row, Table } from "antd";
import moment from "moment";
import React from "react";
import { useStore } from "../../../store/store";

export const ViewPaymentVoucher = ({ evenConfirm = [], dataParcel }: any) => {
  const { currentBranch } = useStore().BranchStore;

  console.log("dataParcel :Ll11", dataParcel);
  console.log("evenConfirm :Ll11", JSON.stringify(evenConfirm?.personnel));

  const columns: any = [
    {
      id: 1,
      title: "ที่",
      dataIndex: "i",
      key: "i",
      align: "center",
    },
    {
      id: 2,
      title: "รายการ",
      dataIndex: "parcelName",
      key: "description",
      align: "center",
    },
    {
      id: 3,
      title: "จำนวน",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      id: 4,
      title: "หมายเหตุ",
      dataIndex: "note",
      key: "note",
      align: "center",
    },
  ];

  return (
    <div className="printable-content">
      <div
        style={{
          fontSize: 25,
        }}
      >
        ใบสำคัญจ่าย
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
          <Row style={{ fontSize: 18 }}>
            จ่ายให้
            <div
              style={
                evenConfirm.personnel.fullName === ""
                  ? {
                      color: "red",
                      marginLeft: 10,
                    }
                  : { marginLeft: 10 }
              }
            >
              {evenConfirm.personnel.fullName === ""
                ? "รอการอนุมัติ"
                : evenConfirm.personnel?.prefixName +
                  evenConfirm.personnel.fullName}
            </div>
          </Row>
          <Row
            style={{
              fontSize: 18,
            }}
          >
            เพื่อใช้สำหรับ {evenConfirm?.description}
          </Row>
        </Col>

        <Col span={8}>
          <Row
            style={{
              fontSize: 18,
            }}
          >
            ตำแหน่ง {evenConfirm.personnel?.generalPositionName}
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
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div>
          <div>
            {Array.from(
              { length: evenConfirm.personApproving.length * 4 },
              (_, index) => (
                <span key={index}>.</span>
              )
            )}
          </div>
          <div
            style={{
              fontSize: 18,
              display: "flex",
              justifyContent: "center",
            }}
          >
            (
            <div
              style={
                evenConfirm.paymentVoucherStatus === 1
                  ? {
                      marginLeft: 5,
                      marginRight: 5,
                    }
                  : { color: "red", marginLeft: 5, marginRight: 5 }
              }
            >
              {evenConfirm.paymentVoucherStatus === 1
                ? evenConfirm.personApproving
                : "รอการอนุมัติ"}
            </div>
            )
          </div>
          <div
            style={{
              fontSize: 18,
            }}
          >
            อนุมัติจ่าย
          </div>
        </div>
        <div>
          <div>
            {Array.from(
              {
                length:
                  evenConfirm.personnel?.prefixName.length * 4 +
                  evenConfirm.personnel?.fullName.length * 4,
              },
              (_, index) => (
                <span key={index}>.</span>
              )
            )}
          </div>
          <div
            style={{
              fontSize: 18,
            }}
          >
            ( {evenConfirm.personnel?.prefixName}
            {evenConfirm.personnel?.fullName} )
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
    </div>
  );
};
