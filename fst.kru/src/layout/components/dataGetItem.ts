import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: string | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
  } as MenuItem;
}

//ทุกอันต้องมี
export const itemsAll: MenuItem[] = [
  getItem("หน้าหลัก", "0"),
  getItem("บุคลากร", "15"),
  getItem("งานวิจัย", "1"),
];

export const itemsCurriculum: MenuItem[] = [getItem("หลักสูตร", "14")];

export const itemParcel: MenuItem[] = [
  getItem("กลับ", "6"),
  getItem("พัสดุคงเหลือ", "7"),
  getItem("พัสดุทั้งหมด", "8"),
  getItem("นำเข้าใบเบิก", "9"),
  getItem("ใบจ่ายพัสดุ", "10"),
];

export const itemPersonnal: MenuItem[] = [getItem("จัดการพัสดุ", "12")];

export const itemsAdmin: MenuItem[] = [getItem("จัดการระบบ", "11")];
