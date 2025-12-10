import { useState, useEffect } from "react";
import { getTopRevenueMonthsApi } from "service/api/dashboard";

const useTopRevenueMonths = () => {
  const [topRevenueMonths, setTopRevenueMonths] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTopRevenueMonths = async () => {
    setLoading(true);
    const response = await getTopRevenueMonthsApi();
    if (response?.status === 200) {
      setTopRevenueMonths(response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTopRevenueMonths();
  }, []);

  return { topRevenueMonths, loading };
};

export default useTopRevenueMonths;
