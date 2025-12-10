import { useEffect } from "react";
import TabComponent from "component/tabs";
import Header from "component/header";
import CategoriesSection from "./categoriesSection";

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
