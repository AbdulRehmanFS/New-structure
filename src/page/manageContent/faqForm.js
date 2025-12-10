import { memo } from "react";
import { Form, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "util/theme";
import ButtonComponent from "component/fields/button";
import Select from "component/fields/select";
import { FaqBackIcon } from "util/svgFile";
import BackButton from "util/commonSection";
import { faquserRole } from "util/constant";
import InputComponent from "component/fields/input-field";
import { addUpdateFaqApi } from "service/api/manageContent";

const ContentFAQForm = () => {
  const navigate = useNavigate();
  const { type, faqList } = useLocation()?.state || {};

  const onFinish = async (values) => {
    const payload = type === "edit" ? { ...values, faq_id: faqList?._id } : { ...values };
    const res = await addUpdateFaqApi(payload);
    if (res?.status === 200) {
      message.success(res?.message);
      navigate(-1);
    } else message.error(res?.message);
  };

  return (
    <ContentFAQFormWrapper
      name="basic"
      style={{
        width: "100%"
      }}
      initialValues={{
        question: faqList?.question,
        answer: faqList?.answer,
        user_role: faqList?.user_role
      }}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off">
      <div className="heading">
        <BackButton icon={<FaqBackIcon />} />
        Create FAQ
      </div>
      <Form.Item
        label={<label className="label">Select User role</label>}
        name="user_role"
        rules={[
          {
            required: true,
            message: "Please select your role"
          }
        ]}
        style={{ marginBottom: "10px" }}>
        <Select options={faquserRole} size="middle" />
      </Form.Item>
      <Form.Item
        name="question"
        label={<label className="label">Question for FAQ</label>}
        rules={[
          {
            required: true,
            message: "Please input your content"
          }
        ]}>
        <InputComponent
          className="content-textarea"
          rowColumn={1}
          placeholder="Enter text here"
          bg="rgba(196, 196, 196, 0)"
          border="rgba(196, 196, 196, 0.45)"
          type="textarea"
          showCount={false}
          maxLength={1000}
        />
      </Form.Item>
      <Form.Item
        name="answer"
        label={<label className="label">Answer for FAQ</label>}
        rules={[
          {
            required: true,
            message: "Please input your content"
          }
        ]}>
        <InputComponent
          className="content-textarea"
          rowColumn={4}
          placeholder="Enter text here"
          bg="rgba(196, 196, 196, 0)"
          border="rgba(196, 196, 196, 0.45)"
          type="textarea"
          showCount={false}
          maxLength={10000}
        />
      </Form.Item>

      <ButtonComponent
        type="primary"
        htmlType="submit"
        text="Create FAQ"
        bg={theme.lightPrimaryColor}
      />
    </ContentFAQFormWrapper>
  );
};
export default memo(ContentFAQForm);

const ContentFAQFormWrapper = styled(Form)`
  padding-top: 10px;
  border-top: 1px solid ${theme.lightGrey};
  .heading {
    display: flex;
    gap: 5px;
    align-items: center;
    margin-bottom: 15px;
    color: ${theme.lightWhite};
  }
  .content-textarea::placeholder {
    color: ${theme.midGrey};
  }
  .label {
    color: ${theme.lightWhite};
    font-size: 14px;
    font-weight: 500;
  }
`;
