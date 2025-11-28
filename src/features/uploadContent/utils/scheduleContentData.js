import {
  audienceOptions,
  genreOptions,
  goliveContent,
  liveOptions,
  region
} from "@utils/constant";

export const scheduleContentList = [
  {
    placeholder: "Cover Art",
    name: "cover_art",
    xs: 24,
    md: 24,
    component: "coverArt",
    aspectRatio: 4 / 4,
    rule: [
      {
        required: true,
        message: "Cover art is required"
      }
    ]
  },
  {
    placeholder: "Title of Content",
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
    placeholder: "Show Genre ",
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
    placeholder: "Cast",
    name: "cast",
    xs: 24,
    md: 12,
    multiple: true,
    component: "select"
  },
  {
    placeholder: "Live Type",
    name: "content_type",
    options: liveOptions,
    xs: 24,
    md: 12,
    component: "select",
    rule: [
      {
        required: true,
        message: "Type is required"
      }
    ]
  },
  {
    placeholder: "How do you want to go live?",
    name: "live_type",
    options: goliveContent,
    xs: 24,
    md: 12,
    component: "select"
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
    placeholder: "Frequency",
    name: "frequency",
    xs: 24,
    md: 12,
    component: "input"
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
    placeholder: "Audience",
    name: "audience",
    options: audienceOptions,
    xs: 24,
    md: 24,
    component: "select",
    rule: [
      {
        required: true,
        message: "Audience is required"
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
    placeholder: "Content Description",
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

