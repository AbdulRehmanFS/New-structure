import { useState } from "react";
import TableComponent from "@components/Table";
import SearchField from "@components/SearchField";
import ButtonComponent from "@components/Button";
import { theme } from "@utils/theme";

const AutomationListing = () => {
  const [listing, setListing] = useState([]);

  const handleSearch = () => {};

  const Automationlist = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "Audience",
      dataIndex: "audience",
      key: "audience",
      align: "center"
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: () => (
        <div className="flex justify-center items-center gap-0">
          <div className="action-icon text-white cursor-pointer" role="button" tabIndex={0}>
            View
          </div>
          <div className="h-4 w-px bg-grey-2 mx-1" />
          <div className="action-icon text-white cursor-pointer" role="button" tabIndex={0}>
            Delete
          </div>
          <div className="h-4 w-px bg-grey-2 mx-1" />
          <div className="action-icon text-white cursor-pointer" role="button" tabIndex={0}>
            Archive
          </div>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 my-5">
        <div className="flex-1 sm:flex-initial">
          <SearchField
            handleSearch={handleSearch}
            size="middle"
            placeholder="Search Auto notifications"
          />
        </div>
        <div className="w-full sm:w-auto sm:min-w-[200px]">
          <ButtonComponent
            text="Create Auto Notification"
            bg={theme.primaryColor}
            width="100%"
            height="40px"
          />
        </div>
      </div>
      <TableComponent data={listing} columns={Automationlist} />
    </div>
  );
};

export default AutomationListing;

