import { useState, useEffect } from "react";
import { getOverallContentStatsApi } from "service/api/dashboard";

//fetch overall content stats
const useOverallContentStats = (period = "month") => {
  const [overallContentStats, setOverallContentStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOverallContentStats = async () => {
      setLoading(true);
      const response = await getOverallContentStatsApi(period);
      if (response?.status === 200) {
        setOverallContentStats(response?.data);
      }
      setLoading(false);
    };

    fetchOverallContentStats();
  }, [period]);

  return { overallContentStats, loading };
};

export { useOverallContentStats };
