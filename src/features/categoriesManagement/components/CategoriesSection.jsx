/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { message } from "antd";
import { theme } from "@utils/theme";
import ButtonComponent from "@components/Button";
import ModalComponent from "@features/common/components/Modal";
import InputComponent from "@components/Input";
import { createCategoryApi, fetchCategoriesApi } from "../services/categories.api";
import { errorMessage } from "@utils/commonSection";
import Loader from "@components/Loader";
import CategoryList from "./CategoryList";

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
    const res = await fetchCategoriesApi();
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
      const res = await createCategoryApi({ name: categoryNameRef.current });
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
      <div className="h-[calc(100vh-195px)] sm:h-[calc(100vh-195px)] min-h-[400px] flex items-center justify-center">
        <Loader loading={loader} fullscreen={false} />
      </div>
    );

  return (
    <>
      {list?.length ? (
        <div className="h-[calc(100vh-195px)] sm:h-[calc(100vh-195px)] min-h-[400px] overflow-auto [&::-webkit-scrollbar]:w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
            <div className="text-base sm:text-base">{list?.length} Categories</div>
            <div className="w-full sm:w-auto sm:min-w-[100px]">
              <ButtonComponent
                text="Add New Category"
                onClick={handleModal}
                width="100%"
                bg={theme.white}
                color={theme.greyText}
                height="40px"
              />
            </div>
          </div>
          <div className="flex flex-col" style={{ gap: "15px" }}>
            {list?.map((categorylist, i) => (
              <CategoryList key={i} list={categorylist} updatedList={getCategoriesList} />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-195px)] sm:h-[calc(100vh-195px)] min-h-[400px] flex flex-col items-center justify-center text-grey-text px-4">
          <div className="text-xl sm:text-2xl font-normal leading-[29.04px] mb-5 text-center">Welcome {data?.name}!</div>
          <div className="text-sm sm:text-base font-normal mb-5 text-center">No categories found yet!</div>
          <ButtonComponent
            text="Add category now"
            width="150px"
            bg={theme.buttonColor}
            onClick={handleModal}
          />
        </div>
      )}
      {openModal && (
        <ModalComponent openModal={openModal} setOpenModal={handleModal}>
          <div className="flex flex-col bg-white rounded-[6px] w-[90vw] sm:w-auto sm:min-w-[390px] max-w-[390px] overflow-hidden p-5 sm:p-[30px] items-center gap-5" style={{ color: theme.lightPrimaryColor, fontSize: "20px", fontWeight: 700, lineHeight: "32px" }}>
            <div className="text-xl sm:text-[26px] text-center">Add new category</div>
            <InputComponent
              placeholder="Category Name"
              style={{ height: "45px" }}
              color={theme.black}
              onChange={handleCategoryInput}
              border={theme.midGrey}
            />
            <ButtonComponent
              bg={theme.lightPrimaryColor}
              width="100%"
              text="Add Category"
              loading={buttonLoader}
              onClick={handleAddCategories}
            />
          </div>
        </ModalComponent>
      )}
    </>
  );
};

export default CategoriesSection;
