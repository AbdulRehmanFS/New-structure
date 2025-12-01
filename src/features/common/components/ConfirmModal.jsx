/* eslint-disable react/prop-types */
import { memo } from "react";
import ButtonComponent from "@components/Button";
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
  mainHeading,
}) => (
  <div className="flex flex-col bg-white rounded-[6px] min-w-[370px] max-w-[550px] overflow-hidden mx-auto">
    <div className="py-5 px-6 text-center text-base">
      <div className="flex justify-center mb-2">
        <span className={iconClass ?? "logout"}>
          {icon ?? <LogoutIcon height="40px" width="40px" />}
        </span>
      </div>
      <div className="text-[22px] font-medium" style={{ color: theme.darkGreyText }}>
        {mainHeading ?? "Are you sure?"}
      </div>
      <div className="mx-auto mt-3 pt-3 w-[80%] min-w-[300px] text-base" style={{ color: theme.greyText }}>
        {subheading}
      </div>
      <div className="flex justify-end gap-3 mt-5">
        <ButtonComponent
          text="Cancel"
          onClick={handleCancel}
          width="50px"
          size="middle"
        />
        <ButtonComponent
          width="50px"
          size="middle"
          text={confirmButtonText}
          onClick={handleConfirm}
          loading={loading}
          bg={theme.red}
        />
      </div>
      <style>{`
        .logout path {
          fill: ${theme.greyText};
        }
        .delete svg {
          fill: ${theme.red};
        }
        .success svg {
          fill: green;
        }
        .warning svg {
          fill: #f6e113;
        }
      `}</style>
    </div>
  </div>
);

export default memo(ConfirmModal);
