import PropTypes from "prop-types";
import { memo } from "react";
import { Bar, BarChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Loader from "@components/Loader";

function StackedBarChart({ createrViewer = 1, filterTime = 365, data, loading = false }) {
  let growthType = "Yearly View";
  if (filterTime === 30) growthType = "Monthly  View";
  else if (filterTime === 7) growthType = "Weekly View";

  return (
    <>
      <Loader loading={loading} />
      <div style={{ width: "100%", height: "280px", minHeight: "280px" }}>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 5
          }}>
          <XAxis dataKey="name" />
          <YAxis tick={false}>
            <Label
              value={growthType}
              position="leftinside"
              angle={270}
              style={{
                textAnchor: "middle",
                fill: "white"
              }}
            />
          </YAxis>
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              color: "green",
              background: "#131313",
              fontSize: "20px"
            }}
          />
          {(createrViewer === 1 || createrViewer === 3) && (
            <Bar
              dataKey="viewer"
              stackId="a"
              fill="#54a130"
              style={{ boxShadow: "10px 10px black" }}
            />
          )}
          {(createrViewer === 2 || createrViewer === 3) && (
            <Bar dataKey="creator" stackId="a" fill="#47862a" radius={[10, 10, 0, 0]} />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
    </>
  );
}
export default memo(StackedBarChart);

StackedBarChart.propTypes = {
  filterTime: PropTypes.number,
  createrViewer: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool
};

