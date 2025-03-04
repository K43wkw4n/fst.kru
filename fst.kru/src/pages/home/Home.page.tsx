import { observer } from "mobx-react-lite";
import { Carousel, Col, Divider, Flex, Row, Spin } from "antd";
import { useStore } from "../../store/store";
import HomeNews from "./content/Home.News";
import { useEffect } from "react";
import AnotherCard from "./content/another/AnotherCard";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import ShowYoutube from "./content/ShowYoutube";
import ShowAboutBranch from "./content/ShowAboutBranch";
import { pathImages } from "../../constants/RoutePath";
// import ShowMapBranch from "./content/ShowMapBranch";

const HomePage = () => {
  const {
    BranchStore: {
      news,
      getNewsById,
      slideShow,
      currentBranchId,
      currentBranch,
      setParamsSelectMenu,
    },
    commonStore: { removeSystem },
  } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);

    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth' // เพื่อทำให้มีการเลื่อนแบบสามารถสะดวกได้
    // });

    removeSystem();
    setParamsSelectMenu("1");
    getNewsById(Number(currentBranchId));
  }, [currentBranchId]);

  // const check =
  //   currentBranch &&
  //   currentBranch?.slideShow !== undefined &&
  //   currentBranch.id !== 0 &&
  //   currentBranch?.slideShow.length !== 0;

  // const data = slideShow.length !== 0 ? slideShow : [1, 2, 3, 4];

  const aboutBranch = [
    {
      id: 1,
      topic: "ประเภทหลักสูตร",
      name: currentBranch.categoryBranch,
    },
    {
      id: 2,
      topic: "ประเภทสาขาวิชา",
      name: currentBranch.categoryMajor,
    },
    {
      id: 3,
      topic: "คำอธิบาย",
      name: currentBranch.text,
    },
  ];

  return (
    <>
      <Header adminMode={false} removeFooter={true} />

      <div>
        <Carousel
          autoplay
          draggable
          style={{
            height: "auto",
            marginTop: 5,
          }}
        >
          {slideShow?.map((item, i) => (
            <div style={{ height: 500 }} key={i}>
              <Row>
                <img
                  style={{
                    width: "100%",
                    // maxWidth: "100%", // ขนาดรูปภาพจะไม่เกินขนาด container
                    maxHeight: 640, // ให้รักษาอัตราส่วนของรูปภาพ
                    // objectFit: "cover",
                  }}
                  src={`${pathImages.slideShow}${item.imageName}`}
                  //  src={
                  //   slideShow.length !== 0
                  //     ? `https://localhost:7203/slideShow/${item.imageName}`
                  //     : `https://picsum.photos/2400/1500?${i}`
                  // }
                  // src={`https://localhost:7203/slideShow/${item.imageName}`}
                />
              </Row>
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: 30,
                  fontWeight: "bold",
                }}
              >
                {item.slideShowName}
              </h3>
            </div>
          ))}
        </Carousel>
      </div>

      {/* <div
          key={i}
          style={{
            height: 100,
          }}
        >
          <div
            style={{
              marginTop: 10,
            }}
          >
            <img
              style={{
                width: "100%",
                // maxWidth: "100%", // ขนาดรูปภาพจะไม่เกินขนาด container
                // maxHeight: "80vh", // ให้รักษาอัตราส่วนของรูปภาพ
                // objectFit: "cover",
              }}
              src={
                slideShow.length !== 0
                  ? `https://localhost:7203/slideShow/${item.imageName}`
                  : `https://picsum.photos/2400/1500?${i}`
              }
              // src={`https://localhost:7203/slideShow/${item.imageName}`}
            />
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            {item.slideShowName}
          </div>
        </div> */}

      <Row justify="space-evenly">
        <Col span={21}>
          {currentBranch.id !== 0 && (
            <>
              <HomeNews data={news} />

              <Divider orientation="center">
                <h3>เกี่ยวกับเรา</h3>
              </Divider>

              <Row justify="space-evenly">
                {aboutBranch.map((item) => (
                  <Col
                    key={item.id}
                    style={{
                      marginBottom: 20,
                    }}
                  >
                    {/* <Col data-aos="fade-up"> */}
                    {/* <div className="card-content-home" data-aos="fade-up"> */}
                    <div className="card-content-home">
                      {/* <div className="align-content-home">
                        <span className="red-content-home"></span>
                        <span className="yellow-content-home"></span>
                        <span className="green-content-home"></span>
                      </div> */}

                      <h2>{item.topic}</h2>
                      <p>{item.name}</p>
                    </div>
                  </Col>
                ))}
              </Row>

              {/* <div className="container">
                {aboutBranch.map((item) => (
                  <div className="glass">
                    <div className="card-content-home">
                      <div className="align-content-home">
                        <span className="red-content-home"></span>
                        <span className="yellow-content-home"></span>
                        <span className="green-content-home"></span>
                      </div>

                      <h2>{item.topic}</h2>
                      <p>{item.name}</p>
                    </div>
                  </div>
                ))}
              </div> */}

              <Divider />
              <AnotherCard />

              {/* 
                <ShowAboutBranch />
                <Divider /> */}

              <Divider />
              <ShowYoutube />
              {/* <ShowMapBranch /> */}
            </>
          )}
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default observer(HomePage);
