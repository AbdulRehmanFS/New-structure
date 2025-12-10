import SwitchComponent from "component/fields/switch";
import { Line, ViewerAction } from "page/style";
import { useNavigate } from "react-router-dom";
import { pageLimit } from "util/constant";
import { theme } from "util/theme";

const useTableColumn = (currentPage, handleStatusChange) => {
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
      title: "Name of Viewer",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 140,
      render: (_, record) => {
        const first_name = record?.userDetail?.first_name ?? "";
        const last_name = record?.userDetail?.last_name ?? "";
        return (
          <div
            className="cursor"
            onClick={() =>
              navigate("/user-management/viewer-profile", {
                state: { userId: record._id }
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
        <ViewerAction>
          <div className="action">
            <span>{record?.status === "active" ? "Active" : "In-Active"}</span>
            <Line height="16px" borderColor={theme.grey2} />
            <span
              className="action-icon"
              onClick={() =>
                navigate("/user-management/viewer-profile", {
                  state: { userId: record._id }
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

export default useTableColumn;
