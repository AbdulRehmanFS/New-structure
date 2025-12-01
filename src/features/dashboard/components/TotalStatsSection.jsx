import InfoCard from "@features/common/components/InfoCard";
import { useDashUserCount } from "../hooks";
import { DottedLine } from "../utils/style.jsx";

const InfoCardWrapper = ({ children }) => (
  <div className="flex items-end gap-3 flex-wrap border-b border-white py-5 [&_.dotted-line:nth-last-child(1)]:hidden">
    {children}
  </div>
);

const TotalStatsSection = ({ filterBtn }) => {
  const [userList, userCountLoader] = useDashUserCount(filterBtn);
  return (
    <InfoCardWrapper style={{ marginRight: "10px" }}>
        {userList.map((list, index) => (
        <>
            <InfoCard
            key={list?.heading}
              count={list.count}
              heading={list.heading}
              icon={list.icon}
              showBox={false}
              loader={userCountLoader}
            />
            {index !== userList.length - 1 && <DottedLine />}
        </>
        ))}
      </InfoCardWrapper>
  );
};

export default TotalStatsSection;
export { InfoCardWrapper };
