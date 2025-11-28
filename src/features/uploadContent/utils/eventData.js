import {
  audienceOptions,
  eventliveType,
  genreOptions,
  goLiveOptions,
  region
} from "@utils/constant";

export const eventList = [
  {
    placeholder: "Banner Image",
    name: "banner_image",
    xs: 24,
    md: 16,
    component: "coverArt",
    aspectRatio: 16 / 9,
    rule: [
      {
        required: true,
        message: "Banner image is required"
      }
    ]
  },
  {
    placeholder: "Event Icon",
    name: "event_icon",
    xs: 24,
    md: 8,
    component: "coverArt",
    aspectRatio: 4 / 4,
    rule: [
      {
        required: true,
        message: "Event icon is required"
      }
    ]
  },
  {
    placeholder: "Title of Event",
    name: "title",
    xs: 24,
    md: 12,
    component: "input",
    rule: [
      {
        required: true,
        message: "Title is required"
      }
    ]
  },
  {
    placeholder: "Select creator",
    name: "creator",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    rule: [
      {
        required: true,
        message: "Creator is required"
      }
    ]
  },
  {
    placeholder: "How do you want to go live?",
    name: "live_type",
    options: goLiveOptions,
    xs: 24,
    md: 12,
    component: "select"
  },
  {
    placeholder: "Genre",
    name: "genre",
    options: genreOptions,
    xs: 24,
    md: 12,
    component: "select",
    rule: [
      {
        required: true,
        message: "Genre is required"
      }
    ]
  },
  {
    placeholder: "Live Type",
    name: "content_type",
    options: eventliveType,
    xs: 24,
    md: 12,
    component: "select",
    rule: [
      {
        required: true,
        message: "Content is required"
      }
    ]
  },
  {
    placeholder: "Date",
    name: "scheduled_date",
    xs: 24,
    md: 12,
    component: "date-picker",
    rule: [
      {
        required: true,
        message: "Date is required"
      }
    ]
  },
  {
    placeholder: "Start Time",
    name: "start_time",
    xs: 24,
    md: 6,
    component: "time-picker",
    rule: [
      {
        required: true,
        message: "Start Time is required"
      }
    ]
  },
  {
    placeholder: "End Time",
    name: "end_time",
    xs: 24,
    md: 6,
    component: "time-picker"
  },
  {
    placeholder: "Cast",
    name: "cast",
    xs: 24,
    md: 12,
    multiple: true,
    component: "select"
  },
  {
    placeholder: "Region",
    name: "region",
    xs: 24,
    md: 12,
    xl: 12,
    options: region,
    component: "select"
  },
  {
    placeholder: "Ticket Amount",
    name: "ticket_amount",
    xs: 24,
    md: 12,
    component: "input",
    rule: [
      {
        required: true,
        message: "Ticket amount is required"
      }
    ]
  },
  {
    placeholder: "Audience",
    name: "audience",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: audienceOptions,
    rule: [
      {
        required: true,
        message: "Audience is required"
      }
    ]
  },
  {
    placeholder: "Venue",
    name: "venue",
    xs: 24,
    md: 12,
    xl: 12,
    component: "input",
    rule: [
      {
        required: true,
        message: "Venue is required"
      }
    ]
  },
  {
    placeholder: "Upload Content Here",
    name: "upload",
    xs: 24,
    md: 24,
    xl: 24,
    component: "upload-content",
    rule: [
      {
        required: true,
        message: "Content is required"
      }
    ]
  },
  {
    placeholder: "Upload Trailer",
    name: "upload_trailer",
    xs: 24,
    md: 24,
    xl: 24,
    component: "upload-content",
    size: "small"
  },
  {
    placeholder: "Event Description",
    type: "textarea",
    name: "description",
    xs: 24,
    md: 24,
    component: "textarea",
    rule: [
      {
        required: true,
        message: "Description is required"
      }
    ]
  }
];

