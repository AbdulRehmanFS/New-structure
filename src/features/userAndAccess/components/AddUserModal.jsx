/* eslint-disable react/prop-types */
import { memo, useState } from "react";
import ModalComponent from "@components/modal/Modal";
import InputComponent from "@components/Input";
import { theme } from "@utils/theme";

const rolesList = [
  "Admin",
  // "Super Admin",
  // "Human Resources",
  // "Content Approval",
  // "Trust & Safety",
  // "Customer Support",
  // "Marketing"
];

const AddUserModal = ({ openModal, setOpenModal, formData, setFormData, onAddUser }) => {
  // const [showPermissions, setShowPermissions] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (role, checked) => {
    setFormData((prev) => {
      const currentRoles = prev.roles || [];
      if (checked) {
        return { ...prev, roles: [...currentRoles, role] };
      } else {
        return { ...prev, roles: currentRoles.filter((r) => r !== role) };
      }
    });
  };

  const handleNext = () => {
    if (!formData.firstName || !formData.email) {
      alert("Please fill all required fields");
      return;
    }
    onAddUser();
  };

  return (
    <ModalComponent openModal={openModal} setOpenModal={setOpenModal} bg="white" closeIconColor="black" hideCloseIcon={true}>
      <div className="w-[600px] text-black p-2">
        {/* New Users Title */}
        <h2 className="text-2xl font-bold mb-2 text-black">New Users</h2>

        {/* User Information Section */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <InputComponent
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                bg="#f5f5f5"
                border="transparent"
                color="#000000"
                style={{ height: "56px" }}
              />
            </div>
            <div className="flex-1">
              <InputComponent
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                bg="#f5f5f5"
                border="transparent"
                color="#000000"
                style={{ height: "56px" }}
              />
            </div>
          </div>

          <InputComponent
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            bg="#f5f5f5"
            border="transparent"
            color="#000000"
            style={{ height: "56px" }}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Roles Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-black">Roles</h2>
          
          {/* Single Column Layout for Admin Role Only */}
          <div className="mb-4">
            {rolesList.map((role) => (
              <div key={role} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={role}
                  checked={formData.roles?.includes(role) || false}
                  onChange={(e) => handleRoleChange(role, e.target.checked)}
                  className="w-4 h-4 cursor-pointer rounded border-gray-400 focus:ring-black focus:ring-1"
                  style={{
                    accentColor: "#000000",
                    backgroundColor: formData.roles?.includes(role) ? "#000000" : "white"
                  }}
                />
                <label htmlFor={role} className="text-base text-black cursor-pointer font-normal">
                  {role}
                </label>
              </div>
            ))}
          </div>

          {/* See permissions link */}
          {/* <button
            type="button"
            onClick={() => setShowPermissions(!showPermissions)}
            className="text-blue-600 text-sm underline hover:text-blue-800 mb-4 p-0 bg-transparent border-none cursor-pointer"
          >
            See permissions
          </button> */}

          {/* Permissions List (shown when expanded) */}
          {/* {showPermissions && (
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 mb-4">
              <div className="flex flex-col gap-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="text-sm text-gray-600">
                    • ljdfskdfshdfskdfkhfs
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="text-sm text-gray-600">
                    • ljdfskdfshdfskdfkhfs
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setOpenModal(false)}
            className="bg-[#d32f2f] text-white border-none rounded-md px-5 py-2 cursor-pointer font-bold hover:opacity-90 transition-opacity"
          >
            Cancel
          </button>
          <button
            onClick={handleNext}
            className="bg-[#AFAFAF] text-[#FFFFFF] border-none rounded-md px-5 py-2 cursor-pointer font-bold hover:bg-[#d0d0d0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!formData.firstName || !formData.email}
          >
            Next
          </button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default memo(AddUserModal);

