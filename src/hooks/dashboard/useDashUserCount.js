import { lists } from "page/dashboard/list";
import { useCallback, useEffect, useState } from "react";
import { getDashboardUserCountApi } from "service/api/dashboard";
import { errorMessage } from "util/commonSection";

const useDashUserCount = (filterBtn) => {
  const [userCountLoader, setUserCountLoader] = useState(true);
  const [userList, setUserList] = useState(lists);

  const getDashboardUserCount = useCallback(async () => {
    setUserCountLoader(true);
    const res = await getDashboardUserCountApi(filterBtn?.value);
    if (res?.status === 200) {
      const { Viewer = 0, Creator = 0 } = res?.data || {};
      const userCount = [
        { ...userList[0], count: Viewer },
        { ...userList[1], count: Creator },
        { ...userList[2], count: Viewer + Creator }
      ];
      setUserList(userCount);
    } else errorMessage(res?.message);
    setUserCountLoader(false);
  },[filterBtn]);

  useEffect(() => {
    getDashboardUserCount();
  }, [getDashboardUserCount]);

  return [userList, userCountLoader];
};

export default useDashUserCount;
