import { useRef, useState } from "react";
import { Col, Form, Row } from "antd";
import BackButton from "@features/common/components/BackButton";
import InputComponent from "@components/Input";
import ContentUpload from "@components/ContentUpload";
import FileUpload from "@components/FileUpload";
import SelectComponent from "@components/Select";
import ButtonComponent from "@components/Button";
import { fieldList } from "../utils/data";
import { theme } from "@utils/theme";
import { useGetCreatorList, useSeriesFormSubmit } from "../hooks";

function SeriesUpload() {
  const formRef = useRef();
  const [creatorList, searchLoading, handleGetCreator] = useGetCreatorList();
  const [onFinish, saveLoading] = useSeriesFormSubmit();
  const [formatType, setformatType] = useState(null);
  const optList = {
    creator: creatorList
  };

  const onChange = (value, e) => {
    if (value === "format") {
      setformatType(e);
    }
  };

  return (
    <div className="scroll-without-header px-5 py-4">
      <Form name="basic" onFinish={onFinish} ref={formRef} initialValues={{}}>
        <div className="flex items-center gap-2 mb-6">
          <BackButton />
          <div className="text-lg font-semibold text-white">Series Upload</div>
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
                      style={{ height: "45px" }}
                      bg={theme.greyButton || "#2a2a2a"}
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
                    <FileUpload
                      placeholder={list?.placeholder}
                      name={list?.name}
                      aspectRatio={list?.aspectRatio}
                      bg={theme.grey2 || "#2a2a2a"}
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
                    <SelectComponent
                      bg={theme.backgroundGray || "#2a2a2a"}
                      placeholder={list?.placeholder}
                      options={optList[list?.name] ?? list?.options}
                      loading={list?.name === "creator" ? searchLoading : false}
                      style={{ height: "45px" }}
                      showSearch={list?.name === "creator"}
                      onChange={(e) => onChange(list.name, e)}
                      handleSearch={list?.name === "creator" && handleGetCreator ? handleGetCreator : null}
                    />
                  )}
                </Form.Item>
              )}
            </Col>
          ))}
        </Row>
        <div className="flex justify-end items-center mt-8">
          <ButtonComponent
            htmlType="submit"
            width="120px"
            text="Next"
            bg={theme.primaryColor}
            loading={saveLoading}
          />
        </div>
      </Form>
    </div>
  );
}

export default SeriesUpload;
