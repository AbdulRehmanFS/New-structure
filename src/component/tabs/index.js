/* eslint-disable react/prop-types */
import { ConfigProvider, Tabs } from "antd";
import styled from "styled-components";
import { theme } from "util/theme";

const TabComponent = ({
  items, //= default_items,
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
    <TabsStyles
      defaultActiveKey={activeKey}
      tabBarExtraContent={operations}
      items={items}
      onChange={onChange}
    />
  </ConfigProvider>
);

export default TabComponent;

const TabsStyles = styled(Tabs)``;
