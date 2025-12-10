import { getApi } from "../methods";

const route = {
  dashboard_users_count: "admin/dashboard/count-of-users?type=",
  users_growth: "admin/dashboard/users-growth?",
  dashboard_creators_list: "admin/dashboard/top-users?type=",
  financial_stats: "admin/financial-stats?timeFrame=",
  top_revenue_months: "admin/top-revenue-months",
  overall_content_stats: "admin/overall-content-stats",
  podcast_statistics: "admin/podcast-statistics"
};

export const getDashboardUserCountApi = (filter) => getApi(route.dashboard_users_count + filter);

export const getGrowthGrapApi = (payload) => getApi(route.users_growth + payload);

export const getDashboardCreatorListApi = (type) => getApi(route.dashboard_creators_list + type);

export const getFinancialStatsApi = (timeFrame) => getApi(route.financial_stats + timeFrame);

export const getTopRevenueMonthsApi = () => getApi(route.top_revenue_months);

export const getOverallContentStatsApi = (period) =>
  getApi(route.overall_content_stats + "?period=" + period);

export const getPodcastStatisticsApi = (period) =>
  getApi(`${route.podcast_statistics}?period=${period}`);
