import { Card, Col, Divider, Row } from "antd";
import { observer } from "mobx-react-lite";
import { RoutePath, imageLocal } from "./../../../../constants/RoutePath";
import { NavLink } from "react-router-dom";
// import image1 from "./images/1.jpg";
// import image2 from "./images/6.jpg";
// import image3 from "./images/3.jpg";
// import image4 from "./images/4.jpg";
// import image7 from "./images/7.jpg";
// import image8 from "./images/8.jpg";
import { useStore } from "../../../../store/store";

const image1 = imageLocal.image1;
const image2 = imageLocal.image6;
const image3 = imageLocal.image3;
const image4 = imageLocal.image4;
const image7 = imageLocal.image7;
const image8 = imageLocal.image8;

const AnotherCard = () => {
  const { currentBranchId } = useStore().BranchStore;

  const dataMock = [
    {
      id: 1,
      name: "ปรัชญา วิสัยทัศน์ พันธกิจ",
      // image: image1,
      path: RoutePath.homesection,
    },
    {
      id: 2,
      name: "บุคลากร",
      // image: image2,
      path: RoutePath.homepersonnelpage,
    },
    {
      id: 3,
      name: "หลักสูตร",
      // image: image3,
      // path: RoutePath.curriculum,
      path:
        Number(currentBranchId) === 1
          ? RoutePath.homecurriculum
          : RoutePath.curriculum,
    },
    {
      id: 4,
      name: "โครงการและงานวิจัย",
      // image: image4,
      path:
        Number(currentBranchId) === 1
          ? RoutePath.tabhomeproject
          : RoutePath.homeproject,
    },
    {
      id: 5,
      name: "เราเรียนอะไร",
      // image: image1,
      path: RoutePath.homewelearn,
    },
    {
      id: 6,
      name: "กรรมการประจำคณะ",
      // image: image1,
      path: RoutePath.homeDirector,
    },
    {
      id: 7,
      name: "การทำงานของนักศึกษา",
      // image: image1,
      path:
        Number(currentBranchId) === 1
          ? RoutePath.homeJobHistory
          : RoutePath.jobhistorypage,
    },
  ];

  const image = [image1, image2, image3, image4, image7, image8];

  const data =
    Number(currentBranchId) !== 1
      ? dataMock.filter((x) => x.id !== 1 && x.id !== 6)
      : dataMock.filter((x) => x.id !== 5);

  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 14 }}
      style={{
        marginBottom: -40,
      }}
      className="fade-in-section"
    >
      {data.map((item, i) => (
        <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6} key={item.id}>
          <div
            // data-aos="fade-up"
            style={{
              borderRadius: 20,
              position: "relative",
              height: 210,
              marginBottom: 40,
            }}
          >
            <NavLink
              to={item.path}
              state={
                Number(currentBranchId) !== 1 &&
                item.id === 3 &&
                Number(currentBranchId)
              }
            >
              <img
                style={{
                  borderRadius: 20,
                  objectFit: "cover", // ทำให้รูปเต็มพื้นที่และไม่เบี้ยว
                  objectPosition: "50% 50%", // จัดตำแหน่งรูปตรงกลาง
                }}
                width="100%"
                height="100%" // เพื่อให้รูปภาพเต็มพื้นที่ในทุกกรณี
                src={image[i % image.length]}
                alt="Card Image"
              />
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  xs={12}
                  sm={22}
                  md={18}
                  lg={20}
                  xl={24}
                  xxl={24}
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 25,
                    right: 25,
                    backgroundColor: "white",
                    textAlign: "center",
                    height: "39.4px",
                    borderRadius: 50,
                  }}
                >
                  <h3 style={{ position: "relative", top: -7 }}>{item.name}</h3>
                </Col>
              </Row>
            </NavLink>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default observer(AnotherCard);

{
  /* <Card
        hoverable
        cover={
        <img src="https://picsum.photos/2400/1500?1" alt="Card Image" />
        }
        style={{
        overflow: "hidden",
        }}
    >
        เนื้อหาของ Card
    </Card> */
}
