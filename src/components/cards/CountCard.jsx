/* eslint-disable react/prop-types */
import { Row } from "antd";
import { memo } from "react";
import { DiamondIcon } from "@utils/svgFile";

const CountCard = ({ list, key, isIcon = true }) => {
  const isMulti = Array.isArray(list);
  const isWide = isMulti || (list?.heading?.length ?? 0) > 16;
  const renderIcon = (iconSource) =>
    isIcon && (
      <div className="h-7 w-7 bg-grey-2 rounded-full flex items-center justify-center flex-shrink-0">
        {iconSource ?? <DiamondIcon color="white" height="20px" width="20px" />}
      </div>
    );

  return (
    <Row
      key={key}
      className={`bg-button-color h-[82px] text-light-white p-3 rounded-[10px] flex items-start justify-center flex-col gap-2 ${
        isMulti ? "col-span-2 min-w-[360px] max-[1200px]:col-span-1 max-[1200px]:min-w-0" : ""
      } ${isWide && !isMulti ? "min-w-[200px]" : ""}`}
    >
      {isMulti ? (
        <div className="flex w-full gap-0 items-stretch">
          {list?.map((data, index) => (
            <div
              className={`flex flex-col gap-2 justify-start items-center text-center flex-1 border-r border-white/20 px-2 ${
                index === list.length - 1 ? "border-r-0" : ""
              }`}
              key={data?.heading}
            >
              <div className="text-base leading-[1.3] whitespace-nowrap text-center w-full font-normal">
                {data?.heading}
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                {!["Audio Content", "Video Content", "Klipz"].includes(data?.heading) &&
                  renderIcon(data?.icon)}
                <div className="text-lg font-medium text-center">{data?.count}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2 items-center">
          <div className="text-base leading-[1.3] whitespace-nowrap text-center w-full font-normal">
            {list?.heading}
          </div>
          <div className="flex items-center justify-start gap-2 w-full">
            <div className="flex items-center justify-start flex-shrink-0">
              {renderIcon(list?.icon)}
            </div>
            <div className="text-lg font-medium text-center">{list?.count}</div>
          </div>
        </div>
      )}
    </Row>
  );
};
export default memo(CountCard);

