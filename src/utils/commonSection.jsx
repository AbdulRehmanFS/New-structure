/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { message } from "antd";

function BackButton({ icon }) {
  const navigate = useNavigate();

  const handleBackNavigate = () => navigate(-1);

  return (
    <div className="cursor-pointer flex" onClick={handleBackNavigate}>
      {icon || <LeftOutlined />}
    </div>
  );
}
export default memo(BackButton);

export function DetailDescription({ content, heading = "Description" }) {
  return (
    <div className="flex flex-col gap-0">
      <div className="text-lg font-bold">{heading}</div>
      <div className="p-2.5 max-h-[200px] overflow-auto">{content}</div>
    </div>
  );
}

export function NoData() {
  return (
    <div className="flex flex-wrap no-data">No Data Found</div>
  );
}

export const errorMessage = (msg) =>
  message.error(msg?.message || msg || "Something went wrong");

export const ListNoData = () => (
  <div className="flex justify-center h-[60px] items-center no-data">No Data Found</div>
);

