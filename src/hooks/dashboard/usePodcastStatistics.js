import { useState, useEffect } from "react";
import { getPodcastStatisticsApi } from "service/api/dashboard";

const usePodcastStatistics = (period) => {
  const [podcastStats, setPodcastStats] = useState({
    timeSeriesData: [],
    overview: {
      totalEarnings: 0,
      totalPodcasts: 0,
      averageEarningsPerPodcast: "0"
    },
    financialStats: {
      totalRevenue: 0,
      podcastRevenue: 0,
      podcastCount: 0,
      profit: 0,
      timeFrame: ""
    }
  });
  const [loading, setLoading] = useState(false);

  const fetchPodcastStats = async () => {
    setLoading(true);
    try {
      const response = await getPodcastStatisticsApi(period);
      if (response?.status === 200) {
        setPodcastStats(response.data);
      }
    } catch (error) {
      console.error("Error fetching podcast statistics:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPodcastStats();
  }, [period]);

  return { podcastStats, loading };
};

export default usePodcastStatistics;
