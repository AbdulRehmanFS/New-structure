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
    <div className="bg-[rgba(10,10,10,0.85)] px-5 py-4 rounded-xl">
      <div className="pt-2.5 border-t border-[rgba(255,255,255,0.1)]">
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
          className="[&_.content-textarea::placeholder]:text-[rgba(255,255,255,0.5)]">
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

          <div className="w-full sm:w-auto sm:min-w-[150px]">
            <ButtonComponent
              type="primary"
              htmlType="submit"
              text="Update Content"
              size="large"
              bg={theme.lightPrimaryColor}
              loading={loading}
              height="40px"
              width="100%"
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default memo(ContentForm);

