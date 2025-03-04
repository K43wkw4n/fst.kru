import { Row } from "antd";
import React from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { formatDateThai } from "../helper/components";
import dayjs from "dayjs";

interface props {
  date: Date;
}

const ThaiDateFormat = ({ date }: props) => {
  return (
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
      <div>{formatDateThai(date)}</div>
    </Row>
  );
};

export default ThaiDateFormat;
