import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarSelection } from "@features/common/store/sidebarSlice";
import { authlogout } from "@features/auth/store/signInSlice";
import { resetTabSelection } from "@features/userManagement/store/useManagementSlice";
import { checkCurrentRoute, navbarList } from "@utils/constant";
import { CashIcon, LogoutIcon } from "@utils/svgFile";
import ModalComponent from "@features/common/components/Modal";
import ConfirmModal from "@features/common/components/ConfirmModal";
import logoImage from "@assets/images/logo.png";

const Sidebar = ({ isCollapsed, onToggle }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const { selectedTab } = useSelector((e) => e.sidebar);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkActiveRoute = useCallback(
    (path) => {
      const newRoute = checkCurrentRoute(path);
      dispatch(sidebarSelection(newRoute));
    },
    [dispatch]
  );

  useEffect(() => {
    checkActiveRoute(location);
  }, [checkActiveRoute, location]);

  const handleListSelection = (list) => navigate(list.route);

  const handleLogout = () => {
    dispatch(authlogout({}));
    dispatch(sidebarSelection("Dashboard"));
    dispatch(resetTabSelection());
    setLogoutModal((pre) => !pre);
  };

  const handleLogoutModal = () => setLogoutModal((pre) => !pre);

  return (
    <div className={`h-screen px-0.5 bg-sidebar overflow-auto relative transition-all duration-300 ${isCollapsed ? 'w-[70px]' : 'w-[240px]'}`}>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute top-5 right-2 z-10 p-1.5 rounded-md hover:bg-grey-2 transition-colors"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="rgba(255, 255, 255, 0.72)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Logo */}
      <div className={`flex justify-center my-5 ${isCollapsed ? 'px-2' : ''}`}>
        {!isCollapsed ? (
          <img src={logoImage} alt="" height="100px" width="150px" />
        ) : (
          <img src={logoImage} alt="" height="40px" width="40px" className="rounded" />
        )}
      </div>

      {/* Menu Items */}
      {navbarList.map((list) => (
        <div
          key={list?.name}
          className={`flex items-center gap-2.5 cursor-pointer h-10 rounded-md mb-1 transition-colors ${
            isCollapsed ? 'justify-center pl-0 pr-0' : 'pl-6'
          } ${
            selectedTab === list.name
              ? "bg-sidebar-select text-light-grey-text"
              : "bg-transparent text-light-grey-text hover:bg-grey-2"
          }`}
          onClick={() => handleListSelection(list)}
          title={isCollapsed ? list.name : undefined}
        >
          <span className="flex-shrink-0">{list.icon}</span>
          {!isCollapsed && <span className="truncate">{list.name}</span>}
        </div>
      ))}

      {/* Financial Report */}
      <div
        key="12"
        className={`flex items-center gap-2.5 cursor-pointer h-10 rounded-md mb-1 bg-transparent text-light-grey-text hover:bg-grey-2 transition-colors ${
          isCollapsed ? 'justify-center pl-0 pr-0' : 'pl-6'
        }`}
        onClick={() =>
          window.open(
            "https://console.firebase.google.com/u/2/project/live-kanvas-app-f23cb/analytics/app/android:com.livekanvas/overview/reports~2Fdashboard%3Fparams%3D_r.explorerCard..selmet%253D%255B%2522activeUsers%2522%255D%2526_r.explorerCard..seldim%253D%255B%2522mobileModelName%255D&r%3Dfirebase-overview&fpn%3D89495502727?utm_source=welcome&utm_medium=email&utm_campaign=welcome_2021_CTA_A",
            "_blank"
          )
        }
        title={isCollapsed ? "Financial Report" : undefined}
      >
        <CashIcon height={"20px"} width={"20px"} color={"white"} />
        {!isCollapsed && <span className="truncate">Financial Report</span>}
      </div>

      {/* Log Out */}
      <div
        key="13"
        className={`flex items-center gap-2.5 cursor-pointer h-10 rounded-md mb-1 transition-colors ${
          isCollapsed ? 'justify-center pl-0 pr-0' : 'pl-6'
        } ${
          selectedTab === "Log Out"
            ? "bg-sidebar-select text-light-grey-text"
            : "bg-transparent text-light-grey-text hover:bg-grey-2"
        }`}
        onClick={handleLogoutModal}
        title={isCollapsed ? "Log Out" : undefined}
      >
        <LogoutIcon width="24px" height="20px" />
        {!isCollapsed && <span className="truncate">Log Out</span>}
      </div>

      {logoutModal && (
        <ModalComponent openModal={logoutModal} setOpenModal={handleLogoutModal} bg="white">
          <ConfirmModal
            handleCancel={handleLogoutModal}
            handleConfirm={handleLogout}
            mainHeading="Log Out"
            subheading="Are you sure you would like to log out?"
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default memo(Sidebar);
