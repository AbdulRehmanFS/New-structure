import Select from "@components/Select";
import { SelectComponent } from "@components";
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
    <div className="flex flex-col gap-[34px] mt-[30px]">
      <div className="h-[330px] pr-5 pl-0 -ml-5">
        <div className="flex items-center justify-between px-5 font-semibold flex-wrap">
          <div>Content Stats</div>
          <div className="flex gap-8 items-center text-white">
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
              color={"black"}
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

      <div className="h-[330px] pr-5 pl-0 -ml-5">
        <div className="flex items-center justify-between px-5 font-semibold flex-wrap">
          <div>User Growth</div>
          <LegendChartColor createrViewer={createrViewer} />

          <div className="flex gap-8 items-center">
            <SelectComponent
              onChange={(e) => setCreaterViewer(e)}
              size="middle"
              value={chartOptions[0]}
              options={chartOptions}
              customeStyle={{
                bg: "white",
                textColor: "black",
                optionsBg: "white"
              }}
              color={"black"}
            />

            <SelectComponent
              onChange={(e) => setFilterTime(e)}
              size="middle"
              value={graphDataOptions[2]}
              options={graphDataOptions}
              customeStyle={{
                bg: "white",
                textColor: "black",
                optionsBg: "white"
              }}
              color={"black"}
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

      <div className="h-[330px] pr-5 pl-0 -ml-5">
        <div className="flex items-center justify-between px-5 font-semibold flex-wrap">
          <div>Financial Stats</div>
          <div className="flex gap-8 items-center text-white">
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
              color={"black"}
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

