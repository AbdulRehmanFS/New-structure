import { ImageIcon } from "@utils/svgFile";
import { theme } from "@utils/theme";

const List = ({ data, className }) => (
  <div className={`flex justify-between pb-2.5 mb-2.5 border-b border-white gap-2 ${className}`}>
    <div className="flex gap-2.5">
      <div className="h-[30px] w-[30px] rounded-[5px] bg-mid-grey flex items-center justify-center">
        {data?.profile_pic_url ? (
          <img src={data?.profile_pic_url} alt="" className="h-[30px] w-[30px] rounded-[5px]" />
        ) : (
          <ImageIcon height="12px" width="12px" />
        )}
      </div>
      <div>
        <div className="text-white">{data?.user_name}</div>
        <div className="text-xs text-mid-grey">{data?.subscribers_count} Subscribers</div>
      </div>
    </div>
    <div className="flex items-center">
      <span className="flex bg-[#c4c4c49c] text-black py-0.5 px-2.5 rounded-xl text-xs">New</span>
    </div>
  </div>
);

export default List;

