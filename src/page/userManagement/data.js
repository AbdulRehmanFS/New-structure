
import moment from "moment";
import { Link } from "react-router-dom";
import {
  CashIcon,
  DiamondIcon,
  InstaIcon,
  MultiplePlayerIcon,
  TiktokIcon,
  TwitterIcon,
  UserIcon,
} from "util/svgFile";
import CoverImage from "assets/coverImage.png";
import { theme } from "util/theme";
import { EllipseText, Text, UnderLine, ViewerAction } from "../style";

export const data = [
  {
    key: "1",
    name: "John Brown",
    email: "test@gmail.com",
    userName: "Linkin Park",
    commission: "0.5%",
    status: "active",
  },
  {
    key: "2",
    name: "Jim Green",
    email: "test@gmail.com",
    userName: "Linkin Park",
    commission: "0.5%",
    status: "active",
  },
  {
    key: "3",
    name: "Joe Black",
    email: "test@gmail.com",
    userName: "Linkin Park",
    commission: "0.5%",
    status: "active",
  },
  {
    key: "4",
    name: "Jim Green",
    email: "test@gmail.com",
    userName: "Linkin Park",
    commission: "0.5%",
    status: "Inactive",
  },
  {
    key: "5",
    name: "Joe Black",
    email: "test@gmail.com",
    userName: "Linkin Park",
    commission: "0.5%",
    status: "Inactive",
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

export const cardList = [
  {
    heading: "Available Bucks",
    count: "0",
    icon: <DiamondIcon color="white" height="20px" width="20px" />,
  },
  {
    heading: "Total Earnings",
    count: "$0",
    icon: <CashIcon color="white" opacity="1" height="20px" width="20px" />,
  },
  {
    heading: "Total Subscribers",
    count: "0",
    icon: <UserIcon color="white" opacity="1" height="16px" width="16px" />,
  },
];

export const podcastCardList = [
  {
    heading: "Total Uploads",
    count: "0",
    icon: <MultiplePlayerIcon height="16px" width="17px" />,
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

export const podcasts_row = [
  {
    key: 1,
    cover_image: CoverImage,
    podcast_title: "Lorem Ipsum Title",
    genre: "Action",
    description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum more",
    cast: "John Doe Jackie Ching Julie Perry",
    content_link:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    key: 2,
    cover_image: CoverImage,
    podcast_title: "Lorem Ipsum Title1",
    genre: "Action",
    description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum more",
    cast: "John Doe Jackie Ching Julie Perry",
    content_link:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
];

export const request_profile_list = {
  "Name of User": "sdja",
  "Email Address": "ealk@kasjd.cop",
  Username: "kamala",
  "Phone Number": 7879997689,
  "Date Joined": "11-04-2020",
  social_link: [
    {
      name: "insta",
      value: "insta@test.com",
      icon: <InstaIcon />,
    },
    {
      name: "facebook",
      value: "tiktok@test.com",
      icon: <TiktokIcon />,
    },
    {
      name: "twitter",
      value: "twitter@test.com",
      icon: <TwitterIcon />,
    },
  ],
};

export const series = [
  {
    title: "S. No.",
    dataIndex: "key",
    key: "key",
    align: "center",
    width: 60,
    render: (_, record, index) => `${index + 1}`,
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
    align: "center",
    width: 90,
    render: (_, record) => (
      <img src={record?.thumbnail} height="50px" width="auto" alt="" />
    ),
  },
  {
    title: "Created By",
    dataIndex: "key",
    key: "key",
    align: "center",
    width: 120,
    render: (_, record) => (
      <Link
        to="/creator/content-listing"
        state={{ contentId: record?._id, type: "series" }}
      >
        <Text>{record?.user_name}</Text>
      </Link>
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    align: "center",
    width: 150,
    render: (_, record) => (
      <EllipseText className="title">{record.title}</EllipseText>
    ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    align: "center",
    width: 50,
  },
  {
    title: "Genre",
    dataIndex: "genre",
    key: "genre",
    align: "center",
    width: 120,
  },
  {
    title: "Episode",
    dataIndex: "episodeCount",
    key: "episodeCount",
    align: "center",
    width: 100,
  },
  {
    title: "Date Posted",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    width: 100,
    render: (_, record) => moment(record?.createdAt).format("DD-MMM-YY"),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 180,
    render: (_, record) => (
      <ViewerAction>
        <Link
          to="/creator/content-listing"
          state={{ contentId: record?._id, type: "series" }}
          className="view"
        >
          View
        </Link>
      </ViewerAction>
    ),
  },
];

export const viewer_profile_list = {
  "Name of User": "sdja",
  "Email Address": "ealk@kasjd.cop",
  Username: "afdsfd",
  "Phone Number": 7879997689,
  "Date Joined": "11-04-2020",
};

export const creator_profile_list = {
  "Name of User": "sdja",
  "Email Address": "ealk@kasjd.cop",
  "About Me": "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  Username: "afdsfd",
  "Phone Number": 7879997689,
  "Date Joined": "11-04-2020",
};



export const event_rows = [
  {
    key: "01",
    event_title: "Lorem Ipsum Title",
    total_earning: "$1.2K USD",
    event_date: "21-Jan-22",
    time: "08:00 PM",
    venue: "Lorem Ipsum",
    ticket_amount: "$12 USD",
  },
  {
    key: "02",
    event_title: "Lorem Ipsum Title",
    total_earning: "$1.2K USD",
    event_date: "21-Jan-22",
    time: "08:00 PM",
    venue: "Lorem Ipsum",
    ticket_amount: "$12 USD",
  },
  {
    key: "03",
    event_title: "Lorem Ipsum Title",
    total_earning: "$1.2K USD",
    event_date: "21-Jan-22",
    time: "08:00 PM",
    venue: "Lorem Ipsum",
    ticket_amount: "$12 USD",
  },
  {
    key: "04",
    event_title: "Lorem Ipsum Title",
    total_earning: "$1.2K USD",
    event_date: "21-Jan-22",
    time: "08:00 PM",
    venue: "Lorem Ipsum",
    ticket_amount: "$12 USD",
  },
];





export const podcast_rows = [
  {
    key: "01",
    podcast_title: "Lorem Ipsum Title",
    category: "Video Podcast",
    event_date: "21-Jan-22",
    time: "08:00 PM",
    venue: "Lorem Ipsum",
    ticket_amount: "$12 USD",
  },
  {
    key: "02",
    podcast_title: "Lorem Ipsum Title",
    category: "Audio Podcast",
    event_date: "21-Jan-22",
    time: "08:00 PM",
    venue: "Lorem Ipsum",
    ticket_amount: "$12 USD",
  },
  {
    key: "03",
    podcast_title: "Lorem Ipsum Title",
    category: "Audio Podcast",
    event_date: "21-Jan-22",
    time: "08:00 PM",
    venue: "Lorem Ipsum",
    ticket_amount: "$12 USD",
  },
  {
    key: "04",
    podcast_title: "Lorem Ipsum Title",
    category: "Audio Podcast",
    event_date: "21-Jan-22",
    time: "08:00 PM",
    venue: "Lorem Ipsum",
    ticket_amount: "$12 USD",
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
      const text = record?.description.substring(0, 25);
      const showData = record?.description.length > 25 ? `${text}...` : text;
      return (
        <div className="description-text">
          <div>{showData}</div>
          {record?.description.length > 25 ? (
            <UnderLine
              className="more-content"
              color={theme.darkblue}
            >
              more
            </UnderLine>
          ) : (
            ""
          )}
        </div>
      );
    },
  },
];

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
