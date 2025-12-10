import store from "store/reduxStore";
import {
  ArchiveIcon,
  CategoryIcon,
  ContentApprovalIcon,
  ContentIcon,
  DashboardIcon,
  DeleteIcon,
  EarningIcon,
  EventsIcon,
  NotificationIcon,
  ReportIcon,
  UnarchiveIcon,
  UserIcon,
  UsersAndAccessIcon
} from "./svgFile";
import dayjs from "dayjs";
import axiosInterceptor from "../service/api/interceptor";

export const pageLimit = 15;

export const defaultPageNo = 1;

export const navbarList = [
  {
    name: "Dashboard",
    icon: <DashboardIcon width="24px" height="20px" />,
    route: "/dashboard"
  },
  {
    name: "Categories Management",
    icon: <CategoryIcon />,
    route: "/categories-management"
  },
  {
    name: "User Management",
    icon: <UserIcon width="22px" height="18px" />,
    route: "/user-management/viewer-creator"
  },
  {
    name: "Content Approval",
    icon: <ContentApprovalIcon width="24px" height="20px" />,
    route: "/creator/audio-video"
  },
  {
    name: "Live Events and Contents",
    icon: <EventsIcon width="24px" height="20px" />,
    route: "/events-contents"
  },
  {
    name: "Manage Content",
    icon: <ContentIcon width="24px" height="20px" />,
    route: "/manage-content/terms-policies"
  },
  {
    name: "Notifications",
    icon: <NotificationIcon width="24px" height="20px" />,
    route: "/notifications"
  },
  {
    name: "Reports",
    icon: <ReportIcon width="26px" height="22px" />,
    route: "/reports"
  },
  {
    name: "Earnings",
    icon: <EarningIcon width="24px" height="20px" />,
    route: "/earnings"
  },
  {
    name: "Users and Access",
    icon: <UsersAndAccessIcon width="27px" height="27px" />,
    route: "/user-and-access",
  },
];

export const requestdropdown = [
  {
    value: "pending",
    label: "Pending"
  },
  {
    value: "rejected",
    label: "Rejected"
  }
];

export const modalicon = {
  delete: "delete",
  warning: "warning"
};
export const frequencyOptions = [
  {
    value: 1,
    label: "Once"
  },
  {
    value: 2,
    label: "Daily"
  },
  {
    value: 3,
    label: "Weekly"
  },
  {
    value: 4,
    label: "Bi-Weekly"
  },
  {
    value: 5,
    label: "Once a month"
  }
];

export const days = [
  {
    value: 0,
    label: "Sunday"
  },
  {
    value: 1,
    label: "Monday"
  },
  {
    value: 2,
    label: "Tuesday"
  },
  {
    value: 3,
    label: "Wednesday"
  },
  {
    value: 4,
    label: "Thursday"
  },
  {
    value: 5,
    label: "Friday"
  },
  {
    value: 6,
    label: "Saturday"
  }
];

export const contenttype = {
  termPolicy: 1,
  disclaimer: 2,
  privacyPolicy: 3,
  allFAQ: 4
};

export const addMoreTime=[
  {
    value:30,
    label:"30 minutes"
  },
  {
    value:60,
    label:"1 hour"
  },
  {
    value:90,
    label:"1.5 hours"
  },
  {
    value:120,
    label:"2 hours"
  },
]

export const faquserRole = [
  {
    value: 3,
    label: "All"
  },
  {
    value: 2,
    label: "Creator"
  },
  {
    value: 1,
    label: "Viewer"
  }
];

export const goliveContent = [
  {
    label: "Streaming software",
    value: 1
  },
  {
    label: "Pre-Recorded Video",
    value: 2
  },
  {
    label: "Webcam",
    value: 3,
    disabled: true
  },
  {
    label: "Mobile",
    value: 4
  }
];

