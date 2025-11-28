import { memo, useEffect } from "react";
import { Form } from "antd";
import ButtonComponent from "@components/Button";
import TextEditor from "@components/TextEditor";

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
    <div className="bg-[rgba(10,10,10,0.85)] px-5 py-4 rounded-xl">
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
        className="content-form-wrapper">
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
          bg="rgba(196, 196, 196, 0.23)"
          loading={loading}
        />
      </Form>
    </div>
  );
};

export default memo(ContentForm);

