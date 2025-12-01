import { message } from "antd";
import { useState } from "react";
import { updateUserStatusApi } from "../services/userManagement.api";

const useDeactiveUser = (profile, userid, getUserDetail, otherReason, selectedValue) => {
  const [deactiveModal, setDeactiveModal] = useState(false);
  const [deactiveloading, setdeactiveloading] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);

  const handleDeactiveModal = () => setDeactiveModal((pre) => !pre);

  const handleclose = () => {
    setisModalOpen((prev) => !prev);
    setDeactiveModal(false);
  };

  const handleUpdateStatus = async () => {
    setdeactiveloading(true);
    const status = profile?.status === "inactive" ? "active" : "inactive";
    const payload = {
      user_id: userid,
      status,
      reason: selectedValue == "Other" ? otherReason : selectedValue
    };
    const res = await updateUserStatusApi(payload);
    if (res?.status === 200) {
      message.success("Status updated successfully.");
      getUserDetail();
    } else {
      message.error(res?.message || "Something went wrong in updating status");
    }
    setDeactiveModal(false);
    setisModalOpen(false);
    setdeactiveloading(false);
  };

  return {
    deactiveModal,
    handleDeactiveModal,
    handleUpdateStatus,
    deactiveloading,
    isModalOpen,
    handleclose
  };
};

export default useDeactiveUser;

