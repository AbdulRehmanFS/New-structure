import {
  audienceOptions,
  contentTypeOptions,
  formatOptions,
  genreOptions
} from "@utils/constant";

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
    name: "subtitles",
    component: "subtitle-select",
    xs: 24,
    md: 24,
    xl: 24
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

