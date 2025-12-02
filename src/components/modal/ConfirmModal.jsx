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
  <div className="flex flex-col bg-white rounded-[6px] min-w-[370px] max-w-[550px] overflow-hidden mx-auto">
    <div className="py-5 px-6 text-center text-base">
      <div className="icon flex justify-center mb-2">
        <span className={iconClass ?? "logout"}>
          {icon ?? <LogoutIcon height="40px" width="40px" />}
        </span>
      </div>
      <div className="text-[22px] font-medium" style={{ color: theme.darkGreyText }}>
        {mainHeading ?? "Are you sure?"}
      </div>
      <div className="subheading mx-auto pt-3 w-[80%] min-w-[400px] text-base" style={{ color: theme.greyText }}>
        {subheading}
      </div>
      <div className="button-component flex justify-end gap-3 mt-5">
        <ButtonComponent
          text="Cancel"
          onClick={handleCancel}
          width="auto"
          size="middle"
          bg={theme.black}
        />
        <ButtonComponent
          width="auto"
          size="middle"
          text={confirmButtonText}
          onClick={handleConfirm}
          loading={loading}
          bg={theme.red}
        />
      </div>
      <style>{`
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
  </div>
);
export default memo(ConfirmModal);

