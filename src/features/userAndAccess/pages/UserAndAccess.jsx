import { memo } from "react";
import Header from "@layouts/Header";
import { PlusIcon } from "@utils/svgFile";
import useUserAndAccess from "../hooks/useUserAndAccess";
import { UserTable, AddUserModal, SearchBar } from "../components";

const UserAndAccess = () => {
  const {
    users,
    showModal,
    setShowModal,
    isEditMode,
    setIsEditMode,
    selectedForDelete,
    searchTerm,
    setSearchTerm,
    formData,
    setFormData,
    handleAddUser,
    handleDelete,
    handleCheckboxChange,
    handleCancelEdit,
  } = useUserAndAccess();

  return (
    <>
      <Header showSearch={false} heading="Users and Access" />
      <div className="scroll-without-header text-white min-h-screen" style={{ paddingTop: "30px" }}>
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          {/* Left Side - Add Button */}
          <div className="flex items-center">
            <button
              onClick={() => setShowModal(true)}
              className="h-7 w-7 rounded-full flex items-center justify-center cursor-pointer transition-colors p-0 border-none bg-transparent"
              style={{ outline: "none" }}
            >
              <PlusIcon width="28" height="28" color="#979797" />
            </button>
          </div>

          {/* Right Side - Search and Action Buttons */}
          <div className="flex items-center gap-5">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            {!isEditMode ? (
              <button
                onClick={() => setIsEditMode(true)}
                className="bg-transparent border-2 border-[rgba(255,255,255,0.37)] text-white rounded-md px-4 py-1.5 font-bold text-[13px] cursor-pointer hover:border-white transition-colors"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancelEdit}
                  className="bg-transparent border-2 border-[rgba(255,255,255,0.37)] text-white rounded-md px-4 py-1.5 font-bold text-[13px] cursor-pointer hover:border-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={selectedForDelete.length === 0}
                  className={`border-2 border-red-500 rounded-md px-4 py-1.5 font-bold text-[13px] transition-colors ${
                    selectedForDelete.length === 0
                      ? "bg-transparent text-red-500 opacity-50 cursor-not-allowed"
                      : "bg-transparent text-red-500 cursor-pointer hover:bg-red-500 hover:text-white"
                  }`}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* User Table */}
        <UserTable
          users={users}
          isEditMode={isEditMode}
          selectedForDelete={selectedForDelete}
          onCheckboxChange={handleCheckboxChange}
        />

        {/* Add User Modal */}
        <AddUserModal
          openModal={showModal}
          setOpenModal={setShowModal}
          formData={formData}
          setFormData={setFormData}
          onAddUser={handleAddUser}
        />
      </div>
    </>
  );
};

export default memo(UserAndAccess);

