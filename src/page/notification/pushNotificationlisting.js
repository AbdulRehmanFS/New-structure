import { ButtonComponent, TableComponent } from "component/index";
import SearchField from "component/fields/searchField";
import styled from "styled-components";
import { theme } from "util/theme";
import { useState } from "react";
import { Line } from "recharts";
import { ViewerAction } from "page/style";
import { useNavigate } from "react-router-dom";

const PustNotificationListing = () => {
  const handleSearch = () => {};
  const navigate = useNavigate();
  const [listing, setlisting] = useState([]);
  setlisting;
  const listingcolumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "Status",
      dataIndex: "stauts",
      key: "stauts",
      align: "center"
    },
    {
      title: "Audience",
      dataIndex: "audience",
      key: "audience",
      align: "center"
    },
    {
      title: "Analytics",
      dataIndex: "analytics",
      key: "analytics",
      align: "center"
    },
    {
      title: "Action",
      key: "action",
      align: "center",

      render: () => (
        <ViewerAction>
          <div className="action-icon" aria-hidden>
            View
          </div>
          <Line height="16px" borderColor={theme.grey2} />
          <div className="action-icon" aria-hidden>
            Delete
          </div>
          <Line height="16px" borderColor={theme.grey2} />
          <div className="action-icon" aria-hidden>
            Archive
          </div>
        </ViewerAction>
      )
    }
  ];
  return (
    <ListingWrapper>
      <div className="search">
        <SearchField
          handleSearch={handleSearch}
          size="middle"
          placeholder="Search push notifications"
        />
        <ButtonComponent
          text="Create Push Notification"
          bg={theme.primaryColor}
          width="200px"
          onClick={() => navigate("/createpush-notification")}
        />
      </div>
      <TableComponent data={listing} columns={listingcolumn} />
    </ListingWrapper>
  );
};

export default PustNotificationListing;

export const ListingWrapper = styled.div`
  .search {
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
  }
`;
