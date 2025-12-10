/* eslint-disable react/prop-types */
import Dashboard from "page/dashboard";
import Viewer from "page/userManagement";
import ViewerProfile from "page/userManagement/viewerProfile";
import CreatorProfile from "page/userManagement/creatorProfile";
import CreatorRequest from "page/userManagement/creatorRequest";
import CreatorProfileRequest from "page/userManagement/creatorProfileRequest";
import EventPodcast, {
  EventListing,
  EventRequest,
  PodcastListing,
  EventDetail,
  PodcastDetail,
  PodcastRequest
} from "page/eventsContent";
import ManageContent, {
  FaqForm,
  Disclaimer,
  PrivacyPolicy,
  TermsPolices,
  FAQs
} from "page/manageContent";
import CreatorAudioRequest from "page/creatorAudioVideo/requestSection";
import CreatorContentDetail from "page/creatorAudioVideo/detailView";
import Notifications from "page/notification";
import Reports from "page/reports/index.js";
import ViewAll from "page/userManagement/viewAllList.js";
import Earnings from "page/earnings/index.js";
import ContentListing from "page/creatorAudioVideo/contentListing.js";
import CategoriesManagement from "page/categoriesManagement/index.js";
import UploadVideo from "page/uploadContent/videoForm.js";
import ReviewContent from "page/uploadContent/reviewContent.js";
import UploadEventForm from "page/uploadContent/eventForm.js";
import EditEventForm from "page/uploadContent/editEventForm.js";
import Schedulecontent from "page/uploadContent/sheduleContent.js";
import SeriesUpload from "page/uploadContent/seriesForm.js";
import ManageSeries from "page/uploadContent/manageSeries.js";
import Archivesection from "page/archive/index.js";
import CreatorAudioVideo from "page/creatorAudioVideo/index.js";
import Eventcontentarchive from "page/archive/eventContentArchive.js";
import ViewAllSeries from "page/userManagement/seriesViewList.js";
import ViewAllKlipz from "page/userManagement/viewAllKlipz.js";
import { Navigate } from "react-router-dom";
import CreatePushNotification from "page/notification/createPushNotification";
import ContentEpisodes from "page/eventsContent/contentEpisodes";
import ContentEpisodeArchive from "page/archive/contentEpisodeArchive";
import KlipzArchive from "page/archive/klipzArchive";
import UserEventsContentArchive from "page/archive/userEventsContentArchive";
import UserSeriesArchive from "page/archive/userSeriesArchive";
import ReportDetails from "page/reports/reportDetails";
import NotificationActivity from "page/notification/NotificationActivity";
import AgeVerification from "page/userManagement/ageVerification";
import AgeVerificationDetail from "page/userManagement/ageVerificationDetail";
import UserAndAccess from "page/UserAndAccess/UserAndAccess";


const privatePath = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/categories-management", element: <CategoriesManagement /> },
  { path: "/user-management/viewer-creator", element: <Viewer /> },
  {
    path: "/user-management/content-detail",
    element: <CreatorContentDetail />
  },
  {
    path: "/createpush-notification",
    element: <CreatePushNotification />
  },
  { path: "/user-management/viewer-profile", element: <ViewerProfile /> },
  { path: "/user-management/creator-profile", element: <CreatorProfile /> },
  { path: "/user-management/creator-request", element: <CreatorRequest /> },
  {
    path: "/user-management/creator-request-profile",
    element: <CreatorProfileRequest />
  },
  {
      path:"/user-management/age-verification",element:<AgeVerification/>
  },
  {
    path:"/user-management/age-details" ,element:<AgeVerificationDetail/>
  },
  { path: "/user-management/klipz-archive", element: <KlipzArchive /> },
  { path: "/user-management/creator-events", element: <ViewAll /> },
  { path: "/user-management/series", element: <ViewAllSeries /> },
  { path: "/user-management/creator-content", element: <ViewAll /> },
  { path: "/user-management/series-archive", element: <UserSeriesArchive /> },
  { path: "/user-management/event-content-archive", element: <UserEventsContentArchive /> },
  { path: "/user-management/all-klipz", element: <ViewAllKlipz /> },
  { path: "/creator/archive", element: <Archivesection /> },
  { path: "/creator/events-content-archive", element: <Eventcontentarchive /> },
  { path: "/creator/audio-video", element: <CreatorAudioVideo /> },
  { path: "/creator/request-list", element: <CreatorAudioRequest /> },
  { path: "/creator/content-detail", element: <CreatorContentDetail /> },
  { path: "/creator/content-listing", element: <ContentListing /> },
  { path: "/creator/upload-content", element: <UploadVideo /> },
  { path: "/creator/review-content", element: <ReviewContent /> },
  { path: "/creator/series-create", element: <SeriesUpload /> },
  { path: "/creator/manage-series-upload", element: <ManageSeries /> },

  {
    path: "/events-contents",
    element: <EventPodcast />,
    childern: [
      { index: true, element: <Navigate to="/events-contents/events" /> },
      { path: "/events-contents/events", element: <EventListing /> },
      { path: "/events-contents/events-request", element: <EventRequest /> },
      { path: "/events-contents/contents-request", element: <PodcastRequest /> },
      { path: "/events-contents/contents", element: <PodcastListing /> },
      { path: "/events-contents/episodes", element: <ContentEpisodes /> },
      { path: "/events-contents/archive-episdoes", element: <ContentEpisodeArchive /> }
    ]
  },
  { path: "/events-contents/record-content-details", element: <CreatorContentDetail /> },
  { path: "/events-contents/events-detail", element: <EventDetail /> },
  { path: "/events-contents/contents-detail", element: <PodcastDetail /> },
  { path: "/upload-event", element: <UploadEventForm /> },
  { path: "/schedule-content", element: <Schedulecontent /> },
  { path: "/edit-event", element: <EditEventForm /> },

  {
    path: "/manage-content",
    element: <ManageContent />,
    childern: [
      { index: true, element: <Navigate to="/manage-content/terms-policies" /> },
      { path: "/manage-content/terms-policies", element: <TermsPolices /> },
      { path: "/manage-content/disclaimer", element: <Disclaimer /> },
      { path: "/manage-content/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/manage-content/faqs", element: <FAQs /> },
      { path: "/manage-content/new-faqs", element: <FaqForm /> }
    ]
  },
  { path: "/notifications", element: <Notifications /> },
  { path: "/notification-activity", element: <NotificationActivity /> },
  { path: "/reports", element: <Reports /> },
  { path: "/report-details", element: <ReportDetails /> },
  { path: "/earnings", element: <Earnings /> },
  {
    path: "/user-and-access",
    element: <UserAndAccess />,
  },
];

export { privatePath };
