import { memo, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "@styles/textEditor.css";

const TextEditor = ({ onChange, editorContent, value }) => {
  const quillRef = useRef(null);
  
  // Use value prop if provided (from Form.Item), otherwise use editorContent
  const content = value !== undefined ? value : editorContent;

  // Suppress findDOMNode deprecation warning from ReactQuill
  // This is a known issue with react-quill library that will be fixed in future versions
  useEffect(() => {
    const originalWarn = console.warn;
    const originalError = console.error;
    
    // Suppress findDOMNode warnings
    const suppressFindDOMNodeWarning = (...args) => {
      const message = args[0];
      if (
        typeof message === "string" &&
        (message.includes("findDOMNode is deprecated") ||
         message.includes("Warning: findDOMNode"))
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    const suppressFindDOMNodeError = (...args) => {
      const message = args[0];
      if (
        typeof message === "string" &&
        (message.includes("findDOMNode is deprecated") ||
         message.includes("Warning: findDOMNode"))
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    console.warn = suppressFindDOMNodeWarning;
    console.error = suppressFindDOMNodeError;

    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

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
    <div className="quill-editor-wrapper" ref={quillRef}>
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
