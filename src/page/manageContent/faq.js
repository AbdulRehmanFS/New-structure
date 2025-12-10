import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "component/fields/button";
import { font, theme } from "util/theme";
import { DeleteIcon, EditFaqIcon } from "util/svgFile";
import { contenttype, modalIcons, modalSubheading } from "util/constant";
import Loader from "component/loader";
import useGetContent from "hooks/manageContent/useGetContent";
import { ModalComponent } from "component/index";
import ConfirmModal from "component/modal/confirmModal";
import { useState } from "react";
import { removeFaqApi } from "service/api/manageContent";
import { message } from "antd";
import { errorMessage } from "util/commonSection";

const FaqList = ({ list, key, handleLoading,modalLoading }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const [contentId, setcontentId] = useState();

  const handleFaqFormNavigate = () =>
    navigate("/manage-content/new-faqs", {
      state: { type: "edit", faqList: list }
    });
  const handleDeleteModal = (list) => {
    setOpenModal((prev) => !prev);

    setcontentId(list?._id);
  };
  const handleConfirm = async () => {
    handleLoading();
    const params = new URLSearchParams();
    params.append("faq_id", contentId);
    const req = await removeFaqApi(params);
    if (req.status == 200) {
      message.success("Successefully Deleted");
      setOpenModal((prev) => !prev);
    } else {
      errorMessage(req);
    }
    handleLoading();
  };
  

  const modalName = "delete";

  return (
    <FaqListWrapper key={key}>
      <div className="question-wrapper">
        <div className="question">{list?.question}</div>
        <div className="flex-box">
          <span onClick={handleFaqFormNavigate} aria-hidden>
            <EditFaqIcon height="18px" width="18px" />
          </span>
          <span onClick={() => handleDeleteModal(list)} aria-hidden>
            <DeleteIcon fill="red" height="18px" width="18px" />
          </span>
        </div>
      </div>
      <div className="answer">{list?.answer}</div>
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
    </FaqListWrapper>
  );
};

export default function FAQs() {
  const navigate = useNavigate();
  const [modalLoading, setmodalLoading] = useState(false);

  const { contentData, loading } = useGetContent(contenttype.allFAQ,modalLoading);

  const handleLoading = () => {
    setmodalLoading((prev) => !prev);
  };

  const handleFaqFormNavigate = () =>
    navigate("/manage-content/new-faqs", { state: { type: "add" } });

  if (loading) return <Loader />;
  return (
    <FAQWrapper>
      <div className="faq-button-container">
        <Button
          text="Create FAQ"
          width="140px"
          size="middle"
          bg={theme.buttonColor}
          onClick={handleFaqFormNavigate}
        />
      </div>
      <div className="question-count">
        {`${contentData?.length} `}
        {contentData?.length > 1 ? "Questions" : "Question"}
      </div>
      <div className="faq-lists">
        {contentData?.map((list, i) => (
          <FaqList key={i} list={list} handleLoading={handleLoading} modalLoading={modalLoading} />
        ))}
      </div>
    </FAQWrapper>
  );
}

const FAQWrapper = styled.div`
  padding-top: 10px;
  border-top: 1px solid ${theme.grey2};
  .faq-button-container {
    display: flex;
    justify-content: end;
    margin-top: 10px;
  }
  .question-count {
    color: ${theme.lightGreyText};
    margin: 6px 0 12px 0;
  }
  .question {
    width: 96%;
    display: flex;
    flex-wrap: wrap;
  }
  .faq-lists {
    height: calc(100vh - 270px);
    overflow: auto;
  }
  .faq-lists::-webkit-scrollbar {
    width: 0px;
  }
`;

const FaqListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 0px;
  border-bottom: 1px solid ${theme.grey2};
  gap: 8px;
  color: ${theme.lightGreyText};
  .question-wrapper {
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    svg {
      cursor: pointer;
    }
  }
  .flex-box {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  .answer {
    font-size: ${font.smallFont};
  }
`;
