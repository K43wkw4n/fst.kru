import { Modal } from "antd";
import { toast } from "react-toastify";

const confirm = Modal.confirm;

export const rules = (name: string) => {
  return [{ required: true, message: "กรุณากรอก" + name }];
};

export const showConfirm = (
  name: string, //ลบใบเบิก
  nameObject: string, //ชื่อใบเบิก
  id: any, //ไอดีที่จะลบ
  functionClick: any, //function ที่ต้องการใช้
  functionthen?: any, //function ที่ทำหลังจาก functionClick
  idthen?: number //
) => {
  return confirm({
    title: "คุณแน่ใจใช่ไหมที่จะ" + name + "นี้",
    content: name + " : " + nameObject,
    okText: "ใช่ " + name,
    okType: "danger",
    cancelText: "ไม่",
    onOk() {
      functionClick(id).then(() => {
        functionthen && functionthen(idthen);
      });
    },
    onCancel() {
      console.log("Cancel");
    },
    wrapClassName: "vertical-center-modal",
  });
};

export const notify = (name: string) => toast(name + "!");

export const ShowRemoveConfirm = (
  name: string,
  nameObject: string,
  id: number,
  functionClick: any
) => {
  return confirm({
    title: "คุณแน่ใจใช่ไหมที่จะลบ" + name + "นี้",
    content: "ลบ" + name + " : " + nameObject,
    okText: "ใช่ ลบเลย",
    okType: "danger",
    cancelText: "ไม่",
    onOk() {
      functionClick(id);
    },
    onCancel() {
      console.log("Cancel");
    },
    wrapClassName: "vertical-center-modal",
  });
};
