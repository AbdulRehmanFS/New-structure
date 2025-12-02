/* eslint-disable react/prop-types */
import { memo } from "react";
import { theme } from "@utils/theme";

const UserTable = ({ users, isEditMode, selectedForDelete, onCheckboxChange }) => {
  return (
    <div className="bg-transparent rounded-[10px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead className="bg-[rgba(61,61,61,0.5)] rounded-[10px]">
            <tr className="rounded-[10px]">
              {isEditMode && (
                <th className="text-left text-[13px] font-bold text-white py-3 px-4 align-middle rounded-tl-[10px] rounded-bl-[10px]">
                  Select
                </th>
              )}
              <th className="text-left text-[13px] font-bold text-white py-3 px-4 align-middle">
                Email
              </th>
              <th className="text-left text-[13px] font-bold text-white py-3 px-4 align-middle">
                Name
              </th>
              <th className={`text-left text-[13px] font-bold text-white py-3 px-4 align-middle ${!isEditMode ? 'rounded-tr-[10px] rounded-br-[10px]' : ''}`}>
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={isEditMode ? 4 : 3} className="text-center py-8 text-[rgba(116,116,116,1)]">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-[rgba(121,118,118,1)] last:border-b-0">
                  {isEditMode && (
                    <td className="text-[13px] py-3 px-4 align-top">
                      <input
                        type="checkbox"
                        checked={selectedForDelete.includes(user.id)}
                        onChange={() => onCheckboxChange(user.id)}
                        className="cursor-pointer"
                      />
                    </td>
                  )}
                  <td className="text-[13px] py-3 px-4 align-top">
                    <a
                      href="#"
                      className="text-[rgba(255,255,255,0.79)] no-underline hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      {user.email}
                    </a>
                  </td>
                  <td className="text-[13px] py-3 px-4 align-top">
                    <div className="flex flex-col gap-[3px] text-white">
                      <span>{user.name}</span>
                      <span
                        className={`text-[11px] ${
                          user.status === "Expired Invitation" ? "text-red-500" : "text-[rgba(116,116,116,1)]"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="text-[13px] py-3 px-4 align-top text-white">{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(UserTable);

