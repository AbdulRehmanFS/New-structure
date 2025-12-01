import moment from "moment";
import {
  CashIcon,
  DiamondIcon,
  MultiplePlayerIcon,
  UserIcon,
} from "@utils/svgFile";

export const filterOption = [
  {
    value: "active",
    label: "Active User",
  },
  {
    value: "inactive",
    label: "InActive User",
  },
];

export const buck_purchase_columns = [
  {
    title: "S. No.",
    dataIndex: "key",
    key: "key",
    align: "center",
    width: "70px",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
    render: (_, record) =>
      record?.date ? moment(record?.date).format("DD-MMM-YY") : "",
  },
  {
    title: "Bucks",
    dataIndex: "bucks",
    key: "bucks",
    align: "center",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "center",
  },
];

export const buck_spent_columns = [
  {
    title: "S. No.",
    dataIndex: "key",
    key: "key",
    align: "center",
    width: "70px",
  },
  {
    title: "Gift Item Name",
    dataIndex: "item_name",
    key: "item_name",
    align: "center",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
    width: "100px",
    render: (_, record) =>
      record?.date ? moment(record?.date).format("DD-MMM-YY") : "",
  },
  {
    title: "Bucks Used",
    dataIndex: "bucks_used",
    key: "bucks_used",
    align: "center",
  },
  {
    title: "Used On",
    dataIndex: "used_on",
    key: "used_on",
    align: "center",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "center",
    width: "100px",
  },
];

export const reports_columns = [
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
    dataIndex: "event_title",
    key: "event_title",
    align: "center",
    width: 120,
  },
  {
    title: "Event Date",
    dataIndex: "date",
    key: "date",
    align: "center",
    width: 80,
    render: (_, record) =>
      record?.date ? moment(record?.date).format("DD-MMM-YY") : "",
  },
  {
    title: "Reported By",
    dataIndex: "reported_by",
    key: "reported_by",
    align: "center",
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    align: "center",
    width: 160,
    render: (_, record) => {
      const text = record?.description?.substring(0, 25);
      const showData = record?.description?.length > 25 ? `${text}...` : text;
      return <div>{showData}</div>;
    },
  },
];

export const podcastCardList = [
  {
    heading: "Total Uploads",
    count: "0",
    icon: <MultiplePlayerIcon height="16px" width="16px" />,
  },
  {
    heading: "Audio Content",
    count: "0",
  },
  {
    heading: "Video Content",
    count: "0",
  },
  {
    heading: "Klipz",
    count: "0",
  },
];
