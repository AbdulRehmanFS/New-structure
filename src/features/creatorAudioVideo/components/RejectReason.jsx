import { memo, useState } from "react";
import { Checkbox, Modal } from "antd";
import InputComponent from "@components/Input";
import ButtonComponent from "@components/Button";
import { rejectedContent } from "@utils/constant";
import { theme } from "@utils/theme";

const RejectReason = ({
  isModalOpen,
  handleclose,
  rejected,
  loading,
  onChange,
  otherReasonChange,
  selectedValue,
  rejectedIssue = rejectedContent,
  text = "Reject Content"
}) => {
  const [otherReason, setOtherReason] = useState("");

  const handleOtherReasonChange = (e) => {
    setOtherReason(e.target.value);
    if (otherReasonChange) otherReasonChange(e);
  };

  const handleReject = () => {
    if (selectedValue === "Other" && !otherReason.trim()) {
      return;
    }
    rejected();
  };

  return (
    <Modal open={isModalOpen} onCancel={handleclose} footer={false} width={520}>
      <div className="w-full p-6">
        <div className="text-lg font-semibold mb-4 text-center text-dark-grey-text">
          Please select from one of the reasons below.
        </div>
        <Checkbox.Group
          style={{ width: "100%" }}
          value={selectedValue ? [selectedValue] : []}
          onChange={onChange}
        >
          <div className="flex flex-col gap-3 mb-4">
            {rejectedIssue?.map((e, index) => (
              <div key={index} className="flex items-start">
                <Checkbox value={e.value}>
                  <span className="text-dark-grey-text">{e.label}</span>
                </Checkbox>
              </div>
            ))}
          </div>

          <InputComponent
            type="textarea"
            disabled={selectedValue !== "Other"}
            bg={theme.fieldBg || "#2a2a2a"}
            color={theme.black || "#000"}
            rows={5}
            placeholder={selectedValue === "Other" ? "Please specify the reason" : " "}
            onChange={(e) => handleOtherReasonChange(e)}
            value={otherReason}
            className="mb-4"
          />

          <div className="flex gap-3 justify-end mt-6">
            <ButtonComponent
              text="Cancel"
              bg={theme.black || "#000"}
              onClick={handleclose}
              width="100px"
            />
            <ButtonComponent
              text={text}
              onClick={handleReject}
              bg={theme.primaryColor}
              loading={loading}
              width="140px"
            />
          </div>
        </Checkbox.Group>
      </div>
    </Modal>
  );
};

export default memo(RejectReason);

