
import BackButton from "util/commonSection";
import {  CustomePagination, ModalComponent, TableComponent } from "component/index";
import { modalIcons, modalSubheading, pageLimit } from "util/constant";
import ConfirmModal from "component/modal/confirmModal";
import useSeriesUserArchive from "hooks/archive/useSeriesUserArchive";
import { PodcastListingWrapper } from "page/eventsContent/contentListing";
import { HeaderSection } from "page/style";
import { useLocation } from "react-router-dom";



const UserSeriesArchive=()=>{
    const { userId } = useLocation()?.state || {};

    const {
        currentPage,
        totalPage,
        viewAllListing,
        openModal,
        modalLoading,
        modalName,
        seriesColumns,
        tableLoader,
        handleUnarchive,
        handleParticularModal,
        handlePageChange


    }=useSeriesUserArchive(userId)


    return(
        <PodcastListingWrapper>
             <HeaderSection className="heading">
          <div className="back-navigate" >
          <BackButton/>
            Archive Listings{" "}
          </div>
        </HeaderSection>

        <TableComponent columns={seriesColumns} data={viewAllListing} loading={tableLoader} />
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
                handleConfirm={handleUnarchive}
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
export default UserSeriesArchive;