import InfoCard from "@features/common/components/InfoCard";
import { useDashUserCount } from "../hooks";
import { DottedLine } from "../utils/style.jsx";

const InfoCardWrapper = ({ children }) => (
  <div className="flex items-end gap-3 flex-wrap border-b border-white py-5 [&_.dotted-line:last-child]:hidden">
    {children}
  </div>
);

const TotalStatsSection = ({ filterBtn }) => {
  const [userList, userCountLoader] = useDashUserCount(filterBtn);
  return (
    <div className="mr-2.5">
      <InfoCardWrapper>
        {userList.map((list, index) => (
          <div key={list?.heading} className="flex items-end gap-3">
            <InfoCard
              count={list.count}
              heading={list.heading}
              icon={list.icon}
              showBox={false}
              loader={userCountLoader}
            />
            {index !== userList.length - 1 && <DottedLine />}
          </div>
        ))}
      </InfoCardWrapper>
    </div>
  );
};

export default TotalStatsSection;
export { InfoCardWrapper };
