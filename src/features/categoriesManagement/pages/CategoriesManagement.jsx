import { useState } from "react";
import Header from "@layouts/Header";
import CategoriesSection from "../components/CategoriesSection";

export default function CategoriesManagement() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchData = (value) => setSearchValue(value || "");

  return (
    <>
      <Header
        handleSearchData={handleSearchData}
        heading="Categories Management"
        placeholder="Search Categories"
      />
      <div className="scroll-without-header">
        <CategoriesSection searchValue={searchValue} />
      </div>
    </>
  );
}

