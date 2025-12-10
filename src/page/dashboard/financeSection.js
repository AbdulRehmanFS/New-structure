import { SimgpleInfoCard } from "component/cards/infoCard";
import { DottedLine } from "page/style";
import useFinancialStats from "hooks/dashboard/useFinancialStats";
import { InfoCardWrapper } from "./totalStatsSection";
import { CashIcon } from "util/svgFile";

const FinanceSection = ({ filterBtn }) => {
  const [stats, statsLoader] = useFinancialStats(filterBtn);

  const financialItems = [
    { heading: "Total Revenue", value: `$${stats.totalRevenue}` },
    { heading: "Profit", value: `$${stats.profit}` },
    { heading: "Paid Out", value: `$${stats.paidOut}` },
    { heading: "Live Events Ticket Sales", value: `$${stats.ticketSales}` }
  ];

  return (
    <div className="finance-section">
      <div className="heading">Finance Information</div>
      <InfoCardWrapper>
        {financialItems.map((item, index) => (
          <>
            <div key={item.heading}>
              <div className="card-heading" style={{ marginBottom: "12px" }}>
                {item.heading}
              </div>
              <SimgpleInfoCard count={item.value} loader={statsLoader} icon={<CashIcon color="white" opacity={1} />} />
            </div>
            {index !== financialItems.length - 1 && (
              <div style={{ height: "59px", display: "flex" }}>
                <DottedLine width="59px" />
              </div>
            )}
          </>
        ))}
      </InfoCardWrapper>
    </div>
  );
};

export default FinanceSection;
