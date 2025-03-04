import { HappyProvider } from "@ant-design/happy-work-theme";
import { Button, Popconfirm } from "antd";

interface props {
  name?: string;
  disabled?: boolean;
  functionRemove: any;
}

const MyAlertCreateSmall = ({
  name = "บันทึก",
  disabled = false,
  functionRemove,
}: props) => {
  return (
    <HappyProvider>
      <Popconfirm
        placement="topRight"
        title={name}
        description={`คุณยืนยันที่จะ${name}ใช่ไหม`}
        okText="ใช่"
        onConfirm={() => functionRemove()}
        cancelText="ยกเลิก"
        disabled={disabled}
      >
        <Button
          color="whtie"
          disabled={disabled}
          style={{
            borderRadius: 50,
          }}
        >
          {name}
        </Button>
      </Popconfirm>
    </HappyProvider>
  );
};

export default MyAlertCreateSmall;
