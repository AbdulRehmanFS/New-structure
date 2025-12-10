/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from "react";
import { ConfigProvider, Switch } from "antd";
import styled from "styled-components";

const SwitchComponent = ({ onChange, size, checked = false, style }) => {
  const [checkValue, setCheckValue] = useState(false);
  const handleChange = (e) => {
    setCheckValue(e);
    if (onChange) onChange(e);
  };

  useEffect(() => {
    setCheckValue(checked);
  }, [checked, onChange]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: style?.primary ?? "white",
            handleBg: style?.circle??"rgba(190, 190, 190, 1)", // switch circle color
            colorPrimaryHover: style?.primary ?? "white", // show active switch color under hover
            colorTextQuaternary: style?.inactive ?? "black", // show inactive switch color
            colorTextTertiary: style?.inactive ?? "black", // "rgba(196, 196, 196, 1)", show inactive switch color under hover
          },
        },
      }}
    >
      <SwitchWrapper
        size={size || "default"}
        onChange={handleChange}
        checked={checkValue}
      />
    </ConfigProvider>
  );
};
export default memo(SwitchComponent);

const SwitchWrapper = styled(Switch)``;
