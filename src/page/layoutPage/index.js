import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "component/sidebar";
import { theme } from "util/theme";

export default function LayloutPage() {
  return (
    <Row>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <RightSection>
        <Outlet />
      </RightSection>
    </Row>
  );
}

const SidebarWrapper = styled(Col)`
  width: 240px;
`;

const RightSection = styled(Col)`
  width: calc(100% - 240px);
  padding: 20px;
  overflow: auto;
  height: 100vh;
  background: ${theme.screenBackground};
`;
