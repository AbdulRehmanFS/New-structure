import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { font, theme } from "util/theme";
import { PlusIcon, SearchIcon } from "util/svgFile";

export default function UserAndAccess() {
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
    role: "",
  });

  // ---------- Dummy API calls ----------
  // const addUserAPI = async (newUser) => {
  //   try {
  //     const res = await axios.post("/api/users", newUser);
  //     return res.data;
  //   } catch (err) {
  //     console.error("Error adding user:", err);
  //   }
  // };

  const deleteUsersAPI = async (ids) => {
    try {
      const res = await axios.delete("/api/users", { data: { ids } });
      return res.data;
    } catch (err) {
      console.error("Error deleting users:", err);
    }
  };

  // ---------- Add User ----------
  const handleAddUser = async () => {
    if (!formData.firstName || !formData.email) {
      alert("Please fill all required fields");
      return;
    }

    const newUser = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      role: formData.role || "",
      status: "Invite Pending",
    };

    // Add to backend (dummy)
    // const addedUser = await addUserAPI(newUser);

    // Add to state
    setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
    setShowModal(false);
    setFormData({ firstName: "", lastName: "", email: "", role: "" });
  };

  // ---------- Delete ----------
  const handleDelete = async () => {
    if (selectedForDelete.length === 0) {
      alert("Please select at least one user to delete");
      return;
    }

    await deleteUsersAPI(selectedForDelete);
    setUsers((prev) => prev.filter((u) => !selectedForDelete.includes(u.id)));
    setSelectedForDelete([]);
    setIsEditMode(false);
  };

  // ---------- Checkbox Logic ----------
  const handleCheckboxChange = (id) => {
    if (isEditMode) {
      setSelectedForDelete((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  // ---------- Search ----------
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Wrapper>
      <Title>Users and Access</Title>

         <TopBar>
        <TopBarLeft>
          <AddButton onClick={() => setShowModal(true)}>
            <PlusIcon width="25" height="25" color="#979797" />
          </AddButton>
        </TopBarLeft>

        <TopBarRight>
          <SearchWrapper>
            <SearchInput
              type="text"
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIconWrapper>
              <SearchIcon width="18" height="18" color="#9c9c9c" />
            </SearchIconWrapper>
          </SearchWrapper>

          {!isEditMode ? (
            <EditButton onClick={() => setIsEditMode(true)}>Edit</EditButton>
          ) : (
            <>
              <CancelEditButton
                onClick={() => {
                  setIsEditMode(false);
                  setSelectedForDelete([]);
                }}
              >
                Cancel
              </CancelEditButton>

              <DeleteButton
                onClick={handleDelete}
                disabled={selectedForDelete.length === 0}
              >
                Delete
              </DeleteButton>
            </>
          )}
        </TopBarRight>
      </TopBar>


      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {isEditMode && <th>Select</th>}
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                {isEditMode && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedForDelete.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                    />
                  </td>
                )}
                <td>
                  <EmailLink href="#">{user.email}</EmailLink>
                </td>
                <td>
                  <Name>
                    {user.name}
                    <SubText red={user.status === "Expired Invitation"}>
                      {user.status}
                    </SubText>
                  </Name>
                </td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {showModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>New User</ModalTitle>

            <Form>
              <FormRow>
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </FormRow>
              <Input
                placeholder="Email Address"
                full
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <RoleSection>
                <RoleTitle>Role</RoleTitle>
                <CheckboxRow>
                  <input
                    type="checkbox"
                    id="admin"
                    checked={formData.role === "Admin"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.checked && "Admin" ,
                      })
                    }
                  />
                  <label htmlFor="admin">Admin</label>
                </CheckboxRow>
              </RoleSection>

              <ButtonRow>
                <CancelButton onClick={() => setShowModal(false)}>
                  Cancel
                </CancelButton>
                <AddButtonModal onClick={handleAddUser}>Add</AddButtonModal>
              </ButtonRow>
            </Form>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Wrapper>
  );
}

// ---------------- Styled Components ----------------

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;


const Wrapper = styled.div`
  color: ${theme.white};
  padding: 40px 60px;
  font-family: ${font.primary};
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 25px;
`;

const TopBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 240px;
  height: 36px;
  padding: 8px 36px 8px 14px;
  border-radius: 8px;
  background-color: #2b2b2b;
  border: 1px solid #3d3d3d;
  color: ${theme.white};
  font-size: ${font.small};
  outline: none;
  transition: all 0.25s ease-in-out;

  &::placeholder {
    color: #9c9c9c;
  }

  &:focus {
    border-color: #4b6ef5;
    box-shadow: 0 0 6px rgba(75, 110, 245, 0.25);
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddButton = styled.div`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const EditButton = styled.button`
  background: transparent;
  border: 2px solid ${theme.greyBorder};
  color: ${theme.white};
  border-radius: 6px;
  padding: 6px 16px;
  font-weight: bold;
  font-size: ${font.small};
  cursor: pointer;
`;
const CancelEditButton = styled(EditButton)`
  background: transparent;
  border: 2px solid ${theme.greyBorder};
  color: ${theme.white};
  border-radius: 6px;
  padding: 6px 16px;
  font-weight: bold;
  font-size: ${font.small};
  cursor: pointer;
`;

const DeleteButton = styled(EditButton)`
  border-color: red;
  color: red;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TableWrapper = styled.div`
  background: transparent;
  border-radius: 10px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  thead {
    background-color: #3d3d3d80;
    border-radius: 10px;
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  thead tr {
    border-radius: 10px;
  }

  thead th:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  thead th:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  th {
    text-align: left;
    font-size: 13px;
    font-weight: bold;
    color: ${theme.white};
    padding: 12px 16px;
    vertical-align: middle;
  }

  tbody {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  td {
    font-size: 13px;
    padding: 12px 16px;
    border-bottom: 1px solid #797676;
    vertical-align: top;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const EmailLink = styled.a`
  color: ${theme.lightGray};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: ${theme.white};
`;

const SubText = styled.span`
  color: ${(props) => (props.red ? "red" : theme.greyText)};
  font-size: 11px;
`;

// --- Modal Components same as before ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContainer = styled.div`
  background-color: #1f1f1f;
  border-radius: 10px;
  padding: 25px 30px;
  width: 420px;
  color: ${theme.white};
`;

const ModalTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 18px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: ${(props) => (props.full ? "1" : "unset")};
  width: ${(props) => (props.full ? "100%" : "calc(50% - 5px)")};
  background-color: #3d3d3d;
  border: none;
  border-radius: 6px;
  color: ${theme.white};
  padding: 10px;
  font-size: 13px;
`;

const RoleSection = styled.div`
  margin-top: 10px;
`;

const RoleTitle = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
  gap: 10px;
`;

const CancelButton = styled.button`
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 18px;
  cursor: pointer;
  font-weight: bold;
`;

const AddButtonModal = styled.button`
  background-color: #3d3d3d;
  color: white;
  border: 1px solid #6d6d6d;
  border-radius: 6px;
  padding: 6px 18px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #4b6ef5;
    border-color: #4b6ef5;
  }
`;
