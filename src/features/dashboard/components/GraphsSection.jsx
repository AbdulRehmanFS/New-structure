import Select from "@components/Select";
import AreaChartComponent from "./AreaChart";
import LegendChartColor from "./LegendChartColor";
import StackedBarChart from "./StackedBarChart";
import { useGrowthGraph } from "../hooks";
import { HorizontalLine } from "../utils/style.jsx";
import { contentPeriodOptions, graphDataOptions, chartOptions } from "../utils/list.jsx";
import { useOverallContentStats } from "../hooks";
import { useState } from "react";
import usePodcastStatistics from "../hooks/usePodcastStatistics";

const GraphsSection = () => {
  const [growthGraphData, createrViewer, setCreaterViewer, filterTime, setFilterTime, loading] =
    useGrowthGraph();
  const [contentPeriod, setContentPeriod] = useState(contentPeriodOptions[0].value);
  const { overallContentStats, loading: overallContentLoading } =
    useOverallContentStats(contentPeriod);
  const [period, setPeriod] = useState(graphDataOptions[0].value);
  const { podcastStats, loading: podcastStatsLoading } = usePodcastStatistics(period);

  const formattedData = {
    periodData: podcastStats.timeSeriesData.length
      ? podcastStats.timeSeriesData.map((item) => ({
          name: item.name,
          value: item.podcastCount
        }))
      : [{ name: "No data", value: 0 }]
  };

  return (
    <div className="flex flex-col gap-9 mt-8">
      <div className="podcast-graph-wrapper">
        <div className="podcast-graph-header">
          <div className="heading">Content Stats</div>
          <div className="right-section text-light-grey-text">
            Total Uploads {overallContentStats?.totalUploads}
            <Select
              size="middle"
              options={contentPeriodOptions}
              value={contentPeriod}
              onChange={(value) => setContentPeriod(value)}
              customeStyle={{
                bg: "white",
                textColor: "black",
                optionsBg: "white"
              }}
              color={"white"}
            />
          </div>
        </div>

        <AreaChartComponent
          yLabel="Overall Content On Platform"
          data={overallContentStats}
          loading={overallContentLoading}
        />
      </div>

      <HorizontalLine margin="-10px 0 0 0" />

      <div className="podcast-graph-wrapper">
        <div className="podcast-graph-header">
          <div className="heading">User Growth</div>
          <LegendChartColor createrViewer={createrViewer} />

          <div className="right-section">
            <Select
              onChange={(value) => {
                const option = chartOptions.find(opt => opt.value === value);
                setCreaterViewer(option?.value || value);
              }}
              size="middle"
              value={chartOptions.find(opt => opt.value === createrViewer)?.value || chartOptions[0]?.value}
              options={chartOptions}
              customeStyle={{
                bg: "white",
                textColor: "black",
                optionsBg: "white"
              }}
              color={"white"}
            />

            <Select
              onChange={(value) => {
                const option = graphDataOptions.find(opt => opt.value === value);
                setFilterTime(option?.value || value);
              }}
              size="middle"
              value={graphDataOptions.find(opt => opt.value === filterTime)?.value || graphDataOptions[2]?.value}
              options={graphDataOptions}
              customeStyle={{
                bg: "white",
                textColor: "black",
                optionsBg: "white"
              }}
              color={"white"}
            />
          </div>
        </div>

        <StackedBarChart
          createrViewer={createrViewer}
          filterTime={filterTime}
          data={growthGraphData}
          loading={loading}
        />
      </div>

      <HorizontalLine margin="-10px 0 0 0" />

      <div className="podcast-graph-wrapper">
        <div className="podcast-graph-header">
          <div className="heading">Financial Stats</div>
          <div className="right-section text-light-grey-text">
            Overall Earning: ${podcastStats.overview.totalEarnings.toLocaleString()}
            <Select
              size="middle"
              options={contentPeriodOptions}
              value={contentPeriod}
              onChange={(value) => setPeriod(value)}
              customeStyle={{
                bg: "white",
                textColor: "black",
                optionsBg: "white"
              }}
              color={"white"}
            />
          </div>
        </div>

        <AreaChartComponent
          yLabel="Number of Podcasts"
          data={formattedData}
          loading={podcastStatsLoading}
          dataKey="value"
        />
      </div>
    </div>
  );
};

export default GraphsSection;

