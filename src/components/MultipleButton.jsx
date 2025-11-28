/* eslint-disable react/prop-types */
import { font, theme } from "@utils/theme";

const MultipleButton = ({
  btnList,
  handleClick,
  border = "",
  br = "5px",
  btnGap,
  value = "",
  bg = theme.fieldBg
}) => {
  const handleBtnClick = (data) => {
    if (handleClick) handleClick(data);
  };

  return (
    <div className={`flex gap-${btnGap ?? 2} my-2.5`}>
      {btnList.map((list, i) => (
        <div
          key={i}
          className={`font-normal text-sm leading-[13.31px] min-w-[60px] max-w-fit text-center py-2 px-3 rounded-[${br}] text-white cursor-pointer ${
            value === list.name ? "bg-primary" : ""
          }`}
          style={{
            backgroundColor: value === list.name ? theme.primaryColor : bg,
            border: `1px solid ${border}`,
            borderRadius: br
          }}
          onClick={() => handleBtnClick(list)}
        >
          {list.name}
        </div>
      ))}
    </div>
  );
};

export default MultipleButton;

