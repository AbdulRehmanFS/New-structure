/* eslint-disable react/prop-types */
import { Col, Row } from "antd";
import { memo } from "react";
import styled from "styled-components";
import { DiamondIcon } from "util/svgFile";
import { Line } from "page/style";
import { theme } from "util/theme";

const CountCard = ({ list, key , isIcon=true }) => (
  <CountWrapper key={key}>
    {
     isIcon &&
     <>
     <Col span={Array.isArray(list) ? 2 : 6}>
      <div className="image-background">
        {Array.isArray(list)
          ? list?.[0]?.icon
          : list?.icon ?? (
              <DiamondIcon color="white" height="20px" width="20px" />
            )}
      </div>
    </Col>
     </> 
    }
    
    {Array.isArray(list) ? (
      <Col span={22} className="multi_content">
        {list?.map((data) => (
          <>
            <div className="multi_value" key={data?.heading}>
              <div className="heading">{data?.heading}</div>
              <div className="count">{data?.count}</div>
            </div>
            <Line
              key={`${data?.heading}line`}
              className="line"
              height="50px"
              border="1px solid"
              borderColor={theme.lightWhite}
            />
          </>
        ))}
      </Col>
    ) : (
      <Col span={18} className="content">
        <div className="heading">{list?.heading}</div>
        <div className="count">{list?.count}</div>
      </Col>
    )}
  </CountWrapper>
);
export default memo(CountCard);
const CountWrapper = styled(Row)`
  background: ${theme.buttonColor};
  height: 82px;
  max-width: 180px;
  min-width: fit-content;
  color: ${theme.lightWhite};
  padding: 14px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  .multi_content {
    display: flex;
    padding: 0 8px;
  }
  .content {
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .heading {
    font-size: 12px;
    text-wrap: nowrap;
  }
  .count {
    font-size: 18px;
    text-align: center;
  }
  .image-background {
    height: 32px;
    width: 32px;
    background: ${theme.grey2};
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .multi_value {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
  }
  .line {
    border-color: white;
  }
  .line: last-child {
    border-color: transparent;
  }
`;
