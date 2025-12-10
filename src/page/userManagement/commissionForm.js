import { useState } from "react";
import styled from "styled-components";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { theme } from "util/theme";
import ButtonComponent from "component/fields/button";
import { setCreatorCommisionApi } from "service/api/usermanagement";

export default function CommissionForm({ creatorId, commissionValue = "" }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (payload) => {
    setLoading(true);
    const updatedPayload = { ...payload, user_id: creatorId };
    const res = await setCreatorCommisionApi(updatedPayload);
    if (res?.status === 200) {
      message.success(res?.message || "Commision set successfully");
      navigate(-1);
    } else message.error(res?.message || "Something went wrong");
    setLoading(false);
  };

  return (
    <CommissionFormWrapper>
      <div className="heading">Set Commission</div>
      <Form
        name="basic"
        className="commision-form"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          commission: commissionValue
        }}>
        <Form.Item
          label={<label style={{ color: theme.greyText, fontSize: "14px" }}>Set Commission</label>}
          name="commission"
          rules={[
            {
              required: true,
              pattern: /^(0*(\d{0,2}(\.\d+)?)|\.\d+|100(\.0+$)?)$/,
              message: "please enter only numbers upto 100 or any digit after decimal"
            }
          ]}
          style={{ marginBottom: "10px" }}>
          <Input
            type="text"
            placeholder="Enter the percentage (%)"
            style={{
              height: "36px"
            }}
          />
        </Form.Item>
        <div className="button-container">
          <ButtonComponent
            type="primary"
            size="middle"
            htmlType="submit"
            text="Save"
            bg={theme.lightPrimaryColor}
            loading={loading}
          />
        </div>
      </Form>
    </CommissionFormWrapper>
  );
}

const CommissionFormWrapper = styled.div`
  background: ${theme.white};
  width: 62%;
  .commision-form {
    width: 100%;
    padding: 30px;
  }
  .heading {
    font-weight: 600;
    color: rgba(116, 116, 116, 1);
    padding: 10px 25px;
    font-size: 18px;
    border-bottom: 2px solid;
  }
  .button-container {
    margin-top: 40px;
  }
  .ant-input {
    color: ${theme.greyText};
  }
`;
