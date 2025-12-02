import { memo, useState, useEffect } from "react";
import ModalComponent from "@components/modal/Modal";
import InputComponent from "@components/Input";
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

  // Reset otherReason when selection changes away from "Other"
  useEffect(() => {
    if (selectedValue !== "Other") {
      setOtherReason("");
    }
  }, [selectedValue]);

  const handleOtherReasonChange = (e) => {
    const value = e.target.value;
    setOtherReason(value);
    if (otherReasonChange) otherReasonChange(e);
  };

  const handleCheckboxChange = (value) => {
    const newValue = selectedValue === value ? null : value;
    onChange([newValue].filter(Boolean));
  };

  const handleReject = () => {
    if (selectedValue === "Other" && !otherReason.trim()) {
      return;
    }
    rejected();
  };

  return (
    <ModalComponent 
      openModal={isModalOpen} 
      setOpenModal={handleclose} 
      bg="white" 
      closeIconColor="black"
      
    >
      <div className="w-[520px] text-black p-2">
        {/* Title - close button is handled by ModalComponent and appears on far right */}
        <div className="mb-2">
          <h2 className="text-lg font-semibold" style={{ color: "#d32f2f" }}>
            Please select from one of the reasons below.
          </h2>
        </div>

        {/* Checkbox List */}
        <div className="flex flex-col gap-2 mb-3">
          {rejectedIssue?.map((e, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`reject-${index}`}
                checked={selectedValue === e.value}
                onChange={() => handleCheckboxChange(e.value)}
                className="w-4 h-4 cursor-pointer rounded border-gray-400 focus:ring-black focus:ring-1"
                style={{
                  accentColor: "#000000",
                  backgroundColor: selectedValue === e.value ? "#000000" : "white"
                }}
              />
              <label 
                htmlFor={`reject-${index}`} 
                className="text-base text-black cursor-pointer font-normal"
              >
                {e.label}
              </label>
            </div>
          ))}
        </div>

        {/* Textarea */}
        <div className="mb-4">
          <InputComponent
            type="textarea"
            disabled={selectedValue !== "Other"}
            bg="#f5f5f5"
            color="#000000"
            border="transparent"
            rows={4}
            maxLength={200}
            showCount={true}
            placeholder={selectedValue === "Other" ? "Please specify the reason" : ""}
            onChange={handleOtherReasonChange}
            value={otherReason}
            className="resize-none mb-2"
            style={{ 
              backgroundColor: "#f5f5f5"
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-2 ">
          <button
            onClick={handleclose}
            className="bg-black text-white w-full border-none rounded-md px-5 py-2 cursor-pointer font-bold hover:opacity-90 transition-opacity"
          >
            Cancel
          </button>
          <button
            onClick={handleReject}
            disabled={loading}
            className="bg-[#d32f2f] text-white w-full border-none rounded-md px-5 py-2 cursor-pointer font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : text}
          </button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default memo(RejectReason);

