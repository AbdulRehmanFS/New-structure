import { useEffect, useMemo, useState } from "react";
import { message } from "antd";
import SwitchComponent from "@components/Switch";
import InputComponent from "@components/Input";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import {
  DeleteIcon,
  EditIcon,
  FilterIcon,
  UploadIcon
} from "@utils/svgFile";
import { theme } from "@utils/theme";
import placeholderImage from "@assets/images/authBackground.png";
import {
  removeCategoryApi,
  updateCategoryApi
} from "../services/categories.api";

const fallbackContent = Array.from({ length: 6 }).map((_, index) => ({
  image: placeholderImage,
  heading: "Show title here",
  description: "Show genre",
  key: `fallback-${index}`
}));

const CategoryList = ({ category, onRefresh }) => {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState(category?.name ?? "");
  const [statusLoading, setStatusLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  useEffect(() => {
    setCategoryName(category?.name ?? "");
  }, [category?.name]);

  const contentList = useMemo(() => {
    if (category?.contentList?.length) return category.contentList;
    return fallbackContent;
  }, [category?.contentList]);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const handleStatusChange = async (checked) => {
    if (!category?._id) return;
    setStatusLoading(true);
    const payload = {
      category_id: category?._id,
      type: 1,
      status: checked ? 1 : 0
    };
    const res = await updateCategoryApi(payload);
    if (res?.status === 200) {
      message.success(res?.message || "Status updated successfully");
      onRefresh?.();
    } else {
      message.error(res?.message || "Unable to update status");
    }
    setStatusLoading(false);
  };

  const handleEditToggle = () => {
    if (editMode) {
      setCategoryName(category?.name ?? "");
    }
    setEditMode((prev) => !prev);
  };

  const handleRename = async () => {
    if (!category?._id) return;
    const trimmedName = categoryName?.trim();
    if (!trimmedName) {
      message.error("Please enter category name");
      return;
    }
    if (trimmedName === category?.name) {
      setEditMode(false);
      return;
    }
    setRenameLoading(true);
    const payload = {
      category_id: category?._id,
      type: 2,
      name: trimmedName
    };
    const res = await updateCategoryApi(payload);
    if (res?.status === 200) {
      message.success(res?.message || "Category updated successfully");
      setEditMode(false);
      onRefresh?.();
    } else {
      message.error(res?.message || "Unable to update category");
    }
    setRenameLoading(false);
  };

  const handleDelete = async () => {
    if (!category?._id) return;
    setDeleteLoading(true);
    const res = await removeCategoryApi({ category_id: category?._id });
    if (res?.status === 200) {
      message.success(res?.message || "Category deleted successfully");
      setDeleteModal(false);
      onRefresh?.();
    } else {
      message.error(res?.message || "Unable to delete category");
    }
    setDeleteLoading(false);
  };

  const categoryVideosLabel =
    category?.videoCount > 0
      ? `${category?.videoCount} ${category?.videoCount === 1 ? "Video" : "Videos"}`
      : "No videos found yet!";

  return (
    <div className="rounded-2xl bg-[rgb(10,10,10)] px-5 py-4 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            className={`filter-icon flex h-9 w-9 items-center justify-center rounded-full bg-button-color transition-transform ${
              expanded ? "rotate-90" : ""
            }`}
            onClick={toggleExpanded}
            aria-label="Toggle content preview"
            type="button"
          >
            <FilterIcon height="16px" width="16px" />
          </button>

          {editMode ? (
            <div className="flex items-center gap-3">
              <InputComponent
                value={categoryName}
                onChange={(e) => setCategoryName(e?.target?.value)}
                color={theme.white}
                border="transparent"
                style={{ width: "220px" }}
              />
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white"
                onClick={handleRename}
                disabled={renameLoading}
              >
                <EditIcon height="20px" width="20px" />
              </button>
            </div>
          ) : (
            <div className="text-lg font-semibold">{category?.name ?? "---"}</div>
          )}

          <SwitchComponent
            size="default"
            checked={Boolean(category?.status)}
            onChange={handleStatusChange}
            loading={statusLoading}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-grey-text">
          <span>{categoryVideosLabel}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-button-color"
            >
              <UploadIcon height="18px" width="18px" />
            </button>
            <button
              type="button"
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                editMode ? "bg-white" : "bg-button-color"
              }`}
              onClick={handleEditToggle}
            >
              <EditIcon height="18px" width="18px" fill={editMode ? theme.black : theme.white} />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-button-color"
              onClick={() => setDeleteModal(true)}
            >
              <DeleteIcon height="18px" width="18px" />
            </button>
          </div>
          <span className="cursor-pointer text-white underline-offset-4 hover:underline">
            View All
          </span>
        </div>
      </div>

      {expanded && (
        <div className="content-videos mt-4 flex gap-4 overflow-auto">
          {contentList?.map((content, index) => (
            <div
              key={content?.key ?? content?._id ?? `${category?._id}-content-${index}`}
              className="flex min-w-[120px] flex-col gap-1"
            >
              <div className="h-[110px] w-[120px] overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)]">
                <img
                  src={content?.image || placeholderImage}
                  alt={content?.heading || "Content thumbnail"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="truncate text-sm font-semibold leading-5 text-white">
                {content?.heading}
              </div>
              <div className="truncate text-xs text-grey-text">{content?.description}</div>
            </div>
          ))}
        </div>
      )}

      {deleteModal && (
        <ModalComponent
          openModal={deleteModal}
          setOpenModal={() => setDeleteModal(false)}
          bg="white"
        >
          <ConfirmModal
            subheading="You want to delete this Category."
            confirmButtonText="Confirm"
            handleCancel={() => setDeleteModal(false)}
            handleConfirm={handleDelete}
            loading={deleteLoading}
            iconClass="delete"
            icon={<DeleteIcon height="40px" width="40px" />}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default CategoryList;


