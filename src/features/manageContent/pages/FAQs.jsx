import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import Loader from "@components/Loader";
import ButtonComponent from "@components/Button";
import ModalComponent from "@components/modal/Modal";
import ConfirmModal from "@components/modal/ConfirmModal";
import useGetContent from "../hooks/useGetContent";
import { contenttype } from "@utils/constant";
import { modalIcons, modalSubheading } from "@utils/constant";
import { removeFaqApi } from "../services/manageContent.api";
import { DeleteIcon, EditFaqIcon } from "@utils/svgFile";

const FaqList = ({ list, handleLoading, modalLoading, onDelete }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleFaqFormNavigate = () =>
    navigate("/manage-content/new-faqs", {
      state: { type: "edit", faqList: list },
    });

  const handleDeleteModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleConfirm = async () => {
    handleLoading();
    const params = new URLSearchParams();
    params.append("faq_id", list?._id);
    const req = await removeFaqApi(params.toString());
    if (req.status === 200) {
      message.success("Successfully Deleted");
      setOpenModal(false);
      if (onDelete) onDelete();
    } else {
      message.error(req?.message || "Failed to delete FAQ");
    }
    handleLoading();
  };

  const modalName = "delete";

  return (
    <div className="flex flex-col py-3.5 border-b border-[rgba(255,255,255,0.1)] gap-2 text-[rgba(255,255,255,0.79)]">
      <div className="font-semibold flex justify-between items-start">
        <div className="w-[96%] flex flex-wrap">{list?.question}</div>
        <div className="flex justify-between gap-2.5">
          <span
            onClick={handleFaqFormNavigate}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleFaqFormNavigate();
              }
            }}>
            <EditFaqIcon height="18px" width="18px" />
          </span>
          <span
            onClick={handleDeleteModal}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleDeleteModal();
              }
            }}>
            <DeleteIcon fill="red" height="18px" width="18px" />
          </span>
        </div>
      </div>
      <div className="text-sm">{list?.answer}</div>
      {openModal && (
        <ModalComponent openModal={openModal} setOpenModal={handleDeleteModal}>
          <ConfirmModal
            handleCancel={handleDeleteModal}
            handleConfirm={handleConfirm}
            icon={modalIcons[modalName]}
            confirmButtonText="Confirm"
            loading={modalLoading}
            subheading={modalSubheading[modalName]}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default function FAQs() {
  const navigate = useNavigate();
  const [modalLoading, setModalLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const { contentData, screenLoader, loading } = useGetContent(
    contenttype.allFAQ,
    refreshKey
  );

  const handleLoading = () => {
    setModalLoading((prev) => !prev);
  };

  const handleFaqFormNavigate = () =>
    navigate("/manage-content/new-faqs", { state: { type: "add" } });

  const handleDelete = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (screenLoader) return <Loader loading={screenLoader} fullscreen={false} />;

  return (
    <div className="bg-[rgba(10,10,10,0.85)] px-5 py-4 rounded-xl">
      <div className="pt-2.5 border-t border-[rgba(255,255,255,0.1)]">
        <div className="flex justify-end mt-2.5">
          <ButtonComponent
            text="Create FAQ"
            width="140px"
            size="middle"
            bg="rgba(196, 196, 196, 0.23)"
            onClick={handleFaqFormNavigate}
          />
        </div>
        <div className="text-[rgba(255,255,255,0.79)] my-1.5">
          {`${contentData?.length || 0} `}
          {contentData?.length !== 1 ? "Questions" : "Question"}
        </div>
        <div className="h-[calc(100vh-270px)] overflow-auto">
          {contentData?.map((list, i) => (
            <FaqList
              key={i}
              list={list}
              handleLoading={handleLoading}
              modalLoading={modalLoading}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

