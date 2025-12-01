/* eslint-disable react/prop-types */
import { ConfigProvider, Tabs } from "antd";
import { theme } from "@utils/theme";

const TabComponent = ({
  items,
  operations = null,
  onChange,
  activeKey = 1,
}) => (
  <ConfigProvider
    theme={{
      components: {
        Tabs: {
          itemColor: theme.greyText,
          itemHoverColor: theme.white,
          itemActiveColor: theme.white,
          inkBarColor: theme.primaryColor,
          itemSelectedColor: theme.white,
          colorText: theme.white,
        },
      },
    }}
  >
    <Tabs
      defaultActiveKey={activeKey}
      tabBarExtraContent={operations}
      items={items}
      onChange={onChange}
    />
  </ConfigProvider>
);

export default TabComponent;

