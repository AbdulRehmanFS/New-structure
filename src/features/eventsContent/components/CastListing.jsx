import { PersonProfileIcon } from "@utils/svgFile";
import { theme } from "@utils/theme";

export const CastListing = ({ heading = "Cast", castLists }) => (
  <div className="flex flex-col gap-2 mt-5">
    {castLists?.length ? (
      <div className="font-semibold text-white">{heading}</div>
    ) : (
      ""
    )}
    {castLists?.map((list, index) => (
      <div className="flex items-center gap-3 text-xs" key={index}>
        <div className="h-7 w-7 rounded-full overflow-hidden bg-[rgba(196,196,196,0.3)] flex items-center justify-center">
          {(list?.image ?? list?.profile_pic_url) ? (
            <img
              src={list?.image ?? list?.profile_pic_url}
              alt=""
              className="h-full w-full object-contain"
            />
          ) : (
            <PersonProfileIcon />
          )}
        </div>
        <div className="text-white capitalize">{list?.name ?? list?.user_name}</div>
      </div>
    ))}
  </div>
);

