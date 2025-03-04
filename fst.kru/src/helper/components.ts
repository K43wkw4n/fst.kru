import { Modal, message } from "antd";
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

export const props = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  fileList: [],
  onChange(info: any) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  accept: ".pdf", // กำหนดประเภทของไฟล์ที่ยอมรับ (PDF)
};

export function formatDateThai(
  date: any,
  name: string | null = "วันที่สร้าง :",
  add_year = +543,
  formatNumber: number | null = 1
) {
  const createdAt = new Date(date);

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const day = createdAt.getDate();
  const month = months[createdAt.getMonth()];
  const year = createdAt.getFullYear() + add_year; // นับปี 543 ในปฏิทินไทย

  const hours = createdAt.getHours();
  const minutes = createdAt.getMinutes();

  return formatNumber === 1
    ? `${name} ${day} ${month} ${year}`
    : `${name} ${month} ${year}`;
}

// ${hours}:${minutes}

export const getTagColor = (word: string) => {
  const saturation = 70;
  const lightness = 50;

  const hash = word
    .split("")
    .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const hue = (hash * 0.9) % 360;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const thaiDateOptions: any = {
  year: "numeric",
  month: "long",
  timeZone: "UTC",
};

export const stripHtml = (html: string): string => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};
