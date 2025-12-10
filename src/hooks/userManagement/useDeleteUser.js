import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCreatorUserApi } from "service/api/usermanagement";

const useDeleteUser = (info) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteModal = () => setDeleteModal((pre) => !pre);

  const handleDeleteUser = async () => {
    const res = await deleteCreatorUserApi(info);
    if (res?.status === 200) {
      message.success(res?.message || "Creator delete successfully.");
      navigate(-1);
    } else message.error(res?.message || "Something went wrong");
    handleDeleteModal();
  };

  return [deleteModal, handleDeleteModal, handleDeleteUser];
};

export default useDeleteUser;
