import { Col, Row, Table } from "antd";
import moment from "moment";
import React from "react";
import { useStore } from "../../../store/store";
import { Kru } from "../../../constants/Kru";

interface ViewPaymentVoucherProps {
  dataParcel: any[];
  evenConfirm: any;
}

export const ViewPaymentVoucher = React.forwardRef<
  HTMLDivElement,
  ViewPaymentVoucherProps
>(({ evenConfirm, dataParcel }, ref) => {
  const { currentBranch } = useStore().BranchStore;

  const columns: any = [
    {
      id: 1,
      title: "ลำดับ",
      dataIndex: "i",
      key: "i",
      align: "center",
      width: 50,
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
    // {
    //   id: 4,
    //   title: "ปี",
    //   dataIndex: "year",
    //   key: "year",
    //   align: "center",
    //   // render: (e: any) => <div>{e.year}</div>,
    // },
    {
      id: 5,
      title: "หมายเหตุ",
      dataIndex: "note",
      key: "note",
      align: "center",
    },
  ];

  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        marginTop: 40,
      }}
      id="html-element-id-to-pdf"
      // className="printable-content"
    >
      <div
        style={{
          fontSize: 25,
        }}
      >
        ใบสำคัญจ่ายพัสดุ
      </div>
      <div
        style={{
          fontSize: 21,
        }}
      >
        {currentBranch.branchName} {Kru.name}
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
            ใบสำคัญเลขที่ {evenConfirm?.paymentVoucherImportantId} /{" "}
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
});
