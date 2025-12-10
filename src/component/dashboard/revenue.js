const { styled } = require("styled-components");

const Revenue = ({ data }) => (
  <RevenueWrapper>
    <div className="heading-data">
      <div className="total-date">Total Revenue: $ {data?.total_revenue}</div>
      <div className="total-date">{data?.date}</div>
    </div>
    <div className="earning">
      <div className="ceater-earining">$ {data?.total_revenue_full}</div>
    </div>
  </RevenueWrapper>
);

export default Revenue;

const RevenueWrapper = styled.div`
  font-family: inherit;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-bottom: 1px solid white;
  opacity: 0.8;
  .total-date,
  .ceater-earining {
    color: white;
  }
  .heading-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .earning {
    border-left: 3px solid white;
    padding-left: 5px;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .ceater-earining {
    padding: 7px;
    border-radius: 5px;
    background: #303030;
  }
`;
