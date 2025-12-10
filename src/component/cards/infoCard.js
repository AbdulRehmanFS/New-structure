/* eslint-disable react/prop-types */
import { ParagraphLoader } from "page/dashboard/skeletonLoader";
import { memo } from "react";
import styled from "styled-components";
import { UserIcon } from "util/svgFile";
import { theme } from "util/theme";

const InfoCardSecond = memo(({ livecount, subscribecount, liveheading, subsheading, key }) => (
  <InfoCardWrapperSecond key={key}>
    <div>
      <div className="count-section">{livecount}</div>
      <div className="heading">{liveheading ?? "Total Registered Viewers"}</div>
    </div>
    <div className="vertical-line-btw" />
    <div>
      <div className="count-section">{subscribecount}</div>
      <div className="heading">{subsheading ?? "Total Registered Viewers"}</div>
    </div>
  </InfoCardWrapperSecond>
));
InfoCardSecond.displayName = "InfoCardSecond";

export { InfoCardSecond };

const InfoCardWrapperSecond = styled.div`
  background: rgba(196, 196, 196, 0.16);
  min-width: 200px;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  .vertical-line-btw {
    width: 1px;
    background-color: rgba(196, 196, 196, 0.45);
    margin: 0 10px;
  }
  .heading {
    margin: 14px 0;
  }
  color: ${theme.lightWhite};
  .heading {
    margin: 10px 0;
    font-size: 12px;
  }
  .count-section {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    align-items: center;
    gap: 12px;
  }
`;

const InfoCard = ({ count, heading, icon, showBox = true, key, loader = false }) => (
  <InfoCardWrapper key={key}>
    {loader ? (
      <ParagraphLoader />
    ) : (
      <>
        <div className="count-section">
          {count}
          {icon ?? <UserIcon opacity={1} />}
        </div>
        <div className="heading">{heading ?? "Total Registered Viewers"}</div>
        {showBox ? (
          <div className="box-wrap">
            {[1, 2, 3, 4, 5].map((countDown) => (
              <div className="boxes" key={countDown} />
            ))}
          </div>
        ) : (
          ""
        )}
      </>
    )}
  </InfoCardWrapper>
);
export default memo(InfoCard);

const InfoCardWrapper = styled.div`
  background: rgba(196, 196, 196, 0.16);
  max-width: fit-content;
  min-width: 172px;
  padding: 18px;
  border-radius: 8px;
  .heading {
    margin: 14px 0;
  }
  color: white;
  .heading {
    margin: 10px 0;
    font-size: 12px;
  }
  .count-section {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    align-items: center;
    gap: 12px;
  }
  .box-wrap {
    display: flex;
    gap: 8px;
  }
  .boxes {
    background: rgba(196, 196, 196, 0.36);
    height: 20px;
    width: 20px;
  }
`;

export const SimgpleInfoCard = ({ count, icon }) => (
  <InfoCardWrapper style={{ minWidth: "auto" }}>
    <div className="count-section" style={{ gap: "16px" }}>
      {count}
      {icon ?? <UserIcon opacity={1} />}
    </div>
  </InfoCardWrapper>
);
