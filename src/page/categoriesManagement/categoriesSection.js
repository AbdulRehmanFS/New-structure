/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { message } from "antd";
import { theme } from "util/theme";
import Button from "component/fields/button";
import ModalComponent from "component/modal/index";
import InputComponent from "component/fields/input-field";
import { addCategoryApi, getCategoriesListApi } from "service/api/collections";
import { errorMessage } from "util/commonSection";
import Loader from "component/loader";
import CategoryList from "./categoryList";

const CategoriesSection = () => {
  const [list, setList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);
  const { data } = useSelector((e) => e?.signIn);
  const categoryNameRef = useRef(null);

  const handleModal = () => setOpenModal((pre) => !pre);

  const handleCategoryInput = (e) => {
    categoryNameRef.current = e?.target.value;
  };

  const getCategoriesList = async () => {
    setLoader(true);
    const res = await getCategoriesListApi();
    if (res?.status === 200) {
      const categoriesList = res?.data || [];
      setList(categoriesList);
    }
    setLoader(false);
  };

  const handleAddCategories = async () => {
    setButtonLoader(true);
    if (!categoryNameRef?.current) message.error("Please first enter category name");
    else {
      const res = await addCategoryApi({ name: categoryNameRef.current });
      if (res?.status === 200) {
        message.success(res?.message || "Category add successfully");
        getCategoriesList();
      } else errorMessage(res?.message);
      categoryNameRef.current = null;
      handleModal();
    }
    setButtonLoader(false);
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  if (loader)
    return (
      <LoaderWrapper>
        <Loader fullscreen={false} />
      </LoaderWrapper>
    );

  return (
    <>
      {list?.length ? (
        <CategoriesListStyle>
          <div className="top-heading">
            {list?.length} Categories
            <Button
              text="Add New Category"
              onClick={handleModal}
              width="80px"
              bg={theme.white}
              color={theme.black}
            />
          </div>
          <div className="list-container">
            {list?.map((categorylist, i) => (
              <CategoryList key={i} list={categorylist} updatedList={getCategoriesList} />
            ))}
          </div>
        </CategoriesListStyle>
      ) : (
        <NoCategoriesList>
          <div className="heading">Welcome {data?.name}!</div>
          <div className="sub-heading">No categories found yet!</div>
          <Button
            text="Add category now"
            width="150px"
            bg={theme.buttonColor}
            onClick={handleModal}
          />
        </NoCategoriesList>
      )}
      {openModal && (
        <ModalComponent openModal={openModal} setOpenModal={handleModal}>
          <AddCategoryForm>
            Add new category
            <InputComponent
              placeholder="Category Name"
              style={{ height: "45px" }}
              color={theme.black}
              onChange={handleCategoryInput}
              border={theme.midGrey}
            />
            <Button
              bg={theme.lightPrimaryColor}
              width="100%"
              text="Add Category"
              loading={buttonLoader}
              onClick={handleAddCategories}
            />
          </AddCategoryForm>
        </ModalComponent>
      )}
    </>
  );
};

export default CategoriesSection;

const LoaderWrapper = styled.div`
  height: calc(100vh - 195px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoCategoriesList = styled.div`
  height: calc(100vh - 195px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${theme.greyText};
  .custom-button {
    margin-top: 20px;
  }
  .heading {
    font-size: 24px;
    font-weight: 400;
    line-height: 29.04px;
  }
  .sub-heading {
    font-size: 16px;
    font-weight: 400;
  }
`;

const AddCategoryForm = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 6px;
  min-width: 390px;
  overflow: hidden;
  color: ${theme.lightPrimaryColor};
  padding: 30px;
  align-items: center;
  gap: 20px;
  font-size: 26px;
  font-weight: 700;
  line-height: 32px;
`;

const CategoriesListStyle = styled.div`
  height: calc(100vh - 195px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
  .top-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .list-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;
