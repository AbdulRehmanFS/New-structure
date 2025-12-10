import InputComponent from "component/fields/input-field";
import { Checkbox, Modal } from "antd";
import { ModalWrapper } from "page/reports/reportModal";
import { ButtonComponent } from "component/index";
import {  rejectedContent } from "util/constant";
import { theme } from "util/theme";

const RejectReason = ({
  isModalOpen,
  handleclose,
  rejected,
  loading,
  onChange,
  otherReasonChange,
  selectedValue,
  rejectedIssue=rejectedContent,
  text
}) => {
   
  return (
    <>
      <Modal open={isModalOpen} onCancel={handleclose} footer={false}>
        <ModalWrapper>
          <div className="title">Please select from one of the reasons below.</div>
          <Checkbox.Group
            style={{
              width: "100%"
            }}
            value={selectedValue}
            onChange={onChange}>
            {rejectedIssue?.map((e, index) => (
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
              placeholder=" "
              onChange={(e) => otherReasonChange(e)}
            />
            <div className="buttons">
              <ButtonComponent
                text={text?text:"Reject Content"}
                onClick={() => rejected()}
                bg={theme.primaryColor}
                loading={loading}
              />
              <ButtonComponent text="Cancel" bg={theme.black} onClick={() => handleclose()} />
            </div>
          </Checkbox.Group>
        </ModalWrapper>
      </Modal>
    </>
  );
};

export default RejectReason;
