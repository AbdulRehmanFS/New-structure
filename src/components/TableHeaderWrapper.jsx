/* eslint-disable react/prop-types */
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const TableHeaderWrapper = ({
  heading,
  children,
  link = "",
  viewAll = true,
  state,
  dataLength,
}) => {
  const navigate = useNavigate();
  const navigateSection = () => link !== "" && navigate(link, { state });

  return (
    <div className="bg-[rgb(38,38,38)] mt-5 rounded-xl border border-grey-border overflow-x-auto md:mt-5 md:rounded-xl sm:mt-[15px] sm:rounded-lg">
      <div className="flex justify-between py-2.5 px-5 bg-table-header rounded-t-xl border-b border-light-white flex-wrap gap-2.5 md:py-2.5 md:px-5 sm:py-2 sm:px-3 sm:rounded-t-lg">
        <div className="text-light-white text-base md:text-base sm:text-sm">{heading}</div>
        {viewAll && dataLength ? (
          <div className="text-primary-light underline underline-offset-[3px] cursor-pointer whitespace-nowrap hover:text-primary-light" onClick={navigateSection} aria-hidden>
            View all
          </div>
        ) : (
          ""
        )}
      </div>
      {children}
    </div>
  );
};
export default memo(TableHeaderWrapper);

