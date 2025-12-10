/* eslint-disable react/prop-types */
import { memo } from "react";
import styled from "styled-components";
import ButtonComponent from "../fields/button";
import { theme } from "util/theme";
import { LogoutIcon } from "util/svgFile";

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
  <ConfirmModalWrapper>
    <div className="content">
      <div className="icon">
        <span className={`${iconClass ?? "logout"}`}>
          {icon ?? <LogoutIcon height="40px" width="40px" />}
        </span>
      </div>
      <div className="main-heading">{mainHeading ?? "Are you sure?"}</div>
      <div className="subheading">{subheading}</div>
      <div className="button-component">
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
    </div>
  </ConfirmModalWrapper>
);
export default memo(ConfirmModal);

const ConfirmModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 6px;
  min-width: 370px;
  max-width: 550px;
  overflow: hidden;
  .main-heading {
    font-size: 22px;
    color: ${theme.darkGreyText};
    font-weight: 500;
  }
  .subheading {
    min-width: 400px;
    width: 80%;
    margin: auto;
    padding-top: 12px;
    color: ${theme.greyText};
  }
  .heading {
    border-bottom: 1px solid ${theme.midGrey};
    padding: 8px 12px;
    background: ${theme.buttonDarkColor};
    color: ${theme.white};
    font-weight: 700;
  }
  .content {
    padding: 20px 24px;
    text-align: center;
    font-size: 16px;
  }
  .icon {
    .logout path {
      fill: ${theme.greyText};
    }
    .delete svg {
      fill: ${theme.red};
    }
    .success svg {
      fill: "green";
    }
    .warning svg {
      fill: #f6e113;
    }
  }
  .button-component {
    display: flex;
    justify-content: end;
    gap: 12px;
    margin-top: 20px;
  }
`;
