import { Descriptions } from "antd";

const ProfileAdmin = ({ data, showUserName = false }: any) => {
  return (
    <Descriptions>
      <Descriptions.Item label="ชื่อ-นามสกุล">
        {data?.fullName}
      </Descriptions.Item>
      {showUserName && (
        <Descriptions.Item label="ชื่อผู้ใช้">
          {data?.userName}
        </Descriptions.Item>
      )}

      {data.roleId === undefined ? (
        <>
          <Descriptions.Item label="ที่อยู่">{data?.address}</Descriptions.Item>
        </>
      ) : (
        <>
          <Descriptions.Item label="ความชำนาน">
            {data?.expert}
          </Descriptions.Item>
          <Descriptions.Item label="วุฒิการศึกษา">
            {data?.lvEdu}
          </Descriptions.Item>
          <Descriptions.Item label="รายละเอียดเพิ่มเติม">
            {data?.description}
          </Descriptions.Item>
        </>
      )}
    </Descriptions>
  );
};

export default ProfileAdmin;
