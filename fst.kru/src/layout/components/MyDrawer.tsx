import { Drawer, Menu } from "antd";
import React, { SetStateAction, useState } from "react";
import type { MenuProps } from "antd";
import { RoutePath } from "../../constants/RoutePath";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import {
  itemParcel,
  itemPersonnal,
  itemsAdmin,
  itemsAll,
  itemsCurriculum,
} from "./dataGetItem";

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

interface props {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<boolean>;
}

const MyDrawer = ({ openMenu, setOpenMenu }: props) => {
  const navigate = useNavigate();
  const {
    userStore: { isLoggedIn, user, logout },
    commonStore: {
      system,
      removeSystem,
      setSystem,
      selectedKeys,
      setSelectedKeys,
      setKeysToStorage,
    },
    modalStore: { openModal },
    BranchStore: {
      branch,
      setCurrentBranch,
      getCurrentBranch,
      currentBranchId,
    },
  } = useStore();

  const onLogout = () => {
    logout(navigate);
  };

  //เช็คว่าเข้าสู่ระบบหรือยัง
  const itemsProfile: MenuItem[] = isLoggedIn
    ? [
        getItem(user?.fullName, "3", null, [
          getItem("บัญชี", "4"),
          getItem("ออกจากระบบ", "5"),
        ]),
      ]
    : [getItem("เข้าสู่ระบบ", "2")];

  const dataFunction = [
    () => navigate(RoutePath.home), // 0 หน้าหลัก
    () => navigate(RoutePath.homeproject), // 1 งานวิจัย
    () => {
      openModal(), setOpenMenu(false); // 2 เข้าสู่ระบบ
    },
    () => null, // 3 ชื่อผู้ใช้
    () => navigate(RoutePath.myaccount), // 4 บัญชี
    () => {
      onLogout(), removeSystem(); // 5 ออกจากระบบ
    },
    () => {
      navigate(RoutePath.home), removeSystem(); // 6 กลับ
    },
    () => navigate(RoutePath.parcelinstock), // 7 พัสดุคงเหลือ
    () => navigate(RoutePath.parcel), // 8 พัสดุทั้งหมด
    () => navigate(RoutePath.orderslips), // 9 นำเข้าใบเบิก
    () => navigate(RoutePath.paymentvoucher), // 10 ใบจ่ายพัสดุ
    () => navigate(RoutePath.homeadmin), // 11 จัดการระบบ
    () => {
      navigate(RoutePath.parcel), setSystem();
    }, // 12 จัดการพัสดุ
    () => null, // 13 หน่วยงาน
    () =>
      navigate(
        Number(currentBranchId) === 1
          ? RoutePath.homecurriculum
          : RoutePath.curriculum,
        { state: Number(currentBranchId) }
      ), // 14 หลักสูตร
    () => navigate(RoutePath.homepersonnelpage), // 15 บุคลากร
  ];

  const whoLoggedIn =
    user?.roleId === 1
      ? [...itemsAdmin]
      : user?.roleId === 2
      ? []
      : user?.roleId === 3
      ? [...itemPersonnal]
      : [
          getItem(
            "หน่วยงาน",
            "13",
            null,
            branch
              .filter((item) => item.id !== Number(currentBranchId))
              .map((item) => {
                return getItem(item.branchName, `branch_${item.id}`);
              })
          ),
        ];

  const itemsAllCurriculum =
    Number(currentBranchId) === 1
      ? [...itemsAll]
      : [...itemsAll, ...itemsCurriculum];

  const menu = system
    ? [...itemParcel, ...itemsProfile]
    : [...itemsAllCurriculum, ...whoLoggedIn, ...itemsProfile];

  const cutString = (key: string, string: string) => {
    if (key.startsWith(string)) {
      return parseInt(key.substring(string.length));
    } else {
      return 0; // ให้ return undefined เมื่อไม่ใช่ key ที่เริ่มต้นด้วย "v"
    }
  };

  return (
    <Drawer open={openMenu} onClose={() => setOpenMenu(false)} closable={false}>
      <Menu
        theme="light"
        selectedKeys={[selectedKeys]}
        mode="inline"
        items={menu}
        onClick={(item) => {
          const index = parseInt(item.key);

          if (index !== 2) {
            setSelectedKeys(item.key);
            setKeysToStorage(item.key);
          }

          if (dataFunction[index]) {
            dataFunction[index](); // เรียกใช้งานฟังก์ชันจาก dataFunction
          } else {
            setSelectedKeys("0");
            setKeysToStorage("0");
            console.log("selectedKeys", selectedKeys);
            setCurrentBranch(cutString(item.key, "branch_"));
            getCurrentBranch();
            navigate(RoutePath.home);
          }

          setOpenMenu(false);
          // console.log("item", dataFunction[parseInt(item.key)]);
          //   navigate(RoutePath.home);
          //   setOpenMenu(false);
        }}
        style={{
          minHeight: "100%",
          // color: "red",
        }}
      ></Menu>
    </Drawer>
  );
};

export default MyDrawer;
