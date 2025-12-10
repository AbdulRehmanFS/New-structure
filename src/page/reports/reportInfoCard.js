import Button from "component/fields/button";
import moment from "moment";
import { HorizontalLine } from "page/style";
import { useState } from "react";
import styled from "styled-components";
import { theme } from "util/theme";
import ReportModal, { ModalWrapper } from "./reportModal";
import ConfirmModal from "component/modal/confirmModal";
import { ButtonComponent, ModalComponent } from "component/index";
import { issuesArray, modalIcons, modalSubheading } from "util/constant";
import { archiveContentAPI } from "service/api/archive";
import { errorMessage } from "util/commonSection";
import { Checkbox, message, Modal } from "antd";
import { updateUserStatusApi } from "service/api/usermanagement";

import InputComponent from "component/fields/input-field";

export default function ReportInfoCard({ data }) {
  console.log("data - 👽", data);
  const [openModal, setOpenModal] = useState(false);
  const [ArchiveModal, setArchiveModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [loading, setloading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [ActivateUser, setActivateUser] = useState(data?.reported_user?.status);
  const [otherReason, setOtherReason] = useState();
  
  const reportTypeMap = {
    1: "User Report",
    2: "Comment Report",
    3: "Group Report",
    4: "Copyright Report",
    5: "Content Report"
  };

  const handleOnChange = () => {
    setOpenModal((prev) => !prev);
  };
  const handleArchive = () => {
    setArchiveModal((prev) => !prev);
  };
  const enableUser = async () => {
    setloading(true);
    const payload = {
      user_id: data?.reported_user?._id,
      status: "active"
    };
    const req = await updateUserStatusApi(payload);
    if (req?.status === 200) {
      message.success("Successfully Updated");
      setActivateUser("active");
    } else {
      errorMessage(req);
    }
    setloading(false);
  };
  const changeStatus = () => {
    setActivateUser("inactive");
  };

  const handleConfirm = () => {
    setIsModalOpen(true);
    handleArchive();
  };
  const modalName = "archive";

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (e) => {
    setSelectedValue(e[e.length - 1]);
  };
  const ArchiveContent = async () => {
    setModalLoading(true);
    const payload = {
      content_id: data?.reported_content._id,
      status: data?.reported_content?.is_archive ? false : true,
      reason: selectedValue == "other" ? otherReason : selectedValue,
      byAdmin: true
    };
    const res = await archiveContentAPI(payload);
    if (res.status === 200) {
      data.reported_content.is_archive = !data?.reported_content?.is_archive;
    } else {
      errorMessage(res);
    }
    setModalLoading(false);
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <div className="report-heading">
        Report Type : {data?.type === 4 ? "Copyright Infringement" : data?.reason}
      </div>
      <div className="report-info">
        <div>
          Reported By : <span>{data?.reported_by_user?.user_name}</span>
        </div>
        <div>
          Date : <span>{moment(data?.updatedAt).format("DD-MMM-YY")}</span>
        </div>
        <div>
          Time : <span>{moment(data?.updatedAt).format("hh:mm a")}</span>
        </div>
        <div>
          Report Category : <span>{reportTypeMap[data?.type]}</span>{" "}
          <span>
            [
            {data?.reported_content?.type
              ? data.reported_content.type.charAt(0).toUpperCase() +
                data.reported_content.type.slice(1)
              : ""}
            ]
          </span>
        </div>
        <div>
          Reported User : <span>{data?.reported_user?.full_name}</span>
        </div>
        <div>
          Username : <span>{data?.reported_user?.user_name}</span>
        </div>
        <div>
          Reported User Email : <span>{data?.reported_user?.email}</span>
        </div>
      </div>
      <div className="under-review">
        <div>
          Under review :{" "}
          <span style={{ color: theme.greyText }}>
            {data?.type == 2
              ? data?.reported_comment?.comment
              : data?.type == 4
                ? data?.reported_content?.title
                : data?.type == 5
                  ? data?.reported_content?.title
                  : data?.reported_user?.user_name}
          </span>{" "}
        </div>
        <div className="buttons">
          <Button
            text={ActivateUser == "inactive" ? "Enable user" : "Disable user"}
            bg={theme.primaryColor}
            width="100px"
            loading={loading}
            onClick={ActivateUser == "inactive" ? enableUser : handleOnChange}
          />

          {data?.type == 4 && (
            <Button
              text={!data?.reported_content?.is_archive ? "Archive Content" : "Unarchive Content"}
              bg={theme.primaryColor}
              width="100px"
              loading={modalLoading}
              onClick={!data?.reported_content?.is_archive ? handleArchive : ArchiveContent}
            />
          )}
          {data?.type == 5 && (
            <Button
              text={!data?.reported_content?.is_archive ? "Archive Content" : "Unarchive Content"}
              bg={theme.primaryColor}
              width="100px"
              loading={modalLoading}
              onClick={!data?.reported_content?.is_archive ? handleArchive : ArchiveContent}
            />
          )}
        </div>
      </div>
      <HorizontalLine borderColor={theme.greyText} />
      <ReportModal
        openModal={openModal}
        handleOnChange={handleOnChange}
        userInfoId={data?.reported_user?._id}
        changeStatus={changeStatus}
      />
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <ModalWrapper>
          <div className="title">Please select from one of the reasons below.</div>
          <Checkbox.Group
            style={{
              width: "100%"
            }}
            value={selectedValue}
            onChange={onChange}>
            {issuesArray?.map((e, index) => (
              <div key={index} className="checkbox">
                <Checkbox key={index} value={e.value}>
                  <p style={{ color: theme.black }}> {e.label}</p>
                </Checkbox>
              </div>
            ))}

            <InputComponent
              type="textarea"
              disabled={selectedValue === "Other" ? false : true}
              bg={theme.fieldBg}
              color={theme.black}
              rowColumn={5}
              onChange={(e) => setOtherReason(e.target.value)}
            />
            <div className="buttons">
              <ButtonComponent
                text={`Archive`}
                bg={theme.primaryColor}
                onClick={() => ArchiveContent()}
                loading={modalLoading}
              />
              <ButtonComponent
                text="Cancel"
                bg={theme.black}
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </Checkbox.Group>
        </ModalWrapper>
      </Modal>
      {ArchiveModal && (
        <ModalComponent openModal={ArchiveModal} setOpenModal={handleArchive}>
          <ConfirmModal
            handleCancel={handleArchive}
            handleConfirm={handleConfirm}
            icon={modalIcons[modalName]}
            confirmButtonText="Confirm"
            subheading={modalSubheading[modalName]}
          />
        </ModalComponent>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .report-heading {
    font-size: 18px;
    padding: 20px 0;
  }

  .report-info {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 20px;
    font-size: 15px;
    span {
      color: ${theme.greyText};
    }
  }
  .under-review {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    font-size: 18px;
    align-items: center;
  }
  .buttons {
    display: flex;
    gap: 10px;
  }
`;
