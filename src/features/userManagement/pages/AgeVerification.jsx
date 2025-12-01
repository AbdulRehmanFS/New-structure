import { CustomePagination } from "@components";
import { TableComponent } from "@components";
import Header from "@layouts/Header";
import useAgeVerification from "../hooks/useAgeVerification";
import styled from "styled-components";
import BackButton from "@utils/commonSection";
import { useState } from "react";

const AgeVerification = () => {
  const [searchContent, setSearchContent] = useState("");
  const { ageColumns, loading, totalPage, handlePageChange, userListing, currentPage, pageLimit } =
    useAgeVerification(searchContent);
  const handleSearchData = (e) => setSearchContent(e);
  return (
    <>
      <Header showSearch={true} heading="User Management" handleSearchData={handleSearchData} />
      <Wrapper>
        <div className="heading">
          <BackButton />
          Age Verification
        </div>
        <TableComponent columns={ageColumns} data={userListing} loading={loading} />
        <CustomePagination
          total={totalPage}
          current={currentPage}
          defaultPageSize={pageLimit}
          onPageChange={handlePageChange}
        />
      </Wrapper>
    </>
  );
};

export default AgeVerification;

const Wrapper = styled.div`
  margin-top: 30px;
  .heading {
    display: flex;
    font-size: 16px;
    gap: 5px;
    letter-spacing: 1px;
    padding: 10px 0;
  }
`;
