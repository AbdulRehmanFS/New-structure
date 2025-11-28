/* eslint-disable react/prop-types */
import { Switch } from "antd";
import { memo } from "react";

const SwitchComponent = ({ size, checked, onChange, ...props }) => {
  return <Switch size={size} checked={checked} onChange={onChange} {...props} />;
};

export default memo(SwitchComponent);

