import { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "antd";
import moment from "moment";
import BackButton from "@features/common/components/BackButton";
import { errorMessage } from "@utils/commonSection";
import { eventList } from "../utils/eventData";
import InputComponent from "@components/Input";
import { theme } from "@utils/theme";
import SelectComponent from "@components/Select";
import ContentUpload from "@components/ContentUpload";
import FileUpload from "@components/FileUpload";
import ButtonComponent from "@components/Button";
import DateSelector from "@components/DateSelector";
import TimePickerComponent from "@components/TimePicker";
import { useEventForm, useGetCreatorList } from "../hooks";

function UploadEventForm() {
  const formRef = useRef(null);
  const [form] = Form.useForm();
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
  }, [creatorID, userList, creatorList]);
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
    <div className="px-5 py-4">
      <Form onFinish={handleFinish} ref={formRef} form={form}>
        <div className="flex items-center gap-2.5 mb-6 text-lg font-semibold">
          <BackButton />
          <div>Schedule Event</div>
        </div>
        <Row gutter={20}>
          {eventList?.map((list) => {
            if (list.name === "region" && formatType !== 1) {
              return null;
            }

            return (
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
                        bg="#2a2a2a"
                        border="transparent"
                      />
                    )}
                    {list.component === "select" && (
                      <SelectComponent
                        key={userRegion}
                        onChange={(e) => onChange(e, list?.name)}
                        placeholder={list?.placeholder}
                        multiple={list?.multiple ?? false}
                        options={optionsList[list?.name] ?? list?.options}
                        style={{ height: "45px" }}
                        value={list?.name == "region" ? userRegion : null}
                        disabled={list?.name == "region" && userRegion != null}
                        loading={list?.name === "creator" ? searchLoading : false}
                        bg={theme.formField || "#2a2a2a"}
                        textColor="white"
                        optionsBg={theme.screenBackground}
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

                    {list.component === "coverArt" && (
                      <FileUpload
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
            );
          })}
        </Row>
        <div className="mt-5 text-right">
          <ButtonComponent
            type="primary"
            htmlType="submit"
            width="120px"
            text="Submit"
            bg={theme.primaryColor}
            br="8px"
            loading={eventLoader}
          />
        </div>
      </Form>
    </div>
  );
}

export default UploadEventForm;
