import { memo, useEffect } from "react";
import { Form } from "antd";
import ButtonComponent from "@components/Button";
import TextEditor from "@components/TextEditor";
import { theme } from "@utils/theme";

const ContentForm = ({ handleSubmit, preContent, loading = false }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (preContent !== undefined) {
      form.setFieldsValue({ content: preContent });
    }
  }, [preContent, form]);

  const onFinish = async (values) => {
    if (handleSubmit) handleSubmit(values);
  };

  return (
    <Form
      form={form}
      name="basic"
      style={{
        width: "100%",
      }}
      initialValues={{
        content: preContent || "",
      }}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      className="[&_.content-textarea::placeholder]:text-[rgba(0,0,0,0.73)] [&_.content-textarea]:p-5">
      <Form.Item
        name="content"
        rules={[
          {
            required: true,
            message: "Please input your content",
          },
        ]}>
        <TextEditor editorContent={preContent} />
      </Form.Item>

      <ButtonComponent
        type="primary"
        htmlType="submit"
        text="Update Content"
        size="large"
        bg={theme.lightPrimaryColor}
        loading={loading}
        height="40px"
      />
    </Form>
  );
};

export default memo(ContentForm);