export const region = [
  { label: "Asia Pacific - Australia", value: "asia_pacific_australia" },
  { label: "Asia Pacific - India", value: "asia_pacific_india" },
  { label: "Asia Pacific - Japan", value: "asia_pacific_japan" },
  { label: "Asia Pacific - South Korea", value: "asia_pacific_s_korea" },
  { label: "Asia Pacific - Singapore", value: "asia_pacific_singapore" },
  { label: "Asia Pacific - Taiwan", value: "asia_pacific_taiwan" },
  { label: "Europe - Belgium", value: "eu_belgium" },
  { label: "Europe - Germany", value: "eu_germany" },
  { label: "Europe - Ireland", value: "eu_ireland" },
  { label: "South America - Brazil", value: "south_america_brazil" },
  { label: "US Central - Iowa", value: "us_central_iowa" },
  { label: "US East - South Carolina", value: "us_east_s_carolina" },
  { label: "US East - Virginia", value: "us_east_virginia" },
  { label: "US West - California", value: "us_west_california" },
  { label: "US West - Oregon", value: "us_west_oregon" }
];

export const notificationRole = [
  {
    value: 1,
    label: "Viewer"
  },
  {
    value: 2,
    label: "Creator"
  },
  {
    value: 3,
    label: "All users"
  }
];

export const languageOptions = [
  { label: "Arabic", value: "arabic" },
  { label: "English", value: "english" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
  { label: "Indian", value: "indian" },
  { label: "Japanese", value: "japanese" },
  { label: "Korean", value: "korean" },
  { label: "Mandrin", value: "mandrin" },
  { label: "Norwegian", value: "norwegian" },
  { label: "Portuguese", value: "portuguese" },
  { label: "Spanish", value: "spanish" }
];

export const defaultMessage = {
  invalidToken: "Please try again or use valid token."
};

export const contentRequestType = {
  audio: "audio",
  video: "video",
  series: "series",
  klipz: "klipz"
};

export const podcastType = {
  audio: 1,
  video: 2
};

const userManagement = [
  "viewer-creator",
  "viewer-profile",
  "creator-profile",
  "creator-request",
  "creator-request-profile",
  "creator-events",
  "creator-content",
  "series",
  "all-klipz",
  "klipz-archive",
  "series-archive",
  "event-content-archive",
  "age-details",
  "age-verification"
];

const contentRequest = [
  "audio-video",
  "request-list",
  "content-detail",
  "content-listing",
  "series-create",
  "manage-series-upload",
  "archive",
  "upload-content",
  "review-content"
];

const eventContent = [
  "events",
  "contents",
  "events-request",
  "events-detail",
  "contents-request",
  "contents-detail",
  "events-contents",
  "upload-event",
  "edit-event",
  "schedule-content",
  "events-content-archive",
  "episodes",
  "archive-episdoes",
  "record-content-details"
];

const content = ["terms-policies", "disclaimer", "privacy-policy", "faqs", "new-faqs"];
const notification = ["notifications", "createpush-notification"];
const report = ["reports","report-details"];
const earning = ["earnings"];
const categoriesManagement = ["categories-management"];
export const userAccess = ["user-access", "user-and-access", "users", "access"];
export const checkCurrentRoute = (location) => {
  const arr = location?.pathname.split("/");
  const route = arr.pop();
  if (route === "dashboard") return "Dashboard";
  if (categoriesManagement.includes(route)) return "Categories Management";
  if (userManagement.includes(route)) return "User Management";
  if (contentRequest.includes(route)) return "Content Approval";
  if (eventContent.includes(route)) return "Live Events and Contents";
  if (content.includes(route)) return "Manage Content";
  if (notification.includes(route)) return "Notifications";
  if (report.includes(route)) return "Reports";
  if (earning.includes(route)) return "Earnings";
  if (userAccess.includes(route)) return "Users and Access"; 
  return "Dashboard";
};

export const eventPodcastType = {
  all: 1,
  upcoming: 2,
  past: 3,
  ongoing: 4,
  pending: 5,
  cancel: 6
};

export const eventPodcastFilter = [
  {
    value: eventPodcastType.all,
    label: "All"
  },
  {
    value: eventPodcastType.past,
    label: "Past"
  },
  { value: eventPodcastType.cancel, label: "cancel" },
  {
    value: eventPodcastType.upcoming,
    label: "Upcoming"
  },
  {
    value: eventPodcastType.ongoing,
    label: "Reoccuring"
  }
];

export const graphTabs = [
  {
    name: "Day"
  },
  {
    name: "Week"
  },
  {
    name: "Month"
  },
  {
    name: "Year"
  }
];

export const graphHead = {
  Day: "Day",
  Month: "Montly",
  Week: "Weekly",
  Year: "Yearly"
};

export const graphTabsValue = {
  Day: 1,
  Month: 30,
  Week: 7,
  Year: 365
};

export const weeksName = [
  "Sun", // 1
  "Mon", // 2
  "Tue", // 3
  "Wed", // 4
  "Thu", // 5
  "Fri", // 6
  "Sat" // 7
];

export const monthsName = [
  "Jan", // January
  "Feb", // February
  "Mar", // March
  "Apr", // April
  "May", // May
  "Jun", // June
  "Jul", // July
  "Aug", // August
  "Sep", // September
  "Oct", // October
  "Nov", // November
  "Dec" // December
];

export const dayTimeInterval = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30
];

