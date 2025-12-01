/* eslint-disable react/prop-types */
import { memo } from "react";
import { ConfigProvider, Modal } from "antd";
import styled from "styled-components";
import { CrossIcon } from "@utils/svgFile";

const ModalComponent = (props) => {
  const { openModal, setOpenModal, children, bg } = props;

  return (
    <ModalWrapper>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: bg ? bg : "transparent",
              colorPrimaryHover: "rgba(196, 196, 196, 1)",
              colorPrimaryActive: "rgba(196, 196, 196, 1)",
            },
          },
        }}
      >
        <Modal
          open={openModal}
          onCancel={setOpenModal}
          footer={() => ""}
          closable={true}
          closeIcon={<CrossIcon />}
          wrapClassName="modal-dialog"
          style={{ top: "0px", height: "100%", width: "100% !important" }}
        >
          {children}
        </Modal>
      </ConfigProvider>
    </ModalWrapper>
  );
};

export default memo(ModalComponent);

const ModalWrapper = styled.div``;
