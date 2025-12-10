import { useState, useEffect } from "react";
import { getFinancialStatsApi } from "service/api/dashboard";

const useFinancialStats = (filterBtn) => {
  const timeFrame = filterBtn?.value === 1 ? "day" : filterBtn?.value === 7 ? "week" : filterBtn?.value === 30 ? "month" : "year";
  const [stats, setStats] = useState({
    totalRevenue: 0,
    profit: 0,
    paidOut: 0,
    ticketSales: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await getFinancialStatsApi(timeFrame);
      if (response?.status === 200) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Error fetching financial stats:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, [filterBtn]);

  return [stats, loading];
};

export default useFinancialStats;
