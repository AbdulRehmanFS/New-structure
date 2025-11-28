import { useState } from "react";
import TableComponent from "@components/Table";
import SearchField from "@components/SearchField";
import ButtonComponent from "@components/Button";

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
      <div className="flex justify-between my-5">
        <SearchField
          handleSearch={handleSearch}
          size="middle"
          placeholder="Search Auto notifications"
        />
        <ButtonComponent
          text="Create Auto Notification"
          bg="primary"
          width="200px"
          height="40px"
        />
      </div>
      <TableComponent data={listing} columns={Automationlist} />
    </div>
  );
};

export default AutomationListing;

