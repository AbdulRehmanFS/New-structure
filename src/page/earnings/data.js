import { EarningCardIcon } from "util/svgFile";

export const cardList = [
  {
    count: "$5K USD ",
    heading: "Total Earnings",
    icon: <EarningCardIcon height="20px" width="30px" />,
  },
  {
    count: "$50K USD ",
    heading: "Total Payout",
    icon: <EarningCardIcon height="20px" width="30px" />,
  },
];

export const eventColumns = [
  {
    title: "S. No.",
    dataIndex: "key",
    key: "key",
    align: "center",
    width: 60,
    render: (_, record, index) => `${index + 1}`,
  },
  {
    title: "Event Title",
    dataIndex: "title",
    key: "event_title",
    align: "center",
    width: 140,
  },
  {
    title: "Created By",
    dataIndex: "created_by",
    key: "created_by",
    align: "center",
    width: 140,
  },
  {
    title: "Event Date",
    dataIndex: "event_date",
    key: "event_date",
    align: "center",
    width: 90,
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    align: "center",
    width: 80,
  },
  {
    title: "Venue",
    dataIndex: "venue",
    key: "venue",
    align: "center",
    width: 100,
  },
  {
    title: "Total Earnings",
    dataIndex: "total_earning",
    key: "venue",
    align: "center",
    width: 110,
  },
  {
    title: "Payout",
    dataIndex: "Payout",
    key: "venue",
    align: "center",
    width: 80,
  },
  {
    title: "My Earnings",
    dataIndex: "my_earnings",
    key: "my_earnings",
    align: "center",
    width: 100,
  },
];

export const buckColumns = [
  {
    title: "S. No.",
    dataIndex: "key",
    key: "key",
    align: "center",
    width: 60,
    render: (_, record, index) => `${index + 1}`,
  },
  {
    title: "User Role",
    dataIndex: "user_role",
    key: "user_role",
    align: "center",
    width: 70,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
    width: 80,
  },
  {
    title: "Bucks",
    dataIndex: "bucks",
    key: "bucks",
    align: "center",
    width: 80,
  },
  {
    title: "Total Amount",
    dataIndex: "total_amount",
    key: "total_amount",
    align: "center",
    width: 110,
  },
  {
    title: "Payout",
    dataIndex: "Payout",
    key: "venue",
    align: "center",
    width: 80,
  },
  {
    title: "My Earnings",
    dataIndex: "my_earnings",
    key: "my_earnings",
    align: "center",
    width: 100,
  },
];

export const bucksSelect = [
  {
    value: "2",
    label: "All",
  },
  {
    value: "1",
    label: "Used",
  },
  {
    value: "0",
    label: "Un-Used",
  },
];
