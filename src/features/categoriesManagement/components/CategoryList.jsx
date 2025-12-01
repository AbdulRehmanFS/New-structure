/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import { EllipseText, IconWrapper } from "../utils/style";
import {
  DeleteIcon,
  EditIcon,
  FilterIcon,
  UploadIcon,
} from "@utils/svgFile";
import SwitchComponent from "@components/Switch";
import { theme } from "@utils/theme";
import {
  removeCategoryApi,
  updateCategoryApi
} from "../services/categories.api";
import Message from "@components/Message";
import bgImage from "@assets/images/authBackground.png";
import { errorMessage } from "@utils/commonSection";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import InputComponent from "@components/Input";

const data = [
  {
    image: bgImage,
    heading: "Show title here in this section",
    description: "Show genre ",
  },
  {
    image: bgImage,
    heading: "Show title",
    description: "Show genre ",
  },
  {
    image: bgImage,
    heading: "Show title",
    description: "Show genre ",
  },
  {
    image: bgImage,
    heading: "Show title",
    description: "Show genre ",
  },
  {
    image: bgImage,
    heading: "Show title here in this section",
    description: "Show genre ",
  },
  {
    image: bgImage,
    heading: "Show title",
    description: "Show genre ",
  },
  {
    image: bgImage,
    heading: "Show title",
    description: "Show genre ",
  },
  {
    image: bgImage,
    heading: "Show title",
    description: "Show genre ",
  },
  {
    image: bgImage,
    heading: "Show title here in this section",
    description: "Show genre ",
  },
  {
    image: bgImage,
    heading: "Show title",
    description: "Show genre ",
  },
  {
    image: bgImage,
    heading: "Show title",
    description: "Show genre ",
  },
  {
    image: bgImage,
    heading: "Show title",
    description: "Show genre ",
  },
];

function CategoryList({ list, updatedList }) {
  const [showContent, setShowContent] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [inputText, setInputText] = useState(list?.name);

  const handleFilterIcon = () => setShowContent((pre) => !pre);

  const handleDeleteCategory = async () => {
    setDeleteLoader(true);
    const res = await removeCategoryApi({
      category_id: list?._id,
    });
    if (res?.status === 200) {
      if (updatedList) updatedList();
      Message.success(res);
    } else errorMessage(res?.message);
    setDeleteLoader(false);
  };

  const updateStatus = async (status) => {
    const res = await updateCategoryApi({
      category_id: list?._id,
      type: 1, // update category status
      status,
    });
    if (res?.status === 200) Message.success(res);
    else errorMessage(res?.message);
  };

  const handleEditClick = () => {
    if (editActive) setInputText(list?.name);
    setEditActive((pre) => !pre);
  };

  const handleDeleteModal = () => setDeleteModal((pre) => !pre);

  const handleCategoryEdit = async () => {
    const res = await updateCategoryApi({
      category_id: list?._id,
      type: 2, // update category status
      name: inputText,
    });
    if (res?.status === 200) {
      setEditActive(false);
      updatedList();
      Message.success(res);
    } else errorMessage(res?.message);
  };

  return (
    <>
      <ListSectionStyle>
        <div className="category-info">
          <div className="flex-gap">
            <span
              className={`${showContent && "rotate-icon"} filter-icon`}
              onClick={handleFilterIcon}
              aria-hidden
            >
              <FilterIcon height="16px" width="16px" />
            </span>
            {editActive ? (
              <>
                <InputComponent
                  value={inputText}
                  onChange={(e) => setInputText(e?.target.value)}
                  style={{ border: "transparent" }}
                  bg="transparent"
                  border="transparent"
                />
                <span
                  className="filter-icon"
                  onClick={handleCategoryEdit}
                  aria-hidden
                >
                  <EditIcon height="20px" width="20px" />
                </span>
              </>
            ) : (
              inputText ?? "---"
            )}
            <SwitchComponent
              style={{
                primary: theme.green,
                inactive: theme.midGrey,
                circle: theme.white,
              }}
              checked={list?.status}
              onChange={updateStatus}
            />
          </div>
          <div className="action-buttons flex-gap">
            {list?.videoCount
              ? `${list?.videoCount} Videos`
              : "No videos found yet!"}
            <IconWrapper>
              <UploadIcon height="18px" width="18px" fill={theme.white} />
            </IconWrapper>
            {!editActive ? (
              <IconWrapper onClick={handleEditClick}>
                <EditIcon height="18px" width="18px" />
              </IconWrapper>
            ) : (
              <IconWrapper onClick={handleEditClick} bg={theme.white}>
                <EditIcon height="18px" width="18px" fill={theme.black} />
              </IconWrapper>
            )}
            <IconWrapper onClick={handleDeleteModal}>
              <DeleteIcon height="18px" width="18px" fill={theme.white} />
            </IconWrapper>
            <span className="view-btn">View All</span>
          </div>
        </div>
        {showContent && (
          <div className="content-videos">
            {data?.map((content, i) => (
              <div className="content" key={i}>
                <img src={content?.image} alt="" height="110px" width="110px" />
                <EllipseText width="108px" textAlign="left" margin="0px">
                  {content?.heading}
                </EllipseText>
                <EllipseText
                  width="108px"
                  textAlign="left"
                  margin="0px"
                  className="content-desc"
                >
                  {content?.description}
                </EllipseText>
              </div>
            ))}
          </div>
        )}
      </ListSectionStyle>
      {deleteModal && (
        <ModalComponent
          openModal={deleteModal}
          setOpenModal={handleDeleteModal}
        >
          <ConfirmModal
            icon={<DeleteIcon />}
            handleConfirm={handleDeleteCategory}
            handleCancel={handleDeleteModal}
            confirmButtonText="Confirm"
            loading={deleteLoader}
            subheading="You want to delete this Category."
          />
        </ModalComponent>
      )}
    </>
  );
}

export default CategoryList;

const ListSectionStyle = styled.div`
  background: rgb(10 10 10);
  padding: 15px 20px;
  border-radius: 12px;
  .category-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-switch {
    min-width: 38px;
  }
  .flex-gap {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .action-buttons {
    color: ${theme.greyText};
  }
  .view-btn {
    cursor: pointer;
  }
  .filter-icon {
    display: flex;
    svg {
      cursor: pointer;
    }
  }
  .content-videos {
    height: 160px;
    display: flex;
    gap: 9px;
    overflow: auto;
    margin-top: 12px;
    scrollbar-width: thin;
    scrollbar-color: white transparent;
  }
  .content {
    display: flex;
    flex-direction: column;
    img {
      border-radius: 10px;
      margin-bottom: 6px;
      object-fit: cover;
    }
  }
  .rotate-icon svg {
    rotate: 180deg;
  }
  .content-desc {
    font-size: 10px;
    color: rgba(151, 151, 151, 1);
  }
`;
