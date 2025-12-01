/* eslint-disable react/prop-types */
import { memo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { theme } from "@utils/theme";

const TableHeaderWrapper = ({
  heading,
  children,
  link = "",
  viewAll = true,
  state,
  dataLength,
}) => {
  const navigate = useNavigate();
  const navigateSection = () => link !== "" && navigate(link, { state });

  return (
    <TableHeadingWrapper className="table-wrapper">
      <div className="header-cover">
        <div className="heading">{heading}</div>
        {viewAll && dataLength ? (
          <div className="view-all-link" onClick={navigateSection} aria-hidden>
            View all
          </div>
        ) : (
          ""
        )}
      </div>
      {children}
    </TableHeadingWrapper>
  );
};
export default memo(TableHeaderWrapper);

const TableHeadingWrapper = styled.div`
  background: rgb(38 38 38);
  margin-top: 20px;
  border-radius: 12px;
  border: 1px solid ${theme.greyBorder};
  overflow-x: auto;

  .header-cover {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background: ${theme.tableHeader};
    border-radius: 12px 12px 0 0;
    border-bottom: 1px solid ${theme.lightWhite};
    flex-wrap: wrap;
    gap: 10px;
  }
  .heading {
    color: ${theme.lightWhite};
    font-size: 16px;
  }
  .view-all-link {
    text-decoration: underline;
    color: ${theme.lightPrimaryColor} !important;
    cursor: pointer;
    text-underline-offset: 3px;
    white-space: nowrap;
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    margin-top: 15px;
    border-radius: 8px;

    .header-cover {
      padding: 8px 12px;
      border-radius: 8px 8px 0 0;
    }

    .heading {
      font-size: 14px;
    }
  }
`;

