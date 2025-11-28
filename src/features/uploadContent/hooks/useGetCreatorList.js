import { useEffect, useState } from "react";
import { getCreatorListing } from "@services/api/collections";

const useGetCreatorList = () => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [creatorList, setCreatorList] = useState([]);

  const handleGetCreator = async (searchValue = "") => {
    setSearchLoading(true);
    const param = new URLSearchParams();
    param.append("search", searchValue);
    const res = await getCreatorListing(`?${param}`);
    if (res?.status === 200) {
      const output = res?.data?.map((list) => ({
        label: list?.user_name,
        value: list?._id,
        region: list?.stream_region
      }));
      setCreatorList(output);
    }
    setSearchLoading(false);
  };

  useEffect(() => {
    handleGetCreator();
  }, []);

  return [creatorList, searchLoading, handleGetCreator];
};

export default useGetCreatorList;

