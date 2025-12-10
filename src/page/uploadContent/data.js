import {
  audienceOptions,
  contentTypeOptions,
  eventliveType,
  formatOptions,
  genreOptions,
  goliveContent,
  goLiveOptions,
  liveOptions,
  region,
 
} from "util/constant";


export const videoFieldList = [
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
    placeholder: "Cover Art",
    name: "cover_art",
    xs: 24,
    md: 24,
    xl: 24,
    aspectRatio: 4 / 4,
    component: "upload-cover",
    rule: [
      {
        required: true,
        message: "Cover art is required"
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
    placeholder: "Show Title",
    name: "title",
    type: "textarea",
    xs: 24,
    md: 12,
    xl: 12,
    maxLength: 50,
    component: "textarea",
    className: "title-textarea",
    rule: [
      {
        required: true,
        message: "Title is required"
      }
    ]
  },
  {
    placeholder: "Genre",
    name: "genre",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: genreOptions,
    rule: [
      {
        required: true,
        message: "Genre is required"
      }
    ]
  },
  {
    placeholder: "Content Type",
    name: "content_type",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: contentTypeOptions,
    rule: [
      {
        required: true,
        message: "Content type is required"
      }
    ]
  },
  {
    placeholder: "Format",
    name: "type",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: formatOptions,
    rule: [
      {
        required: true,
        message: "Format is required"
      }
    ]
  },
  {
    placeholder: "Cast",
    name: "cast",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select"
  },
  {
    placeholder: "Audience",
    name: "audience",
    xs: 24,
    md: 24,
    xl: 24,
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
    placeholder: "Upload Trailer",
    name: "uploadTrailer",
    xs: 24,
    md: 24,
    xl: 24,
    component: "upload-content",
    size: "small",
    disabled: true
  },
  {
    name:"subtitles",
    component: "subtitle-select",
    xs: 24,
    md: 24,
    xl: 24,
    

  },


  {
    type: "textarea",
    placeholder: "Write description here...",
    name: "description",
    xs: 24,
    md: 24,
    xl: 24,
    component: "textarea",
    maxLength: 600,
    className: "description-textarea",
    rule: [
      {
        required: true,
        message: "Description is required"
      }
    ]
  }
];

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
    // options: [],
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
    component: "time-picker",
   
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
    component: "select",
   
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
    multiple:true,
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
    component: "time-picker",
   
  },
  {
    placeholder: "Frequency",
    name: "frequency",
    xs: 24,
    md: 12,
    component: "input",
  },
  {
    placeholder: "Region",
    name: "region",
    xs: 24,
    md: 12,
    xl: 12,
    options: region,
    component: "select",
   
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

export const editEventList = [
  {
    placeholder: "Banner Image",
    name: "banner_image",
    xs: 24,
    md: 16,
    component: "coverArt",
    disabled: true,
  },
  {
    placeholder: "Event Icon",
    name: "event_icon",
    xs: 24,
    md: 8,
    component: "coverArt",
    aspectRatio: 4 / 4,
    disabled: true,
  },
  {
    placeholder: "Title of event",
    name: "title",
    xs: 24,
    md: 12,
    component: "input",
    disabled: true,
  },
  {
    placeholder: "Stream Id",
    name: "stream_id",
    xs: 24,
    md: 12,
    component: "input",
    disabled: false,
    rule: [
      {
        required: true,
        message: "Stream Id is required",
      },
    ],

  },
  {
    placeholder: "Cast",
    name: "cast",
    xs: 24,
    md: 12,
    multiple: true,
    disabled: true,
    component: "select",
  },
  {
    placeholder: "Genre",
    name: "genre",
    options: genreOptions,
    xs: 24,
    md: 12,
    component: "select",
    disabled: true,
  },
  {
    placeholder: "Live Type",
    name: "live",
    options: eventliveType,
    xs: 24,
    md: 12,
    component: "select",
    disabled: true,
  },
  {
    placeholder: "Date",
    name: "event_date",
    xs: 24,
    md: 12,
    component: "date-picker",
    disabled: true,
  },
  {
    placeholder: "Time",
    name: "event_time",
    xs: 24,
    md: 12,
    component: "time-picker",
    disabled: true,
  },
  {
    placeholder: "Select creator",
    name: "creator",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    disabled: true,
  },
  {
    placeholder: "Ticket Amount",
    name: "ticket_amount",
    xs: 24,
    md: 12,
    component: "input",
    disabled: true,
  },
  {
    placeholder: "How do you want to go live?",
    name: "go_live",
    options: goLiveOptions,
    xs: 24,
    md: 12,
    component: "select",
    disabled: true,
  },
  {
    placeholder: "Audience",
    name: "audience",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    disabled: true,
    options: audienceOptions,
  },
  {
    placeholder: "Video URL",
    name: "rss_url",
    xs: 24,
    md: 12,
    component: "input",
    disabled: false,
    rule: [
      {
        required: true,
        message: "Video Url is required",
      },
    ],
  },
  {
    placeholder: "Venue",
    name: "venue",
    xs: 24,
    md: 12,
    component: "input",
    disabled: true,
  },
  {
    placeholder: "Upload Trailer",
    name: "upload_trailer",
    xs: 24,
    md: 24,
    xl: 24,
    component: "upload-content",
    size: "small",
    disabled: true,
  },
  {
    placeholder: "Write description here...",
    type: "textarea",
    name: "description",
    xs: 24,
    md: 24,
    component: "textarea",
    disabled: true,
  },
];
export const fieldList = [
  {
    placeholder: "Cover Art",
    name: "cover_art",
    xs: 24,
    md: 24,
    xl: 24,
    aspectRatio: 4 / 4,
    component: "upload-cover",
    rule: [
      {
        required: true
      }
    ]
  },
  {
    placeholder: "Series Title",
    name: "title",
    xs: 24,
    md: 12,
    xl: 12,
    component: "input",
    rule: [
      {
        required: true
      }
    ]
  },
  {
    placeholder: "Select Creator",
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
    placeholder: "Genre",
    name: "genre",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: genreOptions,
    rule: [
      {
        required: true
      }
    ]
  },
  {
    placeholder: "Content Type",
    name: "content_type",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: contentTypeOptions,
    rule: [
      {
        required: true
      }
    ]
  },
  {
    placeholder: "Format",
    name: "format",
    xs: 24,
    md: 12,
    xl: 12,
    component: "select",
    options: formatOptions,
    rule: [
      {
        required: true
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
        required: true
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
    size: "small",
    disabled: true
  },
  {
    type: "textarea",
    placeholder: "Write description here...",
    name: "description",
    xs: 24,
    md: 24,
    xl: 24,
    component: "textarea",
    maxLength: 600,
    className: "description-textarea",
    rule: [
      {
        required: true
      }
    ]
  }
];

export const seriesList = [
  {
    placeholder: "Series Title",
    name: "title",
    xs: 24,
    md: 24,
    xl: 24,
    component: "input",
    rule: [
      {
        required: true
      }
    ]
  },
  {
    placeholder: "Upload Video",
    name: "upload_trailer",
    xs: 24,
    md: 24,
    xl: 24,
    component: "upload-content",
    size: "small",
    disabled: true,
    rule: [
      {
        required: true
      }
    ]
  },
  {
    placeholder: "Cover Art",
    name: "cover_art",
    xs: 24,
    md: 24,
    xl: 24,
    aspectRatio: 4 / 4,
    component: "upload-cover",
    rule: [
      {
        required: true
      }
    ]
  },
  {
    placeholder: "Cast",
    name: "cast",
    xs: 24,
    md: 24,
    xl: 24,
    component: "select"
  },

  {
    type: "textarea",
    placeholder: "Write Description Here...",
    name: "description",
    xs: 24,
    md: 24,
    xl: 24,
    component: "textarea",
    maxLength: 600,
    className: "description-textarea",
    rule: [
      {
        required: true
      }
    ]
  }
];
