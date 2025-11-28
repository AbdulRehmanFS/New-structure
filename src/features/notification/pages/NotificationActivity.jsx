import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getStartEndDate, last_days_opt } from "@utils/constant";
import Notification from "@components/drawer/NotificationListItem";
import RangeSelector from "@components/RangeSelector";
import Header from "@layouts/Header";
import NotificationPagination from "@components/NotificationPagination";
import SelectComponent from "@components/Select";

const notifications = [
  {
    id: 1,
    message: "You have 20 new Content Creator submission requests.",
    time: "Now",
    isRead: false
  },
  {
    id: 2,
    message: "Your profile update was successful.",
    time: "10 mins ago",
    isRead: false
  },
  {
    id: 3,
    message: "New collaboration request from John Doe.",
    time: "1 hour ago",
    isRead: false
  },
  {
    id: 4,
    message: "Payment for Invoice #1234 has been completed.",
    time: "2 hours ago",
    isRead: false
  },
  {
    id: 5,
    message: "Reminder: Meeting scheduled at 3 PM.",
    time: "Today",
    isRead: false
  }
];
const notificationTwo = [
  {
    id: 1,
    message: "You have 20 new Content Creator submission requests.",
    time: "1 day ago",
    isRead: true
  },
  {
    id: 2,
    message: "Your profile update was successful.",
    time: "2 day ago",
    isRead: true
  },
  {
    id: 3,
    message: "New collaboration request from John Doe.",
    time: "3 hours ago",
    isRead: true
  }
];

const NotificationActivity = () => {
  const [rangeDate, setRangeDate] = useState([]);
  const [selectDays, setSelectDays] = useState("7");

  useEffect(() => {
    if (selectDays == "0") {
      const startDate = dayjs().subtract(1, "day");
      const endDate = dayjs();
      setRangeDate([startDate, endDate]);
    } else {
      const { startDate, endDate } = getStartEndDate(selectDays - 1);
      setRangeDate([startDate, endDate]);
    }
  }, [selectDays]);

  const handleSelect = (e) => setSelectDays(e);
  return (
    <>
      <Header showSearch={true} heading="" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            fontSize: "30px",
            fontWeight: "600",
            color: "white"
          }}>
          Notification Activity
        </div>
        <RangeSelector disabled={true} defaultValue={rangeDate} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px"
        }}>
        <SelectComponent
          placeholder="select last days"
          options={last_days_opt}
          size="middle"
          onChange={handleSelect}
          value={selectDays}
          allowClear={false}
          border="transparent"
          bg="transparent"
          colorPrimary="transparent"
          addSuffix={false}
        />
      </div>
      <div
        style={{
          height: "1px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          margin: " 14px 0px"
        }}
      />
      <div style={{}}>
        <p style={{ fontSize: "24px", fontWeight: "500", marginTop: "36px", color: "white" }}>Today</p>
        {notifications.map((item) => (
          <Notification
            key={item.id}
            isRead={item.isRead}
            message={item.message}
            time={item.time}
          />
        ))}
        <p style={{ fontSize: "24px", fontWeight: "500", marginTop: "36px", color: "white" }}>Yesterday</p>
        {notificationTwo.map((item) => (
          <Notification
            key={item.id}
            isRead={item.isRead}
            message={item.message}
            time={item.time}
          />
        ))}
        <NotificationPagination />
      </div>
    </>
  );
};

export default NotificationActivity;
