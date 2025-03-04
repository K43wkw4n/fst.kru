import Lottie from "lottie-react";
import { observer } from "mobx-react-lite";
import notfow from "../assets/lotties/NotFound.json";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <Lottie loop autoPlay animationData={notfow} />
      </div>
    </div>
  );
};

export default observer(NotFound);
