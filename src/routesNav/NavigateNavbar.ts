import { RoutePath } from "../constants/RoutePath";

export const publicRoute = [
  {
    id: 1,
    name: "หน้าหลัก",
    path: RoutePath.home,
  },
  {
    id: 3,
    name: "หน่วยงาน",
    path: "",
  },
];

export const isLoggedInRoute = [
  {
    id: 1,
    name: "หน้าหลัก",
    path: RoutePath.home,
  },
  {
    id: 2,
    name: "จัดการพัสดุ",
    path: RoutePath.parcel,
  },
  {
    id: 3,
    name: "จัดการระบบ",
    path: RoutePath.homeadmin,
  },
  {
    id: 4,
    name: "หน่วยงาน",
    path: null,
  },
];

export const manageParcelRoute = [
  {
    id: 1,
    name: "กลับ",
    path: RoutePath.home,
  },
  {
    id: 2,
    name: "พัสดุคงเหลือ",
    path: RoutePath.parcelinstock,
  },
  {
    id: 3,
    name: "จัดการพัสดุ",
    path: RoutePath.parcel,
  },
  {
    id: 4,
    name: "นำเข้าใบเบิก",
    path: RoutePath.orderslips,
  },
  {
    id: 5,
    name: "ใบจ่ายพัสดุ",
    path: RoutePath.paymentvoucher,
  },
];

export const dataSystem = [
  {
    id: 1,
    name: "จัดการระบบ",
    path: RoutePath.homeadmin,
  },
  {
    id: 2,
    name: "จัดการผู้ใช้",
    path: null,
  },
];
