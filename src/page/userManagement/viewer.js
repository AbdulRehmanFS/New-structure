import { memo } from "react";
import styled from "styled-components";
import { pageLimit } from "util/constant";
import {
  ButtonComponent,
  CustomePagination,
  SelectComponent,
  TableComponent
} from "component/index";
import { useTableColumn, useUserListing } from "hooks/userManagement";
import { HeaderSection } from "page/style";
import { filterOption } from "./data";
import { theme } from "util/theme";

function UserViewer({ searchContent }) {
  const userRole = 1;
  const [
    userListing,
    loading,
    totalPage,
    currentPage,
    selectedStatus,
    handleStatusSelection,
    handlePageChange,
    handleStatusChange,
    ageNavigate
  ] = useUserListing(searchContent, pageLimit, userRole);

  const [columns] = useTableColumn(currentPage, handleStatusChange);

  return (
    <ViewerWrapper>
      <HeaderSection className="mid-section">
        <div>Viewer Listing</div>
        <div className="age-verification">
          <ButtonComponent
            text="Age Verification"
            width={"150px"}
            bg={theme.white}
            height={"32px"}
            onClick={()=>ageNavigate()}
          />
          <SelectComponent
            size="middle"
            value={selectedStatus}
            onChange={handleStatusSelection}
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
    </ViewerWrapper>
  );
}
export default memo(UserViewer);

const ViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .table-wrapper {
    margin-top: 30px;
  }
  .mid-section {
    margin-top: 20px;
    font-size: 18px;
  }
  .action {
    border-bottom: 1px solid rgb(163 163 163 / 45%);
  }
  .age-verification {
    gap: 10px;
    display: flex;
  }
`;
