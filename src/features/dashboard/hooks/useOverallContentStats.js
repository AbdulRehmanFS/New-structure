import { useState, useEffect, useCallback } from "react";
import { getOverallContentStatsApi } from "../services/dashboard.api";

const useOverallContentStats = (period) => {
  const [overallContentStats, setOverallContentStats] = useState({
    periodData: [],
    totalUploads: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchContentStats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getOverallContentStatsApi(period);
      if (response?.status === 200) {
        setOverallContentStats(response.data);
      }
    } catch (error) {
      console.error("Error fetching content stats:", error);
    }
    setLoading(false);
  }, [period]);

  useEffect(() => {
    fetchContentStats();
  }, [fetchContentStats]);

  return { overallContentStats, loading };
};

export default useOverallContentStats;

