/* eslint-disable react/prop-types */
import { memo } from "react";
import { UserIcon } from "@utils/svgFile";

const InfoCardSecond = memo(({ livecount, subscribecount, liveheading, subsheading, key }) => (
  <div
    key={key}
    className="bg-[rgba(196,196,196,0.16)] min-w-[200px] p-4 rounded-lg flex justify-between text-light-white"
  >
    <div>
      <div className="flex justify-between text-xl items-center gap-3">{livecount}</div>
      <div className="my-2.5 text-xs">{liveheading ?? "Total Registered Viewers"}</div>
    </div>
    <div className="w-px bg-mid-grey mx-2.5" />
    <div>
      <div className="flex justify-between text-xl items-center gap-3">{subscribecount}</div>
      <div className="my-2.5 text-xs">{subsheading ?? "Total Registered Viewers"}</div>
    </div>
  </div>
));
InfoCardSecond.displayName = "InfoCardSecond";

export { InfoCardSecond };

const InfoCard = ({ count, heading, icon, showBox = true, key, loader = false }) => {
  if (loader) {
    return (
      <div className="bg-[rgba(196,196,196,0.16)] max-w-fit min-w-[172px] p-[18px] rounded-lg text-white">
        {/* Placeholder for ParagraphLoader - will be migrated separately */}
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div
      key={key}
      className="bg-[rgba(196,196,196,0.16)] max-w-fit min-w-[172px] p-[18px] rounded-lg text-white"
    >
      <div className="flex justify-between text-xl items-center gap-3">
        {count}
        {icon ?? <UserIcon opacity={1} />}
      </div>
      <div className="my-2.5 text-xs">{heading ?? "Total Registered Viewers"}</div>
      {showBox && (
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((countDown) => (
            <div key={countDown} className="bg-[rgba(196,196,196,0.36)] h-5 w-5" />
          ))}
        </div>
      )}
    </div>
  );
};
export default memo(InfoCard);

export const SimgpleInfoCard = ({ count, icon }) => (
  <div className="bg-[rgba(196,196,196,0.16)] max-w-fit min-w-auto p-[18px] rounded-lg text-white">
    <div className="flex justify-between text-xl items-center gap-4">
      {count}
      {icon ?? <UserIcon opacity={1} />}
    </div>
  </div>
);

