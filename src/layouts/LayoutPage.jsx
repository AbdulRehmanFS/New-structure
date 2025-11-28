import { useState } from "react";
import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function LayoutPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <Row className="h-screen">
      <Col className={isSidebarCollapsed ? "w-[70px]" : "w-[240px]"} style={{ transition: "width 0.3s ease" }}>
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      </Col>
      <Col 
        className="p-5 overflow-auto h-screen bg-screen-bg" 
        style={{ 
          width: isSidebarCollapsed ? "calc(100% - 70px)" : "calc(100% - 240px)",
          transition: "width 0.3s ease"
        }}
      >
        <Outlet />
      </Col>
    </Row>
  );
}