export const xAxisLabel = {
  Day: "Number of hours",
  Month: "Number of Days"
};

export const handleUploadFile = async (formData, setUploadProgress) => {
  const token = `Bearer ${store?.getState()?.signIn?.data?.token}`;

  try {
    const response = await axiosInterceptor.post(
      "/content/upload-content",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
          "Access-Control-Allow-Origin": "*"
        },

        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          if (setUploadProgress) setUploadProgress(progress);
        }
      }
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const genreOptions = [
  {
    value: "Action",
    label: "Action"
  },
  {
    value: "Adventure",
    label: "Adventure"
  },
  {
    value: "Anime",
    label: "Anime"
  },
  {
    value: "Art",
    label: "Art"
  },
  {
    value: "Beauty",
    label: "Beauty"
  },
  {
    value: "Black Stories",
    label: "Black Stories"
  },
  {
    value: "Business",
    label: "Business"
  },
  {
    value: "Children",
    label: "Children"
  },
  {
    value: "Comedy",
    label: "Comedy"
  },
  {
    value: "Crime & Mystery",
    label: "Crime & Mystery"
  },
  {
    value: "Drama",
    label: "Drama"
  },
  {
    value: "Education",
    label: "Education"
  },
  {
    value: "Faith",
    label: "Faith"
  },
  {
    value: "Fantasy",
    label: "Fantasy"
  },
  {
    value: "Fiction",
    label: "Fiction"
  },
  {
    value: "Financial",
    label: "Financial"
  },
  {
    value: "Gaming",
    label: "Gaming"
  },
  {
    value: "Health",
    label: "Health"
  },
  {
    value: "Horror",
    label: "Horror"
  },
  {
    value: "Motivational",
    label: "Motivational"
  },
  {
    value: "Music",
    label: "Music"
  },
  {
    value: "News",
    label: "News"
  },
  {
    value: "Reality",
    label: "Reality"
  },
  {
    value: "Romance",
    label: "Romance"
  },
  {
    value: "Science fiction",
    label: "Science fiction"
  },
  {
    value: "Sports",
    label: "Sports"
  },
  {
    value: "Travel",
    label: "Travel"
  },
  {
    value: "Other",
    label: "Other"
  }
];

export const contentTypeOptions = [
  {
    value: "Video Podshow",
    label: "Video Podshow"
  },
  {
    value: "Audio Podshow",
    label: "Audio Podshow"
  },
  {
    value: "Short Film",
    label: "Short Film"
  },
  {
    value: "Television Show",
    label: "Television Show"
  },
  {
    value: "Movie",
    label: "Movie"
  },
  {
    value: "Documentary",
    label: "Documentary"
  }
];

export const eventContentOptions = [];

