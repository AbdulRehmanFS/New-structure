import ConfirmModal from "@features/common/components/ConfirmModal";
import { DeleteIcon, ReportIcon } from "@utils/svgFile";
import { Checkbox, message, Modal } from "antd";
import { issuesArray } from "@utils/constant";
import InputComponent from "@components/Input";
import ButtonComponent from "@components/Button";
import ModalComponent from "@features/common/components/Modal";
import { useState } from "react";
import { theme } from "@utils/theme";
import styled from "styled-components";
import { deleteCreatorUserApi, updateUserStatusApi } from "@features/userManagement/services/userManagement.api";
import { errorMessage } from "@utils/commonSection";
import { useNavigate } from "react-router-dom";

export default function ReportModal({
  openModal,
  handleOnChange,
  userInfoId,
  changeStatus,
  deletemodal = false
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [otherReason, setOtherReason] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    handleOnChange();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (e) => {
    setSelectedValue(e[e.length - 1]);
  };

  const deactiveUser = async () => {
    setLoading(true);

    if (deletemodal) {
      const payload = new URLSearchParams();
      payload.append("user_id", userInfoId);
      payload.append("reason", selectedValue == "other" ? otherReason : selectedValue);
      const res = await deleteCreatorUserApi(payload);
      if (res?.status === 200) {
        message.success(res?.message || "Creator delete successfully.");
        navigate(-1);
      } else message.error(res?.message || "Something went wrong");
    } else {
      const payload = {
        user_id: userInfoId,
        status: "inactive",
        reason: selectedValue == "Other" ? otherReason : selectedValue
      };
      const req = await updateUserStatusApi(payload);
      if (req?.status == 200) {
        message.success("Successfully Deactive");
        changeStatus();
        setIsModalOpen(false);
      } else {
        errorMessage(req);
      }
    }
    setLoading(false);
  };

  return (
    <div>
      {openModal && (
        <ModalComponent openModal={openModal} setOpenModal={handleOnChange}>
          <ConfirmModal
            handleCancel={handleOnChange}
            handleConfirm={handleConfirm}
            icon={deletemodal ? <DeleteIcon /> : <ReportIcon />}
            confirmButtonText={deletemodal ? "Delete" : "Disable"}
            loading={false}
            subheading={`Are you sure you want to ${deletemodal ? "delete" : "disable"} this user?`}
          />
        </ModalComponent>
      )}
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false} width="auto" centered style={{ maxWidth: "90vw" }}>
        <ModalWrapper>
          <div className="title">Please select from one of the reasons below.</div>
          <Checkbox.Group
            style={{
              width: "100%"
            }}
            value={selectedValue}
            onChange={onChange}>
            {issuesArray?.map((e, index) => (
              <div key={index} className="checkbox">
                <Checkbox key={index} value={e.value}>
                  <p style={{ color: theme.black }}> {e.label}</p>
                </Checkbox>
              </div>
            ))}

            <InputComponent
              type="textarea"
              disabled={selectedValue === "Other" ? false : true}
              bg={theme.fieldBg}
              color={theme.black}
              rowColumn={5}
              onChange={(e) => setOtherReason(e.target.value)}
            />
            <div className="buttons">
              <ButtonComponent
                text={`${deletemodal ? "Delete User" : "Disable User"}`}
                onClick={() => deactiveUser()}
                bg={theme.primaryColor}
                loading={loading}
                width="100%"
                className="sm:w-auto"
              />
              <ButtonComponent
                text="Cancel"
                bg={theme.black}
                onClick={() => setIsModalOpen(false)}
                width="100%"
                className="sm:w-auto"
              />
            </div>
          </Checkbox.Group>
        </ModalWrapper>
      </Modal>
    </div>
  );
}

export const ModalWrapper = styled.div`
  padding: 10px;
  max-width: 520px;
  width: 100%;
  
  .title {
    color: ${theme.primaryColor};
    font-size: 18px;
    font-weight: 600;
  }
  .checkbox {
    padding: 5px 20px;
    width: 100%;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    gap: 10px;
  }

  /* Tablet styles */
  @media (max-width: 1024px) {
    padding: 15px;
    
    .title {
      font-size: 18px;
    }
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    padding: 10px;
    
    .title {
      font-size: 16px;
    }
    
    .checkbox {
      padding: 5px 10px;
    }
    
    .buttons {
      flex-direction: column;
    }
  }

  /* Small mobile styles */
  @media (max-width: 480px) {
    padding: 8px;
    
    .title {
      font-size: 14px;
    }
  }
`;

