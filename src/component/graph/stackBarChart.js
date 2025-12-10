import PropTypes from "prop-types";
import { memo } from "react";

import { Bar, BarChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Loader from "../loader";

export const dayTimeInterval = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30
];

function StackedBarChart({ createrViewer, filterTime, data, loading }) {
  let growthType = "Yearly View";
  if (filterTime === 30) growthType = "Monthly  View";
  else if (filterTime === 7) growthType = "Weekly View";

  return (
    <>
      <Loader loading={loading} />
      <ResponsiveContainer width="100%" height={280}>
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
    </>
  );
}
export default memo(StackedBarChart);

StackedBarChart.propTypes = {
  filterTime: PropTypes.number,
  createrViewer: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool
};

StackedBarChart.defaultProps = {
  filterTime: 365,
  createrViewer: 1,
  loading: false
};
