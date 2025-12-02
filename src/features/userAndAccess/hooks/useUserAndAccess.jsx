import { useState, useMemo } from "react";
import { message } from "antd";

const useUserAndAccess = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      email: "harman1999@xyz.com",
      name: "John Doe",
      role: "Admin",
      status: "Invite Pending",
    },
    {
      id: 2,
      email: "user2@xyz.com",
      name: "Jane Smith",
      role: "Admin",
      status: "Expired Invitation",
    },
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    roles: ["Admin"], // Default to Admin checked
  });

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Handle add user
  const handleAddUser = () => {
    if (!formData.firstName || !formData.email) {
      message.error("Please fill all required fields");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      role: formData.roles.length > 0 ? formData.roles.join(", ") : "",
      status: "Invite Pending",
    };

    setUsers((prev) => [...prev, newUser]);
    setShowModal(false);
    setFormData({ firstName: "", lastName: "", email: "", roles: ["Admin"] });
    message.success("User added successfully");
  };

  // Handle delete users
  const handleDelete = () => {
    if (selectedForDelete.length === 0) {
      message.warning("Please select at least one user to delete");
      return;
    }

    setUsers((prev) => prev.filter((u) => !selectedForDelete.includes(u.id)));
    setSelectedForDelete([]);
    setIsEditMode(false);
    message.success("Users deleted successfully");
  };

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    if (isEditMode) {
      setSelectedForDelete((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setSelectedForDelete([]);
  };

  return {
    users: filteredUsers,
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
  };
};

export default useUserAndAccess;

