import { Col } from "antd";
import List from "./List";
import Revenue from "./Revenue";
import useDashCreatorList from "../hooks/useDashCreatorList";
import { ListNoData } from "@features/common/components/NoData";
import CreatorLoader from "./CreatorLoader";
import useTopRevenueMonths from "../hooks/useTopRevenueMonths";

const RightSection = ({ filterBtn }) => {
  const { topRevenueMonths, loading } = useTopRevenueMonths();
  
  const [topCreators, bottomCreators, topCreatorLoader, bottomCreatorLoader] =
    useDashCreatorList(filterBtn);

  return (
    <Col xs={7} className="right-section-list h-[calc(100vh-133px)] overflow-auto flex flex-col p-3 gap-2.5 [&_.list-heading]:text-base [&_.list-heading]:mb-2.5 [&_.list-heading]:font-light [&_.separator]:border-b-[8px] [&_.separator]:border-white [&_.separator]:rounded-[30000px] [&_.separator]:overflow-hidden [&_.separator]:w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className="list-heading">Top 10 Creators</div>
      {topCreatorLoader ? (
        <CreatorLoader count={[1, 2, 3, 4]} />
      ) : (
        <div className="[&_div:last-child]:border-b-0">
          {topCreators?.length ? (
            topCreators?.map((list, i) => <List key={i} data={list} className="top-list" />)
          ) : (
            <ListNoData />
          )}
        </div>
      )}

      <hr className="separator" />

      <div className="list-heading">Bottom 10 Creators</div>
      {bottomCreatorLoader ? (
        <CreatorLoader count={[1, 2, 3, 4]} />
      ) : (
        <div className="[&_div:last-child]:border-b-0">
          {bottomCreators?.length ? (
            bottomCreators?.map((list, i) => <List key={i} data={list} className="bottom-list" />)
          ) : (
            <ListNoData />
          )}
        </div>
      )}

      <hr className="separator" />

      <div className="list-heading">Top Revenue Months</div>
      {loading ? (
        <CreatorLoader count={[1, 2, 3, 4]} />
      ) : (
        <div className="[&_div:last-child]:border-b-0">
          {topRevenueMonths?.map((list, i) => (
            <Revenue key={i} data={list} className="bottom-list" />
          ))}
        </div>
      )}
    </Col>
  );
};

export default RightSection;

