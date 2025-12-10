/* eslint-disable react/prop-types */
import styled from "styled-components";
import { font, theme } from "util/theme";

const MultipleButton = ({
  btnList,
  handleClick,
  border = "",
  br = "5px",
  btnGap,
  value = "",
  bg = theme.fieldGray
}) => {
  const handleBtnClick = (data) => {
    if (handleClick) handleClick(data);
  };

  return (
    <ButtonWrapper btnGap={btnGap}>
      {btnList.map((list, i) => (
        <ButtonView
          key={i}
          status={value === list.name}
          border={border}
          br={br}
          bg={bg}
          onClick={() => handleBtnClick(list)}>
          {list.name}
        </ButtonView>
      ))}
    </ButtonWrapper>
  );
};

export default MultipleButton;

const ButtonWrapper = styled.div`
  display: flex;
  gap: ${(props) => props.btnGap ?? "8px"};
  margin: 10px 0;
`;

const ButtonView = styled.div`
  font-weight: 400;
  font-size: ${font.small};
  line-height: 13.31px;
  min-width: 60px;
  max-width: fit-content;
  text-align: center;
  padding: 8px 12px;
  border-radius: ${(props) => props.br};
  color: ${theme.white};
  background: ${(props) => (props?.status ? theme.primaryColor : props.bg)};
  border: 1px solid ${(props) => props.border};
  //   &:hover {
  //     background: ${theme.primaryColor};
  //   }
  cursor: pointer;
`;
