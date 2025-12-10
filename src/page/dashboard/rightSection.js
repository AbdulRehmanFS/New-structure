import { Col } from "antd";
import { List, Revenue } from "component/index";
import useDashCreatorList from "hooks/dashboard/useDashCreatorList";
import { styled } from "styled-components";
import { ListNoData } from "util/commonSection";
import CreatorLoader from "./skeletonLoader";
import useTopRevenueMonths from "hooks/dashboard/useTopRevenueMonths";

const RightSection = ({ filterBtn }) => {
  const { topRevenueMonths, loading } = useTopRevenueMonths();
  
  const [topCreators, bottomCreators, topCreatorLoader, bottomCreatorLoader] =
    useDashCreatorList(filterBtn);


  return (
    <RightList xs={7}>
      <div className="list-heading">Top 10 Creators</div>
      {topCreatorLoader ? (
        <CreatorLoader count={[1, 2, 3, 4]} />
      ) : (
        <ListSection>
          {topCreators?.length ? (
            topCreators?.map((list, i) => <List key={i} data={list} className="top-list" />)
          ) : (
            <ListNoData />
          )}
        </ListSection>
      )}

      <hr className={"separator"} />

      <div className="list-heading">Bottom 10 Creators</div>
      {bottomCreatorLoader ? (
        <CreatorLoader count={[1, 2, 3, 4]} />
      ) : (
        <ListSection>
          {bottomCreators?.length ? (
            bottomCreators?.map((list, i) => <List key={i} data={list} className="bottom-list" />)
          ) : (
            <ListNoData />
          )}
        </ListSection>
      )}

      <hr className={"separator"} />

      <div className="list-heading">Top Revenue Months</div>
      {loading ? (
        <CreatorLoader count={[1, 2, 3, 4]} />
      ) : (
        <ListSection>
          {topRevenueMonths?.map((list, i) => (
            <Revenue key={i} data={list} className="bottom-list" />
          ))}
        </ListSection>
      )}
    </RightList>
  );
};

export default RightSection;

const RightList = styled(Col)`
  height: calc(100vh - 133px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 10px;
  &::-webkit-scrollbar {
    width: 0px;
  }
  .separator {
    border-bottom: 8px solid white;
    border-radius: 30000px;
    overflow: hidden;
    width: 100%;
  }
  .list-heading {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 300;
  }
`;

const ListSection = styled.div`
  & div:last-child {
    border-bottom: none;
  }
`;
