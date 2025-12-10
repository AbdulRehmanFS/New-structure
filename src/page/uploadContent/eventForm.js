import { Col, Form, Row } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { eventList } from "./data";
import InputComponent from "component/fields/input-field";
import { theme } from "util/theme";
import Select from "component/fields/select";
import ContentUpload from "component/fields/uploadContent";
import CustomizeFileUpload from "component/fields/fileUpload";
import Button from "component/fields/button";
import { DateSelector } from "component/index";
import TimePickerComponent from "component/timePicker";
import BackButton, { errorMessage } from "util/commonSection";
import { useEventForm, useGetCreatorList } from "hooks/uploadContent";
import moment from "moment";
import { useForm } from "antd/es/form/Form";

function ScheduleEventForm() {
  const formRef = React.useRef(null);
  const [form] = useForm();
  const [formatType, setformatType] = useState(1);
  const [selectedDate, setSelectedDate] = useState();
  const [creatorList, searchLoading] = useGetCreatorList();
  const [creatorID, setcreatorID] = useState();
  const [userRegion, setUserRegion] = useState(null);
  const [userList, handleFinish, eventLoader] = useEventForm(formRef, userRegion);
  const [optionsList, setOptionsList] = useState({
    cast: userList,
    creator: creatorList
  });


  const onChange = (values, name) => {
    if (values === 2) setformatType(values);
    else if (values === 1) setformatType(1);
    if (name == "creator") {
      const creatorRegion = creatorList?.find((e) => e?.value === values);
      setUserRegion(creatorRegion?.region);
      if (creatorRegion?.region) {
        setUserRegion(creatorRegion.region);
        form.setFieldsValue({ region: creatorRegion.region });
      } else {
        setUserRegion(null);
        form.resetFields(["region"]);
      }
      setcreatorID(values);

    }
  };
  useEffect(() => {
    if (creatorID) {
      const filterCast = userList?.filter((e) => e?._id !== creatorID);
      setOptionsList((prev) => ({ ...prev, cast: filterCast }));
    } else {
      setOptionsList({
        cast: userList,
        creator: creatorList
      });
    }
  }, [creatorID,userList,creatorList]);
  const timeonChange = (e, name) => {
    if (selectedDate === undefined) {
      errorMessage("Select Schedule Date");
      form.resetFields(["start_time"]);
      form.resetFields(["end_time"]);
    } else {
      const currentTimeStamp = moment().unix();

      const selectedTimeStamp = moment(`${selectedDate} ${e}`, "yyyy/MM/DD hh:mm a").unix();
      if (selectedTimeStamp < currentTimeStamp && name == 1) {
        form.resetFields(["start_time"]);
        errorMessage("Time must be greater than the current time!");
      }
      const starteventtime = moment(
        `${selectedDate} ${form.getFieldValue("start_time")}`,
        "yyyy/MM/DD hh:mm a"
      ).unix();
      if (selectedTimeStamp < starteventtime && name == 2) {
        form.resetFields(["end_time"]);
        errorMessage("Time must be greater than the Start time!");
      }
    }
  };

  const today = moment().format("YYYY-MM-DD");

  return (
    <ScheduleEventWrapper onFinish={handleFinish} ref={formRef} form={form}>
      <div className="header">
        <BackButton />
        <div>Schedule Event</div>
      </div>
      <Row gutter={20}>
        {eventList?.map((list) => {
          if (list.name === "region" && formatType !== 1) {
            return null; // Do not render region field when formatType is not 1
          }

          return (
            <>
              <Col xs={list.xs} md={list.md} key={list?.name}>
                {!(
                  formatType === 1 &&
                  list.placeholder === "Upload Content Here" &&
                  list.component === "upload-content"
                ) && (
                  <Form.Item name={list?.name} rules={list?.rule ?? []}>
                    {list.component === "input" && (
                      <InputComponent
                        type={list?.type}
                        placeholder={list?.placeholder}
                        style={{
                          height: "45px"
                        }}
                        bg={theme.formField}
                        border="transparent"
                        numericOnly={list.name == "ticket_amount"}
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
                        bg="#2a2a2a" // {theme.formField}
                        border="transparent"
                      />
                    )}
                    {list.component === "select" && (
                      <Select
                        key={userRegion}
                        onChange={(e) => onChange(e, list?.name)}
                        placeholder={list?.placeholder}
                        multiple={list?.multiple ?? false}
                        options={optionsList[list?.name] ?? list?.options}
                        style={{ height: "45px" }}
                        value={list?.name == "region" ? userRegion : null}
                        disabled={list?.name == "region" && userRegion != null}
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
                      />
                    )}
                    {list.component === "date-picker" && (
                      <DateSelector
                        placeholder={list?.placeholder}
                        width="100%"
                        height="45px"
                        bg={theme.formField}
                        border="transparent"
                        onChange={(e) => setSelectedDate(e)}
                        mindate={today}
                      />
                    )}
                    {list.component === "time-picker" &&
                      !(list.name == "end_time" && formatType == 2) && (
                        <TimePickerComponent
                          placeholder={list?.placeholder}
                          bg={theme.formField}
                          border="transparent"
                          onChange={(e) => timeonChange(e, list.name == "start_time" ? 1 : 2)}
                        />
                      )}
                  </Form.Item>
                )}
              </Col>
            </>
          );
        })}
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
