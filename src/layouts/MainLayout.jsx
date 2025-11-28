import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <Row>
      <Col className="w-[240px]">
        <Sidebar />
      </Col>
      <Col className="w-[calc(100%-240px)] p-5 overflow-auto h-screen bg-screen-bg">
        <Outlet />
      </Col>
    </Row>
  );
}

