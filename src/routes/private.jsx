/* eslint-disable react/prop-types */
import { Dashboard } from "@features/dashboard";
import UserManagement from "@features/userManagement/pages/UserManagement";
import Viewer from "@features/userManagement/pages/Viewer";
import ViewerProfile from "@features/userManagement/pages/ViewerProfile";
import CreatorProfile from "@features/userManagement/pages/CreatorProfile";
import CreatorRequest from "@features/userManagement/pages/CreatorRequest";
import CreatorProfileRequest from "@features/userManagement/pages/CreatorProfileRequest";
import EventPodcast from "@features/eventsContent";
import {
  EventListing,
  EventRequest,
  PodcastListing,
  PodcastRequest
} from "@features/eventsContent/components";
import EventDetail from "@features/eventsContent/pages/EventDetail";
import PodcastDetail from "@features/eventsContent/pages/PodcastDetail";
import ContentEpisodes from "@features/eventsContent/pages/ContentEpisodes";
import RecordContentDetail from "@features/eventsContent/pages/RecordContentDetail";
import ManageContent from "@features/manageContent";
import {
  FaqForm,
  Disclaimer,
  PrivacyPolicy,
  TermsPolices,
  FAQs
} from "@features/manageContent/pages/ManageContent";
import RequestSection from "@features/creatorAudioVideo/pages/RequestSection";
import CreatorContentDetail from "@features/creatorAudioVideo/pages/DetailView";
import Notifications from "@features/notification/pages/Notifications";
import Reports from "@features/reports/pages/Reports";
import ViewAll from "@features/userManagement/pages/ViewAllList";
import Earnings from "@features/earnings/pages/Earnings";
import ContentListing from "@features/creatorAudioVideo/pages/ContentListing";
import CategoriesManagement from "@features/categoriesManagement/pages/CategoriesManagement";
import UploadVideo from "@features/uploadContent/pages/VideoForm";
import ReviewContent from "@features/uploadContent/pages/ReviewContent";
import UploadEventForm from "@features/uploadContent/pages/EventForm";
import EditEventForm from "@features/uploadContent/pages/EditEventForm";
import Schedulecontent from "@features/uploadContent/pages/ScheduleContent";
import SeriesUpload from "@features/uploadContent/pages/SeriesForm";
import ManageSeries from "@features/uploadContent/pages/ManageSeries";
import ArchiveSection from "@features/creatorAudioVideo/pages/ArchiveSection";
import CreatorAudioVideo from "@features/creatorAudioVideo/pages/CreatorAudioVideo";
import Eventcontentarchive from "@features/archive/pages/EventContentArchive";
import ViewAllSeries from "@features/userManagement/pages/SeriesViewList";
import ViewAllKlipz from "@features/userManagement/pages/ViewAllKlipz";
import { Navigate } from "react-router-dom";
import CreatePushNotification from "@features/notification/pages/CreatePushNotification";
import ContentEpisodeArchive from "@features/archive/pages/ContentEpisodeArchive";
import KlipzArchive from "@features/archive/pages/KlipzArchive";
import UserEventsContentArchive from "@features/archive/pages/UserEventsContentArchive";
import UserSeriesArchive from "@features/archive/pages/UserSeriesArchive";
import ReportDetails from "@features/reports/pages/ReportDetails";
import NotificationActivity from "@features/notification/pages/NotificationActivity";
import AgeVerification from "@features/userManagement/pages/AgeVerification";
import AgeVerificationDetail from "@features/userManagement/pages/AgeVerificationDetail";
import UserAndAccess from "@features/userAndAccess/pages/UserAndAccess";

const privatePath = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/categories-management", element: <CategoriesManagement /> },
  { path: "/user-management", element: <UserManagement /> },
  { path: "/user-management/viewer-creator", element: <UserManagement /> },
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
  { path: "/creator/archive", element: <ArchiveSection /> },
  { path: "/creator/events-content-archive", element: <Eventcontentarchive /> },
  { path: "/creator/audio-video", element: <CreatorAudioVideo /> },
  { path: "/creator/request-list", element: <RequestSection /> },
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
  { path: "/events-contents/record-content-details", element: <RecordContentDetail /> },
  { path: "/events-contents/events-detail", element: <EventDetail /> },
  { path: "/events-contents/contents-detail", element: <PodcastDetail /> },
  { path: "/upload-event", element: <UploadEventForm /> },
  { path: "/schedule-content", element: <Schedulecontent /> },
  { path: "/edit-event", element: <EditEventForm /> },
  { path: "/creator/events-content-archive", element: <Eventcontentarchive /> },

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
  { path: "/user-and-access", element: <UserAndAccess /> }
];

export { privatePath };

