import { Badge, Card } from "antd";
import { observer } from "mobx-react-lite";
import { RAP } from "../models/RAP";
import { pathImages } from "../constants/RoutePath";
import dayjs from "dayjs";

const { Meta } = Card;

const CardResearch = (props: { item: RAP }) => {
  const { item } = props;

  return (
    <Badge.Ribbon
      color="#6aad6a"
      text={"ปี " + dayjs(item.year).format("YYYY")}
    >
      <Card
        hoverable
        style={{
          borderRadius: 20,
        }}
        cover={
          <center>
            <img
              style={{
                maxWidth: "90%",
                marginTop: 10,
                borderRadius: 15,
              }}
              src={pathImages.research + item.image}
            />
          </center>
        }
      >
        <Meta title={item.name} description={null} />
      </Card>
    </Badge.Ribbon>
  );
};

export default observer(CardResearch);
