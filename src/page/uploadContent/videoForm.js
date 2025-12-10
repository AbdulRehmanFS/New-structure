import { Col, Form, message, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ContentUpload from "component/fields/uploadContent";
import CustomizeFileUpload from "component/fields/fileUpload";
import { videoFieldList } from "./data";
import { theme } from "util/theme";
import InputComponent from "component/fields/input-field";
import Select from "component/fields/select";
import Button from "component/fields/button";
import BackButton from "util/commonSection";
import { useGetCreatorList, useVideoForm } from "hooks/uploadContent";
import { languageOptions } from "util/constant";
import SRTFileUpload from "component/fields/srtFileupload";

function UploadContentForm() {
  const formRef = useRef();
  const { uploadContent } = useLocation()?.state || {};
  const [fields, setFields] = useState([
    { language: null, subtitle_file: null } // Initial object for the first div
  ]);
  const [userList, onFinish, uploadLoader] = useVideoForm(uploadContent, fields);
  const [formatType, setformatType] = useState(null);
  const [creatorID, setcreatorID] = useState();
  const [creatorList, searchLoading] = useGetCreatorList();
  const [optionsList, setOptionsList] = useState({
    cast: userList,
    creator: creatorList
  });

  const onChange = (value, type) => {
    if (type === "type") setformatType(value);
    if (type === "creator") setcreatorID(value);
  };
  const handleAddMore = () => {
    const isAllFieldsFilled = fields.every((field) => field.language && field.subtitle_file);
    if (!isAllFieldsFilled) {
      message.error("Please fill in all previous fields before adding more.");
      return;
    }
    // Add a new empty field
    setFields([...fields, { language: null, subtitle_file: null }]);
  };

  const handleChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;

    setFields(updatedFields);
  };

  const handleFileChange = (index, file) => {
    handleChange(index, "subtitle_file", file?.url);
  };

  const handleLanguageChange = (index, value) => {
    handleChange(index, "language", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

 
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
    <ContentForm
      name="basic"
      onFinish={onFinish}
      ref={formRef}
      initialValues={{
        upload: uploadContent?.content_url,
        uploadTrailer: uploadContent?.trailer,
        ...uploadContent
      }}>
      <div className="header">
        <BackButton />
        <div>Upload Content</div>
      </div>

      <Row gutter={20}>
        {videoFieldList.map((list) => (
          <Col xs={list.xs} md={list.md} key={list?.name}>
            {!(formatType === "audio" && list.placeholder === "Upload Trailer") && (
              <Form.Item name={list.name} style={{ marginBottom: "18px" }} rules={list?.rule ?? []}>
                {list.component === "upload-content" && (
                  <ContentUpload
                    placeholder={list?.placeholder}
                    bg={theme.formField}
                    size={list?.size}
                    name={list?.name}
                  />
                )}
                {list.component === "upload-cover" && (
                  <CustomizeFileUpload
                    placeholder={list?.placeholder}
                    name={list?.name}
                    aspectRatio={list?.aspectRatio}
                    bg={theme.formField}
                  />
                )}
                {list.component === "textarea" && (
                  <InputComponent
                    type={list?.type}
                    placeholder={list?.placeholder}
                    maxLength={list.maxLength}
                    className={list.className}
                    bg="#2a2a2a"
                    border="transparent"
                  />
                )}
                {list.component === "subtitle-select" && list.name === "subtitles" && (
                  <>
                    {fields.map((field, index) => (
                      <div style={{ width: "100%" }} className="upload-srtfile" key={index}>
                        <Select
                          style={{ width: "100%" }}
                          placeholder={"Add Subtitle(optional)"}
                          options={languageOptions}
                          value={field.language}
                          onChange={(value) => handleLanguageChange(index, value)}
                          customeStyle={{
                            bg: theme.formField,
                            textColor: "white",
                            optionsBg: theme.screenBackground,
                            border: "transparent"
                          }}
                        />

                        <SRTFileUpload
                          bg={theme.formField}
                          onChange={(file) => {
                            handleFileChange(index, file);
                          }}
                          placeholder="Upload subtitle file"
                          name={`fileName_${index}`}
                          index={index}
                          value={fields[index].file}
                        />
                      </div>
                    ))}

                    <div className="add-more" onClick={() => handleAddMore()}>
                      + Add More
                    </div>
                  </>
                )}
                {list.component === "select" && (
                  <Select
                    onChange={(e) => onChange(e, list?.name)}
                    placeholder={list?.placeholder}
                    multiple={list?.name === "cast"}
                    options={optionsList[list?.name] ?? list?.options}
                    filterOption={filterOption}
                    showSearch={list?.name === "creator"}
                    loading={list?.name === "creator" ? searchLoading : false}
                    style={{ height: "45px" }}
                    customeStyle={{
                      bg: theme.formField,
                      textColor: "white",
                      optionsBg: theme.screenBackground,
                      border: "transparent"
                    }}
                  />
                )}
              </Form.Item>
            )}
          </Col>
        ))}
      </Row>
      <div className="button-wrapper">
        <Button
          type="primary"
          htmlType="submit"
          width="120px"
          text="Next"
          bg={theme.primaryColor}
          loading={uploadLoader}
        />
      </div>
    </ContentForm>
  );
}

export default UploadContentForm;

const ContentForm = styled(Form)`
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    align-item: center;
    margin-top: 30px;
  }
  .header {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 25px;
    gap: 5px;
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
  .upload-srtfile {
    padding: 10px 0;
  }
  .add-more {
    display: flex;
    justify-content: end;
    width: 100%;
    cursor: pointer;
    color: ${theme.primaryColor};
  }
`;
