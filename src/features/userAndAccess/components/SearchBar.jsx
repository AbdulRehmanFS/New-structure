/* eslint-disable react/prop-types */
import { memo } from "react";
import { SearchIcon } from "@utils/svgFile";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search user..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-[240px] h-9 py-2 pr-9 pl-[14px] rounded-lg bg-[#2b2b2b] border border-[#3d3d3d] text-white text-sm outline-none transition-all duration-[0.25s] ease-in-out placeholder:text-[#9c9c9c] focus:border-[#4b6ef5] focus:shadow-[0_0_6px_rgba(75,110,245,0.25)]"
      />
      <div className="absolute right-3 pointer-events-none flex items-center justify-center">
        <SearchIcon width="18" height="18" color="#9c9c9c" />
      </div>
    </div>
  );
};

export default memo(SearchBar);

