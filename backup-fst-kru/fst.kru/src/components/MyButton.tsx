import { HappyProvider } from "@ant-design/happy-work-theme";
import { Button } from "antd";

interface props {
  functionOnClick?: any;
  title: string;
  disabled?: boolean;
}

const MyButton = ({ functionOnClick, title, disabled = false }: props) => {
  return (
    <HappyProvider>
      <Button
        color="white"
        onClick={functionOnClick}
        style={{
          borderRadius: 50,
        }}
        disabled={disabled}
      >
        {title}
      </Button>
    </HappyProvider>
  );
};

export default MyButton;

//ไม่ได้ทำหน้า project
