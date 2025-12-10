import { useEffect, useState } from "react";
import { getDashboardCreatorListApi } from "service/api/dashboard";

const useDashCreatorList = (filterBtn) => {
  const [topCreators, setTopCreators] = useState([]);
  const [bottomCreators, setBottomCreators] = useState([]);
  const [topCreatorLoader, setTopCreatorLoader] = useState(true);
  const [bottomCreatorLoader, setBottomCreatorLoader] = useState(true);

  const getDashboardCreatorList = async (type) => {
    if (type === "top") setTopCreatorLoader(true);
    else setBottomCreatorLoader(true);
    const res = await getDashboardCreatorListApi(type);
    if (res?.status === 200) {
      const { data = [] } = res || {};
      if (type === "top") setTopCreators(data);
      if (type === "bottom") setBottomCreators(data);
    }
    if (type === "top") setTopCreatorLoader(false);
    else setBottomCreatorLoader(false);
  };

  useEffect(() => {
    getDashboardCreatorList("top");
    getDashboardCreatorList("bottom");
  }, [filterBtn]);
  return [topCreators, bottomCreators, topCreatorLoader, bottomCreatorLoader];
};

export default useDashCreatorList;
