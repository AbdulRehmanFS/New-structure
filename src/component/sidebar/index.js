import logo from "assets/logo.png";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarSelection } from "store/sidebarSlice";
import { authlogout } from "store/signInSlice";
import { resetTabSelection } from "store/useManagementSlice";
import styled from "styled-components";
import { checkCurrentRoute, navbarList } from "util/constant";
import { CashIcon, LogoutIcon } from "util/svgFile";
import { theme } from "util/theme";
import ModalComponent from "../modal";
import ConfirmModal from "../modal/confirmModal";

const Sidebar = () => {
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
    <SidebarWrapper>
      <LogoWrapper>
        <img src={logo} alt="" height="100px" width="150px" />
      </LogoWrapper>
      {navbarList.map((list) => (
        <List
          key={list?.name}
          select={selectedTab === list.name}
          onClick={() => handleListSelection(list)}>
          {list.icon}
          {list.name}
        </List>
      ))}
      <List
        key="12"
        onClick={() =>
          window.open(
            "https://console.firebase.google.com/u/2/project/live-kanvas-app-f23cb/analytics/app/android:com.livekanvas/overview/reports~2Fdashboard%3Fparams%3D_r.explorerCard..selmet%253D%255B%2522activeUsers%2522%255D%2526_r.explorerCard..seldim%253D%255B%2522mobileModelName%2522%255D&r%3Dfirebase-overview&fpn%3D89495502727?utm_source=welcome&utm_medium=email&utm_campaign=welcome_2021_CTA_A",
            "_blank"
          )
        }>
        <CashIcon height={"20px"} width={"20px"} color={"white"} />
        Financial Report
      </List>
      <List key="12" select={selectedTab === "Log Out"} onClick={handleLogoutModal}>
        <LogoutIcon width="24px" height="20px" />
        Log Out
      </List>

      {logoutModal && (
        <ModalComponent openModal={logoutModal} setOpenModal={handleLogoutModal}>
          <ConfirmModal
            handleCancel={handleLogoutModal}
            handleConfirm={handleLogout}
            mainHeading="Log Out"
            subheading="Are you sure you would like to log out?"
          />
        </ModalComponent>
      )}
      {/* <StorageWrapper>

        <div className="download-btn">
          <EarningIcon width="24px" height="20px" />
          Financial Report
        </div>
      </StorageWrapper> */}
    </SidebarWrapper>
  );
};
export default memo(Sidebar);

const SidebarWrapper = styled.div`
  height: 100vh;
  padding: 0 2px;
  background: ${theme.sidebar};
  overflow: auto;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 25px;
  cursor: pointer;
  height: 40px;
  border-radius: 6px;
  margin-bottom: 5px;
  background: ${(props) => (props.select ? theme.sidebarSelect : "transparent")};
  color: ${theme.lightGreyText};
`;

// const StorageWrapper = styled.div`
//   padding: 1rem;
//   width: 100%;
//   max-width: 250px;
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 5rem;
//   margin-bottom: 2rem;
//   border: 1px solid ${theme.greyBorder};
//   border-radius: 8px;
//   align-self: center;
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
//   color: rgba(255, 255, 255, 0.79);

//   .download-btn {
//     background: ${theme.greyButton};
//     padding: 9px 10px;
//     border-radius: 5px;
//     cursor: pointer;
//     margin-top: 10px;
//     font-size: 14px;
//     display: inline-flex;
//     gap: 2px;
//     align-items: center;
//   }
// `;
