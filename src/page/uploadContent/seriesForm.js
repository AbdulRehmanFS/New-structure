import { useRef, useState } from "react";
import styled from "styled-components";
import { Col, Form, Row } from "antd";
import BackButton from "util/commonSection";
import InputComponent from "component/fields/input-field";
import ContentUpload from "component/fields/uploadContent";
import CustomizeFileUpload from "component/fields/fileUpload";
import Select from "component/fields/select";
import { theme } from "util/theme";
import { fieldList } from "./data";
import Button from "component/fields/button";
import { useGetCreatorList, useSeriesFormSubmit } from "hooks/uploadContent";

function SeriesUpload() {
  const formRef = useRef();
  const [creatorList, searchLoading] = useGetCreatorList();
  const [onFinish, saveLoading] = useSeriesFormSubmit();
  const [formatType, setformatType] = useState(null);
  const optList = {
    creator: creatorList
  };


  const onChange = (value,e) => {
    if(value==="format"){
      setformatType(e);
    }  
  };
  return (
    <ContentForm name="basic" onFinish={onFinish} ref={formRef} initialValues={{}}>
      <div className="header">
        <BackButton />
        <div>Series Upload</div>
      </div>
      <Row gutter={20}>
        {fieldList.map((list) => (
          <Col xs={list.xs} md={list.md} key={list?.name}>
            {!(formatType === "audio" && list.placeholder === "Upload Trailer") && (
              <Form.Item name={list.name} style={{ marginBottom: "18px" }} rules={list?.rule ?? []}>
                {list.component === "input" && (
                  <InputComponent
                    type={list?.type}
                    placeholder={list?.placeholder}
                    style={{
                      height: "45px"
                    }}
                    bg={theme.greyButton}
                    border="transparent"
                  />
                )}
                {list.component === "upload-content" && (
                  <ContentUpload
                    placeholder={list?.placeholder}
                    size={list?.size}
                    name={list?.name}
                  />
                )}
                {list.component === "upload-cover" && (
                  <CustomizeFileUpload
                    placeholder={list?.placeholder}
                    name={list?.name}
                    aspectRatio={list?.aspectRatio}
                    bg={theme.grey2}
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
                {list.component === "select" && (
                  <Select
                    bg={theme.backgroundGray}
                    placeholder={list?.placeholder}
                    options={optList[list?.name] ?? list?.options}
                    loading={list?.name === "creator" ? searchLoading : false}
                    style={{ height: "45px" }}
                    showSearch={list?.name === "creator"}
                    onChange={(e) => onChange(list.name,e)}
                  />
                )}
              </Form.Item>
            )}
          </Col>
        ))}
      </Row>
      <div className="button-wrapper">
        <Button
          htmlType="submit"
          width="120px"
          text="Next"
          bg={theme.primaryColor}
          loading={saveLoading}
        />
      </div>
    </ContentForm>
  );
}

export default SeriesUpload;

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
`;
