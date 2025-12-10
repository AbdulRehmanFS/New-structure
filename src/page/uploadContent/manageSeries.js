import React, { useState } from "react";
import { Col, Form, Row } from "antd";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import InputComponent from "component/fields/input-field";
import { theme } from "util/theme";
import { seriesList } from "./data";
import ContentUpload from "component/fields/uploadContent";
import CustomizeFileUpload from "component/fields/fileUpload";
import Select from "component/fields/select";
import BackButton from "util/commonSection";
import Button from "component/fields/button";
import { CrossIcon, RightDArrowIcon } from "util/svgFile";
import { useManageSeries } from "hooks/uploadContent";
import SRTFileUpload from "component/fields/srtFileupload";
import Message from "component/messages";
import { languageOptions } from "util/constant";

function ManageSeries() {
  const formRef = React.useRef(null);
  const location = useLocation();
  const [fields, setFields] = useState([
    { language: null, subtitle_file: null } // Initial object for the first div
  ]);
  const idData = location.state;
  const [
    userList,
    episodeData,
    onFinish,
    seriesLoading,
    filterOption,
    handleNextButton,
    handleDelete
  ] = useManageSeries(formRef, idData,fields);

  const optList = {
    cast: userList
  };
  const handleAddMore = () => {
    const isAllFieldsFilled = fields.every((field) => field.language && field.subtitle_file);
    if (!isAllFieldsFilled) {
      Message.error("Please fill in all previous fields before adding more.");
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
  return (
    <ContentForm name="basic" onFinish={onFinish} ref={formRef} autoComplete="off">
      <div className="header">
        <BackButton />
        <div>Episode Upload</div>
      </div>
      <Row gutter={20}>
        {episodeData.length > 0 && (
          <div className="preview">
            <div className="title">
              <p>Episode Sequence</p>
              <p>({episodeData.length})Episodes</p>
            </div>
            <div className="select-episode">
              {episodeData.map((list, index) => (
                <div className="img-section" key={list?.cover_art?.key_name}>
                  <img src={list?.thumbnail} alt="img" className="img-wrapper" />
                  <div
                    className="cross-icon"
                    aria-hidden="true"
                    onClick={() => {
                      handleDelete(index);
                    }}>
                    <CrossIcon height={20} width={20} color="red" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {seriesList.map((list, index) => (
          <Col xs={list.xs} md={list.md} key={list?.name}>
            <Form.Item name={list.name} style={{ marginBottom: "18px" }} rules={list?.rule ?? []}>
              {list.component === "input" && (
                <InputComponent
                  type={list?.type}
                  placeholder={list?.placeholder}
                  style={{
                    height: "45px"
                  }}
                  
                  bg={theme.formField}
                  border="transparent"
                />
              )}
              {list.component === "upload-content" && (
                <ContentUpload
                  placeholder={list?.placeholder}
                  size={list?.size}
                  name={list?.name}
                  bg={theme.formField}
                  
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
                  maxLength={list.maxLength || 200}
                  bg="#2a2a2a"
                  className={list.className}
                  border="transparent"
                />
              )}
               {index == 3 && (
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
                  bg={theme.formField}
                  placeholder={list?.placeholder}
                  options={optList[list?.name] ?? list?.options}
                  style={{ height: "45px" }}
                  filterOption={filterOption}
                  multiple={list?.name === "cast"}
                />
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <div className="manage-series">
        <button type="submit">
          Next Episode Details <RightDArrowIcon />
        </button>
      </div>
      <div className="button-wrapper">
        <Button
          type="button"
          width="120px"
          text="Post"
          onClick={handleNextButton}
          bg={theme.primaryColor}
          loading={seriesLoading}
        />
      </div>
    </ContentForm>
  );
}

export default ManageSeries;

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
  .manage-series {
    display: flex;
    justify-content: end;
    cursor: pointer;
    padding: 10px;
    align-items: center;
    gap: 5px;
    button {
      background: #131313;
      display: flex;
      gap: 10px;
      border: 1px solid #131313;
      cursor: pointer;
    }
  }
  .preview {
    width: 100%;
    padding: 20px;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0px;
  }
  .select-episode {
    display: flex;
    gap: 20px;
  }

  .img-wrapper {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
  .img-section {
    position: relative;
    width: 100px;
    height: 100px;
  }
  .cross-icon {
    position: absolute;
    bottom: 0%;
    right: 0%;
    cursor: pointer;
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
