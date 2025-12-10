import InfoCard from "component/cards/infoCard";
import { useDashUserCount } from "hooks/dashboard";
import { DottedLine } from "page/style";
import { styled } from "styled-components";

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

export const InfoCardWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  & .dotted-line:nth-last-child(1) {
    display: none;
  }
  border-bottom: 1px solid white;
  padding: 20px 0;
`;
