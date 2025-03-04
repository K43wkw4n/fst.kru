import { HappyProvider } from "@ant-design/happy-work-theme";
import { Button } from "antd";

interface props {
  functionSave?: any;
}

const MySave = ({ functionSave }: props) => {
  return (
    <HappyProvider>
      <Button
        color="white"
        onClick={functionSave}
        style={{
          borderRadius: 50,
        }}
        htmlType="submit"
      >
        บันทึก
      </Button>
    </HappyProvider>
  );
};

export default MySave;

// ไม่ได้ทำในหน้าของ section และ หน้า SecretCurriculum
