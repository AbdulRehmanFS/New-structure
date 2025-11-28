/* eslint-disable react/prop-types */
import { ConfigProvider, Dropdown } from "antd";
import { memo } from "react";
import { theme } from "@utils/theme";

const DropDownComponent = ({
  children,
  items = [],
  horizontalPadding,
  onClick = () => {},
  textColor = theme.white,
  background = theme.screenBackground,
}) => (
  <ConfigProvider
    theme={{
      components: {
        Dropdown: {
          colorText: textColor,
          colorBgElevated: background,
          colorTextDescription: theme.greyText,
          controlPaddingHorizontal: horizontalPadding || "12px",
        },
      },
    }}
  >
    <Dropdown menu={{ items, onClick }} trigger={["click"]}>
      {children}
    </Dropdown>
  </ConfigProvider>
);

export default memo(DropDownComponent);

