/* eslint-disable react/prop-types */
import { memo } from "react";
import { ConfigProvider, Modal } from "antd";
import styled from "styled-components";
import { theme } from "util/theme";

const SimpleModal = (props) => {
  const {
    openModal,
    setOpenModal,
    children,
    closable = true,
    padding = "20px 24px",
    bg = "rgb(51 51 51",
  } = props;

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            colorPrimaryHover: "rgba(196, 196, 196, 1)",
            colorPrimaryActive: "rgba(196, 196, 196, 1)",
            contentBg: bg,
            colorIcon: theme.white,
          },
        },
      }}
    >
      <ModalWrapper
        padding={padding}
        open={openModal}
        onCancel={setOpenModal}
        footer={() => ""}
        wrapClassName="simple-modal-dialog"
        closable={closable}
      >
        {children}
      </ModalWrapper>
    </ConfigProvider>
  );
};

export default memo(SimpleModal);

const ModalWrapper = styled(Modal)`
  .ant-modal-content {
    padding: ${(props) => props.padding};
  }
`;
