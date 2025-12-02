import Header from "@layouts/Header";
import BackButton from "@utils/commonSection";
import ReportInfoCard from "../components/ReportInfoCard";
import ReportComment from "../components/ReportComment";
import Copyright from "../components/Copyright";
import Content from "../components/Content";
import { useLocation } from "react-router-dom";

export default function ReportDetails() {
  const { state } = useLocation();

  return (
    <>
      <Header showSearch={false} heading="Reports" />
      <div className="scroll-without-header">
        <div className="flex gap-2.5 text-xl">
          <BackButton />
          <p>User Reports</p>
        </div>
        <div className="p-[25px]">
          <ReportInfoCard data={state} />
          {state?.type == 2 && <ReportComment data={state} />}
          {state?.type == 4 && <Copyright data={state} />}
          {state?.type == 5 && <Content data={state} />}
        </div>
      </div>
    </>
  );
}
