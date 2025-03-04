import { HappyProvider } from "@ant-design/happy-work-theme";
import { Button, Popconfirm, Tooltip } from "antd";

interface props {
  disabled?: boolean;
  functionRemove: any;
  titleTooltip?: number;
}

const text = ["", "ไม่สามารถลบได้", "ไม่สามารถลบได้เนื่องจากมีการใช้งานอยู่"];

const MyRemovePop = ({
  disabled = false,
  functionRemove,
  titleTooltip = 0,
}: props) => {
  return (
    <HappyProvider>
      <Popconfirm
        placement="topRight"
        title="ลบออกจากระบบ"
        description="คุณยืนยันที่จะลบใช่ไหม"
        okText="ใช่"
        onConfirm={functionRemove}
        cancelText="ยกเลิก"
        disabled={disabled}
      >
        <Tooltip placement="topRight" title={disabled && text[titleTooltip]}>
          <Button
            color="white"
            disabled={disabled}
            danger
            style={{
              borderRadius: 50,
            }}
          >
            ลบ
          </Button>
        </Tooltip>
      </Popconfirm>
    </HappyProvider>
  );
};

export default MyRemovePop;
