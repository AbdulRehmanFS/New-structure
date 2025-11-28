/* eslint-disable react/prop-types */
import { memo, useMemo } from "react";
import { ConfigProvider, Modal } from "antd";
import { CrossIcon } from "@utils/svgFile";

const ModalComponent = (props) => {
  const { openModal, setOpenModal, children, bg, closeIconColor } = props;

  const isLightBackground = useMemo(() => {
    if (closeIconColor) return closeIconColor === "black";
    if (!bg) return false;
    const normalizedBg = bg?.toLowerCase?.() || "";
    return (
      normalizedBg.includes("white") ||
      normalizedBg.includes("#fff") ||
      normalizedBg.includes("rgb(255") ||
      normalizedBg.includes("rgba(255")
    );
  }, [bg, closeIconColor]);

  const iconColor = closeIconColor || (isLightBackground ? "black" : "white");

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: bg ? bg : "transparent",
              colorPrimaryHover: "rgba(196, 196, 196, 1)",
              colorPrimaryActive: "rgba(196, 196, 196, 1)"
            }
          }
        }}
      >
        <Modal
          open={openModal}
          onCancel={setOpenModal}
          footer={() => ""}
          closeIcon={<CrossIcon color={iconColor} height="20" width="20" />}
          wrapClassName={`modal-dialog ${isLightBackground ? "modal-white-bg" : "modal-dark-bg"}`}
          centered
          width="auto"
        >
          {children}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default memo(ModalComponent);

