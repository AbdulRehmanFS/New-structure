/* eslint-disable react/prop-types */
import styled from "styled-components";
import { theme } from "util/theme";
import logo from "assets/logo.png";
import BackgroundImage from "assets/authBackground.png";

export default function FormWrapper({ children }) {
  return (
    <OuterWrapper>
      <Card>
        <LogoWrapper>
          <img src={logo} alt="" height="155px" width="auto" />
        </LogoWrapper>
        {children}
      </Card>
    </OuterWrapper>
  );
}

const OuterWrapper = styled.div`
  position: relative;
  height: 100vh;
  background-image: url(${BackgroundImage});
  // background-size: cover;
  background-size: contain;
  // box-shadow: inset 0 0 0 1000px rgba(20, 0, 0, 0.88);
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.4);
`;

const Card = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 390px;
  min-height: 380px;
  // border: 1px solid ${theme.greyBorder};
  // padding: 30px 40px;
`;

const LogoWrapper = styled.div`
  // height: 84px;
  // width: 107px;
  margin-bottom: 25px;
  // width: 280px;
  // height: 240px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
