import SwitchComponent from "component/fields/switch";
import { Line, ViewerAction } from "page/style";
import { useNavigate } from "react-router-dom";
import { pageLimit } from "util/constant";
import { theme } from "util/theme";

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
        const first_name = record?.first_name ?? "";
        const last_name = record?.last_name ?? "";
        return (
          <div
            className="cursor"
            onClick={() =>
              navigate("/user-management/creator-profile", {
                state: { userInfo: record }
              })
            }
            aria-hidden>
            {`${first_name} ${last_name}`}
          </div>
        );
      }
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: 180
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
      width: 120
    },
    {
      title: "Commission (%)",
      dataIndex: "commission",
      key: "commission",
      align: "center",
      width: 130,
      render: (_, record) => (record?.commission ? `${record?.commission}%` : "0%")
    },
    {
      title: "Status",
      key: "status",
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
        <ViewerAction>
          <div className="action">
            <span>{record?.status === "active" ? "Active" : "In-Active"}</span>
            <Line height="16px" borderColor={theme.grey2} />
            <span
              className="action-icon"
              onClick={() =>
                navigate("/user-management/creator-profile", {
                  state: { userInfo: record }
                })
              }
              aria-hidden>
              View
            </span>
          </div>
        </ViewerAction>
      )
    }
  ];

  return [columns];
};

export default useTableCreatorColumns;
