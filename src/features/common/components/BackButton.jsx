/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { LeftOutlined } from "@ant-design/icons";

function BackButton({ icon }) {
  const navigate = useNavigate();

  const handleBackNavigate = () => navigate(-1);

  return (
    <div className="cursor-pointer flex [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg_path]:fill-white" onClick={handleBackNavigate}>
      {icon || <LeftOutlined />}
    </div>
  );
}
export default memo(BackButton);

