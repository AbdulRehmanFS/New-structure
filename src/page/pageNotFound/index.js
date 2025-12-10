/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "component/fields/button";
import { theme } from "util/theme";
import { sidebarSelection } from "store/sidebarSlice";

export default function PageNotFound() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackNavigate = () => {
    dispatch(sidebarSelection("Dashboard"));
    navigate("dashboard");
  };
  return (
    <NotFoundPageWrapper>
      <div className="error">404</div>
      <div className="not-found">Page Note Found</div>
      <div className="content">
        The Page You are looking for doesn&apos;t exist or an other Error
        occured, go back to home page.
      </div>
      <div>
        <Button
          text="Home Page"
          size="middle"
          width="80px"
          bg={theme.lightPrimaryColor}
          onClick={handleBackNavigate}
        />
      </div>
    </NotFoundPageWrapper>
  );
}

const NotFoundPageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
  color: ${theme.black};
  .error {
    font-size: 90px;
    letter-spacing: 4px;
  }
  // .oops-section,
  .not-found {
    font-size: 30px;
  }
  .content {
    width: 482px;
    text-align: center;
    color: ${theme.greyText};
  }
`;
