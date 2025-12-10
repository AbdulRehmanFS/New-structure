/* eslint-disable react/prop-types */
import { memo } from "react";
import { Form } from "antd";
import styled from "styled-components";
import ButtonComponent from "component/fields/button";
import { theme } from "util/theme";
import TextEditor from "component/editor";

const ContentForm = ({ handleSubmit, preContent, loading = false }) => {
  const onFinish = async (values) => {
    if (handleSubmit) handleSubmit(values);
  };

  return (
    <ContentFormWrapper
      name="basic"
      style={{
        width: "100%"
      }}
      initialValues={{
        content: preContent
      }}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off">
      <Form.Item
        name="content"
        rules={[
          {
            required: true,
            message: "Please input your content"
          }
        ]}>
        <TextEditor editorContent={preContent} />
      </Form.Item>

      <ButtonComponent
        type="primary"
        htmlType="submit"
        text="Update Content"
        bg={theme.lightPrimaryColor}
        loading={loading}
      />
    </ContentFormWrapper>
  );
};
export default memo(ContentForm);

const ContentFormWrapper = styled(Form)`
  .content-textarea::placeholder {
    color: ${theme.buttonDarkColor};
  }
  .content-textarea {
    padding: 20px;
  }
`;
