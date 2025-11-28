import { message } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import ButtonComponent from "@components/Button";
import InputComponent from "@components/Input";
import Loader from "@components/Loader";
import ModalComponent from "@features/common/components/Modal";
import { theme } from "@utils/theme";
import CategoryList from "./CategoryList";
import {
  createCategoryApi,
  fetchCategoriesApi
} from "../services/categories.api";

const CategoriesSection = ({ searchValue }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [saving, setSaving] = useState(false);

  const getCategories = useCallback(async () => {
    setLoading(true);
    const res = await fetchCategoriesApi();
    if (res?.status === 200) {
      setCategoryList(res?.data || []);
    } else {
      message.error(res?.message || "Unable to fetch categories");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const filteredCategories = useMemo(() => {
    if (!searchValue) return categoryList;
    const term = searchValue?.toLowerCase?.() || "";
    return categoryList?.filter((category) =>
      category?.name?.toLowerCase()?.includes(term)
    );
  }, [categoryList, searchValue]);

  const handleModalToggle = () => {
    setCategoryName("");
    setOpenModal((prev) => !prev);
  };

  const handleAddCategory = async () => {
    const trimmedName = categoryName?.trim();
    if (!trimmedName) {
      message.error("Please enter category name");
      return;
    }
    setSaving(true);
    const res = await createCategoryApi({ name: trimmedName });
    if (res?.status === 200) {
      message.success(res?.message || "Category added successfully");
      handleModalToggle();
      getCategories();
    } else {
      message.error(res?.message || "Unable to add category");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[320px]">
        <Loader loading={loading} fullscreen={false} />
      </div>
    );
  }

  const hasCategories = filteredCategories?.length > 0;

  return (
    <div className="mt-5 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[rgba(10,10,10,0.85)] px-5 py-4">
        <div className="text-2xl font-semibold text-white">
          {filteredCategories?.length ?? 0} Categories
        </div>
        <ButtonComponent
          text="Add New Category"
          width="190px"
          bg={theme.white}
          onClick={handleModalToggle}
        />
      </div>

      {hasCategories ? (
        <div className="flex flex-col gap-4">
          {filteredCategories?.map((category) => (
            <CategoryList
              key={category?._id ?? category?.name}
              category={category}
              onRefresh={getCategories}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-[rgba(196,196,196,0.08)] px-8 py-12 text-center text-white">
          <div className="text-2xl font-semibold">No categories found yet!</div>
          <div className="text-grey-text">
            Start building your library by adding your first category.
          </div>
          <ButtonComponent
            text="Add category now"
            width="200px"
            bg={theme.buttonColor}
            onClick={handleModalToggle}
          />
        </div>
      )}

      {openModal && (
        <ModalComponent openModal={openModal} setOpenModal={handleModalToggle}>
          <div className="w-[min(420px,90vw)] rounded-2xl bg-[#111111] p-6 text-white box-border flex flex-col">
            <div className="text-2xl font-semibold mb-1">Add new category</div>
            <div className="text-sm text-grey-text mb-5">
              Enter a unique name to create a new category.
            </div>
            <div className="mb-6">
              <InputComponent
                placeholder="Category Name"
                color={theme.white}
                border={theme.midGrey}
                onChange={(e) => setCategoryName(e?.target?.value)}
                value={categoryName}
                style={{ height: "45px" }}
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end w-full box-border">
              <div className="flex-1 sm:flex-initial sm:w-auto">
                <ButtonComponent
                  text="Cancel"
                  width="100%"
                  size="middle"
                  onClick={handleModalToggle}
                />
              </div>
              <div className="flex-1 sm:flex-initial sm:w-auto">
                <ButtonComponent
                  text="Add Category"
                  width="100%"
                  size="middle"
                  bg={theme.lightPrimaryColor}
                  loading={saving}
                  onClick={handleAddCategory}
                />
              </div>
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default CategoriesSection;


