import { Collapse, theme } from "antd";
import { observer } from "mobx-react-lite";
import React, { CSSProperties } from "react";
import { SubjectGroups } from "../../../models/Curriculum";
import { CaretRightOutlined } from "@ant-design/icons";

interface CartPieProps {
  data: SubjectGroups[] | undefined;
}

const CollapseCradit: React.FC<CartPieProps> = ({ data }) => {
  const Data = data?.map((item) => {
    return item;
  });

  const items = (panelStyle: CSSProperties) =>
    Data?.map((item, i: number) => {
      const credit = item?.subSubjectGroups?.reduce(
        (sum, group) => sum + group?.credit,
        0
      );

      return {
        key: i + 1,
        label: (
          <div
            key={`label-${i + 1}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>{item?.name}</div>
            <div>ไม่น้อยกว่า {credit} หน่วยกิต</div>
          </div>
        ),
        children: item?.subSubjectGroups?.map((subSubject, j: number) => (
          <div
            key={`child-${i + 1}-${j + 1}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 25px",
            }}
          >
            <div>{subSubject?.name}</div>
            <div>{subSubject?.credit} หน่วยกิต</div>
          </div>
        )),
        style: panelStyle,
      };
    });

  const credit = Data?.map((item) => {
    return item?.subSubjectGroups?.reduce(
      (sum, group) => sum + group?.credit,
      0
    );
  });

  const creditSum = credit?.reduce((sum, group) => sum + group, 0);

  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <div>
      <h3>จำนวนหน่วยกิตรวมตลอดหลักสูตร {creditSum} หน่วยกิต</h3>
      <Collapse
        accordion
        bordered
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
        items={items(panelStyle)}
      />
    </div>
  );
};

export default observer(CollapseCradit);
