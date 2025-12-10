import { ButtonComponent, CustomePagination, ModalComponent, TableComponent } from "component/index";
import { PodcastListingWrapper } from "./contentListing";
import { HeaderSection } from "page/style";
import useContentEpisodes from "hooks/eventsContent/useContentEpisodes";
import { modalIcons, modalSubheading, pageLimit } from "util/constant";
import { memo } from "react";
import { BackIcon } from "util/svgFile";
import ConfirmModal from "component/modal/confirmModal";
import { theme } from "util/theme";

const ContentEpisodes = () => {
  const {
    recordedContent,
    column,
    loading,
    totalPage,
    currentPage,
    handlePageChange,
    handleBack,
    modalLoading,
    modalName,
    openModal,
    handleConfirm,
    handleModalOpen,
    navigateArchive
  } = useContentEpisodes();

  return (
    <PodcastListingWrapper>
      <HeaderSection className="heading">
        <div className="back-navigate" onClick={handleBack}>
          <BackIcon />
          Episodes Listings{" "}
        </div>
        <ButtonComponent
            text="Archive"
            width="110px"
            size="middle"
            bg={theme.buttonColor}
            onClick={navigateArchive}
          />
      </HeaderSection>
      <TableComponent data={recordedContent} columns={column} loading={loading} />
      <CustomePagination
        total={totalPage}
        current={currentPage}
        defaultPageSize={pageLimit}
        onPageChange={handlePageChange}
      />
      {openModal && (
        <ModalComponent openModal={openModal} setOpenModal={handleModalOpen}>
          <ConfirmModal
            handleCancel={handleModalOpen}
            handleConfirm={handleConfirm}
            icon={modalIcons[modalName]}
            confirmButtonText="Confirm"
            loading={modalLoading}
            subheading={modalSubheading[modalName]}
          />
        </ModalComponent>
      )}
    </PodcastListingWrapper>
  );
};

export default memo(ContentEpisodes);
