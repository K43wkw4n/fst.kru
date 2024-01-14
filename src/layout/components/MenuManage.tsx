// import { Dropdown, Space } from "antd";
// import { observer } from "mobx-react-lite";
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import ModalSystemSetting from "../../pages/settingSystem/home/ModalSystemSetting";
// import { useStore } from "../../store/store";
// import { RoutePath } from "../../constants/RoutePath";

// const MenuManage = ({ data, system }: any) => {
//   const [modalSystem, setModalSystem] = useState(false);

//   console.log("data", JSON.stringify(data));

//   const items: any = data.map((item: any) => {
//     return {
//       label:
//         item.name === "จัดการระบบ" ? (
//           <div
//             style={{
//               textAlign: "center",
//             }}
//             onClick={() => {
//               setModalSystem(true);
//             }}
//           >
//             {item.name}
//           </div>
//         ) : (
//           <NavLink
//             to={item.path}
//             className="nav-item animate__animated animate__fadeInDown"
//             style={{
//               textDecoration: "none",
//               color: "gray",
//               fontWeight: "unset",
//             }}
//           >
//             {item.name}
//           </NavLink>
//         ),
//       key: item.id,
//       value: item,
//     };
//   });

//   return (
//     <>
//       <Dropdown menu={{ items: items }}>
//         <NavLink
//           to={RoutePath.homeadmin}
//           className="nav-item animate__animated animate__fadeInDown"
//           style={{
//             textDecoration: "none",
//             color: "gray",
//             fontWeight: "unset",
//           }}
//         >
//           <Space
//             style={{
//               textDecoration: "none",
//               color: "gray",
//               fontWeight: "unset",
//               cursor: "pointer",
//               marginLeft: 20,
//               marginRight: 20,
//             }}
//           >
//             จัดการข้อมูล
//           </Space>
//         </NavLink>
//       </Dropdown>

//       <ModalSystemSetting
//         data={system}
//         open={modalSystem}
//         close={setModalSystem}
//       />
//     </>
//   );
// };

// export default observer(MenuManage);
