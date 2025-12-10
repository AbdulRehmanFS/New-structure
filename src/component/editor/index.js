/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import "./styles.css";

const TextEditor = (props) => {
  const { onChange, editorContent } = props;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (editorContent) {
      const data = EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(editorContent))
      );
      setEditorState(data);
    }
  }, [editorContent]);

  const onEditorStateChange = (editorData) => {
    const html = draftToHtml(convertToRaw(editorData.getCurrentContent()));
    setEditorState(editorData);
    onChange(html);
  };

  return (
    <Editor
      editorState={editorState}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      onEditorStateChange={onEditorStateChange}
      placeholder="Enter content here"
    />
  );
};

export default memo(TextEditor);
