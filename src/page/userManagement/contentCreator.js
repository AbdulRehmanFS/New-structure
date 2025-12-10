import { memo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "component/fields/button";
import SelectComponent from "component/fields/select";
import TableComponent from "component/table";
import CustomePagination from "component/table/pagination";
import { pageLimit } from "util/constant";
import { theme } from "util/theme";
import { filterOption } from "./data";
import { HeaderSection, OuterWrapper } from "page/style";
import { useTableCreatorColumns, useUserListing } from "hooks/userManagement";

const ContentCreator = ({ searchContent }) => {
  const navigate = useNavigate();
  const userRole = 2;
  const [
    userListing,
    loading,
    totalPage,
    currentPage,
    selectedStatus,
    handleStatusSelection,
    handlePageChange,
    handleStatusChange
  ] = useUserListing(searchContent, pageLimit, userRole);
  
  const [columns] = useTableCreatorColumns(currentPage, handleStatusChange);

  return (
    <CreatorWrapper>
      <HeaderSection>
        <div>Content Creator Listing</div>
        <div className="button-component">
          <ButtonComponent
            text="Requests"
            width="90px"
            size="middle"
            bg={theme.white}
            onClick={() => navigate("/user-management/creator-request")}
          />
          <SelectComponent
            size="middle"
            onChange={handleStatusSelection}
            value={selectedStatus}
            options={filterOption}
          />
        </div>
      </HeaderSection>
      <TableComponent columns={columns} data={userListing} loading={loading} />
      <CustomePagination
        total={totalPage}
        current={currentPage}
        defaultPageSize={pageLimit}
        onPageChange={handlePageChange}
      />
    </CreatorWrapper>
  );
};
export default memo(ContentCreator);

const CreatorWrapper = styled(OuterWrapper)`
  .button-component {
    display: flex;
    gap: 10px;
  }
  .table-wrapper {
    margin-top: 30px;
  }
  .action {
    border-bottom: 2px solid ${theme.grey2};
  }
`;
