import { Card, Col, Divider, Image, Row, Typography } from "antd";
import { observer } from "mobx-react-lite";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineAccessTime,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import { formatDateThai } from "../../../../helper/components";
import { pathImages } from "../../../../constants/RoutePath";
import { useEffect } from "react";
import HTMLReactParser from "html-react-parser/lib/index";

const TestNewsDetails = () => {
  const { state } = useLocation();

  const data = JSON.parse(state);

  return (
    <div
      style={{
        marginBottom: 30,
      }}
    >
      {/* วันที่ ที่สร้าง (สร้างเมื่อ) */}
      <Row
        style={{
          marginTop: 50,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            marginRight: 5,
            position: "relative",
            top: 2,
          }}
        >
          <MdOutlineAccessTime />
        </div>
        <div>{formatDateThai(data.createdAt)}</div>
      </Row>

      {/* รูปภาพหลัก */}
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Image width="100%" src={pathImages.news + data.imageName} />
        </Col>
      </Row>

      {/* หัวข้อ */}
      <Row>
        <Col span={24}>
          <Typography>
            <div
              style={{
                display: "flex",
                marginTop: 30,
              }}
            >
              <div
                style={{
                  marginTop: 2,
                }}
              >
                <MdKeyboardDoubleArrowRight size={40} />
              </div>
              <div
                style={{
                  fontSize: 25,
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                {data.title}
                {/* {data.title.substring(0, 70)} */}
                {/* {data.title.length > 128 && "..."} */}
              </div>
            </div>
          </Typography>
        </Col>
      </Row>

      {/* ข้อมูล */}
      <Row>
        <Col span={24}>
          <div style={{ fontSize: 20 }}>{HTMLReactParser(data.body)}</div>
        </Col>
      </Row>

      {/* รูปภาพเพิ่มเติม */}
      {data.newsPhotos.length !== 0 && (
        <Row>
          <Col span={24}>
            <Divider orientation="left" style={{ fontSize: 23 }}>
              รูปภาพเพิ่มเติม
            </Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {data.newsPhotos.map((item: any, i: number) => (
                <Col
                  xs={8}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                  xxl={3}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 30,
                  }}
                  key={i}
                >
                  <Card hoverable>
                    <div>
                      <Image
                        width="100%"
                        src={pathImages.newsPhoto + item.url}
                      />
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default observer(TestNewsDetails);