export const eventliveType = [
  {
    label: "Live Concert",
    value: "Live Concert"
  },
  {
    label: "Live Entertainment",
    value: "Live Entertainment"
  }
];

export const formatOptions = [
  {
    label: "Video",
    value: "video"
  },
  {
    label: "Audio",
    value: "audio"
  }
];

export const audienceOptions = [
  {
    label: "Yes, its's made for kids.",
    value: true
  },
  {
    label: "No, it's not made for kids.",
    value: false
  }
];

export const visibilityOptions = [
  {
    label: "Public",
    value: "public"
  },
  {
    label: "Private",
    value: "private"
  }
];

export const isInteger = (number = 0, upto = 2) => {
  const intNumber = Number.isInteger(number);
  if (!intNumber) return number?.toFixed(upto);
  return number;
};

export const goLiveOptions = [
  {
    label: "Streaming software",
    value: 1
  },
  {
    label: "Record",
    value: 2
  }
];

export const liveOptions = [
  {
    label: "Live Podshow",
    value: "Live Podshow"
  },
  {
    label: "Live Sports",
    value: "Live Sports"
  },
  {
    label: "Live Faith",
    value: "Live Faith"
  },
  {
    label: "Live News",
    value: "Live News"
  }
];

export const modalSubheading = {
  delete: "This action is irreversible and cannot be undone.",
  archive: "Move this content to the archive?",
  unarchive: "Move this content to the Unarchive?"
};

export const modalIcons = {
  delete: <DeleteIcon height="40px" width="40px" />,
  archive: <ArchiveIcon height="40px" width="40px" />,
  unarchive: <UnarchiveIcon height="40px" width="40px" />
};

// use this constent to upload file into s3Bucket
export const constant = {
  COVER_TYPE: 1,
  AUDIO_TYPE: 2,
  VIDEO_TYPE: 3,
  PROFILE_TYPE: 4,
  PROFILE_FOLDER: "profile",
  COVER_FOLDER: "cover",
  AUDIO_FOLDER: "audio",
  VIDEO_FOLDER: "video",
  THUMBNAIL_FOLDER: "thumbnail"
};

export const issuesArray = [
  { value: "nudity or sexual_activity", label: "Nudity or sexual activity" },
  { value: "hate speech or symbols", label: "Hate speech or symbols" },
  { value: "bullying or harassment", label: "Bullying or harassment" },
  { value: "false information", label: "False Information" },
  { value: "copyright infringement", label: "Copyright Infringement" },
  { value: "spam", label: "Spam" },
  { value: "Other", label: "Other" }
];

export const rejectedContent=[
  { id: 1, label: "Poor video or audio quality", value: "Poor video or audio quality" },
  { id: 2, label: "Incorrect formatting", value: "Incorrect formatting" },
  { id: 3, label: "Metadata errors", value: "Metadata errors" },
  { id: 4, label: "Offensive material", value: "Offensive material" },
  { id: 5, label: "Adult content", value: "Adult content" },
  { id: 6, label: "Hate speech or symbols", value: "Hate speech or symbols" },
  { id: 7, label: "Copyright Infringement", value: "Copyright Infringement" },
  { id: 8, label: "Community guidelines", value: "Community guidelines" },
  { id: 9, label: "Other", value: "Other" },
]

export const folderName = {
  1: "cover",
  2: "audio",
  3: "video",
  4: "profile"
};

export const pickerDateFormat = "MMM DD,YYYY";

export const last_days_opt = [
  {
    value: "7",
    label: "Last 7 days",
  },
  {
    value: "30",
    label: "Last 30 days",
  },
  {
    value: "90",
    label: "Last 90 days",
  },
  {
    value: "365",
    label: "Last 365 days",
  },
  {
    value: "0",
    label: "Lifetime",
  },
];

export const getStartEndDate = (diff) => {
  const previous = Math.abs(diff);
  const startDate = dayjs().subtract(previous, "day");
  const endDate = dayjs();
  return { startDate, endDate };
};
