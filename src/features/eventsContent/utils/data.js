import moment from "moment";

export const ticketHistoryColumns = [
  {
    title: "S. No.",
    dataIndex: "key",
    key: "key",
    align: "center",
    width: 60,
  },
  {
    title: "Viewer Name",
    dataIndex: "viewer_name",
    key: "viewer_name",
    align: "center",
    width: 140,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
    width: 100,
    render: (_, record) =>
      record?.date ? moment(record?.date).format("DD-MMM-YY") : "",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    align: "center",
    width: 100,
  },
  {
    title: "Transaction ID",
    dataIndex: "transaction_ID",
    key: "transaction_ID",
    align: "center",
    width: 120,
  },
  {
    title: "Ticket Amount",
    dataIndex: "ticket_amount",
    key: "ticket_amount",
    align: "center",
    width: 120,
  },
];

export const ticketHistoryRows = [
  {
    key: "01",
    viewer_name: "Harman Sehgal",
    date: "21-Jan-22",
    time: "08:00 PM",
    transaction_ID: "SB457845755",
    ticket_amount: "$12 USD",
  },
  {
    key: "02",
    viewer_name: "John Doe",
    date: "21-Jan-22",
    time: "08:00 PM",
    transaction_ID: "SB457845755",
    ticket_amount: "$12 USD",
  },
  {
    key: "03",
    viewer_name: "Tonny Hunt",
    date: "21-Jan-22",
    time: "08:00 PM",
    transaction_ID: "SB457845755",
    ticket_amount: "$12 USD",
  },
];

