import { useEffect } from "react";
import TabComponent from "@components/Tabs";
import Header from "@layouts/Header";
import CategoriesSection from "../components/CategoriesSection";

const defaultItems = [
  {
    key: "1",
    label: "Categories",
    children: <CategoriesSection />,
  },
];

const CategoriesManagement = () => {
  const getCategoriesList = () => {};

  const handleSearchData = () => {};

  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <>
      <Header
        handleSearchData={handleSearchData}
        heading="Categories Management"
        placeholder="Search Categories"
      />
      <TabComponent items={defaultItems} />
    </>
  );
};

export default CategoriesManagement;
