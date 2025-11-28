/* eslint-disable react/prop-types */
import { Spin } from "antd";
import { memo } from "react";

const Loader = ({ loading, fullscreen = true }) => (
  <Spin spinning={loading} fullscreen={fullscreen} />
);
export default memo(Loader);

