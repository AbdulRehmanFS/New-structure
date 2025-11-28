/* eslint-disable react/prop-types */
import { memo } from "react";
import ButtonComponent from "@components/fields/Button";
import { theme } from "@utils/theme";
import { LogoutIcon } from "@utils/svgFile";

const ConfirmModal = ({
  subheading = "You want to Logout.",
  confirmButtonText = "Logout",
  handleCancel,
  handleConfirm,
  icon,
  iconClass,
  loading = false,
  mainHeading
}) => (
  <div className="w-[min(520px,90vw)] flex flex-col rounded-2xl bg-white p-6 text-center text-base text-dark-grey-text shadow-lg box-border">
    <div className="icon flex justify-center mb-2">
      <span className={iconClass ?? "logout"}>
        {icon ?? <LogoutIcon height="40px" width="40px" />}
      </span>
    </div>
    <div className="text-[22px] font-semibold">{mainHeading ?? "Are you sure?"}</div>
    <div className="mt-3 text-sm text-grey-text px-2">{subheading}</div>
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end w-full box-border">
      <div className="flex-1 sm:flex-initial sm:w-auto">
        <ButtonComponent text="Cancel" onClick={handleCancel} width="100%" size="middle" />
      </div>
      <div className="flex-1 sm:flex-initial sm:w-auto">
        <ButtonComponent
          width="100%"
          size="middle"
          text={confirmButtonText}
          onClick={handleConfirm}
          loading={loading}
          bg={theme.red}
        />
      </div>
    </div>
    <style jsx>{`
      .icon .logout path {
        fill: ${theme.greyText};
      }
      .icon .delete svg {
        fill: ${theme.red};
      }
      .icon .success svg {
        fill: green;
      }
      .icon .warning svg {
        fill: #f6e113;
      }
    `}</style>
  </div>
);
export default memo(ConfirmModal);

