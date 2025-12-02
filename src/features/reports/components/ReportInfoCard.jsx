import { useState } from "react";
import moment from "moment";
import { HorizontalLine } from "@features/dashboard/utils/style.jsx";
import { theme } from "@utils/theme";
import ReportModal from "./ReportModal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import { issuesArray, modalIcons, modalSubheading } from "@utils/constant";
import { archiveContentAPI } from "@services/api/archive";
import { errorMessage } from "@utils/commonSection";
import { Checkbox, message, Modal } from "antd";
import { updateUserStatusApi } from "@features/userManagement/services/userManagement.api";
import InputComponent from "@components/Input";
import ButtonComponent from "@components/Button";
import ModalComponent from "@features/common/components/Modal";
import Button from "@components/fields/Button";

export default function ReportInfoCard({ data }) {
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
      reason: selectedValue == "Other" ? otherReason : selectedValue,
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
    <div>
      <div className="text-lg py-5">
        Report Type : {data?.type === 4 ? "Copyright Infringement" : data?.reason}
      </div>
      <div className="grid grid-cols-4 gap-y-5 text-[15px] [&_span]:text-grey-text">
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
      <div className="flex justify-between py-5 text-lg items-center">
        <div>
          Under review :{" "}
          <span className="text-grey-text">
            {data?.type == 2
              ? data?.reported_comment?.comment
              : data?.type == 4
                ? data?.reported_content?.title
                : data?.type == 5
                  ? data?.reported_content?.title
                  : data?.reported_user?.user_name}
          </span>{" "}
        </div>
        <div className="flex gap-2.5">
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
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false} width="auto" centered style={{ maxWidth: "90vw" }}>
        <div className="p-2.5 max-w-[520px] w-full md:p-[15px] sm:p-2.5 [480px]:p-2">
          <div className="text-primary text-lg font-semibold md:text-lg sm:text-base [480px]:text-sm">Please select from one of the reasons below.</div>
          <Checkbox.Group
            style={{
              width: "100%"
            }}
            value={selectedValue}
            onChange={onChange}>
            {issuesArray?.map((e, index) => (
              <div key={index} className="py-[5px] px-5 w-full sm:py-[5px] sm:px-2.5">
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
              onChange={(value) => setOtherReason(value)}
            />
            <div className="flex flex-col pt-5 gap-2.5 sm:flex-col">
              <ButtonComponent
                text={`Archive`}
                bg={theme.primaryColor}
                onClick={() => ArchiveContent()}
                loading={modalLoading}
                width="100%"
                className="sm:w-auto"
              />
              <ButtonComponent
                text="Cancel"
                bg={theme.black}
                onClick={() => setIsModalOpen(false)}
                width="100%"
                className="sm:w-auto"
              />
            </div>
          </Checkbox.Group>
        </div>
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
    </div>
  );
}

