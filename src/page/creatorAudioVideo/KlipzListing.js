import ConfirmModal from "component/modal/confirmModal";
import {
  ButtonComponent,
  CustomePagination,
  ModalComponent,
  TableComponent
} from "component/index";
import useKlipzListing from "hooks/contentApprovel/useKlipzListing";
import { HeaderSection } from "page/style";
import { modalIcons, modalSubheading, pageLimit } from "util/constant";
import { theme } from "util/theme";
import styled from "styled-components";

export default function KlipzListing({ searchText = "" }) {
  const {
    userListing,
    loading,
    totalPage,
    currentPage,
    handlePageChange,
    openModal,
    handleModalOpen,
    modalName,
    modalLoading,
    handleConfirm,
    navigateRequest,
    columns
  } = useKlipzListing({ searchText });

  return (
    <Wrapper>

    
      <HeaderSection className="heading-section">
        <div>Klipz Listing</div>
        <div className="actions-btns">
          <ButtonComponent
            text="Archive"
            width="110px"
            size="middle"
            bg={theme.buttonColor}
            onClick={() => navigateRequest(1)}
          />

      
        </div>
      </HeaderSection>
      <TableComponent columns={columns} data={userListing} loading={loading} />
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
    </Wrapper>
  )
}

const Wrapper =styled.div`
.heading-section {
    margin-top: 20px;
  }
  .table-wrapper {
    margin-top: 30px;
  }
  .actions-btns {
    display: flex;
    gap: 10px;
  }

`


