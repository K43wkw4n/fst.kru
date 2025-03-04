import React, { useState } from "react";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { Modal, Upload } from "antd";
import { pathImages } from "../constants/RoutePath";
import { UploadButton } from "./UploadButton";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface props {
  data: [];
  imageName: string;
  file: UploadFile[];
  setFile: any;
  prefixPath: string;
}

const MyUpload = ({ data, imageName, file, setFile, prefixPath }: props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const modifiedFileList = newFileList.map((file) => {
      if (file.status === "uploading") {
        // ทำการอัพโหลดไฟล์ จะไม่มี status ในขณะที่อัพโหลด ดังนั้นให้ตั้งค่า status เป็น 'uploading'
        return { ...file, status: "uploading" };
      } else {
        // ทำการอัพโหลดสำเร็จ กำหนดค่า status เป็น 'done' และอัพเดท response และ linkProps ตามที่ต้องการ
        return {
          ...file,
          status: "done",
          response: '{"status": "success"}',
          linkProps: '{"download": "image"}',
        };
      }
    });

    setFile(modifiedFileList.slice(-1));
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleCancel = () => setPreviewOpen(false);

  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-circle"
        //   defaultFileList={data.logo}
        fileList={file}
        onChange={onChange}
        onPreview={handlePreview}
        multiple={false}
        accept=".jpeg, .jpg, .png"
        // itemRender={(e) => (
        //   <div
        //     style={{
        //       width: 160,
        //     }}
        //   >
        //     {e}
        //   </div>
        // )}
      >
        {file.length === 0 && data.length !== 0 ? (
          // ถ้าไม่มีรูปที่อัพโหลดและมีรูปจากฐานข้อมูล
          <img
            src={`${prefixPath}${imageName}`}
            alt="logo"
            style={{
              // width: 300,
              height: 140,
              maxWidth: 250,
              // objectFit: "cover",
              // borderRadius: "50%",
            }}
          />
        ) : (
          // ถ้าไม่มีรูปจากฐานข้อมูลและไม่มีรูปที่อัพโหลด
          file.length === 0 && UploadButton
        )}
      </Upload>
      <Modal
        open={previewOpen}
        title={null}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default MyUpload;
