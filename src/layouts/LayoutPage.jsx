import { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function LayoutPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Check if screen is mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 640; // sm breakpoint
      if (isMobile) {
        setIsSidebarCollapsed(true);
      }
    };

    // Check on mount
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <Row className="h-screen">
      <Col className={isSidebarCollapsed ? "w-[70px]" : "w-[240px]"} style={{ transition: "width 0.3s ease" }}>
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      </Col>
      <Col 
        className="p-5 overflow-auto h-screen bg-screen-bg [&::-webkit-scrollbar]:w-0" 
        style={{ 
          width: isSidebarCollapsed ? "calc(100% - 70px)" : "calc(100% - 240px)",
          transition: "width 0.3s ease",
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <Outlet />
      </Col>
    </Row>
  );
}
