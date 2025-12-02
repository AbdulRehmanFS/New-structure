import { useState } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { theme } from "@utils/theme";
import ButtonComponent from "@components/Button";
import { setCreatorCommisionApi } from "../services/userManagement.api";

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
    <div className="bg-white w-full max-w-[600px] min-w-[280px] md:max-w-[500px] sm:w-full sm:max-w-full">
      <div className="font-semibold text-grey-text px-5 py-2.5 text-base md:text-base text-sm border-b-2">Set Commission</div>
      <Form
        name="basic"
        className="w-full p-5 md:p-5 sm:p-[15px] [&_.ant-input]:text-grey-text"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          commission: commissionValue
        }}>
        <Form.Item
          label={<label className="text-grey-text text-sm">Set Commission</label>}
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
        <div className="mt-[30px] sm:mt-5">
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
    </div>
  );
}

