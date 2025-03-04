import React from "react";

interface props {
  name: string;
}

const MyTitleAdmin = ({ name }: props) => {
  return (
    <div>
      <h1 style={{ color: "gray" }}>{name}</h1>
    </div>
  );
};

export default MyTitleAdmin;
