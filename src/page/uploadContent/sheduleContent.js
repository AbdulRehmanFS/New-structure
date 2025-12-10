import React, { useEffect, useState } from "react";
import { Avatar, Col, Form, Row } from "antd";
import styled from "styled-components";
import BackButton, { errorMessage } from "util/commonSection";
import { scheduleContentList } from "./data";
import InputComponent from "component/fields/input-field";
import ContentUpload from "component/fields/uploadContent";
import Select from "component/fields/select";
import CustomizeFileUpload from "component/fields/fileUpload";
import TimePickerComponent from "component/timePicker";
import Button from "component/fields/button";
import { ButtonComponent, DateSelector, ModalComponent } from "component/index";
import { theme } from "util/theme";
import { useGetCreatorList, useScheduleContent } from "hooks/uploadContent";
import { days, frequencyOptions } from "util/constant";
import { CalenderIcon } from "util/svgFile";
import moment from "moment";
import { useForm } from "antd/es/form/Form";

function Shedulecontent() {
  const formRef = React.useRef(null);
  const [form] = useForm();
  const [formatType, setformatType] = useState(1);
  const [clickedDays, setClickedDays] = useState([]);
  const [showEndDate, setshowEndDate] = useState(false);
  const [showendTime, setShowEndTime] = useState(false);
  const [endDate, setendDate] = useState(null);
  const [creatorList, searchLoading] = useGetCreatorList();
  const [userRegion, setUserRegion] = useState(null);
  const [frequency, setfrequency] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [userList, loading, handleFinish] = useScheduleContent(
    formRef,
    endDate,
    clickedDays,
    frequency,
    userRegion
  );
  const [creatorID, setcreatorID] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [optionsList, setOptionsList] = useState({
    cast: userList,
    creator: creatorList
  });

  const handleAvatarClick = (value) => {
    if (clickedDays.includes(value)) {
      const newArray = clickedDays.filter((e) => e !== value);
      setClickedDays(newArray.sort((a, b) => a - b));
    } else {
      const newArray = [...clickedDays, value];
      setClickedDays(newArray.sort((a, b) => a - b));
    }
  };
  const handleConfirm = () => {
    if (frequency === undefined) {
      errorMessage("Select Repeat Frequency");
    } else if (frequency > 1 && endDate === null) {
      errorMessage("Select End Date");
    } else {
      setOpenModal(false);
      form.setFieldValue("frequency", `${frequencyOptions[frequency - 1].label} (${fullName})`);
    }
  };
  const selectClick = () => {
    if (form.getFieldValue("scheduled_date") === undefined) {
      errorMessage(" Please Select Date");
    } else {
      setOpenModal(true);
      if (!clickedDays.includes(moment(selectedDate).day())) {
        clickedDays.push(moment(selectedDate).day());
      } 
    }
  };

  const frequencyonChange = (e) => {
    setfrequency(e);
    if (e == 1) {
      setshowEndDate(false);
      setClickedDays([moment(selectedDate).day()]);
    } else if (e == 2) {
      setClickedDays([0, 1, 2, 3, 4, 5, 6]);
      setshowEndDate(true);
    } else {
      setshowEndDate(true);
      setClickedDays([moment(selectedDate).day()]);
    }
  };
  const onChange = (e, name) => {
  
    if (e == 2 && name === "live_type") {
      setformatType(e), setShowEndTime(false);
    }

    if (name === "live_type") {
      if (e === 1) {
        setShowEndTime(true);
        setformatType(1);
        // Show end time when e is 1
      }
      if (e === 4) {
        setShowEndTime(false);
        setformatType(1);
      }
    }
    if (name == "creator") {
      setcreatorID(e);
      const creatorRegion = creatorList?.find((x) => x?.value === e);
      setUserRegion(creatorRegion?.region);

      if (creatorRegion?.region) {
        setUserRegion(creatorRegion.region);
        form.setFieldsValue({ region: creatorRegion.region });
      } else {
        setUserRegion(null);
        form.resetFields(["region"]);
      }
    }
  };
  const cancelModal = () => {
    setOpenModal(false);
    form.resetFields(["frequency"]);
  };
  const fullName = clickedDays.map((e) => days[e].label);

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
 
  return (
    <ScheduleEventWrapper onFinish={handleFinish} ref={formRef} form={form}>
      <ModalComponent openModal={openModal} setOpenModal={cancelModal}>
        <ModalWrapper>
          <p>Repeat</p>
          <div className="start-date">
            <p>Start</p>
            <div className="selected-date">
              <p>{selectedDate} </p>
              <CalenderIcon color={theme.lightGreyText} />
            </div>
          </div>

          <div className="days-box">
            <div className="repeat">
              Repeat <Select options={frequencyOptions} onChange={frequencyonChange} />{" "}
            </div>
            <div className="days">
              {days.map((e) => (
                <Avatar
                  size={40}
                  key={e.value}
                  style={{
                    backgroundColor: clickedDays?.includes(e.value) ? theme.primaryColor : "grey",
                    cursor: "pointer"
                  }}
                  onClick={() => handleAvatarClick(e.value)}>
                  {e.label.charAt(0)}
                </Avatar>
              ))}
            </div>
            {fullName.length > 0 && (
              <div className="totaldays">
                <div className="daysname">
                  {fullName.map((e, i) => (
                    <>
                      {i == 0 && "Occur every "} {e}
                      {i < fullName.length - 1 ? "," : " unitl"}
                    </>
                  ))}
                </div>
              </div>
            )}
            {showEndDate && (
              <DateSelector
                width="150px"
                height="45px"
                bg={theme.modalgrey}
                border="transparent"
                onChange={(e) => setendDate(e)}
                mindate={selectedDate}
              />
            )}
          </div>

          <div>
            <div className="button-component">
              <ButtonComponent width="110px" text="Save" onClick={handleConfirm} bg={theme.red} />
              <ButtonComponent text="Cancel" onClick={cancelModal} width="110px" />
            </div>
          </div>
        </ModalWrapper>
      </ModalComponent>
      <div className="header">
        <BackButton />
        <div>Upload Content</div>
      </div>
      <Row gutter={20}>
        {scheduleContentList?.map((list) => (
          <Col xs={list.xs} md={list.md} key={list?.name}>
            {!(
              formatType === 1 &&
              list.placeholder === "Upload Content Here" &&
              list.component === "upload-content"
            )&&
            !(list.name === "region" && !showendTime) &&
              !(formatType === 2 && list.name === "frequency") && (
                <Form.Item name={list?.name} rules={list?.rule ?? []}>
                  {list.component === "input" && (
                    <InputComponent
                      type={list?.type}
                      placeholder={list?.placeholder}
                      style={{
                        height: "45px"
                      }}
                      onClick={(e) => list?.name === "frequency" && selectClick(e)}
                      bg="#2a2a2a"
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
                      bg="#2a2a2a"
                      border="transparent"
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
                  {list.component === "select" &&
                     // Conditionally render the region field
                      <Select
                        key={userRegion}
                        bg={theme.backgroundGray}
                        multiple={list?.multiple ?? false}
                        placeholder={list?.placeholder}
                        disabled={list?.name === "region" && userRegion != null}
                        options={optionsList[list?.name] ?? list?.options}
                        onChange={(e) => onChange(e, list.name)}
                        value={list?.name === "region" ? userRegion : null}
                        loading={list?.name === "creator" ? searchLoading : false}
                        style={{ height: "45px" }}
                        customeStyle={{
                          bg: theme.formField,
                          textColor: "white",
                          optionsBg: theme.screenBackground,
                          border: "transparent"
                        }}
                      />
                    }

                  {list.component === "thumbnail" && (
                    <CustomizeFileUpload
                      placeholder={list?.placeholder}
                      name={list?.name}
                      bg={theme.formField}
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
                      width="100%"
                      height="45px"
                      placeholder={list?.placeholder}
                      bg={theme.formField}
                      border="transparent"
                      mindate={today}
                      onChange={(e) => setSelectedDate(e)}
                    />
                  )}
                  {list.component === "time-picker" &&
                    (list.name !== "end_time" || showendTime) && (
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
        ))}
      </Row>

      <div className="button-container">
        <Button
          htmlType="submit"
          width="120px"
          text="Schedule Content"
          bg={theme.primaryColor}
          loading={loading}
          br="8px"
        />
      </div>
    </ScheduleEventWrapper>
  );
}
export default Shedulecontent;

const ScheduleEventWrapper = styled(Form)`
  padding: 0 20px;
  .header {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 25px;
    gap: 5px;
  }
  .button-container {
    margin-top: 20px;
    text-align: right;
  }

  .title-textarea textarea.ant-input {
    height: 43px;
    font-size: 15px !important;
  }
  .upload-image-label,
  .cover-art-label {
    font-size: 15px !important;
  }
  .ant-select-selector {
    font-size: 15px !important;
  }
`;

const ModalWrapper = styled.div`
  background: ${theme.modalgrey};
  padding: 20px;

  border-radius: 10px;
  font-size: 15px;

  .repeat {
    padding: 10px 0px;
  }
  .start-date {
    display: flex;
    align-items: center;
    font-size: 16px;
    gap: 10px;
  }
  .days-box {
    padding: 0px 40px;
  }
  .selected-date {
    border-bottom: 1px solid ${theme.lightGreyText};
    font-size: 14px;
    display: flex;
    gap: 15px;
  }
  .totaldays {
    display: flex;
    padding: 10px 0px;
    font-size: 14px;
    color: ${theme.lightGreyText};
  }

  .days {
    display: flex;
    gap: 5px;
  }
  .daysname {
    display: flex;
    width: 300px;
  }
  .button-component {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 15px 0px;
  }
`;
