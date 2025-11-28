import { useEffect, useRef, useState } from "react";
import { Col, Form, message, Row } from "antd";
import { useLocation } from "react-router-dom";
import ContentUpload from "@components/ContentUpload";
import FileUpload from "@components/FileUpload";
import SRTFileUpload from "@components/SRTFileUpload";
import InputComponent from "@components/Input";
import SelectComponent from "@components/Select";
import ButtonComponent from "@components/Button";
import BackButton from "@features/common/components/BackButton";
import { videoFieldList } from "../utils/data";
import { theme } from "@utils/theme";
import { languageOptions } from "@utils/constant";
import { useVideoForm, useGetCreatorList } from "../hooks";

function UploadVideo() {
  const formRef = useRef();
  const { uploadContent } = useLocation()?.state || {};
  const [fields, setFields] = useState([
    { language: null, subtitle_file: null }
  ]);
  const [userList, onFinish, uploadLoader] = useVideoForm(uploadContent, fields);
  const [formatType, setformatType] = useState(null);
  const [creatorID, setcreatorID] = useState();
  const [creatorList, searchLoading, handleGetCreator] = useGetCreatorList();
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
  }, [creatorID, userList, creatorList]);

  return (
    <div className="scroll-without-header px-5 py-4">
      <Form
        name="basic"
        onFinish={onFinish}
        ref={formRef}
        initialValues={{
          upload: uploadContent?.content_url,
          uploadTrailer: uploadContent?.trailer,
          ...uploadContent
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <BackButton />
          <div className="text-lg font-semibold text-white">Upload Content</div>
        </div>

        <Row gutter={20}>
          {videoFieldList.map((list) => (
            <Col xs={list.xs} md={list.md} key={list?.name}>
              {!(formatType === "audio" && list.placeholder === "Upload Trailer") && (
                <>
                  {list.component === "subtitle-select" && list.name === "subtitles" ? (
                    <div style={{ marginBottom: "18px" }}>
                      {fields.map((field, index) => (
                        <div className="w-full py-2.5" key={index}>
                          <SelectComponent
                            style={{ width: "100%" }}
                            placeholder="Add Subtitle(optional)"
                            options={languageOptions}
                            value={field.language}
                            onChange={(value) => handleLanguageChange(index, value)}
                            bg={theme.formField || "#2a2a2a"}
                            textColor="white"
                            optionsBg={theme.screenBackground}
                            border="transparent"
                          />
                          <SRTFileUpload
                            bg={theme.formField || "#2a2a2a"}
                            onChange={(file) => {
                              handleFileChange(index, file);
                            }}
                            placeholder="Upload subtitle file"
                            name={`fileName_${index}`}
                            value={fields[index].file}
                          />
                        </div>
                      ))}
                      <div
                        className="flex justify-end w-full cursor-pointer text-[15px]"
                        style={{ color: theme.primaryColor }}
                        onClick={handleAddMore}
                      >
                        + Add More
                      </div>
                    </div>
                  ) : (
                    <Form.Item name={list.name} style={{ marginBottom: "18px" }} rules={list?.rule ?? []}>
                      {list.component === "upload-content" && (
                        <ContentUpload
                          placeholder={list?.placeholder}
                          bg={theme.formField || "#2a2a2a"}
                          size={list?.size}
                          name={list?.name}
                        />
                      )}
                      {list.component === "upload-cover" && (
                        <FileUpload
                          placeholder={list?.placeholder}
                          name={list?.name}
                          aspectRatio={list?.aspectRatio}
                          bg={theme.formField || "#2a2a2a"}
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
                      {list.component === "select" && (
                        <SelectComponent
                          onChange={(e) => onChange(e, list?.name)}
                          placeholder={list?.placeholder}
                          multiple={list?.name === "cast"}
                          options={optionsList[list?.name] ?? list?.options}
                          filterOption={filterOption}
                          showSearch={list?.name === "creator"}
                          loading={list?.name === "creator" ? searchLoading : false}
                          style={{ height: "45px" }}
                          bg={theme.formField || "#2a2a2a"}
                          textColor="white"
                          optionsBg={theme.screenBackground}
                          border="transparent"
                          handleSearch={list?.name === "creator" && handleGetCreator ? handleGetCreator : null}
                        />
                      )}
                    </Form.Item>
                  )}
                </>
              )}
            </Col>
          ))}
        </Row>
        <div className="flex justify-end items-center mt-8">
          <ButtonComponent
            type="primary"
            htmlType="submit"
            width="120px"
            text="Next"
            bg={theme.primaryColor}
            loading={uploadLoader}
          />
        </div>
      </Form>
    </div>
  );
}

export default UploadVideo;
