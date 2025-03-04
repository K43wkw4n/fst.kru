import { Col, Row } from "antd";
import ReactPlayer from "react-player";
import { useStore } from "../../../store/store";

const ShowYoutube = () => {
  const {
    BranchStore: { currentBranch },
  } = useStore();

  return (
    currentBranch?.videoUrl && (
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {JSON.parse(currentBranch?.videoUrl)?.map((item: string, i: number) => (
          <Col
            // data-aos="fade-up"
            key={i}
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={6}
            xxl={6}
            style={{
              marginBottom: 20,
            }}
          >
            <ReactPlayer controls height={240} width="100%" url={item} />
          </Col>
        ))}
      </Row>
    )
  );
};

export default ShowYoutube;
