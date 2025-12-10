
import { Col, Form, Row } from "antd";
import styled from "styled-components";
import { editEventList } from "./data";
import InputComponent from "component/fields/input-field";
import { theme } from "util/theme";
import Select from "component/fields/select";
import ContentUpload from "component/fields/uploadContent";
import CustomizeFileUpload from "component/fields/fileUpload";
import Button from "component/fields/button";
import { DateSelector } from "component/index";
import TimePickerComponent from "component/timePicker";
import BackButton from "util/commonSection";
import { useEditEventForm } from "hooks/uploadContent";

function ScheduleEventForm() {
  const { filterOption, optList, formRef, eventLoader, handleFinish,searchLoading,init } = useEditEventForm();

  return (
    <ScheduleEventWrapper initialValues={{ ...init }} onFinish={handleFinish} ref={formRef}>
      <div className="header">
        <BackButton />
        <div>Edit Event</div>
      </div>
      <Row gutter={20}>
        {editEventList?.map((list) => (
          <Col xs={list.xs} md={list.md} key={list?.name}>
            <Form.Item name={list?.name} rules={list?.rule ?? []}>
              {list.component === "input" && (
                <InputComponent
                  type={list?.type}
                  placeholder={list?.placeholder}
                  style={{
                    height: "45px"
                  }}
                  bg={theme.formField}
                  disabled={list?.disabled}
                  border="transparent"
                />
              )}
              {list.component === "textarea" && (
                <InputComponent
                  type={list?.type}
                  placeholder={list?.placeholder}
                  style={{
                    height: "45px"
                  }}
                  maxLength={600}
                  disabled={list?.disabled}
                  bg="#2a2a2a"
                  border="transparent"
                />
              )}
              {list.component === "select" && (
                <Select
                  placeholder={list?.placeholder}
                  multiple={list?.multiple ?? false}
                  options={optList[list?.name] ?? list?.options}
                  style={{ height: "45px" }}
                  disabled={list?.disabled}
                  filterOption={filterOption}
                  showSearch={list?.name === "creator"}
                  loading={list?.name === "creator" ? searchLoading : false}
                  customeStyle={{
                    bg: theme.formField,
                    textColor: "white",
                    optionsBg: theme.screenBackground,
                    border: "transparent"
                  }}
                />
              )}
              {list.component === "upload-content" && (
                <ContentUpload
                  placeholder={list?.placeholder}
                  bg={theme.formField}
                  disabled={list?.disabled}
                  size={list?.size}
                  name={list?.name}
                />
              )}
              {list.component === "coverArt" && (
                <CustomizeFileUpload
                  placeholder={list?.placeholder}
                  name={list?.name}
                  aspectRatio={list?.aspectRatio}
                  bg={theme.formField}
                  disabled={list?.disabled}
                />
              )}
              {list.component === "date-picker" && (
                <DateSelector
                  placeholder={list?.placeholder}
                  width="100%"
                  height="45px"
                  bg={theme.formField}
                  border="transparent"
                  disabled={list?.disabled}
                />
              )}
              {list.component === "time-picker" && (
                <TimePickerComponent
                  placeholder={list?.placeholder}
                  bg={theme.formField}
                  border="transparent"
                  disabled={list?.disabled}
                />
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <div className="button-container">
        <Button
          type="primary"
          htmlType="submit"
          width="120px"
          text="Submit"
          bg={theme.primaryColor}
          br="8px"
          loading={eventLoader}
        />
      </div>
    </ScheduleEventWrapper>
  );
}

export default ScheduleEventForm;

const ScheduleEventWrapper = styled(Form)`
  padding: 0 20px;
  .header {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 25px;
    gap: 5px;
  }
  .schedule-event-header {
    margin-bottom: 30px;
  }
  .button-container {
    margin-top: 20px;
    text-align: right;
  }

  .title-textarea textarea.ant-input {
    height: 43px;
    font-size: 15px !important;
  }
  .description-textarea textarea.ant-input,
  .upload-image-label,
  .cover-art-label {
    font-size: 15px !important;
  }
  .ant-select-selector {
    font-size: 15px !important;
  }
`;
