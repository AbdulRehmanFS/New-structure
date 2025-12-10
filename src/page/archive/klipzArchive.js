import { CustomePagination, ModalComponent, TableComponent } from "component/index"
import ConfirmModal from "component/modal/confirmModal"
import { PodcastListingWrapper } from "page/eventsContent/contentListing"
import { HeaderSection } from "page/style"
import { modalIcons, modalSubheading, pageLimit } from "util/constant"
import BackButton from "util/commonSection";
import { useLocation } from "react-router-dom"
import useUserArchive from "hooks/archive/useUserArchive"

const KlipzArchive=()=>{
  const { userId } = useLocation()?.state || {};

 
    const {
        openModal,
        archiveContent,
        klipzContent,
        modalLoading,
        loading,
        totalPage,
        currentPage,
        modalName,
        handleArchive,
        handlePageChange,
        handleParticularModal

    }=useUserArchive(userId,"klipz")

    return(
        <PodcastListingWrapper>
        <HeaderSection className="heading">
          <div className="back-navigate" >
          <BackButton/>
            Archive Listings{" "}
          </div>
        </HeaderSection>
        <TableComponent data={archiveContent} columns={klipzContent} loading={loading} />
        <CustomePagination
          total={totalPage}
          current={currentPage}
          defaultPageSize={pageLimit}
          onPageChange={handlePageChange}
        />
            {openModal && (
            <ModalComponent openModal={openModal} setOpenModal={handleParticularModal}>
              <ConfirmModal
                handleCancel={handleParticularModal}
                handleConfirm={handleArchive}
                icon={modalIcons[modalName]}
                confirmButtonText="Confirm"
                loading={modalLoading}
                subheading={modalSubheading[modalName]}
              />
            </ModalComponent>
          )}
      </PodcastListingWrapper>

    )

}

export default KlipzArchive