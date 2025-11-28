import { SimgpleInfoCard } from "@features/common/components/InfoCard";
import { DottedLine } from "../utils/style.jsx";
import useFinancialStats from "../hooks/useFinancialStats";
import { InfoCardWrapper } from "./TotalStatsSection";
import { CashIcon } from "@utils/svgFile";

const FinanceSection = ({ filterBtn }) => {
  const [stats, statsLoader] = useFinancialStats(filterBtn);

  const financialItems = [
    { heading: "Total Revenue", value: `$${stats.totalRevenue}` },
    { heading: "Profit", value: `$${stats.profit}` },
    { heading: "Paid Out", value: `$${stats.paidOut}` },
    { heading: "Live Events Ticket Sales", value: `$${stats.ticketSales}` }
  ];

  return (
    <div className="py-5 mr-2.5">
      <div className="text-lg text-white">Finance Information</div>
      <div className="flex items-end gap-3 flex-wrap border-b border-white py-5 [&_.dotted-line:last-child]:hidden">
        {financialItems.map((item, index) => (
          <div key={item.heading} className="flex items-end gap-3">
            <div>
              <div className="mb-3 text-white">{item.heading}</div>
              <SimgpleInfoCard count={item.value} loader={statsLoader} icon={<CashIcon color="white" opacity={1} />} />
            </div>
            {index !== financialItems.length - 1 && (
              <div style={{ height: "59px", display: "flex" }}>
                <DottedLine width="59px" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceSection;

