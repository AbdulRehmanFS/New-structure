import { memo } from "react";
import { Form, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from "@utils/theme";
import ButtonComponent from "@components/Button";
import SelectComponent from "@components/Select";
import { FaqBackIcon } from "@utils/svgFile";
import BackButton from "@utils/commonSection";
import { faquserRole } from "@utils/constant";
import InputComponent from "@components/Input";
import { addUpdateFaqApi } from "../services/manageContent.api";

const FaqForm = () => {
  const navigate = useNavigate();
  const { type, faqList } = useLocation()?.state || {};

  const onFinish = async (values) => {
    const payload = type === "edit" ? { ...values, faq_id: faqList?._id } : { ...values };
    const res = await addUpdateFaqApi(payload);
    if (res?.status === 200) {
      message.success(res?.message);
      navigate(-1);
    } else {
      message.error(res?.message || "Failed to save FAQ");
    }
  };

  return (
    <div className="bg-[rgba(10,10,10,0.85)] px-5 py-4 rounded-xl">
      <div className="pt-2.5 border-t border-[rgba(255,255,255,0.1)]">
        <Form
        name="basic"
        style={{
          width: "100%",
        }}
        initialValues={{
          question: faqList?.question || "",
          answer: faqList?.answer || "",
          user_role: faqList?.user_role || undefined,
        }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="[&_.content-textarea::placeholder]:text-[rgba(255,255,255,0.5)]">
        <div className="flex gap-1.5 items-center mb-4 text-white">
          <BackButton icon={<FaqBackIcon />} />
          <span className="text-base font-medium">
            {type === "edit" ? "Edit FAQ" : "Create FAQ"}
          </span>
        </div>

        <Form.Item
          label={<label className="text-sm font-medium text-white">Select User role</label>}
          name="user_role"
          rules={[
            {
              required: true,
              message: "Please select your role",
            },
          ]}
          style={{ marginBottom: "10px" }}>
          <SelectComponent options={faquserRole} size="middle" />
        </Form.Item>

        <Form.Item
          name="question"
          label={<label className="text-sm font-medium text-white">Question for FAQ</label>}
          rules={[
            {
              required: true,
              message: "Please input your question",
            },
          ]}>
          <InputComponent
            className="content-textarea"
            rowColumn={1}
            placeholder="Enter text here"
            bg="rgba(196, 196, 196, 0)"
            border="rgba(196, 196, 196, 0.45)"
            color={theme.white}
            type="textarea"
            showCount={false}
            maxLength={1000}
          />
        </Form.Item>

        <Form.Item
          name="answer"
          label={<label className="text-sm font-medium text-white">Answer for FAQ</label>}
          rules={[
            {
              required: true,
              message: "Please input your answer",
            },
          ]}>
          <InputComponent
            className="content-textarea"
            rowColumn={4}
            placeholder="Enter text here"
            bg="rgba(196, 196, 196, 0)"
            border="rgba(196, 196, 196, 0.45)"
            color={theme.white}
            type="textarea"
            showCount={false}
            maxLength={10000}
          />
        </Form.Item>

        <div className="w-full sm:w-auto sm:min-w-[150px]">
          <ButtonComponent
            type="primary"
            htmlType="submit"
            text={type === "edit" ? "Update FAQ" : "Create FAQ"}
            size="large"
            bg={theme.lightPrimaryColor}
            height="40px"
            width="100%"
          />
        </div>
      </Form>
      </div>
    </div>
  );
};

export default memo(FaqForm);

