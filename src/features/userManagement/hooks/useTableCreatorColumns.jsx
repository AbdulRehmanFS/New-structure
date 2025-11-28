import SwitchComponent from "@components/Switch";
import { useNavigate } from "react-router-dom";
import { pageLimit } from "@utils/constant";
import { theme } from "@utils/theme";

const useTableCreatorColumns = (currentPage, handleStatusChange) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "S. No.",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: 60,
      render: (_, record, index) => (currentPage - 1) * pageLimit + index + 1
    },
    {
      title: "Name of Content Creator",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 180,
      render: (_, record) => {
        const first_name = record?.userDetail?.first_name ?? "";
        const last_name = record?.userDetail?.last_name ?? "";
        return (
          <div
            className="cursor-pointer"
            onClick={() =>
              navigate("/user-management/creator-profile", {
                state: { userInfo: { _id: record._id } }
              })
            }
            aria-hidden>
            {record?.userDetail?.first_name ? `${first_name} ${last_name}` : record?.user_name}
          </div>
        );
      }
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: 200
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
      width: 150
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      align: "center",
      width: 120
    },
    {
      title: "Status",
      align: "center",
      width: 60,
      render: (_, record) => (
        <SwitchComponent
          size="small"
          checked={record.status === "active"}
          onChange={(e) => handleStatusChange(record, e)}
        />
      )
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 120,
      render: (_, record) => (
        <div className="flex justify-center [&_.action]:flex [&_.action]:min-w-[84px] [&_.action]:justify-between [&_.action]:items-center [&_.view]:underline [&_.view]:underline-offset-[3px] [&_.view]:text-grey-text [&_.action-icon]:cursor-pointer">
          <div className="action border-b-2 border-grey-2">
            <span>{record?.status === "active" ? "Active" : "In-Active"}</span>
            <div className="h-[38px] border-r-2 border-[rgba(0,0,0,0.26)] mx-2" />
            <span
              className="action-icon"
              onClick={() =>
                navigate("/user-management/creator-profile", {
                  state: { userInfo: { _id: record._id } }
                })
              }
              aria-hidden>
              View
            </span>
          </div>
        </div>
      )
    }
  ];
  return [columns];
};

export default useTableCreatorColumns;

