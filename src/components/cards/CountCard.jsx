/* eslint-disable react/prop-types */
import { Row } from "antd";
import { memo } from "react";
import { DiamondIcon } from "@utils/svgFile";

const CountCard = ({ list, key, isIcon = true, align = "center" }) => {
  const isMulti = Array.isArray(list);
  const isWide = isMulti || (list?.heading?.length ?? 0) > 16;
  const isLeftAlign = align === "left";
  const customWidth = list?.width;
  const renderIcon = (iconSource) =>
    isIcon && (
      <div className="h-7 w-7 bg-grey-2 rounded-full flex items-center justify-center flex-shrink-0">
        {iconSource ?? <DiamondIcon color="white" height="20px" width="20px" />}
      </div>
    );

  return (
    <div 
      style={customWidth ? { width: customWidth, minWidth: customWidth, maxWidth: customWidth, flexShrink: 0 } : isMulti ? { flex: "1 1 auto", minWidth: 0 } : { width: "140px", minWidth: "140px", maxWidth: "140px", flexShrink: 0 }}
      className={isMulti ? "" : "single-card-item"}
    >
      <Row
        key={key}
        className={`bg-button-color min-h-[82px] text-light-white rounded-[10px] flex items-start justify-center flex-col gap-2 w-full max-w-full ${isMulti ? "px-2 py-2" : "px-3 py-2"}`}
      >
        {isMulti ? (
          <div className="flex w-full gap-0 items-stretch">
            {list?.map((data, index) => (
              <div
                className={`flex flex-col gap-1 justify-start items-center text-center flex-1 min-w-0 border-r border-white/20 px-1 ${
                  index === list.length - 1 ? "border-r-0" : ""
                }`}
                key={data?.heading}
                style={{ overflow: "hidden" }}
              >
                <div className="text-xs sm:text-sm leading-[1.2] text-center w-full font-normal" style={{ wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto" }}>
                  {data?.heading}
                </div>
                <div className="flex items-center justify-center gap-1 w-full flex-shrink-0">
                  {!["Audio Content", "Video Content", "Klipz"].includes(data?.heading) &&
                    renderIcon(data?.icon)}
                  <div className="text-sm font-medium text-center whitespace-nowrap">{data?.count}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className={`w-full flex flex-col gap-2 ${isLeftAlign ? "items-start" : "items-center"}`}>
          <div className={`text-base leading-[1.3] whitespace-nowrap w-full font-normal ${
            isLeftAlign ? "text-left" : "text-center"
          }`}>
            {list?.heading}
          </div>
          <div className="flex items-center justify-start gap-2 w-full">
            <div className="flex items-center justify-start flex-shrink-0">
              {renderIcon(list?.icon)}
            </div>
            <div className={`text-lg font-medium ${isLeftAlign ? "text-left" : "text-center"}`}>
              {list?.count}
            </div>
          </div>
        </div>
      )}
      </Row>
    </div>
  );
};
export default memo(CountCard);

