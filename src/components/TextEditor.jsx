import { memo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "@styles/textEditor.css";

const TextEditor = ({ onChange, editorContent, value }) => {
  // Use value prop if provided (from Form.Item), otherwise use editorContent
  const content = value !== undefined ? value : editorContent;

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
  ];

  const handleChange = (content) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <div className="quill-editor-wrapper">
      <ReactQuill
        theme="snow"
        value={content || ""}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Enter content here"
        className="quill-editor"
      />
    </div>
  );
};

export default memo(TextEditor);
